'use client'

import dynamic from 'next/dynamic'
import Header from '../header/header'

const MindMapEditor = dynamic(() => import('./MindMapEditor'), { ssr: false })

export default function DocumentCanvas() {
  return (
    <div className="w-full h-screen relative">
      <Header />
      <MindMapEditor />
    </div>
  )
}
