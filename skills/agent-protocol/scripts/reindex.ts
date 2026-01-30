import { writeFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

import {
  escapeMarkdownTableCell,
  extractFirstHeadingOrLine,
  extractFirstUncheckedTask,
  extractSectionFirstLine,
  isDirectory,
  listMarkdownFiles,
  readFileIfExists,
  readFrontmatter,
  replaceBetweenMarkers,
  resolveProtocolPath,
} from "./lib";

const ACTIVE_START = "<!-- ACTIVE_WORK_INDEX_START -->";
const ACTIVE_END = "<!-- ACTIVE_WORK_INDEX_END -->";
const BUILD_START = "<!-- BUILD_FILE_INDEX_START -->";
const BUILD_END = "<!-- BUILD_FILE_INDEX_END -->";

type ReindexOptions = {
  includeNext?: boolean;
};

const getSlugFromDir = (dirName: string): string => {
  const dashIndex = dirName.indexOf("-");
  if (dashIndex === -1) {
    return dirName;
  }

  return dirName.slice(dashIndex + 1);
};

const buildActiveIndexRows = async (includeNext: boolean) => {
  const openDir = resolveProtocolPath("open");
  if (!(await isDirectory(openDir))) {
    return [] as string[];
  }

  const entries = await readdir(openDir, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const rows: string[] = [];

  for (const dirName of directories) {
    const itemDir = resolve(openDir, dirName);
    const planPath = resolve(itemDir, "plan.md");
    const buildPath = resolve(itemDir, "build.md");

    const planContent = await readFileIfExists(planPath);
    const buildContent = await readFileIfExists(buildPath);
    const planFrontmatter = planContent ? readFrontmatter(planContent) : {};
    const buildFrontmatter = buildContent ? readFrontmatter(buildContent) : {};

    const title =
      planFrontmatter.title || buildFrontmatter.title || getSlugFromDir(dirName) || dirName;
    const planStatus = planFrontmatter.status || "-";
    const buildStatus = buildFrontmatter.status || "-";

    const contextLine = buildContent ? extractSectionFirstLine(buildContent, "## Context") : null;
    const summaryLine = planContent ? extractSectionFirstLine(planContent, "## Summary") : null;
    const descriptionLine = contextLine || summaryLine || "";

    let nextLine: string | null = null;
    if (includeNext) {
      if (buildContent) {
        nextLine = extractFirstUncheckedTask(buildContent, "## Task Plan");
      }
      if (!nextLine && planContent) {
        nextLine = extractFirstUncheckedTask(planContent, "## Open Questions");
      }
    }

    let description = `${title} (plan:${planStatus}, build:${buildStatus})`;
    if (descriptionLine) {
      description += ` - ${descriptionLine}`;
    }
    if (includeNext && nextLine) {
      description += ` - next: ${nextLine}`;
    }

    const rowPath = `open/${dirName}/`;
    rows.push(`| \`${rowPath}\` | ${escapeMarkdownTableCell(description)} |`);

    if (buildContent) {
      await updateBuildFileIndex(itemDir, buildContent);
    } else {
      await updateBuildFileIndex(itemDir, null);
    }
  }

  return rows;
};

const updateBuildFileIndex = async (itemDir: string, buildContent: string | null) => {
  const buildDir = resolve(itemDir, "build");
  if (!(await isDirectory(buildDir))) {
    return;
  }

  if (!buildContent) {
    console.log(`[agent-protocol] Missing build.md for ${itemDir}.`);
    return;
  }

  const buildFiles = await listMarkdownFiles(buildDir);
  const rows: string[] = [];

  for (const fileName of buildFiles) {
    const filePath = resolve(buildDir, fileName);
    const fileContent = await readFileIfExists(filePath);
    const description = fileContent ? extractFirstHeadingOrLine(fileContent) || "" : "";
    rows.push(`| \`build/${fileName}\` | ${escapeMarkdownTableCell(description)} |`);
  }

  const table = ["| Path | Description |", "| ---- | ----------- |", ...rows].join("\n");
  const updated = replaceBetweenMarkers(buildContent, BUILD_START, BUILD_END, table);
  if (!updated) {
    console.log(`[agent-protocol] Missing build index markers in ${itemDir}/build.md.`);
    return;
  }

  await writeFile(resolve(itemDir, "build.md"), updated, "utf8");
};

export const reindex = async ({ includeNext = false }: ReindexOptions) => {
  const readmePath = resolveProtocolPath("README.md");
  const readmeContent = await readFileIfExists(readmePath);
  if (!readmeContent) {
    console.log("[agent-protocol] README.md not found. Run init.ts first.");
    return;
  }

  const rows = await buildActiveIndexRows(includeNext);
  const table = ["| Path | Description |", "| ---- | ----------- |", ...rows].join("\n");
  const updated = replaceBetweenMarkers(readmeContent, ACTIVE_START, ACTIVE_END, table);
  if (!updated) {
    console.log("[agent-protocol] Active Work Index markers not found in README.md.");
    return;
  }

  await writeFile(readmePath, updated, "utf8");
};

if (import.meta.main) {
  const includeNext = process.argv.includes("--next");
  await reindex({ includeNext });
}
