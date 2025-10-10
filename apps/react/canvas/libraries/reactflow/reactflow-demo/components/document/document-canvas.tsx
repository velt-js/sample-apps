'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="w-full h-full border rounded-lg bg-card p-4">
            <h2 className="text-2xl font-bold mb-4">reactflow-demo</h2>
            <p className="text-muted-foreground mb-2">
              <strong>Framework:</strong> react
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Document:</strong> canvas
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Implementation:</strong> libraries
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Library/Solution:</strong> reactflow
            </p>
            <div className="mt-8 p-4 border rounded">
              <p>Start building your reactflow integration here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
