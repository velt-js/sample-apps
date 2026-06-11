'use client'

interface MetricCardProps {
  label: string
  value: string
  delta: string
  deltaPositive?: boolean
}

export default function MetricCard({ label, value, delta, deltaPositive = true }: MetricCardProps) {
  return (
    <div
      className="rounded-xl border px-4 py-3 flex-1 min-w-[160px]"
      style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)' }}
    >
      <p className="text-[12px] mb-1" style={{ color: 'var(--app-text-tertiary)' }}>{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-[22px] font-semibold" style={{ color: 'var(--app-text-primary)' }}>{value}</span>
        <span
          className="text-[12px] font-medium"
          style={{ color: deltaPositive ? '#10b981' : '#f55d67' }}
        >
          {delta}
        </span>
      </div>
    </div>
  )
}
