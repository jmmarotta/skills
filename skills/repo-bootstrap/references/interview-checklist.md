# Interview Checklist

Interview before scaffolding. Ask questions in small batches and prioritize
high-impact decisions.

## Pass 1: Outcome and Scope

Ask first:

1. What are we building and who is it for?
2. What are the critical user journeys or operator workflows?
3. What must be true for this repository setup to be considered successful?

## Pass 2: Architecture and Runtime Constraints

Ask next:

1. Which language profile should we use: TypeScript, Go, Zig, or polyglot?
2. What deployment targets are required (CLI, API, web, worker, embedded)?
3. What runtime constraints matter most (latency, throughput, memory, startup)?
4. Do we need monorepo support now or later?

## Pass 3: Operational Constraints

Ask when relevant:

1. What security and compliance expectations apply?
2. What release cadence and rollback requirements do we need?
3. What environments are required (local, CI, staging, production)?
4. Which failure modes are unacceptable?

## Dependency and Tooling Decisions

Confirm before implementation:

1. Which requirements cannot be handled by standard library?
2. Which blessed add-ons are needed and why?
3. Which third-party choices need ADRs and revisit triggers?

## Bootstrap Brief Template

Capture and share this brief before scaffolding:

- Project goal and constraints
- Selected language profile
- Repository topology decision
- Dependency decisions with rationale
- Required automation and quality gates
- Testing and backpressure validation scope
- Initial `AGENTS.md` requirements
- Verification scope and manual-check strategy
