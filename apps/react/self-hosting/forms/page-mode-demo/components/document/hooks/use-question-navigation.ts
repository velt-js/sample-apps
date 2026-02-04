'use client'

import { useRef, useState, useCallback } from 'react'
import type { Question } from '../questions'

export function useQuestionNavigation(questions: Question[]) {
  const [currentStep, setCurrentStep] = useState(1)
  const questionRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({})

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
  }, [questions])

  const goToPrevious = useCallback(() => {
    scrollToQuestion(Math.max(0, currentStep - 2))
  }, [currentStep, scrollToQuestion])

  const goToNext = useCallback(() => {
    scrollToQuestion(Math.min(questions.length - 1, currentStep))
  }, [currentStep, questions.length, scrollToQuestion])

  return {
    currentStep,
    questionRefs,
    scrollToQuestion,
    goToPrevious,
    goToNext,
    totalSteps: questions.length
  }
}
