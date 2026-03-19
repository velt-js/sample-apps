'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import { SidebarProvider } from '@/components/sidebar/SidebarContext'
import { SelectedCellProvider } from './SelectedCellContext'
import { TableComponent } from './day-view-table-component'

export default function DocumentCanvas() {
  return (
    <SidebarProvider>
      <SelectedCellProvider>
        <div className="flex w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--app-bg)' }}>
          <Sidebar />
          <div className="flex-1 overflow-auto relative">
            <Header />
            <TableComponent />
          </div>
        </div>
      </SelectedCellProvider>
    </SidebarProvider>
  )
}
