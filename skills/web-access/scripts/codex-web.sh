#!/usr/bin/env bash
# Quiet web access via Codex. Reads a prompt on stdin, prints only Codex's
# final answer on stdout. All CLI transcript noise (banner, session info,
# token usage) goes to a temp log that is only shown on failure.
set -euo pipefail

out="$(mktemp -t codex-web.out.XXXXXX)"
log="$(mktemp -t codex-web.log.XXXXXX)"
trap 'rm -f "$out" "$log"' EXIT

# --search must come before exec (top-level flag). -o writes only the final
# agent message. --ephemeral avoids persisting a session.
if ! codex --search exec --ephemeral -o "$out" - >"$log" 2>&1; then
  echo 'codex web access failed. Log:' >&2
  cat "$log" >&2
  exit 1
fi

# Codex can exit 0 with an empty answer file; treat that as failure too.
if ! [ -s "$out" ]; then
  echo 'codex returned an empty answer. Log:' >&2
  cat "$log" >&2
  exit 1
fi

cat "$out"
