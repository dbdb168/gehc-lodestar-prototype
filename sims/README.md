# MR line stress test

A five-step guided exploration of run MR-CONV-2031: choose a future, set its outside conditions, choose the OEM's actions, see the result, and decide with a test across all four futures.

- **Live site:** https://lodestar-sims.buildfirst.io (password protected; the Vercel project is `lodestar-sims`).
- **Run data** is read at runtime from `public/data/`. Rebuild it from the run files with `node sims/scripts/build-data.mjs` and commit the result.
- **Rules engine:** the timing, spend, stop lengths and action effects in `public/app.js` are estimates written for this prototype, and the page labels them as synthetic or estimates.
- **Password:** the `SIMS_PASSWORD` environment variable on the Vercel project. `middleware.js` shows a sign-in page and sets a 14-day cookie. To change the password, update the variable and redeploy; existing sessions end.
- **Deploy:** commit, then run `scripts/deploy-sims.sh` from the repo root. It runs the name check first.
- **Run locally:** `cd sims && npm run serve`, then open http://localhost:4173. The password gate only runs on Vercel.

## Videos

Videos are listed in `public/data/media.json`.

- `demo` is the walkthrough behind the "Watch the demo" button (`public/media/demo.mp4`, with a WebM copy). It is narrated in the ElevenLabs voice used for the futures videos, with on-screen captions and no music.
- `futures.F1` is the Future 1 video (`public/media/future-1.mp4`), the voiced cut with music from the futures-videos work. A slot with no `src` shows "Video coming soon". To replace a video, put the file in `public/media/` (for example `future-1.mp4`), set `src` to `media/future-1.mp4`, optionally add a WebM copy as `webm` (for browsers without H.264) and set `poster` and `length` (for example "2 minutes"), then commit and deploy.
- To add a slot for another future, add an entry such as `futures.F2` with the same fields.
