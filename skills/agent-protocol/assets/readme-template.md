# Agent Protocol

Human and agent coordination interface. Goal: self-contained work items that minimize follow-up questions.

## Active Work Index

<!-- ACTIVE_WORK_INDEX_START -->
| Path | Description |
| ---- | ----------- |
| `open/{{ID}}-example/` | Example work item (delete when starting real work). |
<!-- ACTIVE_WORK_INDEX_END -->

## Directory Layout

```
.agentprotocol/
  README.md
  TODO.md
  open/
    <ID>-<slug>/
      plan.md
      build.md
      build/
      artifacts/
  archive/
```

## Invariants

- Navigate by work item directory; everything relevant lives there.
- Prefer few concepts: TODO, open, archive, plan, build.
- Move entire directories to archive when done or cancelled.

## ID Format

`ID` is Crockford base32 encoding of UUIDv7 bytes.
- Uppercase, fixed 26 chars, left-padded with `0`.
- Alphabet: `0123456789ABCDEFGHJKMNPQRSTVWXYZ`.
- Encode the 16 UUID bytes (big-endian) using the Crockford alphabet.
- IDs are immutable; paths may change.

## Slug Format

`<slug>` is lowercase ASCII hyphen-case. Avoid renames.

## Timestamps

RFC3339 with timezone for `created_at` and `updated_at` (recommend UTC `Z`).

## Index Rules

- Active Work Index rows are sorted by Path (lexicographic).
- Build File Index rows are sorted by Path (lexicographic).
- Descriptions are single-line; escape `|` as `\|`.

## plan.md

Optional design surface. May include PRDs, user stories, acceptance criteria, constraints, and invariants.
- `status`: `draft | ready | done | cancelled`.
- `ready` means Open Questions is empty (or risks explicitly accepted).

## build.md

Execution surface. Tasks + verification + append-only log. May exist without a plan (ad-hoc).
- If `build/` exists, include a Build File Index table in `build.md`.
- `build/*.md` files are plain markdown by default (no required frontmatter).

## Archiving

When a work item is `done | cancelled`:
1. Move the directory from `open/` to `archive/`.
2. Remove the row from the Active Work Index.

## Scripts

- Initialize: `bun ./skills/agent-protocol/scripts/init.ts`
- Create work item: `bun ./skills/agent-protocol/scripts/create.ts "Title" [--plan] [--slug <slug>]`
- Reindex: `bun ./skills/agent-protocol/scripts/reindex.ts [--next]`
