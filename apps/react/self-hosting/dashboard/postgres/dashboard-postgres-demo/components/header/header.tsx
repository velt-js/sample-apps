'use client'

import Link from 'next/link'
import VeltTools from '@/components/velt/VeltTools'
import { useSelectedJob } from '@/app/document/JobsContext'

export default function Header() {
  const selectedJob = useSelectedJob()

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-2 p-2 px-4 border-b bg-background">
      <h1 className="text-lg font-semibold">Dashboard Inline Demo</h1>
      <div className="flex items-center gap-3">
        <Link
          href="/sidebar"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-accent transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="10.5" y1="2.5" x2="10.5" y2="13.5" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Sidebar
        </Link>
        {selectedJob && <VeltTools />}
      </div>
    </div>
  )
}
