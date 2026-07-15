---
name: bonsai-subagent
description: Spawn subagents with the bonsai coding-agent CLI when no task tool or native subagent is available. Use for self-contained exploration, research, review, parallel investigations, or isolated work that would bloat the parent context.
---

# Bonsai Subagent

Run a headless subagent with `bonsai -p` only when no native `task` tool or
subagent capability exists. Delegate exploration or research that would flood
the parent context, independent parallel investigations, or isolated tasks with
clear expected output. The subagent starts cold and sees only its prompt, so do
not delegate work that needs context from the parent conversation.

## Run

```sh
bonsai -p "<prompt>"
```

Keep the default session-saving behavior. Use `--no-session` only when directed.
Use the default agent from bonsai config, expected to be `codex` / `gpt-5.5`.
Pass `--provider` or `--model` only when the user asks for a different agent.
Use `--root <dir>` to run elsewhere; the current directory is the default.

## Output

Use default text mode for normal delegation. Stdout includes completed assistant
messages and assistant text before or between tool calls, but excludes tool
events and hidden thinking. Notices and errors go to stderr.

Use `--mode json` only to debug or inspect session metadata, the resolved
provider and model, tool events, thinking snapshots, or token usage. It writes
the full event stream as JSONL.

## Parallel Runs

Run each subagent in its own Bash tool call. Launch independent calls in
parallel to separate their output, status, and timeout handling. Use background
processes in one Bash call only if the tool runner cannot run calls in parallel.
Redirect each process to a separate file.

## Writing the Prompt

Make the prompt self-contained. State the goal, working directory, relevant file
paths, whether it may edit files, and the exact output format. End with "Respond
only with your final report." for clean, parseable output.

## Failure Modes

- Nonzero exit with stderr: report it; do not retry blindly
- `error: unexpected argument '-p'`: the installed bonsai binary is stale
  and needs rebuilding with `cargo install --path crates/bonsai` in its repo
