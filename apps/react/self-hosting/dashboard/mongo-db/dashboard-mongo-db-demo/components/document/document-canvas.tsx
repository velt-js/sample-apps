'use client'

import { useState } from 'react'
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import { useJobs } from '@/app/document/JobsContext'
import { NotificationsPanel } from './NotificationsPanel'
import JobsList from './JobsList'
import JobDetail from './JobDetail'

// Re-export types for backwards compatibility
export type { Job, JobLineItem } from './types'

export default function DocumentCanvas() {
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false)
  
  // Use centralized jobs context for job selection and URL management
  const { selectedJob, selectJob, clearSelectedJob, isInitialized } = useJobs()

  const toggleNotificationsPanel = () => {
    setIsNotificationsPanelOpen((prev) => !prev)
  }

  const handleCloseNotificationsPanel = () => {
    setIsNotificationsPanelOpen(false)
  }

  // Show minimal layout while initializing to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <div className="flex flex-col w-full h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-45px)]">
          <Sidebar onNotificationsClick={toggleNotificationsPanel} />
          <div className="flex-1 flex flex-col bg-white overflow-hidden" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-45px)]">
        <Sidebar onNotificationsClick={toggleNotificationsPanel} />
        <NotificationsPanel
          isOpen={isNotificationsPanelOpen}
          onClose={handleCloseNotificationsPanel}
        />
        {selectedJob ? (
          <JobDetail job={selectedJob} onBack={clearSelectedJob} />
        ) : (
          <JobsList onJobClick={selectJob} />
        )}
      </div>
    </div>
  )
}
