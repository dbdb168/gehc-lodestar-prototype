// Lodestar: guard against model-invented money. Option costs must be
// qualitative unless the evidence the model was given contains the figure.

const MONEY = /(?:(?:[$€£]|\b(?:usd|eur|gbp)\s?)\d[\d,.]*\s?(?:k|m|bn|b|million|billion|thousand)?)|(?:\d[\d,.]*\s?(?:k|m|bn|million|billion)?\s?(?:usd|eur|gbp|dollars|euros|pounds))/gi;

const norm = (s) => String(s ?? '').toLowerCase().replace(/[\s,]/g, '');

/** The text with any currency amount that is not in `source` replaced by a qualitative note. */
export function unsupportedMoneyToText(text, source) {
  const t = String(text ?? '');
  const amounts = t.match(MONEY);
  if (!amounts) return t;
  const src = norm(source);
  return amounts.some((a) => !src.includes(norm(a))) ? 'Not costed: no cost data in the evidence' : t;
}
