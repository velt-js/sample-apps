'use client'

// [Velt] Import VeltCommentsSidebar for embedded comments panel
import { VeltCommentsSidebar } from "@veltdev/react";
import { useState } from "react";
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import Breadcrumb from './Breadcrumb'
import DashboardHeader from './DashboardHeader'
import MetricCard from './MetricCard'
import ChartPanel from './ChartPanel'
import NotificationBanner from './NotificationBanner'
import AddMetricSection from './AddMetricSection'

export default function DocumentCanvas() {
  // Host app manages sidebar state
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // [Velt] Configuration to disable comment grouping in sidebar
  const groupConfig = {
    enable: false
  };
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative" style={{ backgroundColor: 'var(--app-bg)' }}>
        <Header toggleCommentsSidebar={toggleSidebar} />
          <div className="p-6 max-w-[1440px] mx-auto" data-name="Dashboard">
            {/* Breadcrumb Navigation */}
            <Breadcrumb />

            {/* Page Title and Subtitle */}
            <DashboardHeader />

            {/* Horizontal Line */}
            <div className="w-full h-[1px] mb-[24px]" style={{ backgroundColor: 'var(--app-divider)' }} />

            {/* Metric Cards Row */}
            <div className="flex gap-[7px] items-center mb-[6px]">
              <MetricCard
                id="panel-search"
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
                title="Visitors per Week"
              />
              <ChartPanel
                id="panel-chart-2"
                title="Visitors per Week"
              />
            </div>

            {/* Notification Banner */}
            <NotificationBanner />

            {/* Add New Metric Section */}
            <AddMetricSection />
          </div>
      </div>

      {/* [Velt] Embedded Comments Sidebar - Managed by host app */}
      <div
        className="h-full shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
        style={{
          width: isOpen ? '400px' : '0px',
          backgroundColor: 'var(--app-comments-sidebar-bg)'
        }}
      >
        {isOpen && (
          <>
            <div className="flex items-center gap-3 p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--app-border)' }}>
              <button
                onClick={closeSidebar}
                className="hover:text-white transition-colors"
                style={{ color: 'var(--app-text-tertiary)' }}
                aria-label="Close comments sidebar"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <h2 className="font-semibold" style={{ color: 'var(--app-text-primary)' }}>Comments</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              {/* [Velt] VeltCommentsSidebar with embedMode for inline rendering, groupConfig to disable grouping, pageMode for page-level comments */}
              <VeltCommentsSidebar embedMode={true} groupConfig={groupConfig} pageMode={true} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
