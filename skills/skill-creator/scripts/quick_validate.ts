#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ALLOWED_PROPERTIES = new Set([
  "name",
  "description",
  "license",
  "allowed-tools",
  "metadata",
]);

const bunYaml = (Bun as unknown as { YAML?: { parse: (input: string) => unknown } }).YAML;

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseFrontmatterRelaxed(frontmatterText: string): Record<string, unknown> | null {
  const values: Record<string, string> = {};
  const lines = frontmatterText.split(/\r?\n/);
  let currentKey = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      values[currentKey] = keyMatch[2] ?? "";
      continue;
    }

    if (/^\s+/.test(line) && currentKey.length > 0) {
      values[currentKey] += `\n${trimmed}`;
      continue;
    }

    return null;
  }

  const parsed: Record<string, unknown> = {};

  for (const [key, rawValue] of Object.entries(values)) {
    let value = rawValue.trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

export function validateSkill(skillPathInput: string): [boolean, string] {
  const skillPath = resolve(skillPathInput);
  const skillMdPath = join(skillPath, "SKILL.md");

  if (!existsSync(skillMdPath)) {
    return [false, "SKILL.md not found"];
  }

  let content = "";

  try {
    content = readFileSync(skillMdPath, "utf8");
  } catch (error) {
    return [false, `Could not read SKILL.md: ${formatError(error)}`];
  }

  if (!content.startsWith("---")) {
    return [false, "No YAML frontmatter found"];
  }

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return [false, "Invalid frontmatter format"];
  }

  let frontmatter: unknown;
  let yamlError = "";

  if (bunYaml && typeof bunYaml.parse === "function") {
    try {
      frontmatter = bunYaml.parse(match[1]);
    } catch (error) {
      yamlError = formatError(error);
    }
  }

  if (!isRecord(frontmatter)) {
    frontmatter = parseFrontmatterRelaxed(match[1]);
  }

  if (!isRecord(frontmatter)) {
    const suffix = yamlError.length > 0 ? `: ${yamlError}` : "";
    return [false, `Invalid YAML in frontmatter${suffix}`];
  }

  const unexpectedKeys = Object.keys(frontmatter).filter(
    (key) => !ALLOWED_PROPERTIES.has(key),
  );

  if (unexpectedKeys.length > 0) {
    return [
      false,
      `Unexpected key(s) in SKILL.md frontmatter: ${unexpectedKeys.sort().join(", ")}. Allowed properties are: ${
        [...ALLOWED_PROPERTIES].sort().join(", ")
      }`,
    ];
  }

  if (!Object.prototype.hasOwnProperty.call(frontmatter, "name")) {
    return [false, "Missing 'name' in frontmatter"];
  }

  if (!Object.prototype.hasOwnProperty.call(frontmatter, "description")) {
    return [false, "Missing 'description' in frontmatter"];
  }

  const nameValue = frontmatter.name;
  if (typeof nameValue !== "string") {
    return [false, `Name must be a string, got ${typeof nameValue}`];
  }

  const name = nameValue.trim();
  if (name.length > 0) {
    if (!/^[a-z0-9-]+$/.test(name)) {
      return [
        false,
        `Name '${name}' should be hyphen-case (lowercase letters, digits, and hyphens only)`,
      ];
    }

    if (name.startsWith("-") || name.endsWith("-") || name.includes("--")) {
      return [
        false,
        `Name '${name}' cannot start/end with hyphen or contain consecutive hyphens`,
      ];
    }

    if (name.length > 64) {
      return [false, `Name is too long (${name.length} characters). Maximum is 64 characters.`];
    }
  }

  const descriptionValue = frontmatter.description;
  if (typeof descriptionValue !== "string") {
    return [false, `Description must be a string, got ${typeof descriptionValue}`];
  }

  const description = descriptionValue.trim();
  if (description.length > 0) {
    if (description.includes("<") || description.includes(">")) {
      return [false, "Description cannot contain angle brackets (< or >)"];
    }

    if (description.length > 1024) {
      return [
        false,
        `Description is too long (${description.length} characters). Maximum is 1024 characters.`,
      ];
    }
  }

  return [true, "Skill is valid!"];
}

if (import.meta.main) {
  const args = Bun.argv.slice(2);

  if (args.length !== 1) {
    console.log("Usage: bun quick_validate.ts <skill_directory>");
    process.exit(1);
  }

  const [valid, message] = validateSkill(args[0]);
  console.log(message);
  process.exit(valid ? 0 : 1);
}
