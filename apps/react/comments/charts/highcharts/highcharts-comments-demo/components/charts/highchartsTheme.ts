import type { Options } from 'highcharts'

export type ResolvedTheme = 'light' | 'dark'

// Highcharts paints to SVG with explicit colors, so these pairs mirror the
// app's --app-* palette per theme.
const PALETTE = {
  light: {
    grid: 'rgba(0,0,0,0.08)',
    axisLine: 'rgba(0,0,0,0.15)',
    tick: 'rgba(0,0,0,0.52)',
    legend: 'rgba(0,0,0,0.72)',
    tooltipBg: '#ffffff',
    tooltipText: '#000000',
    tooltipBorder: 'rgba(0,0,0,0.12)',
  },
  dark: {
    grid: 'rgba(255,255,255,0.08)',
    axisLine: 'rgba(255,255,255,0.18)',
    tick: 'rgba(255,255,255,0.55)',
    legend: 'rgba(255,255,255,0.75)',
    tooltipBg: '#1a1a1a',
    tooltipText: '#ffffff',
    tooltipBorder: 'rgba(255,255,255,0.12)',
  },
} as const

// Series accents (readable on both themes)
export const ACCENTS = {
  organic: '#6366f1', // indigo
  paid: '#10b981',    // emerald
  columns: '#6366f1', // indigo
} as const

/**
 * Shared Highcharts options for both dashboard charts. Theme changes rebuild
 * options, HighchartsReact runs chart.update, and the resulting redraw event
 * lets VeltHighChartComments reposition its pins.
 */
export function buildBaseOptions(theme: ResolvedTheme): Options {
  const palette = PALETTE[theme]
  return {
    chart: {
      backgroundColor: 'transparent',
      style: { fontFamily: 'inherit' },
      height: 300,
    },
    title: { text: undefined },
    credits: { enabled: false },
    // The accessibility module isn't loaded; disabling avoids a console warning
    accessibility: { enabled: false },
    xAxis: {
      labels: { style: { color: palette.tick, fontSize: '11px' } },
      lineColor: palette.axisLine,
      tickColor: palette.axisLine,
      gridLineColor: palette.grid,
    },
    yAxis: {
      title: { text: undefined },
      labels: { style: { color: palette.tick, fontSize: '11px' } },
      gridLineColor: palette.grid,
    },
    legend: {
      itemStyle: { color: palette.legend, fontWeight: '500', fontSize: '11px' },
      itemHoverStyle: { color: palette.legend },
    },
    tooltip: {
      backgroundColor: palette.tooltipBg,
      borderColor: palette.tooltipBorder,
      style: { color: palette.tooltipText },
    },
    plotOptions: {
      series: {
        animation: { duration: 200 },
      },
    },
  }
}
