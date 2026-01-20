---
id: PRD-001
title: <prd title>
status: draft # draft | ready | in_progress | done | cancelled
projectId: PROJ-001 # optional; omit for standalone PRDs
initiativeIds: # optional; use when standalone without projectId
  - INIT-001
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
- (Optional) `context/specs/verification.md` if adopted

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
