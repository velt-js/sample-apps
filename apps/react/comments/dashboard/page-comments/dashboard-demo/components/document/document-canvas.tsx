'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import Breadcrumb from './Breadcrumb'
import DashboardHeader from './DashboardHeader'
import MetricCard from './MetricCard'
import ChartPanel from './ChartPanel'
import NotificationBanner from './NotificationBanner'
import AddMetricSection from './AddMetricSection'

interface DocumentCanvasProps {
  toggleCommentsSidebar: () => void;
}

export default function DocumentCanvas({ toggleCommentsSidebar }: DocumentCanvasProps) {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-black relative">
        <Header toggleCommentsSidebar={toggleCommentsSidebar} />
          <div className="p-6 max-w-[1440px] mx-auto" data-name="Dashboard">
            {/* Breadcrumb Navigation */}
            <Breadcrumb />

            {/* Page Title and Subtitle */}
            <DashboardHeader />

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-white opacity-[0.08] mb-[24px]" />

            {/* Metric Cards Row */}
            <div className="flex gap-[7px] items-center mb-[6px]">
              <MetricCard
                id="panel-search"
                targetId="panel-search"
                iconSrc="/assets/dashboard/google-logo.svg"
                iconAlt="Search"
                title="Search"
                value="$12.5K"
                percentageChange="15%"
                trendIconSrc="/assets/dashboard/icon-trending-down.svg"
                isPositiveTrend={false}
              />
              <MetricCard
                id="panel-reddit"
                targetId="panel-reddit"
                iconSrc="/assets/dashboard/reddit-logo.svg"
                iconAlt="Reddit"
                title="Reddit"
                value="$32.8K"
                percentageChange="120%"
                trendIconSrc="/assets/dashboard/icon-trending-down-1.svg"
                isPositiveTrend={true}
              />
              <MetricCard
                id="panel-meta"
                targetId="panel-meta"
                iconSrc="/assets/dashboard/meta-logo-complete.svg"
                iconAlt="Meta"
                title="Meta"
                value="$13.5K"
                percentageChange="15%"
                trendIconSrc="/assets/dashboard/icon-trending-down-1.svg"
                isPositiveTrend={true}
              />
              <MetricCard
                id="panel-twitter"
                targetId="panel-twitter"
                iconSrc="/assets/dashboard/twitter-logo.svg"
                iconAlt="Twitter / X"
                title="Twitter / X"
                value="$8.3K"
                percentageChange="2%"
                trendIconSrc="/assets/dashboard/icon-trending-down.svg"
                isPositiveTrend={false}
              />
            </div>

            {/* Chart Sections */}
            <div className="flex gap-[6px] items-center leading-[0] mb-[6px]">
              <ChartPanel
                id="panel-chart-1"
                targetId="panel-chart-1"
                title="Visitors per Week"
              />
              <ChartPanel
                id="panel-chart-2"
                targetId="panel-chart-2"
                title="Visitors per Week"
              />
            </div>

            {/* Notification Banner */}
            <NotificationBanner />

            {/* Add New Metric Section */}
            <AddMetricSection />
          </div>
      </div>
    </div>
  )
}
