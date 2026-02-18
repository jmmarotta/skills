# Language Profiles

Use standard library first by default. Add dependencies only from the blessed
lists and only when the trigger criteria are met.

## Shared Defaults

Apply to all profiles:

- Use `lefthook` for local quality gates.
- Configure Dependabot for dependency and security updates.
- Use `gh` CLI for repository and PR workflows.
- Run CI in GitHub Actions by default.
- Require format, lint, compile or typecheck, tests, and build gates.
- Record major technology and dependency decisions in ADRs.

## TypeScript Profile

Default toolchain:

- `bun`
- `typescript`
- `tsgo`
- `oxlint`
- `oxfmt`

Policy:

- Prefer Bun APIs before adding packages.
- Use `turbo` for TypeScript monorepos.

Blessed add-ons when applicable:

- `opentui` for interactive terminal UIs in TypeScript CLIs.
- `solid-js` for reactive web UI.
- `@tanstack/router` for client-side routing.
- `hono` for HTTP APIs.
- `zod` for runtime schema validation at boundaries.
- `ai` SDK for LLM application features.

## Go Profile

Default toolchain:

- Go standard toolchain and standard library.
- `Makefile` is required.

Policy:

- Use Go standard library as the first implementation path.
- Use `go work` plus `Makefile` for Go monorepos.
- Use `turbo` only for polyglot repos that already rely on Node or Bun tooling.

Blessed add-ons when applicable:

- `cobra` for CLI applications.
- `chi` when router complexity exceeds `net/http` convenience.
- `sqlc` plus a migration tool when SQL-heavy systems need typed query workflows.
- `testify` only when assertion readability is materially improved.

## Zig Profile

Default toolchain:

- Zig standard library.
- `build.zig` and `build.zig.zon`.
- `zig fmt`, `zig test`, and `zig build`.

Policy:

- Keep dependency count minimal.
- Treat `build.zig` as the source of truth for build logic.
- Use a `Makefile` only as an optional thin task runner for consistent developer
  commands.

Blessed add-ons when applicable:

- `zig-clap` or similar CLI parser only when command complexity exceeds basic
  argument handling.

## Dependency Trigger Rules

Approve a dependency only when all are true:

1. Standard library does not cover the requirement well.
2. The package is in the blessed add-on list.
3. The package has acceptable maintenance and security posture.
4. The team can support it operationally.
5. The decision is documented with revisit triggers.
