# Velt — Library Listing & Distribution Plan

Goal: get Velt featured/listed on the official sites, GitHub repos, "awesome" lists, and template marketplaces of the libraries we integrate with — so developers in those ecosystems discover Velt as the collaboration layer.

- **Scope:** every documented Velt integration (editors, CRDT, canvas, tables, charts, media, databases, frameworks).
- **Venues:** GitHub-PR or submission-form only (community forums / Discord excluded).
- **Verified:** all URLs checked live on 2026-06-02.

**Legend** — **Demo?** = we have a working sample app · **Docs?** = dedicated Velt docs integration page · **Pri:** P1 = clean self-serve PR/form · P2 = gated (sign-in / CLA / third-party / strict rules).

---

## ✅ Submitted PRs — Batch 1 (opened 2026-06-03, from `yoen-velt`)

All opened from `velt-js/sample-apps` integrations; each is a single-line list entry. Status as of opening: OPEN, mergeable, +1/−0.

| Library | Repo | Section | PR | Status |
|---------|------|---------|----|--------|
| **SlateJS** | `ianstormtaylor/slate` | Extensions and Plugins (docs) | [#6067](https://github.com/ianstormtaylor/slate/pull/6067) | 🟢 Open |
| **BlockNote** | `defensestation/awesome-blocknote` | Tools → Plugins | [#5](https://github.com/defensestation/awesome-blocknote/pull/5) | 🟢 Open |
| **Quill** | `quilljs/awesome-quill` | Other | [#63](https://github.com/quilljs/awesome-quill/pull/63) | 🟢 Open |
| **CodeMirror** | `tmcw/awesome-codemirror` | Plugins | [#1](https://github.com/tmcw/awesome-codemirror/pull/1) | 🟢 Open |
| **Velt SDK** (realtime) | `jacktuck/awesome-realtime` | Websockets → Hosted | [#2](https://github.com/jacktuck/awesome-realtime/pull/2) | 🟢 Open |

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

## 1. Per-library venues

**Status legend** — 🟢 PR open · 🟡 already listed (no action) · 🔴 not viable / off-scope · ⚪ to do · ⚫ no PR/form venue.

| # | Library | Category | Demo? | Docs? | Pri | Venue | How to submit | Status / PR |
|---|---------|----------|:-----:|:-----:|:---:|-------|---------------|-------------|
| 1 | **TipTap** | Editor | ✅ | ✅ | P1 | [awesome-tiptap](https://github.com/ueberdosis/awesome-tiptap) | GitHub PR — "Community extensions" / "Who's using Tiptap?" | 🟡 Already listed (google-docs-comments) |
| 2 | **Lexical** | Editor | ✅ | ✅ | P2 | [facebook/lexical](https://github.com/facebook/lexical) | GitHub PR to `examples/` — **requires Meta CLA** | 🔴 Deferred — Meta CLA + code PR |
| 3 | **SlateJS** | Editor | ✅ | ✅ | P1 | [Slate docs Resources](https://docs.slatejs.org/general/resources) | GitHub PR to Slate docs (already lists Yjs integrations) | 🟢 [PR #6067](https://github.com/ianstormtaylor/slate/pull/6067) |
| 4 | **Quill** | Editor | ✅ | ✅ | P1 | [awesome-quill](https://github.com/quilljs/awesome-quill) | GitHub PR — "Modules" category, one entry/PR | 🟢 [PR #63](https://github.com/quilljs/awesome-quill/pull/63) |
| 5 | **CodeMirror** | Editor | ✅ | ✅ | P2 | [awesome-codemirror](https://github.com/tmcw/awesome-codemirror) | GitHub PR — ⚠ list is small/stale, marginal value | 🟢 [PR #1](https://github.com/tmcw/awesome-codemirror/pull/1) |
| 6 | **Ace** | Editor | ✅ | ✅ | P2 | [ace wiki — Extensions](https://github.com/ajaxorg/ace/wiki/Extensions) | GitHub PR/issue (no awesome list exists) | 🔴 Not PR-able (wiki) |
| 7 | **PlateJS** | Editor | ✅ | ✅ | P2 | [udecode/plate examples](https://platejs.org/docs/examples) · [awesome-wysiwyg-editors](https://github.com/JefMari/awesome-wysiwyg-editors) | GitHub PR | 🔴 Off-scope → [awesome-realtime PR #2](https://github.com/jacktuck/awesome-realtime/pull/2) |
| 8 | **BlockNote** | CRDT editor | ✅ | ✅ | P1 | [BlockNote Examples](https://www.blocknotejs.org/examples) · [awesome-blocknote](https://github.com/defensestation/awesome-blocknote) | Copy example on StackBlitz → GitHub PR | 🟢 [PR #5](https://github.com/defensestation/awesome-blocknote/pull/5) |
| 9 | **React Flow / xyflow** | Canvas/CRDT | ✅ | ✅ | P1 | [awesome-node-based-uis](https://github.com/xyflow/awesome-node-based-uis) · [Showcase](https://reactflow.dev/showcase) | GitHub PR ("Applications") · Form | 🔴 Off-scope (node-UI must be main product) |
| 10 | **Yjs** | CRDT | ✅ | ✅ | P1 | [yjs/yjs README](https://github.com/yjs/yjs) · [Yjs docs](https://docs.yjs.dev/ecosystem/connection-provider) | GitHub PR — Providers section (Velt = a Yjs provider) | 🟡 Already listed (Connection Providers) |
| 11 | **Chart.js** | Chart | ❌ | ✅ | P1 | [chartjs/awesome](https://github.com/chartjs/awesome) | GitHub PR — repo 30+ days old, alphabetical | ⚪ To do (build demo first) |
| 12 | **Highcharts** | Chart | ❌ | ✅ | — | — none | Plugin registry discontinued (410) — **outreach only** | ⚫ No PR/form venue |
| 13 | **Nivo** | Chart | ❌ | ✅ | P2 | [awesome-react-components](https://github.com/brillout/awesome-react-components) | GitHub PR — ⚠ "remove-one-to-add-one" rule | ⚪ To do (build demo first) |
| 14 | **AG Grid** | Table | ✅ | ✅ | — | [Tools & Extensions](https://www.ag-grid.com/community/tools-extensions/) | No self-serve — **pitch via Contact Us / GitHub** | ⚫ Outreach only |
| 15 | **TanStack Table** | Table | ✅ | ❌ | P2 | [TanStack Showcase](https://tanstack.com/showcase) | Form — "Submit Your Project" (sign in w/ GitHub) | ⚪ To do (form) |
| 16 | **Lottie** | Media | ❌ | ✅ | P1 | [awesome-lottie](https://github.com/LottieFiles/awesome-lottie) · [Integrations](https://lottiefiles.com/integrations) | GitHub PR (Libraries → Web) · Form | ⚪ To do (build demo first) |
| 17 | **MongoDB** | Database | ✅ | ✅ | P2 | [awesome-mongodb](https://github.com/ramnes/awesome-mongodb) | GitHub PR — "Applications" section | ⚪ To do |
| 18 | **PostgreSQL** | Database | ✅ | ❌ | P2 | [awesome-postgres](https://github.com/dhamaniasad/awesome-postgres) | GitHub PR — relevant category | ⚪ To do |
| 19 | **Next.js** | Framework | ✅ | ✅ | P1 | [Vercel Templates](https://vercel.com/templates/submit) · [next.js examples](https://github.com/vercel/next.js/tree/canary/examples) | Form · GitHub PR | ⚪ To do (Vercel form) |
| 20 | **React** | Framework | ✅ | ✅ | P2 | [awesome-react](https://github.com/enaqx/awesome-react) | GitHub PR — "React Real Apps" (⚠ no promo framing) | ⚪ To do |
| 21 | **Vue** | Framework | ✅ | ✅ | P2 | [awesome-vue](https://github.com/vuejs/awesome-vue) | GitHub PR — Open Source / Apps (repo link, not demo) | ⚪ To do |
| 22 | **Angular** | Framework | ❌ | ✅ | P2 | [awesome-angular](https://github.com/PatrickJS/awesome-angular) | GitHub PR — relevant / new category | ⚪ To do (build demo first) |

**Excluded (no PR/form venue):** Highcharts (registry returns 410), AG Grid (outreach only) — kept in the table for completeness.

**Notes:**
- *Demo ❌ / Docs ✅* (Chart.js, Highcharts, Nivo, Lottie, Angular): documented but no sample app yet — a demo must be built before submitting to examples/showcase venues.
- *Demo ✅ / Docs ❌* (TanStack Table, PostgreSQL): working sample but no docs page — fine for awesome-list/showcase; may warrant a docs page too.
- *Stale lists:* `awesome-slate` (abandoned since 2023) — use the Slate docs Resources PR instead; `awesome-codemirror` (small/stale) — marginal.

---

## 2. Cross-cutting platforms — bigger exposure than per-library lists

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

## 3. Recommended sequencing — cross-cutting first

1. **Package one flagship Next.js Velt demo** — public GitHub repo, "Deploy to Vercel" button, `.env.example` with documented vars, clear README. This single artifact is the unit of submission.
2. **Submit to Vercel Templates** (form) — highest ROI; start here.
3. **Adapt into platform variants** — Workers/Pages version for **Cloudflare** (add Playwright E2E); "Velt + Supabase realtime collaboration" example for **Supabase**; then StackBlitz / Replit (low marginal effort).
4. **Parallel low-effort track** — fire off the P1 per-library awesome-list / showcase PRs (TipTap, Quill, Slate, BlockNote, React Flow, Yjs, Chart.js, Lottie, MongoDB, Postgres, Vue, React, Angular). Independent and cheap.
5. **SDK-level listings** — add the Velt SDK to awesome-realtime / awesome-rtc / realtime-web-technologies-guide.

---

## 4. Verification note (2026-06-02)

- All 28 venue URLs load; none broken.
- **Vercel `/templates/submit`** returns HTTP 200 with a real browser user-agent — the 404 sometimes seen is transient/client-side; Vercel staff confirm it's the official form. Review turnaround is reportedly slow (~4 weeks).
- Each venue's exact format rules (CONTRIBUTING.md, character limits, categories) should be re-checked at submission time.
