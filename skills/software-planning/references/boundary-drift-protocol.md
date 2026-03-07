# Boundary Drift Prevention Protocol

Use this protocol to prevent feature work from accumulating domain logic in hub
modules, splitting ownership across files, and creating follow-up boundary
rework.

## Trigger Conditions

Run this protocol before implementation when any trigger is true:

- The change touches 2+ concerns (for example parsing + execution, auth +
  session, UI + state).
- The change touches a hub/orchestrator module (entrypoint, router, facade,
  composition root, coordinator, controller).
- The change spans more than 2 files or introduces new persisted state or
  caller-facing contracts.
- The change adds commands, retries, or discovery/control surfaces (help,
  palette, catalog, settings).

## Required Pre-Implementation Artifact: Boundary Plan

Do not implement until an explicit Boundary Plan exists.

The plan must include:

1. Ownership map: each design decision has exactly one owning module.
2. Interface sketch: module APIs and caller contracts.
3. Invariants: state, retry, ordering, persistence, and error guarantees.
4. Compatibility strategy: how existing callers remain stable.
5. Verification matrix: unit/integration/e2e/manual checks per boundary.

## Hard Constraints

- Hub/orchestrator modules are wiring/composition only.
- One decision has one owner (no duplicated policy/type ownership).
- No post-validation state mutation without re-validation.
- No dead union variants (every type branch has runtime behavior and tests).
- Discovery/control surfaces render from metadata, not duplicated hand lists.
- If a hub file grows materially during feature work, extract boundaries in the
  same change.

## Stop-Ship Checklist

All items must be true before completion:

- Every changed behavior maps to exactly one owner module.
- No mixed abstraction levels in a single module.
- Invariants are enforced in module APIs, not caller convention.
- Boundary tests exist for parser/policy/runtime/state seams.
- For bug fixes, a regression test fails before the fix and passes after it.
- Verification evidence is recorded with residual risk called out.

## Boundary Plan Format (Inline)

Use this compact format in design notes or implementation plans:

- Change intent:
- Trigger reason(s):
- Ownership map:
- Interface sketch:
- Invariants:
- Compatibility strategy:
- Verification matrix:
- Residual risk:
