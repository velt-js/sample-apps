'use client'

import dynamic from 'next/dynamic'
import Header from '../header/header'

const TaskListEditor = dynamic(() => import('./TaskListEditor'), { ssr: false })

export default function DocumentCanvas() {
  return (
    <div className="w-full h-screen relative">
      <Header />
      <TaskListEditor />
    </div>
  )
}
