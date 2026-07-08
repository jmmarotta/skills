---
name: web-access
description: Use for any web access - searching for authoritative external docs, current information, release notes, pricing, or news, AND fetching or extracting content from a specific URL. Routes both through codex so raw page content stays out of the parent context.
---

# Web Access

Use `scripts/codex-web.sh` as the single interface for all web access: both
open-ended search and fetching specific URLs. It runs Codex with web search in
an isolated subprocess and prints only the final answer, so neither raw page
content nor Codex CLI transcript noise (banner, session info, token usage)
enters the parent context.

Do not use the built-in webfetch tool. Do not call `codex exec` directly for
web access; the bare CLI prints a full session transcript around the answer.

Pipe the prompt on stdin. On failure (or an empty answer) the script prints
the Codex log to stderr and exits non-zero.

## Two Verbs

- **Search**: open question, no URL yet. Ask codex to find and synthesize.
- **Fetch**: you have URL(s). Ask codex to open them and extract what you need.

Both use the same script; only the prompt differs.

## Search Recipe

```bash
skills/web-access/scripts/codex-web.sh <<'EOF'
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
precision matters, since you only get the answer back, not the page.

```bash
skills/web-access/scripts/codex-web.sh <<'EOF'
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

## Long Extractions

For long content (full docs, changelogs) you want to read in slices instead of
holding in context, redirect the script's stdout to a file:

```bash
skills/web-access/scripts/codex-web.sh > tmp/web/vercel-vs-netlify.md <<'EOF'
Compare the current pricing pages for Vercel and Netlify.
Return a compact table and include source links.
EOF
```

## Examples

Quick lookup:

```bash
printf '%s\n' 'Find the latest Bun release notes and link the official changelog.' \
  | skills/web-access/scripts/codex-web.sh
```

Targeted fetch:

```bash
skills/web-access/scripts/codex-web.sh <<'EOF'
Open https://docs.example.com/api/auth and extract the token refresh flow.
Quote the exact endpoint paths and required headers verbatim.
EOF
```
