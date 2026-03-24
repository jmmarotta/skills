# Package Design

Use this reference for choosing package boundaries, naming packages, avoiding globals, and keeping APIs cohesive. For the fuller SOLID framing behind these rules, read `solid-go-design.md`.

## Core Guidance

- Name a package for what it provides, not what it contains.
- Avoid packages named `util`, `utils`, `common`, `base`, or similar dumping grounds.
- Prefer packages with one clear reason to change.
- Prefer guard clauses and early returns so the main flow stays visible.
- Make the zero value useful for exported types where possible.
- Avoid package-level mutable state.

## Package Boundary Rules

- Put code together because it serves one purpose, not because the files feel related.
- Prefer cohesive packages and lower coupling between packages.
- Merge overlapping packages before inventing neutral-sounding buckets.
- Keep important decisions owned by one package instead of scattering them across callers.

## Global State Rules

- Move mutable package state onto structs that explicitly own it.
- Pass dependencies in rather than letting helpers reach for hidden shared state.
- Use interfaces to describe required behavior when it lowers coupling.

## Function Shape Rules

- Keep the successful path unindented when possible.
- Return early on invalid conditions.
- Design packages so callers need little knowledge of internal sequencing.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- SOLID Go Design: <https://dave.cheney.net/2016/08/20/solid-go-design>
- Avoid package names like base, util, or common: <https://dave.cheney.net/2019/01/08/avoid-package-names-like-base-util-or-common>
- Go without package scoped variables: <https://dave.cheney.net/2017/06/11/go-without-package-scoped-variables>
- QCon Shanghai 2018 presentation package design section: <https://dave.cheney.net/practical-go/presentations/qcon-china.html>
