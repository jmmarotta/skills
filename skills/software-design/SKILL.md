---
name: software-design
description: Proactive software design guidance for architecture, interfaces, and implementation planning. Use this skill when helping users make decisions before or during implementation: planning features, designing APIs, structuring modules, or evaluating architectural approaches.
---

# Software Design

Design to prevent complexity before it exists. Use "A Philosophy of Software Design" (John Ousterhout) as the north star.

## The Enemy: Complexity

Complexity shows up as:
1. **Change amplification**: small change touches many places
2. **Cognitive load**: too much must be held in mind
3. **Unknown unknowns**: unclear what to change or what info is needed

Root causes:
- **Dependencies**: code cannot be understood in isolation
- **Obscurity**: important info is not obvious

Treat even small design choices as cumulative complexity decisions.

## Design Methodology

1. **Understand the problem**: requirements, constraints, context, boundaries
2. **Identify abstractions**: what concepts should be modules
3. **Design interfaces first**: simple caller-facing APIs, hidden internals
4. **Evaluate information hiding**: each design decision has one home
5. **Consider alternatives**: compare options before committing
6. **Plan a verification loop**: define automated and manual checks before implementation
7. **Plan failure and rollback**: define failure detection, blast radius, and recovery path
8. **Validate fit**: align with existing patterns and conventions

## Design Principles

**Strategic thinking**
- Optimize for long-term maintainability, not just working code
- Make continual small design investments
- Build abstractions, not only features
- Evaluate system-wide effects of choices

**Module depth**
- Prefer deep modules: simple interface, complex internals
- Simpler interface matters more than simpler implementation
- General-purpose modules are usually deeper
- Keep abstraction levels distinct across layers

**Information management**
- Information hiding is primary
- Pull complexity downward to implementations
- Define errors out of existence when possible
- Encapsulate each design decision in one place

**Separation of concerns**
- Separate general-purpose and special-purpose code
- Avoid temporal decomposition
- Keep related information together; unrelated information apart

## Testing and Closed-Loop Verification

Use a closed loop: every design should include how correctness and user-visible
behavior will be verified.

**Coverage strategy**
- Prefer automated tests at the lowest effective level first.
- Add **unit tests** for pure logic and edge conditions.
- Add **integration tests** for module boundaries, data flows, and external
  dependencies.
- Add **end-to-end tests** for critical user journeys where system interactions
  matter.
- Add **manual smoke tests** wherever automation is impractical or too costly,
  based on agent judgment.

**Visual and UX checks**
- For UI changes, verify visual correctness in realistic environments
  (desktop/mobile breakpoints, loading/error/empty states, and interaction
  states).
- Capture the smallest repeatable visual check that can later be automated.

**Verification evidence**
- Record what was run, what was manually checked, and any remaining unverified
  risk.
- If closed-loop verification is not feasible, state why and define the
  follow-up needed.

## Performance Considerations

- Prefer lower time-complexity solutions for hot paths when practical
  (`O(n)`/`O(n log n)` over `O(n^2+)`).
- Consider space complexity and allocation behavior alongside runtime.
- State workload assumptions (data volume, request rate, concurrency) and
  design for expected scale.
- Measure before optimizing: establish a baseline, identify bottlenecks, and
  verify post-change impact.
- Avoid common regression patterns (repeated full scans, N+1 queries,
  unnecessary network round-trips, duplicate computation).
- Document intentional tradeoffs when choosing readability or flexibility over
  peak performance.

## Coding Style

- Prefer straightforward inline flow for short methods; extract helpers only when reused or when they materially clarify intent.
- Keep helpers single-purpose and side-effect free where possible.
- Use clear, direct variable names; introduce additional variables only when they materially improve readability, avoid shadowing/conflicts, or provide a measurable performance benefit (for example, caching expensive repeated computations).

## Comments as Design Tools

Comments are design tools, not decoration. They should add information code cannot express (higher-level intent or precise constraints).

**Interface comments**
- Explain what, not how
- Define caller contract: params, returns, side effects, preconditions, errors
- Document edge cases, limits, units, ordering guarantees
- Exclude implementation details

**Implementation comments**
- Explain why this approach exists
- Document non-obvious invariants, assumptions, dependencies
- Capture correctness/performance tradeoffs maintainers must preserve

**Avoid**
- Restating code in English
- Using comments to compensate for weak names/abstractions
- Stale comments that drift from behavior

## Red Flags to Avoid

- **Shallow module**: interface complexity close to implementation complexity
- **Information leakage**: one design decision spread across modules
- **Temporal decomposition**: structure follows execution order, not information
- **Overexposure**: callers must learn rare details for common use
- **Pass-through method**: mostly forwards arguments
- **Repetition**: duplicated logic
- **Special-general mixture**: special-purpose tangled with general-purpose
- **Conjoined methods**: methods cannot be understood independently
- **Hard to name**: abstraction is unclear
- **Hard to describe**: too much responsibility

If these appear, reconsider decomposition.

## Gathering Context

Before recommending designs:
- Use the explore agent to find existing patterns/conventions
- Identify current abstractions and relationships
- Find integration points with existing code
- Check prior approaches and outcomes
- Look for similar solved problems

Do not design in a vacuum; ground recommendations in existing code.

## Questions to Clarify

Ask only when answers materially change the recommendation:
- **Scale and load**: data volume, request rate, concurrency, peak behavior
- **Performance budgets**: latency, throughput, memory, startup/render targets
- **Integration boundaries**: external systems, compatibility constraints,
  failure modes
- **Extensibility horizon**: expected future variation and likely change axes
- **Operational constraints**: deployment limits, observability,
  security/compliance needs
- **Verification and rollback**: confidence level, test depth, rollback
  requirements

Do not ask when the design would be the same regardless.
