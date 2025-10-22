'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import BlockNoteCollaborativeEditor from './BlockNote Component/blocknote'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <div className="w-full h-full relative">
            <BlockNoteCollaborativeEditor />
          </div>
        </div>
      </div>
    </div>
  )
}
