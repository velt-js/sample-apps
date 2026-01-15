'use client'

import { useRef, useState, useCallback } from 'react'
import { VeltPresence, VeltCommentTool, VeltCommentBubble, VeltCommentsSidebar } from '@veltdev/react'
import { CommentsSidebar } from './CommentsSidebar'

// Question data structure
interface Question {
  id: string
  number: string
  title: string
  description: string
  defaultValue: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 'q1',
    number: '3.1',
    title: 'Which application or product line does this repository belong to?',
    description: 'This grouping will create reports at an application/product level.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Finance-api', 'User-service', 'Analytics-engine'],
  },
  {
    id: 'q2',
    number: '3.2',
    title: 'What type of personal data does this processing involve?',
    description: 'Select the categories of personal data being processed.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Contact-info', 'Financial-data', 'Location-data'],
  },
  {
    id: 'q3',
    number: '3.3',
    title: 'What is the legal basis for processing this data?',
    description: 'Select the applicable legal basis under GDPR Article 6.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Consent', 'Contract', 'Legal-obligation'],
  },
  {
    id: 'q4',
    number: '3.4',
    title: 'How long will the data be retained?',
    description: 'Specify the retention period for this data processing activity.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', '1-year', '3-years', '7-years'],
  },
  {
    id: 'q5',
    number: '3.5',
    title: 'Are there any data transfers outside the EEA?',
    description: 'Indicate if data is transferred to third countries.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Yes-with-SCCs', 'Yes-with-adequacy', 'No-transfers'],
  },
  {
    id: 'q6',
    number: '3.6',
    title: 'What security measures are in place?',
    description: 'Describe the technical and organizational security measures.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Encryption', 'Access-controls', 'Audit-logging'],
  },
  {
    id: 'q7',
    number: '3.7',
    title: 'Is a Data Protection Impact Assessment required?',
    description: 'Determine if a DPIA is needed based on risk assessment.',
    defaultValue: 'Healthcare-backend',
    options: ['Healthcare-backend', 'Yes-required', 'No-not-required', 'Under-review'],
  },
]

// SVG Icons as components
const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0.5L1.5 8L8 15.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.5 8H15.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const NavArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 8.5L1.5 8.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 3.5L1.5 8L5 12.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const NavArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 8.5L14.5 8.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 3.5L14.5 8L11 12.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 0.5L0.5 9.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.5 0.5L9.5 9.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 0.5L5 5L9.5 0.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PrivadoAgentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill="url(#paint0_linear)"/>
    <path opacity="0.75" d="M-1 9.55V13.45L7 18V15.0035V14.1L2.33333 11.5L7 8.9V7.509V5L-1 9.55Z" fill="white"/>
    <path opacity="0.9" d="M9 -1V1.91967V2.8L13.6667 5.33333L9 7.86667V9.22199V18L13 16.1V9.45L17 7.23333V3.43333L9 -1Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear" x1="8" y1="16" x2="8" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B380FF"/>
        <stop offset="1" stopColor="#FFBBBB"/>
      </linearGradient>
    </defs>
  </svg>
)

// Status badge component
const StatusBadge = ({ status = 'Open' }: { status?: string }) => (
  <div
    className="flex items-start px-[5px] py-[2px] rounded-[4px]"
    style={{
      backgroundColor: '#d6ffe5',
      border: '1px solid rgb(134, 239, 172)'
    }}
  >
    <span
      className="text-[11px] font-semibold uppercase tracking-[0.22px] leading-[16px]"
      style={{
        fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
        color: '#17a25c'
      }}
    >
      {status}
    </span>
  </div>
)

// Section outline component (sidebar numbers)
interface SectionOutlineProps {
  number: string
  isActive?: boolean
  onClick?: () => void
}

const SectionOutline = ({ number, isActive = false, onClick }: SectionOutlineProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-[8px] cursor-pointer hover:opacity-80 transition-opacity"
    aria-label={`Go to section ${number}`}
  >
    <div
      className="flex flex-col items-start p-[2px] rounded-[16px]"
      style={{
        backgroundColor: isActive ? 'rgb(211, 197, 252)' : 'rgb(237, 240, 248)'
      }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.22px] leading-[16px] text-center w-[16px]"
        style={{
          fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
          color: isActive ? '#754cff' : '#465169'
        }}
      >
        {number}
      </span>
    </div>
  </button>
)

// Dropdown component
interface DropdownInputProps {
  value: string
  options: string[]
  onChange: (value: string) => void
}

const DropdownInput = ({ value, options, onChange }: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-[400px]">
      <div
        className="flex items-center gap-[12px] pl-[6px] pr-[12px] py-[6px] rounded-[8px] cursor-pointer"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(191, 200, 220)'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-1 items-center gap-[4px]">
          <div
            className="flex items-center gap-[4px] pl-[12px] pr-[6px] py-[5px] rounded-[4px]"
            style={{ backgroundColor: 'rgb(242, 246, 252)' }}
          >
            <span
              className="text-[13px] leading-[18px] whitespace-nowrap"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#465169'
              }}
            >
              {value}
            </span>
            <button
              className="flex items-center rounded-[4px] p-[2px]"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
              aria-label="Clear selection"
            >
              <div className="w-[16px] h-[16px] flex items-center justify-center">
                <CloseIcon />
              </div>
            </button>
          </div>
        </div>
        <div className="w-[16px] h-[16px] flex items-center justify-center">
          <ChevronIcon />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 w-full mt-[4px] rounded-[8px] z-10"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(191, 200, 220)',
            boxShadow: 'var(--pia-shadow-xs)'
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-[12px] py-[8px] cursor-pointer hover:bg-gray-50"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#465169',
                fontSize: '13px'
              }}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Privado Agent badge
const PrivadoAgentBadge = () => (
  <div
    className="flex items-center gap-[24px] pl-[6px] pr-[12px] py-[5px] rounded-[16px]"
    style={{
      background: 'linear-gradient(to right, #f3ebff, #fff5f5)'
    }}
  >
    <div className="flex items-center gap-[8px]">
      <div
        className="w-[16px] h-[16px] rounded-[8px] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: 'rgb(211, 197, 252)' }}
      >
        <PrivadoAgentIcon />
      </div>
      <span
        className="text-[13px] leading-[18px]"
        style={{
          fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
          color: '#5c6c8a'
        }}
      >
        Added by <span style={{ color: '#465169' }}>Privado Agent</span>
      </span>
    </div>
  </div>
)

// Question section component
interface QuestionSectionProps {
  question: Question
  sectionRef: React.RefObject<HTMLDivElement | null>
  value: string
  onChange: (value: string) => void
  onOpenComments: () => void
}

const QuestionSection = ({ question, sectionRef, value, onChange, onOpenComments }: QuestionSectionProps) => {
  const targetElementId = `question-${question.id}`

  return (
    <div
      ref={sectionRef}
      id={targetElementId}
      className="flex flex-col gap-[24px] items-start px-[48px] py-[32px] w-full relative group"
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        borderTop: '1px solid rgb(237, 240, 248)'
      }}
    >
      {/* Question Title with Comment Tools */}
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-[4px] items-start flex-1">
          <p
            className="text-[18px] leading-[24px] w-full"
            style={{ fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif" }}
          >
            <span style={{ color: '#5c6c8a' }}>{question.number}.</span>{' '}
            <span style={{ color: '#172026', fontWeight: 500 }}>{question.title}</span>
          </p>
          <p
            className="text-[13px] leading-[20px] w-full"
            style={{
              fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
              color: '#5c6c8a'
            }}
          >
            {question.description}
          </p>
        </div>

        {/* [Velt] Comment tools for each question row */}
        <div
          className="flex items-center gap-1 ml-4 opacity-60 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            onOpenComments()
          }}
        >
          <VeltCommentBubble
            targetElementId={targetElementId}
          />
          <VeltCommentTool
            targetElementId={targetElementId}
            context={{ questionId: question.id, questionNumber: question.number }}
          />
        </div>
      </div>

      {/* Dropdown Input */}
      <DropdownInput
        value={value || question.defaultValue}
        options={question.options}
        onChange={onChange}
      />

      {/* Privado Agent Badge */}
      <PrivadoAgentBadge />
    </div>
  )
}

export default function DocumentCanvas() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false)
  const [isGlobalSidebarOpen, setIsGlobalSidebarOpen] = useState(false)
  const questionRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({})
  const contentRef = useRef<HTMLDivElement>(null)

  // Initialize refs for each question
  questions.forEach((q) => {
    if (!questionRefs.current[q.id]) {
      questionRefs.current[q.id] = { current: null }
    }
  })

  const scrollToQuestion = useCallback((index: number) => {
    const questionId = questions[index]?.id
    if (questionId && questionRefs.current[questionId]?.current) {
      questionRefs.current[questionId].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      setCurrentStep(index + 1)
    }
  }, [])

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  // Handler for opening comments sidebar for a specific question
  const handleOpenComments = useCallback((question: Question) => {
    setSelectedQuestion(question)
    setIsCommentSidebarOpen(true)
  }, [])

  // Handler for closing comments sidebar
  const handleCloseCommentSidebar = useCallback(() => {
    setIsCommentSidebarOpen(false)
    setSelectedQuestion(null)
  }, [])

  // Handler for toggling global comments sidebar
  const toggleGlobalSidebar = useCallback(() => {
    setIsGlobalSidebarOpen(prev => !prev)
    // Close per-question sidebar when opening global sidebar
    if (!isGlobalSidebarOpen) {
      setIsCommentSidebarOpen(false)
      setSelectedQuestion(null)
    }
  }, [isGlobalSidebarOpen])

  const progress = Math.round(((currentStep) / 7) * 100)

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between pl-[12px] pr-[20px] py-[8px] flex-shrink-0"
        style={{
          backgroundColor: 'var(--pia-canvas-bg, rgba(255, 255, 255, 0.6))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--pia-border-medium, rgb(221, 227, 238))',
        }}
      >
        <div className="flex items-center gap-[8px]">
          {/* Back Button */}
          <button
            className="flex items-center justify-center p-[6px] rounded-[8px] overflow-hidden hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <BackArrowIcon />
          </button>

          {/* Heading */}
          <div className="flex items-center gap-[8px]">
            <span
              className="text-[16px] leading-[24px] font-medium whitespace-nowrap"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#172026'
              }}
            >
              PIA Assessment
            </span>
            <div className="flex items-start pt-[2px] px-[2px]">
              <StatusBadge status="Open" />
            </div>
          </div>
        </div>

        {/* [Velt] Header tools: Presence and Comments Sidebar Button */}
        <div className="flex items-center gap-[12px]">
          {/* [Velt] Show online users/collaborators */}
          <VeltPresence />
          {/* Custom button to toggle embedded comments sidebar */}
          <button
            onClick={toggleGlobalSidebar}
            className="flex items-center justify-center gap-[6px] px-[12px] py-[6px] rounded-[8px] transition-colors"
            style={{
              backgroundColor: isGlobalSidebarOpen ? '#5a34d9' : '#754cff',
              boxShadow: '0px 0px 0px 1px #5a34d9, 0px 1px 2px rgba(23, 32, 38, 0.24), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
            }}
            aria-label={isGlobalSidebarOpen ? 'Close comments' : 'Open comments'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                color: 'white'
              }}
            >
              Comments
            </span>
          </button>
        </div>
      </div>

      {/* Second Header Bar */}
      <div
        className="flex items-center justify-between pl-[24px] pr-[20px] py-[12px] flex-shrink-0"
        style={{
          backgroundColor: 'var(--pia-canvas-bg, rgba(255, 255, 255, 0.6))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--pia-border-medium, rgb(221, 227, 238))',
        }}
      >
        <div className="flex items-center">
          <p
            className="text-[16px] leading-[24px] whitespace-nowrap"
            style={{ fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif" }}
          >
            <span style={{ color: '#172026', fontWeight: 500 }}>Section 3 </span>
            <span style={{ color: '#465169' }}>– </span>
            <span style={{ color: '#465169', fontWeight: 400 }}>Fundamental principles</span>
          </p>
        </div>

        <div className="flex items-center gap-[24px]">
          {/* Progress */}
          <div className="flex items-center gap-[8px]">
            <span
              className="text-[13px] leading-[18px] whitespace-nowrap"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#172026'
              }}
            >
              Step {currentStep} of 7
            </span>

            {/* Progress Bar */}
            <div
              className="w-[108px] h-[8px] rounded-[16px] overflow-hidden"
              style={{ backgroundColor: 'rgb(221, 227, 238)' }}
            >
              <div
                className="h-full rounded-l-[4px] rounded-r-[1px] transition-all duration-300"
                style={{
                  backgroundColor: 'rgb(29, 202, 115)',
                  width: `${(progress / 100) * 108}px`
                }}
              />
            </div>

            <span
              className="text-[12px] leading-[16px] whitespace-nowrap"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#465169'
              }}
            >
              {progress}%
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-[12px]">
            {/* Arrow buttons */}
            <div
              className="flex items-center justify-center rounded-[6px] overflow-hidden"
              style={{
                backgroundColor: 'rgb(255, 255, 255)',
                boxShadow: 'var(--pia-shadow-btn-tertiary, 0px 0px 0px 1px rgba(12, 55, 136, 0.14), 0px 1px 2px rgba(92, 108, 138, 0.24))'
              }}
            >
              <button
                className="flex items-center justify-center p-[6px] rounded-[8px] overflow-hidden hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => scrollToQuestion(Math.max(0, currentStep - 2))}
                disabled={currentStep <= 1}
                aria-label="Previous question"
              >
                <NavArrowLeftIcon />
              </button>
              <div
                className="w-px self-stretch"
                style={{ backgroundColor: 'rgba(12, 55, 136, 0.14)' }}
              />
              <button
                className="flex items-center justify-center p-[6px] rounded-[8px] overflow-hidden hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => scrollToQuestion(Math.min(6, currentStep))}
                disabled={currentStep >= 7}
                aria-label="Next question"
              >
                <NavArrowRightIcon />
              </button>
            </div>

            {/* Submit Button */}
            <button
              className="flex items-center justify-center gap-[2px] px-[6px] py-[5px] rounded-[8px] overflow-hidden"
              style={{
                backgroundColor: '#754cff',
                boxShadow: '0px 0px 0px 1px #5a34d9, 0px 1px 2px rgba(23, 32, 38, 0.24), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
              }}
            >
              <div className="flex items-center justify-center px-[4px]">
                <span
                  className="text-[14px] leading-[18px] font-medium whitespace-nowrap"
                  style={{
                    fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                    color: '#ffffff'
                  }}
                >
                  Submit Assessment
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden" style={{ backgroundColor: 'var(--pia-bg, rgb(248, 250, 255))' }}>
        {/* Left side: Section outline + Main content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar - Section Outline */}
          <div
            className="flex flex-col gap-[16px] items-start w-[52px] pt-[24px] pl-[24px] flex-shrink-0"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <SectionOutline
                key={num}
                number={num.toString()}
                isActive={currentStep === num}
                onClick={() => scrollToQuestion(num - 1)}
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
              {questions.map((question, index) => (
                <QuestionSection
                  key={question.id}
                  question={question}
                  sectionRef={questionRefs.current[question.id]}
                  value={answers[question.id] || ''}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  onOpenComments={() => handleOpenComments(question)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* [Velt] Embedded Comments Sidebar - for focused threads per question */}
        <CommentsSidebar
          isOpen={isCommentSidebarOpen}
          onClose={handleCloseCommentSidebar}
          selectedQuestion={selectedQuestion}
        />

        {/* [Velt] Global Comments Sidebar - embedded panel for all comments */}
        {isGlobalSidebarOpen && (
          <div className="velt-sidebar-container h-full flex-shrink-0">
            <VeltCommentsSidebar
              shadowDom={false}
              pageMode={true}
              sortData="asc"
              embedMode={true}
              focusedThreadMode={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}
