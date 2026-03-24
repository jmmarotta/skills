# Error Handling

Use this reference for returned errors, inspection, wrapping, and deciding when to remove an error path entirely.

## Core Guidance

- Eliminate classes of errors through better design when possible.
- Handle an error once.
- Make error values useful for callers without coupling them to fragile implementation details.
- Treat logging and returning the same error as duplicate handling unless a boundary truly needs both.

## Design Rules

- Prefer APIs that prevent invalid states over APIs that repeatedly report them.
- Return errors with enough context for callers to act.
- Avoid sentinel values when they leak implementation choices too broadly.
- Inspect errors deliberately; do not fall back to brittle string matching.

## Flow Rules

- If a function can recover meaningfully, handle the error there.
- If it cannot, return the error with context.
- Avoid burying cause and effect under repeated local checks that nobody can act on.

## Review Questions

- Is this error being logged and returned?
- Can this whole error path disappear with a stronger API or better default?
- Does the caller have a reliable way to inspect or classify the failure?

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- Don't just check errors, handle them gracefully: <https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully>
- Inspecting errors: <https://dave.cheney.net/2014/12/24/inspecting-errors>
- Constant errors: <https://dave.cheney.net/2016/04/07/constant-errors>
- Why Go gets exceptions right: <https://dave.cheney.net/2012/01/18/why-go-gets-exceptions-right>
- Error handling vs exceptions redux: <https://dave.cheney.net/2014/11/04/error-handling-vs-exceptions-redux>
- Errors and exceptions redux: <https://dave.cheney.net/2015/01/26/errors-and-exceptions-redux>
- Eliminate error handling by eliminating errors: <https://dave.cheney.net/2019/01/27/eliminate-error-handling-by-eliminating-errors>
