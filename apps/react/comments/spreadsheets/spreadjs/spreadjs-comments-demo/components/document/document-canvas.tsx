'use client'

import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

const SpreadJSComponent = dynamic(() => import('./SpreadJSComponent'), {
  ssr: false,
})

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sheetNavigatorRef = useRef<((sheetName: string) => void) | null>(null)

  const activateSheet = useCallback((sheetName: string) => {
    sheetNavigatorRef.current?.(sheetName)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }}>
      <Header />
      <div className="absolute inset-x-0 bottom-0 top-14">
        <SpreadJSComponent
          sheetNavigatorRef={sheetNavigatorRef}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onActivateSheet={activateSheet} />
      </div>
    </div>
  )
}
