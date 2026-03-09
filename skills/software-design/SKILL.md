---
name: software-design
description: Apply A Philosophy of Software Design as an explicit lens for software work.
---

# Software Design

Use this skill as the APOSD judgment layer.

- `software-planning` defines the planning workflow and decision record.
- `software-implementation` defines the implementation workflow and decision record.
- `software-design` sharpens the design judgment used inside that workflow.

## Core Lens

- Optimize for lower long-term complexity, not lower short-term effort.
- Treat complexity as change amplification, cognitive load, and unknown unknowns.
- Prefer deep modules: simple interface, powerful hidden internals.
- Give each important design decision one clear home.
- Pull complexity downward; do not force every caller to learn rare details.
- Define errors out of existence when design can prevent them.

## Working Style

1. Inspect the existing system before proposing changes.
2. State the purpose of the module, API, or change in one or two sentences.
3. Design the interface before the implementation details.
4. Check whether responsibilities, invariants, and decisions are concentrated or scattered.
5. Prefer a slightly more powerful general mechanism over repeated special cases when it keeps the interface simple.
6. Name the main design risks, rejected alternatives, and verification needed to prove the design holds.

## Design Checks

- `Purpose`: Can the module or API be described simply, without mixing multiple concerns?
- `Interface`: Does the caller-facing surface stay small, stable, and easy to learn?
- `Information hiding`: Is each design decision owned in one place?
- `Dependencies`: Can most parts be understood without reading distant code?
- `Error behavior`: Are invalid states prevented early and handled consistently?
- `Comments`: Do comments add intent, constraints, or invariants instead of narrating code?

## Escalate When

- The design spans multiple concerns or layers.
- The interface is getting easier for implementers but harder for callers.
- A change introduces pass-through methods, temporal decomposition, or repeated conditionals.
- You cannot name the abstraction cleanly.
- The code works, but understanding or changing it will still be expensive.

## Design Heuristics

### What Complexity Looks Like

- `Change amplification`: one logical change forces edits in many places.
- `Cognitive load`: a reader must keep too many facts in mind.
- `Unknown unknowns`: it is unclear what to change or what depends on what.

The two main sources are dependencies and obscurity. Prefer designs that make
relationships local and important facts obvious.

### Module Depth

- Prefer deep modules: simple interface, substantial hidden functionality.
- Do not optimize for a trivially small implementation if it makes callers do more work.
- A helper that only forwards arguments or exposes internal details is usually shallow.
- General-purpose mechanisms are often deeper than many special-purpose branches.

### Information Hiding

- Each important design decision should have one owner.
- Hide data representation, policy decisions, retry rules, formatting rules,
  and workflow sequencing behind stable interfaces.
- If changing one rule requires updates in multiple modules, the design likely
  leaks information.

### Interface Design

- Design for the common case first.
- Make the easy path obvious and the dangerous path explicit.
- Avoid interfaces that force callers to pass bookkeeping data that exists only
  because of internal implementation choices.
- Keep abstraction levels consistent within one interface.

### Red Flags

- `Shallow module`: the interface is not much simpler than the implementation it hides.
- `Information leakage`: the same design knowledge appears in multiple modules.
- `Temporal decomposition`: structure follows execution order instead of ownership.
- `Overexposure`: common use forces callers to learn rarely used features.
- `Pass-through method`: a method mostly forwards to another layer.
- `Repetition`: nontrivial code is duplicated instead of abstracted.
- `Special-general mixture`: general mechanism and one-off policy are tangled.
- `Conjoined methods`: one method cannot be understood without another.
- `Comment repeats code`: a comment says only what is already obvious from nearby code.
- `Implementation documentation contaminates interface`: interface docs include implementation details callers do not need.
- `Vague name`: a name is too imprecise to convey useful meaning.
- `Hard to pick name`: difficulty naming something suggests the abstraction is unclear.
- `Hard to describe`: the module owns too many concerns.
- `Nonobvious code`: meaning or behavior is not easy to understand from a quick read.

When a red flag appears, reconsider the boundary before polishing the code.

### Comments

- Interface comments explain what the caller must know: contract, guarantees,
  side effects, units, ordering, limits, and edge cases.
- Implementation comments explain why the design exists: invariants,
  assumptions, non-obvious tradeoffs, or performance constraints.
- Do not use comments to restate code or compensate for weak abstractions.

### Error Behavior

- Prefer designs that make misuse hard or impossible.
- Standardize error handling at boundaries rather than scattering bespoke checks.
- Make failure modes predictable: one condition, one place, one policy.
- When possible, remove entire classes of errors through stronger interfaces or
  better defaults.

### Review Questions

- What is the module's purpose, and can it be stated simply?
- Which design decisions does it own, and which ones leak outward?
- Does the interface minimize what callers must learn?
- Are there repeated patterns that suggest a missing abstraction?
- Will the next likely change be local or cross-cutting?
- What would make this easier to explain to a new maintainer?
