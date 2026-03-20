'use client'

import { useState } from 'react'
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import JobDetailModal from './JobDetailModal'
import { Job } from './types'
import { jobsData } from './jobs-data'
import { FileIcon, ChevronDownIcon, PlusIcon, FilterIcon, SearchIcon, SettingsIcon } from './icons'
import { SummaryCards } from './SummaryCards'
import { JobsTable } from './JobsTable'
import { Pagination } from './Pagination'
import { CommentsSidebar } from './CommentsSidebar'

// Re-export types for backwards compatibility
export type { Job, JobLineItem } from './types'

export default function DocumentCanvas() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJobForComments, setSelectedJobForComments] = useState<Job | null>(null)
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false)

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

  const handleCloseCommentSidebar = () => {
    setIsCommentSidebarOpen(false)
    setSelectedJobForComments(null)
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-45px)]">
        <Sidebar />
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-background overflow-hidden">
            {/* Page Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileIcon />
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">Active jobs</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">(26)</span>
                <ChevronDownIcon />
              </div>
              <button className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center shadow-sm">
                <PlusIcon />
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="flex items-center justify-between px-8 py-3">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <FilterIcon />
                Filter
              </button>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <SearchIcon />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
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
          <CommentsSidebar
            isOpen={isCommentSidebarOpen}
            onClose={handleCloseCommentSidebar}
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
