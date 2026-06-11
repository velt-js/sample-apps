'use client'

import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from '@/components/theme/ThemeContext'
import { useChartComments } from '@/hooks/useChartComments'
import { ACCENTS, buildChartOptions } from './chartTheme'

const LABELS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']
const ACTIVE_USERS = [28.1, 29.4, 30.2, 29.8, 31.5, 33.0, 32.4, 34.1, 35.6, 36.2, 37.8, 38.4]

/**
 * Weekly active users line chart. pointRadius/pointHitRadius keep the points
 * easy to hit with intersect:true clicks in comment mode.
 */
export default function ActiveUsersLineChart() {
  const { resolvedTheme } = useTheme()
  // [Velt] Manual data-point comments for this chart
  const { chartRef, handleChartClick, pins, isCommentMode, notifyChartRender } =
    useChartComments('activeUsersLineChart')

  const data = useMemo(() => ({
    labels: LABELS,
    datasets: [
      {
        label: 'Active Users (K)',
        data: ACTIVE_USERS,
        borderColor: ACCENTS.line.border,
        backgroundColor: ACCENTS.line.fill,
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHitRadius: 10,
        pointBackgroundColor: ACCENTS.line.border,
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
      <Line ref={chartRef as never} data={data} options={options as never} />
      {pins}
    </div>
  )
}
