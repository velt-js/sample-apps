'use client'

import Image from 'next/image'
import { VeltCommentBubble, VeltCommentTool } from '@veltdev/react'

interface ChartPanelProps {
  id: string;
  targetId: string;
  title: string;
}

export default function ChartPanel({ id, targetId, title }: ChartPanelProps) {
  return (
    <div
      id={id}
      data-velt-target-comment-element-id={targetId}
      className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid h-[284px] rounded-[8px] p-[24px] relative"
    >
      <div className="flex gap-[4px] items-center justify-between w-full mb-[17px]">
        <p className="font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-nowrap text-white whitespace-pre">
          {title}
        </p>
        <div className="flex gap-[8px] items-center">
          <VeltCommentBubble targetCommentElementId={targetId} />
          <VeltCommentTool targetCommentElementId={targetId} />
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
