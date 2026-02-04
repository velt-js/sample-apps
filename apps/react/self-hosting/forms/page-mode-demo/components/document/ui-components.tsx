'use client'

import { useState } from 'react'
import { CloseIcon, ChevronIcon, PrivadoAgentIcon } from './icons'

// Status badge component
export const StatusBadge = ({ status = 'Open' }: { status?: string }) => (
  <div
    className="flex items-start px-[5px] py-[2px] rounded-[4px]"
    style={{
      backgroundColor: '#d6ffe5',
      border: '1px solid rgb(134, 239, 172)'
    }}
  >
    <span
      className="text-[11px] font-semibold uppercase tracking-[0.22px] leading-[16px]"
      style={{
        fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
        color: '#17a25c'
      }}
    >
      {status}
    </span>
  </div>
)

// Section outline component (sidebar numbers)
interface SectionOutlineProps {
  number: string
  isActive?: boolean
  onClick?: () => void
}

export const SectionOutline = ({ number, isActive = false, onClick }: SectionOutlineProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-[8px] cursor-pointer hover:opacity-80 transition-opacity"
    aria-label={`Go to section ${number}`}
  >
    <div
      className="flex flex-col items-start p-[2px] rounded-[16px]"
      style={{
        backgroundColor: isActive ? 'rgb(211, 197, 252)' : 'rgb(237, 240, 248)'
      }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.22px] leading-[16px] text-center w-[16px]"
        style={{
          fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
          color: isActive ? '#754cff' : '#465169'
        }}
      >
        {number}
      </span>
    </div>
  </button>
)

// Dropdown component
interface DropdownInputProps {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export const DropdownInput = ({ value, options, onChange }: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-[400px]">
      <div
        className="flex items-center gap-[12px] pl-[6px] pr-[12px] py-[6px] rounded-[8px] cursor-pointer"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(191, 200, 220)'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-1 items-center gap-[4px]">
          <div
            className="flex items-center gap-[4px] pl-[12px] pr-[6px] py-[5px] rounded-[4px]"
            style={{ backgroundColor: 'rgb(242, 246, 252)' }}
          >
            <span
              className="text-[13px] leading-[18px] whitespace-nowrap"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#465169'
              }}
            >
              {value}
            </span>
            <button
              className="flex items-center rounded-[4px] p-[2px]"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
              aria-label="Clear selection"
            >
              <div className="w-[16px] h-[16px] flex items-center justify-center">
                <CloseIcon />
              </div>
            </button>
          </div>
        </div>
        <div className="w-[16px] h-[16px] flex items-center justify-center">
          <ChevronIcon />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 w-full mt-[4px] rounded-[8px] z-10"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(191, 200, 220)',
            boxShadow: 'var(--pia-shadow-xs)'
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-[12px] py-[8px] cursor-pointer hover:bg-gray-50"
              style={{
                fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                color: '#465169',
                fontSize: '13px'
              }}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Privado Agent badge
export const PrivadoAgentBadge = () => (
  <div
    className="flex items-center gap-[24px] pl-[6px] pr-[12px] py-[5px] rounded-[16px]"
    style={{
      background: 'linear-gradient(to right, #f3ebff, #fff5f5)'
    }}
  >
    <div className="flex items-center gap-[8px]">
      <div
        className="w-[16px] h-[16px] rounded-[8px] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: 'rgb(211, 197, 252)' }}
      >
        <PrivadoAgentIcon />
      </div>
      <span
        className="text-[13px] leading-[18px]"
        style={{
          fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
          color: '#5c6c8a'
        }}
      >
        Added by <span style={{ color: '#465169' }}>Privado Agent</span>
      </span>
    </div>
  </div>
)
