'use client'

import Sidebar from '../sidebar/sidebar'

// File type icon components
const FolderIcon = ({ color = '#dcb67a' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14.5 3H7.71L6.85 2.15C6.76 2.06 6.64 2 6.5 2H1.5C1.22 2 1 2.22 1 2.5V13.5C1 13.78 1.22 14 1.5 14H14.5C14.78 14 15 13.78 15 13.5V3.5C15 3.22 14.78 3 14.5 3Z" fill={color} />
  </svg>
)

const FileIcon = ({ color = '#858585' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9.5 1H3.5C3.22 1 3 1.22 3 1.5V14.5C3 14.78 3.22 15 3.5 15H12.5C12.78 15 13 14.78 13 14.5V4.5L9.5 1Z" fill={color} />
    <path d="M9.5 1V4.5H13" stroke={color} strokeWidth="0.5" opacity="0.5" />
  </svg>
)

const ChevronRight = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

export default function DocumentCanvas() {
  return (
    <div className="w-full h-screen relative flex">
      <div className="relative flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <div className="h-full flex-shrink-0">
          <Sidebar />
        </div>

        {/* File Tree Section */}
        <div className="bg-[#1e1e1e] w-[291px] h-full flex-shrink-0 overflow-y-auto">
          {/* Search Box */}
          <div className="bg-[rgba(255,255,255,0.06)] box-border flex gap-[8px] items-center m-[10px] p-[8px] rounded-[8px]">
            <div className="relative shrink-0 size-[14px]">
              <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-search.svg" />
            </div>
            <p className="font-['Inter',sans-serif] font-normal leading-none not-italic opacity-[0.32] relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
              Search Files
            </p>
          </div>

          {/* File Tree */}
          <div className="text-[13px] font-['Inter',sans-serif] text-white px-2 pt-2">
            {/* Folder: angular */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <ChevronRight />
              <FolderIcon color="#f14c4c" />
              <span className="opacity-80">angular</span>
            </div>

            {/* Folder: cursor */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <ChevronRight />
              <FolderIcon color="#8b8b8b" />
              <span className="opacity-80">cursor</span>
            </div>

            {/* Folder: vscode */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <ChevronRight />
              <FolderIcon color="#559fd7" />
              <span className="opacity-80">vscode</span>
            </div>

            {/* Folder: dist */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <ChevronRight />
              <FolderIcon color="#dcb67a" />
              <span className="opacity-80">dist</span>
            </div>

            {/* Folder: node_modules */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <ChevronRight />
              <FolderIcon color="#dcb67a" />
              <span className="opacity-80">node_modules</span>
            </div>

            {/* Folder: src (expanded) */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <ChevronDown />
              <FolderIcon color="#dcb67a" />
              <span className="opacity-80">src</span>
            </div>

            {/* src children */}
            <div className="pl-4">
              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FolderIcon color="#f14c4c" />
                <span className="opacity-80">app</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FolderIcon color="#dcb67a" />
                <span className="opacity-80">assets</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#f1e05a" />
                <span className="opacity-80">content-script-isolated.js</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#f1e05a" />
                <span className="opacity-80">content-script-main.js</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#f1e05a" />
                <span className="opacity-80">content-sdk-detector.js</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#e34c26" />
                <span className="opacity-80">default-popup.html</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#f1e05a" />
                <span className="opacity-80">detect-sdk.js</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#e34c26" />
                <span className="opacity-80">devtools.html</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#f1e05a" />
                <span className="opacity-80">devtools.js</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#f1e05a" />
                <span className="opacity-80">favicon.ico</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#e34c26" />
                <span className="opacity-80">index.html</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#3178c6" />
                <span className="opacity-80">main.ts</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#cbcb41" />
                <span className="opacity-80">manifest.json</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#e34c26" />
                <span className="opacity-80">popup-velt.html</span>
              </div>

              {/* Selected file: styles.scss */}
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[rgba(255,255,255,0.06)] border border-[#0070f3] rounded-[6px] mx-2 my-0.5 cursor-pointer">
                <span className="w-[10px]"></span>
                <FileIcon color="#c6538c" />
                <span className="font-semibold">styles.scss</span>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer opacity-50">
                <span className="w-[10px]"></span>
                <FileIcon color="#c6538c" />
                <span className="opacity-80">styles.scss</span>
              </div>
            </div>

            {/* Root files */}
            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#858585" />
              <span className="opacity-80">.editorconfig</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#858585" />
              <span className="opacity-80">.gitignore</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#cbcb41" />
              <span className="opacity-80">angular.json</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#519aba" />
              <span className="opacity-80">observations.md</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#cbcb41" />
              <span className="opacity-80">package-lock.json</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#cbcb41" />
              <span className="opacity-80">package.json</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#519aba" />
              <span className="opacity-80">README.md</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#3178c6" />
              <span className="opacity-80">tsconfig.app.json</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="w-[10px]"></span>
              <FileIcon color="#3178c6" />
              <span className="opacity-80">tsconfig.json</span>
            </div>
          </div>
        </div>

        {/* Main Canvas Content */}
        <div className="bg-black relative flex-1">
      {/* Breadcrumb Section */}
      <div className="absolute contents left-0 top-[14px]">
        <div className="absolute content-stretch flex gap-[12px] items-center left-0 top-[14px]">
          <p className="font-['Inter',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
            Photographer website
          </p>
          <div className="relative shrink-0 size-[8px]">
            <img alt="" className="block max-w-none size-full" src="/figma-assets/ellipse-dot.svg" />
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <p className="font-['Inter',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
              v1
            </p>
            <div className="relative shrink-0 size-[14px]">
              <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-chevron-right.svg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Border */}
      <div className="absolute border-2 border-[#121212] border-solid h-[720px] left-0 rounded-[12px] top-[56px] w-[1147px]" />

      {/* Code Editor Area */}
      <div className="absolute h-[680px] left-0 overflow-clip top-[94px] w-[852px]">
        <div className="absolute contents left-0 top-0">
          <div className="absolute bg-[#0f0f10] h-[694px] right-[-1px] top-0 w-[203px]" />
          <div className="absolute h-[725px] left-0 top-0 w-[750px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[119.03%] left-[-95.87%] max-w-none top-[-19.03%] w-[201.2%]"
                src="/figma-assets/screenshot-code-editor.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* File Path Breadcrumb */}
      <div className="absolute content-stretch flex gap-[12px] items-center justify-center left-[16px] top-[68px]">
        <p className="font-['Inter',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
          src
        </p>
        <div className="relative shrink-0 size-[14px]">
          <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-chevron-right-white.svg" />
        </div>
        <p className="font-['Inter',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[13px] text-nowrap text-white whitespace-pre">
          style.scss
        </p>
      </div>

      {/* Code/Preview Toggle */}
      <div className="absolute border border-[rgba(255,255,255,0.08)] border-solid box-border content-stretch flex gap-[2px] items-center left-[243px] p-[2px] rounded-[4px] top-[13px]">
        <div className="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex gap-[10px] items-center p-[4px] relative rounded-[4px] shrink-0">
          <div className="relative shrink-0 size-[20px]">
            <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-code.svg" />
          </div>
        </div>
        <div className="box-border content-stretch flex gap-[10px] items-center p-[4px] relative rounded-[4px] shrink-0">
          <div className="relative shrink-0 size-[20px]">
            <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-device-desktop.svg" />
          </div>
        </div>
      </div>

      {/* Vertical Line (rotated) */}
      <div
        className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-0 top-[56px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]"
        style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}
      >
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[720px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
              <img alt="" className="block max-w-none size-full" src="/figma-assets/line-8.svg" />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="absolute h-0 left-0 top-[94px] w-[856px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
          <img alt="" className="block max-w-none size-full" src="/figma-assets/line-9.svg" />
        </div>
      </div>

      {/* Copy/Download Actions */}
      <div className="absolute content-stretch flex gap-[4px] items-center left-[799px] top-[63px]">
        <div className="box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0">
          <div className="relative shrink-0 size-[14px]">
            <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-copy.svg" />
          </div>
        </div>
        <div className="box-border content-stretch flex gap-[10px] items-center p-[4px] relative shrink-0">
          <div className="relative shrink-0 size-[14px]">
            <img alt="" className="block max-w-none size-full" src="/figma-assets/icon-download.svg" />
          </div>
        </div>
      </div>

      {/* Removed duplicate file tree - now using Sidebar component */}
        </div>
      </div>
    </div>
  )
}
