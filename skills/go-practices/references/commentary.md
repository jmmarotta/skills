# Commentary

Use this reference for doc comments, inline comments, and deciding when to delete a comment and improve the code instead.

## Core Guidance

- Comment exported symbols so package documentation is useful.
- Prefer comments that add intent, constraints, or rationale.
- Do not use comments to narrate obvious code.
- If a comment exists only because the code is confusing, improve the code first.

## What Comments Should Do

- Explain what a public symbol does.
- Explain why a non-obvious choice exists.
- Record ownership or invariants when the code alone will not make them obvious.

## What Comments Should Avoid

- Repeating the code in prose.
- Documenting interface implementation with empty phrases like `Read implements io.Reader`.
- Explaining a bad abstraction instead of removing it.

## Documentation Bias

- Treat package docs and exported symbol docs as part of the API.
- Write comments that help callers use the code correctly.
- Keep implementation commentary focused on the design pressure behind the code.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- Associative commentary: <https://dave.cheney.net/2014/03/28/associative-commentary>
- Associative commentary follow-up: <https://dave.cheney.net/2014/03/30/associative-commentary-follow-up>
- QCon Shanghai 2018 presentation comments section: <https://dave.cheney.net/practical-go/presentations/qcon-china.html>
