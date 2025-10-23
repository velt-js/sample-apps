'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import { TableComponent } from './table-component'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-center min-h-full p-8">
            <TableComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
