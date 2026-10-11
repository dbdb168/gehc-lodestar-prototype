#!/usr/bin/env python3
"""Assemble a run's output.json from the phase files and validate it against the schema.

usage: assemble_output.py <run-dir>

The moderator writes the structured parts of each phase as small JSON files in
<run-dir>/phases/*.json (risks, uncertainties, futures, indicators, actions,
brief, evidence, meta). This script joins them, validates against
panel/templates/output.schema.json, runs the plain-text checks from CHECKS.md,
and writes <run-dir>/output.json.
"""
import json, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
SCHEMA = HERE.parent / "panel" / "templates" / "output.schema.json"
PARTS = ["meta", "risks", "uncertainties", "futures", "indicators", "actions", "brief", "evidence"]

def load(p):
    return json.loads(p.read_text())

def walk_strings(obj, path=""):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from walk_strings(v, f"{path}.{k}")
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk_strings(v, f"{path}[{i}]")

def text_checks(out):
    problems = []
    for path, s in walk_strings(out):
        if "—" in s:
            problems.append(f"{path}: em dash")
        if re.search(r"\b(TBD|TODO|lorem)\b", s, re.I):
            problems.append(f"{path}: unfinished text")
    return problems

def main():
    run = pathlib.Path(sys.argv[1])
    out = {}
    for part in PARTS:
        p = run / "phases" / f"{part}.json"
        if p.exists():
            out[part] = load(p)
        elif part != "evidence":
            print(f"missing phases/{part}.json", file=sys.stderr)
            sys.exit(2)
    try:
        import jsonschema
        jsonschema.validate(out, load(SCHEMA))
        print("schema: valid")
    except ImportError:
        print("schema: jsonschema not installed; structural check only", file=sys.stderr)
        for key in load(SCHEMA)["required"]:
            if key not in out:
                print(f"schema: missing {key}", file=sys.stderr); sys.exit(2)
    probs = text_checks(out)
    for p in probs:
        print("text:", p, file=sys.stderr)
    (run / "output.json").write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {run/'output.json'}: {len(out['risks'])} risks, {len(out['futures'])} futures, {len(out['indicators'])} indicators, {len(out['actions'])} actions")
    sys.exit(1 if probs else 0)

if __name__ == "__main__":
    main()
