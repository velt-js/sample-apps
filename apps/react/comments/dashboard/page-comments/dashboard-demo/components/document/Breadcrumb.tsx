'use client'

import Image from 'next/image'

export default function Breadcrumb() {
  return (
    <div className="flex gap-[16px] items-center mb-[46px]">
      <div className="flex gap-[8px] items-center">
        <div className="relative size-[14px]">
          <Image
            alt="All Dashboards"
            className="block max-w-none size-full"
            src="/assets/dashboard/icon-layout-grid.svg"
            width={14}
            height={14}
          />
        </div>
        <p className="font-['Inter',sans-serif] font-normal leading-[1.1] not-italic text-[13px] text-[rgba(255,255,255,0.52)] text-nowrap whitespace-pre">
          All Dashboards
        </p>
      </div>
      <div className="relative size-[12px]">
        <Image
          alt=""
          className="block max-w-none size-full"
          src="/assets/dashboard/icon-chevron-right.svg"
          width={12}
          height={12}
        />
      </div>
      <div className="flex gap-[8px] items-center">
        <div className="relative size-[14px]">
          <Image
            alt=""
            className="block max-w-none size-full"
            src="/assets/dashboard/frame.svg"
            width={14}
            height={14}
          />
        </div>
        <p className="font-['Inter',sans-serif] font-normal leading-[1.1] not-italic text-[13px] text-[rgba(255,255,255,0.52)] text-nowrap whitespace-pre">
          Marketing Spend
        </p>
      </div>
    </div>
  )
}
