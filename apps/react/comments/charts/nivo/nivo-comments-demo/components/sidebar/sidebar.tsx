'use client'

import { useState } from 'react'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <>
      {/* Expand Button - shown when sidebar is collapsed */}
      {isCollapsed && (
        <div
          className="fixed left-4 top-4 z-50 cursor-pointer flex items-center justify-center transition-colors"
          onClick={() => setIsCollapsed(false)}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "var(--app-sidebar-bg)",
            borderRadius: "8px",
          }}
        >
          <img
            src="/assets/sidebar/icon-chevron-left-pipe.svg"
            alt="Expand sidebar"
            className="block max-w-none w-4 h-4"
            style={{ transform: 'rotate(180deg)', filter: 'var(--app-icon-invert)' }}
          />
        </div>
      )}

      {/* Sidebar - with smooth animation */}
      <div
        className="content-stretch flex flex-col items-start justify-between relative h-full transition-all duration-300"
        style={{
          backgroundColor: 'var(--app-sidebar-bg)',
          width: isCollapsed ? "0px" : "251px",
          overflow: "hidden",
          opacity: isCollapsed ? 0 : 1,
        }}
      >
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[251px]">
          <div className="box-border content-stretch flex items-center justify-between pl-[16px] pr-[12px] py-[12px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] bg-[#f55d67] ml-0 mt-0 rounded-[4px] size-[16px]" />
                <p className="[grid-area:1_/_1] font-[var(--font-urbanist)] font-bold leading-none ml-[3px] mt-[3px] relative text-[11px] text-black text-nowrap whitespace-pre">
                  W
                </p>
              </div>
              <p className="font-[var(--font-urbanist)] font-normal leading-none relative shrink-0 text-[14px] text-nowrap whitespace-pre" style={{ color: 'var(--app-text-primary)' }}>
                Willow HQ
              </p>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0 rounded transition-colors cursor-pointer"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--app-toggle-active-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div className="relative shrink-0 size-[16px]">
                <img alt="Collapse sidebar" className="block max-w-none size-full" src="/assets/sidebar/icon-chevron-left-pipe.svg" style={{ filter: 'var(--app-icon-invert)' }} />
              </div>
            </button>
          </div>
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[8px] relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="Home" className="block max-w-none size-full" src="/assets/sidebar/icon-smart-home.svg" style={{ filter: 'var(--app-icon-invert)' }} />
                </div>
                <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-tertiary)' }}>
                  Home
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                <div className="relative shrink-0 size-[14px]">
                  <img alt="Dashboard" className="block max-w-none size-full" src="/assets/sidebar/icon-layout-grid.svg" style={{ filter: 'var(--app-icon-invert)' }} />
                </div>
                <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-primary)' }}>
                  Documents
                </p>
              </div>
              <div className="box-border content-stretch flex flex-col gap-[4px] items-start justify-center pl-[24px] pr-0 py-[8px] relative rounded-[8px] shrink-0 w-full">
                <div className="box-border content-stretch flex gap-[12px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full" style={{ backgroundColor: 'var(--app-toggle-active-bg)' }}>
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="Marketing Spend" className="block max-w-none size-full" src="/assets/sidebar/icon-dashboard-chart.svg" style={{ filter: 'var(--app-icon-invert)' }} />
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-primary)' }}>
                    Q3 Product Spec
                  </p>
                </div>
                <div className="box-border content-stretch flex gap-[12px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="Salaries" className="block max-w-none size-full" src="/assets/sidebar/icon-currency-dollar.svg" style={{ filter: 'var(--app-icon-invert)' }} />
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-tertiary)' }}>
                    Design Review
                  </p>
                </div>
                <div className="box-border content-stretch flex gap-[12px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="Misc" className="block max-w-none size-full" src="/assets/sidebar/icon-file-analytics.svg" style={{ filter: 'var(--app-icon-invert)' }} />
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-tertiary)' }}>
                    Meeting Notes
                  </p>
                </div>
              </div>
            </div>
            <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[14px]">
                <img alt="Analytics" className="block max-w-none size-full" src="/assets/sidebar/icon-trending-up.svg" style={{ filter: 'var(--app-icon-invert)' }} />
              </div>
              <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-tertiary)' }}>
                Shared with me
              </p>
            </div>
            <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center p-[8px] relative rounded-[8px] shrink-0 w-full">
              <div className="relative shrink-0 size-[14px]">
                <img alt="NPS" className="block max-w-none size-full" src="/assets/sidebar/icon-heart.svg" style={{ filter: 'var(--app-icon-invert)' }} />
              </div>
              <p className="[white-space-collapse:collapse] basis-0 font-[var(--font-urbanist)] font-normal grow leading-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap" style={{ color: 'var(--app-text-tertiary)' }}>
                Templates
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="box-border content-stretch flex gap-[8px] items-start p-[16px] relative shrink-0 w-[251px]">
        <div className="relative shrink-0 size-[16px]">
          <img alt="Settings" className="block max-w-none size-full" src="/assets/sidebar/icon-settings.svg" style={{ filter: 'var(--app-icon-invert)' }} />
        </div>
        <div className="flex flex-col font-[var(--font-urbanist)] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[14px] text-nowrap" style={{ color: 'var(--app-text-primary)' }}>
          <p className="leading-[1.2] whitespace-pre">Settings</p>
        </div>
      </div>
    </div>
    </>
  )
}
