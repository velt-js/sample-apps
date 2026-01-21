'use client'

import VeltTools from '@/components/velt/VeltTools'

interface HeaderProps {
  toggleGlobalSidebar: () => void
  isGlobalSidebarOpen: boolean
}

export default function Header({
  toggleGlobalSidebar,
  isGlobalSidebarOpen
}: HeaderProps) {
  return (
    <div className="flex items-center gap-[12px]">
      {/* [Velt] Show online users/collaborators */}
      <VeltTools />
      {/* Custom button to toggle embedded comments sidebar */}
      <button
        onClick={toggleGlobalSidebar}
        className="flex items-center justify-center gap-[6px] px-[12px] py-[6px] rounded-[8px] transition-colors"
        style={{
          backgroundColor: isGlobalSidebarOpen ? '#5a34d9' : '#754cff',
          boxShadow: '0px 0px 0px 1px #5a34d9, 0px 1px 2px rgba(23, 32, 38, 0.24), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
        }}
        aria-label={isGlobalSidebarOpen ? 'Close comments' : 'Open comments'}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span
          style={{
            fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            color: 'white'
          }}
        >
          Comments
        </span>
      </button>
    </div>
  )
}
