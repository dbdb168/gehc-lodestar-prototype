#!/usr/bin/env bash
# Fill Upstash with the data the Lodestar panels read. Runs from CI
# (.github/workflows/seed.yml); also runnable by hand with the env below.
#
#   scripts/run-seeders.sh fast   # short-lived keys (every 2h)
#   scripts/run-seeders.sh slow   # long-lived keys (every 6h)
#   scripts/run-seeders.sh all
#
# Env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (required);
#      FRED_API_KEY, NASA_FIRMS_API_KEY (needed by some seeders).
# Panel-to-seeder mapping: docs/SEEDERS.md.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)/app"

group="${1:-all}"
: "${UPSTASH_REDIS_REST_URL:?UPSTASH_REDIS_REST_URL is not set}"
: "${UPSTASH_REDIS_REST_TOKEN:?UPSTASH_REDIS_REST_TOKEN is not set}"

# Seeders run every 2-6h here rather than every few minutes upstream; keep
# values alive until the next run (see _seed-utils.mjs).
export SEED_MIN_TTL_SECONDS="${SEED_MIN_TTL_SECONDS:-25200}"
# Fetch advisory feeds directly rather than through upstream's public relay.
export RELAY_URL=direct

# Order matters: earthquakes before correlation; portwatch and baselines
# before chokepoint flows.
fast=(seed-commodity-quotes seed-earthquakes seed-fire-detections seed-security-advisories seed-cyber-threats seed-correlation)
slow=(seed-supply-chain-trade seed-hormuz seed-natural-events seed-portwatch seed-chokepoint-baselines seed-chokepoint-flows)

case "$group" in
  fast) list=("${fast[@]}") ;;
  slow) list=("${slow[@]}") ;;
  all)  list=("${slow[@]}" "${fast[@]}") ;;
  *) echo "usage: $0 fast|slow|all" >&2; exit 2 ;;
esac

failed=()
for s in "${list[@]}"; do
  start=$(date +%s)
  echo "::group::$s"
  timeout 600 node "scripts/$s.mjs"
  code=$?
  echo "::endgroup::"
  echo "$s: exit $code in $(( $(date +%s) - start ))s"
  [ "$code" -ne 0 ] && failed+=("$s")
done

if [ "${#failed[@]}" -gt 0 ]; then
  echo "failed: ${failed[*]}" >&2
  exit 1
fi
echo "all ${#list[@]} seeders ok"
