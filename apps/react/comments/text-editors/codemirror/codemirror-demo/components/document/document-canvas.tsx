'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import CodeEditorTabs from '@/components/document/CodeMirror Components/CodeEditorTabs'
import { VeltCollaboration } from '@/components/velt/VeltCollaboration'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <VeltCollaboration />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="w-full h-full border rounded-lg bg-card p-4">
            <div className="h-full flex flex-col">
              <CodeEditorTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
