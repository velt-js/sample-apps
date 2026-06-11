'use client'

import MetricCard from './MetricCard'
import SessionsLineChart from '@/components/charts/SessionsLineChart'
import ConversionsColumnChart from '@/components/charts/ConversionsColumnChart'

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)' }}
    >
      <h3 className="text-[14px] font-medium mb-3" style={{ color: 'var(--app-text-primary)' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function DashboardGrid() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI row */}
      <div className="flex flex-wrap gap-4">
        <MetricCard label="Sessions" value="148.2K" delta="+9%" />
        <MetricCard label="Conversion Rate" value="3.4%" delta="+0.4 pts" />
        <MetricCard label="Avg. Session" value="4m 12s" delta="-3%" deltaPositive={false} />
      </div>

      {/* Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Sessions by Channel">
          <SessionsLineChart />
        </ChartCard>
        <ChartCard title="Monthly Conversions">
          <ConversionsColumnChart />
        </ChartCard>
      </div>
    </div>
  )
}
