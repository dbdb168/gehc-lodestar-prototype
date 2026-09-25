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
  const text = body.choices?.[0]?.message?.content;
  let content = text;
  if (schema) {
    try { content = typeof text === 'string' ? JSON.parse(text) : text; } catch { throw new Error('model returned invalid JSON'); }
  }
  return {
    content,
    model: body.model || model,
    usage: body.usage ? { prompt: body.usage.prompt_tokens, completion: body.usage.completion_tokens, total: body.usage.total_tokens } : null,
    cost: typeof body.usage?.cost === 'number' ? body.usage.cost : null,
  };
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
