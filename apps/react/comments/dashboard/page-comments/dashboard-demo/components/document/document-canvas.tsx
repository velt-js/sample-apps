'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import Image from 'next/image'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-black">
          <div className="p-6 max-w-[1440px] mx-auto" data-name="Dashboard">
            {/* Breadcrumb Navigation */}
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

            {/* Page Title and Subtitle */}
            <div className="flex flex-col gap-[16px] items-start leading-none text-white mb-[24px]">
              <p className="font-['Urbanist',sans-serif] font-semibold text-[32px]">
                Marketing Spent
              </p>
              <p className="font-['Urbanist',sans-serif] font-normal opacity-[0.52] text-[14px]">
                Overview of marketing spent on awareness and sales
              </p>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-white opacity-[0.08] mb-[24px]" />

            {/* Metric Cards Row */}
            <div className="flex gap-[7px] items-center mb-[6px]">
              {/* Search Card */}
              <div className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid box-border flex flex-col h-[145px] items-start justify-between p-[24px] rounded-[8px]">
                <div className="flex gap-[4px] items-end w-full">
                  <div className="flex-1 flex gap-[8px] items-center">
                    <div className="overflow-clip relative size-[16px]">
                      <div className="absolute inset-[13.74%_10.4%]">
                        <Image
                          alt="Search"
                          className="block max-w-none"
                          src="/assets/dashboard/google-logo.svg"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                    <p className="font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-nowrap text-white whitespace-pre">
                      Search
                    </p>
                  </div>
                </div>
                <div className="flex gap-[8px] items-baseline w-full">
                  <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[24px] text-nowrap text-white whitespace-pre">
                    $12.5K
                  </p>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[#ff7650] text-[14px] text-nowrap whitespace-pre">
                      15%
                    </p>
                    <div className="relative size-[14px]">
                      <Image
                        alt=""
                        className="block max-w-none size-full"
                        src="/assets/dashboard/icon-trending-down.svg"
                        width={14}
                        height={14}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reddit Card */}
              <div className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid box-border flex flex-col h-[145px] items-start justify-between p-[24px] rounded-[8px]">
                <div className="flex gap-[4px] items-end w-full">
                  <div className="flex-1 flex gap-[8px] items-center">
                    <div className="relative size-[16px]">
                      <Image
                        alt="Reddit"
                        className="block max-w-none size-full"
                        src="/assets/dashboard/reddit-logo.svg"
                        width={16}
                        height={16}
                      />
                    </div>
                    <p className="flex-1 font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-white">
                      Reddit
                    </p>
                  </div>
                </div>
                <div className="flex gap-[8px] items-baseline w-full">
                  <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[24px] text-nowrap text-white whitespace-pre">
                    $32.8K
                  </p>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[#58d451] text-[14px] text-nowrap whitespace-pre">
                      120%
                    </p>
                    <div className="relative size-[14px]">
                      <Image
                        alt=""
                        className="block max-w-none size-full"
                        src="/assets/dashboard/icon-trending-down-1.svg"
                        width={14}
                        height={14}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Card */}
              <div className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid box-border flex flex-col h-[145px] items-start justify-between p-[24px] rounded-[8px]">
                <div className="flex gap-[4px] items-end w-full">
                  <div className="flex-1 flex gap-[8px] items-center">
                    <div className="overflow-clip relative size-[16px]">
                      <div className="absolute bottom-0 left-[0.02%] right-[-0.02%] top-0">
                        <Image
                          alt="Meta"
                          className="block max-w-none size-full"
                          src="/assets/dashboard/artboard-outline.svg"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                    <p className="flex-1 font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-white">
                      Meta
                    </p>
                  </div>
                </div>
                <div className="flex gap-[8px] items-baseline w-full">
                  <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[24px] text-nowrap text-white whitespace-pre">
                    $13.5K
                  </p>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[#58d451] text-[14px] text-nowrap whitespace-pre">
                      15%
                    </p>
                    <div className="relative size-[14px]">
                      <Image
                        alt=""
                        className="block max-w-none size-full"
                        src="/assets/dashboard/icon-trending-down-1.svg"
                        width={14}
                        height={14}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitter/X Card */}
              <div className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid box-border flex flex-col h-[145px] items-start justify-between p-[24px] rounded-[8px]">
                <div className="flex gap-[4px] items-end w-full">
                  <div className="flex-1 flex gap-[8px] items-center">
                    <div className="overflow-clip relative size-[16px]">
                      <div className="absolute inset-[9.78%_9.79%_9.78%_9.77%]">
                        <div className="absolute bottom-0 left-[-0.01%] right-0 top-0">
                          <Image
                            alt="Twitter / X"
                            className="block max-w-none size-full"
                            src="/assets/dashboard/twitter-logo.svg"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="flex-1 font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-white">
                      Twitter / X
                    </p>
                  </div>
                </div>
                <div className="flex gap-[8px] items-baseline w-full">
                  <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[24px] text-nowrap text-white whitespace-pre">
                    $8.3K
                  </p>
                  <div className="flex gap-[5px] items-center">
                    <p className="font-['Poppins',sans-serif] font-medium leading-none not-italic text-[#ff7650] text-[14px] text-nowrap whitespace-pre">
                      2%
                    </p>
                    <div className="relative size-[14px]">
                      <Image
                        alt=""
                        className="block max-w-none size-full"
                        src="/assets/dashboard/icon-trending-down.svg"
                        width={14}
                        height={14}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Sections */}
            <div className="flex gap-[6px] items-center leading-[0] mb-[6px]">
              {/* First Chart */}
              <div className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid h-[284px] rounded-[8px] p-[24px] relative">
                <p className="font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-nowrap text-white whitespace-pre mb-[17px]">
                  Visitors per Week
                </p>
                <div className="relative w-full h-[196px]">
                  <Image
                    alt="Visitors per Week Chart"
                    className="block max-w-none size-full"
                    src="/assets/dashboard/chart-graph.svg"
                    width={504}
                    height={196}
                  />
                </div>
              </div>

              {/* Second Chart */}
              <div className="flex-1 border border-[rgba(217,217,217,0.08)] border-solid h-[284px] rounded-[8px] p-[24px] relative">
                <p className="font-['Poppins',sans-serif] leading-none not-italic opacity-[0.51] text-[15px] text-nowrap text-white whitespace-pre mb-[17px]">
                  Visitors per Week
                </p>
                <div className="relative w-full h-[196px]">
                  <Image
                    alt="Visitors per Week Chart"
                    className="block max-w-none size-full"
                    src="/assets/dashboard/chart-graph.svg"
                    width={504}
                    height={196}
                  />
                </div>
              </div>
            </div>

            {/* Notification Banner */}
            <div className="bg-[rgba(245,93,103,0.12)] box-border flex gap-[18px] h-[56px] items-center p-[16px] rounded-[8px] mb-[6px]">
              <div className="relative size-[24px]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src="/assets/dashboard/icon-bulb.svg"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-['Urbanist',sans-serif] font-normal leading-none text-[15px] text-nowrap text-white whitespace-pre">
                You got 50 signups from Reddit.
              </p>
            </div>

            {/* Add New Metric Section */}
            <div className="border border-[rgba(217,217,217,0.16)] border-dashed h-[104px] rounded-[8px] flex items-center justify-center">
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
          </div>
        </div>
      </div>
    </div>
  )
}
