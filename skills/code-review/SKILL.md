---
name: code-review
description: Review code for correctness, design quality, and complexity using principles from "A Philosophy of Software Design." Use this skill when reviewing pull requests, code changes, diffs, or when asked to find bugs, evaluate code quality, identify design problems, or provide feedback on architecture and abstractions.
---

# Code Review

Review code to help developers fight complexity. Complexity is the root cause of most software problems—it makes systems hard to understand and modify. Approach reviews as a collaborative partner, not an enforcer of arbitrary rules.

## The Enemy: Complexity

Complexity manifests in three ways:

1. **Change amplification**: Small changes require modifications in many places
2. **Cognitive load**: Developers must hold too much information in their heads
3. **Unknown unknowns**: It's unclear what code must be modified or what information is needed

Root causes: **dependencies** (code that cannot be understood in isolation) and **obscurity** (important information that is not obvious).

Complexity is necessary but must be managed. The goal: reduce it where possible, encapsulate what remains. Complexity accumulates through hundreds of small decisions—take even minor issues seriously.

## What to Look For

**Bugs** - Correctness issues that will cause problems.
- Logic errors, off-by-one mistakes, incorrect conditionals
- Edge cases: null/empty inputs, error conditions, race conditions
- Security issues: injection, auth bypass, data exposure
- Broken error handling that swallows failures

**Structure** - Does the code fit the codebase?
- Does it follow existing patterns and conventions?
- Are there established abstractions it should use but doesn't?
- Does it introduce unnecessary complexity or dependencies?

**Performance** - Only flag if obviously problematic.
- O(n²) on unbounded data, N+1 queries, blocking I/O on hot paths
- Don't speculate about performance without evidence

## Before Flagging Anything

Be certain. If you call something a bug, you need to be confident it actually is one.

- **Only review the changes** - Do not review pre-existing code unless it affects the design of what's being changed
- **Investigate before flagging** - Don't flag something as a bug if you're unsure; verify first
- **Don't flag style preferences** - Personal preferences are not issues
- **Don't invent hypothetical problems** - If an edge case matters, explain the realistic scenario where it breaks
- **Use the explore agent** - Find how existing code handles similar problems; check patterns, conventions, and prior art before claiming something doesn't fit
- **Admit uncertainty** - If you can't verify something, say "I'm not sure about X" rather than flagging it as a definite issue

## Design Principles

Evaluate code against these principles:

**Strategic thinking**
- Working code isn't enough—design for the long term
- Make continual small investments to improve system design
- The increments of software development should be abstractions, not features

**Module depth**
- Modules should be deep: simple interfaces hiding complex implementations
- A simple interface matters more than a simple implementation
- General-purpose modules are deeper than special-purpose ones
- Different layers should have different abstractions

**Information management**
- Information hiding is the most important technique for deep modules
- Pull complexity downward—make life easier for callers
- Define errors out of existence when possible

**Separation of concerns**
- Separate general-purpose from special-purpose code
- Avoid temporal decomposition (structuring around operation order rather than information hiding)

**Clarity**
- Design for ease of reading, not ease of writing
- Separate what matters from what doesn't; emphasize what matters
- Consider multiple approaches before committing

## Red Flags

When you spot these symptoms, explain the concern and suggest a concrete alternative:

- **Shallow module**: Interface nearly as complex as implementation; doesn't hide enough to justify existence
- **Information leakage**: Design decision reflected in multiple modules; changes ripple across codebase
- **Temporal decomposition**: Code structure mirrors operation order rather than grouping related information
- **Overexposure**: API forces callers to understand rarely-used features for common operations
- **Pass-through method**: Method does almost nothing except forward arguments to another similar method
- **Repetition**: Nontrivial code duplicated in multiple places—missed abstraction opportunity
- **Special-general mixture**: Special-purpose code tangled with general-purpose code
- **Conjoined methods**: Two methods so interdependent that understanding one requires understanding the other
- **Comment repeats code**: Comment adds no information beyond what code says
- **Implementation contaminates interface**: Interface docs describe implementation details callers don't need
- **Vague name**: Name too generic to convey useful information
- **Hard to name**: Difficulty finding a precise name signals confused abstraction
- **Hard to describe**: Long documentation suggests the thing does too much
- **Nonobvious code**: Behavior cannot be understood without significant study

## Review Methodology

1. **Start with the big picture**: Understand what the code accomplishes and how it fits into the broader system. Does this change make the system simpler or more complex overall?

2. **Evaluate interfaces first**: Is it simple and intuitive? Does it hide complexity effectively? Would a caller need implementation details to use it correctly?

3. **Assess abstraction depth**: Is this a deep module (simple interface, complex implementation) or shallow?

4. **Look for information hiding**: Where does knowledge about design decisions live? Is it encapsulated or does it leak?

5. **Consider future developers**: Will someone unfamiliar with this code understand it? Are there unknown unknowns?

6. **Check documentation quality**: Do comments describe things not obvious from code? Are interface contracts clear?

7. **Apply red flags checklist**: Systematically check for the symptoms above.

8. **Evaluate strategically**: Is this a tactical fix adding complexity, or a strategic improvement paying down debt?

## Obtaining the Diff for PRs

When reviewing a PR, branch changes, or code comparison, first obtain the diff based on the input:

1. **No arguments (default)**: Review all uncommitted changes
   - Run: `git diff` for unstaged changes
   - Run: `git diff --cached` for staged changes

2. **Commit hash** (40-char SHA or short hash): Review that specific commit
   - Run: `git show <commit-hash>`

3. **Branch name**: Compare current branch to the specified branch
   - Run: `git diff <branch-name>...HEAD`

4. **PR URL or number**: Review the pull request
   - Run: `gh pr view <pr-identifier>` to get PR context
   - Run: `gh pr diff <pr-identifier>` to get the diff

5. **No base branch specified for branch comparison**: Identify the default branch first
   - Get default branch: `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'`
   - Then compare: `git diff <default-branch>...HEAD`

Use best judgment when processing input. After obtaining the diff, gather context for the surrounding code that the changes interact with—callers, callees, related types, and tests.

## Providing Feedback

Prioritize technical accuracy. Your tone should be matter-of-fact—not accusatory, not overly positive. Write as a helpful assistant.

**For bugs and certain issues**: Be direct. State clearly what the bug is and under what conditions it manifests. No hedging.

**For design suggestions**: Use collaborative language like "Consider..." or "One approach might be..." You're a pair programmer offering perspective, not issuing commands.

**Communicate severity accurately**: Do not over-claim severity. When severity depends on specific scenarios, environments, or inputs, say so explicitly.

**Make issues scannable**: Lead with the problem. Readers should understand the issue without reading closely.

**No flattery**: Avoid unhelpful comments. No "Great job...", "Thanks for...", or similar.

**Explain the "why"**: Connect feedback to underlying principles or real failure scenarios.

**Calibrate severity**:
- **Blocking**: Bugs or design problems causing significant pain if not addressed
- **Suggestions**: Improvements that aren't critical
- **Nitpicks**: Minor issues (keep brief and few)

## Evaluating Comments

Good comments capture information in the designer's mind that couldn't be expressed in code. They describe at a different level of detail—sometimes more abstract (the "why"), sometimes more precise (units, boundaries, invariants).

**Interface comments should:**
- Describe what the module/method does, not how
- Specify all caller needs: parameters, return values, side effects, preconditions
- Be precise about edge cases and error conditions

**Implementation comments should:**
- Explain *why* the code works this way, not *what* it does
- Document non-obvious invariants and assumptions

**Watch for:**
- Comments repeating code in different words
- Implementation details in interface documentation
- Comments better expressed through better naming
- Missing comments on complex code

## Output Format

Structure reviews as follows:

**Summary**: 2-3 sentences on what the change does and your overall assessment. Flag significant concerns upfront.

**Design feedback**: Strategic concerns about architecture, abstraction, complexity in flowing prose. Describe what you observed, why it's a concern, and what you'd suggest. Use collaborative language here.

**Issues**: Numbered list for bugs, problems, and localized feedback. For each:
- State the problem directly (for bugs) or suggest improvements (for design)
- Explain the scenario/conditions where it manifests (for bugs)
- Suggest a fix if straightforward

Examples:
- `auth.ts:42`: **Bug** - Token expiration check uses `<` instead of `<=`, allowing expired tokens at exact expiry time
- `UserService.validate()`: Renaming `data` to `userData` would clarify intent
- `config.py:45`: Duplicates parsing logic in `ConfigLoader`—consider extracting to shared helper

Keep bullets concise. Issues needing more than two sentences belong in Design feedback.

**Questions** (optional): List uncertainties or areas needing more context.

Use backticks for inline references like `functionName`. For locations, use `file_path:line_number` (e.g., `src/auth.ts:142`).

## Applying Judgment

These are guidelines, not laws:

- **Accept tactical fixes when appropriate**: Note the concern, suggest follow-up cleanup, move on
- **Don't over-engineer**: Premature abstraction is its own complexity; wait for patterns to emerge
- **Respect existing conventions**: Consistency within a codebase matters
- **Consider the stakes**: A one-off script doesn't need core library rigor
- **Know when to let go**: Minor disagreements aren't worth prolonging

The ultimate test: will this change make the system easier or harder to understand and modify over time?
