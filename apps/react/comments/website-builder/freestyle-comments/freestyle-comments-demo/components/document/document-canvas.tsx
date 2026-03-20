'use client'

import Sidebar from '@/components/sidebar/sidebar'
import Header from '@/components/header/header'
import FreestyleCanvas from './FreestyleCanvas'

export default function DocumentCanvas() {
  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Main canvas area - fills available space */}
      <div className="relative flex-1 min-h-0">
        <FreestyleCanvas />

        {/* Sidebar - positioned on left, overlays canvas */}
        <div className="absolute top-0 left-0 h-full z-10">
          <Sidebar />
        </div>

        <Header />
      </div>
    </div>
  )
}
