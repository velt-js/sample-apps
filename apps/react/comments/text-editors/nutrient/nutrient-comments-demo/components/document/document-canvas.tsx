'use client'

import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

const NutrientComponent = dynamic(() => import('./NutrientComponent'), {
  ssr: false,
})

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pageNavigatorRef = useRef<((pageIndex: number) => void) | null>(null)

  const scrollToPage = useCallback((pageIndex: number) => {
    pageNavigatorRef.current?.(pageIndex)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }}>
      <Header />
      <div className="absolute inset-x-0 bottom-0 top-14">
        <NutrientComponent
          pageNavigatorRef={pageNavigatorRef}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToPage={scrollToPage} />
      </div>
    </div>
  )
}
