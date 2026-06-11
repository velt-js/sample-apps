'use client'

import { useMemo, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// [Velt] VeltHighChartComments owns click-to-comment and pin rendering for a
// Highcharts chart; useCommentModeState drives the crosshair cursor
import { VeltHighChartComments, useCommentModeState } from '@veltdev/react'
import { useTheme } from '@/components/theme/ThemeContext'
import { ACCENTS, buildBaseOptions } from './highchartsTheme'

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']
const ORGANIC = [8.4, 9.1, 9.8, 9.5, 10.6, 11.2, 10.9, 11.8, 12.4, 12.1, 13.0, 13.6]
const PAID = [4.2, 4.0, 4.6, 5.1, 4.8, 5.4, 5.9, 5.6, 6.2, 6.8, 6.5, 7.1]

/**
 * Weekly sessions by channel. Series names and data must stay stable:
 * VeltHighChartComments matches each comment to its data point by series
 * name, label, and value.
 */
export default function SessionsLineChart() {
  const { resolvedTheme } = useTheme()
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  // [Velt] VeltHighChartComments captures chartComputedData at first mount,
  // so it must render only after the chart instance exists
  const [chartReady, setChartReady] = useState(false)
  const commentMode = useCommentModeState()

  const options = useMemo<Highcharts.Options>(() => {
    const base = buildBaseOptions(resolvedTheme === 'dark' ? 'dark' : 'light')
    return {
      ...base,
      chart: { ...base.chart, type: 'line' },
      xAxis: { ...base.xAxis, categories: [...WEEKS] },
      series: [
        {
          type: 'line',
          name: 'Organic',
          data: [...ORGANIC],
          color: ACCENTS.organic,
          marker: { enabled: true, radius: 4 },
        },
        {
          type: 'line',
          name: 'Paid',
          data: [...PAID],
          color: ACCENTS.paid,
          marker: { enabled: true, radius: 4 },
        },
      ],
    }
  }, [resolvedTheme])

  return (
    /* [Velt] position:relative so the comment pins anchor to this container.
       The container id is whitelisted via allowedElementIds, which limits
       commenting to the charts. */
    <div
      id="sessionsLineChartContainer"
      style={{ position: 'relative', cursor: commentMode ? 'crosshair' : 'default' }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        callback={() => setChartReady(true)}
      />
      {chartReady && chartComponentRef.current && (
        /* [Velt] Click-to-comment + pins for this chart, scoped by id.
           Passing Highcharts wires the redraw event so pins reposition on
           theme changes, resizes, and legend toggles. */
        <VeltHighChartComments
          id="sessionsLineChart"
          chartComputedData={chartComponentRef.current}
          Highcharts={Highcharts}
          dialogMetadataTemplate={['groupId', 'label', 'value']}
        />
      )}
    </div>
  )
}
