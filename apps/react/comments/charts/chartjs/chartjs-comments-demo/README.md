# ChartJS Comments Demo — Q2 Revenue Review

## Overview

This demo showcases **Velt Comments pinned to Chart.js data points**. The scenario is a **revenue review dashboard**: a "Q2 Revenue Review" page with a monthly revenue bar chart and a weekly active users line chart. In comment mode, reviewers click an exact data point ("why did March dip?") and the comment pins to that value — staying anchored across theme changes, window resizes, and reloads.

Built per the [ChartJS Comments Setup docs](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs).

## Path

```
apps/react/comments/charts/chartjs/chartjs-comments-demo/
```

## Package Name

`@apps/react-comments-charts-chartjs-chartjs-comments-demo`

## How data-point pinning works

- Each chart's wrapper div has `position: relative` and `data-velt-manual-comment-container="true"`, which tells Velt to use it for positioning and disables automatic pin placement inside it; a unique `chartId` scopes comments per chart.
- On click in comment mode, `chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false)` finds the data point; the comment is created via `client.getCommentElement().addManualComment({ context })` with `context = { seriesId, xValue, yValue, chartId }`.
- Pins are self-rendered: `useCommentAnnotations()` is filtered by `context.chartId`, each annotation's position is resolved from the live chart scales (`chart.scales.x/y.getPixelForValue`), and a `<VeltCommentPin annotationId />` is rendered at that pixel.
- Positions recompute via Chart.js `animation.onComplete` (initial render, theme switches, resize re-layouts) plus a window resize listener — see `hooks/useChartComments.tsx`.

## Features

- **Two commentable charts** — bar (`react-chartjs-2` `<Bar>`) and line (`<Line>`), sharing one `useChartComments(chartId)` hook for all manual-comment logic.
- **Theme-aware charts** — grid/tick/legend/tooltip colors derive from the app theme (`chartTheme.ts`); pins re-anchor after the theme-driven re-render.
- **Comment-mode UX** — crosshair cursor + a hint banner while the comment tool is active; clicks on chart whitespace do nothing (`intersect: true`).
- **Comments sidebar** — embedded `VeltCommentsSidebar` in a right drawer; clicking a thread opens its pin's dialog.
- **VeltComments extras** — `priority` (P0–P2), `autoCategorize` (AI Question/Feedback/Bug labels), `commentIndex`.
- **Standard scaffold** — presence, notifications, light/dark theme, two demo users.

## Key Files

| File | Purpose |
|------|---------|
| `hooks/useChartComments.tsx` | All Velt manual-comment wiring (click → addManualComment, pin rendering from chart scales) |
| `components/charts/chartTheme.ts` | Chart.js registration + theme-aware option builder |
| `components/charts/RevenueBarChart.tsx` | Monthly revenue bar chart |
| `components/charts/ActiveUsersLineChart.tsx` | Weekly active users line chart |
| `components/dashboard/DashboardGrid.tsx` | Metric cards + chart cards + comment-mode hint |
| `components/comments/CommentsPanel.tsx` | Always-mounted drawer hosting `VeltCommentsSidebar` |

## Key Technologies

- **Next.js 16** with React 19 (strict mode off)
- **@veltdev/react** `5.0.2-beta.34`
- **chart.js** `^4.5.1` + **react-chartjs-2** `^5.3.1`
- **Tailwind CSS v3.4**, **TypeScript**

## Getting Started

From the monorepo root:

```bash
pnpm install
```

Run the demo:

```bash
cd apps/react/comments/charts/chartjs/chartjs-comments-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-charts-chartjs-chartjs-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000). To see comments sync between users, open the same `?documentId=...` URL in two browser profiles signed in as different users.

> **Note:** chart labels and dataset names are part of each comment's context — pins resolve their position by matching `seriesId` + `xValue` + `yValue` against the live chart data, so don't rename or reorder data after comments exist.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 📊 [ChartJS Comments Setup](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs)
- 🎨 [Use Cases](https://velt.dev/use-case)
