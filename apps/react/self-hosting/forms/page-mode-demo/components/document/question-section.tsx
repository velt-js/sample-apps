'use client'

import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react'
import { DropdownInput, PrivadoAgentBadge } from './ui-components'
import type { Question } from './questions'

interface QuestionSectionProps {
  question: Question
  sectionRef: React.RefObject<HTMLDivElement | null>
  value: string
  onChange: (value: string) => void
  activeCommentToolId: string | null
}

export const QuestionSection = ({ question, sectionRef, value, onChange, activeCommentToolId }: QuestionSectionProps) => {
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
        {/* activeCommentToolId is used to show the active comment tool / bubble */}
        <div className={`flex items-center gap-1 ml-4 ${activeCommentToolId === question.id ? 'velt-comment-tool-wrapper-active' : ''}`}>
          <VeltCommentBubble
            targetElementId={targetElementId}
            openDialog={false}
            context={{ questionId: question.id, questionNumber: question.number, questionTitle: question.title}}
          />
          <VeltCommentTool
            contextInPageModeComposer={true}
            targetElementId={targetElementId}
            context={{ questionId: question.id, questionNumber: question.number, questionTitle: question.title}}
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
