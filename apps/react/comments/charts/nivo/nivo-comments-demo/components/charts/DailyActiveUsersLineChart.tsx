'use client'

import { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
// [Velt] VeltNivoChartComments renders hover-revealed comment tools on every
// data point; it runs as a custom Nivo layer that receives the chart's
// computed geometry
import { VeltNivoChartComments, useCommentModeState } from '@veltdev/react'
import { useTheme } from '@/components/theme/ThemeContext'
import { ACCENTS, buildNivoTheme } from './nivoTheme'

// Series ids and data must stay stable: Velt matches each comment to its data
// point by groupId (series id), label (x), and value (y).
const DAU_DATA = [
  {
    id: 'All users',
    data: [
      { x: 'W1', y: 19.2 }, { x: 'W2', y: 19.8 }, { x: 'W3', y: 20.6 },
      { x: 'W4', y: 20.1 }, { x: 'W5', y: 21.4 }, { x: 'W6', y: 22.3 },
      { x: 'W7', y: 22.0 }, { x: 'W8', y: 23.1 }, { x: 'W9', y: 23.8 },
      { x: 'W10', y: 24.0 }, { x: 'W11', y: 24.5 }, { x: 'W12', y: 24.8 },
    ],
  },
  {
    id: 'Power users',
    data: [
      { x: 'W1', y: 6.1 }, { x: 'W2', y: 6.4 }, { x: 'W3', y: 6.2 },
      { x: 'W4', y: 6.8 }, { x: 'W5', y: 7.1 }, { x: 'W6', y: 7.6 },
      { x: 'W7', y: 7.4 }, { x: 'W8', y: 7.9 }, { x: 'W9', y: 8.3 },
      { x: 'W10', y: 8.6 }, { x: 'W11', y: 8.9 }, { x: 'W12', y: 9.2 },
    ],
  },
]

/**
 * Weekly DAU line chart (values in thousands). Hovering a point reveals the
 * Velt comment tool for that exact data point.
 */
export default function DailyActiveUsersLineChart() {
  const { resolvedTheme } = useTheme()
  // [Velt] While comment mode is on, every data-point comment icon is shown
  // (comment-mode-on class, styled in globals.css)
  const commentMode = useCommentModeState()
  const nivoTheme = useMemo(
    () => buildNivoTheme(resolvedTheme === 'dark' ? 'dark' : 'light'),
    [resolvedTheme]
  )

  return (
    /* [Velt] The nivo-chart-container class is required: the SDK's injected
       CSS positions and reveals the per-point comment tools through it */
    <div
      id="dauLineChartContainer"
      className={`nivo-chart-container${commentMode ? ' comment-mode-on' : ''}`}
      style={{ position: 'relative', height: 300 }}
    >
      <ResponsiveLine
        data={DAU_DATA}
        theme={nivoTheme}
        colors={[ACCENTS.allUsers, ACCENTS.powerUsers]}
        margin={{ top: 24, right: 24, bottom: 64, left: 44 }}
        enablePoints={true}
        pointSize={8}
        pointColor={{ from: 'seriesColor' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        enableGridX={false}
        axisBottom={{ tickSize: 0, tickPadding: 8 }}
        axisLeft={{ tickSize: 0, tickPadding: 8 }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 16,
            symbolSize: 10,
            symbolShape: 'circle',
          },
        ]}
        layers={[
          'grid', 'markers', 'axes', 'areas', 'crosshair',
          'lines', 'slices', 'legends', 'points',
          // [Velt] Custom layer: receives the chart's computed geometry and
          // renders a hover comment tool on every point, scoped by id.
          // Nivo 0.99 renamed point.serieId to point.seriesId; the Velt layer
          // reads the old name for the comment's groupId, so map it back.
          (chartComputedData) => (
            <VeltNivoChartComments
              id="dauLineChart"
              chartComputedData={{
                ...chartComputedData,
                points: chartComputedData.points?.map((point) => ({
                  ...point,
                  serieId: point.seriesId,
                })),
              }}
              dialogMetadataTemplate={['groupId', 'label', 'value']}
            />
          ),
        ]}
      />
    </div>
  )
}
