'use client'

import { useRef, useCallback } from 'react'
import AceComponent from './AceComponent'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToHeading = useCallback((headingText: string) => {
    if (!scrollContainerRef.current) return

    const aceEditor = scrollContainerRef.current.querySelector('.ace_editor') as HTMLElement
    if (aceEditor) {
      const aceInstance = (aceEditor as any).env?.editor
      if (aceInstance) {
        const content = aceInstance.getValue()
        const lines = content.split('\n')
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].replace(/^#+\s*/, '').trim()
          if (line.toLowerCase() === headingText.toLowerCase().trim()) {
            aceInstance.scrollToLine(i, true, true)
            aceInstance.gotoLine(i + 1, 0, true)
            return
          }
        }
      }
    }
  }, [])

  return (
    <div className="w-full h-screen relative">
      <Header />
      <AceComponent scrollContainerRef={scrollContainerRef} />
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToHeading={scrollToHeading} />
      </div>
    </div>
  )
}
