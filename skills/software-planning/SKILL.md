---
name: software-planning
description: Plan non-trivial software changes before coding. Use for requirements framing, approach selection, API or module design, spec writing, verification planning, and rollout or rollback planning.
---

# Software Planning

Plan to prevent complexity before it exists. Use A Philosophy of Software
Design as the default lens: reduce change amplification, cognitive load, and
unknown unknowns before implementation starts.

## Workflow

1. Inspect the current system first. Find the existing abstractions, ownership
   boundaries, conventions, and integration points before proposing changes.
2. Frame the problem. Make requirements, constraints, failure modes, and
   success criteria explicit.
3. Design interfaces and ownership before internals. Give each important
   decision one clear home.
4. Compare viable approaches when tradeoffs materially matter. Recommend one
   approach and explain why it wins.
5. Define verification before coding. Name the automated and manual checks that
   will prove the change is done.
6. Define rollout and rollback expectations for risky changes. Call out blast
   radius, failure detection, and recovery path.
7. Stop when the plan is specific enough that implementation can proceed
   without reopening core design questions.

## Boundary Drift Protocol

Load `references/boundary-drift-protocol.md` before implementation when any of
the following is true:

- The change touches 2 or more concerns.
- The change touches a hub or orchestrator module.
- The change spans more than 2 files or introduces persisted state, retries,
  or caller-facing contracts.
- The change affects discovery or control surfaces such as help, settings,
  navigation, palettes, or catalogs.

If triggered, treat the reference as mandatory and produce the required
Boundary Plan before coding.

## Planning Principles

- Prefer deep modules with simple caller-facing interfaces.
- Hide information so each design decision has one owner.
- Keep abstraction levels clean within a module.
- Separate general-purpose mechanisms from special-purpose policy.
- Challenge temporal decomposition when it spreads knowledge across steps.

## Verification Planning

- Match verification depth to risk.
- Prefer the lowest effective automated check first.
- For bug fixes, plan a regression test that fails before the fix and passes
  after it.
- Include manual smoke checks when automation is impractical.
- Record residual risk when anything important remains unverified.

## Questions

Ask only when the answer changes the design:

- scale or load assumptions
- performance budgets
- external integration constraints
- expected future variation
- operational, security, or rollback requirements

Do not ask when the design would be the same either way.

## Done When

- The chosen approach is explicit.
- Interfaces, module boundaries, and ownership are clear.
- Invariants and failure handling are named.
- Verification is defined.
- Rollout or rollback expectations are clear when risk warrants them.
