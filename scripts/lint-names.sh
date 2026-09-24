#!/usr/bin/env bash
# Fails if any term in $BANNED_TERMS (comma-separated, case-insensitive) appears
# in tracked files. Fails closed: an unset list is an error, not a pass.
# The list itself lives only in the environment, never in the repo.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ -z "${BANNED_TERMS:-}" ]; then
  echo "lint:names: BANNED_TERMS is not set; refusing to pass." >&2
  exit 2
fi

hits=0
IFS=',' read -ra terms <<< "$BANNED_TERMS"
for raw in "${terms[@]}"; do
  term="$(echo "$raw" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  [ -z "$term" ] && continue
  # Search tracked + untracked-but-not-ignored files; also check paths.
  if git ls-files -co --exclude-standard -z | xargs -0 grep -I -n -i -F -- "$term" 2>/dev/null; then
    hits=1
  fi
  if git ls-files -co --exclude-standard | grep -i -F -- "$term"; then
    hits=1
  fi
done

if [ "$hits" -ne 0 ]; then
  echo "lint:names: banned term found (matches above)." >&2
  exit 1
fi
echo "lint:names: clean (${#terms[@]} terms checked)."
