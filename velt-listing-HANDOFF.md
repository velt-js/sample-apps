# Velt Library-Listing Initiative — Handoff

**Last updated:** 2026-06-04 · **Owner:** yoen@velt.dev (GitHub `yoen-velt`)

## Goal
Get Velt (collaboration SDK — comments, presence, live cursors, CRDT/Yjs editing) **listed in the ecosystems of the libraries it integrates with** (awesome-lists, official docs/showcases, template marketplaces), to drive developer discovery. Submissions are **GitHub-PR or web-form only** (no Discord/forum posts).

## Where everything lives
- **Source of truth (tracker):** `velt-listing-plan.md` (repo root, on `main` as of PR #56). Contains the 22-library venue table with a **Status / PR** column, the submitted-PR tables, skip reasoning, cross-cutting platforms, and recommended sequencing. **Read this first.**
- **This handoff:** `velt-listing-HANDOFF.md` (repo root).
- **Repo:** `github.com/velt-js/sample-apps` (public monorepo). Sample apps live under `apps/<framework>/<feature>/.../<demo>`; live demos are at `https://sample-apps-<name>.vercel.app` (⚠ some hosts are **truncated** by Vercel — verify with `curl -I` before using).
- **Local scratch clones of the target repos:** `~/velt-listing-prs/<repo>` — each has an `add-velt-listing` branch and a `fork` remote pointing at `git@github.com:yoen-velt/<repo>.git`. Reusable for follow-up edits.
- **Plan/scratchpad (not in repo):** `~/.claude/plans/can-you-go-through-inherited-summit.md`.

## Environment / auth
- `gh` CLI authed as **yoen-velt** (`repo` scope) — can fork + open PRs.
- Default branch is `main`; **branch before committing** to the sample-apps repo.
- The sample-apps repo is `private: true` in package.json but **public on GitHub**; no npm packages are published from it.
- zsh quirk: avoid unquoted globs in `--include` and unquoted `$var` word-splitting in loops.

## ✅ Submitted PRs (7 open, all single-line, +1/−0, mergeable)
| Library | PR | Notes |
|---|---|---|
| SlateJS | [ianstormtaylor/slate#6067](https://github.com/ianstormtaylor/slate/pull/6067) | docs `Extensions and Plugins`; entry = docs link; body has demo+docs+source |
| BlockNote | [defensestation/awesome-blocknote#5](https://github.com/defensestation/awesome-blocknote/pull/5) | Tools → Plugins; entry = live demo |
| Quill | [quilljs/awesome-quill#63](https://github.com/quilljs/awesome-quill/pull/63) | `Other` section; ⚠ repo stale (no merge since 2020) |
| CodeMirror | [tmcw/awesome-codemirror#1](https://github.com/tmcw/awesome-codemirror/pull/1) | Plugins; ⚠ tiny/low-traffic list |
| Velt SDK (realtime) | [jacktuck/awesome-realtime#2](https://github.com/jacktuck/awesome-realtime/pull/2) | Websockets → Hosted; substitute for PlateJS |
| MongoDB | [ramnes/awesome-mongodb#155](https://github.com/ramnes/awesome-mongodb/pull/155) | Applications; borderline-but-defensible |
| CRDT (Velt SDK) | [alangibson/awesome-crdt#14](https://github.com/alangibson/awesome-crdt/pull/14) | Data Structures; ⚠ repo dormant since 2021 |

**Next agent: check whether any of these were merged/commented and update the Status columns in `velt-listing-plan.md`.**

## ❌ Skipped / not viable (with reasons — don't re-attempt blindly)
- **TipTap** `awesome-tiptap` — already listed (google-docs-comments demo).
- **Yjs** `yjs/yjs` — already listed under Connection Providers.
- **Lexical** `facebook/lexical` — no list; needs Meta CLA + a full example-app code PR.
- **Ace** `ajaxorg/ace` wiki — GitHub wikis don't take PRs.
- **PlateJS** `awesome-wysiwyg-editors` — editors-only list, Velt off-scope (replaced w/ awesome-realtime).
- **React Flow** `awesome-node-based-uis` — gate: node-UI must be the main product.
- **PostgreSQL** `awesome-postgres` — Postgres-tooling only, no apps section.
- **Vue** `awesome-vue` — bars commercial products.
- **React** `awesome-react` — anti-advertising / free-resources-only; coin-flip.
- **awesome-rtc** — WebRTC/SIP only, off-scope.
- **realtime-web-technologies-guide** — in-scope but abandoned since 2020 (heavy logo-block format).

**Key lesson:** verify the list is genuinely in-scope AND actively maintained before submitting. Off-scope or promo entries get rejected and burn maintainer goodwill.

## ⛔ Blocked on a prerequisite
- **Chart.js, Nivo, Lottie, Angular** — documented integrations but **no sample app/demo exists**. Build a demo first, then their awesome-list PRs become legitimate.
- **Highcharts** (plugin registry 410), **AG Grid** (outreach only) — no PR/form venue.
- **TanStack Table** (showcase) & **Next.js** (Vercel Templates) — **sign-in web forms**, not CLI-pushable PRs; need manual submission.

## ▶ Recommended next steps (highest leverage first)
0. **New venues researched 2026-06-04** — see `velt-listing-plan.md` **§5** for ~25 additional non-forum self-serve venues (dev-tool/SaaS directories, new awesome-lists, deploy galleries, partner marketplaces) and **§6** for ~40 high-traffic / outreach venues **scored by impact** (dev publications, newsletters, review-aggregators, partner marketplaces). All ⚪ to do (document-only, none submitted). Cleanest free first actions: PR to `alexanderop/awesome-local-first` (§5); daily.dev Source+Squad, Crunchbase, Wappalyzer, DZone, Slashdot (§6); top editorial target = LogRocket guest post (§6A).
1. **Cross-cutting platforms** (much bigger reach than per-library lists): package one flagship **Next.js** Velt demo (public repo + "Deploy to Vercel" button + `.env.example` + README) → submit to **Vercel Templates** (form, `https://vercel.com/templates/submit` — the 404 is transient, returns 200 in-browser). Then adapt for **Supabase examples** and **Cloudflare templates** (code-example PRs).
2. **Build the missing demos** (Chart.js / Nivo / Lottie / Angular) to unlock those awesome-list PRs.
3. **Monitor the 7 open PRs**; respond to maintainer feedback; update `velt-listing-plan.md` statuses.

## How to open a listing PR (repeatable recipe)
1. Clone upstream to `~/velt-listing-prs/<repo>`; read its README + CONTRIBUTING to match section/format exactly (alphabetical? one-entry-per-PR? trailing period? repo-vs-demo link?).
2. `git checkout -b add-velt-listing`; add the single entry; `git diff` to confirm it's clean.
3. `gh repo fork <owner>/<repo> --clone=false --remote=false`; add `fork` remote (`git@github.com:yoen-velt/<repo>.git`); **commit** (don't forget — a branch with no commit pushes nothing); `git push -f fork add-velt-listing`.
4. `gh pr create --repo <owner>/<repo> --base <default> --head yoen-velt:add-velt-listing --title … --body …` (body should include live demo + docs page + public repo subfolder; note we maintain it).
5. Verify with `gh pr view <n> --repo <owner>/<repo> --json state,additions,changedFiles,mergeable`. Record the link in `velt-listing-plan.md`.

## Known issues
- **SlateJS demo** `sample-apps-slatejs-comments-demo.vercel.app` renders in-browser but returns **HTTP 500** to direct/SSR requests (cosmetic SSR status bug). Slate PR links the docs page so it's unaffected, but worth fixing for link-checkers/SEO.

## Done in this session
Created `velt-listing-plan.md`; researched/verified venues; opened 7 listing PRs (2 batches); documented skips with reasoning; added Status/PR column; merged the doc into `main` via squash PR #56 (branch deleted).
