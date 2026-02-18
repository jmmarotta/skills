---
name: code-review
description: Review code for correctness, integration risk, and design quality in code changes. Always load this skill after software-design; this skill is a review-specific overlay for diffs, issue triage, and actionable findings.
---

# Code Review

Use this skill to review diffs, commits, and pull requests.
Load `software-design` first and treat it as the source of truth for
complexity, abstractions, comments, testing and closed-loop verification,
rollback planning, and performance principles. This skill focuses on review
mechanics: scope, evidence, prioritization, and actionable findings.

## Prerequisite

- Load `software-design` before using this skill.

## Review Focus

- Review only the change set unless surrounding code directly affects
  correctness, design, or operational risk.
- Check correctness and security: logic errors, edge conditions, race
  conditions, broken error handling, and data exposure.
- Check integration and design fit: abstraction mismatches, leaked invariants,
  ownership boundary violations, and unnecessary coupling.
- Check performance and operations: obvious complexity risks for expected load,
  N+1 and repeated-scan patterns, blocking hot-path work, and missing
  observability or rollback safety.

## Review Loop

1. **Understand intent and context**: identify what changed and where it fits.
2. **Inspect boundaries first**: review interfaces and call sites before internals.
3. **Verify with evidence**: confirm issues from code paths, callers, types,
   tests, or observable behavior.
4. **Check failure handling**: validate invariants, error paths, blast radius,
   and rollback path for risky changes.
5. **Check verification depth**: confirm test and manual validation coverage is
   appropriate for change risk.
6. **Prioritize findings**: classify by impact and confidence.

## Obtain the Diff

- **No args (default)**: `git diff` and `git diff --cached`.
- **Commit hash**: `git show <commit-hash>`.
- **Branch name**: `git diff <branch-name>...HEAD`.
- **PR URL/number**: `gh pr view <pr-identifier>` then `gh pr diff <pr-identifier>`.
- **Unknown base branch**: `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'`, then `git diff <default-branch>...HEAD`.

After obtaining the diff, gather surrounding context from related callers,
callees, types, and tests.

## Reporting Findings

For each issue, include location (`file:line` or symbol), severity,
confidence, concrete failure scenario or design risk, impact category
(correctness, complexity, performance, security, or operations), and fix
direction when straightforward.

Order findings by priority: blocking issues, non-blocking improvements, then
open questions.

## Applying Judgment

- Do not report speculative issues without a realistic scenario.
- Respect project conventions and match rigor to change impact.
- Accept tactical fixes when appropriate, but note debt and follow-up work.

Goal: surface the highest-impact issues that improve correctness and make the
system easier to understand, change, and operate safely over time.
