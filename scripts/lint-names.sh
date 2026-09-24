#!/usr/bin/env bash
# Fails if any term in $BANNED_TERMS (comma-separated, case-insensitive) appears
# as a whole word in tracked files or their paths. Whole-word matching stops short
# terms (e.g. two-letter acronyms) matching inside ordinary words.
# Fails closed: an unset list is an error, not a pass.
# The list itself lives only in the environment, never in the repo.
#
# .lint-names-allow exempts one term in one named existing file, keyed by a hash
# of the term so the allowlist never reveals it. See that file for the rules.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ -z "${BANNED_TERMS:-}" ]; then
  echo "lint:names: BANNED_TERMS is not set; refusing to pass." >&2
  exit 2
fi

allow_file=.lint-names-allow
term_hash() { printf '%s' "$1" | tr 'A-Z' 'a-z' | sha256sum | cut -c1-16; }
allowed() { # $1 = hash, $2 = path
  [ -f "$allow_file" ] && grep -qxF -- "$1 $2" "$allow_file"
}

hits=0
exempt=0
IFS=',' read -ra terms <<< "$BANNED_TERMS"
for raw in "${terms[@]}"; do
  term="$(echo "$raw" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  [ -z "$term" ] && continue
  hash="$(term_hash "$term")"
  while IFS= read -r -d '' f; do
    if allowed "$hash" "$f"; then exempt=$((exempt + 1)); continue; fi
    grep -I -n -i -w -F -- "$term" "$f" | sed "s#^#$f:#"
    hits=1
  done < <(git ls-files -co --exclude-standard -z | xargs -0 grep -I -l -i -w -F -Z -- "$term" 2>/dev/null || true)
  if git ls-files -co --exclude-standard | grep -i -w -F -- "$term"; then
    hits=1
  fi
done

if [ "$hits" -ne 0 ]; then
  echo "lint:names: banned term found (matches above)." >&2
  exit 1
fi
echo "lint:names: clean (${#terms[@]} terms checked; $exempt allowlisted file matches)."
