'use client'

// [Velt] Import VeltCommentsSidebar for embedded comments panel
import { VeltCommentsSidebar } from "@veltdev/react";
import { useState } from "react";
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import ActivityLogPanel from '@/components/velt/ActivityLogPanel'
import DocumentArticle from './DocumentArticle'

export default function DocumentCanvas() {
  // Host app manages comments sidebar state
  const [isOpen, setIsOpen] = useState(false);
  // Host app manages Activity Log drawer state
  const [activityOpen, setActivityOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleActivityLog = () => {
    setActivityOpen((prev) => !prev);
  };

  // [Velt] Configuration to disable comment grouping in sidebar
  const groupConfig = {
    enable: false
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative" style={{ backgroundColor: 'var(--app-bg)' }}>
        <Header toggleCommentsSidebar={toggleSidebar} toggleActivityLog={toggleActivityLog} />
        <DocumentArticle />
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

      {/* [Velt] Activity Log drawer - live running feed of everything on the document */}
      <ActivityLogPanel open={activityOpen} onClose={() => setActivityOpen(false)} />
    </div>
  )
}
