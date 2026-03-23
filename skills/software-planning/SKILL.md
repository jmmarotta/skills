---
name: software-planning
description: Plan non-trivial software changes before coding. Use for requirements framing, approach selection, API or module design, spec writing, verification planning, and rollout or rollback planning.
---

# Software Planning

Plan to prevent complexity before it exists. Use A Philosophy of Software
Design as the default lens: reduce change amplification, cognitive load, and
unknown unknowns before implementation starts.

## Workflow

### Phase 1: Purpose, Interface, and Ownership

1. Inspect the current system first. Find the existing abstractions,
   boundaries, conventions, and integration points before proposing changes.
2. Frame the problem. State the purpose of the module or change clearly, and
   make requirements, constraints, failure modes, and success criteria
   explicit.
3. Draft the high-level design: interfaces, module boundaries, and ownership.
4. Write interface comments early so caller-facing contracts and guarantees are
   explicit.
5. Prefer deep modules and simple caller-facing interfaces.
6. Use information hiding so each important design decision has one clear
   owner.
7. Compare viable alternatives when the choice materially affects complexity;
   design it twice when useful.
8. Ask for user review on the proposed purpose, interfaces, ownership, and
   high-level design before refining internals.

### Phase 2: Internals, Invariants, and Verification

1. Refine the chosen design into internal structure and implementation
   approach.
2. Define invariants, state ownership, error behavior, and compatibility
   expectations.
3. Keep hub or orchestrator modules focused on wiring and composition.
4. Define verification before coding: automated checks, regression coverage,
   manual smoke checks, and residual risk.
5. Define rollout and rollback expectations for risky changes. Call out blast
   radius, failure detection, and recovery path.
6. Bring the plan to the point where implementation can proceed without
   reopening core design questions.
7. Ask for user review on the complete plan before implementation begins.

## Planning Principles

- Prefer deep modules with simple caller-facing interfaces.
- Hide information so each design decision has one owner.
- Centralize sequencing-sensitive state changes in one controlled place rather
  than scattering partial updates across callers.
- Keep hub or orchestrator modules focused on wiring and composition.
- Keep abstraction levels clean within a module.
- Separate general-purpose mechanisms from special-purpose policy.
- Challenge temporal decomposition when it spreads knowledge across steps.
- Enforce invariants in module APIs, not caller convention.

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
- The user has reviewed the complete plan.
