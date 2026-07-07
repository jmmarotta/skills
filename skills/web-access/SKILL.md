---
name: web-access
description: Use for any web access - searching for authoritative external docs, current information, release notes, pricing, or news, AND fetching or extracting content from a specific URL. Routes both through codex so raw page content stays out of the parent context.
---

# Web Access

Use `codex --search exec` as the single interface for all web access: both
open-ended search and fetching specific URLs. `--search` is a top-level Codex
flag, so it must appear before `exec`.

Do not use the built-in webfetch tool. Codex fetches and reads pages in an
isolated subprocess and returns only a digest, so large or JS-heavy pages
never pollute the parent context.

## Two Verbs

- **Search**: open question, no URL yet. Ask codex to find and synthesize.
- **Fetch**: you have URL(s). Ask codex to open them and extract what you need.

Both use the same command; only the prompt differs.

## Search Recipe

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

## Fetch Recipe

State the URL(s) and exactly what to extract. Ask for verbatim quotes where
precision matters, since you only get the digest back.

```bash
cat <<'EOF' | codex --search exec -
Open the URL(s) below and extract the requested content.
Quote exact text verbatim for anything precise (code, config, numbers, API
signatures). Return markdown. Note anything you could not access.

URL: <url>
Extract: <what you need from the page>
EOF
```

Batch multiple URLs in one prompt when they serve the same question.

GitHub repos: do not fetch repo pages as HTML. Instead
`git clone --depth 1 <repo> /tmp/<name>` and read files locally.

## Prompting Rules

- State the exact question, timeframe, and region if they matter.
- Ask for source links explicitly.
- Be specific about what to extract; a vague fetch prompt returns a vague
  summary and the raw page is not available to re-read.
- Prefer a short answer plus evidence unless the user wants deep research.
- Request primary sources first; fall back to reputable secondary summaries.
- Avoid using this for purely local codebase questions or tasks that need
  authenticated browsing.

## Useful Flags

- Use `-` to read the prompt from stdin.
- Use `-o <file>` when another step should consume the answer from disk, or
  when extracting long content (full docs, changelogs) you want to read in
  slices instead of holding in context.
- Use `--json` only when a downstream script needs structured event output.
- Use `-C <dir>` when repository context helps shape the answer.

## Examples

Quick lookup:

```bash
printf '%s\n' 'Find the latest Bun release notes and link the official changelog.' | codex --search exec -
```

Targeted fetch:

```bash
cat <<'EOF' | codex --search exec -
Open https://docs.example.com/api/auth and extract the token refresh flow.
Quote the exact endpoint paths and required headers verbatim.
EOF
```

Save a long extraction for later parsing:

```bash
cat <<'EOF' | codex --search exec -o tmp/web/vercel-vs-netlify.md -
Compare the current pricing pages for Vercel and Netlify.
Return a compact table and include source links.
EOF
```
