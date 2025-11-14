'use client'

import Image from 'next/image'

export default function AddMetricSection() {
  return (
    <div id="panel-add-metric" className="border border-[rgba(217,217,217,0.16)] border-dashed h-[104px] rounded-[8px] flex items-center justify-center relative">
      <div className="flex gap-[10px] items-center">
        <div className="relative size-[18px]">
          <Image
            alt=""
            className="block max-w-none size-full"
            src="/assets/dashboard/icon-plus.svg"
            width={18}
            height={18}
          />
        </div>
        <p className="font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[18px] text-nowrap text-white whitespace-pre">
          Add New Metric
        </p>
      </div>
    </div>
  )
}
