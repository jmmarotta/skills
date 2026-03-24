# Presentations

This reference captures the high-level judgment Dave Cheney applies across Practical Go.

## Main Themes

- Prefer simplicity because complexity makes software fragile and hard to change.
- Treat readability as a maintenance requirement, not a nice-to-have.
- Optimize for developer productivity by keeping code, tools, and project structure unsurprising.
- Design software for other people and for future change, not just for present execution.

## What This Means In Practice

- Choose obvious code over compressed or clever code.
- Let style, naming, and package structure communicate intent.
- Reduce cognitive load for the next reader.
- Push complexity behind small, stable interfaces.
- Favor maintainability over ornamental abstraction.
- Prefer decoupled designs that are easy to extend and easy to change.

## Review Questions

- Is the code obviously readable on a quick pass?
- Does the design reduce future change cost, or just make today's edit pass?
- Are defaults simple and safe?
- Does the structure help a new contributor find the right place to change?

## Sources

- Practical Go landing page: <https://dave.cheney.net/practical-go>
- SOLID Go Design: <https://dave.cheney.net/2016/08/20/solid-go-design>
- QCon Shanghai 2018 presentation: <https://dave.cheney.net/practical-go/presentations/qcon-china.html>
- GopherCon Singapore 2019 presentation: <https://dave.cheney.net/practical-go/presentations/gophercon-singapore-2019.html>
