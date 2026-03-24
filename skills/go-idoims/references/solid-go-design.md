# SOLID Go Design

Use this reference when the task is about package boundaries, abstractions, interfaces, composition, or import-graph design.

## Core Guidance

- Judge design by whether code is rigid, fragile, immobile, complex, or verbose.
- Prefer cohesive packages with one clear reason to change.
- Use composition and embedding to extend behavior without pretending Go has inheritance.
- Express dependencies in terms of small interfaces and shared behavior.
- Push implementation details upward so lower-level packages depend on abstractions.

## SOLID Applied To Go

### Single Responsibility

- Organize functions, types, and methods into naturally cohesive packages.
- Avoid catch-all packages because many responsibilities create many reasons to change.
- Treat package naming as part of design quality, not just style.

### Open / Closed

- Prefer composition and embedding to extend behavior.
- Do not expect embedding to behave like subtype polymorphism.
- Keep exported types open to extension through composition rather than repeated modification of callers.

### Liskov Substitution

- In Go, substitution is mainly about interfaces, not inheritance hierarchies.
- Small interfaces are easier to implement faithfully.
- Favor contracts where implementations can truly be swapped without surprising callers.
- Require no more and promise no less.

### Interface Segregation

- Accept the smallest interface that lets a function do its job.
- Do not force callers to depend on methods the function does not need.
- Narrow broad concrete dependencies like `*os.File` toward behavior like `io.Writer` when possible.

### Dependency Inversion

- Keep the import graph acyclic, wide, and relatively flat.
- Push concrete wiring and dependency selection toward `main` or top-level orchestration.
- Let lower-level packages depend on abstractions rather than application-specific details.

## Design Review Questions

- Does this package have one clear reason to change?
- Is a concrete dependency being used where a narrow behavior contract would do?
- Is this embedding choice real composition, or a hidden attempt at inheritance?
- Does the import graph show decoupling, or are details leaking downward?

## Sources

- SOLID Go Design: <https://dave.cheney.net/2016/08/20/solid-go-design>
- Practical Go: <https://dave.cheney.net/practical-go>
