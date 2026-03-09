---
name: agent-instruction-writing
description: Use when editing `AGENTS.md`, `SKILL.md`, or agent system prompts.
---

# Agent Instruction Writing

Write compact agent instructions that steer behavior without policy sprawl.

## Operating Principles

1. Treat every line as part of the control surface; keep only steering-relevant information.
2. Preserve hierarchy and give each behavior one canonical home.
3. Make defaults, escalation paths, and stop conditions explicit.
4. Use neutral, testable wording and remove stale, overlapping, and task-local noise.

## Requirements Intake

Collect only inputs that materially change behavior:

- Target artifact and scope (`AGENTS.md`, `SKILL.md`, system prompt).
- Non-negotiable constraints and prohibited actions.
- Default behavior and escalation conditions (ambiguity, risk, secrets, destructive actions).
- Definition of done (validation, artifacts, output shape).
- Known failure modes or prior drift to prevent recurrence.

## Drafting Workflow

1. Define trigger and scope in frontmatter or opening lines.
2. State default behavior before exceptions.
3. Add escalation rules, tool boundaries, destructive safeguards, and output rules.
4. Keep reusable procedure in the main file; move bulky detail to `references/`.
5. Run an editing pass for compression and contradiction.

## Editing Pass

- Replace explanation with direct directives.
- Keep one responsibility per line; encode conditions directly (`If X, do Y; else do Z`).
- Remove filler, repetition, and examples that add no control value.
- Check for global/local conflicts, duplicate ownership, unbounded absolutes, and conflicting examples.

## Neutral Language

Default to neutral prompts that do not force outcomes.

- Prefer: `Inspect component behavior and report findings with evidence.`
- Avoid: `Find a bug in component X.`

## Artifact Protocols

### `AGENTS.md`

- Preserve hierarchy (system > developer > user > file-local policy).
- Make default behavior explicit and keep question policy narrow.
- Define tool boundaries, destructive safeguards, and output rules.
- Use `AGENTS.md` as a routing layer, not a policy dump.
- Minimize churn on updates; preserve valid text verbatim where possible.

### `SKILL.md`

- Put trigger conditions in frontmatter `description`.
- Keep the body procedural; do not spend body space on trigger detection.
- Use progressive disclosure: core workflow in `SKILL.md`, heavy detail in `references/`.
- Include command snippets only when deterministic and reusable.
- Use this skill for instruction text quality; use `skill-creator` for package structure, bundled resources, initialization, and validation.

### System Prompts

- Reserve them for highest-level invariants, safety boundaries, and default behavior.
- Do not pack in task-local detail that belongs in lower-priority prompts or skills.
- State precedence-sensitive rules and output constraints clearly and minimally.
- Remove stylistic guidance that does not materially change behavior.

## Completion Contract

Before considering instruction work complete, verify:

- Trigger text routes the intended tasks.
- Defaults, escalation rules, and safeguards are explicit.
- Each behavior has one canonical home across related instruction files.
- Non-obvious or high-risk directives include a good/bad example when omission would cause misreads.
- Validation commands pass when available, and the instructions are executable without hidden assumptions.

Goal: concise instruction sets that reliably steer agent behavior without bloating context.
