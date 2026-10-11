#!/usr/bin/env python3
"""Screen the node map down to the biggest risks for the product.

Three questions per node, in the OEM's own vocabulary (fragility = external threat x internal vulnerability,
judged against the value being protected):
  1. Would losing this node breach the tolerance line?      (loss_breaches_tolerance)
  2. Is it hard to replace in time?                          (qualified_sources <= 1 or replace_months > 12)
  3. Is at least one external threat plausible against it?   (len(threats) >= 1)

A node survives only if all three are true. Survivors are ranked by how hard they are to replace
(months), then by how many threat categories can reach them. The top eight are the product's risk list.

Writes:
  futures/scenarios/MR-CONV-2031/02-risk-screen.json
  futures/scenarios/MR-CONV-2031/02-risk-screen.md
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1] / "scenarios/MR-CONV-2031"
nm = json.loads((ROOT / "01-node-map.json").read_text())
nodes = nm["nodes"]

def hard_to_replace(n):
    return n["qualified_sources"] <= 1 or n["replace_months"] > 12

rows = []
for n in nodes:
    q1 = bool(n["loss_breaches_tolerance"])
    q2 = hard_to_replace(n)
    q3 = len(n["threats"]) >= 1
    rows.append(dict(id=n["id"], name=n["name"], stage=n["stage"], breaches=q1, hard=q2, threatened=q3,
                     survives=q1 and q2 and q3, replace_months=n["replace_months"],
                     qualified_sources=n["qualified_sources"], threats=n["threats"], tag=n["tag"],
                     prov=n["prov"], confirm_by=n["confirm_by"], why=n["why"]))

survivors = [r for r in rows if r["survives"]]
survivors.sort(key=lambda r: (-r["replace_months"], -len(r["threats"]), r["id"]))
top = survivors[:8]
watch = [r for r in rows if not r["survives"] and (r["breaches"] or r["hard"]) and r["threatened"]]

out = {"method": __doc__.strip(), "node_count": len(rows), "survivors": len(survivors),
       "risks": top, "watch_items": watch, "all": rows}
(ROOT / "02-risk-screen.json").write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")

md = ["# The eight things that could stop the MR conventional magnet line delivering", "",
      f"Screened {len(rows)} nodes with three questions: would losing it breach the tolerance line, is it hard to replace in time, and is at least one of the eight external threat categories plausible against it. {len(survivors)} nodes passed all three. The eight below are ranked by how long replacement takes, then by how many threat categories can reach them. Every line is AI-suggested until the named function confirms it; nothing here is company data.",
      "", "| Rank | Node | Replace time | Qualified sources | Threats that can reach it | Who confirms |", "|---|---|---|---|---|---|"]
for i, r in enumerate(top, 1):
    md.append(f"| {i} | {r['id']} {r['name']} | {r['replace_months']} months | {r['qualified_sources']} | {', '.join(t.replace('_', ' ') for t in r['threats'])} | {r['confirm_by']} |")
md += ["", "## Why each one is on the list", ""]
for i, r in enumerate(top, 1):
    md.append(f"{i}. **{r['name']}.** {r['why']} Tag: {r['tag']} ({r['prov']}).")
md += ["", "## Watch items (failed one question, still worth a look)", ""]
for r in watch:
    reason = "not a tolerance breach on its own" if not r["breaches"] else "replaceable in time"
    md.append(f"- {r['id']} {r['name']}: {reason}. {r['why']}")
(ROOT / "02-risk-screen.md").write_text("\n".join(md) + "\n")
print(f"{len(rows)} nodes, {len(survivors)} survivors, top {len(top)}:")
for i, r in enumerate(top, 1):
    print(f"  {i}. {r['id']} {r['name']} ({r['replace_months']} mo, {r['qualified_sources']} src, {len(r['threats'])} threats)")
