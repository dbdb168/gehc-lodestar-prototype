# Moderator checks, per phase

The Shell repo enforces quality with hooks and a quality-analyst persona. The fork replaces both with these checks, run by the moderator on every lens output before it is used, and on every phase synthesis before it is written.

## On every lens output

1. Both files exist and begin with the required first line.
2. No banned term: run `npm run lint:names` from the repo root (the list lives only in the environment).
3. Every finding names at least one node id from the map.
4. Every fact about the world has a link and a date. Every claim about the OEM carries AI-suggested, Panel judgement or Placeholder.
5. Phases 2 to 5 contain no recommendation. Search for "should", "must", "needs to" aimed at the OEM.
6. Each uncertainty names its kind of not-knowing.
7. The summary is three to five full sentences plus a paragraph of at most one hundred words.
8. No bullet fragments, no em dashes, abbreviations defined at first use.

A file that fails 1, 2 or 3 is re-run. A file that fails 4 to 8 is used, and the failure is noted in the phase synthesis so the next round's prompt corrects it.

## On the phase synthesis

- Phase 2: every predetermined element has a date and a source; anything a lens called predetermined that another lens called uncertain is moved to the uncertain list.
- Phase 3: the two axes are independent of each other; each moves at least three of the eight risks; the grid (uncertainties by risks) is complete; the contrarian's third uncertainty is recorded as a watch item with the reason it was not chosen.
- Phase 4: each future is internally consistent; the four differ on both axes; each has a first break, a date and a cost against the tolerance line; the contrarian's proposed fifth future is recorded with the reason it was or was not folded in.
- Phase 5: every indicator names a public source with a link and a cadence; at least one indicator per uncertainty is live in the command centre; each has a settle reading in both directions and a false-signal reading.
- Phase 6a: every break names a node, a date, a duration and a cost line; shared breaks are separated from future-specific ones.
- Phase 6b: every action has an owner function, an act-by date, three triggers as full sentences, and a verdict (works in all four, in some, or in one); nothing is "robust" by default.
- Phase 7: every belief in the worldview is marked confirmed, challenged or silent against each future, with the crux named.

## On output.json

Validate against `templates/output.schema.json`. Every string that reaches a screen is a full sentence or a plain label. Every number carries a basis. No company or people names.
