'use client'

import { useState } from 'react'

const imgTablerIconChevronLeftPipe = "/icons/chevron-left-pipe.svg"

interface DocumentItem {
  id: string
  emoji: string
  label: string
}

const starredDocuments: DocumentItem[] = [
  { id: 'attention', emoji: '\u{1F9E0}', label: 'Attention Is All You Need' },
  { id: 'layer-norm', emoji: '\u{1F9C8}', label: 'Layer Normalization' },
  { id: 'power-attention', emoji: '\u{1F308}', label: 'The Power of Attention Mechanisms' },
]

const privateDocuments: DocumentItem[] = [
  { id: 'harnessing', emoji: '\u{1F6A8}', label: 'Harnessing Attention for Enhanced Learning' },
  { id: 'revolutionizing', emoji: '\u{1F6DE}', label: 'Revolutionizing Neural Networks with Attention' },
  { id: 'frontier', emoji: '\u{2699}\u{FE0F}', label: 'Attention Mechanisms: A New Frontier in AI' },
  { id: 'transforming', emoji: '\u{1FAA0}', label: 'Transforming Data Processing through Attention' },
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('attention')
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
      <aside
        className="relative shrink-0 flex flex-col transition-all duration-300 overflow-hidden"
        style={{
          width: isCollapsed ? '48px' : '251px',
          minWidth: isCollapsed ? '48px' : '251px',
          height: '100%',
          backgroundColor: 'var(--app-sidebar-bg)',
        }}
      >
        {/* Collapsed state: just show expand button */}
        {isCollapsed && (
          <div className="flex items-center justify-center pt-3">
            <button
              onClick={() => setIsCollapsed(false)}
              className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
              }}
            >
              <img
                src={imgTablerIconChevronLeftPipe}
                alt="Expand"
                className="block w-4 h-4"
                style={{ transform: 'rotate(180deg)', filter: 'var(--app-icon-invert)' }}
              />
            </button>
          </div>
        )}
        {/* Expanded content */}
        {!isCollapsed && (
          <>
            {/* Top: header + document list */}
            <div className="flex flex-col flex-1 min-h-0">
              {/* Header */}
              <div
                className="flex items-center justify-between shrink-0"
                style={{ padding: '12px 12px 12px 16px', gap: '45px' }}
              >
                <div className="flex items-center gap-2">
                  {/* Hamburger menu icon */}
                  <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect y="0" width="11" height="1.2" rx="0.6" fill="var(--app-text-primary)" />
                      <rect y="3.4" width="11" height="1.2" rx="0.6" fill="var(--app-text-primary)" />
                      <rect y="6.8" width="11" height="1.2" rx="0.6" fill="var(--app-text-primary)" />
                    </svg>
                  </div>
                  <span
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--app-text-primary)',
                    }}
                  >
                    Mihir&apos;s Workspace
                  </span>
                </div>
                {/* Collapse button */}
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="shrink-0 flex items-center justify-center p-1 rounded hover:opacity-70 transition-opacity"
                >
                  <img
                    src={imgTablerIconChevronLeftPipe}
                    alt="Collapse"
                    className="block w-4 h-4"
                    style={{ filter: 'var(--app-icon-invert)' }}
                  />
                </button>
              </div>

              {/* Divider */}
              <div className="shrink-0" style={{ height: '1px', backgroundColor: 'var(--app-border)' }} />

              {/* Document list */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-2">
                <DocumentSection title="Starred" items={starredDocuments} activeItem={activeItem} onSelect={setActiveItem} />
                <DocumentSection title="Private" items={privateDocuments} activeItem={activeItem} onSelect={setActiveItem} />
              </div>
            </div>

            {/* Bottom: Settings */}
            <div className="shrink-0" style={{ padding: '16px', borderTop: '1px solid var(--app-border)' }}>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="var(--app-text-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="2.5" />
                    <path d="M6.8 1.8l-.3 1.1a4.8 4.8 0 00-1.2.7L4.2 3.2l-1.2 2 .8.8a4.8 4.8 0 000 1.4l-.8.8 1.2 2 1.1-.4a4.8 4.8 0 001.2.7l.3 1.1h2.4l.3-1.1a4.8 4.8 0 001.2-.7l1.1.4 1.2-2-.8-.8a4.8 4.8 0 000-1.4l.8-.8-1.2-2-1.1.4a4.8 4.8 0 00-1.2-.7L9.2 1.8z" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--app-text-primary)',
                  }}
                >
                  Settings
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
  )
}

function DocumentSection({
  title,
  items,
  activeItem,
  onSelect,
}: {
  title: string
  items: DocumentItem[]
  activeItem: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col" style={{ gap: '4px' }}>
      {/* Section label */}
      <div style={{ padding: '6px 8px' }}>
        <span
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgb(163, 163, 163)',
          }}
        >
          {title}
        </span>
      </div>
      {/* Document items */}
      <div className="flex flex-col" style={{ gap: '2px' }}>
        {items.map((item) => {
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="flex items-center w-full text-left transition-colors"
              style={{
                gap: '12px',
                padding: '8px',
                borderRadius: isActive ? '8px' : '32px',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              }}
            >
              <span className="shrink-0 text-[15px] leading-none">{item.emoji}</span>
              <span
                className="truncate"
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--app-text-primary)',
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
