#!/usr/bin/env python3
"""Run one lens prompt through a model on OpenRouter, with web search where the model needs the plugin.

usage: openrouter_lens.py <model> <prompt-file> <out-full> <out-summary> [--no-web]
The API key is injected by the session proxy; none is read here. Perplexity models search on their own;
for other models the OpenRouter web plugin is attached unless --no-web is given.
Writes the two output files (split on =====SUMMARY=====) and a .meta.json beside the full transcript
with usage, cost (when reported), elapsed time and the citations the provider returned.
"""
import json, os, pathlib, sys, time, urllib.request

model, prompt_path, out_full, out_sum = sys.argv[1:5]
no_web = "--no-web" in sys.argv
prompt = pathlib.Path(prompt_path).read_text()

body = {
  "model": model,
  "messages": [{"role": "user", "content": prompt}],
  "max_tokens": 9000,
  "temperature": 0.3,
}
if not model.startswith("perplexity/") and not no_web:
    body["plugins"] = [{"id": "web", "max_results": 10}]
if model.startswith("perplexity/"):
    body["web_search_options"] = {"search_context_size": "high"}

req = urllib.request.Request(
  "https://openrouter.ai/api/v1/chat/completions",
  data=json.dumps(body).encode(),
  headers={"Content-Type": "application/json", "HTTP-Referer": "https://lodestar-command.vercel.app", "X-Title": "Lodestar futures panel"},
)
t0 = time.time()
with urllib.request.urlopen(req, timeout=3000) as r:
    resp = json.load(r)
elapsed = time.time() - t0
if "error" in resp:
    print(json.dumps(resp["error"]), file=sys.stderr); sys.exit(1)
msg = resp["choices"][0]["message"]
text = msg.get("content") or ""
cites = []
for a in msg.get("annotations", []) or []:
    if a.get("type") == "url_citation":
        u = a["url_citation"]; cites.append({"url": u.get("url"), "title": u.get("title")})
if resp.get("citations"):
    cites += [{"url": c} for c in resp["citations"]]

if "=====SUMMARY=====" in text:
    full, summ = text.split("=====SUMMARY=====", 1)
else:
    full, summ = text, ""
pathlib.Path(out_full).write_text(full.strip() + "\n")
pathlib.Path(out_sum).write_text(summ.strip() + "\n")
meta = {"model": model, "elapsed_s": round(elapsed, 1), "usage": resp.get("usage"), "citations": cites,
        "finish_reason": resp["choices"][0].get("finish_reason"), "id": resp.get("id")}
pathlib.Path(out_full).with_suffix(".meta.json").write_text(json.dumps(meta, indent=2) + "\n")
print(f"{model}: {elapsed:.0f}s, usage={resp.get('usage')}, citations={len(cites)}, words={len(full.split())}")
