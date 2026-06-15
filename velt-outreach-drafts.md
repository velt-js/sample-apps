# Velt — Outreach Drafts (first 10 targets)

Ready-to-send messages, form submissions, and PR diffs for the top 10 targets in `velt-listing-plan.md` §1. All venue form fields, file formats, and Velt asset URLs below were live-verified 2026-06-10. Sender: yoen@velt.dev.

**Verified Velt assets used in these drafts:**
- Yjs: [velt.dev/libraries/yjs](https://velt.dev/libraries/yjs) · [CRDT docs](https://docs.velt.dev/realtime-collaboration/crdt/overview) · [live demo](https://velt-general-crdt-demo.vercel.app/) · npm `@veltdev/crdt`
- React Flow: [library page](https://velt.dev/libraries/react-flow) · [docs](https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow) · [live demo](https://velt-reactflow-crdt-demo.vercel.app/)
- BlockNote: [library page](https://velt.dev/libraries/blocknote) · [docs](https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote) · [live demo](https://velt-blocknote-crdt-demo.vercel.app/)
- SlateJS: [library page](https://velt.dev/libraries/slatejs) · [docs](https://docs.velt.dev/async-collaboration/comments/setup/slatejs) · [live demo](https://slatejs-app-demo.vercel.app/)
- Ace: [docs](https://docs.velt.dev/async-collaboration/comments/setup/ace) · [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ace/ace-comments-demo)
- PlateJS: [docs](https://docs.velt.dev/async-collaboration/comments/setup/plate) · [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/crdt/text-editors/platejs/platejs-crdt-demo)
- AG Grid: [integration docs](https://docs.velt.dev/integrations/ag-grid) · [React demo](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/tables/ag-grid/comment-aggregation) · [Vue demo](https://github.com/velt-js/sample-apps/tree/main/apps/vue/comments/tables/ag-grid)
- Highcharts: [library page](https://velt.dev/libraries/highcharts) · [docs](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts)
- Demo hub: [samples.velt.dev](https://samples.velt.dev/)

---

## 1. Yjs — one-line PR to `yjs/docs` + ping @dmonad

**Channel:** GitHub PR (primary) + PR comment ping. Owner: Kevin Jahns (Velt's README entry already carries the sponsor ⭐ — use that).

**The diff** — `SUMMARY.md`, append after the Hocuspocus line (exact existing format, two-space indent):

```markdown
  * [Velt](https://velt.dev/libraries/yjs)
```

(No change needed to `ecosystem/connection-provider/README.md` — it's heading-only; external providers live solely in SUMMARY.md.)

**PR title:** `Add Velt to Connection Providers`

**PR body:**

> Adds Velt to the Connection Provider list, matching the existing external entries (y-sweet, Liveblocks, SuperViz, Hocuspocus).
>
> Velt is a managed Yjs backend — realtime WebSocket sync, persistent storage, offline support with automatic reconnection, and version history, with no server setup ([`@veltdev/crdt`](https://www.npmjs.com/package/@veltdev/crdt) on npm). It's already listed in the yjs/yjs README under Providers as "Velt YJs" ⭐ — this PR mirrors that entry onto the docs site.
>
> Docs: https://docs.velt.dev/realtime-collaboration/crdt/overview · Live demo: https://velt-general-crdt-demo.vercel.app/

**Ping comment (on the PR, tagging @dmonad):**

> Hi Kevin — small one: this mirrors Velt's existing README Providers entry onto docs.yjs.dev, alongside Liveblocks/SuperViz/Hocuspocus. We sponsor through GitHub Sponsors and would love to stay aligned with how you want commercial providers represented — happy to adjust wording or placement. Separately: is the yjs.dev front-page "Services" section open to the same addition?

---

## 2. BlockNote — email to team@blocknotejs.org (+ PR offer)

**Channel:** Email (About page explicitly invites partnership/integration inquiries). Follow with a PR to `TypeCellOS/BlockNote` → `docs/content/docs/features/collaboration/index.mdx` ("Yjs Providers" list) if they're receptive.

**To:** team@blocknotejs.org
**Subject:** Adding Velt to the Yjs Providers list in your collaboration docs?

> Hi BlockNote team,
>
> I'm Yoen from Velt (velt.dev) — we build a collaboration SDK (comments, presence, cursors, and a managed Yjs backend). Velt is a Yjs connection provider — we're listed in the official Yjs README (https://github.com/yjs/yjs) — so we slot directly into BlockNote's existing Yjs-based collaboration. We maintain a dedicated BlockNote integration and would love to be listed in the "Yjs Providers" section of your collaboration docs, alongside Liveblocks, PartyKit, and Y-Sweet:
>
> - Integration docs: https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote
> - Live demo: https://velt-blocknote-crdt-demo.vercel.app/
> - Library page: https://velt.dev/libraries/blocknote
> - Yjs provider (listed in yjs/yjs README): https://github.com/yjs/yjs
>
> For context, we're listed on React Flow's multiplayer guide under "Third Party Libraries and Services" (reactflow.dev/learn/advanced-use/multiplayer), and our BlockNote plugin entry was just merged into awesome-blocknote.
>
> Happy to open the PR ourselves with whatever wording you prefer — it'd be a one-liner in the providers list. Also open to going deeper (a joint example or guide) if that's interesting to you.
>
> Thanks!
> Yoen — Velt

---

## 3. Next.js / Vercel — Marketplace program form

**Channel:** Form at [vercel.com/marketplace/program](https://vercel.com/marketplace/program) ("Ready to join the marketplace?" — multi-step; first step verified). Liveblocks is already in the marketplace under DevTools — same category.

**Form values (step 1):**

| Field | Value |
|---|---|
| Company name | Velt |
| Contact name | Yoen Zhang |
| Email address | yoen@velt.dev |
| Company website | https://velt.dev |

**Pitch blurb (for the follow-up step / reviewer call):**

> Velt is a collaboration SDK for product teams: comments, presence, live cursors, huddles, recording, and a managed Yjs/CRDT backend — added to any React/Next.js app in a few lines. We'd list in DevTools (where Liveblocks sits today) as a connectable account. Most of our customers deploy on Vercel; our demos are Next.js apps deployed on Vercel (e.g. https://velt-blocknote-crdt-demo.vercel.app/, https://velt-reactflow-crdt-demo.vercel.app/, hub: https://samples.velt.dev/). We're ready to build the OAuth/token-exchange integration per your integration spec.

**Note:** the full Marketplace listing requires a real integration build (OAuth redirect + token exchange + EULA/privacy URLs) — submitting the form starts the conversation with their team.

---

## 4. AG Grid — ✅ PR #14075 OPEN ([ag-grid/ag-grid#14075](https://github.com/ag-grid/ag-grid/pull/14075))

**Channel:** PR to `ag-grid/ag-grid` (branch `latest`) → `external/ag-website-shared/src/content/community/tools-extensions.json`, plus a logo at `documentation/ag-grid-docs/public/community/tools-extensions/velt.webp`. AdapTable (commercial, closed-source) is the precedent entry.

**JSON entry (matches AdapTable's commercial-entry shape):**

```json
{
    "link": "https://docs.velt.dev/integrations/ag-grid",
    "title": "Velt",
    "description": "Velt is a collaboration SDK that adds commenting, presence, and live collaboration to AG Grid. Users can attach threaded comments to individual cells with comment aggregation across rows and columns, see who else is viewing the grid, and follow along with live cursors — all with a few lines of code.",
    "open_source": false,
    "type": "Extension",
    "tags": ["Extension"],
    "frameworks": ["React", "TypeScript", "Vue"],
    "img": "velt.webp"
}
```

**PR title:** `docs(community): add Velt to Tools & Extensions`

**PR body:**

> Adds Velt to the community Tools & Extensions directory as an Extension. Velt adds cell-level commenting (with aggregation), presence, and live cursors on top of AG Grid.
>
> - Integration docs: https://docs.velt.dev/integrations/ag-grid
> - React demo: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/tables/ag-grid/comment-aggregation
> - Vue demo: https://github.com/velt-js/sample-apps/tree/main/apps/vue/comments/tables/ag-grid
>
> Includes `velt.webp` per the existing logo convention. Happy to adjust the description, type, or tags to fit your curation.

**Parallel contact-form note** ([ag-grid.com/about](https://www.ag-grid.com/about/) — fields: First Name / Last Name / Work email / "Tell us about your interest in AG Grid"):

| Field | Value |
|---|---|
| First Name | Yoen |
| Last Name | Zhang |
| Work email | yoen@velt.dev |
| Message | Hi — I'm Yoen from Velt (velt.dev). We make a collaboration SDK with a dedicated AG Grid integration: cell-level threaded comments with aggregation, presence, and live cursors (docs: docs.velt.dev/integrations/ag-grid). I've just opened a PR adding Velt to your community Tools & Extensions directory (alongside extensions like AdapTable) — flagging it here so it reaches the right person, and happy to adjust anything. We'd also be open to a deeper partnership conversation if useful. Thanks! |

**✅ Done:** [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) opened 2026-06-15 with the JSON entry + a 544×296 `velt.webp` branded card (matching the landscape preview-image convention, e.g. plotly/adaptable). Parallel heads-up via the [contact form](https://www.ag-grid.com/about/) **submitted** 2026-06-15 (message below).

---

## 5. SlateJS — ✅ DONE (PR #6067 merged 2026-06-13)

**No action needed.** PR [#6067](https://github.com/ianstormtaylor/slate/pull/6067) was merged by Dylan Schiemann on 2026-06-13 — Velt is now listed on the [Slate Resources page](https://docs.slatejs.org/general/resources) under Extensions and Plugins. No Slack nudge required; no need to join the Slate Slack workspace.

---

## 6. Ace — PR to `ajaxorg/ace` homepage

**Channel:** GitHub PR. `index.html` "Related Projects" list — collaboration precedent already there (ace-collab-ext).

**The diff** — insert after the ace-collab-ext `<li>` (matching 32-space indent and label style):

```html
                                <li><a href="https://docs.velt.dev/async-collaboration/comments/setup/ace">Velt collaboration SDK for Ace (comments, presence, cursors)</a></li>
```

**PR title:** `Add Velt collaboration SDK to Related Projects`

**PR body:**

> Adds Velt to the Related Projects list on the homepage, next to the existing Ace collaboration extension.
>
> Velt is a collaboration SDK with a dedicated Ace integration — threaded comments anchored to code, presence, and live cursors:
> - Integration docs: https://docs.velt.dev/async-collaboration/comments/setup/ace
> - Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ace/ace-comments-demo
>
> Matches the existing list format; happy to shorten the label if preferred.

---

## 7. PlateJS — Discord first, then PR to `udecode/plate`

**Channel:** Discord ([discord.gg/mAZRuBzGM3](https://discord.gg/mAZRuBzGM3)) to socialize, then PR to `content/docs/(plugins)/(collaboration)/yjs.mdx`. Two light-touch insertion points verified: the "Custom Provider" subsection (Velt as a hosted backend implementing `UnifiedProvider`) and the "## Related" list.

**Discord message (#contributing or #general):**

> Hey Plate team 👋 — Yoen from Velt here. We're a collaboration SDK with a managed Yjs backend, and we have a working Plate integration (docs: https://docs.velt.dev/async-collaboration/comments/setup/plate, demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/crdt/text-editors/platejs/platejs-crdt-demo).
>
> Your Yjs doc's Provider Types section covers Hocuspocus, WebRTC, and custom providers via `UnifiedProvider` — would you be open to a small docs PR mentioning Velt as a hosted option there (and/or a line in Related)? We'd be the first managed backend listed; happy to match whatever format you want. For reference we're listed on React Flow's multiplayer guide alongside Yjs/Liveblocks/Supabase.

**PR draft (if green-lit)** — `## Related` list, matching `- [Name](url) - description` format:

```markdown
- [Velt](https://velt.dev) - Managed Yjs backend (hosted provider via UnifiedProvider)
```

Plus one sentence at the end of the **Custom Provider** subsection:

```markdown
Hosted backends like [Velt](https://docs.velt.dev/realtime-collaboration/crdt/overview) implement `UnifiedProvider` to provide managed sync, persistence, and offline support without running your own server.
```

**PR title:** `docs(yjs): mention Velt as a hosted provider option`

---

## 8. Highcharts — email to Highsoft

**Channel:** Email — **hello@highsoft.com** (decoded from the contact page; verify on-page before sending). The "Community Resources" section on highcharts.com/integrations has no self-serve intake, so this is a pure pitch. Note: no live Velt+Highcharts demo yet — lead with docs + library page, offer to build one.

**To:** hello@highsoft.com
**Subject:** Listing Velt under Community Resources on highcharts.com/integrations

> Hi Highsoft team,
>
> I'm Yoen from Velt (velt.dev). We build a collaboration SDK that adds commenting and presence to charting libraries — including a dedicated Highcharts integration that lets users pin threaded comments directly onto data points and chart regions:
>
> - Integration docs: https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts
> - Library page: https://velt.dev/libraries/highcharts
>
> Would you consider adding Velt to the "Community Resources" section of highcharts.com/integrations? We noticed the section lists ecosystem projects built around Highcharts, and chart-level collaboration feels like a natural addition for your dashboard-building customers.
>
> For reference, we're listed on React Flow's multiplayer guide ("Third Party Libraries and Services," alongside Yjs, Liveblocks, and Supabase). Happy to provide a logo, a one-line description in your format, or a live demo if that helps the evaluation.
>
> Best,
> Yoen Zhang — Velt
> yoen@velt.dev

---

## 9. Vue — email to Evan You

**Channel:** Email — **evan@vuejs.org** (the published contact for vuejs.org ecosystem placements; the themes page CTA emails him directly). May be a paid placement — signal openness without committing.

**To:** evan@vuejs.org
**Subject:** Ecosystem placement inquiry — Velt collaboration SDK for Vue

> Hi Evan,
>
> I'm Yoen from Velt (velt.dev) — a collaboration SDK (comments, presence, live cursors, realtime sync) with first-class Vue support. We maintain working Vue demos, e.g. collaborative commenting on AG Grid tables in Vue: https://github.com/velt-js/sample-apps/tree/main/apps/vue/comments/tables/ag-grid
>
> I saw vuejs.org features ecosystem placements (the themes page, partner listings) and wanted to ask: is there a path for a developer-tool SDK like ours to be listed — whether in an existing section or as a sponsored placement? We're happy to discuss terms if it's a paid slot.
>
> For context, we're listed on React Flow's multiplayer guide alongside Yjs, Liveblocks, and Supabase, and we're in the Yjs ecosystem as a connection provider.
>
> Thanks for everything you do for Vue!
> Yoen Zhang — Velt
> yoen@velt.dev

---

## 10. xyflow — showcase submission via the proven channel

**Channel:** [xyflow.com/contact](https://xyflow.com/contact) (fields: Your Email, Your message) or info@xyflow.com — the channel that won the original listing. One ask: submit our React Flow demo to the showcase.

**Form values:**

| Field | Value |
|---|---|
| Your Email | yoen@velt.dev |
| Your message | (below) |

> Hi xyflow team!
>
> Yoen from Velt here — thank you again for including us in the React Flow multiplayer guide's third-party table; it's been a genuinely great channel for us.
>
> A quick follow-up: we'd love to submit our collaborative React Flow demo for the showcase — a live multiplayer canvas with comments, presence, and cursors built on our dedicated React Flow library: https://velt-reactflow-crdt-demo.vercel.app/ (source: https://github.com/velt-js/velt-reactflow-crdt-demo, docs: https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow).
>
> Cheers,
> Yoen — Velt

---

## Send-order checklist

| # | Target | Action | Blocker |
|---|--------|--------|---------|
| 1 | Yjs | ✅ Done — [PR #81](https://github.com/yjs/docs/pull/81) open + @dmonad ping | awaiting review |
| 2 | BlockNote | ✅ Email sent 2026-06-15 | awaiting reply (PR offer to follow) |
| 3 | SlateJS | ✅ Done — PR #6067 merged 2026-06-13 | none — no Slack needed |
| 4 | Ace | ✅ Done — [PR #5981](https://github.com/ajaxorg/ace/pull/5981) open | awaiting review |
| 5 | AG Grid | ✅ Done — [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) open + contact form submitted | awaiting review |
| 6 | xyflow | ✅ Showcase form submitted 2026-06-15 | awaiting reply |
| 7 | PlateJS | ✅ Discord message sent | PR to follow on reply |
| 8 | Highcharts | ✅ Email sent 2026-06-15 | awaiting reply |
| 9 | Vue | ✅ Email sent 2026-06-15 | awaiting reply |
| 10 | Vercel | Submit marketplace form | form is multi-step; expect integration-build follow-up |
