'use client'

import { useRef, useState, useCallback } from 'react'
import { VeltCommentsSidebar } from '@veltdev/react'

import { questions } from './questions'
import { QuestionSection } from './question-section'
import { TopHeaderBar } from './top-header-bar'
import { SecondHeaderBar } from './second-header-bar'
import { SectionOutline } from './ui-components'
import { useQuestionNavigation } from './hooks/use-question-navigation'
import { useVeltEventHandlers } from '@/components/velt/useVeltEventHandlers'

export default function DocumentCanvas() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isGlobalSidebarOpen, setIsGlobalSidebarOpen] = useState(false)
  const [activeCommentToolId, setActiveCommentToolId] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const {
    currentStep,
    questionRefs,
    scrollToQuestion,
    goToPrevious,
    goToNext,
    totalSteps
  } = useQuestionNavigation(questions)

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  const toggleGlobalSidebar = useCallback(() => {
    setIsGlobalSidebarOpen(prev => !prev)
  }, [])

  const openGlobalSidebar = useCallback(() => {
    setIsGlobalSidebarOpen(true)
  }, [])

  // Handle all Velt comment events at the top level where state lives
  useVeltEventHandlers({
    toggleGlobalSidebar,
    openGlobalSidebar,
    setActiveCommentToolId
  })

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Top Header Bar */}
      <TopHeaderBar isGlobalSidebarOpen={isGlobalSidebarOpen} />

      {/* Second Header Bar */}
      <SecondHeaderBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden" style={{ backgroundColor: 'var(--pia-bg, rgb(248, 250, 255))' }}>
        {/* Left side: Section outline + Main content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar - Section Outline */}
          <div className="flex flex-col gap-[16px] items-start w-[52px] pt-[24px] pl-[24px] flex-shrink-0">
            {questions.map((_, index) => (
              <SectionOutline
                key={index + 1}
                number={(index + 1).toString()}
                isActive={currentStep === index + 1}
                onClick={() => scrollToQuestion(index)}
              />
            ))}
          </div>

          {/* Main Content Card */}
          <div className="flex-1 overflow-auto py-[24px] pr-[24px]">
            <div
              ref={contentRef}
              className="flex flex-col items-start rounded-[12px] overflow-hidden"
              style={{
                backgroundColor: 'rgb(255, 255, 255)',
                boxShadow: 'var(--pia-shadow-xs, 0px 2px 4px rgba(70, 81, 105, 0.08), 0px 1px 1px rgba(92, 108, 138, 0.12))',
                maxWidth: '856px'
              }}
            >
              {/* Panel Tabs Header */}
              <div
                className="flex items-center justify-center px-[24px] py-[14px] w-full overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <p
                  className="flex-1 text-[11px] leading-[16px] font-semibold uppercase tracking-[0.22px] whitespace-pre-wrap"
                  style={{
                    fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                    color: '#172026'
                  }}
                >
                  Risk assessment
                </p>
              </div>

              {/* Questions */}
              {questions.map((question) => (
                <QuestionSection
                  key={question.id}
                  question={question}
                  sectionRef={questionRefs.current[question.id]}
                  value={answers[question.id] || ''}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  activeCommentToolId={activeCommentToolId}
                />
              ))}
            </div>
          </div>
        </div>

        {/* [Velt] Global Comments Sidebar - embedded panel for all comments */}
        {isGlobalSidebarOpen && (
          <div className="velt-sidebar-container h-full flex-shrink-0">
            <VeltCommentsSidebar
              shadowDom={false}
              pageMode={true}
              sortOrder="asc"
              sortBy="createdAt"
              embedMode={true}
              focusedThreadMode={true}
              defaultMinimalFilter="reset"
              openAnnotationInFocusMode={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}
