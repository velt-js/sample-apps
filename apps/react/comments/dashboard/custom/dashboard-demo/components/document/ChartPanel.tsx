'use client'

import Image from 'next/image'
import { VeltCommentBubble, VeltCommentTool } from '@veltdev/react'

interface ChartPanelProps {
  id: string;
  title: string;
}

export default function ChartPanel({ id, title }: ChartPanelProps) {
  return (
    <div
      id={id}
      className="flex-1 border border-solid h-[284px] rounded-[8px] p-[24px] relative"
      style={{ borderColor: 'var(--app-divider)' }}
    >
      <div className="flex gap-[4px] items-center justify-between w-full mb-[17px]">
        <p className="font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-nowrap whitespace-pre" style={{ color: 'var(--app-text-primary)' }}>
          {title}
        </p>
        <div className="flex gap-[8px] items-center">
          {/* [Velt] Show comment count bubble for this chart panel */}
          <VeltCommentBubble targetElementId={id} />
          {/* [Velt] Add comment tool button for this chart panel */}
          <VeltCommentTool targetElementId={id} />
        </div>
      </div>
      <div className="relative w-full h-[196px]">
        <Image
          alt={`${title} Chart`}
          className="block max-w-none"
          src="/assets/dashboard/chart-graph.svg"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
