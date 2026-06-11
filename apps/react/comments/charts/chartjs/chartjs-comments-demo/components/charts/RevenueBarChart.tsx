'use client'

import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '@/components/theme/ThemeContext'
import { useChartComments } from '@/hooks/useChartComments'
import { ACCENTS, buildChartOptions } from './chartTheme'

const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const REVENUE = [620, 740, 565, 810, 925, 1040]

/**
 * Monthly revenue bar chart. Dataset label doubles as the comment context's
 * seriesId, and labels must stay stable — pins resolve their position by
 * matching label + value against the live chart data.
 */
export default function RevenueBarChart() {
  const { resolvedTheme } = useTheme()
  // [Velt] Manual data-point comments for this chart
  const { chartRef, handleChartClick, pins, isCommentMode, notifyChartRender } =
    useChartComments('revenueBarChart')

  const data = useMemo(() => ({
    labels: LABELS,
    datasets: [
      {
        label: 'Revenue ($K)',
        data: REVENUE,
        backgroundColor: ACCENTS.bar.fill,
        borderColor: ACCENTS.bar.border,
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  }), [])

  const options = useMemo(
    () => buildChartOptions(resolvedTheme === 'dark' ? 'dark' : 'light', notifyChartRender),
    [resolvedTheme, notifyChartRender]
  )

  return (
    /* [Velt] position:relative + data-velt-manual-comment-container let Velt
       position pins manually inside this div, scoped to this chart */
    <div
      style={{ position: 'relative', height: 300, cursor: isCommentMode ? 'crosshair' : 'default' }}
      onClick={handleChartClick}
      data-velt-manual-comment-container="true"
    >
      <Bar ref={chartRef as never} data={data} options={options as never} />
      {pins}
    </div>
  )
}
