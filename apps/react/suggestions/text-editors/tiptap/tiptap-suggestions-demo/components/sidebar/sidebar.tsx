'use client'

import { useState } from 'react'

const imgTablerIconChevronLeftPipe = "/icons/chevron-left-pipe.svg"

interface TableOfContentsItem {
  id: string
  label: string
}

const tableOfContentsItems: TableOfContentsItem[] = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'background', label: 'Background' },
  { id: 'model-architecture', label: 'Model Architecture' },
  { id: 'why-self-attention', label: 'Why Self-Attention' },
  { id: 'training', label: 'Training' },
  { id: 'results', label: 'Results' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'references', label: 'References' },
]

interface SidebarProps {
  onScrollToHeading?: (headingText: string) => void
}

export default function Sidebar({ onScrollToHeading }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('abstract')
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <>
      {/* Expand Button - shown when sidebar is collapsed */}
      {isCollapsed && (
        <div
          className="fixed left-4 top-4 z-50 cursor-pointer flex items-center justify-center"
          onClick={() => setIsCollapsed(false)}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "var(--app-sidebar-bg)",
            borderRadius: "8px",
          }}
        >
          <img
            src={imgTablerIconChevronLeftPipe}
            alt="Expand"
            className="block max-w-none w-5 h-5"
            style={{ transform: 'rotate(180deg)', filter: 'var(--app-icon-invert)' }}
          />
        </div>
      )}

      {/* Sidebar - with smooth animation */}
      <aside
        className="relative transition-all duration-300"
        style={{
          color: 'var(--app-text-primary)',
          width: isCollapsed ? "0px" : "254px",
          height: "calc(100vh - 32px)",
          backgroundColor: 'var(--app-sidebar-bg)',
          borderRadius: '12px',
          boxShadow: '0px -24px 100px 0px rgba(0, 0, 0, 0.25)',
          margin: "16px",
          marginRight: "8px",
          overflow: "hidden",
          opacity: isCollapsed ? 0 : 1,
        }}
      >
      <div className="absolute left-[24px] top-[24px] right-[55px] flex flex-col gap-[8px]">
        <div className="flex items-start gap-[6px]">
          <div className="relative shrink-0 size-[12px] opacity-50">
            <svg width="12" height="12" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="8" height="1" fill="currentColor" />
              <rect x="0" y="2.5" width="8" height="1" fill="currentColor" />
              <rect x="0" y="5" width="8" height="1" fill="currentColor" />
            </svg>
          </div>
          <p className="font-['Urbanist',sans-serif] font-normal leading-none opacity-50 text-[12px] text-current whitespace-pre">
            Mihir&apos;s Workspace
          </p>
        </div>

        <p className="font-['Urbanist',sans-serif] font-semibold leading-none opacity-90 text-[16px] text-current whitespace-pre">
          Attention Is All You Need
        </p>
      </div>

      <div className="absolute left-[24px] top-[155px] right-[24px] bottom-[384px] flex flex-col gap-[12px]">
        <div className="flex gap-[8px] items-center justify-between">
          <div className="font-['Geist_Mono',monospace] font-normal leading-[0] opacity-[0.52] text-[10px] text-current uppercase">
            <p className="leading-[1.5] whitespace-pre">Table of Contents</p>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex gap-2.5 items-center p-2 rounded-full shrink-0 transition-colors -mr-2"
            style={{ filter: 'var(--app-icon-invert)' }}
          >
            <img
              src={imgTablerIconChevronLeftPipe}
              alt="Collapse"
              className="block max-w-none w-5 h-5"
            />
          </button>
        </div>

        <div className="flex flex-col">
          {tableOfContentsItems.map((item) => {
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id)
                  if (onScrollToHeading) {
                    onScrollToHeading(item.label)
                  }
                }}
                className={`flex gap-[${isActive ? '8' : '10'}px] items-center ${isActive ? '' : 'opacity-[0.52]'} w-full text-left`}
              >
                <div className="flex flex-row items-center self-stretch">
                  <div className="h-full overflow-clip relative shrink-0 w-[12px]">
                    <div className="absolute bottom-0 left-1/2 top-0 -translate-x-1/2 w-px" style={{ backgroundColor: 'var(--app-text-muted)' }} />
                    {isActive && (
                      <div className="absolute bg-[#ffc31c] bottom-[7px] left-1/2 top-[7px] -translate-x-1/2 w-[2px]" />
                    )}
                  </div>
                </div>

                <div className="font-['Geist_Mono',monospace] font-normal text-[12px] text-current">
                  <p className="leading-[2.2] whitespace-pre">{item.label}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

    </aside>
    </>
  )
}
