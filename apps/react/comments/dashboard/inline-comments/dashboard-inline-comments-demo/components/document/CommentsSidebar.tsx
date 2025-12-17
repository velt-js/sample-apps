import { VeltInlineCommentsSection } from '@veltdev/react'
import { ChevronLeftIcon } from './icons'
import { Job } from './types'

interface CommentsSidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedJob: Job | null
}

export const CommentsSidebar = ({ isOpen, onClose, selectedJob }: CommentsSidebarProps) => {
  if (!isOpen || !selectedJob) return null

  return (
    <div className="w-[400px] h-full flex flex-col bg-white border-l border-gray-200">
      {/* Header */}
      <div className="h-[56px] px-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeftIcon />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">Comments</span>
            <span className="text-sm text-gray-500">({selectedJob.id})</span>
          </div>
        </div>
      </div>

      {/* VeltInlineCommentsSection for per-row thread */}
      <div className="flex-1 overflow-y-auto" data-id={`job-${selectedJob.id}`}>
        <VeltInlineCommentsSection
          multiThread={false}
          targetElementId={`job-${selectedJob.id}`}
          shadowDom={false}
        />
      </div>
    </div>
  )
}
