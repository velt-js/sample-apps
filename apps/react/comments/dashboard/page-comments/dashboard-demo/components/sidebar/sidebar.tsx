export default function Sidebar() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex flex-col items-start justify-between relative w-[251px] h-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className="box-border content-stretch flex items-center justify-between pl-[16px] pr-[12px] py-[12px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="[grid-area:1_/_1] bg-[#f55d67] ml-0 mt-0 rounded-[4px] size-[16px]" />
              <p className="[grid-area:1_/_1] font-[var(--font-urbanist)] font-bold leading-none ml-[3px] mt-[3px] relative text-[11px] text-black text-nowrap whitespace-pre">
                W
              </p>
            </div>
            <p className="font-[var(--font-urbanist)] font-normal leading-none relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
              Willow HQ
            </p>
          </div>
          <div className="box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <img alt="Collapse sidebar" className="block max-w-none size-full" src="/assets/sidebar/icon-chevron-left-pipe.svg" />
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[8px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="Home" className="block max-w-none size-full" src="/assets/sidebar/icon-smart-home.svg" />
                </div>
                <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-[rgba(255,255,255,0.52)] text-nowrap">
                  Home
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="Dashboard" className="block max-w-none size-full" src="/assets/sidebar/icon-layout-grid.svg" />
                </div>
                <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap text-white">
                  Dashboard
                </p>
              </div>
              <div className="box-border content-stretch flex flex-col gap-[4px] items-start justify-center pl-[24px] pr-0 py-[8px] relative rounded-[8px] shrink-0 w-full">
                <div className="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex gap-[12px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="Marketing Spend" className="block max-w-none size-full" src="/assets/sidebar/icon-dashboard-chart.svg" />
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap text-white">
                    Marketing Spend
                  </p>
                </div>
                <div className="box-border content-stretch flex gap-[12px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="Salaries" className="block max-w-none size-full" src="/assets/sidebar/icon-currency-dollar.svg" />
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-[rgba(255,255,255,0.52)] text-nowrap">
                    Salaries
                  </p>
                </div>
                <div className="box-border content-stretch flex gap-[12px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="Misc" className="block max-w-none size-full" src="/assets/sidebar/icon-file-analytics.svg" />
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-[rgba(255,255,255,0.52)] text-nowrap">
                    Misc.
                  </p>
                </div>
              </div>
            </div>
            <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[14px]">
                <img alt="Analytics" className="block max-w-none size-full" src="/assets/sidebar/icon-trending-up.svg" />
              </div>
              <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-[rgba(255,255,255,0.52)] text-nowrap">
                Analytics
              </p>
            </div>
            <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[14px]">
                <img alt="NPS" className="block max-w-none size-full" src="/assets/sidebar/icon-heart.svg" />
              </div>
              <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-[rgba(255,255,255,0.52)] text-nowrap">
                NPS
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative shrink-0 w-full">
        <div className="relative shrink-0 size-[16px]">
          <img alt="Settings" className="block max-w-none size-full" src="/assets/sidebar/icon-settings.svg" />
        </div>
        <div className="flex flex-col font-[var(--font-urbanist)] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[14px] text-nowrap text-white">
          <p className="leading-[1.2] whitespace-pre">Settings</p>
        </div>
      </div>
    </div>
  )
}
