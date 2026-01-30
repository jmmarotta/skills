# Migration: context/ to .agentprotocol/

This guide migrates from the old `repo-context` skill (`context/` folder) to `agent-protocol` (`.agentprotocol/` folder).

## Mapping

| Old | New |
| --- | --- |
| `context/` | `.agentprotocol/` |
| `context/README.md` | `.agentprotocol/README.md` |
| `context/specs/` | Inline in `plan.md` or `.agentprotocol/README.md` |
| `context/initiatives/` | Inline in `plan.md` if needed |
| `context/projects/` | Inline in `plan.md` if needed |
| `context/prds/PRD-###-*.md` | `.agentprotocol/open/<ID>-<slug>/plan.md` |

## Steps

### 1) Initialize the new structure

```bash
bun ./skills/agent-protocol/scripts/init.ts
```

### 2) Migrate active PRDs

For each active PRD in `context/prds/`:

1. Create a work item:
   `.agentprotocol/open/<ID>-<slug>/`
2. Convert the PRD into `plan.md`:
   - Copy Summary, Goals, Non-goals, User Stories, Verification, Open Questions.
   - Map frontmatter:
     - `id: PRD-###` -> `id: PLAN-<ID>`
     - `createdAt` -> `created_at` (add time and timezone)
     - `updatedAt` -> `updated_at` (add time and timezone)
     - Keep `status` as-is (`draft | ready | in_progress | done | cancelled`).
   - Drop `projectId`, `initiativeIds`, `branchName`, `owners`, `stories` from frontmatter.
   - Move stories into the body sections.
3. Create `build.md` if implementation is in progress:
   - Move Implementation Notes into the Execution Log section.
   - Convert implied steps into Task Plan checkboxes.
4. Add the directory to the Active Work Index in `.agentprotocol/README.md` or run reindex.

### 3) Migrate specs

- Repo-wide invariants should live in `.agentprotocol/README.md`.
- Work-item specific invariants should live in the related `plan.md`.

### 4) Migrate initiatives and projects

- These are organizational containers in the old system. The new system is flat.
- If you need hierarchy, add references in `plan.md` (use `refs:` or a References section).

### 5) Migrate outstanding items

- Move outstanding items into `.agentprotocol/TODO.md`.

### 6) Archive completed PRDs

- Either leave them in `context/` as historical record, or
- Migrate to `.agentprotocol/archive/<ID>-<slug>/`.

## Frontmatter mapping

| Old (PRD) | New (plan.md) |
| --- | --- |
| `id: PRD-001` | `id: PLAN-<ID>` |
| `title` | `title` |
| `status` | `status` |
| `createdAt: 2026-01-19` | `created_at: 2026-01-19T00:00:00Z` |
| `updatedAt: 2026-01-19` | `updated_at: 2026-01-19T00:00:00Z` |
| `projectId`, `initiativeIds` | `refs:` or References section |

## ID padding rule

Avoid zero padding in body identifiers (use `US-1`, not `US-001`).
