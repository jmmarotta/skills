---
name: websearch
description: Use when a task needs authoritative external docs, current information, release notes, pricing, news, or web search to answer correctly.
---

# Websearch

Use `codex --search exec` as the default interface for scripted web lookup.
`--search` is a top-level Codex flag, so it must appear before `exec`.

## Default Pattern

Prefer stdin so prompts can be multiline and shell-safe.

```bash
cat <<'EOF' | codex --search exec -
Use web search to answer the question below.
Prefer recent and primary sources when possible.
Return:
- a short direct answer
- 3-5 bullets of supporting facts
- source links

Question: <user request>
EOF
```

## Prompting Rules

- State the exact question, timeframe, and region if they matter.
- Ask for source links explicitly.
- Prefer a short answer plus evidence unless the user wants deep research.
- Request primary sources first; fall back to reputable secondary summaries when needed.
- Avoid using this for purely local codebase questions or tasks that need authenticated browsing.

## Useful Flags

- Use `-` to read the prompt from stdin.
- Use `-o <file>` when another step should consume the final answer from disk.
- Use `--json` only when a downstream script needs structured event output.
- Use `-C <dir>` when repository context helps shape the answer.

## Examples

Quick lookup:

```bash
printf '%s\n' 'Find the latest Bun release notes and link the official changelog.' | codex --search exec -
```

Save the final answer for later parsing:

```bash
cat <<'EOF' | codex --search exec -o tmp/searches/websearch.txt -
Compare the current pricing pages for Vercel and Netlify.
Return a compact table and include source links.
EOF
```
