'use client'

import { VeltInlineCommentsSection } from '@veltdev/react'

interface Question {
  id: string
  number: string
  title: string
}

interface CommentsSidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedQuestion: Question | null
}

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="#465169" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const CommentsSidebar = ({ isOpen, onClose, selectedQuestion }: CommentsSidebarProps) => {
  if (!isOpen || !selectedQuestion) return null

  return (
    <div className="w-[400px] h-full flex flex-col bg-white border-l border-gray-200 flex-shrink-0">
      {/* Header */}
      <div className="h-[56px] px-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close comments sidebar"
          >
            <ChevronLeftIcon />
          </button>
          <div className="flex items-center gap-2">
            <span
              className="text-base font-semibold"
              style={{ color: '#172026' }}
            >
              Comments
            </span>
            <span
              className="text-sm"
              style={{ color: '#5c6c8a' }}
            >
              (Q{selectedQuestion.number})
            </span>
          </div>
        </div>
      </div>

      {/* Question context */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <p
          className="text-sm line-clamp-2"
          style={{ color: '#465169' }}
        >
          {selectedQuestion.title}
        </p>
      </div>

      {/* [Velt] VeltInlineCommentsSection for focused thread on this question */}
      <div className="flex-1 overflow-y-auto px-4 py-4" id={`question-${selectedQuestion.id}`}>
        <VeltInlineCommentsSection
          context={{
            questionId: selectedQuestion.id,
            questionNumber: selectedQuestion.number
          }}
          targetElementId={`question-${selectedQuestion.id}`}
          shadowDom={false}
          composerPosition="bottom"
        />
      </div>
    </div>
  )
}

export default CommentsSidebar
