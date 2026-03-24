# API Design

Use this reference for constructors, configuration, interface boundaries, and function signatures. For the broader design rationale, read `solid-go-design.md`.

## Core Guidance

- Design APIs that are hard to misuse.
- Make the default use case the simplest call site.
- Let functions ask only for the behavior they require.
- Avoid signatures that force callers to pass `nil`, empty structs, or ambiguous repeated parameters.
- Require no more and promise no less.

## Constructor and Configuration Rules

- Prefer defaults that require no extra ceremony from callers.
- Use functional options when configuration is likely to grow and options need to stay self-describing.
- Avoid config patterns where `nil` and an empty value compete or where zero values become ambiguous.

## Interface Rules

- Accept the smallest interface that expresses the required behavior.
- Apply interface segregation: do not make callers depend on methods they do not use.
- Depend on abstractions that describe behavior, not concrete types with many irrelevant methods.
- Return concrete values when callers benefit from the full surface.

## Signature Rules

- Be wary of several parameters with the same type.
- Avoid forcing allocations or ownership changes on callers unless the API truly needs them.
- Make optional behavior explicit instead of positional and fragile.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- SOLID Go Design: <https://dave.cheney.net/2016/08/20/solid-go-design>
- Functional options for friendly APIs: <https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis>
- Don't force allocations on the callers of your API: <https://dave.cheney.net/2019/09/05/dont-force-allocations-on-the-callers-of-your-api>
- Be wary of functions which take several parameters of the same type: <https://dave.cheney.net/2019/09/24/be-wary-of-functions-which-take-several-parameters-of-the-same-type>
- QCon Shanghai 2018 presentation API design section: <https://dave.cheney.net/practical-go/presentations/qcon-china.html>
