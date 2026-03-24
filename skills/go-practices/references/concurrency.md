# Concurrency

Use this reference for goroutines, channels, cancellation, and synchronization design.

## Core Guidance

- Concurrency is not an automatic improvement; keep it justified and understandable.
- Leave concurrency to the caller when practical.
- Never start a goroutine without knowing how it will stop.
- Treat channel and context behavior as explicit design, not folklore.

## Goroutine Rules

- Every goroutine needs a clear owner, stop condition, and failure path.
- Avoid background work with no lifecycle management.
- Prefer direct work over speculative concurrency when the concurrent design adds more moving parts than value.

## Channel Rules

- Understand send, receive, close, and nil-channel behavior before encoding coordination in channels.
- Use channels when they clarify ownership and synchronization, not because they feel idiomatic.
- Keep channel protocols small and documented.

## Cancellation Rules

- Make cancellation semantics explicit.
- Do not overload `context.Context` with every control concern.
- Ensure shutdown paths are testable and reachable.

## Sources

- Practical Go: <https://dave.cheney.net/practical-go>
- Curious Channels: <https://dave.cheney.net/2013/04/30/curious-channels>
- Channel axioms: <https://dave.cheney.net/2014/03/19/channel-axioms>
- Ice cream makers and data races: <https://dave.cheney.net/2014/06/27/ice-cream-makers-and-data-races>
- Never start a goroutine without knowing how it will stop: <https://dave.cheney.net/2016/12/22/never-start-a-goroutine-without-knowing-how-it-will-stop>
- Context isn't for cancellation: <https://dave.cheney.net/2017/08/20/context-isnt-for-cancellation>
- QCon Shanghai 2018 presentation concurrency section: <https://dave.cheney.net/practical-go/presentations/qcon-china.html>
