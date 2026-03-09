---
name: repo-bootstrap
description: Use for new-repository bootstrap or whole-repo rebaseline work, including baseline tooling, AGENTS setup, dependency policy, and validation planning.
---

# Repo Bootstrap

Use this workflow to set up a repository with clear decisions, minimal dependency drag,
and reliable validation.

## Non-Negotiables

- Interview the user before scaffolding.
- Prioritize technology and dependency decisions over file scaffolding.
- Keep related artifacts together by capability, including source, infrastructure, docs, and tests.
- Default to standard library first in every language profile.
- Add third-party packages only from the blessed add-on lists and only when the
  trigger criteria are met.
- Require tests for all modules and run validation in local and CI workflows.
- Create an initial `AGENTS.md` after setup.
- Establish a self-verification and validation system, including manual checks.

## Workflow

1. Interview the user with `references/interview-checklist.md`.
2. Select language profile defaults from `references/language-profiles.md`.
3. Choose repository topology and co-locate by capability.
4. Select dependencies with the stdlib-first acceptance rubric.
5. Configure tooling baseline and automation.
6. Define automated and manual testing, verification, and backpressure requirements.
7. Write `AGENTS.md` and document the repository verification system.
8. Validate the setup and summarize decisions and tradeoffs.

## Capability-First Repository Organization

Organize by capability so related code and operational context live together.

```text
capability-name/
  src/
  infra/
  docs/
  tests/
```

Use this pattern in both single-package repos and monorepos. Prefer this over
splitting by technical layer across unrelated top-level folders.

## Dependency Acceptance Rubric

Allow a new dependency only if all conditions pass:

- Standard library does not cover the requirement with acceptable complexity.
- The dependency is in the blessed set for the chosen language profile.
- The dependency has active maintenance and low operational risk.
- The team can operate and debug it without hidden specialization.
- The dependency choice is recorded in an ADR with revisit triggers.

If any condition fails, stay with standard library or redesign the approach.

## Tooling and Automation Baseline

Always include:

- `lefthook` for local automation gates.
- Dependabot for update and security PR automation.
- `gh` CLI for repository workflows.
- GitHub Actions for CI by default. Allow skipping only for explicit solo-only local workflows.

Require quality gates in hooks and CI:

- format
- lint
- typecheck or compile
- tests
- build

## Validation and Testing Requirements

- Require tests for every module.
- Require integration tests for external boundaries and critical paths.
- Require backpressure validation for services and concurrent workflows.
- Require explicit pass or fail criteria and failure triage steps.
- Require manual smoke checks for workflows that automation cannot fully cover.

Use `references/verification-profile.md` when defining the repository
verification system.

Use `references/manual-verification-examples.md` to choose manual verification
methods by project type.

Document a verification plan that includes automated gates, manual checks, and
failure triage order.

## Resources

- `references/interview-checklist.md`: Interview prompts and a bootstrap brief
  template.
- `references/language-profiles.md`: Default toolchain and blessed add-ons for
  TypeScript, Go, and Zig.
- `references/verification-profile.md`: Validation and backpressure policy used
  for verification planning.
- `references/manual-verification-examples.md`: Manual self-verification methods
  for TUIs, web apps, and Xcode-based projects.

## Final Deliverables

Produce these outputs for each repository bootstrap:

- Technology and dependency decision brief with ADR links.
- Capability-oriented repository layout.
- Tooling baseline: hooks, Dependabot, and CI configuration.
- Initial `AGENTS.md` tailored to the repository.
- Verification plan with automated and manual checks, backpressure criteria,
  and failure triage.
- Test plan and command list with explicit automated and manual pass or fail
  criteria.
