'use client'

import Image from 'next/image'
import { VeltCommentBubble, VeltCommentTool } from '@veltdev/react'

interface MetricCardProps {
  id: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
  value: string;
  percentageChange: string;
  trendIconSrc: string;
  isPositiveTrend: boolean;
}

export default function MetricCard({
  id,
  iconSrc,
  iconAlt,
  title,
  value,
  percentageChange,
  trendIconSrc,
  isPositiveTrend
}: MetricCardProps) {
  return (
    <div
      id={id}
      className="flex-1 border border-solid box-border flex flex-col h-[145px] items-start justify-between p-[24px] rounded-[8px]"
      style={{ borderColor: 'var(--app-divider)' }}
    >
      <div className="flex gap-[4px] items-end w-full">
        <div className="flex-1 flex gap-[8px] items-center">
          <div className="overflow-clip relative size-[16px]">
            <Image
              alt={iconAlt}
              className="block max-w-none size-full"
              src={iconSrc}
              width={16}
              height={16}
            />
          </div>
          <p className="flex-1 font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px]" style={{ color: 'var(--app-text-primary)' }}>
            {title}
          </p>
        </div>
        <div className="flex gap-[8px] items-center">
          {/* [Velt] Show comment count bubble for this metric card */}
          <VeltCommentBubble targetElementId={id} />
          {/* [Velt] Add comment tool button for this metric card */}
          <VeltCommentTool targetElementId={id} />
        </div>
      </div>
      <div className="flex gap-[8px] items-baseline w-full">
        <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[24px] text-nowrap whitespace-pre" style={{ color: 'var(--app-text-primary)' }}>
          {value}
        </p>
        <div className="flex gap-[5px] items-center">
          <p className={`font-['Poppins',sans-serif] font-medium leading-none not-italic text-[14px] text-nowrap whitespace-pre ${isPositiveTrend ? 'text-[#58d451]' : 'text-[#ff7650]'}`}>
            {percentageChange}
          </p>
          <div className="relative size-[14px]">
            <Image
              alt=""
              className="block max-w-none size-full"
              src={trendIconSrc}
              width={14}
              height={14}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
