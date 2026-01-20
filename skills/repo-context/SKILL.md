---
name: repo-context # must match directory name
description: Always load first in this repo to manage PRDs/specs/projects and keep append-only Implementation Notes.
metadata:
  workflow: repo-context
  init: bun ./context/skills/repo-context/scripts/init.ts
  templates: ./context/skills/repo-context/assets
---

## Always load this skill first
- When working in this repository, load `repo-context` at the start of planning/building work.
- Build work requires an active PRD; read it before edits.
- Active work selection is user-chosen: suggest up to 3 candidates, never auto-select.
- End of planning/building: update the active PRD and append to **Implementation Notes (Append-only)**.
- If `context/` is missing, offer to initialize via `bun ./context/skills/repo-context/scripts/init.ts`.

## Templates
- Use the templates in `./assets/` for new docs.
- Optional parent references (`projectId`, `initiativeIds`, `specRefs`, `codeAreas`) are marked with YAML comments.

## Reference (verbatim): REPO_CONTEXT_SYSTEM.md

# Repo Context System

## Purpose
A repo-local context system that mirrors Linear’s structure while staying AI-friendly and compatible with OpenCode’s default tooling. The system prioritizes colocated, comprehensive documentation so PRDs/specs do not require follow-up questions.

## High-Level Structure
Flat folders for fast `glob`/`read` workflows and minimal path guessing:

```
context/
  README.md
  specs/
  initiatives/
  projects/
  prds/
```

- **Specs**: stable, cross-cutting invariants (data model, planning, verification, standards).
- **Initiatives**: outcome-focused containers; multiple active initiatives are allowed.
- **Projects**: execution containers with milestones (phases) and PRD links.
- **PRDs**: shippable slices; include user stories + implementation notes. PRDs may exist without a project (e.g., small bug fixes).

## Key Rules
- **End of planning**: write/update the active PRD and append Implementation Notes (decisions + next steps).
- **End of building**: update story status (`completedAt`, `passes`) and append Implementation Notes (what shipped + verification).
- **No separate updates folder**: progress is colocated within PRDs under an append-only Implementation Notes section.
- **Completion tracking**: use `completedAt: <DateTimeString> | null` (no boolean `complete`).
- **PRDs must be comprehensive**: include summary, goals/non-goals, edge cases, verification, and open questions (empty when `status: ready`).

## Atomicity
- **Specs are primitives/invariants**: a spec defines stable invariants. If it becomes execution planning or a backlog, split it or move work into PRDs.
- **PRDs are atomic**: one PRD = one shippable slice with clear verification; split if scope expands.

## Suggestion Signals (Non-binding)
Used only to suggest candidate work items when the user is unsure; never auto-select.

- PRDs: incomplete stories (`completedAt: null`), missing required sections, open questions blocking `ready`, or stalled despite recent `updatedAt`.
- Specs: ambiguous/conflicting invariants, missing verification guidance, or too broad to remain a primitive.

## Skill Name
`repo-context`

## Skill Usage Policy (No Hooks)
- **Plan agent**: always load the `repo-context` skill at the start; ensure PRD is complete and append Implementation Notes at the end of planning.
- **Build agent**: always read the active PRD before edits; update story completion fields and append Implementation Notes at the end of building.

## Active Work Selection (User-Chosen, Agent Suggested)
Selection is interactive; the agent never auto-selects. The user chooses the active work item or mode.

**Modes**
- **Plan**: create or refine a spec / initiative / project / PRD into a concrete plan.
- **Build**: implement work against an agreed plan.
- **Review**: PR/code/architecture review with findings and recommendations.
- **Explore**: repo Q&A, discovery, debugging/triage.

**PRD linkage**
- Any mode may be linked to a PRD, but only **Build** requires an active PRD.
- Only encourage creating/selecting a PRD once there is a concrete, shippable plan.
- If `projectId` is set, derive initiative membership from the project; only use `initiativeIds` for standalone PRDs.

**Selection workflow (user-chosen, agent-suggested)**
1. If the user names a work item (`PRD-###`, `context/prds/...`, spec/project/initiative id/path), use it.
2. If the user describes work but does not name an item, suggest up to 3 relevant candidates (ranked by fit + PRD frontmatter `updatedAt`), plus a “Create new PRD” option when appropriate, and ask the user to choose.
3. If the user doesn’t know what to work on, suggest candidates and ask 2–4 questions to converge.

When suggesting candidates, follow `## Atomicity` and `## Suggestion Signals (Non-binding)`.

## Initiative Template
`context/initiatives/INIT-001-<slug>.md`

```md
---
id: INIT-001
title: <initiative title>
status: draft # draft | active | paused | done | cancelled
owners:
  - <name>
createdAt: 2026-01-19
updatedAt: 2026-01-19
successMetrics:
  - <measurable outcome>
nonGoals:
  - <explicitly excluded outcome>
specRefs:
  - context/specs/<relevant>.md
---

# INIT-001: <initiative title>

## Summary
Why this initiative exists and what “better” looks like.

## User / Customer
Who benefits and in what scenario(s).

## Success Metrics
- <metric 1>
- <metric 2>

## Non-goals
- <non-goal 1>
- <non-goal 2>

## Scope Boundaries
**In scope**
- ...

**Out of scope**
- ...

## Projects (Derived)
Projects in this initiative are `context/projects/PROJ-*.md` where frontmatter `initiativeIds` includes `INIT-001`.

## Risks / Dependencies
- ...

## Open Questions
(Keep empty when `status: active`.)
- [ ] ...
```

## Project Template
`context/projects/PROJ-001-<slug>.md`

```md
---
id: PROJ-001
title: <project title>
status: draft # draft | active | paused | done | cancelled
initiativeIds:
  - INIT-001
owners:
  - <name>
createdAt: 2026-01-19
updatedAt: 2026-01-19
codeAreas:
  - apps/<...>/
specRefs:
  - context/specs/<relevant>.md
---

# PROJ-001: <project title>

## Summary
What this project will deliver (not how).

## Outcome
How this project contributes to its initiative success metrics.

## Scope Boundaries
**In scope**
- ...

**Out of scope**
- ...

## Milestones (Project Phases)
### M1 — <milestone name>
**Exit criteria**
- ...

### M2 — <milestone name>
**Exit criteria**
- ...

## PRDs (Derived)
PRDs in this project are `context/prds/PRD-*.md` where frontmatter `projectId: PROJ-001`.

## Risks / Dependencies
- ...

## Verification (Project-level)
(Prefer referencing `context/specs/verification.md`; only list project-specific checks here.)
- ...
```

## Tightened PRD Template
`context/prds/PRD-001-<slug>.md`

```md
---
id: PRD-001
title: <prd title>
status: draft # draft | ready | in_progress | done | cancelled
projectId: PROJ-001 # optional
branchName: <git branch>
owners:
  - <name>
createdAt: 2026-01-19
updatedAt: 2026-01-19
stories:
  - id: US-001
    title: <story title>
    acceptanceCriteria:
      - <criterion>
    priority: 1
    passes: 0
    completedAt: null
    notes: ""
---

# PRD-001: <prd title>

## Summary
1–3 paragraphs describing the user value and the problem being solved.

## Goals
- ...

## Non-goals
- ...

## Scope Boundaries
**In scope**
- ...

**Out of scope**
- ...

## User Stories
### US-001 — <story title> (P1)
**Acceptance Criteria**
- <criterion>

**Notes**
- ...

## Edge Cases
- ...

## Verification
- `bun run typecheck`
- `bun run test`

## Open Questions
(Must be empty when `status: ready`.)
- [ ] ...

## Implementation Notes (Append-only)
### 2026-01-19
**Decisions**
- ...

**Changes**
- ...

**Verification**
- ...

**Follow-ups**
- [ ] ...
```

## Where to Put The Entry Point
Use `context/README.md` as the main index and workflow instructions (not `context/ROADMAP.md`).
