import React from 'react'
import { ToolbarButtonProps } from '../types'

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, alt, onClick, active }) => {
  return (
    <div
      className={`box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all ${
        active ? 'bg-[rgb(255,255,255)]' : 'hover:bg-white/10'
      }`}
      onClick={onClick}
    >
      <div className={`relative shrink-0 size-[20px] transition-all`}>
        <img
          alt={alt}
          className="block max-w-none size-full"
          src={icon}
          style={{
            filter: active
              ? 'brightness(0) saturate(100%) invert(9%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(92%)' // rgb(23,23,23)
              : 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)' // rgb(255,255,255)
          }}
        />
      </div>
    </div>
  )
}
