# Project Design

Use this reference for repository layout, public API surface, and deciding whether to add another package. For import-graph and abstraction guidance, read `solid-go-design.md`.

## Core Guidance

- Prefer fewer, larger packages over deep trees of tiny packages.
- Keep `main` small and focused on wiring.
- Use `internal/` to hide implementation details that should not become public API.
- Arrange projects so each package has a clear purpose and real code ownership.
- Prefer import graphs that stay acyclic, relatively flat, and easy to reason about.

## Layout Rules

- Do not create a new package by default.
- Split packages only when the boundary is real and reduces coupling.
- Let directories follow package purpose, not organizational fashion.
- Avoid turning one repository into a shared `common` dependency for unrelated systems.

## Public Surface Rules

- Expose only what callers truly need.
- Keep application-specific details out of shared packages.
- Use `internal/` to preserve freedom to refactor internals.

## Main Package Rules

- Keep `cmd/...` packages thin.
- Put policy, wiring, and dependency selection near the top.
- Push concrete dependency choices upward into `main` or top-level orchestration.
- Keep reusable behavior below the application entrypoint.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- SOLID Go Design: <https://dave.cheney.net/2016/08/20/solid-go-design>
- Five suggestions for setting up a Go project: <https://dave.cheney.net/2014/12/01/five-suggestions-for-setting-up-a-go-project>
- Use internal packages to reduce your public API surface: <https://dave.cheney.net/2019/10/06/use-internal-packages-to-reduce-your-public-api-surface>
- QCon Shanghai 2018 presentation project structure section: <https://dave.cheney.net/practical-go/presentations/qcon-china.html>
