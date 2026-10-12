#!/usr/bin/env bash
# Deploy sims/ (the MR line stress test) to the Vercel project `lodestar-sims`
# through the REST API, the same way deploy-command.sh deploys app/.
#
#   scripts/deploy-sims.sh            # production (lodestar-sims.buildfirst.io)
#   scripts/deploy-sims.sh preview    # preview URL only
#
# Needs VERCEL_ORG_ID. Deploys committed files only: commit first.
# The site password is the SIMS_PASSWORD env var on the Vercel project.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

target="${1:-production}"
: "${VERCEL_ORG_ID:?VERCEL_ORG_ID is not set}"
api="https://api.vercel.com"
team="teamId=$VERCEL_ORG_ID"

npm run -s lint:names
node sims/scripts/build-data.mjs
if ! git diff --quiet -- sims/public/data; then
  echo "sims/public/data is out of date with the run files: commit the rebuilt data first." >&2
  exit 1
fi

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

(cd sims && git ls-files -z) > "$work/files.z"
python3 - "$work" <<'EOF'
import sys, os, json, hashlib
work = sys.argv[1]
files = [f for f in open(os.path.join(work, 'files.z')).read().split('\0') if f and os.path.isfile(os.path.join('sims', f))]
man = []
for f in files:
    data = open(os.path.join('sims', f), 'rb').read()
    man.append({'file': f, 'sha': hashlib.sha1(data).hexdigest(), 'size': len(data), 'src': os.path.join('sims', f)})
json.dump(man, open(os.path.join(work, 'manifest.json'), 'w'))
print(f'{len(man)} files', file=sys.stderr)
if not man:
    sys.exit('empty manifest')
EOF

python3 - "$work" "$target" "$(git rev-parse --short HEAD)" <<'EOF'
import sys, json, os
work, target, sha = sys.argv[1:4]
body = {
    'name': 'lodestar-sims',
    'project': 'lodestar-sims',
    'files': [{k: v for k, v in m.items() if k != 'src'} for m in json.load(open(os.path.join(work, 'manifest.json')))],
    'projectSettings': {
        'framework': None,
        'installCommand': 'npm install',
        'buildCommand': '',
        'outputDirectory': 'public',
        'nodeVersion': '22.x',
    },
    'meta': {'gitCommit': sha},
}
if target == 'production':
    body['target'] = 'production'
json.dump(body, open(os.path.join(work, 'deploy.json'), 'w'))
EOF

create() {
  curl -sS -X POST "$api/v13/deployments?$team&skipAutoDetectionConfirmation=1" \
    -H 'Content-Type: application/json' --data-binary @"$work/deploy.json"
}

upload() { # sha
  local sha="$1" file
  file="$(python3 -c 'import json,sys;m=json.load(open(sys.argv[1]));print(next(x["src"] for x in m if x["sha"]==sys.argv[2]))' "$work/manifest.json" "$sha")"
  curl -sS -o /dev/null -w '%{http_code}' --retry 3 -X POST "$api/v2/files?$team" \
    -H "x-vercel-digest: $sha" -H 'Content-Type: application/octet-stream' \
    --data-binary @"$file"
}

for attempt in 1 2 3; do
  resp="$(create)"
  missing="$(echo "$resp" | python3 -c 'import sys,json;d=json.load(sys.stdin);e=d.get("error") or {};print("\n".join(e.get("missing",[])) if e.get("code")=="missing_files" else "")')"
  [ -z "$missing" ] && break
  echo "uploading $(echo "$missing" | wc -l) missing files (attempt $attempt)" >&2
  export -f upload; export api team work
  echo "$missing" | xargs -P 16 -I{} bash -c 'code=$(upload {}); [ "$code" = 200 ] || echo "upload {} -> $code" >&2'
done

id="$(echo "$resp" | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("id") or "")')"
if [ -z "$id" ]; then
  echo "deploy failed: $resp" >&2
  exit 1
fi
echo "deployment $id building..." >&2

for _ in $(seq 1 60); do
  state="$(curl -sS "$api/v13/deployments/$id?$team" 2>/dev/null | python3 -c 'import sys,json
try:
    d=json.load(sys.stdin); print(d.get("readyState",""), d.get("url",""), d.get("errorMessage") or "")
except Exception:
    print("POLL_ERROR")')"
  case "$state" in READY*|ERROR*|CANCELED*) break;; esac
  sleep 10
done
echo "$state"
case "$state" in READY*) exit 0;; *) exit 1;; esac
