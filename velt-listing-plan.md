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

### Batch 2 — database & CRDT lists (opened 2026-06-03)

| Library | Repo | Section | PR | Status |
|---------|------|---------|----|--------|
| **MongoDB** | `ramnes/awesome-mongodb` | Applications | [#155](https://github.com/ramnes/awesome-mongodb/pull/155) | 🟢 Open |
| **CRDT** (Velt SDK) | `alangibson/awesome-crdt` | Implementations → Data Structures | [#14](https://github.com/alangibson/awesome-crdt/pull/14) | 🟢 Open (repo dormant since 2021 — low merge odds) |

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
| 17 | **MongoDB** | Database | ✅ | ✅ | P2 | [awesome-mongodb](https://github.com/ramnes/awesome-mongodb) | GitHub PR — "Applications" section | 🟢 [PR #155](https://github.com/ramnes/awesome-mongodb/pull/155) |
| 18 | **PostgreSQL** | Database | ✅ | ❌ | P2 | [awesome-postgres](https://github.com/dhamaniasad/awesome-postgres) | GitHub PR — relevant category | 🔴 Off-scope (no "applications" section) |
| 19 | **Next.js** | Framework | ✅ | ✅ | P1 | [Vercel Templates](https://vercel.com/templates/submit) · [next.js examples](https://github.com/vercel/next.js/tree/canary/examples) | Form · GitHub PR | ⚪ To do (Vercel form) |
| 20 | **React** | Framework | ✅ | ✅ | P2 | [awesome-react](https://github.com/enaqx/awesome-react) | GitHub PR — "React Real Apps" (⚠ no promo framing) | 🔴 Skipped — anti-promo / commercial |
| 21 | **Vue** | Framework | ✅ | ✅ | P2 | [awesome-vue](https://github.com/vuejs/awesome-vue) | GitHub PR — Open Source / Apps (repo link, not demo) | 🔴 Skipped — commercial products barred |
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

---

## 5. Additional venues (research 2026-06-04)

Found via a fresh web sweep, de-duplicated against sections 1–2 above. All are GitHub-PR or web-form (no forums/Reddit/Discord/HN), and plausibly accept a **commercial** dev SDK. Verified live June 2026 (web fetch + GitHub API for stars/last-push). **Status legend unchanged** — none submitted yet, so every row is ⚪ to do. Demo-gated and integration-gated rows are flagged the same way as Chart.js/Lottie/Angular in section 1.

### 5A. Dev-tool / SaaS directories — actionable now, no demo required (highest leverage)

| Venue | Method + URL | Fit / category | Cost | Value | Status | Gotcha |
|-------|--------------|----------------|------|:-----:|:------:|--------|
| **DevHunt** | PR to `MarsX-dev/devhunt` **+** web form (GitHub login), [devhunt.org](https://devhunt.org) | Purpose-built dev-tool launch; collab SDK on-topic | Free | ★★★ | ⚪ | Launch-day upvote mechanic; quieter than PH |
| **agamm/awesome-developer-first** | [GitHub PR](https://github.com/agamm/awesome-developer-first) (1.7k★, active) | "tools/services you pay for" — fits *Messaging* or propose a *Collaboration* category | Free | ★★★ | ⚪ | Must justify vs Liveblocks/Ably; not all PRs merged |
| **Peerlist Launchpad** | Web form, [peerlist.io/launchpad](https://peerlist.io/launchpad) | Engineer-heavy builder audience | Free | ★★★ | ⚪ | Need complete Peerlist profile; weekly Mon/Tue window |
| **devtoolsd/awesome-devtools** | [GitHub PR](https://github.com/devtoolsd/awesome-devtools) (664★) | Dev-only list (Figma/Linear/Postman listed) | Free | ★★ | ⚪ | No dedicated collaboration category |
| **Uneed** | Form, [uneed.best/submit-a-tool](https://www.uneed.best/submit-a-tool) | Maker/SaaS + dev tools | Free ($30 skip-line) | ★★ | ⚪ | Broader maker audience |
| **Fazier** | Form (site badge or paid), [fazier.com](https://fazier.com) | PH-alternative, indie-dev | Free / paid | ★★ | ⚪ | Requires site badge or paid |
| **SaaSHub** | Form, [saashub.com/services/submit](https://www.saashub.com/services/submit) | "Alternative to Liveblocks/Ably" SEO/backlink | Free | ★★ | ⚪ | SEO value > direct dev traffic |
| **AlternativeTo** | Form, "Suggest new application" | List as alt to Liveblocks/Ably/PartyKit | Free | ★★ | ⚪ | Admins decline many |
| **StackShare** | Form, "List a Tool" | Tech-stack directory | Free | ★★ | ⚪ | Payoff slow (others add to stacks) |
| **G2 / Capterra-GetApp** | Vendor form (one profile, G2-owned 2026) | Collaboration / dev-infra category | Free to list | ★★ | ⚪ | Review-gated ranking; buyer/PM audience |
| **SourceForge / Startup Stash / Slant** | Forms | B2B "alternatives" / startup tools / "best X" Q&A | Free | ★ | ⚪ | IT/founder-skewed; Slant needs a fitting question |

**Skip (checked, rejected):** OpenAlternative (OSS-only) · BetaList (unreleased-only) · SaaSworthy (sales/SEO-farm) · Openbase (defunct/unverified) · Toolerific / devtoolslist (SEO farms). **Product Hunt** is mechanically viable but a one-shot launch event, not a durable listing — optional. **Console.dev** is email/editorial + beta-gated (see 5D).

### 5B. New integration / ecosystem awesome-lists — GitHub PR

| Repo | Section | Demo? | Value | Status | Notes |
|------|---------|:-----:|:-----:|:------:|-------|
| **alexanderop/awesome-local-first** | Dev Tools → State Management & Sync | ✅ have | ★★★ | ⚪ | Active (150★, 2026-05). Already lists Liveblocks, PartyKit, Hocuspocus — Velt's exact peers. **Cleanest one-line PR, no demo prerequisite. Top pick.** |
| **bytefer/awesome-nextjs** | "Integrated" (3rd-party SaaS) | ✅ have | ★★★ | ⚪ | Active; sits with Stripe/Auth0/Sanity. Pairs with the flagship Next.js demo. |
| **ghostwriternr/awesome-cloudflare** | Frameworks & Libraries (propose Collaboration) | needs CF angle | ★★ | ⚪ | Competitor mirror: **PartyKit listed, Velt not.** |
| **lukeed/awesome-cloudflare-workers** | Tool/Boss | needs CF angle | ★★ | ⚪ | Same mirror; verify recency at submit time |
| **artemnistuley/awesome-prosemirror** | Community modules | ✅ via TipTap/BlockNote | ★ | ⚪ | Borderline — Velt binds via TipTap/BlockNote/Yjs, not PM directly; expect scrutiny |

**Demo-gated** (build demo first, then legitimate — same pattern as Chart.js/Lottie): **editor-js/awesome-editorjs** (2.8k★, high traffic) · **Milkdown/awesome**.
**Skip:** l-mbert/awesome-lexical (dormant since 2022) · awesome-svelte / awesome-astro (no Velt SDK there) · excalidraw-libraries (asset registry, not tools) · awesome-tldraw (doesn't exist yet) · schickling/awesome-local-first (superseded by alexanderop's — don't double-submit).

### 5C. Template / "deploy-to" galleries — one demo repo fans out

> **Insight:** a single polished public **Next.js Velt demo repo** (`.env.example`, README, `app.json`, deploy buttons) feeds Vercel (section 2) **and** all of the below. Build once.

| Venue | Method | Value | Status | Note |
|-------|--------|:-----:|:------:|------|
| **Railway Templates** | Dashboard publish form + `Deploy on Railway` button ([docs](https://docs.railway.com/guides/publish-and-share)) | ★★★ | ⚪ | Biggest new template reach; any Next.js app deploys as-is; pays kickbacks |
| **Heroku Elements Buttons** | `app.json` + Deploy button → [elements.heroku.com/buttons](https://elements.heroku.com/buttons) | ★★ | ⚪ | Easy README-button win; declining ecosystem |
| **Koyeb one-click** | Deploy button | ★ | ⚪ | Button works; no public PR/form for curated catalog |

**Separate higher-effort, higher-payoff workstream — shadcn ecosystem:** [shadcn/ui Registry Directory](https://github.com/shadcn-ui/ui) (PR to `apps/v4/registry/directory.json`) + [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) (PR). Both require first publishing an open-source shadcn-compatible Velt component registry — real engineering, not a quick PR.
**Skip for now:** awesome-vite / awesome-tailwindcss (need a free-starter/Tailwind artifact + bar commercial framing) · Zeabur (Discord-gated) · Render / DigitalOcean / Astro / Nuxt / Remix (no open community gallery, or CLA/module build required).

### 5D. Partner marketplaces & dev media — require an integration artifact or editorial angle

| Venue | Method | Requirement | Value | Status |
|-------|--------|-------------|:-----:|:------:|
| **Supabase Partners/Integrations** | Form, [forms.supabase.com/partner](https://forms.supabase.com/partner) → [supabase.com/partners/integrations](https://supabase.com/partners/integrations) | Build a real "Velt + Supabase" demo first; reviewers assess a genuine integration | ★★★ | ⚪ |
| **Vercel Integrations Marketplace** (Connectable Account — distinct from Templates) | Integrations console form ([spec](https://vercel.com/docs/integrations/create-integration/submit-integration)) | Real eng lift: OAuth redirect + token exchange + EULA/Privacy URLs. Where Clerk etc. live (good mirror) | ★★★ | ⚪ |
| **Cooperpress** (JS Weekly ~450k, React Status, Node Weekly, Frontend Focus) | "Suggest a link" form in each issue footer + editor@cooperpress.com | Pitch a concrete demo/launch, not the homepage | ★★ | ⚪ |
| **Console.dev** | Editorial email submit vs [console.dev/selection-criteria](https://console.dev/selection-criteria) | **Beta-gated** — only features pre-1.0 / beta-labeled releases; need a beta-tagged Velt surface | ★ | ⚪ |
| **Changelog News** | Form, [changelog.com/news/submit](https://changelog.com/news/submit) | Explicitly **not commercial** — frame as OSS demo / technical write-up | ★ | ⚪ |

**Skip:** TLDR (paid only) · Framer / Webflow / Atlassian / Monday / Segment / Zapier / WordPress (need platform-specific plugin builds, poor fit for a JS SDK) · Netlify Integrations (partner-gated) · Smashing / CSS-Tricks (article pitches, not tool forms).

### Action-first ordering
1. **alexanderop/awesome-local-first** — cleanest one-line PR, lists Velt's exact peers, no demo needed.
2. **DevHunt + agamm/awesome-developer-first + devtoolsd/awesome-devtools + bytefer/awesome-nextjs** — clean PRs/forms, no demo, fit the existing recipe.
3. **Peerlist Launchpad + Uneed/Fazier + SaaSHub/AlternativeTo** — web forms; capture "Liveblocks/Ably alternative" intent.
4. **Railway Templates** (+ Heroku button) — once the flagship Next.js demo repo exists.
5. **Supabase Partners / Vercel Marketplace** — after the respective integration artifacts are built.
6. **awesome-cloudflare(-workers)** — once there's a credible CF/edge angle (competitor mirror vs PartyKit).

---

## 6. High-traffic & outreach venues (research 2026-06-04, scored)

This round prioritizes **reach/impact for outreach** — so it includes editorial, newsletter, review-aggregator, and partner-marketplace venues, not just self-serve PR/form. De-duplicated against sections 1–5. Verified live June 2026 (web fetch + SimilarWeb/source-reported figures).

**Scoring** — **Tr** = Traffic/Reach (1–5) · **Rel** = Relevance to devs building collaborative/real-time apps (1–5) · **Ease** = how easy to land (5 = free self-serve form/PR · 3 = light outreach/email · 1 = hard editorial/cold/notability-gated) · **Impact** = composite ★/★★/★★★. Traffic figures are estimates and decay — re-verify at outreach time.

### 6A. Developer publications & blogs — guest-post / editorial (durable SEO, must be genuine tutorial not ad)

| Venue | Reach | Tr | Rel | Ease | Impact | Path | Gotcha |
|-------|-------|:--:|:--:|:----:|:------:|------|--------|
| **LogRocket Blog** | ~5M views/mo, DA~80 | 5 | 5 | 4 | ★★★ | [become-a-logrocket-guest-author](https://blog.logrocket.com/become-a-logrocket-guest-author/) (pays ≤$350) | Heavy edit; 1-mo repost exclusivity. **Best single target.** |
| **freeCodeCamp News** | ~11M visits/mo, DA~90+ | 5 | 4 | 3 | ★★★ | [author application + style guide](https://www.freecodecamp.org/news/developer-news-style-guide/) | Strictly educational; Velt only as incidental tool. Apply as a person, not "Velt." |
| **InfoQ** | ~1.5M readers, DA~88 | 4 | 4 | 3 | ★★★ | editors@infoq.com / [write-for-infoq](https://www.infoq.com/write-for-infoq/) | Architect audience (= buyers). Vendor-neutral; 1 proposal/quarter. |
| **The New Stack** | ~1–1.5M/mo, DA~85 | 4 | 4 | 4 | ★★★ | editorial contributors@thenewstack.io **or** paid sponsors@ (can be promotional) | Sponsored lane = pay-to-play but lets you talk product. |
| **SitePoint** | ~2–3M/mo, DA~88 | 4 | 4 | 4 | ★★★ | [write-for-us](https://www.sitepoint.com/write-for-us/) (pays $150–300+) | Practical build-along tutorials; promo pitches rejected. |
| **DZone** | ~3–4M/mo, DA~83 | 4 | 4 | 5 | ★★★ | [self-serve contribute](https://dzone.com/pages/contribute) | **Lowest-friction high-DA win.** Real name + title; queue unless DZone Core. |
| **Smashing Magazine** | ~3–4M/mo, DA~90 | 4 | 3 | 2 | ★★ | [write-for-us](https://www.smashingmagazine.com/write-for-us/) | Design/UX lean → frame as "multiplayer/presence UX." Tough bar. |
| **HackerNoon** | ~0.7–1M/mo (declining), DA~80 | 3 | 4 | 5 | ★★ | [self-serve submit](https://help.hackernoon.com/how-do-i-get-published) | Use free editorial lane (not paid PR newswire). |
| **CSS-Tricks** | low cadence, DA~90 legacy | 3 | 3 | 4 | ★★ | [guest-writing](https://css-tricks.com/guest-writing/) ($250) | Revived but slow; front-end framing only. |
| **Codrops** | ~1–2M/mo, DA~85 | 3 | 3 | 3 | ★★ | [submit](https://tympanus.net/codrops/submit/) | Only a visually striking cursors/whiteboard demo fits. |
| **dev.to org / Hashnode team blog** | dev.to ~10M+/mo; Hashnode ~3–5M/mo | 5/4 | 4 | 5 | ★★ | free org/team blog; "Featured" is curated, paid sponsorship opaque | Owned-channel play; organic reach algorithm-dependent. |

**Skip:** Stack Overflow Blog (employees only) · Better Programming (sunset) · web.dev (unpitchable cold — DevRel only) · Telerik/Syncfusion (vendor blogs, no open guest path) · generic "write-for-us" link farms.

### 6B. Developer newsletters & curated media — by reach (mostly paid sponsorship; daily.dev is the free standout)

| Venue | Reach | Tr | Rel | Ease | Impact | Path | Cost |
|-------|-------|:--:|:--:|:----:|:------:|------|------|
| **daily.dev** (Source + Squad) | 500k+ digest, multi-M feed | 5 | 5 | 4 | ★★★ | [suggest blog/changelog RSS as Source](https://docs.daily.dev/docs/for-content-creators/suggest-new-source) + run a public Squad | **Free** |
| **Bytes.dev** (ui.dev) | ~216k JS devs | 5 | 5 | 2 | ★★★ | [advertise](https://bytes.dev/advertise) → sponsor@fireship.dev | Paid (request kit) |
| **This Week in React** | ~40k mid/senior React | 4 | 5 | 4 | ★★★ | [sponsor form](https://thisweekinreact.com/sponsor) | Sponsored Links €1,600/4 issues; placement €800+/issue |
| **Smashing newsletter** | ~185k front-end/design | 5 | 4 | 2 | ★★★ | advertising@smashingmagazine.com | Paid (opaque) |
| **Refind** | ~491k daily | 5 | 3 | 3 | ★★ | [sponsors](https://refind.com/sponsors) (CPA) | Pay-per-click, topic-target |
| **Pointer.io** | ~55k eng leaders | 4 | 4 | 3 | ★★ | [sponsorship](https://www.pointer.io/sponsorship/) | ~$1,500+/issue (buyer persona) |
| **CSS Weekly** | ~43k | 4 | 4 | 3 | ★★ | [advertise](https://css-weekly.com/advertise/) | Sponsored Link $300/wk |
| **Hacker Newsletter** | ~60k | 4 | 4 | 3 | ★★ | email curator (footer; /sponsor 404s) | Paid |
| **Rendezvous w/ Cassidoo** | ~17k, 65% open | 3 | 4 | 3 | ★★ | [sponsor](https://cassidoo.co/newsletter/sponsor/) / BuySellAds | Self-serve |
| **Web Tools Weekly** | ~13.6k | 2 | 4 | 4 | ★★ | [sponsor](https://webtoolsweekly.com/sponsor) | Cheap test: Text Link $30 |
| **React Newsletter / React Digest** | ~17k / ~22k | 3 | 5 | 3 | ★ | site / [Paved](https://www.paved.com/react-newsletters) | Paid (overlaps TWIR) |

**Skip:** The Overflow (wound down) · Lobsters (forum) · Frontend Weekly clones (verify which is live) · long-tail JS newsletters (Bytes/JS Weekly/TWIR already cover the audience). **Note:** the popular GitHub developer-newsletters list has stale counts — figures above are source-current.

### 6C. Software review / comparison / tech-intel directories — by traffic (dev-intel vs SEO-only flagged)

| Venue | Traffic | Tr | Rel | Ease | Impact | Path | Note |
|-------|---------|:--:|:--:|:----:|:------:|------|------|
| **Crunchbase** | ~13–15M/mo | 5 | 4 | 5 | ★★★ | [add + claim](https://www.crunchbase.com/) | Free; investor/CTO/intel reach + high-DR backlink |
| **Wappalyzer** (tech entry) | ~8.6M/mo | 5 | 5 | 4 | ★★★ | [suggest technology](https://www.wappalyzer.com/technologies/suggest/) | **True dev/intel reach** — auto-detects Velt's JS fingerprint |
| **G2** (profile + Real-Time Collaboration category) | very high DA | 5 | 4 | 4 | ★★★ | [claim](https://sell.g2.com/) | Ranks for "[competitor] alternatives"; **seed ~5–10 reviews first** |
| **TrustRadius** | ~284k/mo | 3 | 4 | 4 | ★★★ | [claim](https://solutions.trustradius.com/claim-your-profile/) | Free tier; indexes Programming/Developer Software; review-gated ranking |
| **BuiltWith** (tech trends) | ~1.3M/mo | 4 | 5 | 4 | ★★★ | auto-detect + [add](https://builtwith.com/) | "Who uses Velt" trend page; detection-driven |
| **Slashdot Software** | mid | 4 | 4 | 5 | ★★ | [submit product](https://slashdot.org/software/new) | Free; auto-generates "vs Liveblocks" pages (competitor gap) |
| **Gartner Peer Insights** | ~181k/mo | 3 | 4 | 4 | ★★ | [vendor portal](https://www.gartner.com/peer-insights/vendor-portal/overview) | Needs enterprise customers; review-gated |
| **PeerSpot / Software Advice / FinancesOnline / GoodFirms / Crozdesk** | varies | 2–4 | 2 | 3–5 | ★–★★ | self-serve vendor sign-up | Mostly **SEO/backlink only**; generic-SaaS buyer audience |
| **Trustpilot** | ~69M/mo | 5 | 2 | 4 | ★★ | [claim](https://business.trustpilot.com/signup) | Huge traffic, wrong audience — trust-badge/backlink value |
| **Product Hunt** (alternatives pages) | high, dev/maker | 4 | 4 | 3 | ★★★ | maintain product page + appear on competitors' /alternatives | Highest dev-intent besides Wappalyzer |

**Skip:** Siftery (folded into G2) · Wikipedia "comparison of collaborative software" (notability-gated — will be reverted; revisit after independent press) · Owler/Cuspera/Tracxn/Serchen (negligible traffic).

### 6D. Partner marketplaces & competitor-gap venues (need a real integration artifact; durable + co-marketing)

| Venue | Tr | Rel | Ease | Impact | Path | Requirement / competitor present |
|-------|:--:|:--:|:----:|:------:|------|----------------------------------|
| **Convex Components** (has a "Collaboration" category) | 4 | 5 | 5 | ★★★ | [convex.dev/components](https://www.convex.dev/components) | Publish a thin Velt+Convex npm component; category gap (Velt absent) |
| **Sanity Exchange** | 4 | 3 | 4 | ★★ | [sanity.io/exchange](https://www.sanity.io/exchange) | Build a Velt-comments-on-Studio plugin |
| **Appwrite Integrations** | 4 | 4 | 3 | ★★ | [appwrite.io/integrations](https://appwrite.io/integrations) | Technology-partner form + working integration; co-marketing |
| **Contentful / Storyblok / Auth0 / Knock** | 3–4 | 2–3 | 2–3 | ★ | respective partner programs | Heavy: build+maintain app + partner onboarding. Pursue only if a product integration already makes sense |

**Competitor-gap quick hits (they're listed, Velt isn't, open path exists):** G2 (Liveblocks profile + alternatives) · Slashdot (Liveblocks + auto "vs" pages) · Convex Components (Collaboration category) · Ably's own "best realtime collaboration SDKs" listicle lists Liveblocks/Cord/Replicache/PubNub — **can't join it; counter-play is our own SEO listicle + neutral-roundup outreach.**
**Reality check:** competitor "integrations/partners" pages are mostly **outbound** (Liveblocks documents connecting *to* Supabase/Cursor; it isn't listed *on* them) — so durable competitor overlap concentrates in review aggregators (G2, Slashdot) and listicles, not partner marketplaces.

### Top outreach targets to action first (highest impact-per-effort)
1. **Free, dev-relevant, do today:** daily.dev (Source RSS + Squad) · Crunchbase · Wappalyzer suggest · BuiltWith · Slashdot · DZone self-serve post · Product Hunt page hygiene + competitor /alternatives.
2. **High-traffic editorial (genuine tutorial):** LogRocket → DZone → The New Stack (editorial + sponsored) → freeCodeCamp / InfoQ / SitePoint.
3. **Paid newsletter push (precise audience):** This Week in React (Sponsored Links, cheap) → Bytes.dev (max JS reach) → Pointer.io (buyer persona).
4. **Review-aggregator gap (seed reviews first):** G2 + TrustRadius "Real-Time Collaboration" category.
5. **Integration-artifact venues:** Convex Components (lowest lift) → Sanity Exchange → Appwrite.
