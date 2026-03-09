---
name: llm-tldr
description: Use when `llm-tldr` or `tldr` is available and a task needs token-efficient code understanding, semantic search, symbol context, change-impact analysis, CFG/DFG or slice inspection, daemon checks, or `tldr-mcp` setup.
---

# llm-tldr

Use TLDR to replace broad file reads with the smallest useful analysis.

## Start

- Confirm availability with `command -v tldr`.
- If `tldr` is missing, do not install unless asked; fall back to normal repo tools.
- Prefer TLDR for large or unfamiliar repos. Prefer direct file reads when the target file or 1-2 symbols are already known.

## Pick The Smallest Command

- Overview: `tldr tree <path>`, `tldr structure <path> --lang <lang>`, `tldr extract <file>`
- Focused context: `tldr context <symbol> --project <path>`
- Behavior search: `tldr semantic "<query>" <path>`
- Refactor safety: `tldr impact <symbol> <path>`, `tldr calls <path>`, `tldr change-impact [files]`
- Debugging: `tldr cfg <file> <function>`, `tldr dfg <file> <function>`, `tldr slice <file> <function> <line>`
- Health/setup: `tldr warm <path>`, `tldr daemon status --project <path>`, `tldr doctor`, `tldr-mcp`

## Default Workflows

- Recon: `tldr warm .` -> `tldr tree src/` -> `tldr structure src/ --lang <lang>` -> `tldr context <entry> --project .`
- Search by intent: `tldr warm .` -> `tldr semantic "<behavior>" .`
- Edit safely: `tldr impact <symbol> .` -> `tldr change-impact`
- Debug data/control flow: `tldr cfg <file> <function>` -> `tldr dfg <file> <function>` -> `tldr slice <file> <function> <line>`

## Output Rules

- Summarize findings; avoid dumping large JSON or graphs unless asked.
- Translate results into edits, risks, and next verification.
- If indexes are stale, rerun `tldr warm .`; use `tldr daemon notify <file> --project .` only when the workflow already depends on the daemon.
