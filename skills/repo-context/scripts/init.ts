import { mkdir, access, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.cwd();
const contextDir = resolve(ROOT, "context");

const exists = async (path: string) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const ensureDir = async (path: string) => {
  await mkdir(path, { recursive: true });
};

const main = async () => {
  if (await exists(contextDir)) {
    console.log("[repo-context] context/ already exists; skipping init.");
    return;
  }

  await ensureDir(resolve(contextDir, "specs"));
  await ensureDir(resolve(contextDir, "initiatives"));
  await ensureDir(resolve(contextDir, "projects"));
  await ensureDir(resolve(contextDir, "prds"));

  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const assetsDir = resolve(scriptDir, "..", "assets");
  const templatePath = resolve(assetsDir, "context-readme-template.md");
  const readmePath = resolve(contextDir, "README.md");

  const template = await readFile(templatePath, "utf8");
  await writeFile(readmePath, template, "utf8");

  console.log("[repo-context] Initialized context/ with README.md.");
};

await main();
