# Verification and Backpressure Profile

Use this reference to define a closed-loop verification system for a new
repository.

## Closed-Loop Verification Model

Always include all three parts:

1. automated quality gates
2. manual self-verification for user-facing behavior
3. verification evidence captured in setup outputs

## Required Verification Gates

Require these gates locally and in CI:

1. format
2. lint
3. typecheck or compile
4. tests
5. build

## Testing Minimums

- Require tests for every module.
- Require integration tests for external boundaries.
- Require end-to-end checks for critical user journeys.
- Fail setup completion if no automated test command exists.

## Backpressure and Load Validation

Apply to services, workers, and concurrent code paths:

- Validate behavior under steady load.
- Validate behavior under burst load.
- Validate queue or buffer saturation behavior.
- Validate timeout and retry policies.
- Validate degradation behavior under constrained resources.

Record clear pass or fail thresholds for each test.

## Manual Self-Verification Examples

Choose based on project type:

- TUI applications: run manual interaction checks in `tmux` sessions to verify
  key handling, resizing behavior, redraw stability, and long-running state
  updates.
- Web applications: run journey checks with Browser Use CLI or a Playwright MCP
  server, and verify core paths and failure states.
- Xcode-based projects: run build, test, and simulator smoke flows through
  `xcodebuildmcp` to validate app launch and critical interactions.

Document what was checked manually and the observed results.

## Verification Plan Requirements

The verification plan must:

- Define exact validation commands by language profile.
- Define pass or fail criteria for each command.
- Define triage order for failures.
- Include manual smoke checks when automation is not practical.

## Default Commands by Profile

TypeScript defaults:

- `bun run format`
- `bun run lint`
- `bun run typecheck`
- `bun test`
- `bun run build`

Go defaults:

- `make fmt`
- `make lint`
- `make test`
- `make build`

Zig defaults:

- `zig fmt`
- `zig test`
- `zig build`

Adapt command names to the repository, but keep the same gate categories.
