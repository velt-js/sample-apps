import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js'

// Register the Chart.js pieces used by both dashboard charts (once per app)
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export type ResolvedTheme = 'light' | 'dark'

// Chart.js paints to canvas and can't read the --app-* CSS vars directly, so
// these pairs mirror the app palette per theme.
const PALETTE = {
  light: {
    grid: 'rgba(0,0,0,0.08)',
    tick: 'rgba(0,0,0,0.52)',
    legend: 'rgba(0,0,0,0.72)',
    tooltipBg: '#ffffff',
    tooltipText: '#000000',
    tooltipBorder: 'rgba(0,0,0,0.12)',
  },
  dark: {
    grid: 'rgba(255,255,255,0.08)',
    tick: 'rgba(255,255,255,0.55)',
    legend: 'rgba(255,255,255,0.75)',
    tooltipBg: '#1a1a1a',
    tooltipText: '#ffffff',
    tooltipBorder: 'rgba(255,255,255,0.12)',
  },
} as const

// Dataset accents (same in both themes; chosen to read well on either bg)
export const ACCENTS = {
  bar: { fill: 'rgba(99,102,241,0.65)', border: '#6366f1' },      // indigo
  line: { fill: 'rgba(16,185,129,0.15)', border: '#10b981' },     // emerald
} as const

/**
 * Shared Chart.js options. `onRenderComplete` is wired to animation.onComplete
 * so comment pins recompute their positions once the scales are final
 * (initial render, theme switch, and resize re-layouts).
 */
export function buildChartOptions(theme: ResolvedTheme, onRenderComplete: () => void): ChartOptions<'bar' | 'line'> {
  const palette = PALETTE[theme]
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 300,
      onComplete: onRenderComplete,
    },
    scales: {
      x: {
        grid: { color: palette.grid },
        ticks: { color: palette.tick },
      },
      y: {
        grid: { color: palette.grid },
        ticks: { color: palette.tick },
      },
    },
    plugins: {
      legend: {
        labels: { color: palette.legend, boxWidth: 12 },
      },
      tooltip: {
        backgroundColor: palette.tooltipBg,
        titleColor: palette.tooltipText,
        bodyColor: palette.tooltipText,
        borderColor: palette.tooltipBorder,
        borderWidth: 1,
      },
    },
  }
}
