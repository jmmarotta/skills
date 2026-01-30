import { access, readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

export const CROCKFORD_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export const PROTOCOL_DIR_NAME = ".agentprotocol";

export const nowRfc3339 = (): string => {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
};

const encodeBase32 = (hex: string): string => {
  let value = BigInt(`0x${hex}`);
  if (value === 0n) {
    return "0".repeat(26);
  }

  let output = "";
  while (value > 0n) {
    const index = Number(value % 32n);
    output = CROCKFORD_ALPHABET[index] + output;
    value = value / 32n;
  }

  return output.padStart(26, "0");
};

export const generateId = (): string => {
  const uuid = Bun.randomUUIDv7();
  const hex = uuid.replace(/-/g, "");
  if (hex.length !== 32) {
    throw new Error("Invalid UUIDv7 format.");
  }

  return encodeBase32(hex);
};

export const slugify = (value: string): string => {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");

  return slug || "work";
};

export const replacePlaceholders = (
  template: string,
  values: Record<string, string>,
): string => {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.split(`{{${key}}}`).join(value);
  }
  return result;
};

export const escapeMarkdownTableCell = (value: string): string => {
  return value.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
};

export const pathExists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export const isDirectory = async (path: string): Promise<boolean> => {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

export const readFileIfExists = async (path: string): Promise<string | null> => {
  try {
    return await readFile(path, "utf8");
  } catch {
    return null;
  }
};

export const readFrontmatter = (content: string): Record<string, string> => {
  const lines = content.split(/\r?\n/);
  if (lines.length < 2 || lines[0].trim() !== "---") {
    return {};
  }

  const data: Record<string, string> = {};
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "---") {
      break;
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    let value = match[2].trim();
    const commentIndex = value.indexOf(" #");
    if (commentIndex !== -1) {
      value = value.slice(0, commentIndex).trim();
    }

    value = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    data[match[1]] = value;
  }

  return data;
};

export const extractSectionFirstLine = (content: string, heading: string): string | null => {
  const lines = content.split(/\r?\n/);
  let inSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) {
      if (trimmed === heading) {
        inSection = true;
        continue;
      }

      if (inSection) {
        break;
      }
    }

    if (!inSection) {
      continue;
    }

    if (!trimmed || trimmed.startsWith("<!--")) {
      continue;
    }

    let text = trimmed;
    if (text.startsWith("- ")) {
      text = text.slice(2).trim();
    } else if (text.startsWith("* ")) {
      text = text.slice(2).trim();
    }

    return text;
  }

  return null;
};

export const extractFirstHeadingOrLine = (content: string): string | null => {
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("#")) {
      return trimmed.replace(/^#+\s*/, "");
    }

    return trimmed;
  }

  return null;
};

export const extractFirstUncheckedTask = (content: string, heading: string): string | null => {
  const lines = content.split(/\r?\n/);
  let inSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) {
      if (trimmed === heading) {
        inSection = true;
        continue;
      }

      if (inSection) {
        break;
      }
    }

    if (!inSection) {
      continue;
    }

    if (trimmed.startsWith("- [ ]")) {
      return trimmed.replace(/^- \[ \]\s*/, "");
    }
  }

  return null;
};

export const replaceBetweenMarkers = (
  content: string,
  startMarker: string,
  endMarker: string,
  block: string,
): string | null => {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    return null;
  }

  const before = content.slice(0, start + startMarker.length);
  const after = content.slice(end);
  return `${before}\n${block}\n${after}`;
};

export const listMarkdownFiles = async (path: string): Promise<string[]> => {
  const entries = await readdir(path, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
};

export const resolveProtocolPath = (...segments: string[]): string => {
  return resolve(process.cwd(), PROTOCOL_DIR_NAME, ...segments);
};
