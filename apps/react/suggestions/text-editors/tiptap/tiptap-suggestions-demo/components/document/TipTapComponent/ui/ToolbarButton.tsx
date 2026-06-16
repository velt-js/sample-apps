import React from 'react'
import { ToolbarButtonProps } from '../types'

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, alt, onClick, active }) => {
  return (
    <div
      className="box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all"
      style={{
        backgroundColor: active ? 'var(--app-text-primary)' : undefined,
      }}
      onClick={onClick}
    >
      <div className="relative shrink-0 size-[20px] transition-all">
        <img
          alt={alt}
          className="block max-w-none size-full"
          src={icon}
          style={{
            filter: active
              ? 'var(--app-icon-invert)'
              : 'var(--app-icon-active-invert)',
            opacity: active ? 1 : 0.7,
          }}
        />
      </div>
    </div>
  )
}
