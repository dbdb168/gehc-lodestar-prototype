// Lodestar: shared OpenRouter call and spend guard for the model routes.

import { redisPipeline } from '../_upstash-json.js';

/** Count one call against today's cap for `kind`; true while under the cap. */
export async function underDailyCap(kind, cap) {
  const key = `lodestar:${kind}:calls:${new Date().toISOString().slice(0, 10)}`;
  try {
    const res = await redisPipeline([['INCR', key], ['EXPIRE', key, 90000]]);
    const n = Number(res?.[0]?.result ?? res?.[0]);
    return !Number.isFinite(n) || n <= cap;
  } catch {
    return true; // Redis down: per-payload caches still limit repeat calls
  }
}

/**
 * One chat completion. With `schema`, asks for strict JSON and parses it.
 * Returns { content, model, usage, cost }.
 */
export async function chat(model, messages, { schema, schemaName = 'result', maxTokens = 1500, temperature = 0.2, timeoutMs = 55_000 } = {}) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY not set');
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'X-Title': 'Lodestar' },
    body: JSON.stringify({
      model,
      messages,
      ...(schema ? { response_format: { type: 'json_schema', json_schema: { name: schemaName, strict: true, schema } } } : {}),
      temperature,
      max_tokens: maxTokens,
      // Reasoning models (GLM-5.x) can spend the whole budget thinking and
      // return nothing; low effort keeps the budget for the answer.
      reasoning: { effort: 'low' },
      usage: { include: true },
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  const body = await r.json().catch(() => null);
  if (!r.ok || !body) {
    const err = new Error(`OpenRouter HTTP ${r.status}${body?.error?.message ? `: ${body.error.message}` : ''}`);
    err.status = r.status === 402 ? 402 : 502;
    throw err;
  }
  const choice = body.choices?.[0];
  const text = choice?.message?.content;
  let content = text;
  if (schema) {
    content = parseJsonLoose(text);
    if (content === undefined) {
      throw new Error(choice?.finish_reason === 'length'
        ? 'model output was cut off (token limit)'
        : 'model returned invalid JSON');
    }
  }
  return {
    content,
    model: body.model || model,
    usage: body.usage ? { prompt: body.usage.prompt_tokens, completion: body.usage.completion_tokens, total: body.usage.total_tokens } : null,
    cost: typeof body.usage?.cost === 'number' ? body.usage.cost : null,
  };
}

/** JSON from a model reply: plain, fenced in ```json, or with text around the object. */
function parseJsonLoose(text) {
  if (text && typeof text === 'object') return text;
  if (typeof text !== 'string') return undefined;
  const tryParse = (t) => { try { return JSON.parse(t); } catch { return undefined; } };
  const direct = tryParse(text.trim());
  if (direct !== undefined) return direct;
  const unfenced = text.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
  const fenced = tryParse(unfenced);
  if (fenced !== undefined) return fenced;
  // Wrapped in prose, or a stray extra brace ("{\n{ ... }"): try each opening
  // brace (first few) up to the last closing one.
  const b = text.lastIndexOf('}');
  for (let a = text.indexOf('{'), n = 0; a >= 0 && a < b && n < 4; a = text.indexOf('{', a + 1), n++) {
    const v = tryParse(text.slice(a, b + 1));
    if (v !== undefined) return v;
  }
  return undefined;
}

/**
 * chat() with one retry on a fallback model when the primary is cut off,
 * returns unusable JSON or fails upstream (not on 402/429: those are account
 * limits). The result's `model` says which model actually answered.
 */
export async function chatWithFallback(model, fallbackModel, messages, opts = {}) {
  try {
    const r = await chat(model, messages, opts);
    if (opts.validate && !opts.validate(r.content)) throw new Error('model returned an incomplete result');
    return r;
  } catch (err) {
    if (!fallbackModel || fallbackModel === model || err.status === 402 || err.status === 429) throw err;
    const r = await chat(fallbackModel, messages, opts);
    if (opts.validate && !opts.validate(r.content)) throw new Error(`model returned an incomplete result (after ${err.message})`);
    return { ...r, fallbackFrom: model, fallbackReason: err.message };
  }
}

/** Stream a JSON body so slow models don't hit the edge first-byte limit. */
export function streamJson(work, headers) {
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(enc.encode(' '));
      controller.enqueue(enc.encode(JSON.stringify(await work)));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });
}
