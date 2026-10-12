// Password gate for the stress test. Every request needs a valid session cookie;
// without one the visitor sees a sign-in page. The password lives only in the
// SIMS_PASSWORD environment variable on Vercel, never in the repo.
import { next } from '@vercel/functions';

export const config = { matcher: '/:path*' };

const COOKIE = 'lodestar_sims';
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days
const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow' };

async function token(password) {
  const data = new TextEncoder().encode(`lodestar-sims:v1:${password}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function cookieValue(request) {
  const raw = request.headers.get('cookie') || '';
  const hit = raw.split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='));
  return hit ? hit.slice(COOKIE.length + 1) : '';
}

// Constant-time comparison so the check does not leak how much of a guess was right.
function same(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function signInPage(error, status = 401) {
  const html = `<!doctype html><html lang="en-US"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Sign in: MR line stress test</title>
<style>
:root{--bg:#f9fafb;--panel:#fff;--ink:#030712;--muted:#6b7280;--line:rgba(3,7,18,.1);--accent:#0284c7;--accent-ink:#fff;--bad:#e11d48}
@media (prefers-color-scheme:dark){:root{--bg:#030712;--panel:#0b1220;--ink:#f9fafb;--muted:#9ca3af;--line:rgba(255,255,255,.1);--accent:#38bdf8;--accent-ink:#030712;--bad:#fb7185;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px 16px;background:var(--bg);color:var(--ink);font:15px/1.6 Inter,ui-sans-serif,system-ui,sans-serif}
main{width:100%;max-width:400px;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(3,7,18,.04)}
.k{font-size:13px;font-weight:600;color:var(--accent)}
h1{font-size:22px;letter-spacing:-.02em;margin:4px 0 8px;line-height:1.25}
p{margin:0 0 20px;color:var(--muted)}
label{display:block;font-size:13.5px;font-weight:600;margin-bottom:6px}
input{width:100%;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)}
input:focus{outline:2px solid var(--accent);outline-offset:1px}
button{margin-top:16px;width:100%;font:inherit;font-weight:600;padding:10px;border:0;border-radius:9999px;background:var(--accent);color:var(--accent-ink);cursor:pointer}
.err{color:var(--bad);font-size:13.5px;margin:10px 0 0}
</style></head><body><main>
<div class="k">Lodestar futures lab</div>
<h1>MR line stress test</h1>
<p>This prototype is private. Enter the password you were given to open it.</p>
<form method="post" action="/__signin">
<label for="pw">Password</label>
<input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
${error ? `<p class="err" role="alert">${error}</p>` : ''}
<button type="submit">Sign in</button>
</form></main></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...NOINDEX } });
}

export default async function middleware(request) {
  const password = process.env.SIMS_PASSWORD;
  if (!password) return new Response('The site password is not configured.', { status: 503, headers: NOINDEX });
  const expected = await token(password);
  const url = new URL(request.url);

  if (url.pathname === '/__signin' && request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const given = form ? String(form.get('password') || '') : '';
    if (!same(await token(given), expected)) return signInPage('That password is not right. Try again.');
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/',
        'Set-Cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        ...NOINDEX,
      },
    });
  }

  if (same(cookieValue(request), expected)) return next({ headers: NOINDEX });
  return signInPage('', 401);
}
