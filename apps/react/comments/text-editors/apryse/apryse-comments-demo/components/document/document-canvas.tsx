'use client'

import ApryseComponent from './ApryseComponent'
import Header from '../header/header'

export default function DocumentCanvas() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-1 min-h-0">
        <ApryseComponent />
      </div>
    </div>
  )
}
