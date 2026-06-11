'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Chart as ChartJS } from 'chart.js'
// [Velt] VeltCommentPin renders a comment pin we position manually;
// useCommentModeState tells us when the comment tool is active;
// useCommentAnnotations subscribes to all comment threads on the document
import {
  VeltCommentPin,
  useCommentAnnotations,
  useCommentModeState,
  useVeltClient,
} from '@veltdev/react'

/**
 * Shared manual-comment wiring for a Chart.js chart, per the Velt ChartJS
 * setup docs. In comment mode, clicking a data point creates a comment whose
 * context stores { seriesId, xValue, yValue, chartId }; pins are then rendered
 * by this hook at pixel positions computed from the chart's scales, so they
 * stay anchored to the data point across theme changes and resizes.
 */
export function useChartComments(chartId: string) {
  const chartRef = useRef<ChartJS | null>(null)
  // Bumped whenever the chart finishes a render pass (animation.onComplete)
  // or the window resizes — chartRef mutations alone don't re-render React,
  // so this tick drives pin-position recomputation.
  const [renderTick, setRenderTick] = useState(0)

  // [Velt] Client (for addManualComment), comment mode, live annotations
  const { client } = useVeltClient()
  const commentModeState = useCommentModeState()
  const commentAnnotations = useCommentAnnotations()

  const clientRef = useRef(client)
  clientRef.current = client
  const commentModeRef = useRef(commentModeState)
  commentModeRef.current = commentModeState

  const notifyChartRender = useCallback(() => {
    setRenderTick((tick) => tick + 1)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', notifyChartRender)
    return () => window.removeEventListener('resize', notifyChartRender)
  }, [notifyChartRender])

  // [Velt] On click in comment mode: find the nearest data point and create a
  // manual comment carrying the data-point context
  const handleChartClick = useCallback((event: React.MouseEvent) => {
    const chart = chartRef.current
    if (!chart || !commentModeRef.current || !clientRef.current) return
    const elements = chart.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      false
    )
    if (!elements.length) return
    const { datasetIndex, index } = elements[0]
    const dataset = chart.data.datasets[datasetIndex]
    const context = {
      seriesId: dataset.label,
      xValue: chart.data.labels?.[index],
      yValue: dataset.data[index],
      chartId,
    }
    try {
      // [Velt] Creates the comment thread with our data-point context
      clientRef.current.getCommentElement().addManualComment({ context })
    } catch (error) {
      console.error('[chartjs-comments-demo] Error adding manual comment', error)
    }
  }, [chartId])

  // Resolve a data point's current pixel position from the chart scales
  const findPoint = useCallback((seriesId: unknown, xValue: unknown, yValue: unknown) => {
    const chart = chartRef.current
    if (!chart) return null
    const dataset = chart.data.datasets.find((d) => d.label === seriesId)
    const index = chart.data.labels?.indexOf(xValue) ?? -1
    if (!dataset || index === -1 || dataset.data[index] !== yValue) return null
    return {
      x: chart.scales.x.getPixelForValue(index),
      y: chart.scales.y.getPixelForValue(yValue as number),
    }
  }, [])

  // [Velt] Pins for this chart only (annotations filtered by chartId),
  // absolutely positioned inside the data-velt-manual-comment-container div
  const pins = useMemo(() => {
    // renderTick dependency keeps positions in sync with the latest layout
    void renderTick
    const chartAnnotations = (commentAnnotations ?? []).filter(
      (annotation) => annotation.context?.chartId === chartId
    )
    return chartAnnotations.map((annotation) => {
      const context = annotation.context ?? {}
      const point = findPoint(context.seriesId, context.xValue, context.yValue)
      if (!point) return null
      return (
        <div
          key={annotation.annotationId}
          style={{
            position: 'absolute',
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: 'translate(0%, -100%)',
            zIndex: 1000,
          }}
        >
          {/* [Velt] The pin opens this annotation's comment dialog */}
          <VeltCommentPin annotationId={annotation.annotationId} />
        </div>
      )
    })
  }, [commentAnnotations, chartId, findPoint, renderTick])

  return {
    chartRef,
    handleChartClick,
    pins,
    isCommentMode: !!commentModeState,
    notifyChartRender,
  }
}
