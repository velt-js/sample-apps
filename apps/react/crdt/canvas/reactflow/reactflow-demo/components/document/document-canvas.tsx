'use client'

import ReactFlowComponent from '@/components/document/ReactFlowComponent'
import Sidebar from '@/components/sidebar/sidebar'

export default function DocumentCanvas() {
  return (
    <main className="relative flex h-screen w-screen">
      <ReactFlowComponent />
      {/* Sidebar overlay positioned at top-left as per Figma design */}
      <div className="absolute left-3 top-3 z-10">
        <Sidebar />
      </div>
    </main>
  )
}
