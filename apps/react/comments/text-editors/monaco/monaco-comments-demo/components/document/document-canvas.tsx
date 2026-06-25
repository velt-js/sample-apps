'use client'

import { useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'
import type { MonacoNavigator } from './MonacoComponent/types'

const MonacoComponent = dynamic(() => import('./MonacoComponent'), {
  ssr: false,
})

export default function DocumentCanvas() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const monacoNavigatorRef = useRef<MonacoNavigator | null>(null)

  const scrollToHeading = useCallback((headingText: string) => {
    monacoNavigatorRef.current?.scrollToHeading(headingText)
  }, [])

  return (
    <div className="w-full h-screen relative">
      <Header />
      <MonacoComponent
        scrollContainerRef={scrollContainerRef}
        registerNavigator={(navigator) => {
          monacoNavigatorRef.current = navigator
        }}
      />
      <div className="absolute top-0 left-0 z-10">
        <Sidebar onScrollToHeading={scrollToHeading} />
      </div>
    </div>
  )
}
