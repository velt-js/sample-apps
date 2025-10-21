'use client'

import TiptapEditor from '@/components/tiptap/tiptap-editor'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

export default function DocumentCanvas() {
  return (
    <div className="w-full h-screen relative">
      {/* Header with Velt Tools */}
      <Header />

      {/* Tiptap Editor - Full screen */}
      <TiptapEditor />

      {/* Sidebar - Positioned on top of editor */}
      <div className="absolute top-0 left-0 z-10">
        <Sidebar />
      </div>
    </div>
  )
}
