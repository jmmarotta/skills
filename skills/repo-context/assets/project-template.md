---
id: PROJ-001
title: <project title>
status: draft # draft | active | paused | done | cancelled
initiativeIds: # optional; omit for standalone projects
  - INIT-001
owners:
  - <name>
createdAt: 2026-01-19
updatedAt: 2026-01-19
codeAreas: # optional
  - apps/<...>/
specRefs: # optional
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
(Prefer referencing `context/specs/verification.md` if adopted; only list project-specific checks here.)
- ...
