# Fundamentals

Use this reference for variable declarations, naming, type basics, method receivers, and zero-value design.

## Core Guidance

- Make the zero value useful whenever possible.
- Prefer declaration styles that show intent: `var` for deliberate zero values, `:=` for explicit initialization.
- Name variables for purpose, not for type.
- Keep names short only when scope is short and meaning stays obvious.
- Choose receiver form (`T` vs `*T`) based on method set, mutation, and consistency, not habit.

## Naming Rules

- Prefer clarity over brevity.
- Let longer-lived variables earn longer names.
- Avoid suffixes like `Map`, `Slice`, or `String` when the type system already says that.
- Use consistent names for the same concept across a package.

## Zero Value Rules

- A type is easier to use when its zero value is immediately valid.
- Avoid constructors that exist only to compensate for weak zero-value behavior.
- Be explicit when a zero value is valid, invalid, or meaningfully distinct from an initialized empty value.

## Declaration Rules

- Use `var` when the point is the zero value.
- Use `:=` when the point is the initialized result.
- Make unusual declarations look unusual when a specific type or representation matters.

## Method and Data Shape Rules

- Use pointer receivers when methods mutate state, when copying would be misleading, or when receiver consistency matters.
- Avoid APIs that make callers reason about representation details they should not need.
- Understand slices, maps, and empty structs well enough to avoid superstition-driven code.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- What is the zero value, and why is it useful?: <https://dave.cheney.net/2013/01/19/what-is-the-zero-value-and-why-is-it-useful>
- The empty struct: <https://dave.cheney.net/2014/03/25/the-empty-struct>
- On declaring variables: <https://dave.cheney.net/2014/05/24/on-declaring-variables>
- Go has both make and new functions; what gives?: <https://dave.cheney.net/2014/08/17/go-has-both-make-and-new-functions-what-gives>
- Should methods be declared on T or *T?: <https://dave.cheney.net/2016/03/19/should-methods-be-declared-on-t-or-t>
- Slices from the ground up: <https://dave.cheney.net/2018/07/12/slices-from-the-ground-up>
- If a map isn't a reference, what is it?: <https://dave.cheney.net/2017/04/30/if-a-map-isnt-a-reference-variable-what-is-it>
- A variable's name should be independent of its type: <https://dave.cheney.net/2019/01/29/a-variables-name-should-be-independent-of-its-type>
