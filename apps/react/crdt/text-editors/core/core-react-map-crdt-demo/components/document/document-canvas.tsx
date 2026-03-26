'use client'

import dynamic from 'next/dynamic'
import Header from '../header/header'

const MapStoreEditor = dynamic(() => import('./MapStoreEditor'), { ssr: false })

export default function DocumentCanvas() {
  return (
    <div className="w-full h-screen relative">
      <Header />
      <MapStoreEditor />
    </div>
  )
}
