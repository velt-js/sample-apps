'use client'

import { useMemo } from 'react'
import { ResponsivePie } from '@nivo/pie'
// [Velt] VeltNivoChartComments renders hover-revealed comment tools on every
// pie slice; it runs as a custom Nivo layer that receives the chart's
// computed arcs
import { VeltNivoChartComments, useCommentModeState } from '@veltdev/react'
import { useTheme } from '@/components/theme/ThemeContext'
import { PALETTE, PLAN_COLORS, buildNivoTheme } from './nivoTheme'

// Labels and values must stay stable: Velt matches each comment to its slice
// by label and value.
const PLAN_DATA = [
  { id: 'Free', label: 'Free', value: 46 },
  { id: 'Pro', label: 'Pro', value: 28 },
  { id: 'Team', label: 'Team', value: 17 },
  { id: 'Enterprise', label: 'Enterprise', value: 9 },
]

/**
 * Subscription plan mix (percent of accounts). Hovering a slice reveals the
 * Velt comment tool just outside the arc at its mid-angle.
 */
export default function PlanMixPieChart() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'
  // [Velt] While comment mode is on, every slice comment icon is shown
  // (comment-mode-on class, styled in globals.css)
  const commentMode = useCommentModeState()
  const nivoTheme = useMemo(() => buildNivoTheme(theme), [theme])

  return (
    /* [Velt] The nivo-chart-container class is required: the SDK's injected
       CSS positions and reveals the per-slice comment tools through it */
    <div
      id="planMixPieChartContainer"
      className={`nivo-chart-container${commentMode ? ' comment-mode-on' : ''}`}
      style={{ position: 'relative', height: 300 }}
    >
      <ResponsivePie
        data={PLAN_DATA}
        theme={nivoTheme}
        colors={(d) => PLAN_COLORS[d.id as string]}
        /* Generous margins so the comment pins beyond the outer radius are
           not clipped */
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.55}
        padAngle={1}
        cornerRadius={4}
        arcLinkLabelsTextColor={PALETTE[theme].legend}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsTextColor="#ffffff"
        layers={[
          'arcs', 'arcLinkLabels', 'arcLabels', 'legends',
          // [Velt] Custom layer: receives the computed arcs and renders a
          // hover comment tool per slice; dialog shows label + value
          (chartComputedData) => (
            <VeltNivoChartComments
              id="planMixPieChart"
              chartComputedData={chartComputedData}
            />
          ),
        ]}
      />
    </div>
  )
}
