---
name: go-idoims
description: Use for writing, reviewing, refactoring, or structuring Go code with Dave Cheney's Practical Go recommendations around simplicity, readability, naming, package design, API design, error handling, concurrency, and testing.
---

# Go Idoims

Apply Dave Cheney's maintainability-first Go guidance.

## Core Lens

- Optimize for simplicity, readability, and productivity before cleverness.
- Prefer code that is easy to read and change over code that is merely short.
- Design APIs, packages, and project boundaries so they are hard to misuse.
- Keep coupling low by depending on behavior, not incidental implementation details.

## Default Approach

1. Start with the simplest design that keeps the code readable.
2. Name packages, types, functions, and variables for purpose and clarity.
3. Keep packages cohesive and avoid catch-all helpers, globals, and over-factored layouts.
4. Use guard clauses and early returns so the happy path stays easy to follow.
5. Make zero values useful and defaults safe.
6. Accept only the behavior a function needs; do not force callers into dummy values or unnecessary allocations.
7. Handle each error once and choose deliberately between returning, wrapping, or logging it.
8. Treat goroutine lifetime and cancellation as part of the design, not an afterthought.
9. Prefer table-driven tests and focused benchmarks for behavior and performance checks.

## Reference Map

- For the overall maintainability lens, read `references/presentations.md`.
- For Cheney's SOLID-oriented design framing in Go, read `references/solid-go-design.md`.
- For language fundamentals and naming, read `references/fundamentals.md`.
- For comments and exported documentation, read `references/commentary.md`.
- For package boundaries and globals, read `references/package-design.md`.
- For repo and package layout, read `references/project-design.md`.
- For constructor, configuration, and signature design, read `references/api-design.md`.
- For returned errors, wrapping, and comparison, read `references/error-handling.md`.
- For logging policy, read `references/logging.md`.
- For goroutines, channels, and cancellation, read `references/concurrency.md`.
- For tests and benchmarks, read `references/testing.md`.
