// Lodestar: external links from feed data. Only http(s) URLs become links, so a
// feed can never inject a javascript: or data: URL into the page.

import { h } from '@/utils/dom-utils';

export function safeHref(url: string | undefined | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : null;
  } catch {
    return null;
  }
}

/** An external link that opens in a new tab, or plain text when the URL is unusable. */
export function extLink(url: string | undefined | null, text: string): HTMLElement | string {
  const href = safeHref(url);
  return href ? h('a', { href, target: '_blank', rel: 'noopener noreferrer' }, text) : text;
}
