'use client'

import MetricCard from './MetricCard'
import DailyActiveUsersLineChart from '@/components/charts/DailyActiveUsersLineChart'
import PlanMixPieChart from '@/components/charts/PlanMixPieChart'

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
        <MetricCard label="Daily Active Users" value="24.8K" delta="+6%" />
        <MetricCard label="D30 Retention" value="41%" delta="+2 pts" />
        <MetricCard label="NPS" value="52" delta="+4" />
      </div>

      {/* Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Daily Active Users">
          <DailyActiveUsersLineChart />
        </ChartCard>
        <ChartCard title="Subscription Plan Mix">
          <PlanMixPieChart />
        </ChartCard>
      </div>
    </div>
  )
}
