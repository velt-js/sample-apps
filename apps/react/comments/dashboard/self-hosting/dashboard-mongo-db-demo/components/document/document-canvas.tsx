'use client'

import { useState, useEffect } from 'react'
import { useVeltEventCallback } from '@veltdev/react'
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import JobDetailModal from './JobDetailModal'
import { Job } from './types'
import { jobsData } from './jobs-data'
import { FileIcon, ChevronDownIcon, PlusIcon, FilterIcon, SearchIcon, SettingsIcon } from './icons'
import { SummaryCards } from './SummaryCards'
import { JobsTable } from './JobsTable'
import { Pagination } from './Pagination'
import { LineCommentsSidebar } from './LineCommentsSidebar'
import { NotificationsPanel } from './NotificationsPanel'

// Re-export types for backwards compatibility
export type { Job, JobLineItem } from './types'

export default function DocumentCanvas() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJobForComments, setSelectedJobForComments] = useState<Job | null>(null)
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false)
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false)

  // Velt button click listener - moved to parent to avoid stale event issues
  const veltButtonClickEventData = useVeltEventCallback('veltButtonClick');

  // Handle close button click from Velt component
  useEffect(() => {
    if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'close-sidebar') {
      setIsCommentSidebarOpen(false);
      setSelectedJobForComments(null);
    }
  }, [veltButtonClickEventData]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  const handleOpenCommentsForRow = (job: Job) => {
    setSelectedJobForComments(job)
    setIsCommentSidebarOpen(true)
  }

  const toggleNotificationsPanel = () => {
    setIsNotificationsPanelOpen((prev) => !prev)
  }

  const handleCloseNotificationsPanel = () => {
    setIsNotificationsPanelOpen(false)
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-45px)]">
        <Sidebar onNotificationsClick={toggleNotificationsPanel} />
        {/* Notifications Panel - Opens from left */}
        <NotificationsPanel
          isOpen={isNotificationsPanelOpen}
          onClose={handleCloseNotificationsPanel}
        />
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Page Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileIcon />
                <span className="text-base font-semibold text-gray-900">Active jobs</span>
                <span className="text-sm text-gray-500">(26)</span>
                <ChevronDownIcon />
              </div>
              <button className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center shadow-sm">
                <PlusIcon />
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="flex items-center justify-between px-8 py-3">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FilterIcon />
                Filter
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <SearchIcon />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <SettingsIcon />
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Data Table */}
            <JobsTable
              jobs={jobsData}
              onJobClick={handleJobClick}
              onRowClick={handleOpenCommentsForRow}
            />

            {/* Pagination */}
            <Pagination />
          </div>

          {/* Comments Sidebar - Per-row thread */}
          <LineCommentsSidebar
            isOpen={isCommentSidebarOpen}
            selectedJob={selectedJobForComments}
          />
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
