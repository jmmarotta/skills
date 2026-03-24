# Logging

Use this reference when deciding whether code should log, return an error, or stay silent.

## Core Guidance

- Logging is for recording significant events at the right boundary.
- Avoid scattering logging calls through reusable library code.
- Do not treat logging as a substitute for error design.

## Practical Rules

- Let libraries return errors and structured information instead of choosing global logging policy.
- Keep ownership of log sinks, formats, and verbosity near the application boundary.
- Avoid duplicate logs for the same failure as it travels up the stack.

## Review Questions

- Is this log statement at the right layer?
- Would returning structured information be more useful than logging here?
- Will this failure be logged more than once?

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- Let's talk about logging: <https://dave.cheney.net/2015/11/05/lets-talk-about-logging>
