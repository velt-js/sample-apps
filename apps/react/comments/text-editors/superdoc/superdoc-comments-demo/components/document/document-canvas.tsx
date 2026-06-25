'use client'

import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

const SuperDocComponent = dynamic(() => import('./SuperDocComponent'), {
  ssr: false,
})

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const normalizeHeadingText = useCallback((text: string | null | undefined) => {
    return text?.replace(/\s+/g, ' ').trim().toLowerCase() ?? ''
  }, [])

  const scrollToHeading = useCallback((headingText: string) => {
    if (!scrollContainerRef.current) return

    const targetText = normalizeHeadingText(headingText)
    const editorHost = scrollContainerRef.current.querySelector<HTMLElement>('.superdoc-editor-host')
    if (!editorHost) return

    const candidates = Array.from(
      editorHost.querySelectorAll<HTMLElement>('h1, h2, h3, p, span, div')
    )
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
      })
      .filter((element) => normalizeHeadingText(element.textContent) === targetText)
      .sort((a, b) => {
        const aIsHeading = /^H[1-3]$/.test(a.tagName) ? 0 : 1
        const bIsHeading = /^H[1-3]$/.test(b.tagName) ? 0 : 1
        return aIsHeading - bIsHeading || a.textContent!.length - b.textContent!.length
      })

    const targetHeading = candidates[0]

    if (targetHeading) {
      const containerRect = scrollContainerRef.current.getBoundingClientRect()
      const headingRect = targetHeading.getBoundingClientRect()
      const scrollTop = headingRect.top - containerRect.top + scrollContainerRef.current.scrollTop

      scrollContainerRef.current.scrollTo({
        top: scrollTop - 72,
        behavior: 'smooth'
      })
    }
  }, [normalizeHeadingText])

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }}>
      <Header />
      <div className="absolute inset-x-0 bottom-0 top-14">
        <SuperDocComponent scrollContainerRef={scrollContainerRef} />
      </div>
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToHeading={scrollToHeading} />
      </div>
    </div>
  )
}
