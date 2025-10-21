'use client'

import { useState } from 'react'

const imgTablerIconMenu2 = "http://localhost:3845/assets/94c0d83d78cf9905498c8e89380e1e086ee73059.svg"
const imgTablerIconSettings = "http://localhost:3845/assets/5a065c3630d9cc07079c42c82c6594e0916778b1.svg"

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

  return (
    <div className="relative w-[254px] h-[800px] bg-black">
      <div className="absolute left-[24px] top-[24px] right-[55px] flex flex-col gap-[8px]">
        <div className="flex items-start gap-[6px] opacity-90">
          <div className="relative shrink-0 size-[12px]">
            <img alt="" className="block max-w-none size-full" src={imgTablerIconMenu2} />
          </div>
          <p className="font-['Urbanist',sans-serif] font-normal leading-none opacity-50 text-[12px] text-white whitespace-pre">
            Mihir&apos;s Workspace
          </p>
        </div>

        <p className="font-['Urbanist',sans-serif] font-semibold leading-none opacity-90 text-[16px] text-white whitespace-pre">
          Attention Is All You Need
        </p>
      </div>

      <div className="absolute left-[24px] top-[155px] right-[92px] bottom-[384px] flex flex-col gap-[12px]">
        <div className="flex gap-[8px] items-center">
          <div className="font-['Geist_Mono',monospace] font-normal leading-[0] opacity-[0.52] text-[10px] text-white uppercase">
            <p className="leading-[1.5] whitespace-pre">Table of Contents</p>
          </div>
        </div>

        <div className="flex flex-col">
          {tableOfContentsItems.map((item, index) => {
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
                    <div className="absolute bg-[rgba(255,255,255,0.24)] bottom-0 left-1/2 top-0 -translate-x-1/2 w-px" />
                    {isActive && (
                      <div className="absolute bg-[#ffc31c] bottom-[7px] left-1/2 top-[7px] -translate-x-1/2 w-[2px]" />
                    )}
                  </div>
                </div>

                <div className="font-['Geist_Mono',monospace] font-normal text-[12px] text-white">
                  <p className="leading-[2.2] whitespace-pre">{item.label}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

    </div>
  )
}
