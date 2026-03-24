# Testing

Use this reference for benchmarks, coverage usage, fixtures, and table-driven tests.

## Core Guidance

- Prefer small tests that make behavior differences obvious.
- Use table-driven tests when they improve coverage of inputs without hiding the intent of each case.
- Benchmark with discipline so the result answers a real performance question.
- Treat coverage as a signal, not as proof of correctness.

## Testing Rules

- Name test cases so failures explain the scenario.
- Keep fixtures light and local to the behavior under test.
- Avoid overengineering test helpers when direct setup is clearer.

## Benchmark Rules

- Benchmark the thing you actually care about.
- Keep setup noise away from the measured loop.
- Compare before and after when using benchmarks to justify a change.

## Coverage Rules

- Use coverage to find blind spots, not to declare quality complete.
- Prefer meaningful edge cases over coverage inflation.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- How to write benchmarks in Go: <https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go>
- Simple test coverage: <https://dave.cheney.net/2013/10/07/simple-test-coverage-with-go-1-2>
- More simple test coverage in Go 1.2: <https://dave.cheney.net/2013/11/14/more-simple-test-coverage-in-go-1-2>
- Test fixtures in Go: <https://dave.cheney.net/2016/05/10/test-fixtures-in-go>
- Prefer table driven tests: <https://dave.cheney.net/2019/05/07/prefer-table-driven-tests>
