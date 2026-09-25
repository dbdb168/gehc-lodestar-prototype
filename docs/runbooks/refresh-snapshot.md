# Refresh the deployed snapshot

The exposure engine falls back to `app/public/snapshot/last-good.json` when a feed fails
and the browser has no last good copy of its own. Refresh the file before an important
demo so the fallback is recent. It contains public feed data only.

1. Open https://lodestar-command.vercel.app/dashboard and wait until the Hotspots feed
   line reads "from 8/8 live feeds" (or as many as are live).
2. Open the browser console and run `lodestarExportSnapshot()`. The browser downloads
   `last-good.json`.
3. Replace `app/public/snapshot/last-good.json` with it.
4. Run `npm run lint:names`. If it flags the file, find the match (usually a country
   code in the travel-advisory map) and fix the source of it rather than allowlisting.
5. Commit, then `npm run deploy:command`.

Each feed in the file keeps the time it was fetched; the page shows that time whenever
it falls back to the snapshot. Feeds that were down when you exported are simply absent.
