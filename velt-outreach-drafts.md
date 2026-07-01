# Velt -- Outreach Drafts For Actionable Targets

Ready-to-send messages, form submissions, and PR snippets for the targets in `velt-listing-plan.md`. Venue paths, Velt asset URLs, sample metadata, docs pages, and PR states were verified on 2026-06-30. User-submitted form states were recorded on 2026-07-01. Sender: yoen@velt.dev.

Do not submit PRs, forms, or emails from this file unless a later goal explicitly asks for that action.

**Verified Velt assets used in these drafts:**

- Demo hub: [samples.velt.dev](https://samples.velt.dev/)
- Yjs: [library page](https://velt.dev/libraries/yjs); [CRDT docs](https://docs.velt.dev/realtime-collaboration/crdt/overview); [live demo](https://velt-general-crdt-demo.vercel.app/); npm `@veltdev/crdt`
- BlockNote: [library page](https://velt.dev/libraries/blocknote); [docs](https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote); [live demo](https://velt-blocknote-crdt-demo.vercel.app/)
- Ace: [docs](https://docs.velt.dev/async-collaboration/comments/setup/ace); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ace/ace-comments-demo)
- AG Grid: [integration docs](https://docs.velt.dev/integrations/ag-grid); [React demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/tables/ag-grid/comment-aggregation); [Vue demo source](https://github.com/velt-js/sample-apps/tree/main/apps/vue/comments/tables/ag-grid)
- Chart.js: [live demo](https://sample-apps-chartjs-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/chartjs/chartjs-comments-demo)
- Lottie: [live demo](https://sample-apps-lottie-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/video-player/lottie/lottie-comments-demo)
- Highcharts: [live demo](https://sample-apps-highcharts-comments-dem.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/highcharts/highcharts-comments-demo)
- Apryse: [live demo](https://sample-apps-apryse-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/apryse); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/apryse/apryse-comments-demo)
- Nutrient: [live demo](https://sample-apps-nutrient-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/nutrient); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/nutrient/nutrient-comments-demo)
- SpreadJS: [live demo](https://sample-apps-spreadjs-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/spreadjs); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo)
- TinyMCE: [live demo](https://sample-apps-tinymce-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/tinymce); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/tinymce/tinymce-comments-demo)
- CKEditor: [live demo](https://sample-apps-ckeditor-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/ckeditor); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo)
- SuperDoc: [live demo](https://sample-apps-superdoc-comments-demo.vercel.app); [docs](https://docs.velt.dev/async-collaboration/comments/setup/superdoc); [demo source](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/superdoc/superdoc-comments-demo)

---

## 1. Yjs -- PR #81 Follow-Up Context

**Channel:** GitHub PR, already open: [yjs/docs#81](https://github.com/yjs/docs/pull/81)

**Status:** Open as of 2026-06-30.

**PR title:** `Add Velt to Connection Providers`

**PR body already used:**

> Adds Velt to the Connection Provider list, matching the existing external entries (y-sweet, Liveblocks, SuperViz, Hocuspocus).
>
> Velt is a managed Yjs backend with realtime WebSocket sync, persistent storage, offline support with automatic reconnection, and version history. It is already listed in the yjs/yjs README under Providers as Velt YJs; this PR mirrors that entry onto the docs site.
>
> Docs: https://docs.velt.dev/realtime-collaboration/crdt/overview
> Live demo: https://velt-general-crdt-demo.vercel.app/

**Diff snippet:**

```markdown
  * [Velt](https://velt.dev/libraries/yjs)
```

---

## 2. BlockNote -- Email Follow-Up / PR Offer

**Channel:** Email to `team@blocknotejs.org`

**Status:** Email sent 2026-06-15; awaiting reply.

**Subject:** `Adding Velt to the Yjs Providers list in your collaboration docs?`

```text
Hi BlockNote team,

I'm Yoen from Velt (velt.dev). We build a collaboration SDK with comments, presence, cursors, and a managed Yjs backend. Velt slots into BlockNote's existing Yjs-based collaboration, and we maintain a dedicated BlockNote integration.

- Integration docs: https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote
- Live demo: https://velt-blocknote-crdt-demo.vercel.app/
- Library page: https://velt.dev/libraries/blocknote

Could Velt be listed in the Yjs Providers section of your collaboration docs alongside Liveblocks, PartyKit, and Y-Sweet? Happy to open the PR with whatever wording you prefer.

Thanks,
Yoen -- Velt
```

---

## 3. Ace -- PR #5981 Context

**Channel:** GitHub PR, already open: [ajaxorg/ace#5981](https://github.com/ajaxorg/ace/pull/5981)

**Status:** Open as of 2026-06-30.

**PR title:** `Add Velt collaboration SDK to Related Projects`

```html
<li><a href="https://docs.velt.dev/async-collaboration/comments/setup/ace">Velt collaboration SDK for Ace (comments, presence, cursors)</a></li>
```

---

## 4. AG Grid -- PR #14075 Context

**Channel:** GitHub PR, already open: [ag-grid/ag-grid#14075](https://github.com/ag-grid/ag-grid/pull/14075)

**Status:** Open as of 2026-06-30.

**PR title:** `docs(community): add Velt to Tools & Extensions`

**PR body summary:**

```text
Adds Velt to the community Tools & Extensions directory as an Extension. Velt adds cell-level commenting with aggregation, presence, and live cursors on top of AG Grid.

- Integration docs: https://docs.velt.dev/integrations/ag-grid
- React demo: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/tables/ag-grid/comment-aggregation
- Vue demo: https://github.com/velt-js/sample-apps/tree/main/apps/vue/comments/tables/ag-grid
```

---

## 5. Chart.js -- GitHub PR To `chartjs/awesome`

**Channel:** GitHub PR to [chartjs/awesome](https://github.com/chartjs/awesome)

**Submission note:** Re-check `CONTRIBUTING.md` immediately before submit. The current path should use a GitHub source URL, the live demo, and the docs URL.

**PR title:** `Add Velt Chart.js comments demo`

**Candidate entry:**

```markdown
- [Velt Chart.js Comments](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/chartjs/chartjs-comments-demo) - Collaborative comments, presence, and review workflows for Chart.js dashboards.
```

**PR body:**

```text
Adds Velt to the Chart.js ecosystem list as a collaboration/comments integration.

Velt adds collaborative comments to Chart.js dashboards so users can place threaded discussions on chart data and review context directly in the visualization.

- Live demo: https://sample-apps-chartjs-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/chartjs/chartjs-comments-demo
- Integration docs: https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs

I checked CONTRIBUTING before opening this PR and matched the list ordering/format.
```

---

## 6. LottieFiles -- Integration Listing Form

**Channel:** [lottiefiles.com/integrations](https://lottiefiles.com/integrations) "list your integration" prompt; fallback `support@lottiefiles.com`.

**Status:** Submitted 2026-07-01; awaiting reply.

**Subject / title:** `List Velt as a Lottie collaboration integration`

**Suggested form values:**

| Field | Value |
|---|---|
| Company / product | Velt |
| Website | https://velt.dev |
| Integration URL | https://sample-apps-lottie-comments-demo.vercel.app |
| Docs URL | https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup |

**Pitch:**

```text
Velt is a collaboration SDK that adds comments, presence, and review workflows to web apps. Our Lottie integration lets reviewers comment on animated media timelines and keep feedback anchored to the playback state.

Live demo: https://sample-apps-lottie-comments-demo.vercel.app
Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/video-player/lottie/lottie-comments-demo
Docs: https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup
```

---

## 7. Highcharts -- Follow-Up With Live Demo

**Channel:** Highsoft contact route: [highcharts.com/about-us/contact](https://www.highcharts.com/about-us/contact/)

**Status:** Email sent 2026-06-15. This is the updated follow-up now that the demo exists.

**Subject:** `Following up: Velt comments integration for Highcharts`

```text
Hi Highsoft team,

Following up with a working demo for the Velt + Highcharts comments integration:

- Live demo: https://sample-apps-highcharts-comments-dem.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/highcharts/highcharts-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts

Velt lets teams pin threaded comments directly to chart context, which fits dashboard review and analytics workflows. Would Highsoft consider listing Velt in the Community Resources section of highcharts.com/integrations? Happy to provide a logo and one-line entry.

Best,
Yoen -- Velt
```

---

## 8. Apryse -- Partner / Integration Pitch

**Channel:** [Apryse contact sales](https://apryse.com/contact-sales)

**Subject:** `Velt collaboration comments integration for Apryse WebViewer`

```text
Hi Apryse team,

I'm Yoen from Velt. We maintain a Velt comments integration for Apryse WebViewer that adds collaborative threaded comments and review workflows around documents in a React/Next.js app.

- Live demo: https://sample-apps-apryse-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/apryse/apryse-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/apryse

Is there a partner, integrations, or customer-story route where this could be listed for Apryse developers? Happy to adapt the copy or build a joint example if useful.

Best,
Yoen -- Velt
```

---

## 9. Nutrient -- Partner / Integration Pitch

**Channel:** [Nutrient contact](https://www.nutrient.io/contact/)

**Status:** Submitted 2026-07-01; awaiting reply.

**Subject:** `Velt collaboration comments integration for Nutrient`

```text
Hi Nutrient team,

I'm Yoen from Velt. We maintain a Velt comments integration for Nutrient that adds collaborative threaded comments and review workflows to document experiences.

- Live demo: https://sample-apps-nutrient-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/nutrient/nutrient-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/nutrient

Is there an integrations, partner, or customer-story path where this could be listed for Nutrient developers? Happy to provide copy, screenshots, or a joint sample.

Best,
Yoen -- Velt
```

---

## 10. SpreadJS -- Partner / Integration Pitch

**Channel:** [MESCIUS contact](https://developer.mescius.com/contact)

**Status:** Submitted 2026-07-01; awaiting reply.

**Subject:** `Velt comments integration for SpreadJS spreadsheets`

```text
Hi MESCIUS team,

I'm Yoen from Velt. We built a Velt comments integration for SpreadJS so teams can add collaborative threaded comments to spreadsheet experiences.

- Live demo: https://sample-apps-spreadjs-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/spreadjs

Is there a partner/integrations route where this could be listed or reviewed? Happy to share a licensed/evaluation setup if needed for validation.

Best,
Yoen -- Velt
```

---

## 11. TinyMCE -- Integration Content Pitch

**Channel:** [Tiny Cloud contact](https://www.tiny.cloud/contact/)

**Status:** Submitted 2026-07-01; awaiting reply.

**Subject:** `Velt collaborative comments integration for TinyMCE`

```text
Hi TinyMCE team,

I'm Yoen from Velt. We maintain a Velt comments integration for TinyMCE that lets users add threaded comments to selected text in TinyMCE editors.

- Live demo: https://sample-apps-tinymce-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/tinymce/tinymce-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/tinymce

Would you consider listing or referencing this as a third-party integration for TinyMCE users? Happy to draft the entry or adapt to your docs format.

Best,
Yoen -- Velt
```

---

## 12. CKEditor -- Integration Content Pitch

**Channel:** [CKEditor contact](https://ckeditor.com/contact/)

**Status:** Submitted 2026-07-01; awaiting reply.

**Subject:** `Velt collaborative comments integration for CKEditor`

```text
Hi CKEditor team,

I'm Yoen from Velt. We maintain a Velt comments integration for CKEditor that adds collaborative threaded comments to selected editor text.

- Live demo: https://sample-apps-ckeditor-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/ckeditor

Is there a recommended third-party integration or plugin listing path for CKEditor ecosystem tools? Happy to provide copy, screenshots, or a docs PR if that is the preferred route.

Best,
Yoen -- Velt
```

---

## 13. SuperDoc -- Maintainer Issue / PR Ask

**Channel:** [SuperDoc docs](https://docs.superdoc.dev/) / maintainer issue route.

**Subject:** `Add Velt as a SuperDoc comments integration`

```text
Hi SuperDoc team,

Velt maintains a SuperDoc comments integration that adds collaborative threaded comments and review workflows around SuperDoc documents.

- Live demo: https://sample-apps-superdoc-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/superdoc/superdoc-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/superdoc

Would you be open to a short integrations/docs note for Velt? Happy to open a PR or issue with your preferred wording.

Best,
Yoen -- Velt
```

---

## 14. Vercel -- Marketplace Program Form

**Channel:** [vercel.com/marketplace/program](https://vercel.com/marketplace/program)

**Blocker:** multi-step form; expect an integration-build follow-up.

| Field | Value |
|---|---|
| Company name | Velt |
| Contact name | Yoen Zhang |
| Email address | yoen@velt.dev |
| Company website | https://velt.dev |

**Pitch blurb:**

```text
Velt is a collaboration SDK for product teams: comments, presence, live cursors, huddles, recording, and a managed Yjs/CRDT backend, added to a React/Next.js app in a few lines. We would list in DevTools, where Liveblocks sits today, as a connectable account. Most of our demos are Next.js apps deployed on Vercel (hub: https://samples.velt.dev/). We are ready to build the OAuth/token-exchange integration per your marketplace spec.
```

---

## Send-Order Checklist

| # | Target | Action | Blocker |
|---|---|---|---|
| 1 | Yjs | Already open: [PR #81](https://github.com/yjs/docs/pull/81) | Awaiting review |
| 2 | BlockNote | Already emailed | Awaiting reply |
| 3 | Ace | Already open: [PR #5981](https://github.com/ajaxorg/ace/pull/5981) | Awaiting review |
| 4 | AG Grid | Already open: [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) | Awaiting review |
| 5 | Chart.js | Open PR to `chartjs/awesome` | Re-check CONTRIBUTING |
| 6 | LottieFiles | Submitted 2026-07-01 | Awaiting reply |
| 7 | Highcharts | Send live-demo follow-up | Awaiting response |
| 8 | Apryse | Send partner/contact pitch | BD route |
| 9 | Nutrient | Submitted 2026-07-01 | Awaiting reply |
| 10 | SpreadJS | Submitted 2026-07-01 | Awaiting reply; demo may require eval key |
| 11 | TinyMCE | Submitted 2026-07-01 | Awaiting reply |
| 12 | CKEditor | Submitted 2026-07-01 | Awaiting reply |
| 13 | SuperDoc | Ask maintainers for docs/listing path | Maintainer-led |
| 14 | Vercel | Submit marketplace program form | Multi-step, integration build likely |

No drafts are maintained for DraftJS, Monaco, ProseMirror, or Nivo because current research did not find an actionable official venue.
