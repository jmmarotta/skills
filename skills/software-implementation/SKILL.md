---
name: software-implementation
description: Implement planned software changes with local verification loops. Use after a plan or spec exists, or for debugging, behavior-preserving cleanup, and contained non-trivial edits that do not reopen design work.
---

# Software Implementation

Implement the chosen approach. Do not redesign mid-change unless new evidence
shows the plan is wrong, incomplete, or no longer fits the code you found.

## Workflow

### Phase 1: Purpose, Boundaries, and Invariants

1. Reread the active plan, spec, or user request.
2. Reread the files you will touch and the nearby callers, callees, tests, and
   types that define the real boundary.
3. Restate the purpose of the change in one or two sentences.
4. Restate the key interfaces, ownership boundaries, invariants, and named
   verification before editing.
5. Identify the smallest coherent slice to implement first.
6. If the task has drifted into a new design problem, return to
   `software-planning` before coding.

### Phase 2: Local Implementation and Verification Loop

1. Implement one coherent change at a time.
2. Keep one owner per decision. Do not spread policy, parsing, state rules, or
   caller contracts across multiple modules without a reason.
3. Prefer straightforward control flow for short logic, and extract helpers
   only when extraction materially improves clarity, reuse, testability, or
   boundary quality.
4. Write or update interface comments when caller-facing contracts,
   guarantees, side effects, limits, ordering requirements, units, error
   behavior, or important edge cases need to be explicit.
5. Write or update implementation comments when maintainers need to know
   invariants, assumptions, constraints, ownership boundaries, compatibility
   requirements, or non-obvious design or performance tradeoffs.
6. Run the smallest effective automated or manual check after each meaningful
   step.
7. Reassess whether the code still matches the chosen design before
   continuing.

### Phase 3: Simplification, Completion, and Handoff

1. Simplify any shallow abstractions, repeated conditionals, stale comments, or
   mixed abstraction levels introduced during the change.
2. Make sure comments, tests, and code shape reflect the real invariants and
   ownership boundaries.
3. Run the named verification for the full change.
4. Record what was verified and any residual risk.
5. Ask for user review when the implementation is ready.

## Comment Guidance

- Keep comments sparse and high value.
- Write interface comments for what callers must know: contracts,
  guarantees, side effects, limits, ordering requirements, units, error
  behavior, and important edge cases.
- Write implementation comments for what maintainers must know: invariants,
  assumptions, constraints, ownership boundaries, compatibility requirements,
  and non-obvious design or performance tradeoffs.
- Use comments to explain purpose, hidden complexity, or what must remain
  true.
- Prefer comments that reduce obscurity over comments that narrate mechanics.
- Do not use comments to restate obvious code, narrate control flow,
  compensate for weak names, or patch over shallow abstractions.
- When a comment is needed, explain why the code is shaped this way or what
  would break if the constraint is violated.

## Implementation Principles

- Keep one owner per decision. Do not spread policy, parsing, state rules, or
  caller contracts across multiple modules without a reason.
- Prefer straightforward control flow for short logic.
- Extract helpers only when reused or when extraction materially improves
  clarity, testability, or boundary quality.
- Follow surrounding conventions unless they conflict with the active plan or
  introduce clear design debt.

## Verification Guidance

- For bug fixes, add or update the regression test first when practical.
- For bug fixes without adequate test coverage, prefer adding the test first
  and confirming it fails before the fix when practical.
- Run the smallest effective automated check after each meaningful step.
- Use targeted manual checks for UX, integration, or operational behavior that
  automation does not cover well.
- Record what was verified and any residual risk before declaring the task done.

## Refactor Heuristics

- Inline by default when an abstraction is shallow or used once.
- Extract by default when repeated logic, mixed abstraction levels, or hidden
  invariants make the code harder to understand.
- Prefer names that explain intent over comments that restate code.

## Behavior-Preserving Cleanup

- Treat this skill as the default home for simplification and cleanup work.
- Limit cleanup to recently touched code unless the user requests a broader pass.
- Preserve externally visible behavior, contracts, and test expectations.
- Remove shallow abstractions, redundant comments, repeated conditionals, and
  needless nesting when doing so makes the code easier to read.
- Prefer explicit code over dense cleverness, but do not turn cleanup into a
  repo-wide style rewrite.

## Performance Footguns

- Avoid repeated full scans, N+1 patterns, duplicate computation, and needless
  network or disk round-trips.
- Keep hot-path work off blocking paths when practical.
- Measure before and after when performance is part of the requirement.

## Resume After Interruption

- Reread the plan or spec.
- Reread touched files and verification notes.
- Confirm the task has not drifted into a new design problem.
- If the change has drifted, go back to `software-planning` instead of pushing
  forward blindly.

## Escalate Back To Planning

- No plan exists and the task is non-trivial.
- A new caller-facing contract or persisted state appears.
- The change crosses boundaries that were not accounted for.
- New evidence invalidates the chosen approach.

## Done When

- The named verification passes.
- The implementation matches the chosen plan or an explicitly updated one.
- Comments, tests, and code shape reflect the real invariants.
- Residual risk is stated when anything important remains unverified.
- The user has reviewed the implementation.
