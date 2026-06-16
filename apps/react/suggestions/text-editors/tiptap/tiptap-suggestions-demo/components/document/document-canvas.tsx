'use client'

import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import ProposalFields from '../suggestions/ProposalFields'
import OpenSuggestionsPanel from '../suggestions/OpenSuggestionsPanel'
import ApplySuggestions from '../suggestions/ApplySuggestions'

// The TipTap editor (via @veltdev/tiptap-velt-comments) touches browser-only
// APIs at module-load and isn't SSR-safe, so load it client-only.
const TipTapComponent = dynamic(() => import('./TipTapComponent'), { ssr: false })

export default function DocumentCanvas() {
  // Single scroll container owned here so TipTap's add-comment flow can
  // preserve scroll position (it reads scrollContainerRef.current.scrollTop)
  // and the Table of Contents sidebar can jump between headings inside it.
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
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div className="w-full h-screen relative" style={{ backgroundColor: 'var(--app-bg)' }}>
      <Header />

      <div ref={scrollContainerRef} className="h-screen overflow-y-auto">
        <div className="flex justify-center pt-[64px] px-4 pb-28">
          <div className="w-full max-w-[850px] flex flex-col gap-5">
            <ProposalFields />
            <TipTapComponent scrollContainerRef={scrollContainerRef} />
            <OpenSuggestionsPanel />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToHeading={scrollToHeading} />
      </div>

      {/* Renderless: applies approved suggestions / reverts rejected ones. */}
      <ApplySuggestions />
    </div>
  )
}
