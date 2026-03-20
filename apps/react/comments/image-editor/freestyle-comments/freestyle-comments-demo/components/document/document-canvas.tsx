'use client'

import Header from '@/components/header/header'
import FreestyleCanvas from './FreestyleCanvas'

export default function DocumentCanvas() {
  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Main canvas area - fills available space */}
      <div className="relative flex-1 min-h-0">
        <FreestyleCanvas />
        <Header />
      </div>
    </div>
  )
}
