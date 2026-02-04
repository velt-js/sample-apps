'use client'

import Header from '@/components/header/header'
import { BackArrowIcon } from './icons'
import { StatusBadge } from './ui-components'

interface TopHeaderBarProps {
  isGlobalSidebarOpen: boolean
}

export const TopHeaderBar = ({ isGlobalSidebarOpen }: TopHeaderBarProps) => {
  return (
    <div
      className="flex items-center justify-between pl-[12px] pr-[20px] py-[8px] flex-shrink-0"
      style={{
        backgroundColor: 'var(--pia-canvas-bg, rgba(255, 255, 255, 0.6))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--pia-border-medium, rgb(221, 227, 238))',
      }}
    >
      <div className="flex items-center gap-[8px]">
        {/* Back Button */}
        <button
          className="flex items-center justify-center p-[6px] rounded-[8px] overflow-hidden hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <BackArrowIcon />
        </button>

        {/* Heading */}
        <div className="flex items-center gap-[8px]">
          <span
            className="text-[16px] leading-[24px] font-medium whitespace-nowrap"
            style={{
              fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
              color: '#172026'
            }}
          >
            PIA Assessment
          </span>
          <div className="flex items-start pt-[2px] px-[2px]">
            <StatusBadge status="Open" />
          </div>
        </div>
      </div>

      {/* [Velt] Header tools: Presence and Comments Sidebar Button */}
      <Header isGlobalSidebarOpen={isGlobalSidebarOpen} />
    </div>
  )
}
