'use client'

// [Velt] Comment mode state drives the "click a data point" hint
import { useCommentModeState } from '@veltdev/react'
import MetricCard from './MetricCard'
import RevenueBarChart from '@/components/charts/RevenueBarChart'
import ActiveUsersLineChart from '@/components/charts/ActiveUsersLineChart'

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
  // [Velt] True while the comment tool is active
  const commentMode = useCommentModeState()

  return (
    <div className="flex flex-col gap-4">
      {commentMode && (
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px]"
          style={{ backgroundColor: 'rgba(99,102,241,0.12)', color: 'var(--app-text-primary)' }}
        >
          <span className="inline-block size-2 rounded-full shrink-0" style={{ backgroundColor: '#6366f1' }} />
          Comment mode: click a data point on either chart to pin feedback to it.
        </div>
      )}

      {/* KPI row */}
      <div className="flex flex-wrap gap-4">
        <MetricCard label="Q2 Revenue" value="$4.2M" delta="+12%" />
        <MetricCard label="Active Users" value="38.4K" delta="+6%" />
        <MetricCard label="Net Retention" value="117%" delta="-2%" deltaPositive={false} />
      </div>

      {/* Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly Revenue">
          <RevenueBarChart />
        </ChartCard>
        <ChartCard title="Weekly Active Users">
          <ActiveUsersLineChart />
        </ChartCard>
      </div>
    </div>
  )
}
