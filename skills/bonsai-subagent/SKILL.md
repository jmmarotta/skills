---
name: bonsai-subagent
description: Spawn subagents with the bonsai coding agent CLI when no task tool or subagent capability is available. Use for delegating self-contained work such as parallel codebase exploration, research, review, or isolated tasks that would otherwise bloat the parent context.
---

# Bonsai Subagent

Spawn a headless subagent run with `bonsai -p`. Use this only when no native
`task` tool or subagent capability is available.

## When to Use

- Delegating exploration or research that would flood the parent context
- Running several independent investigations in parallel
- Isolated, self-contained tasks with a clear expected output

Do not delegate work that needs the parent conversation's context; the
subagent starts cold and sees only the prompt you give it.

## Spawning

Always pass `--no-session` unless the user asks for a resumable session.
The default agent comes from bonsai config and is expected to be
`codex` / `gpt-5.5`; do not pass `--provider` or `--model` unless the user
asks for a different agent.

```sh
bonsai -p --no-session "<prompt>"
```

Stdout is the subagent's final answer text.

Options:

- `--root <dir>`: run the subagent in another directory (defaults to cwd)
- `--mode json`: stream the full event stream as JSONL (session header,
  tool calls, token usage) when debugging; the first line reports the
  resolved `provider`/`model` if you need to confirm which agent ran

## Parallel Runs

Spawn independent subagents in the background and wait:

```sh
bonsai -p --no-session "<prompt A>" > /tmp/a.txt &
bonsai -p --no-session "<prompt B>" > /tmp/b.txt &
wait
cat /tmp/a.txt /tmp/b.txt
```

## Writing the Prompt

The subagent has no context from your conversation. The prompt must be
self-contained:

- State the goal, the working directory, and any relevant file paths
- Say whether the subagent may edit files or must stay read-only
- Specify the exact output format you want back
- End with: "Respond only with your final report." so the answer stays
  clean and parseable

## Failure Modes

- Nonzero exit with a message on stderr: report it, do not retry blindly
- `error: unexpected argument '-p'`: the installed bonsai binary is stale
  and needs rebuilding (`cargo install --path crates/bonsai` in the bonsai
  repo)
