---
name: research-grounding
description: Conduct evidence-backed research using retrieved sources only. Use for current information, multi-source synthesis, citations, conflict resolution, review memos, or answers where unsupported claims are risky. Pair with `websearch` when external retrieval is needed.
---

# Research Grounding

Use this skill for research, review, and synthesis tasks where correctness depends on retrieved evidence.

Load `websearch` when the answer depends on current information or external sources. Keep retrieval mechanics in `websearch`; keep evidence discipline, citation behavior, and completeness checks here.

## Default Workflow

1. Plan the research in 3-6 sub-questions.
2. Retrieve evidence for each sub-question.
3. Follow 1-2 second-order leads only when they may change the conclusion.
4. Recover from empty, partial, or suspiciously narrow results before concluding.
5. Synthesize findings, resolve conflicts, and attach citations to supported claims.
6. Verify requirement coverage, grounding, citation format, and blocked items before finalizing.

## Retrieval Rules

- Use tools whenever they materially improve correctness or grounding.
- Do not stop after the first plausible answer if another retrieval step could change the conclusion.
- Prefer primary sources first; use reputable secondary sources when primary material is unavailable or incomplete.
- If the task has multiple independent lookups, gather them in parallel and then synthesize before more tool calls.
- If later work depends on a prerequisite lookup, resolve the dependency first.

## Empty Result Recovery

If a lookup returns empty, partial, or suspiciously narrow results:

- retry with alternate wording,
- broaden the filter, timeframe, or source set,
- perform a prerequisite lookup,
- or use an alternate source.

Only report that no results were found after at least one fallback strategy.

## Grounding Rules

- Base claims only on retrieved evidence or user-provided context.
- Distinguish supported fact from inference. Label inferences explicitly when they matter.
- If sources conflict, state the conflict directly and attribute each side.
- If support is weak or missing, narrow the claim or say it is unsupported.

## Citation Rules

- Cite only sources retrieved in the current workflow.
- Never invent citations, URLs, identifiers, or quote text.
- Attach citations to the specific claims they support, not only at the end.
- Match the host's required citation format exactly.

Read `references/citation-formats.md` when the host requires a specific citation style.

## Completeness Contract

- Treat the task as incomplete until every requested item is covered or marked `[blocked]`.
- Keep an internal checklist of sub-questions and deliverables.
- For batched, listed, or paginated material, determine expected scope when possible and confirm coverage before finalizing.
- For each blocked item, state exactly what is missing.

## Output Shape

Unless the user requests a different structure, return:

1. Direct answer
2. Key evidence
3. Conflicts or uncertainty
4. Blocked items
5. Sources

Keep the answer concise unless the user asks for deep research or memo-style output.

Read `references/research-output-templates.md` when the task needs a comparison, memo, or risk review.

## Verification Loop

Before finalizing:

- check that every requested item is covered,
- check that factual claims have support,
- check that citations match the requested format,
- check that irreversible next steps are separated from the research answer.

## Reference Guide

- Read `references/source-quality-rubric.md` when source quality, recency, or authority affects the answer.
- Read `skills/websearch/SKILL.md` for retrieval mechanics, prompt shape, and source-link collection.
