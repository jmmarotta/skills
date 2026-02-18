# Manual Verification Examples

Use these examples when defining the manual portion of self-verification.

## TUI and Terminal Apps

Preferred tooling:

- `tmux` for repeatable terminal sessions and side-by-side observation

Example checks:

- start and stop flows across clean and dirty state
- keybinding behavior, including invalid input handling
- terminal resize handling and redraw stability
- long-running workflow behavior under updates and interruption

## Web Apps

Preferred tooling:

- Browser Use CLI or Playwright MCP server

Example checks:

- critical journey completion for primary user paths
- error, empty, and loading state handling
- auth or permission boundary behavior where applicable
- responsive behavior at representative viewport sizes

## Xcode-Based Projects

Preferred tooling:

- `xcodebuildmcp`

Example checks:

- clean build and test execution
- simulator launch and first-run path validation
- key interaction smoke checks for critical screens
- failure-state behavior for network and permission prompts

## Manual Verification Evidence Template

Capture for each check:

- scenario name
- tool used
- expected outcome
- observed outcome
- pass or fail status
- follow-up issue if failed
