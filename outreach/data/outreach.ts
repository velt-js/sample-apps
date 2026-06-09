/**
 * Velt outreach / listing plan — structured data for the review dashboard.
 *
 * Source of truth: /velt-listing-plan.md (repo root). All venue URLs were
 * live-verified 2026-06-09; awesome-list PRs opened 2026-06-03. If the plan
 * doc changes, mirror the change here.
 */

export const VERIFIED_DATE = "June 9, 2026";

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
    path: "Won via xyflow.com/contact — the team added the entry themselves",
    status: "listed",
    note: "The model case. Velt sits alongside Yjs, Jazz, Liveblocks, Supabase, Convex, Automerge, Loro.",
  },
  {
    rank: 2,
    name: "Yjs",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "docs.yjs.dev → Connection Provider",
      url: "https://docs.yjs.dev/ecosystem/connection-provider",
      section: "Ecosystem → Connection Provider (+ yjs.dev “Services”)",
    },
    path: "One-line PR to yjs/docs SUMMARY.md + ping @dmonad",
    status: "todo",
    topPick: true,
    note: "Liveblocks, y-sweet, SuperViz, Hocuspocus listed there; Velt only in the yjs/yjs README (sponsor ⭐). The docs site is the unsynced surface.",
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
    path: "team@blocknotejs.org + PR",
    status: "todo",
    topPick: true,
    note: "Liveblocks, PartyKit, Y-Sweet listed — richest SaaS-peer precedent of all 22.",
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
    note: "Liveblocks already listed — direct competitor precedent.",
  },
  {
    rank: 5,
    name: "AG Grid",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Tools & Extensions",
      url: "https://www.ag-grid.com/community/tools-extensions/",
      section: "Type “Extension”",
    },
    path: "PR to tools-extensions.json in ag-grid/ag-grid + contact-form note",
    status: "todo",
    topPick: true,
    note: "Commercial, closed-source AdapTable already listed — clean precedent.",
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
    path: "PR #6067 open — nudge via Slack",
    status: "pr-open",
    note: "@liveblocks/yjs already listed on the page.",
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
    path: "PR to ajaxorg/ace index.html",
    status: "todo",
    note: "A collaboration extension (ace-collab-ext) is already listed.",
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
    path: "Discord, then PR to udecode/plate",
    status: "todo",
    note: "No hosted SaaS listed yet — Velt would be first.",
  },
  {
    rank: 9,
    name: "Highcharts",
    hasDemo: false,
    hasDocs: true,
    venue: {
      label: "Integrations",
      url: "https://www.highcharts.com/integrations",
      section: "Community Resources",
    },
    path: "Email Highsoft via highcharts.com/about-us/contact",
    status: "outreach",
    note: "No submission process exists; the old plugin registry is a 404.",
  },
  {
    rank: 10,
    name: "Vue",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Ecosystem placement",
      url: "https://vuejs.org/ecosystem/themes.html",
      section: "Themes-page placement model",
    },
    path: "evan@vuejs.org — published placement contact",
    status: "outreach",
    note: "vuejs.org demonstrably sells ecosystem placements.",
  },
  {
    rank: 11,
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
    note: "Formal BD program — application + partner agreement, not a docs PR.",
  },
  {
    rank: 12,
    name: "TanStack Table",
    hasDemo: true,
    hasDocs: false,
    venue: {
      label: "Partners wall",
      url: "https://tanstack.com/partners",
      section: "Paid tiers (+ free showcase)",
    },
    path: "partners@tanstack.com",
    status: "paid",
    note: "AG Grid, Clerk, WorkOS pay to be there. Free supplement: showcase submission.",
  },
  {
    rank: 13,
    name: "Chart.js",
    hasDemo: false,
    hasDocs: true,
    venue: {
      label: "chartjs/awesome",
      url: "https://github.com/chartjs/awesome",
      section: "Plugins / Tools (linked from official docs nav)",
    },
    path: "PR — entry must link a GitHub repo ≥30 days old",
    status: "gated",
    note: "Publish the Velt chart-comments repo first, then wait out the 30-day rule.",
  },
  {
    rank: 14,
    name: "Lottie",
    hasDemo: false,
    hasDocs: true,
    venue: {
      label: "lottiefiles.com/integrations",
      url: "https://lottiefiles.com/integrations",
      section: "“List your integrations” prompt",
    },
    path: "Self-serve link (browser only — bot-gated) + support@lottiefiles.com",
    status: "gated",
    note: "Needs an actual Lottie integration artifact first.",
  },
  {
    rank: 15,
    name: "CodeMirror",
    hasDemo: true,
    hasDocs: true,
    venue: {
      label: "Community packages",
      url: "https://codemirror.net/docs/community/",
      section: "Editor Extensions",
    },
    path: "Forum + edit via code.haverbeke.berlin (GitHub mirror archived)",
    status: "gated",
    note: "Open-source-only policy — needs an OSS Velt↔CodeMirror binding package.",
  },
  {
    rank: 16,
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
    note: "Page states only y-websocket is officially supported — win the Yjs docs instead.",
  },
  {
    rank: 17,
    name: "PostgreSQL",
    hasDemo: true,
    hasDocs: false,
    venue: {
      label: "Software Catalogue",
      url: "https://www.postgresql.org/download/product-categories/",
      section: "Self-serve product submission",
    },
    path: "Self-serve form — weak category fit",
    status: "low-odds",
    note: "A frontend SDK doesn’t match any catalogue category; moderators likely reject.",
  },
  {
    rank: 18,
    name: "TipTap",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "Already on awesome-tiptap ×2 — that’s the ceiling",
    status: "no-venue",
    note: "tiptap.dev sells competing Collaboration/Comments products.",
  },
  {
    rank: 19,
    name: "Quill",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "Fallback: awesome-quill PR #63",
    status: "no-venue",
    note: "No resources/community page exists on quilljs.com (both candidates 404).",
  },
  {
    rank: 20,
    name: "React",
    hasDemo: true,
    hasDocs: true,
    venue: null,
    path: "—",
    status: "no-venue",
    note: "react.dev is vendor-neutral by design.",
  },
  {
    rank: 21,
    name: "Angular",
    hasDemo: false,
    hasDocs: true,
    venue: null,
    path: "—",
    status: "no-venue",
    note: "Community-resources section explicitly rejected (angular/angular #58622).",
  },
  {
    rank: 22,
    name: "Nivo",
    hasDemo: false,
    hasDocs: true,
    venue: null,
    path: "—",
    status: "no-venue",
    note: "Site down (HTTP 402); no ecosystem page ever existed.",
  },
];

export const MODEL_CASE = {
  library: "React Flow",
  pageUrl: "https://reactflow.dev/learn/advanced-use/multiplayer",
  pageLabel: "reactflow.dev/learn/advanced-use/multiplayer",
  section: "Third Party Libraries and Services",
  description:
    "Velt is listed as “CRDT with managed backend … with a dedicated React Flow Library” alongside Yjs, Jazz, Liveblocks, Supabase, Convex, Automerge, and Loro.",
  how: "A simple pitch through xyflow.com/contact (form + info@xyflow.com). The xyflow team committed the entry themselves in January 2026.",
  peers: ["Yjs", "Jazz", "Liveblocks", "Supabase", "Convex", "Velt", "Automerge", "Loro"],
};

export const PROPOSE_A_PAGE = [
  {
    title: "Svelte Flow multiplayer guide",
    detail:
      "svelteflow.dev has no multiplayer page (404 today). Pitch xyflow — a proven contact — on porting the React Flow guide, third-party table and Velt included.",
  },
  {
    title: "reactflow.dev showcase",
    detail:
      "Explicit “we want to feature it here!” CTA. Submit a Velt-powered React Flow demo via the contact form.",
  },
  {
    title: "PlateJS hosted-provider section",
    detail: "Provider Types has no SaaS entries yet. Socialize on Discord, then PR.",
  },
  {
    title: "Highcharts “Community Resources” entry",
    detail: "The section exists but has no intake — email Highsoft a Velt chart-comments entry.",
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
    primary: "PR is the path; pair with a ping to @dmonad — Velt’s README entry already carries the sponsor ⭐",
    primaryUrl: "https://github.com/yjs/docs",
    repoPath: "yjs/docs → SUMMARY.md (Connection Provider)",
    community: "discuss.yjs.dev",
    owner: "Kevin Jahns / community",
  },
  {
    library: "BlockNote",
    primary: "team@blocknotejs.org — About page invites partnerships",
    primaryUrl: "https://www.blocknotejs.org/about",
    repoPath: "TypeCellOS/BlockNote → docs/…/collaboration/index.mdx",
    community: "Discord",
    owner: "TypeCellOS",
  },
  {
    library: "Vercel",
    primary: "Marketplace program form + Technology Partner form",
    primaryUrl: "https://vercel.com/marketplace/program",
    repoPath: "— (marketplace is gated; needs a real integration build)",
    community: "—",
    owner: "Vercel Inc.",
  },
  {
    library: "AG Grid",
    primary: "PR is the path; parallel heads-up via the contact form",
    primaryUrl: "https://www.ag-grid.com/about/",
    repoPath: "ag-grid/ag-grid → …/community/tools-extensions.json",
    community: "GitHub issues",
    owner: "AG Grid Ltd",
  },
  {
    library: "SlateJS",
    primary: "Nudge open PR #6067 for review via Slack",
    primaryUrl: "https://github.com/ianstormtaylor/slate/pull/6067",
    repoPath: "ianstormtaylor/slate → docs/general/resources.md",
    community: "Slack (volunteer-run)",
    owner: "Community (Ian Storm Taylor)",
  },
  {
    library: "Ace",
    primary: "PR only",
    repoPath: "ajaxorg/ace → index.html (“Related Projects”)",
    community: "GitHub Discussions",
    owner: "Community (ajaxorg)",
  },
  {
    library: "xyflow (follow-ups)",
    primary: "xyflow.com/contact + info@xyflow.com — the proven channel",
    primaryUrl: "https://xyflow.com/contact",
    repoPath: "xyflow/web → sites/reactflow.dev/…/multiplayer.mdx",
    community: "Discord",
    owner: "xyflow GmbH",
  },
  {
    library: "PlateJS",
    primary: "Discord first to socialize, then PR",
    repoPath: "udecode/plate → content/docs/…/yjs.mdx",
    community: "Discord",
    owner: "udecode (Ziad Beyens)",
  },
  {
    library: "Highcharts",
    primary: "Contact page (email obfuscated on-page; sales form on shop.highcharts.com)",
    primaryUrl: "https://www.highcharts.com/about-us/contact/",
    repoPath: "— (website not open-source)",
    community: "Discord / Stack Overflow",
    owner: "Highsoft AS (Norway)",
  },
  {
    library: "Vue",
    primary: "evan@vuejs.org — published placement contact",
    repoPath: "vuejs/docs → src/ecosystem/ (curated; cold PR redirected to email)",
    community: "Vue Land Discord",
    owner: "Vue team / Evan You",
  },
  {
    library: "MongoDB",
    primary: "“Become a Partner” form, category: Technology",
    primaryUrl: "https://www.mongodb.com/partners",
    repoPath: "— (docs listing is program-fed)",
    community: "—",
    owner: "MongoDB, Inc.",
  },
  {
    library: "TanStack",
    primary: "partners@tanstack.com (“TanStack Partnership Inquiry”) — paid tiers",
    repoPath: "— (partner wall not PR-able)",
    community: "Discord",
    owner: "TanStack LLC",
  },
  {
    library: "Chart.js",
    primary: "PR only — GitHub repo link, ≥30 days old, alphabetical, one per PR",
    primaryUrl: "https://github.com/chartjs/awesome",
    repoPath: "chartjs/awesome → README.md",
    community: "Discord",
    owner: "Community (chartjs org)",
  },
  {
    library: "CodeMirror",
    primary: "Forum post first; change via code.haverbeke.berlin (GitHub mirror archived)",
    primaryUrl: "https://discuss.codemirror.net",
    repoPath: "codemirror/website (Gitea) → site/docs/community/index.html",
    community: "Forum",
    owner: "Marijn Haverbeke",
  },
  {
    library: "LottieFiles",
    primary: "“List your integrations” link (real browser only) + support@lottiefiles.com",
    primaryUrl: "https://lottiefiles.com/integrations",
    repoPath: "—",
    community: "forum.lottiefiles.com",
    owner: "Design Barn Inc.",
  },
  {
    library: "Lexical",
    primary: "PR only (expect pushback) — requires Meta CLA",
    repoPath: "facebook/lexical → packages/lexical-website/docs/collaboration/react.md",
    community: "Discord",
    owner: "Meta",
  },
  {
    library: "PostgreSQL",
    primary: "Self-serve product submission (free community account) — low value",
    primaryUrl: "https://www.postgresql.org/account/products/new/",
    repoPath: "— (catalogue is database-driven)",
    community: "pgsql-www list",
    owner: "PostgreSQL community",
  },
];

export const NO_VENUE_NOTE =
  "Do not spend outreach on: React (vendor-neutral by design) · Angular (concept rejected, #58622) · Nivo (site down) · Quill (no on-site page) · TipTap (direct competitor; awesome-tiptap listing already secured).";

export const PITCH_TEMPLATE = `Hi — we're Velt (velt.dev), a collaboration SDK (comments, presence, cursors, realtime sync). We maintain a {library} integration with a working demo ({demo link}) and a dedicated docs page ({docs link}). We're listed on React Flow's multiplayer guide under "Third Party Libraries and Services" (reactflow.dev/learn/advanced-use/multiplayer) alongside Yjs, Liveblocks, and Supabase. Could Velt be added to {page} under {section}? Happy to draft the entry or open the PR ourselves.`;

export const WAVES = [
  {
    title: "Warm natural slots — free, do now",
    items: [
      "Yjs docs PR + @dmonad ping",
      "BlockNote email + PR",
      "Slate PR #6067 merge-nudge",
      "Ace PR",
      "AG Grid JSON PR + contact-form note",
    ],
  },
  {
    title: "Forms & BD outreach",
    items: [
      "Vercel Marketplace application",
      "xyflow follow-ups (showcase, Svelte Flow guide)",
      "Highcharts email",
      "Vue email to Evan You",
      "MongoDB Technology Partner application",
    ],
  },
  {
    title: "Build-first / gated",
    items: [
      "Chart.js — publish the chart-comments repo, wait 30 days",
      "CodeMirror — open-source a Velt↔CodeMirror binding",
      "LottieFiles — build a Lottie integration",
      "PlateJS — Discord, then PR",
      "TanStack — decide on paid sponsorship",
    ],
  },
  {
    title: "Skip",
    items: ["React", "Angular", "Nivo", "Quill (on-site)", "TipTap (on-site)", "PostgreSQL"],
  },
];

export type PRStatus = "open" | "merged" | "closed";

/** PR statuses re-checked live via the GitHub API on 2026-06-09. */
export const PR_STATUS_CHECKED = "June 9, 2026";

export interface SubmittedPR {
  library: string;
  repo: string;
  section: string;
  pr: string;
  prUrl: string;
  status: PRStatus;
  mergedAt?: string;
  note?: string;
}

export const SUBMITTED_PRS: SubmittedPR[] = [
  {
    library: "Vercel Chat SDK",
    repo: "vercel/chat",
    section: "Adapters docs — vendor-official adapter",
    pr: "#572",
    prUrl: "https://github.com/vercel/chat/pull/572",
    status: "merged",
    mergedAt: "June 2, 2026",
    note: "Earlier outreach — pre-dates the plan doc",
  },
  {
    library: "BlockNote",
    repo: "defensestation/awesome-blocknote",
    section: "Tools → Plugins",
    pr: "#5",
    prUrl: "https://github.com/defensestation/awesome-blocknote/pull/5",
    status: "merged",
    mergedAt: "June 7, 2026",
  },
  {
    library: "Vercel Chat SDK (follow-up)",
    repo: "vercel/chat",
    section: "Adapters docs — sharpen description + live demo link",
    pr: "#578",
    prUrl: "https://github.com/vercel/chat/pull/578",
    status: "open",
  },
  {
    library: "SlateJS",
    repo: "ianstormtaylor/slate",
    section: "Extensions and Plugins (docs)",
    pr: "#6067",
    prUrl: "https://github.com/ianstormtaylor/slate/pull/6067",
    status: "open",
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
    section: "Websockets → Hosted",
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
    status: "open",
  },
  {
    library: "CRDT (Velt SDK)",
    repo: "alangibson/awesome-crdt",
    section: "Implementations → Data Structures",
    pr: "#14",
    prUrl: "https://github.com/alangibson/awesome-crdt/pull/14",
    status: "open",
    note: "Repo dormant since 2021 — low merge odds",
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
    notes: "Add a “Velt + Supabase realtime collaboration” example",
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

export const SEQUENCING = [
  "Package one flagship Next.js Velt demo — public repo, Deploy button, .env.example, clear README.",
  "Submit to Vercel Templates (form) — highest ROI; start here.",
  "Adapt into platform variants — Cloudflare (Playwright E2E), Supabase example, then StackBlitz / Replit.",
  "Parallel low-effort track — fire off the per-library awesome-list / showcase PRs.",
  "SDK-level listings — awesome-realtime / awesome-rtc / realtime-web-technologies-guide.",
];
