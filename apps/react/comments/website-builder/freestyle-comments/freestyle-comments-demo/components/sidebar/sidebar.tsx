'use client'

import { useState } from 'react'

interface LayerItem {
  name: string
  type: 'text' | 'frame'
  nested?: boolean
}

const layers: LayerItem[] = [
  { name: 'Title', type: 'text' },
  { name: 'Sub Heading', type: 'text' },
  { name: 'Button', type: 'frame' },
  { name: 'Explore Cities', type: 'text', nested: true },
  { name: 'Where do you want to go?', type: 'text' },
  { name: 'Pin Icon', type: 'frame' },
  { name: 'Button', type: 'frame' },
  { name: 'View All', type: 'text', nested: true },
  { name: 'Location Card', type: 'frame' },
  { name: 'Rome', type: 'text', nested: true },
  { name: '$320', type: 'text', nested: true },
  { name: 'Location Card', type: 'frame' },
  { name: 'Berlin', type: 'text', nested: true },
  { name: '$421', type: 'text', nested: true },
  { name: 'Location Card', type: 'frame' },
  { name: 'Milan', type: 'text', nested: true },
  { name: '$160', type: 'text', nested: true },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Expand Button - shown when sidebar is collapsed */}
      {isCollapsed && (
        <div
          className="absolute left-4 top-4 z-50 cursor-pointer flex items-center justify-center"
          onClick={() => setIsCollapsed(false)}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgb(14, 14, 14)',
            borderRadius: '8px',
          }}
        >
          <img
            src="/assets/tabler-icon-chevron-left-pipe.svg"
            alt="Expand"
            className="block max-w-none w-5 h-5"
            style={{ transform: 'rotate(180deg)' }}
          />
        </div>
      )}

      <aside
        className="flex flex-col h-full transition-all duration-300 overflow-hidden"
        style={{
          width: isCollapsed ? '0px' : '251px',
          backgroundColor: 'rgb(14, 14, 14)',
          opacity: isCollapsed ? 0 : 1,
        }}
      >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: '12px 12px 12px 16px',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-[8px]">
          <div className="relative" style={{ width: '16px', height: '16px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: 'rgb(245, 93, 103)',
                borderRadius: '4px',
              }}
            />
            <span
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                fontFamily: 'Urbanist, sans-serif',
                fontSize: '11px',
                fontWeight: '700',
                color: 'rgb(0, 0, 0)',
                top: '3px',
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              color: 'rgb(255, 255, 255)',
            }}
          >
            SuperSite
          </span>
        </div>

        {/* Collapse Button */}
        <button
          className="flex items-center justify-center"
          style={{ padding: '4px' }}
          onClick={() => setIsCollapsed(true)}
        >
          <img
            src="/assets/tabler-icon-chevron-left-pipe.svg"
            alt="Collapse"
            style={{ width: '16px', height: '16px' }}
          />
        </button>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col gap-[8px] overflow-auto"
        style={{ padding: '0 12px' }}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-[8px]"
          style={{
            padding: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
          }}
        >
          <img
            src="/assets/tabler-icon-search.svg"
            alt="Search"
            style={{ width: '16px', height: '16px' }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.32)',
            }}
          >
            Search Layers...
          </span>
        </div>

        {/* Layer List */}
        <div className="flex flex-col gap-[2px]">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="flex items-center gap-[8px] rounded-[8px] cursor-pointer hover:bg-white/5"
              style={{
                padding: layer.nested ? '8px 8px 8px 32px' : '8px',
              }}
            >
              <img
                src={
                  layer.type === 'text'
                    ? '/assets/tabler-icon-text-size.svg'
                    : '/assets/tabler-icon-frame.svg'
                }
                alt={layer.type}
                style={{ width: '16px', height: '16px' }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.52)',
                }}
              >
                {layer.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
    </>
  )
}
