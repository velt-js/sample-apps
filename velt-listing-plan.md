# Velt -- Library Listing & Distribution Plan

Goal: get Velt featured/listed on the official sites, GitHub repos, "awesome" lists, partner directories, and template marketplaces of the libraries we integrate with, so developers in those ecosystems discover Velt as the collaboration layer.

- **Scope:** every documented Velt integration and sample app across editors, CRDT, canvas, tables, charts, media, databases, frameworks, viewers, and spreadsheets.
- **Venue order:** official docs/listing venue first, GitHub PR or form fallback, then outreach draft/contact details. Community forums and Discord are tracked only when they are a necessary maintainer preflight.
- **Verified:** sample metadata, docs pages, official venues, and submitted PR states checked on 2026-06-30. User-submitted form states recorded on 2026-07-01.
- **Important:** this plan prepares outreach only. No additional PRs, forms, or emails should be submitted unless a later goal explicitly asks for that.

**Legend** -- **Demo?** = working sample app in `apps/master-sample-app/samples/*/metadata.ts`; **Docs?** = dedicated Velt docs page in `/Users/yoenzhang/Downloads/docs`; **Status:** Listed / PR open / To do / Outreach / BD / Paid / Gated / Low odds / No venue.

---

## Submitted PRs

Statuses re-checked live with GitHub CLI on 2026-06-30: **4 merged, 7 open, 1 closed unmerged**.

| Library | Repo | Section | PR | Status |
|---|---|---|---|---|
| Vercel Chat SDK | `vercel/chat` | Adapters docs -- vendor-official adapter | [#572](https://github.com/vercel/chat/pull/572) | Merged 2026-06-02 |
| BlockNote | `defensestation/awesome-blocknote` | Tools -> Plugins | [#5](https://github.com/defensestation/awesome-blocknote/pull/5) | Merged 2026-06-07 |
| SlateJS | `ianstormtaylor/slate` | Extensions and Plugins | [#6067](https://github.com/ianstormtaylor/slate/pull/6067) | Merged 2026-06-13 |
| Vercel Chat SDK follow-up | `vercel/chat` | Adapters docs -- sharper description + demo | [#578](https://github.com/vercel/chat/pull/578) | Merged 2026-06-18 |
| Yjs | `yjs/docs` | Ecosystem -> Connection Provider | [#81](https://github.com/yjs/docs/pull/81) | Open |
| Ace | `ajaxorg/ace` | Homepage -> Related Projects | [#5981](https://github.com/ajaxorg/ace/pull/5981) | Open |
| AG Grid | `ag-grid/ag-grid` | Community -> Tools & Extensions | [#14075](https://github.com/ag-grid/ag-grid/pull/14075) | Open |
| Quill | `quilljs/awesome-quill` | Other | [#63](https://github.com/quilljs/awesome-quill/pull/63) | Open |
| CodeMirror | `tmcw/awesome-codemirror` | Plugins | [#1](https://github.com/tmcw/awesome-codemirror/pull/1) | Open |
| Velt SDK realtime | `jacktuck/awesome-realtime` | Websockets -> Hosted | [#2](https://github.com/jacktuck/awesome-realtime/pull/2) | Open |
| CRDT | `alangibson/awesome-crdt` | Implementations -> Data Structures | [#14](https://github.com/alangibson/awesome-crdt/pull/14) | Open; repo dormant |
| MongoDB | `ramnes/awesome-mongodb` | Applications | [#155](https://github.com/ramnes/awesome-mongodb/pull/155) | Closed unmerged 2026-06-17 |

---

## 1. Per-Library Listings

**The play:** get Velt listed on each library's official documentation/site first, the way Velt is already listed on React Flow's [multiplayer guide](https://reactflow.dev/learn/advanced-use/multiplayer). GitHub awesome-lists, form submissions, and direct partner/content pitches are fallbacks.

| # | Library | Demo? | Docs? | Official venue | Submission path | Status |
|---|---|:---:|:---:|---|---|---|
| 1 | React Flow | Yes | Yes | [Multiplayer guide](https://reactflow.dev/learn/advanced-use/multiplayer) -- Third Party Libraries and Services | Won via xyflow contact; model case | Listed |
| 2 | Yjs | Yes | Yes | [docs.yjs.dev Connection Provider](https://docs.yjs.dev/ecosystem/connection-provider) | [PR #81](https://github.com/yjs/docs/pull/81) + @dmonad ping | PR open |
| 3 | BlockNote | Yes | Yes | [Collaboration docs](https://www.blocknotejs.org/docs/features/collaboration) -- Yjs Providers | Email sent to team@blocknotejs.org; PR offer next | Outreach |
| 4 | Next.js / Vercel | Yes | Yes | [Vercel Marketplace](https://vercel.com/integrations) -- DevTools | [Marketplace program form](https://vercel.com/marketplace/program) | To do |
| 5 | AG Grid | Yes | Yes | [Tools & Extensions](https://www.ag-grid.com/community/tools-extensions/) | [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) | PR open |
| 6 | SlateJS | Yes | Yes | [Resources](https://docs.slatejs.org/general/resources) -- Extensions and Plugins | [PR #6067](https://github.com/ianstormtaylor/slate/pull/6067) merged | Listed |
| 7 | Ace | Yes | Yes | [ace.c9.io](https://ace.c9.io/) -- Related Projects | [PR #5981](https://github.com/ajaxorg/ace/pull/5981) | PR open |
| 8 | PlateJS | Yes | Yes | [Yjs docs](https://platejs.org/docs/yjs) -- Provider Types | Discord sent; PR if maintainers approve | Outreach |
| 9 | Chart.js | Yes | Yes | [chartjs/awesome](https://github.com/chartjs/awesome) -- Plugins / Tools | PR to `README.md`; use live demo, docs, and sample-app source | To do |
| 10 | LottieFiles / Lottie | Yes | Yes | [LottieFiles integrations](https://lottiefiles.com/integrations) | Integration listing form submitted 2026-07-01; awaiting reply | Outreach |
| 11 | Highcharts | Yes | Yes | [Integrations](https://www.highcharts.com/integrations) -- Community Resources | Follow up with Highsoft using live demo link | Outreach |
| 12 | Vue | Yes | Yes | [vuejs.org ecosystem placement model](https://vuejs.org/ecosystem/themes.html) | Email sent to evan@vuejs.org; awaiting reply | Outreach |
| 13 | MongoDB | Yes | Yes | [Partner ecosystem catalog](https://cloud.mongodb.com/ecosystem/) | [Technology Partner form](https://www.mongodb.com/partners) | BD |
| 14 | TanStack Table | Yes | No | [Partners wall](https://tanstack.com/partners) | partners@tanstack.com; paid/sponsored path | Paid |
| 15 | Apryse | Yes | Yes | [Apryse contact sales](https://apryse.com/contact-sales) | Partner/integration pitch; no public directory found | BD |
| 16 | Nutrient | Yes | Yes | [Nutrient contact](https://www.nutrient.io/contact/) | Contact form submitted 2026-07-01; awaiting reply | BD |
| 17 | SpreadJS | Yes | Yes | [MESCIUS contact](https://developer.mescius.com/contact) | MESCIUS contact form submitted 2026-07-01; awaiting reply | BD |
| 18 | TinyMCE | Yes | Yes | [TinyMCE integrations docs](https://www.tiny.cloud/docs/tinymce/latest/integrations/) | Tiny Cloud contact form submitted 2026-07-01; awaiting reply | Outreach |
| 19 | CKEditor | Yes | Yes | [CKEditor integrations docs](https://ckeditor.com/docs/ckeditor5/latest/getting-started/integrations/overview.html) | CKEditor contact form submitted 2026-07-01; awaiting reply | Outreach |
| 20 | SuperDoc | Yes | Yes | [SuperDoc docs](https://docs.superdoc.dev/) | Maintainer issue/contact route | Outreach |
| 21 | CodeMirror | Yes | Yes | [Community packages](https://codemirror.net/docs/community/) | Forum + code.haverbeke.berlin; needs OSS binding package | Gated |
| 22 | Lexical | Yes | Yes | [Collaboration guide](https://lexical.dev/docs/collaboration/react) | Meta CLA docs PR; low odds | Low odds |
| 23 | Monaco | Yes | Yes | None found | No official ecosystem/resources page; skip | No venue |
| 24 | ProseMirror | Yes | Yes | None found | Official site has docs/examples/reference, no listing directory; skip | No venue |
| 25 | DraftJS | Yes | Yes | None found | No maintained official resources/listing page found; skip | No venue |
| 26 | Nivo | Yes | Yes | None found | Demo/docs now live, but no official listing venue found | No venue |
| 27 | PostgreSQL | Yes | No | [Software Catalogue](https://www.postgresql.org/download/product-categories/) | Self-serve form, weak category fit | Low odds |
| 28 | TipTap | Yes | Yes | None | Already on awesome-tiptap; official product competes | No venue |
| 29 | Quill | Yes | Yes | None | Fallback is [awesome-quill PR #63](https://github.com/quilljs/awesome-quill/pull/63) | No venue |
| 30 | React | Yes | Yes | None | react.dev is vendor-neutral | No venue |
| 31 | Angular | No | Yes | None | Community-resources idea rejected in angular/angular #58622 | No venue |

**New sample/docs inventory confirmed on 2026-06-30:** Apryse, CKEditor, DraftJS, Monaco, Nutrient, ProseMirror, SpreadJS, SuperDoc, TinyMCE, Chart.js, Highcharts, Lottie, and Nivo all have sample metadata entries and matching docs pages. Therefore no stale `hasDemo: false` remains for those integrations.

---

## 2. Contact And Playbook

Per-library contact channels, ranked as: contact form / partner email -> docs-repo PR -> maintainer issue/forum only when required.

| Library | Primary contact | PR/docs path | Owner / notes |
|---|---|---|---|
| Yjs | [PR #81](https://github.com/yjs/docs/pull/81) + @dmonad ping | `yjs/docs` -> `SUMMARY.md` | Kevin Jahns / community |
| BlockNote | team@blocknotejs.org | `TypeCellOS/BlockNote` collaboration docs | TypeCellOS |
| Vercel | [Marketplace program form](https://vercel.com/marketplace/program) | Gated marketplace integration build | Vercel |
| AG Grid | [PR #14075](https://github.com/ag-grid/ag-grid/pull/14075) + contact form | `tools-extensions.json` | AG Grid Ltd |
| Ace | [PR #5981](https://github.com/ajaxorg/ace/pull/5981) | `index.html` Related Projects | ajaxorg/community |
| Chart.js | [chartjs/awesome](https://github.com/chartjs/awesome) PR | `README.md` | Check CONTRIBUTING at submit time |
| LottieFiles | Integration listing form submitted 2026-07-01 | No repo path | Design Barn Inc.; awaiting reply |
| Highcharts | [Highcharts contact](https://www.highcharts.com/about-us/contact/) | Website not open-source | Highsoft AS |
| Apryse | [Apryse contact sales](https://apryse.com/contact-sales) | No public listing repo found | BD/content pitch |
| Nutrient | Contact form submitted 2026-07-01 | No public listing repo found | BD/content pitch; awaiting reply |
| SpreadJS | MESCIUS contact form submitted 2026-07-01 | No public listing repo found | BD/content pitch; awaiting reply |
| TinyMCE | Tiny Cloud contact form submitted 2026-07-01 | No self-serve marketplace found | Content/integration pitch; awaiting reply |
| CKEditor | CKEditor contact form submitted 2026-07-01 | No self-serve marketplace found | Content/integration pitch; awaiting reply |
| SuperDoc | [SuperDoc docs](https://docs.superdoc.dev/) | Maintainer issue/contact route | Small ecosystem; ask before PR |
| Vue | evan@vuejs.org | Curated ecosystem pages | Paid/curated likely |
| MongoDB | [Become a Partner](https://www.mongodb.com/partners) | Program-fed docs | Technology partner route |
| TanStack | partners@tanstack.com | Partner wall not PR-able | Paid/sponsored |
| CodeMirror | [discuss.codemirror.net](https://discuss.codemirror.net) | code.haverbeke.berlin website repo | OSS package gate |
| Lexical | Docs PR with Meta CLA | `facebook/lexical` docs | Low odds |

**No-venue rows:** DraftJS, Monaco, ProseMirror, Nivo, React, Angular, Quill on-site, TipTap on-site, PostgreSQL. Do not spend outreach there unless a new official listing route appears.

---

## 3. Ready Drafts

Ready-to-use copy lives in `velt-outreach-drafts.md` and is mirrored into `outreach/data/outreach.ts` for the dashboard. Drafts exist only for actionable targets:

- Existing in-flight/warm targets: Yjs, BlockNote, Ace, AG Grid, Vercel.
- Newly unblocked self-serve targets: Chart.js still open; LottieFiles form submitted 2026-07-01.
- Existing stale-status refresh: Highcharts follow-up with live demo.
- Commercial/editor partner-content targets: Apryse and SuperDoc still open; Nutrient, SpreadJS, TinyMCE, and CKEditor forms submitted 2026-07-01.

No drafts are maintained for DraftJS, Monaco, ProseMirror, or Nivo because the current research did not identify an actionable official venue.

---

## 4. Wave Ordering

1. **Warm natural slots -- free, do now:** Yjs docs PR, BlockNote email/PR offer, Slate listed, Ace PR, AG Grid PR, Chart.js PR, LottieFiles form submitted 2026-07-01.
2. **Forms and BD outreach:** Vercel Marketplace, xyflow follow-ups, Highcharts follow-up, Vue follow-up, MongoDB partner form, Apryse pitch, submitted Nutrient/SpreadJS/TinyMCE/CKEditor forms, SuperDoc maintainer issue.
3. **Build-first / gated:** CodeMirror OSS binding, PlateJS maintainer approval, TanStack paid sponsorship, Lexical only if Yjs/docs precedent improves odds.
4. **Skip:** DraftJS, Monaco, ProseMirror, Nivo, React, Angular, Quill on-site, TipTap on-site, PostgreSQL.

---

## 5. Cross-Cutting Platforms

These take one strong sample app and expose Velt to a broad, multi-framework audience.

| Platform | Type | Submit via | Requirements / notes | Value |
|---|---|---|---|:---:|
| Vercel Templates | Template marketplace | [Form](https://vercel.com/templates/submit) | Public repo + live demo + Deploy button + `.env.example` | High |
| Cloudflare Templates | Workers/Pages gallery | [GitHub PR](https://github.com/cloudflare/templates) | Naming/meta block + Playwright E2E; gallery needs CF sign-off | High |
| Supabase examples | Examples dir | [GitHub PR](https://github.com/supabase/supabase/tree/master/examples) | Add a Velt + Supabase realtime collaboration example | High |
| StackBlitz starters | Starter gallery | [GitHub PR](https://github.com/stackblitz/starters) | Open an issue first; gallery feature is hand-picked | Medium |
| Replit Templates | Template gallery | In-product publish | Self-serve, instant; featuring is separate | Medium |
| CodeSandbox templates | Templates repo | [GitHub PR](https://github.com/codesandbox/sandbox-templates) | Runtime-focused; weaker fit | Low |
| Best of JS | Project index | [GitHub issue](https://bestofjs.org/projects/project-guidelines) | Indexes the Velt SDK repo, not sample apps | Low |
| madewithreactjs.com | Showcase | [Form](https://madewithreactjs.com/submit) | Free or paid; human-reviewed | Low |

---

## 6. Submission Guardrails

- Re-check every venue's current CONTRIBUTING/contact requirements immediately before submission.
- Use the sample metadata URL as the live demo and the docs repo URL as the source-of-truth docs path.
- For commercial SDKs, avoid cold PRs unless maintainers invite one. Lead with a partner/content pitch.
- Do not submit PRs, send outreach, or fill forms from this plan without an explicit goal asking for that action.
