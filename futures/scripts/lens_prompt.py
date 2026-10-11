#!/usr/bin/env python3
"""Build the prompt for one lens invocation, so every model in the bake-off and every
round of the panel gets exactly the same brief.

usage: lens_prompt.py <lens> <phase> <round> <run-dir> [--extra path ...] [--question "..."] [--out-full p] [--out-summary p]
Prints the prompt to stdout.
"""
import argparse, json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
PANEL = HERE.parent / "panel"

PHASE_QUESTIONS = {
  "2": "Phase 2, predetermined elements. For the nodes your lens can reach, what is already certain by 2031? A predetermined element is a trend or fact already in motion that will hold whatever else happens: a plant already built, a rule already legislated with a date, a workforce already a certain age, a material already controlled. For each one say what it is, which node ids it touches, the source with its date, and what would have to happen for it not to hold. Then say what in your domain is genuinely uncertain and list it separately under a heading of its own, without analysing it yet; that is phase 3.",
  "3": "Phase 3, critical uncertainties. For the nodes your lens can reach, what could plausibly go two or more ways by 2031 and would change whether the line delivers inside the tolerance line? For each uncertainty: name it as a question a product owner can read, say which of the eight risks in 02-risk-screen.md it moves and how, say which kind of not-knowing it is (actions, outcomes, causation, value), give the two or three directions it could go, say why it is uncertain rather than predetermined, and name the observable thing that would show it resolving. Rank them by how many of the eight risks they move at once.",
  "4": "Phase 4, futures. Using the two axes in phases/P3-uncertainties.md, describe each of the four futures as your lens sees it in 2031: what happened on the way (2026 to 2028, 2028 to 2031), what is true in that future for the nodes you can reach, which of the eight risks breaks first there and by when, and what it costs against the tolerance line. Describe, do not recommend. Each future gets its own heading. Name the one thing in each future that your lens is most confident of and the one thing it is least confident of.",
  "5": "Phase 5, indicators. For each of the two uncertainties, what observable thing would show it resolving one way or the other? For each indicator: what is measured, where it is published (a named public source with a link), how often it updates, what reading would count as the uncertainty settling in each direction, and what reading would be a false signal. Prefer indicators that already exist as data over indicators someone would have to build. Mark each one live (a feed exists) or manual (someone reads it).",
  "6a": "Phase 6a, impact. For each of the four futures, trace how it reaches the eight risks: which risk breaks first, through which node, by when, how long the break lasts, and what it costs against the tolerance line (installs more than 30 days late, line stops longer than 30 days). Say which breaks are shared by all four futures and which belong to one. Give confidence high, moderate or low with the basis for each break.",
  "6b": "Phase 6b, actions. The candidate actions are in phases/P6b-candidates.md. For each action, through your lens: does it work in all four futures, in some, or in one? What does it cost and how long does it take? What is the act-by date given the 2027 decision clock? Write its three triggers as full sentences: act if, pause if, look again if. Then add at most two actions your lens says are missing. This is the only phase in which you recommend.",
}

def read(p):
    return pathlib.Path(p).read_text()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lens"); ap.add_argument("phase"); ap.add_argument("round"); ap.add_argument("run")
    ap.add_argument("--extra", nargs="*", default=[])
    ap.add_argument("--question", default=None)
    ap.add_argument("--out-full", default=None); ap.add_argument("--out-summary", default=None)
    ap.add_argument("--no-research", action="store_true")
    a = ap.parse_args()
    run = pathlib.Path(a.run)
    lens = read(PANEL / "lenses" / f"{a.lens}.md")
    common = read(PANEL / "COMMON.md")
    scope = read(run / "00-scope-packet.md")
    nodes = json.loads(read(run / "01-node-map.json"))["nodes"]
    node_lines = "\n".join(f"- {n['id']} {n['name']} [{n['stage']}] origin: {', '.join(n['origin'])}; qualified sources: {n['qualified_sources']}; replace: {n['replace_months']} months; threats: {', '.join(n['threats'])}; {n['prov']}/{n['tag']}. {n['why']}" for n in nodes)
    screen = read(run / "02-risk-screen.md")
    q = a.question or PHASE_QUESTIONS[a.phase]
    out_full = a.out_full or f"{run}/conversations/{a.lens}_p{a.phase}_r{a.round}_full.md"
    out_sum = a.out_summary or f"{run}/conversations/{a.lens}_p{a.phase}_r{a.round}_summary.md"
    extras = "\n\n".join(f"### {pathlib.Path(p).name}\n\n{read(p)}" for p in a.extra)
    parts = [
      "You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.",
      "## Your dossier\n\n" + lens,
      "## Rules (COMMON.md)\n\n" + common,
      "## Scope packet\n\n" + scope,
      "## Node map (36 nodes)\n\n" + node_lines,
      "## Risk screen\n\n" + screen,
    ]
    if extras:
        parts.append("## Other material for this round\n\n" + extras)
    parts.append(f"## The question for this round (phase {a.phase}, round {a.round})\n\n" + q)
    research = "" if a.no_research else "Do the research with web search before you write. Every fact carries a link and a date."
    parts.append(f"## What to produce\n\n{research} Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase {a.phase}, round {a.round}` and the summary with the line `# <lens name>, phase {a.phase}, round {a.round}, summary`. Target paths: full transcript `{out_full}`, summary `{out_sum}`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.")
    sys.stdout.write("\n\n".join(parts) + "\n")

if __name__ == "__main__":
    main()
