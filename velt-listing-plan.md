# Velt — Library Listing & Distribution Plan

Goal: get Velt featured/listed on the official sites, GitHub repos, "awesome" lists, and template marketplaces of the libraries we integrate with — so developers in those ecosystems discover Velt as the collaboration layer.

- **Scope:** every documented Velt integration (editors, CRDT, canvas, tables, charts, media, databases, frameworks).
- **Venues:** GitHub-PR or submission-form only (community forums / Discord excluded).
- **Verified:** all URLs checked live on 2026-06-02.

**Legend** — **Demo?** = we have a working sample app · **Docs?** = dedicated Velt docs integration page · **Pri:** P1 = clean self-serve PR/form · P2 = gated (sign-in / CLA / third-party / strict rules).

---

## ✅ Submitted PRs — Batch 1 (opened 2026-06-03, from `yoen-velt`)

All opened from `velt-js/sample-apps` integrations; each is a single-line list entry. Statuses re-checked live via GitHub API on 2026-06-15 across all batches (incl. Batch 0 + Batch 3 below): **3 merged, 9 open**.

| Library | Repo | Section | PR | Status |
|---------|------|---------|----|--------|
| **SlateJS** | `ianstormtaylor/slate` | Extensions and Plugins (docs) | [#6067](https://github.com/ianstormtaylor/slate/pull/6067) | ✅ **Merged** 2026-06-13 |
| **BlockNote** | `defensestation/awesome-blocknote` | Tools → Plugins | [#5](https://github.com/defensestation/awesome-blocknote/pull/5) | ✅ **Merged** 2026-06-07 |
| **Quill** | `quilljs/awesome-quill` | Other | [#63](https://github.com/quilljs/awesome-quill/pull/63) | 🟢 Open |
| **CodeMirror** | `tmcw/awesome-codemirror` | Plugins | [#1](https://github.com/tmcw/awesome-codemirror/pull/1) | 🟢 Open |
| **Velt SDK** (realtime) | `jacktuck/awesome-realtime` | Websockets → Hosted | [#2](https://github.com/jacktuck/awesome-realtime/pull/2) | 🟢 Open |

### Batch 2 — database & CRDT lists (opened 2026-06-03)

| Library | Repo | Section | PR | Status |
|---------|------|---------|----|--------|
| **MongoDB** | `ramnes/awesome-mongodb` | Applications | [#155](https://github.com/ramnes/awesome-mongodb/pull/155) | 🟢 Open |
| **CRDT** (Velt SDK) | `alangibson/awesome-crdt` | Implementations → Data Structures | [#14](https://github.com/alangibson/awesome-crdt/pull/14) | 🟢 Open (repo dormant since 2021 — low merge odds) |

### Batch 0 — Vercel Chat SDK (opened 2026-06-01/02, earlier outreach — pre-dates this plan)

| Library | Repo | Section | PR | Status |
|---------|------|---------|----|--------|
| **Vercel Chat SDK** | `vercel/chat` | Adapters docs (vendor-official adapter) | [#572](https://github.com/vercel/chat/pull/572) | ✅ **Merged** 2026-06-02 |
| **Vercel Chat SDK** (follow-up) | `vercel/chat` | Adapters docs — sharpen description + live demo link | [#578](https://github.com/vercel/chat/pull/578) | 🟢 Open |

### Batch 3 — official docs-site PRs (opened 2026-06-15 — the §1 primary channel)

| Library | Repo | Section | PR | Status |
|---------|------|---------|----|--------|
| **Yjs** | `yjs/docs` | Ecosystem → Connection Provider (`SUMMARY.md`) | [#81](https://github.com/yjs/docs/pull/81) | 🟢 Open (+ @dmonad ping) |
| **Ace** | `ajaxorg/ace` | Homepage → Related Projects (`index.html`) | [#5981](https://github.com/ajaxorg/ace/pull/5981) | 🟢 Open |
| **AG Grid** | `ag-grid/ag-grid` | Community → Tools & Extensions (`tools-extensions.json` + velt.webp) | [#14075](https://github.com/ag-grid/ag-grid/pull/14075) | 🟢 Open |

**Evaluated & skipped this round (rows 11–22 + SDK lists):**
- **PostgreSQL** (`awesome-postgres`) — list is Postgres *tooling* only; no "applications" section → off-scope.
- **Vue** (`awesome-vue`) — rules explicitly **bar commercial products**; only sanctioned path is "open an issue for advertising," not a PR.
- **React** (`awesome-react`) — "no advertisement board / entirely free resources" → vendor SDK is a coin-flip; not worth the goodwill risk.
- **awesome-rtc** — WebRTC/SIP/VoIP only → off-scope.
- **realtime-web-technologies-guide** — in-scope but abandoned since 2020 + heavy logo-block format → low ROI.
- **Chart.js / Nivo / Lottie / Angular** — no sample app yet; build a demo first to submit a real entry.
- **Highcharts / AG Grid** — no PR/form venue (registry 410 / outreach-only).
- **TanStack Table / Next.js (Vercel)** — sign-in submission forms, not CLI-pushable PRs.

### Skipped from the original "first 10" — with reasoning

| Library | Venue attempted | Skip reason | Detailed reasoning |
|---------|-----------------|-------------|--------------------|
| **TipTap** | `awesome-tiptap` | Already listed | Velt already appears in this list — the `google-docs-comments` demo by `@velt-js`, under the *Demos* section. A second entry would be a duplicate and would likely be rejected. List is active (maintained by ueberdosis, the TipTap team). |
| **Yjs** | `yjs/yjs` README | Already listed | Velt is already in the README under *Providers → Connection Providers* (listed as "Velt YJs"). No new entry needed. Editing would also require an issue-first discussion plus tests per their contributing rules. |
| **Lexical** | `facebook/lexical` | Blocked (heavy) | No awesome/showcase list exists; maintained by Meta (Facebook); no community examples are listed for outside projects. The only listing path is contributing a full runnable example app under `examples/` (a heavy code PR), gated behind signing the **Meta CLA**. No one-line entry is possible. The third-party `l-mbert/awesome-lexical` is effectively abandoned (2★, last commit 2022). |
| **Ace** | `ajaxorg/ace` wiki | Not PR-able | The suggested venue is a GitHub **wiki** page (Extensions). GitHub wikis are a separate repo that does **not** accept pull requests — the only options are editing the wiki directly (needs access) or opening an issue. No `awesome-ace` list exists. |
| **PlateJS** | `awesome-wysiwyg-editors` | Off-scope | That list is **editors-only** (sections: Standalone / jQuery / Angular / React / Vue / Ruby). Velt is a collaboration SDK, not an editor, so an entry would be off-scope and likely rejected. No dedicated `awesome-platejs` list exists. **Replaced with `awesome-realtime` (PR #2 above).** |
| **React Flow** | `awesome-node-based-uis` | Off-scope | Official xyflow-maintained list with an explicit gate: *"only submit links where a node-based UI is the main part of the application or tool."* Velt is a collaboration SDK, not a node-based-UI app, so it would be rejected. (A Showcase submission form exists, but it's a form, not a PR.) |

> ℹ️ **SlateJS demo:** renders correctly in-browser (client-side) and is now linked in PR [#6067](https://github.com/ianstormtaylor/slate/pull/6067) alongside the docs + source. Minor: the initial document still responds with an HTTP 500 status to direct/SSR requests (cosmetic — worth fixing for link-checkers/SEO, doesn't affect browser users).

---

## 1. Per-library listings — official docs sites first (verified 2026-06-09)

**The play:** get Velt listed on each library's **official documentation site**, the way Velt is already listed on React Flow's [multiplayer guide](https://reactflow.dev/learn/advanced-use/multiplayer) — a "Third Party Libraries and Services" table alongside Yjs, Liveblocks, Supabase, Convex, Jazz, Automerge, and Loro. That listing came from a simple pitch via [xyflow.com/contact](https://xyflow.com/contact); the xyflow team added the entry themselves. GitHub awesome-lists are the fallback track (open PRs tracked in "Submitted PRs" above).

**Legend** — **Demo?/Docs?** = working sample app / dedicated Velt docs page · 🟢 listed or PR open · 🔴 not viable · ⚪ to do · ⚫ no docs venue.

| # | Library | Demo? | Docs? | Docs-site venue (section) | Path | Status |
|---|---------|:-----:|:-----:|---------------------------|------|:------:|
| 1 | **React Flow** | ✅ | ✅ | [Multiplayer guide](https://reactflow.dev/learn/advanced-use/multiplayer) — "Third Party Libraries and Services" | via [xyflow.com/contact](https://xyflow.com/contact) | 🟢 **Listed** (model case) |
| 2 | **Yjs** | ✅ | ✅ | [docs.yjs.dev → Connection Provider](https://docs.yjs.dev/ecosystem/connection-provider) + yjs.dev "Services" — Liveblocks, y-sweet, SuperViz, Hocuspocus there; Velt only in the README (⭐ sponsor) | [PR #81](https://github.com/yjs/docs/pull/81) to `SUMMARY.md` + @dmonad ping | 🟢 **PR open** |
| 3 | **BlockNote** | ✅ | ✅ | [Collaboration docs](https://www.blocknotejs.org/docs/features/collaboration) — "Yjs Providers" (Liveblocks, PartyKit, Y-Sweet listed) | team@blocknotejs.org + PR | ⚪ **Top pick** |
| 4 | **Next.js / Vercel** | ✅ | ✅ | [Vercel Marketplace](https://vercel.com/integrations) — DevTools (**Liveblocks already listed**) | [Marketplace program form](https://vercel.com/marketplace/program) | ⚪ **Top pick** |
| 5 | **AG Grid** | ✅ | ✅ | [Tools & Extensions](https://www.ag-grid.com/community/tools-extensions/) — type "Extension" (commercial AdapTable listed) | [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) (JSON entry + velt.webp) | 🟢 **PR open** |
| 6 | **SlateJS** | ✅ | ✅ | [Resources](https://docs.slatejs.org/general/resources) — "Extensions and Plugins" (@liveblocks/yjs listed) | [PR #6067](https://github.com/ianstormtaylor/slate/pull/6067) merged 2026-06-13 | 🟢 **Listed** |
| 7 | **Ace** | ✅ | ✅ | [ace.c9.io](https://ace.c9.io/) — "Related Projects" (has a collab extension) | [PR #5981](https://github.com/ajaxorg/ace/pull/5981) to `index.html` | 🟢 **PR open** |
| 8 | **PlateJS** | ✅ | ✅ | [Yjs doc](https://platejs.org/docs/yjs) — "Provider Types" (no hosted SaaS yet) | Discord, then PR to `udecode/plate` | ⚪ |
| 9 | **Highcharts** | ❌ | ✅ | [Integrations](https://www.highcharts.com/integrations) — "Community Resources" | Email Highsoft via [contact page](https://www.highcharts.com/about-us/contact/) | ⚪ Outreach |
| 10 | **Vue** | ✅ | ✅ | vuejs.org ecosystem placement ([themes page](https://vuejs.org/ecosystem/themes.html) model) | **evan@vuejs.org** (published placement contact) | ⚪ Outreach |
| 11 | **MongoDB** | ✅ | ✅ | [Partner ecosystem catalog](https://cloud.mongodb.com/ecosystem/) + Atlas partner-integrations docs | [Technology Partner form](https://www.mongodb.com/partners) | ⚪ BD |
| 12 | **TanStack Table** | ✅ | ❌ | [Partners wall](https://tanstack.com/partners) (paid tiers) + free [showcase](https://tanstack.com/showcase) | partners@tanstack.com | ⚪ Paid |
| 13 | **Chart.js** | ❌ | ✅ | [chartjs/awesome](https://github.com/chartjs/awesome) (linked from official docs nav) — "Plugins"/"Tools" | PR — entry must link a GitHub repo ≥30 days old | ⚪ Repo-gated |
| 14 | **Lottie** | ❌ | ✅ | [lottiefiles.com/integrations](https://lottiefiles.com/integrations) — "list your integrations" prompt | Self-serve link (browser only — bot-gated) + support@lottiefiles.com | ⚪ Gated |
| 15 | **CodeMirror** | ✅ | ✅ | [Community packages](https://codemirror.net/docs/community/) — "Editor Extensions" (open-source-only policy) | Forum + edit via code.haverbeke.berlin (GitHub mirror archived) | ⚪ Gated |
| 16 | **Lexical** | ✅ | ✅ | [Collaboration guide](https://lexical.dev/docs/collaboration/react) — "Yjs providers" ("only y-websocket officially supported") | PR to `facebook/lexical` (Meta CLA) | 🔴 Low odds — win Yjs docs instead |
| 17 | **PostgreSQL** | ✅ | ❌ | [Software Catalogue](https://www.postgresql.org/download/product-categories/) | Self-serve form — weak category fit | 🔴 |
| 18 | **TipTap** | ✅ | ✅ | None — tiptap.dev sells competing Collaboration/Comments | Already on `awesome-tiptap` ×2 (the ceiling) | ⚫ |
| 19 | **Quill** | ✅ | ✅ | None — no resources/community page on quilljs.com | Fallback: [awesome-quill PR #63](https://github.com/quilljs/awesome-quill/pull/63) | ⚫ |
| 20 | **React** | ✅ | ✅ | None — react.dev is vendor-neutral by design | — | ⚫ |
| 21 | **Angular** | ❌ | ✅ | None — community-resources section rejected ([#58622](https://github.com/angular/angular/issues/58622)) | — | ⚫ |
| 22 | **Nivo** | ❌ | ✅ | None — site down (HTTP 402), no ecosystem page ever existed | — | ⚫ |

**Propose-a-page (no slot yet, warm team):** Svelte Flow multiplayer guide (404 today — pitch xyflow to port the React Flow guide, Velt included) · [reactflow.dev/showcase](https://reactflow.dev/showcase) submission (Velt-powered demo) · PlateJS hosted-provider section · Highcharts "Community Resources" entry.

---

## 2. Verification note (2026-06-02)

- All 28 venue URLs load; none broken.
- **Vercel `/templates/submit`** returns HTTP 200 with a real browser user-agent — the 404 sometimes seen is transient/client-side; Vercel staff confirm it's the official form. Review turnaround is reportedly slow (~4 weeks).
- Each venue's exact format rules (CONTRIBUTING.md, character limits, categories) should be re-checked at submission time.

---

## 3. Recommended sequencing — cross-cutting first

1. **Package one flagship Next.js Velt demo** — public GitHub repo, "Deploy to Vercel" button, `.env.example` with documented vars, clear README. This single artifact is the unit of submission.
2. **Submit to Vercel Templates** (form) — highest ROI; start here.
3. **Adapt into platform variants** — Workers/Pages version for **Cloudflare** (add Playwright E2E); "Velt + Supabase realtime collaboration" example for **Supabase**; then StackBlitz / Replit (low marginal effort).
4. **Parallel low-effort track** — fire off the P1 per-library awesome-list / showcase PRs (TipTap, Quill, Slate, BlockNote, React Flow, Yjs, Chart.js, Lottie, MongoDB, Postgres, Vue, React, Angular). Independent and cheap.
5. **SDK-level listings** — add the Velt SDK to awesome-realtime / awesome-rtc / realtime-web-technologies-guide.

---

## 4. Cross-cutting platforms — bigger exposure than per-library lists

These take **one** sample app and expose it to a broad, multi-framework audience.

| Platform | Type | Submit via | Requirements / notes | Value |
|----------|------|-----------|----------------------|:-----:|
| **Vercel Templates** | Template marketplace | [Form](https://vercel.com/templates/submit) | Public repo + live Vercel demo + "Deploy to Vercel" button + `.env.example`. Filters by framework **and** DB | ★★★ |
| **Cloudflare Templates** | Workers/Pages gallery | [GitHub PR](https://github.com/cloudflare/templates) | `name` ends `-template`, `cloudflare` meta block, Playwright E2E. Gallery placement needs CF sign-off | ★★★ |
| **Supabase examples** | Examples dir | [GitHub PR](https://github.com/supabase/supabase/tree/master/examples) | Add a "Velt + Supabase realtime collaboration" example folder | ★★★ |
| **StackBlitz starters** | Starter gallery | [GitHub PR](https://github.com/stackblitz/starters) | Open an issue first; gallery feature is hand-picked | ★★ |
| **Replit Templates** | Template gallery | In-product publish | Self-serve, instant; featuring is separate (Spotlight) | ★★ |
| **CodeSandbox templates** | Templates repo | [GitHub PR](https://github.com/codesandbox/sandbox-templates) | Runtime-focused; weaker fit | ★ |
| **Best of JS** | Project index | [GitHub issue](https://bestofjs.org/projects/project-guidelines) | Indexes the **Velt SDK repo**, not sample apps | ★ |
| **madewithreactjs.com** | Showcase | [Form](https://madewithreactjs.com/submit) | Free or paid; human-reviewed | ★ |

**On-topic niche lists (PR-based, accept commercial SaaS — for the Velt SDK itself):** [awesome-realtime](https://github.com/jacktuck/awesome-realtime) · [awesome-rtc](https://github.com/rtckit/awesome-rtc) · [realtime-web-technologies-guide](https://github.com/leggetter/realtime-web-technologies-guide). Longer-term: create our own `awesome-realtime-collaboration` list and submit it to [sindresorhus/awesome](https://github.com/sindresorhus/awesome).

**Verified NOT viable:** Netlify Templates (email-only) · Firebase / AWS Amplify galleries (no open submission) · awesome-selfhosted (OSS-only).

---

## 5. Outreach contacts & playbook (research 2026-06-09)

Per-library contact channels, **ranked: contact form / partnerships email → docs-repo PR (most docs pages are open-source) → community channel**. All URLs/paths live-verified 2026-06-09. Ordered by priority.

| Library | Primary contact (form / email) | Docs-repo PR path (fallback) | Community channel | Owner |
|---------|-------------------------------|------------------------------|-------------------|-------|
| **Yjs** | ✅ Opened — [PR #81](https://github.com/yjs/docs/pull/81) + @dmonad ping posted (leverages the sponsor ⭐). Awaiting review | `yjs/docs` → `SUMMARY.md` "Connection Provider" (merged precedent: Tiptap's Hocuspocus PR, 2025-11) | [discuss.yjs.dev](https://discuss.yjs.dev) (active; dmonad responds) | Kevin Jahns / community |
| **BlockNote** | **team@blocknotejs.org** — the [About page](https://www.blocknotejs.org/about) explicitly invites partnership/integration inquiries | `TypeCellOS/BlockNote` → `docs/content/docs/features/collaboration/index.mdx` | Discord [discord.com/invite/Qc2QTTH5dF](https://discord.com/invite/Qc2QTTH5dF) | TypeCellOS |
| **Vercel** | [Marketplace program form](https://vercel.com/marketplace/program) ("Ready to join the marketplace?") + [Technology Partner form](https://vercel.com/partners) | — (marketplace is gated; eventually requires a real integration build — OAuth etc.) | — | Vercel Inc. |
| **AG Grid** | ✅ Opened — [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) (JSON + velt.webp). Optional: parallel heads-up via the [contact form](https://www.ag-grid.com/about/) | `ag-grid/ag-grid` → `…/community/tools-extensions.json` | GitHub issues | AG Grid Ltd |
| **SlateJS** | ✅ Done — [PR #6067](https://github.com/ianstormtaylor/slate/pull/6067) merged 2026-06-13 | `ianstormtaylor/slate` → `docs/general/resources.md` (merged) | Slack (volunteer-run project) | Community (Ian Storm Taylor) |
| **Ace** | ✅ Opened — [PR #5981](https://github.com/ajaxorg/ace/pull/5981). Awaiting review | `ajaxorg/ace` → `index.html` (repo root renders ace.c9.io, "Related Projects" list) | [GitHub Discussions](https://github.com/ajaxorg/ace/discussions) | Community (ajaxorg) |
| **xyflow** (follow-ups) | [xyflow.com/contact](https://xyflow.com/contact) form + **info@xyflow.com** — the proven channel that produced the existing listing | `xyflow/web` → `sites/reactflow.dev/src/content/learn/advanced-use/multiplayer.mdx` (Svelte Flow content in same repo under `sites/svelteflow.dev/`) | Discord [discord.com/invite/RVmnytFmGW](https://discord.com/invite/RVmnytFmGW) | xyflow GmbH |
| **PlateJS** | Discord first to socialize, then PR | `udecode/plate` → `content/docs/(plugins)/(collaboration)/yjs.mdx` | Discord [discord.gg/mAZRuBzGM3](https://discord.gg/mAZRuBzGM3) | udecode (Ziad Beyens) |
| **Highcharts** | [Contact page](https://www.highcharts.com/about-us/contact/) — general email is obfuscated on-page (historically info@highsoft.com — read it off the page before sending); sales form at shop.highcharts.com/contact | — (website not open-source) | Discord / Stack Overflow | Highsoft AS (Norway) |
| **Vue** | **evan@vuejs.org** — published placement contact (themes-affiliation CTA precedent); agency-partner [Airtable form](https://airtable.com/shrCQhat57SApJI2l) as a secondary intake | `vuejs/docs` → `src/ecosystem/` (curated/commercial — a cold PR will likely be redirected to the email) | Vue Land Discord | Vue team / Evan You |
| **MongoDB** | "Become a Partner" form on [mongodb.com/partners](https://www.mongodb.com/partners) (category: **Technology**); registration portal `mongodb.my.salesforce-sites.com/partnerregistration` | — (Atlas partner-integrations docs are program-fed, not PR-able) | — | MongoDB, Inc. |
| **TanStack** | **partners@tanstack.com** (subject "TanStack Partnership Inquiry") — paid tiers; free supplement: [showcase submit](https://tanstack.com/showcase/submit) (GitHub/Google login) with a Velt + TanStack Table demo | — (partner wall not PR-able; showcase is DB-backed) | Discord | TanStack LLC |
| **Chart.js** | PR only: `chartjs/awesome` → `README.md`. CONTRIBUTING rules: link a **GitHub repo** (not npm/velt.dev), repo ≥30 days old, alphabetical order, one entry per PR | Same | Discord [discord.gg/HxEguTK6av](https://discord.gg/HxEguTK6av) | Community (chartjs org) |
| **CodeMirror** | Post on [discuss.codemirror.net](https://discuss.codemirror.net) first; submit the change via **code.haverbeke.berlin** (`codemirror/website` → `site/docs/community/index.html`) — the GitHub mirror is archived, no PRs possible there | Gitea instance (above) | Forum | Marijn Haverbeke (sponsor-funded) |
| **LottieFiles** | "Want to list your Lottie integrations?" link on [lottiefiles.com/integrations](https://lottiefiles.com/integrations) (open in a real browser — Cloudflare-blocks bots) + **support@lottiefiles.com** (slow per forum reports) | — | [forum.lottiefiles.com](https://forum.lottiefiles.com) | Design Barn Inc. |
| **Lexical** | PR only (expect pushback): `facebook/lexical` → `packages/lexical-website/docs/collaboration/react.md` — requires Meta CLA | Same | Discord [discord.gg/KmG4wQnnD9](https://discord.gg/KmG4wQnnD9) | Meta |
| **PostgreSQL** | Self-serve [product submission](https://www.postgresql.org/account/products/new/) (free community account) — low value, weak category fit | — (catalogue is database-driven) | pgsql-www list | PostgreSQL community |

**No-venue rows (do not spend outreach here):** React (react.dev is vendor-neutral by design) · Angular (concept rejected in [#58622](https://github.com/angular/angular/issues/58622)) · Nivo (site down; GitHub Discussions/Discord only) · Quill (no on-site page; awesome-quill + slab/quill Discussions are the fallback) · TipTap (direct competitor; `humans@tiptap.dev` / [contact-sales](https://tiptap.dev/contact-sales) exist but an on-site listing is unrealistic — awesome-tiptap listing already secured).

### Pitch template (anchor every outreach on the React Flow precedent)

> Hi — we're Velt ([velt.dev](https://velt.dev)), a collaboration SDK (comments, presence, cursors, realtime sync). We maintain a {library} integration with a working demo ({demo link}) and a dedicated docs page ({docs link}). We're listed on React Flow's multiplayer guide under "Third Party Libraries and Services" ([reactflow.dev/learn/advanced-use/multiplayer](https://reactflow.dev/learn/advanced-use/multiplayer)) alongside Yjs, Liveblocks, and Supabase. Could Velt be added to {page} under {section}? Happy to draft the entry or open the PR ourselves.

Fill {demo link}/{docs link} from the **Demo?/Docs?** columns in section 1 — only pitch libraries where at least one is ✅.

### Wave ordering

1. **Wave 1 — warm natural slots, free, do now:** ~~Yjs docs PR + dmonad ping~~ (✅ [PR #81](https://github.com/yjs/docs/pull/81) open) · BlockNote email + PR · ~~Slate PR #6067~~ (✅ merged) · ~~Ace PR~~ (✅ [PR #5981](https://github.com/ajaxorg/ace/pull/5981) open) · ~~AG Grid JSON PR~~ (✅ [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) open).
2. **Wave 2 — forms & BD outreach:** Vercel Marketplace application · xyflow follow-ups (showcase submission, Svelte Flow multiplayer guide pitch) · Highcharts email · Vue email to Evan You · MongoDB Technology Partner application.
3. **Wave 3 — build-first / gated:** Chart.js (publish the Velt chart-comments repo, wait 30 days) · CodeMirror (open-source a Velt↔CodeMirror binding package) · LottieFiles (build a Lottie integration) · PlateJS (Discord, then PR) · TanStack (decide on paid sponsorship).
4. **Skip:** React · Angular · Nivo · Quill (on-site) · TipTap (on-site) · PostgreSQL.

