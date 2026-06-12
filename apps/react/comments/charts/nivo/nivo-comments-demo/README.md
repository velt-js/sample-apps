# Nivo Comments Demo: Q2 Product Usage Review

## Overview

This demo showcases **Velt Comments on Nivo charts**. The scenario is a **product usage review**: a "Q2 Product Usage Review" page with a daily active users line chart (All users and Power users series) and a subscription plan-mix pie chart. Reviewers hover any data point or pie slice and click the comment icon that appears to start a thread on that exact value. Pins persist across theme changes, resizes, and reloads.

Built per the [NivoCharts Comments Setup docs](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/nivo-charts).

## Path

```
apps/react/comments/charts/nivo/nivo-comments-demo/
```

## Package Name

`@apps/react-comments-charts-nivo-nivo-comments-demo`

## How the integration works

Nivo's integration is layer-based, and differs from the other two chart demos (ChartJS hand-rolls manual comments; Highcharts uses a ref-based sibling component):

- A custom function is appended to each chart's `layers` array. Nivo calls it with the chart's computed geometry (`points` for lines, `dataWithArc` plus center coordinates for pies), and it returns `<VeltNivoChartComments id chartComputedData />`.
- The container div must have the `nivo-chart-container` class (the SDK's injected CSS positions and reveals the per-point comment tools through it) plus an explicit height.
- **Hover or comment mode**: the SDK renders a comment tool on every data point. By default it only appears when its own small hover target is hovered, so this demo adds CSS that reveals every icon when the chart is hovered, plus a `comment-mode-on` class (driven by `useCommentModeState()`) that keeps them all visible while the header comment tool is active. `allowedElementIds` points at an id that exists nowhere on the page so freestyle comment-mode clicks never create a pin; the per-point tools use their own chart-comment flow and are unaffected.
- A unique `id` per chart (`dauLineChart`, `planMixPieChart`) scopes comments to that chart. `dialogMetadataTemplate` controls the metadata in the dialog (line: groupId/label/value; pie defaults to label/value).
- Comments are matched to points by series id + label + value, so series ids and data must stay stable.

## Features

- **Line + pie charts**: pie/arc comment support is unique to the Nivo integration among Velt's chart setups.
- **Theme-aware charts**: a shared Nivo `theme` object builder (`nivoTheme.ts`) keyed by the app theme; pins re-anchor automatically because the Velt layer re-runs on every chart render.
- **Comments sidebar**: embedded `VeltCommentsSidebar` in a right drawer.
- **VeltComments extras**: `priority` (P0 to P2), `autoCategorize` (AI Question/Feedback/Bug labels), `commentIndex`.
- **Standard scaffold**: presence, notifications, light/dark theme, two demo users.

## Key Files

| File | Purpose |
|------|---------|
| `components/charts/DailyActiveUsersLineChart.tsx` | ResponsiveLine + Velt comment layer |
| `components/charts/PlanMixPieChart.tsx` | ResponsivePie + Velt comment layer |
| `components/charts/nivoTheme.ts` | Theme-aware Nivo theme builder + palette |
| `components/dashboard/DashboardGrid.tsx` | Metric cards + chart cards |
| `components/comments/CommentsPanel.tsx` | Always-mounted drawer hosting `VeltCommentsSidebar` |

## Key Technologies

- **Next.js 16** with React 19 (strict mode off)
- **@veltdev/react** `5.0.2-beta.34`
- **@nivo/line** + **@nivo/pie** `^0.99.0` (React 19 compatible)
- **Tailwind CSS v3.4**, **TypeScript**

## Getting Started

From the monorepo root:

```bash
pnpm install
```

Run the demo:

```bash
cd apps/react/comments/charts/nivo/nivo-comments-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-charts-nivo-nivo-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000). To see comments sync between users, open the same `?documentId=...` URL in two browser profiles signed in as different users.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 📊 [NivoCharts Comments Setup](https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/nivo-charts)
- 🎨 [Use Cases](https://velt.dev/use-case)
