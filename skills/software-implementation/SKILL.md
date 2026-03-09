---
name: software-implementation
description: Implement planned software changes with local verification loops. Use after a plan or spec exists, or for debugging, behavior-preserving cleanup, and contained non-trivial edits that do not reopen design work.
---

# Software Implementation

Implement the chosen approach. Do not redesign mid-change unless new evidence
shows the plan is wrong, incomplete, or no longer fits the code you found.

## Start

1. Reread the active plan, spec, or user request.
2. Reread the files you will touch and the nearby callers, callees, tests, or
   types that define the real boundary.
3. Restate the key invariants, interfaces, and verification steps before
   editing when the task is complex or you are resuming after interruption.

## Implementation Rules

- Keep one owner per decision. Do not spread policy, parsing, state rules, or
  caller contracts across multiple modules without a reason.
- Prefer straightforward control flow for short logic.
- Extract helpers only when reused or when extraction materially improves
  clarity, testability, or boundary quality.
- Follow surrounding conventions unless they conflict with the active plan or
  introduce clear design debt.
- Keep comments sparse and high value. Explain intent, invariants, constraints,
  or tradeoffs that code alone cannot make obvious.

## Verification Loop

- For bug fixes, add or update the regression test first when practical.
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
