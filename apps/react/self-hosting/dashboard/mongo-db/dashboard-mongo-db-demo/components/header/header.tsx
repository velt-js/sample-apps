'use client'

import VeltTools from '@/components/velt/VeltTools'
import { useSelectedJob } from '@/app/document/JobsContext'

export default function Header() {
  const selectedJob = useSelectedJob()

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-2 p-2 px-4 border-b bg-background">
      <h1 className="text-lg font-semibold">Dashboard Inline Demo</h1>
      <div className="flex items-center gap-3">
        {selectedJob && <VeltTools />}
      </div>
    </div>
  )
}
