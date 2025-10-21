'use client'

import { useRef, useCallback } from 'react'
import TipTapComponent from './TipTapComponent'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToHeading = useCallback((headingText: string) => {
    if (!scrollContainerRef.current) return

    // Find all heading spans
    const headings = scrollContainerRef.current.querySelectorAll('[data-heading]')

    // Find the heading that matches the text (case-insensitive)
    const targetHeading = Array.from(headings).find(
      (heading) => heading.textContent?.toLowerCase().trim() === headingText.toLowerCase().trim()
    )

    if (targetHeading) {
      // Get the position of the heading relative to the scroll container
      const containerRect = scrollContainerRef.current.getBoundingClientRect()
      const headingRect = targetHeading.getBoundingClientRect()
      const scrollTop = headingRect.top - containerRect.top + scrollContainerRef.current.scrollTop

      // Scroll to the heading with smooth behavior
      scrollContainerRef.current.scrollTo({
        top: scrollTop - 50, // Add some offset from the top
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <div className="w-full h-screen relative">
      {/* Header with Velt Tools */}
      <Header />

      {/* Tiptap Editor - Full screen */}
      <TipTapComponent scrollContainerRef={scrollContainerRef} />

      {/* Sidebar - Positioned on top of editor */}
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToHeading={scrollToHeading} />
      </div>
    </div>
  )
}
