# Highcharts Comments Demo: Monthly Traffic Report

## Overview

This demo showcases **Velt Comments pinned to Highcharts data points**. The scenario is a **website traffic report**: a "Monthly Traffic Report" page with a sessions-by-channel line chart (Organic and Paid series) and a monthly conversions column chart. In comment mode, reviewers click an exact data point ("what drove the W6 paid spike?") and the comment pins to that value, staying anchored across theme changes, resizes, and reloads.

Built per the [Highcharts Comments Setup docs](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts).

## Path

```
apps/react/comments/charts/highcharts/highcharts-comments-demo/
```

## Package Name

`@apps/react-comments-charts-highcharts-highcharts-comments-demo`

## How data-point pinning works

Unlike the ChartJS demo (which hand-rolls manual comments and pin rendering), the Highcharts integration is component-based. `VeltHighChartComments` owns the whole flow:

- Each chart wrapper is `position: relative` and renders `<VeltHighChartComments id chartComputedData Highcharts dialogMetadataTemplate />` as a sibling of `<HighchartsReact>`.
- A unique `id` per chart (`sessionsLineChart`, `conversionsColumnChart`) scopes comments to that chart.
- `chartComputedData` receives the populated `HighchartsReact` ref. The component captures this prop at first mount, so it renders only after the chart exists (a `chartReady` state set in the `callback` prop of `HighchartsReact`).
- Passing the `Highcharts` instance wires Highcharts' `redraw` event, which is how pins reposition after theme-driven `chart.update()` calls, window resizes, and legend toggles.
- `dialogMetadataTemplate={['groupId', 'label', 'value']}` controls the data-point metadata shown in the comment dialog.
- Comments are matched to points by series name + label + value, so series names and data must stay stable.

## Features

- **Two commentable charts**: line (2 series) and column, both theme-aware via a shared options builder (`highchartsTheme.ts`).
- **Comment-mode UX**: crosshair cursor and a hint banner while the comment tool is active.
- **Comments sidebar**: embedded `VeltCommentsSidebar` in a right drawer.
- **VeltComments extras**: `priority` (P0 to P2), `autoCategorize` (AI Question/Feedback/Bug labels), `commentIndex`.
- **Standard scaffold**: presence, notifications, light/dark theme, two demo users.

## Key Files

| File | Purpose |
|------|---------|
| `components/charts/SessionsLineChart.tsx` | Line chart + `VeltHighChartComments` wiring |
| `components/charts/ConversionsColumnChart.tsx` | Column chart + `VeltHighChartComments` wiring |
| `components/charts/highchartsTheme.ts` | Theme-aware Highcharts options builder |
| `components/dashboard/DashboardGrid.tsx` | Metric cards + chart cards + comment-mode hint |
| `components/comments/CommentsPanel.tsx` | Always-mounted drawer hosting `VeltCommentsSidebar` |

## Key Technologies

- **Next.js 16** with React 19 (strict mode off)
- **@veltdev/react** `5.0.2-beta.34`
- **highcharts** `^13.0.0` + **highcharts-react-official** `^3.2.3`
- **Tailwind CSS v3.4**, **TypeScript**

## Getting Started

From the monorepo root:

```bash
pnpm install
```

Run the demo:

```bash
cd apps/react/comments/charts/highcharts/highcharts-comments-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-charts-highcharts-highcharts-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000). To see comments sync between users, open the same `?documentId=...` URL in two browser profiles signed in as different users.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 📈 [Highcharts Comments Setup](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts)
- 🎨 [Use Cases](https://velt.dev/use-case)
