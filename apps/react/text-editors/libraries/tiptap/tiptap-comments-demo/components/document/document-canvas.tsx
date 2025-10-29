'use client'

import { useRef, useCallback } from 'react'
import TipTapComponent from './TipTapComponent'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToHeading = useCallback((headingText: string) => {
    if (!scrollContainerRef.current) return

    const headings = scrollContainerRef.current.querySelectorAll('[data-heading]')
    const targetHeading = Array.from(headings).find(
      (heading) => heading.textContent?.toLowerCase().trim() === headingText.toLowerCase().trim()
    )

    if (targetHeading) {
      const containerRect = scrollContainerRef.current.getBoundingClientRect()
      const headingRect = targetHeading.getBoundingClientRect()
      const scrollTop = headingRect.top - containerRect.top + scrollContainerRef.current.scrollTop

      scrollContainerRef.current.scrollTo({
        top: scrollTop - 50,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <div className="w-full h-screen relative">
      <Header />
      <TipTapComponent scrollContainerRef={scrollContainerRef} />
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToHeading={scrollToHeading} />
      </div>
    </div>
  )
}
