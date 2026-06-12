export type ResolvedTheme = 'light' | 'dark'

// Nivo paints SVG with explicit colors, so these pairs mirror the app's
// --app-* palette per theme.
export const PALETTE = {
  light: {
    grid: 'rgba(0,0,0,0.08)',
    axisLine: 'rgba(0,0,0,0.15)',
    tick: 'rgba(0,0,0,0.52)',
    legend: 'rgba(0,0,0,0.72)',
    tooltipBg: '#ffffff',
    tooltipText: '#000000',
  },
  dark: {
    grid: 'rgba(255,255,255,0.08)',
    axisLine: 'rgba(255,255,255,0.18)',
    tick: 'rgba(255,255,255,0.55)',
    legend: 'rgba(255,255,255,0.75)',
    tooltipBg: '#1a1a1a',
    tooltipText: '#ffffff',
  },
} as const

// Series accents (readable on both themes)
export const ACCENTS = {
  allUsers: '#6366f1',   // indigo
  powerUsers: '#10b981', // emerald
} as const

export const PLAN_COLORS: Record<string, string> = {
  Free: '#94a3b8',       // slate
  Pro: '#6366f1',        // indigo
  Team: '#10b981',       // emerald
  Enterprise: '#f59e0b', // amber
}

/**
 * Shared Nivo theme object for both dashboard charts. Theme changes rebuild
 * this object, the charts re-render, and the Velt comment layer re-runs with
 * fresh geometry so pins stay anchored to their data points.
 */
export function buildNivoTheme(theme: ResolvedTheme) {
  const palette = PALETTE[theme]
  return {
    axis: {
      ticks: {
        text: { fill: palette.tick, fontSize: 11 },
        line: { stroke: palette.axisLine },
      },
      legend: {
        text: { fill: palette.legend, fontSize: 11 },
      },
      domain: {
        line: { stroke: palette.axisLine },
      },
    },
    grid: {
      line: { stroke: palette.grid },
    },
    legends: {
      text: { fill: palette.legend, fontSize: 11 },
    },
    tooltip: {
      container: {
        background: palette.tooltipBg,
        color: palette.tooltipText,
        fontSize: 12,
        borderRadius: 8,
      },
    },
  }
}
