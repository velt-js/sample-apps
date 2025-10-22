'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import TipTapEditor from './TipTapComponent/tiptap'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="w-full h-full border rounded-lg bg-card p-4">
            <h2 className="text-2xl font-bold mb-4">tiptap-demo-2</h2>
            <p className="text-muted-foreground mb-2">
              <strong>Framework:</strong> react
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Document:</strong> text-editors
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Implementation:</strong> libraries
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Library/Solution:</strong> tiptap
            </p>
            <div className="mt-8 h-[500px]">
              <TipTapEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
