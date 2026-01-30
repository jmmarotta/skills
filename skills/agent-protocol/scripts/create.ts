import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generateId, nowRfc3339, pathExists, replacePlaceholders, resolveProtocolPath, slugify } from "./lib";
import { reindex } from "./reindex";

const usage = () => {
  console.log("Usage: bun ./skills/agent-protocol/scripts/create.ts \"Title\" [--plan] [--slug <slug>]");
};

const parseArgs = (args: string[]) => {
  let plan = false;
  let slug: string | null = null;
  const titleParts: string[] = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--plan") {
      plan = true;
      continue;
    }

    if (arg === "--slug") {
      const next = args[i + 1];
      if (!next || next.startsWith("--")) {
        return null;
      }
      slug = next;
      i += 1;
      continue;
    }

    if (arg.startsWith("--")) {
      console.log(`[agent-protocol] Unknown flag: ${arg}`);
      return null;
    }

    titleParts.push(arg);
  }

  const title = titleParts.join(" ").trim();
  if (!title) {
    return null;
  }

  return { plan, slug, title };
};

const main = async () => {
  const parsed = parseArgs(process.argv.slice(2));
  if (!parsed) {
    usage();
    process.exitCode = 1;
    return;
  }

  const protocolDir = resolveProtocolPath();
  if (!(await pathExists(protocolDir))) {
    console.log("[agent-protocol] .agentprotocol/ not found. Run init.ts first.");
    process.exitCode = 1;
    return;
  }

  const openDir = resolveProtocolPath("open");
  await mkdir(openDir, { recursive: true });

  const id = generateId();
  const now = nowRfc3339();
  const slug = slugify(parsed.slug ?? parsed.title);
  const itemDirName = `${id}-${slug}`;
  const itemDir = resolve(openDir, itemDirName);

  if (await pathExists(itemDir)) {
    console.log(`[agent-protocol] Work item already exists: ${itemDirName}`);
    process.exitCode = 1;
    return;
  }

  await mkdir(itemDir, { recursive: true });

  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const assetsDir = resolve(scriptDir, "..", "assets");

  const planTemplate = await readFile(resolve(assetsDir, "plan-template.md"), "utf8");
  const buildTemplate = await readFile(resolve(assetsDir, "build-template.md"), "utf8");

  const planIdLine = parsed.plan ? `plan_id: PLAN-${id}` : "";
  const planContent = replacePlaceholders(planTemplate, {
    ID: id,
    RFC3339: now,
    TITLE: parsed.title,
  });
  const buildContent = replacePlaceholders(buildTemplate, {
    ID: id,
    RFC3339: now,
    TITLE: parsed.title,
    PLAN_ID_LINE: planIdLine,
  });

  if (parsed.plan) {
    await writeFile(resolve(itemDir, "plan.md"), planContent, "utf8");
  }

  await writeFile(resolve(itemDir, "build.md"), buildContent, "utf8");

  await reindex({ includeNext: false });

  console.log(`[agent-protocol] Created work item: open/${itemDirName}/`);
};

if (import.meta.main) {
  await main();
}
