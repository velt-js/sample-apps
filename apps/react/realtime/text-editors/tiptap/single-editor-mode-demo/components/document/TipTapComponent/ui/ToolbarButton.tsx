import React from 'react'
import { ToolbarButtonProps } from '../types'

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, alt, onClick, active }) => {
  return (
    <div
      className={`box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all ${
        active ? 'bg-black/10 dark:bg-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'
      }`}
      onClick={onClick}
    >
      <div className="relative shrink-0 size-[20px] transition-all">
        {/* Icons are black SVG strokes; invert to white in dark mode */}
        <img alt={alt} className="block max-w-none size-full dark:invert" src={icon} />
      </div>
    </div>
  )
}
