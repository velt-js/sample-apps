import React from 'react'

export const ToolbarDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center relative shrink-0 h-[20px]">
      <div className="w-[1px] h-full opacity-20" style={{ backgroundColor: 'var(--app-text-primary)' }}></div>
    </div>
  )
}
