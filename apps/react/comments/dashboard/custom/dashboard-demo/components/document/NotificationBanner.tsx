'use client'

import Image from 'next/image'

export default function NotificationBanner() {
  return (
    <div id="panel-notification" className="bg-[rgba(245,93,103,0.12)] box-border flex gap-[18px] h-[56px] items-center p-[16px] rounded-[8px] mb-[6px]">
      <div className="relative size-[24px]">
        <Image
          alt=""
          className="block max-w-none size-full"
          src="/assets/dashboard/icon-bulb.svg"
          width={24}
          height={24}
        />
      </div>
      <p className="flex-1 font-['Urbanist',sans-serif] font-normal leading-none text-[15px] text-nowrap text-white whitespace-pre">
        You got 50 signups from Reddit.
      </p>
    </div>
  )
}
