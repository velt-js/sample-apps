# Activity Log Demo

> **[🚀 View Live Demo](https://sample-apps-activity-log-demo.vercel.app)**

## Overview

This demo showcases **Velt Activity Logs** — a live, running audit feed of everything happening on a document. Built on a simple document/spec page, the Activity Log captures **comments**, **reactions**, and **custom application events** (review status changes, sharing) into a single chronological, date-grouped feed.

There is **no bot and no backend** — the activity feed is driven entirely by what users do on the document, demonstrating how Velt turns collaboration events into an audit trail.

## Path

```
apps/react/activity/document/custom/activity-log-demo/
```

## Package Name

`@apps/react-activity-document-custom-activity-log-demo`

## Prerequisite: Enable Activity Logs in the Velt Console

Activity Logs are **off by default**. Before the feed will populate, enable them for your API key:

```
console.velt.dev → Dashboard → Configuration → Activity Logs
```

Without this step, `useAllActivities()` returns `null`/empty and `<VeltActivityLog>` shows no entries.

## Features

### Activity Log
- **Drop-in feed UI** via `<VeltActivityLog>` — date-grouped, with built-in loading and empty states and feature-type filtering.
- **Always-mounted drawer** — the panel toggles visibility with `display` rather than mounting/unmounting, so the feed stays connected and loads instantly.
- **Live event counter** in the header via `useAllActivities()` (with explicit `null` loading handling).
- **Custom activities** via `useActivityUtils().createActivity()` — app-level events are pushed into the same unified feed as Velt-generated comment/reaction activities.

### Activity Sources
| Source | How it's generated |
|--------|--------------------|
| Comments | `VeltComments` — adding/replying to comments (`comment` feature) |
| Reactions | Comment reactions (`reaction` feature) |
| Status change | Approve / Request changes / Move to review → `createActivity` (`custom`) |
| Share | Clicking **Share** → `createActivity` (`custom`) |

### Document
- A clean spec/article page (title, status badge, review toolbar, body sections) you can comment on anywhere.
- Light/dark theme toggle, presence avatars, and notifications (shared Velt scaffold).

## Key Files

| File | Purpose |
|------|---------|
| `components/velt/ActivityLogPanel.tsx` | Always-mounted Activity Log drawer (`<VeltActivityLog shadowDom={false} />`) |
| `hooks/useActivityActions.ts` | Wrapper over `useActivityUtils().createActivity()` for custom events |
| `components/header/header.tsx` | Activity toggle button + live `useAllActivities()` event count |
| `components/document/DocumentArticle.tsx` | The document content + review toolbar that emits custom status/share activities |

## Key Technologies

- **Next.js 16** with React 19
- **@veltdev/react** `5.0.2-beta.26` — Activity Log component + hooks (requires `>= 5.0.2-beta.13`)
- **Tailwind CSS v3.4** — styling
- **TypeScript**

## Getting Started

From the monorepo root:

```bash
pnpm install
```

Run the demo:

```bash
cd apps/react/activity/document/custom/activity-log-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-activity-document-custom-activity-log-demo dev
```

Open [http://localhost:3000](http://localhost:3000). To see activity sync between users, open the same `?documentId=...` URL in two browser profiles signed in as different users.

## Optional Extensions

- **Immutability** — enable in the Velt Console to make activity records tamper-evident (audit/compliance).
- **Server-side management** — use the Velt REST API (`/v2/activities/*`) to add/get/delete activities from a backend.
- **Action-type filters** — scope the feed with `CommentActivityActionTypes` / `ReactionActivityActionTypes` constants from `@veltdev/react`.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 📝 [Activity Logs](https://docs.velt.dev/async-collaboration/activity/overview)
- 🎨 [Use Cases](https://velt.dev/use-case)
