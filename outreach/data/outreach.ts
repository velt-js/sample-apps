/**
 * Velt outreach / listing plan -- structured data for the review dashboard.
 *
 * Source of truth: /velt-listing-plan.md (repo root). Venue URLs, submitted PRs,
 * sample-app metadata, and docs pages were live-verified 2026-06-30. If the
 * plan doc changes, mirror the change here.
 */

export const VERIFIED_DATE = "June 30, 2026";

export type LibraryStatus =
  | "listed"
  | "pr-open"
  | "todo"
  | "outreach"
  | "bd"
  | "paid"
  | "gated"
  | "low-odds"
  | "no-venue";

export interface Library {
  rank: number;
  name: string;
  hasDemo: boolean;
  hasDocs: boolean;
  venue: { label: string; url: string; section: string } | null;
  path: string;
  status: LibraryStatus;
  topPick?: boolean;
  note?: string;
}

export const STATUS_META: Record<
  LibraryStatus,
  { label: string; tone: "moss" | "cobalt" | "ink" | "plum" | "brass" | "signal" | "faint" }
> = {
  listed: { label: "Listed", tone: "moss" },
  "pr-open": { label: "PR open", tone: "cobalt" },
  todo: { label: "To do", tone: "ink" },
  outreach: { label: "Outreach", tone: "plum" },
  bd: { label: "BD program", tone: "plum" },
  paid: { label: "Paid", tone: "brass" },
  gated: { label: "Gated", tone: "brass" },
  "low-odds": { label: "Low odds", tone: "signal" },
  "no-venue": { label: "No venue", tone: "faint" },
};

export const LIBRARIES: Library[] = [
  {
    rank: 1,
    name: "React Flow",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Multiplayer guide",
      url: "https://reactflow.dev/learn/advanced-use/multiplayer",
      section: "Third Party Libraries and Services",
    },
    path: "Won via xyflow.com/contact -- the team added the entry themselves",
    status: "listed",
    note: "The model case. Velt sits alongside Yjs, Jazz, Liveblocks, Supabase, Convex, Automerge, and Loro.",
  },
  {
    rank: 2,
    name: "Yjs",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "docs.yjs.dev",
      url: "https://docs.yjs.dev/ecosystem/connection-provider",
      section: "Ecosystem -> Connection Provider",
    },
    path: "PR #81 open to yjs/docs SUMMARY.md + @dmonad ping posted",
    status: "pr-open",
    topPick: true,
    note: "Liveblocks, y-sweet, SuperViz, and Hocuspocus are listed there; Velt is also in the yjs/yjs README.",
  },
  {
    rank: 3,
    name: "BlockNote",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Collaboration docs",
      url: "https://www.blocknotejs.org/docs/features/collaboration",
      section: "Yjs Providers",
    },
    path: "Email sent 2026-06-15 to team@blocknotejs.org -- awaiting reply",
    status: "outreach",
    topPick: true,
    note: "Liveblocks, PartyKit, and Y-Sweet are listed. Best SaaS-peer precedent after React Flow.",
  },
  {
    rank: 4,
    name: "Next.js / Vercel",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Vercel Marketplace",
      url: "https://vercel.com/integrations",
      section: "DevTools",
    },
    path: "Marketplace program form (vercel.com/marketplace/program)",
    status: "todo",
    topPick: true,
    note: "Liveblocks is already listed -- direct competitor precedent.",
  },
  {
    rank: 5,
    name: "AG Grid",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Tools & Extensions",
      url: "https://www.ag-grid.com/community/tools-extensions/",
      section: "Type: Extension",
    },
    path: "PR #14075 open (JSON entry + velt.webp) to ag-grid/ag-grid",
    status: "pr-open",
    topPick: true,
    note: "Commercial, closed-source AdapTable already listed -- clean precedent.",
  },
  {
    rank: 6,
    name: "SlateJS",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Resources",
      url: "https://docs.slatejs.org/general/resources",
      section: "Extensions and Plugins",
    },
    path: "PR #6067 merged 2026-06-13 -- Velt now listed",
    status: "listed",
    note: "@liveblocks/yjs was already listed; Velt added via merged PR #6067.",
  },
  {
    rank: 7,
    name: "Ace",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "ace.c9.io",
      url: "https://ace.c9.io/",
      section: "Related Projects",
    },
    path: "PR #5981 open to ajaxorg/ace index.html",
    status: "pr-open",
    note: "A collaboration extension is already listed; PR #5981 adds Velt next to it.",
  },
  {
    rank: 8,
    name: "PlateJS",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Yjs doc",
      url: "https://platejs.org/docs/yjs",
      section: "Provider Types",
    },
    path: "Discord message sent -- PR to udecode/plate next if maintainers are receptive",
    status: "outreach",
    note: "No hosted SaaS listed yet. Velt would be first.",
  },
  {
    rank: 9,
    name: "Chart.js",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "chartjs/awesome",
      url: "https://github.com/chartjs/awesome",
      section: "Plugins / Tools",
    },
    path: "PR to README.md; use the sample-apps GitHub path + live demo + docs",
    status: "todo",
    topPick: true,
    note: "Previously blocked by no demo. Now actionable; re-check CONTRIBUTING at submit time.",
  },
  {
    rank: 10,
    name: "LottieFiles / Lottie",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Integrations",
      url: "https://lottiefiles.com/integrations",
      section: "List your integrations prompt",
    },
    path: "Integration listing form submitted 2026-07-01 -- awaiting reply",
    status: "outreach",
    topPick: true,
    note: "Previously blocked by no artifact. Form is now submitted; use support fallback only if no response.",
  },
  {
    rank: 11,
    name: "Highcharts",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Integrations",
      url: "https://www.highcharts.com/integrations",
      section: "Community Resources",
    },
    path: "Email sent 2026-06-15 to Highsoft; follow up with live demo link",
    status: "outreach",
    note: "No submission process exists; website is not PR-able.",
  },
  {
    rank: 12,
    name: "Vue",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Ecosystem placement",
      url: "https://vuejs.org/ecosystem/themes.html",
      section: "Themes-page placement model",
    },
    path: "Email sent 2026-06-15 to evan@vuejs.org -- awaiting reply",
    status: "outreach",
    note: "vuejs.org demonstrably sells ecosystem placements.",
  },
  {
    rank: 13,
    name: "MongoDB",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Partner ecosystem catalog",
      url: "https://cloud.mongodb.com/ecosystem/",
      section: "Technology Partner directory + Atlas partner-integrations docs",
    },
    path: "Technology Partner form (mongodb.com/partners)",
    status: "bd",
    note: "Formal BD program. The awesome-list PR was closed unmerged; use partner route if pursuing.",
  },
  {
    rank: 14,
    name: "TanStack Table",
    hasDemo: true,
    hasDocs: false,
    venue: {
      label: "Partners wall",
      url: "https://tanstack.com/partners",
      section: "Paid tiers + free showcase",
    },
    path: "partners@tanstack.com",
    status: "paid",
    note: "AG Grid, Clerk, and WorkOS pay to be there. Free supplement: showcase submission.",
  },
  {
    rank: 15,
    name: "Apryse",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Apryse contact",
      url: "https://apryse.com/contact-sales",
      section: "Partner / integration inquiry",
    },
    path: "Contact-sales pitch; no public plugin directory or PR-able docs listing found",
    status: "bd",
    note: "Commercial SDK ecosystem. Pitch the WebViewer comments demo as a customer integration story.",
  },
  {
    rank: 16,
    name: "Nutrient",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Nutrient contact",
      url: "https://www.nutrient.io/contact/",
      section: "Partner / integration inquiry",
    },
    path: "Contact form submitted 2026-07-01 -- awaiting reply",
    status: "bd",
    note: "Former PSPDFKit ecosystem. Treat as BD rather than a GitHub PR target; form is now in flight.",
  },
  {
    rank: 17,
    name: "SpreadJS",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "MESCIUS contact",
      url: "https://developer.mescius.com/contact",
      section: "Product / partner inquiry",
    },
    path: "MESCIUS contact form submitted 2026-07-01 -- awaiting reply",
    status: "bd",
    note: "Commercial spreadsheet SDK; demo currently needs an evaluation key for runtime display.",
  },
  {
    rank: 18,
    name: "TinyMCE",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "TinyMCE integrations docs",
      url: "https://www.tiny.cloud/docs/tinymce/latest/integrations/",
      section: "No self-serve third-party listing; use contact route",
    },
    path: "Tiny Cloud contact form submitted 2026-07-01 -- awaiting reply",
    status: "outreach",
    note: "TinyMCE has official integration docs but no public vendor marketplace for third-party plugins; contact route is now in flight.",
  },
  {
    rank: 19,
    name: "CKEditor",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "CKEditor integrations docs",
      url: "https://ckeditor.com/docs/ckeditor5/latest/getting-started/integrations/overview.html",
      section: "No self-serve third-party listing; use contact route",
    },
    path: "CKEditor contact form submitted 2026-07-01 -- awaiting reply",
    status: "outreach",
    note: "CKEditor has first-party integrations and plugin docs, but no open listing path found; contact route is now in flight.",
  },
  {
    rank: 20,
    name: "SuperDoc",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "SuperDoc docs PR",
      url: "https://github.com/superdoc-dev/superdoc/pull/3787",
      section: "Custom UI comments guide",
    },
    path: "PR #3787 open; tracking issue #3788 points to the PR",
    status: "pr-open",
    note: "Small docs PR adds a managed-comments section to SuperDoc's custom comments guide.",
  },
  {
    rank: 21,
    name: "CodeMirror",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Community packages",
      url: "https://codemirror.net/docs/community/",
      section: "Editor Extensions",
    },
    path: "Forum + edit via code.haverbeke.berlin; GitHub mirror archived",
    status: "gated",
    note: "Open-source-only policy -- needs an OSS Velt/CodeMirror binding package.",
  },
  {
    rank: 22,
    name: "Lexical",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Collaboration guide",
      url: "https://lexical.dev/docs/collaboration/react",
      section: "Yjs providers",
    },
    path: "PR to facebook/lexical (Meta CLA)",
    status: "low-odds",
    note: "Page says only y-websocket is officially supported. Win the Yjs docs instead.",
  },
  {
    rank: 23,
    name: "Monaco",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "No official ecosystem/resources page found; product repo is not a listing directory",
    status: "no-venue",
    note: "Keep demo/docs for users, but skip listing outreach unless Microsoft opens a showcase path.",
  },
  {
    rank: 24,
    name: "ProseMirror",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "No official plugin directory; forum-only discussion path is excluded by this plan",
    status: "no-venue",
    note: "The official site has docs/examples/reference, not third-party vendor listings.",
  },
  {
    rank: 25,
    name: "DraftJS",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "No maintained official resources/listing page found",
    status: "no-venue",
    note: "Legacy editor ecosystem; skip outreach beyond keeping docs/demo live.",
  },
  {
    rank: 26,
    name: "Nivo",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "No official ecosystem/listing venue found",
    status: "no-venue",
    note: "Demo/docs are now live, but there is still no viable official listing path.",
  },
  {
    rank: 27,
    name: "PostgreSQL",
    hasDemo: true,
    hasDocs: false,
    venue: {
      label: "Software Catalogue",
      url: "https://www.postgresql.org/download/product-categories/",
      section: "Self-serve product submission",
    },
    path: "Self-serve form -- weak category fit",
    status: "low-odds",
    note: "A frontend SDK does not match the catalogue categories cleanly.",
  },
  {
    rank: 28,
    name: "TipTap",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "Already on awesome-tiptap x2 -- that is the ceiling",
    status: "no-venue",
    note: "tiptap.dev sells competing Collaboration/Comments products.",
  },
  {
    rank: 29,
    name: "Quill",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "Fallback: awesome-quill PR #63",
    status: "no-venue",
    note: "No resources/community page exists on quilljs.com.",
  },
  {
    rank: 30,
    name: "React",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "--",
    status: "no-venue",
    note: "react.dev is vendor-neutral by design.",
  },
  {
    rank: 31,
    name: "Angular",
    hasDemo: false,
    hasDocs: true,
    venue: null,
    path: "--",
    status: "no-venue",
    note: "Community-resources section explicitly rejected (angular/angular #58622).",
  },
];

export const MODEL_CASE = {
  library: "React Flow",
  pageUrl: "https://reactflow.dev/learn/advanced-use/multiplayer",
  pageLabel: "reactflow.dev/learn/advanced-use/multiplayer",
  section: "Third Party Libraries and Services",
  description:
    "Velt is listed as a CRDT/collaboration option alongside Yjs, Jazz, Liveblocks, Supabase, Convex, Automerge, and Loro.",
  how: "A simple pitch through xyflow.com/contact (form + info@xyflow.com). The xyflow team committed the entry themselves in January 2026.",
  peers: ["Yjs", "Jazz", "Liveblocks", "Supabase", "Convex", "Velt", "Automerge", "Loro"],
};

export const PROPOSE_A_PAGE = [
  {
    title: "Svelte Flow multiplayer guide",
    detail:
      "svelteflow.dev has no multiplayer page today. Pitch xyflow -- a proven contact -- on porting the React Flow guide with Velt included.",
  },
  {
    title: "reactflow.dev showcase",
    detail:
      "Explicit showcase CTA. Submit a Velt-powered React Flow demo via the proven contact form.",
  },
  {
    title: "PlateJS hosted-provider section",
    detail: "Provider Types has no SaaS entries yet. Socialize on Discord, then PR if approved.",
  },
  {
    title: "Commercial viewer/editor partner stories",
    detail:
      "Apryse, Nutrient, SpreadJS, TinyMCE, CKEditor, and SuperDoc are better handled as partner/content pitches than code-listing PRs.",
  },
];

export interface Contact {
  library: string;
  primary: string;
  primaryUrl?: string;
  repoPath: string;
  community: string;
  owner: string;
}

export const CONTACTS: Contact[] = [
  {
    library: "Yjs",
    primary: "Opened -- PR #81 + @dmonad ping posted. Awaiting review",
    primaryUrl: "https://github.com/yjs/docs/pull/81",
    repoPath: "yjs/docs -> SUMMARY.md (Connection Provider)",
    community: "discuss.yjs.dev",
    owner: "Kevin Jahns / community",
  },
  {
    library: "BlockNote",
    primary: "Email sent 2026-06-15 to team@blocknotejs.org -- awaiting reply",
    primaryUrl: "https://www.blocknotejs.org/about",
    repoPath: "TypeCellOS/BlockNote -> docs/.../collaboration/index.mdx",
    community: "Discord",
    owner: "TypeCellOS",
  },
  {
    library: "Vercel",
    primary: "Marketplace program form + Technology Partner form",
    primaryUrl: "https://vercel.com/marketplace/program",
    repoPath: "-- (marketplace is gated; needs a real integration build)",
    community: "--",
    owner: "Vercel Inc.",
  },
  {
    library: "AG Grid",
    primary: "Opened -- PR #14075 (JSON + velt.webp) + contact form submitted",
    primaryUrl: "https://github.com/ag-grid/ag-grid/pull/14075",
    repoPath: "ag-grid/ag-grid -> .../community/tools-extensions.json",
    community: "GitHub issues",
    owner: "AG Grid Ltd",
  },
  {
    library: "SlateJS",
    primary: "Done -- PR #6067 merged 2026-06-13",
    primaryUrl: "https://github.com/ianstormtaylor/slate/pull/6067",
    repoPath: "ianstormtaylor/slate -> docs/general/resources.md (merged)",
    community: "Slack (volunteer-run)",
    owner: "Community (Ian Storm Taylor)",
  },
  {
    library: "Ace",
    primary: "Opened -- PR #5981. Awaiting review",
    primaryUrl: "https://github.com/ajaxorg/ace/pull/5981",
    repoPath: "ajaxorg/ace -> index.html (Related Projects)",
    community: "GitHub Discussions",
    owner: "Community (ajaxorg)",
  },
  {
    library: "PlateJS",
    primary: "Discord message sent -- PR to follow on reply",
    repoPath: "udecode/plate -> content/docs/.../yjs.mdx",
    community: "Discord",
    owner: "udecode",
  },
  {
    library: "Chart.js",
    primary: "GitHub PR to chartjs/awesome; re-check CONTRIBUTING before submit",
    primaryUrl: "https://github.com/chartjs/awesome",
    repoPath: "chartjs/awesome -> README.md",
    community: "Discord",
    owner: "Community (chartjs org)",
  },
  {
    library: "LottieFiles",
    primary: "Integration listing form submitted 2026-07-01 -- awaiting reply",
    primaryUrl: "https://lottiefiles.com/integrations",
    repoPath: "--",
    community: "forum.lottiefiles.com",
    owner: "Design Barn Inc.",
  },
  {
    library: "Highcharts",
    primary: "Email sent 2026-06-15 to Highsoft -- follow up with live demo",
    primaryUrl: "https://www.highcharts.com/about-us/contact/",
    repoPath: "-- (website not open-source)",
    community: "Discord / Stack Overflow",
    owner: "Highsoft AS",
  },
  {
    library: "Apryse",
    primary: "Contact-sales / partner inquiry",
    primaryUrl: "https://apryse.com/contact-sales",
    repoPath: "-- (no public listing repo found)",
    community: "--",
    owner: "Apryse",
  },
  {
    library: "Nutrient",
    primary: "Contact form submitted 2026-07-01 -- awaiting reply",
    primaryUrl: "https://www.nutrient.io/contact/",
    repoPath: "-- (no public listing repo found)",
    community: "--",
    owner: "Nutrient",
  },
  {
    library: "SpreadJS",
    primary: "MESCIUS contact form submitted 2026-07-01 -- awaiting reply",
    primaryUrl: "https://developer.mescius.com/contact",
    repoPath: "-- (no public listing repo found)",
    community: "--",
    owner: "MESCIUS",
  },
  {
    library: "TinyMCE",
    primary: "Tiny Cloud contact form submitted 2026-07-01 -- awaiting reply",
    primaryUrl: "https://www.tiny.cloud/contact/",
    repoPath: "-- (no self-serve marketplace found)",
    community: "--",
    owner: "Tiny Technologies",
  },
  {
    library: "CKEditor",
    primary: "CKEditor contact form submitted 2026-07-01 -- awaiting reply",
    primaryUrl: "https://ckeditor.com/contact/",
    repoPath: "-- (no self-serve marketplace found)",
    community: "--",
    owner: "CKSource",
  },
  {
    library: "SuperDoc",
    primary: "PR #3787 open; issue #3788 links to the PR",
    primaryUrl: "https://github.com/superdoc-dev/superdoc/pull/3787",
    repoPath: "superdoc-dev/superdoc -> apps/docs/editor/custom-ui/comments.mdx",
    community: "GitHub",
    owner: "SuperDoc maintainers",
  },
  {
    library: "Vue",
    primary: "Email sent 2026-06-15 to evan@vuejs.org -- awaiting reply",
    repoPath: "vuejs/docs -> src/ecosystem/ (curated; cold PR likely redirected)",
    community: "Vue Land Discord",
    owner: "Vue team / Evan You",
  },
  {
    library: "MongoDB",
    primary: "Become a Partner form, category: Technology",
    primaryUrl: "https://www.mongodb.com/partners",
    repoPath: "-- (docs listing is program-fed)",
    community: "--",
    owner: "MongoDB, Inc.",
  },
  {
    library: "TanStack",
    primary: "partners@tanstack.com -- paid tiers",
    repoPath: "-- (partner wall not PR-able)",
    community: "Discord",
    owner: "TanStack LLC",
  },
  {
    library: "CodeMirror",
    primary: "Forum post first; change via code.haverbeke.berlin",
    primaryUrl: "https://discuss.codemirror.net",
    repoPath: "codemirror/website (Gitea) -> site/docs/community/index.html",
    community: "Forum",
    owner: "Marijn Haverbeke",
  },
  {
    library: "Lexical",
    primary: "PR only, expect pushback -- requires Meta CLA",
    repoPath: "facebook/lexical -> packages/lexical-website/docs/collaboration/react.md",
    community: "Discord",
    owner: "Meta",
  },
];

export const NO_VENUE_NOTE =
  "Do not spend outreach on: DraftJS (legacy/no maintained listing); Monaco (no official ecosystem page); ProseMirror (forum-only, no listing directory); Nivo (demo/docs now live, but no official listing venue); React (vendor-neutral); Angular (concept rejected, #58622); Quill (no on-site page); TipTap (direct competitor; awesome-tiptap listing already secured).";

export const PITCH_TEMPLATE = `Hi -- we're Velt (velt.dev), a collaboration SDK (comments, presence, cursors, realtime sync). We maintain a {library} integration with a working demo ({demo link}) and a dedicated docs page ({docs link}). We're listed on React Flow's multiplayer guide under "Third Party Libraries and Services" (reactflow.dev/learn/advanced-use/multiplayer) alongside Yjs, Liveblocks, and Supabase. Could Velt be added to {page} under {section}? Happy to draft the entry or open the PR ourselves.`;

export const WAVES = [
  {
    title: "Warm natural slots -- free, do now",
    items: [
      "Yjs docs PR + @dmonad ping (PR #81 open)",
      "BlockNote email + PR offer",
      "Slate PR #6067 merged",
      "Ace PR #5981 open",
      "AG Grid PR #14075 open",
      "Chart.js PR now that demo/docs exist",
      "LottieFiles listing form submitted 2026-07-01",
    ],
  },
  {
    title: "Forms & BD outreach",
    items: [
      "Vercel Marketplace application",
      "xyflow follow-ups (showcase, Svelte Flow guide)",
      "Highcharts follow-up with live demo",
      "Vue email follow-up",
      "MongoDB Technology Partner application",
      "Nutrient / SpreadJS partner-content forms submitted 2026-07-01",
      "TinyMCE / CKEditor contact forms submitted 2026-07-01",
      "SuperDoc PR #3787 + issue #3788",
      "Apryse partner-content pitch",
    ],
  },
  {
    title: "Build-first / gated",
    items: [
      "CodeMirror -- open-source a Velt/CodeMirror binding package",
      "PlateJS -- Discord, then PR if maintainers approve",
      "TanStack -- decide on paid sponsorship",
      "Lexical -- only pursue if the Yjs docs win creates stronger precedent",
    ],
  },
  {
    title: "Skip",
    items: ["DraftJS", "Monaco", "ProseMirror", "Nivo", "React", "Angular", "Quill (on-site)", "TipTap (on-site)", "PostgreSQL"],
  },
];

export type PRStatus = "open" | "merged" | "closed";

/** PR statuses re-checked live via GitHub CLI on 2026-06-30. */
export const PR_STATUS_CHECKED = "June 30, 2026";

export interface SubmittedPR {
  library: string;
  repo: string;
  section: string;
  pr: string;
  prUrl: string;
  status: PRStatus;
  mergedAt?: string;
  closedAt?: string;
  note?: string;
}

export const SUBMITTED_PRS: SubmittedPR[] = [
  {
    library: "Vercel Chat SDK",
    repo: "vercel/chat",
    section: "Adapters docs -- vendor-official adapter",
    pr: "#572",
    prUrl: "https://github.com/vercel/chat/pull/572",
    status: "merged",
    mergedAt: "June 2, 2026",
    note: "Earlier outreach -- pre-dates the plan doc",
  },
  {
    library: "BlockNote",
    repo: "defensestation/awesome-blocknote",
    section: "Tools -> Plugins",
    pr: "#5",
    prUrl: "https://github.com/defensestation/awesome-blocknote/pull/5",
    status: "merged",
    mergedAt: "June 7, 2026",
  },
  {
    library: "SlateJS",
    repo: "ianstormtaylor/slate",
    section: "Extensions and Plugins (docs)",
    pr: "#6067",
    prUrl: "https://github.com/ianstormtaylor/slate/pull/6067",
    status: "merged",
    mergedAt: "June 13, 2026",
  },
  {
    library: "Yjs",
    repo: "yjs/docs",
    section: "Ecosystem -> Connection Provider (SUMMARY.md)",
    pr: "#81",
    prUrl: "https://github.com/yjs/docs/pull/81",
    status: "open",
    note: "Docs-site PR plus @dmonad ping posted",
  },
  {
    library: "Ace",
    repo: "ajaxorg/ace",
    section: "Homepage -> Related Projects (index.html)",
    pr: "#5981",
    prUrl: "https://github.com/ajaxorg/ace/pull/5981",
    status: "open",
    note: "Docs-site PR",
  },
  {
    library: "AG Grid",
    repo: "ag-grid/ag-grid",
    section: "Community -> Tools & Extensions (JSON + velt.webp)",
    pr: "#14075",
    prUrl: "https://github.com/ag-grid/ag-grid/pull/14075",
    status: "open",
    note: "Docs-site PR -- Extension entry + logo",
  },
  {
    library: "Vercel Chat SDK (follow-up)",
    repo: "vercel/chat",
    section: "Adapters docs -- sharpen description + live demo link",
    pr: "#578",
    prUrl: "https://github.com/vercel/chat/pull/578",
    status: "merged",
    mergedAt: "June 18, 2026",
  },
  {
    library: "Quill",
    repo: "quilljs/awesome-quill",
    section: "Other",
    pr: "#63",
    prUrl: "https://github.com/quilljs/awesome-quill/pull/63",
    status: "open",
  },
  {
    library: "CodeMirror",
    repo: "tmcw/awesome-codemirror",
    section: "Plugins",
    pr: "#1",
    prUrl: "https://github.com/tmcw/awesome-codemirror/pull/1",
    status: "open",
  },
  {
    library: "Velt SDK (realtime)",
    repo: "jacktuck/awesome-realtime",
    section: "Websockets -> Hosted",
    pr: "#2",
    prUrl: "https://github.com/jacktuck/awesome-realtime/pull/2",
    status: "open",
  },
  {
    library: "MongoDB",
    repo: "ramnes/awesome-mongodb",
    section: "Applications",
    pr: "#155",
    prUrl: "https://github.com/ramnes/awesome-mongodb/pull/155",
    status: "closed",
    closedAt: "June 17, 2026",
    note: "Closed unmerged -- use MongoDB partner program if pursuing MongoDB.",
  },
  {
    library: "CRDT (Velt SDK)",
    repo: "alangibson/awesome-crdt",
    section: "Implementations -> Data Structures",
    pr: "#14",
    prUrl: "https://github.com/alangibson/awesome-crdt/pull/14",
    status: "open",
    note: "Repo dormant since 2021 -- low merge odds",
  },
];

export interface Platform {
  name: string;
  type: string;
  submitVia: string;
  submitUrl?: string;
  notes: string;
  value: 1 | 2 | 3;
}

export const PLATFORMS: Platform[] = [
  {
    name: "Vercel Templates",
    type: "Template marketplace",
    submitVia: "Form",
    submitUrl: "https://vercel.com/templates/submit",
    notes: "Public repo + live demo + Deploy button + .env.example",
    value: 3,
  },
  {
    name: "Cloudflare Templates",
    type: "Workers/Pages gallery",
    submitVia: "GitHub PR",
    submitUrl: "https://github.com/cloudflare/templates",
    notes: "Naming + meta block + Playwright E2E; gallery needs CF sign-off",
    value: 3,
  },
  {
    name: "Supabase examples",
    type: "Examples dir",
    submitVia: "GitHub PR",
    submitUrl: "https://github.com/supabase/supabase/tree/master/examples",
    notes: "Add a Velt + Supabase realtime collaboration example",
    value: 3,
  },
  {
    name: "StackBlitz starters",
    type: "Starter gallery",
    submitVia: "GitHub PR",
    submitUrl: "https://github.com/stackblitz/starters",
    notes: "Issue first; gallery feature is hand-picked",
    value: 2,
  },
  {
    name: "Replit Templates",
    type: "Template gallery",
    submitVia: "In-product publish",
    notes: "Self-serve, instant; featuring is separate",
    value: 2,
  },
  {
    name: "CodeSandbox templates",
    type: "Templates repo",
    submitVia: "GitHub PR",
    submitUrl: "https://github.com/codesandbox/sandbox-templates",
    notes: "Runtime-focused; weaker fit",
    value: 1,
  },
  {
    name: "Best of JS",
    type: "Project index",
    submitVia: "GitHub issue",
    submitUrl: "https://bestofjs.org/projects/project-guidelines",
    notes: "Indexes the Velt SDK repo, not sample apps",
    value: 1,
  },
  {
    name: "madewithreactjs.com",
    type: "Showcase",
    submitVia: "Form",
    submitUrl: "https://madewithreactjs.com/submit",
    notes: "Free or paid; human-reviewed",
    value: 1,
  },
];

export interface Draft {
  target: string;
  channel: "Email" | "GitHub PR" | "Form" | "Slack" | "Discord";
  to: string;
  toUrl?: string;
  done?: string;
  blocker?: string;
  fields?: { label: string; value: string }[];
  subject?: string;
  body: string;
  code?: { label: string; content: string };
}

/** Outreach drafts for actionable targets -- mirrors /velt-outreach-drafts.md (verified 2026-06-30). */
export const DRAFTS: Draft[] = [
  {
    target: "Yjs",
    channel: "GitHub PR",
    to: "yjs/docs -> SUMMARY.md (+ ping @dmonad)",
    toUrl: "https://github.com/yjs/docs/pull/81",
    done: "PR #81 opened 2026-06-15 + @dmonad ping posted -- awaiting review",
    subject: "PR title: Add Velt to Connection Providers",
    body: `Adds Velt to the Connection Provider list, matching the existing external entries (y-sweet, Liveblocks, SuperViz, Hocuspocus).

Velt is a managed Yjs backend with realtime WebSocket sync, persistence, offline support, automatic reconnection, and version history. It is already listed in the yjs/yjs README under Providers as Velt YJs; this PR mirrors that entry onto the docs site.

Docs: https://docs.velt.dev/realtime-collaboration/crdt/overview
Live demo: https://velt-general-crdt-demo.vercel.app/`,
    code: {
      label: "SUMMARY.md -- append after the Hocuspocus line",
      content: `  * [Velt](https://velt.dev/libraries/yjs)`,
    },
  },
  {
    target: "BlockNote",
    channel: "Email",
    to: "team@blocknotejs.org",
    done: "Email sent 2026-06-15 -- awaiting reply",
    subject: "Adding Velt to the Yjs Providers list in your collaboration docs?",
    body: `Hi BlockNote team,

I'm Yoen from Velt (velt.dev). We build a collaboration SDK with comments, presence, cursors, and a managed Yjs backend. Velt slots into BlockNote's existing Yjs-based collaboration, and we maintain a dedicated BlockNote integration.

- Integration docs: https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote
- Live demo: https://velt-blocknote-crdt-demo.vercel.app/
- Library page: https://velt.dev/libraries/blocknote

Could Velt be listed in the Yjs Providers section of your collaboration docs alongside Liveblocks, PartyKit, and Y-Sweet? Happy to open the PR with whatever wording you prefer.

Thanks,
Yoen -- Velt`,
  },
  {
    target: "Ace",
    channel: "GitHub PR",
    to: "ajaxorg/ace -> index.html (Related Projects)",
    toUrl: "https://github.com/ajaxorg/ace/pull/5981",
    done: "PR #5981 opened 2026-06-15 -- awaiting review",
    subject: "PR title: Add Velt collaboration SDK to Related Projects",
    body: `Adds Velt to the Related Projects list on the homepage, next to the existing Ace collaboration extension.

Velt is a collaboration SDK with a dedicated Ace integration: threaded comments anchored to code, presence, and live cursors.

- Integration docs: https://docs.velt.dev/async-collaboration/comments/setup/ace
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ace/ace-comments-demo`,
    code: {
      label: "index.html -- insert after the ace-collab-ext item",
      content: `<li><a href="https://docs.velt.dev/async-collaboration/comments/setup/ace">Velt collaboration SDK for Ace (comments, presence, cursors)</a></li>`,
    },
  },
  {
    target: "AG Grid",
    channel: "GitHub PR",
    to: "ag-grid/ag-grid -> tools-extensions.json",
    toUrl: "https://github.com/ag-grid/ag-grid/pull/14075",
    done: "PR #14075 open + contact form submitted -- awaiting review",
    subject: "PR title: docs(community): add Velt to Tools & Extensions",
    body: `Adds Velt to the community Tools & Extensions directory as an Extension. Velt adds cell-level commenting with aggregation, presence, and live cursors on top of AG Grid.

- Integration docs: https://docs.velt.dev/integrations/ag-grid
- React demo: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/tables/ag-grid/comment-aggregation
- Vue demo: https://github.com/velt-js/sample-apps/tree/main/apps/vue/comments/tables/ag-grid`,
  },
  {
    target: "Chart.js",
    channel: "GitHub PR",
    to: "chartjs/awesome -> README.md",
    toUrl: "https://github.com/chartjs/awesome",
    subject: "PR title: Add Velt Chart.js comments demo",
    body: `Adds Velt to the Chart.js ecosystem list as a collaboration/comments integration.

Velt adds collaborative comments to Chart.js dashboards so users can place threaded discussions on chart data and review context directly in the visualization.

- Live demo: https://sample-apps-chartjs-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/chartjs/chartjs-comments-demo
- Integration docs: https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs

I checked CONTRIBUTING before opening this PR and matched the list ordering/format.`,
    code: {
      label: "Candidate one-line entry",
      content: `- [Velt Chart.js Comments](https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/chartjs/chartjs-comments-demo) - Collaborative comments, presence, and review workflows for Chart.js dashboards.`,
    },
  },
  {
    target: "LottieFiles",
    channel: "Form",
    to: "lottiefiles.com/integrations",
    toUrl: "https://lottiefiles.com/integrations",
    done: "Integration listing form submitted 2026-07-01 -- awaiting reply",
    fields: [
      { label: "Company / product", value: "Velt" },
      { label: "Website", value: "https://velt.dev" },
      { label: "Integration URL", value: "https://sample-apps-lottie-comments-demo.vercel.app" },
      { label: "Docs URL", value: "https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup" },
    ],
    subject: "List Velt as a Lottie collaboration integration",
    body: `Velt is a collaboration SDK that adds comments, presence, and review workflows to web apps. Our Lottie integration lets reviewers comment on animated media timelines and keep feedback anchored to the playback state.

Live demo: https://sample-apps-lottie-comments-demo.vercel.app
Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/video-player/lottie/lottie-comments-demo
Docs: https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup`,
  },
  {
    target: "Highcharts",
    channel: "Email",
    to: "Highsoft contact",
    toUrl: "https://www.highcharts.com/about-us/contact/",
    done: "Email sent 2026-06-15 -- follow up with live demo link",
    subject: "Following up: Velt comments integration for Highcharts",
    body: `Hi Highsoft team,

Following up with a working demo for the Velt + Highcharts comments integration:

- Live demo: https://sample-apps-highcharts-comments-dem.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/charts/highcharts/highcharts-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts

Velt lets teams pin threaded comments directly to chart context, which fits dashboard review and analytics workflows. Would Highsoft consider listing Velt in the Community Resources section of highcharts.com/integrations? Happy to provide a logo and one-line entry.`,
  },
  {
    target: "Apryse",
    channel: "Form",
    to: "Apryse contact sales",
    toUrl: "https://apryse.com/contact-sales",
    subject: "Velt collaboration comments integration for Apryse WebViewer",
    body: `Hi Apryse team,

I'm Yoen from Velt. We maintain a Velt comments integration for Apryse WebViewer that adds collaborative threaded comments and review workflows around documents in a React/Next.js app.

- Live demo: https://sample-apps-apryse-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/apryse/apryse-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/apryse

Is there a partner, integrations, or customer-story route where this could be listed for Apryse developers? Happy to adapt the copy or build a joint example if useful.`,
  },
  {
    target: "Nutrient",
    channel: "Form",
    to: "Nutrient contact",
    toUrl: "https://www.nutrient.io/contact/",
    done: "Contact form submitted 2026-07-01 -- awaiting reply",
    subject: "Velt collaboration comments integration for Nutrient",
    body: `Hi Nutrient team,

I'm Yoen from Velt. We maintain a Velt comments integration for Nutrient that adds collaborative threaded comments and review workflows to document experiences.

- Live demo: https://sample-apps-nutrient-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/nutrient/nutrient-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/nutrient

Is there an integrations, partner, or customer-story path where this could be listed for Nutrient developers? Happy to provide copy, screenshots, or a joint sample.`,
  },
  {
    target: "SpreadJS",
    channel: "Form",
    to: "MESCIUS contact",
    toUrl: "https://developer.mescius.com/contact",
    done: "MESCIUS contact form submitted 2026-07-01 -- awaiting reply",
    subject: "Velt comments integration for SpreadJS spreadsheets",
    body: `Hi MESCIUS team,

I'm Yoen from Velt. We built a Velt comments integration for SpreadJS so teams can add collaborative threaded comments to spreadsheet experiences.

- Live demo: https://sample-apps-spreadjs-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/spreadsheets/spreadjs/spreadjs-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/spreadjs

Is there a partner/integrations route where this could be listed or reviewed? Happy to share a licensed/evaluation setup if needed for validation.`,
  },
  {
    target: "TinyMCE",
    channel: "Form",
    to: "Tiny Cloud contact",
    toUrl: "https://www.tiny.cloud/contact/",
    done: "Tiny Cloud contact form submitted 2026-07-01 -- awaiting reply",
    subject: "Velt collaborative comments integration for TinyMCE",
    body: `Hi TinyMCE team,

I'm Yoen from Velt. We maintain a Velt comments integration for TinyMCE that lets users add threaded comments to selected text in TinyMCE editors.

- Live demo: https://sample-apps-tinymce-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/tinymce/tinymce-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/tinymce

Would you consider listing or referencing this as a third-party integration for TinyMCE users? Happy to draft the entry or adapt to your docs format.`,
  },
  {
    target: "CKEditor",
    channel: "Form",
    to: "CKEditor contact",
    toUrl: "https://ckeditor.com/contact/",
    done: "CKEditor contact form submitted 2026-07-01 -- awaiting reply",
    subject: "Velt collaborative comments integration for CKEditor",
    body: `Hi CKEditor team,

I'm Yoen from Velt. We maintain a Velt comments integration for CKEditor that adds collaborative threaded comments to selected editor text.

- Live demo: https://sample-apps-ckeditor-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/ckeditor/ckeditor-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/ckeditor

Is there a recommended third-party integration or plugin listing path for CKEditor ecosystem tools? Happy to provide copy, screenshots, or a docs PR if that is the preferred route.`,
  },
  {
    target: "SuperDoc",
    channel: "GitHub PR",
    to: "SuperDoc docs / maintainer issue",
    toUrl: "https://github.com/superdoc-dev/superdoc/pull/3787",
    done: "PR #3787 opened and tracking issue #3788 created on 2026-07-01 -- awaiting review",
    subject: "Add Velt as a SuperDoc comments integration",
    body: `Hi SuperDoc team,

Velt maintains a SuperDoc comments integration that adds collaborative threaded comments and review workflows around SuperDoc documents.

- Live demo: https://sample-apps-superdoc-comments-demo.vercel.app
- Demo source: https://github.com/velt-js/sample-apps/tree/main/apps/react/comments/text-editors/superdoc/superdoc-comments-demo
- Docs: https://docs.velt.dev/async-collaboration/comments/setup/superdoc

Would you be open to a short integrations/docs note for Velt? Happy to open a PR or issue with your preferred wording.`,
  },
  {
    target: "Vercel",
    channel: "Form",
    to: "vercel.com/marketplace/program -- multi-step intake",
    toUrl: "https://vercel.com/marketplace/program",
    blocker: "Multi-step form; expect integration-build follow-up",
    fields: [
      { label: "Company name", value: "Velt" },
      { label: "Contact name", value: "Yoen Zhang" },
      { label: "Email address", value: "yoen@velt.dev" },
      { label: "Company website", value: "https://velt.dev" },
    ],
    body: `Velt is a collaboration SDK for product teams: comments, presence, live cursors, huddles, recording, and a managed Yjs/CRDT backend, added to a React/Next.js app in a few lines. We would list in DevTools, where Liveblocks sits today, as a connectable account. Most of our demos are Next.js apps deployed on Vercel (hub: https://samples.velt.dev/). We are ready to build the OAuth/token-exchange integration per your marketplace spec.`,
  },
];

export const SEQUENCING = [
  "Package one flagship Next.js Velt demo -- public repo, Deploy button, .env.example, clear README.",
  "Submit to Vercel Templates/Marketplace -- highest cross-cutting ROI.",
  "Open the newly unblocked Chart.js PR.",
  "Keep submitted forms warm: LottieFiles, Nutrient, SpreadJS, TinyMCE, and CKEditor.",
  "Send the remaining Apryse pitch.",
  "Keep SuperDoc PR #3787 / issue #3788 warm.",
  "Keep existing PRs warm: Yjs, Ace, AG Grid, Quill, CodeMirror, awesome-realtime, awesome-crdt.",
  "Skip no-venue rows unless a new official listing path appears.",
];
