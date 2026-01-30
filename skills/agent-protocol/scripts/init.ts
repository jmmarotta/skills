import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generateId, nowRfc3339, pathExists, replacePlaceholders, resolveProtocolPath } from "./lib";
import { reindex } from "./reindex";

const main = async () => {
  const protocolDir = resolveProtocolPath();
  if (await pathExists(protocolDir)) {
    console.log("[agent-protocol] .agentprotocol/ already exists; skipping init.");
    return;
  }

  const openDir = resolveProtocolPath("open");
  const archiveDir = resolveProtocolPath("archive");
  await mkdir(openDir, { recursive: true });
  await mkdir(archiveDir, { recursive: true });

  const id = generateId();
  const now = nowRfc3339();
  const slug = "example";
  const itemDir = resolve(openDir, `${id}-${slug}`);
  await mkdir(itemDir, { recursive: true });

  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const assetsDir = resolve(scriptDir, "..", "assets");

  const readmeTemplate = await readFile(resolve(assetsDir, "readme-template.md"), "utf8");
  const todoTemplate = await readFile(resolve(assetsDir, "todo-template.md"), "utf8");
  const planTemplate = await readFile(resolve(assetsDir, "plan-template.md"), "utf8");
  const buildTemplate = await readFile(resolve(assetsDir, "build-template.md"), "utf8");

  const readmeContent = replacePlaceholders(readmeTemplate, { ID: id });
  const planContent = replacePlaceholders(planTemplate, {
    ID: id,
    RFC3339: now,
    TITLE: "Example",
  });
  const buildContent = replacePlaceholders(buildTemplate, {
    ID: id,
    RFC3339: now,
    TITLE: "Example",
    PLAN_ID_LINE: `plan_id: PLAN-${id}`,
  });

  await writeFile(resolve(protocolDir, "README.md"), readmeContent, "utf8");
  await writeFile(resolve(protocolDir, "TODO.md"), todoTemplate, "utf8");
  await writeFile(resolve(itemDir, "plan.md"), planContent, "utf8");
  await writeFile(resolve(itemDir, "build.md"), buildContent, "utf8");

  await reindex({ includeNext: false });

  console.log(`[agent-protocol] Initialized .agentprotocol/ with example work item: ${id}-${slug}`);
};

if (import.meta.main) {
  await main();
}
