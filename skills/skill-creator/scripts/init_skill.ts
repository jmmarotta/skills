#!/usr/bin/env bun

import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const SKILL_TEMPLATE = [
  "---",
  "name: {skill_name}",
  'description: "[TODO: Explain what this skill does and when to use it.]"',
  "---",
  "",
  "# {skill_title}",
  "",
  "## Overview",
  "",
  "[TODO: Add a short explanation of what this skill enables.]",
  "",
  "## Structure",
  "",
  "[TODO: Choose a structure that fits the skill: workflow-based, task-based, reference-based,",
  "or capabilities-based. Keep instructions concise and include concrete examples.]",
  "",
  "## Main Instructions",
  "",
  "[TODO: Add actionable guidance and examples for common user requests.]",
  "",
  "## Resources",
  "",
  "This template includes example resource directories:",
  "",
  "- scripts/: executable helpers for deterministic or repetitive operations",
  "- references/: docs that Claude may read into context when needed",
  "- assets/: files used in generated outputs (templates, images, fonts, boilerplate)",
  "",
  "Delete any directories and files you do not need.",
].join("\n");

const EXAMPLE_SCRIPT = [
  "#!/usr/bin/env python3",
  "\"\"\"",
  "Example helper script for {skill_name}.",
  "",
  "Replace this placeholder with real logic, or delete the file if not needed.",
  "\"\"\"",
  "",
  "def main():",
  "    print(\"Example script for {skill_name}\")",
  "",
  "",
  "if __name__ == \"__main__\":",
  "    main()",
].join("\n");

const EXAMPLE_REFERENCE = [
  "# Reference Documentation for {skill_title}",
  "",
  "Use this file for detailed reference material that should not live in SKILL.md.",
  "",
  "Examples:",
  "- API or schema references",
  "- Step-by-step workflow details",
  "- Domain-specific constraints and edge cases",
].join("\n");

const EXAMPLE_ASSET = [
  "Example asset placeholder.",
  "",
  "Use assets for files intended for output delivery rather than context loading.",
  "",
  "Examples: templates, images, icons, fonts, boilerplate projects.",
].join("\n");

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function renderTemplate(
  template: string,
  replacements: Record<string, string>,
): string {
  let result = template;

  for (const [key, value] of Object.entries(replacements)) {
    result = result.split(`{${key}}`).join(value);
  }

  return result;
}

function titleCaseSkillName(skillName: string): string {
  return skillName
    .split("-")
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function initSkill(skillName: string, pathInput: string): string | null {
  const skillDir = resolve(pathInput, skillName);

  if (existsSync(skillDir)) {
    console.log(`Error: Skill directory already exists: ${skillDir}`);
    return null;
  }

  try {
    mkdirSync(skillDir, { recursive: true });
    console.log(`Created skill directory: ${skillDir}`);
  } catch (error) {
    console.log(`Error creating directory: ${formatError(error)}`);
    return null;
  }

  const skillTitle = titleCaseSkillName(skillName);

  try {
    writeFileSync(
      join(skillDir, "SKILL.md"),
      renderTemplate(SKILL_TEMPLATE, {
        skill_name: skillName,
        skill_title: skillTitle,
      }),
      "utf8",
    );
    console.log("Created SKILL.md");
  } catch (error) {
    console.log(`Error creating SKILL.md: ${formatError(error)}`);
    return null;
  }

  try {
    const scriptsDir = join(skillDir, "scripts");
    const referencesDir = join(skillDir, "references");
    const assetsDir = join(skillDir, "assets");

    mkdirSync(scriptsDir, { recursive: true });
    writeFileSync(
      join(scriptsDir, "example.py"),
      renderTemplate(EXAMPLE_SCRIPT, { skill_name: skillName }),
      "utf8",
    );
    chmodSync(join(scriptsDir, "example.py"), 0o755);
    console.log("Created scripts/example.py");

    mkdirSync(referencesDir, { recursive: true });
    writeFileSync(
      join(referencesDir, "api_reference.md"),
      renderTemplate(EXAMPLE_REFERENCE, { skill_title: skillTitle }),
      "utf8",
    );
    console.log("Created references/api_reference.md");

    mkdirSync(assetsDir, { recursive: true });
    writeFileSync(join(assetsDir, "example_asset.txt"), EXAMPLE_ASSET, "utf8");
    console.log("Created assets/example_asset.txt");
  } catch (error) {
    console.log(`Error creating resource directories: ${formatError(error)}`);
    return null;
  }

  console.log(`\nSkill '${skillName}' initialized successfully at ${skillDir}`);
  console.log("\nNext steps:");
  console.log("1. Edit SKILL.md and complete TODO items");
  console.log("2. Customize or remove example files in scripts/, references/, and assets/");
  console.log("3. Run quick_validate.ts when the skill is ready");

  return skillDir;
}

function main(): void {
  const args = Bun.argv.slice(2);

  if (args.length !== 3 || args[1] !== "--path") {
    console.log("Usage: bun init_skill.ts <skill-name> --path <path>");
    console.log("\nSkill name requirements:");
    console.log("  - Hyphen-case identifier (for example, data-analyzer)");
    console.log("  - Lowercase letters, digits, and hyphens only");
    console.log("  - Max 40 characters");
    console.log("  - Must match directory name exactly");
    console.log("\nExamples:");
    console.log("  bun init_skill.ts my-new-skill --path skills/public");
    console.log("  bun init_skill.ts my-api-helper --path skills/private");
    console.log("  bun init_skill.ts custom-skill --path /custom/location");
    process.exit(1);
  }

  const skillName = args[0];
  const pathInput = args[2];

  console.log(`Initializing skill: ${skillName}`);
  console.log(`Location: ${pathInput}`);
  console.log();

  const result = initSkill(skillName, pathInput);
  process.exit(result ? 0 : 1);
}

if (import.meta.main) {
  main();
}
