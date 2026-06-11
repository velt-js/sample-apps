'use client'

import { useMemo, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// [Velt] VeltHighChartComments owns click-to-comment and pin rendering for a
// Highcharts chart; useCommentModeState drives the crosshair cursor
import { VeltHighChartComments, useCommentModeState } from '@veltdev/react'
import { useTheme } from '@/components/theme/ThemeContext'
import { ACCENTS, buildBaseOptions } from './highchartsTheme'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const CONVERSIONS = [1180, 1340, 1095, 1520, 1685, 1840]

/**
 * Monthly conversions column chart. Series name and data must stay stable:
 * VeltHighChartComments matches each comment to its data point by series
 * name, label, and value.
 */
export default function ConversionsColumnChart() {
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
      chart: { ...base.chart, type: 'column' },
      xAxis: { ...base.xAxis, categories: [...MONTHS] },
      series: [
        {
          type: 'column',
          name: 'Conversions',
          data: [...CONVERSIONS],
          color: ACCENTS.columns,
          borderColor: 'transparent',
          borderRadius: 4,
        },
      ],
    }
  }, [resolvedTheme])

  return (
    /* [Velt] position:relative so the comment pins anchor to this container.
       The container id is whitelisted via allowedElementIds, which limits
       commenting to the charts. */
    <div
      id="conversionsColumnChartContainer"
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
          id="conversionsColumnChart"
          chartComputedData={chartComponentRef.current}
          Highcharts={Highcharts}
          dialogMetadataTemplate={['groupId', 'label', 'value']}
        />
      )}
    </div>
  )
}
