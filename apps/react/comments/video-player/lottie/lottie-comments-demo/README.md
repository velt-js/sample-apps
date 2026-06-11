# Lottie Comments Demo — Motion Design Review

## Overview

This demo showcases **Velt Comments on a Lottie animation player**. The scenario is a **motion design review**: an animator shares "Brand Intro v3" and reviewers pin comments to exact frames. Comments appear as bubbles on the player's seek bar (`VeltCommentPlayerTimeline`); clicking a bubble or a sidebar comment seeks the animation back to that frame.

Built per the [Lottie Player Setup docs](https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup).

## Path

```
apps/react/comments/video-player/lottie/lottie-comments-demo/
```

## Package Name

`@apps/react-comments-video-player-lottie-lottie-comments-demo`

## How frame pinning works

- The media unit is the **frame** (the bundled animation has 144 frames at 30fps).
- Pausing, seeking, or activating the comment tool calls `client.setLocation({ currentMediaPosition: frame, videoPlayerId: 'lottiePlayer', ... })` — `currentMediaPosition` is the protected key the SDK uses to place bubbles proportionally on the timeline.
- Playing calls `client.removeLocation()` so frame-pinned comments don't linger over moving frames.
- `commentElement.setTotalMediaLength(totalFrames)` tells the timeline the scale.
- Clicking a timeline bubble or sidebar comment pauses, `goToAndStop(frame)`, and restores that comment's Location.

## Features

- **Custom minimal player** — play/pause, click-to-seek progress bar, live frame counter, built on `lottie-web`.
- **Frame-pinned comments** — `VeltComments` with `priority`, `autoCategorize` (AI labels: Question/Feedback/Bug), `commentIndex`, and `allowedElementIds={['lottiePlayer']}` so pins land only on the canvas.
- **Timeline bubbles** — `VeltCommentPlayerTimeline` overlaid on the custom seek bar (sibling of the player, non-static parent, per docs).
- **Embedded comments sidebar** — `VeltCommentsSidebar embedMode` in a right drawer; `onCommentClick` seeks the player.
- **Reactions** — `VeltReactionTool videoPlayerId="lottiePlayer"` pins emoji reactions to frames.
- **Standard scaffold** — presence, notifications, light/dark theme, two demo users.

> **Note:** `reactStrictMode` is explicitly `false` in `next.config.js` — required by `VeltCommentPlayerTimeline`.

## Key Files

| File | Purpose |
|------|---------|
| `components/player/LottiePlayer.tsx` | Player + all Velt location/timeline wiring |
| `components/comments/CommentsPanel.tsx` | Always-mounted drawer hosting `VeltCommentsSidebar` |
| `components/velt/VeltCollaboration.tsx` | `VeltComments` config (priority, AI categorize, allowedElementIds) |
| `components/document/DocumentArticle.tsx` | The review page (title, status, callout, player) |
| `public/assets/lottie/brand-intro.json` | The reviewed animation (local asset, 144 frames) |

## Key Technologies

- **Next.js 16** with React 19 (strict mode off)
- **@veltdev/react** `5.0.2-beta.34`
- **lottie-web** `^5.12.2` (SVG renderer)
- **Tailwind CSS v3.4**, **TypeScript**

## Getting Started

From the monorepo root:

```bash
pnpm install
```

Run the demo:

```bash
cd apps/react/comments/video-player/lottie/lottie-comments-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-video-player-lottie-lottie-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000). To see comments sync between users, open the same `?documentId=...` URL in two browser profiles signed in as different users.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 🎬 [Lottie Player Setup](https://docs.velt.dev/async-collaboration/comments/setup/lottie-player-setup)
- 🎨 [Use Cases](https://velt.dev/use-case)
