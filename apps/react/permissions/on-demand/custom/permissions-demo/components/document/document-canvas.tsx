'use client'

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import {
  LegoIcon,
  HierarchyIcon,
  FolderOpenIcon,
  FileDescriptionIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  ClockIcon,
  SmallArrowIcon,
} from './icons'

export default function DocumentCanvas() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative">
          {/* Main Content Area with Black Background */}
          <div className="w-full h-full bg-black relative overflow-hidden">
            {/* Dot Grid Background */}
            <div className="absolute flex h-[731px] items-center justify-center left-[calc(50%-0.11px)] top-[-593px] -translate-x-1/2 w-[1422px]">
              <div className="flex-none rotate-180">
                <div className="h-[731px] relative w-[1422px]">
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute w-full h-full bg-repeat opacity-40"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="absolute bg-gradient-to-t from-transparent inset-0 to-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Left Section: User and Permissions List */}
            <div className="absolute left-[75px] top-[137px]">
              {/* User Section */}
              <div className="flex gap-[12px] items-center mb-[87px]">
                <LegoIcon className="w-[32px] h-[32px] text-white shrink-0" />
                <div className="flex flex-col gap-[4px] items-start justify-center">
                  <div className="flex gap-[7px] items-center">
                    <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[16px] text-white whitespace-nowrap leading-[1.1]">
                      Intern
                    </p>
                    <SmallArrowIcon className="w-[8px] h-[4px] text-white opacity-52" />
                  </div>
                  <p className="font-['IBM_Plex_Mono',monospace] text-[14px] text-white opacity-52 whitespace-nowrap leading-[1.1]">
                    is part of Organization A
                  </p>
                </div>
              </div>

              {/* Permissions List */}
              <div className="flex flex-col gap-[40px] items-start w-[523px]">
                {/* Organization Section */}
                <div className="flex flex-col gap-[15px] items-start justify-center w-full">
                  <div className="flex gap-[15px] items-start w-full">
                    <HierarchyIcon className="w-[18px] h-[18px] text-white shrink-0" />
                    <p className="font-['IBM_Plex_Mono',monospace] text-[14px] text-white opacity-52 uppercase tracking-[0.7px] whitespace-nowrap leading-[1.1]">
                      Organization
                    </p>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-white/8 flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
                      <p className="font-['Urbanist',sans-serif] font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                        Organization A
                      </p>
                      <div className="bg-white/8 flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0">
                        <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[14px] text-center text-white whitespace-nowrap leading-[1.1]">
                          OrganizationPrivate
                        </p>
                        <ChevronDownIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white/8 flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
                      <div className="flex gap-[10px] items-center p-[4px]">
                        <EyeIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                      <div className="bg-white/16 flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
                        <PencilIcon className="w-[12px] h-[12px] text-white shrink-0" />
                        <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[10px] text-white uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
                          editor
                        </p>
                      </div>
                    </div>
                    <ClockIcon className="w-[20px] h-[20px] text-white shrink-0" />
                  </div>
                </div>

                {/* Folders Section */}
                <div className="flex flex-col gap-[15px] items-start justify-center w-full">
                  <div className="flex gap-[15px] items-start w-full">
                    <FolderOpenIcon className="w-[18px] h-[18px] text-white shrink-0" />
                    <p className="font-['IBM_Plex_Mono',monospace] text-[14px] text-white opacity-52 uppercase tracking-[0.7px] whitespace-nowrap leading-[1.1]">
                      Folders
                    </p>
                  </div>

                  {/* Folder A */}
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-white/8 flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
                      <p className="font-['Urbanist',sans-serif] font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                        Folder A
                      </p>
                      <div className="bg-white/8 flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0">
                        <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[14px] text-center text-white/75 whitespace-nowrap leading-[1.1]">
                          Inherit
                        </p>
                        <ChevronDownIcon className="w-[16px] h-[16px] text-white/75 shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white/8 flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
                      <div className="flex gap-[10px] items-center p-[4px]">
                        <EyeIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                      <div className="bg-white/16 flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
                        <PencilIcon className="w-[12px] h-[12px] text-white shrink-0" />
                        <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[10px] text-white uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
                          editor
                        </p>
                      </div>
                    </div>
                    <ClockIcon className="w-[20px] h-[20px] text-white shrink-0" />
                  </div>

                  {/* Folder B */}
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-white/8 flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
                      <p className="font-['Urbanist',sans-serif] font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                        Folder B
                      </p>
                      <div className="bg-[rgba(246,158,35,0.08)] flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0">
                        <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[14px] text-center text-[#f69e23] whitespace-nowrap leading-[1.1]">
                          Restricted
                        </p>
                        <ChevronDownIcon className="w-[16px] h-[16px] text-[#f69e23] shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white/8 flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
                      <div className="flex gap-[10px] items-center p-[4px]">
                        <EyeIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                      <div className="bg-white/16 flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
                        <PencilIcon className="w-[12px] h-[12px] text-white shrink-0" />
                        <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[10px] text-white uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
                          editor
                        </p>
                      </div>
                    </div>
                    <ClockIcon className="w-[20px] h-[20px] text-white shrink-0" />
                  </div>
                </div>

                {/* Documents Section */}
                <div className="flex flex-col gap-[15px] items-start justify-center w-full">
                  <div className="flex gap-[15px] items-start w-full">
                    <FileDescriptionIcon className="w-[18px] h-[18px] text-white shrink-0" />
                    <p className="font-['IBM_Plex_Mono',monospace] text-[14px] text-white opacity-52 uppercase tracking-[0.7px] whitespace-nowrap leading-[1.1]">
                      Documents
                    </p>
                  </div>

                  {/* Document A */}
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-white/8 flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
                      <p className="font-['Urbanist',sans-serif] font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                        Document A
                      </p>
                      <div className="bg-[rgba(246,158,35,0.08)] flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0">
                        <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[14px] text-center text-[#f69e23] whitespace-nowrap leading-[1.1]">
                          Restricted
                        </p>
                        <ChevronDownIcon className="w-[16px] h-[16px] text-[#f69e23] shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white/8 flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
                      <div className="flex gap-[10px] items-center p-[4px]">
                        <EyeIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                      <div className="bg-white/16 flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
                        <PencilIcon className="w-[12px] h-[12px] text-white shrink-0" />
                        <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[10px] text-white uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
                          editor
                        </p>
                      </div>
                    </div>
                    <ClockIcon className="w-[20px] h-[20px] text-white shrink-0" />
                  </div>

                  {/* Document B */}
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-white/8 flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
                      <p className="font-['Urbanist',sans-serif] font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                        Document B
                      </p>
                      <div className="bg-white/8 flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0">
                        <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[14px] text-center text-white/75 whitespace-nowrap leading-[1.1]">
                          Inherit
                        </p>
                        <ChevronDownIcon className="w-[16px] h-[16px] text-white/75 shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white/8 flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
                      <div className="flex gap-[10px] items-center p-[4px]">
                        <EyeIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                      <div className="bg-white/16 flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
                        <PencilIcon className="w-[12px] h-[12px] text-white shrink-0" />
                        <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[10px] text-white uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
                          editor
                        </p>
                      </div>
                    </div>
                    <ClockIcon className="w-[20px] h-[20px] text-white shrink-0" />
                  </div>

                  {/* Document C */}
                  <div className="flex gap-[10px] items-center">
                    <div className="bg-white/8 flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
                      <p className="font-['Urbanist',sans-serif] font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                        Document C
                      </p>
                      <div className="bg-[rgba(152,246,255,0.08)] flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0">
                        <p className="font-['IBM_Plex_Mono',monospace] font-medium text-[14px] text-center text-[#98f6ff] whitespace-nowrap leading-[1.1]">
                          Public
                        </p>
                        <ChevronDownIcon className="w-[16px] h-[16px] text-[#98f6ff] shrink-0" />
                      </div>
                    </div>
                    <div className="bg-white/8 flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
                      <div className="flex gap-[10px] items-center p-[4px]">
                        <EyeIcon className="w-[16px] h-[16px] text-white shrink-0" />
                      </div>
                      <div className="bg-white/16 flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
                        <PencilIcon className="w-[12px] h-[12px] text-white shrink-0" />
                        <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[10px] text-white uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
                          editor
                        </p>
                      </div>
                    </div>
                    <ClockIcon className="w-[20px] h-[20px] text-white shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Hierarchy Diagram */}
            <div className="absolute left-[738px] top-[253px]">
              {/* Organization A Badge */}
              <div className="absolute left-[177px] top-0 border border-[#39efdd] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px]">
                <div className="bg-[#39efdd] flex gap-[10px] items-center p-[8px] rounded-[8px] shrink-0">
                  <HierarchyIcon className="w-[16px] h-[16px] text-black shrink-0" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
                  Organization A
                </p>
              </div>

              {/* Folder A Badge */}
              <div className="absolute left-[9px] top-[140px] border border-[#76bdff] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px]">
                <div className="bg-[#76bdff] flex gap-[10px] items-center p-[8px] rounded-[8px] shrink-0">
                  <FolderOpenIcon className="w-[16px] h-[16px] text-black shrink-0" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
                  Folder A
                </p>
              </div>

              {/* Folder B Badge (faded) */}
              <div className="absolute left-[206px] top-[140px] opacity-32 border border-[#76bdff] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px]">
                <div className="bg-[#76bdff] flex gap-[10px] items-center p-[8px] rounded-[8px] shrink-0">
                  <FolderOpenIcon className="w-[16px] h-[16px] text-black shrink-0" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
                  Folder B
                </p>
              </div>

              {/* Document A Badge (faded) */}
              <div className="absolute left-[405px] top-[140px] opacity-32 border border-[#ff7698] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px]">
                <div className="bg-[#ff7698] flex gap-[10px] items-center p-[8px] rounded-[8px] shrink-0">
                  <FileDescriptionIcon className="w-[16px] h-[16px] text-black shrink-0" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
                  Document A
                </p>
              </div>

              {/* Document B Badge */}
              <div className="absolute left-0 top-[247px] border border-[#ff7698] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px]">
                <div className="bg-[#ff7698] flex gap-[10px] items-center p-[8px] rounded-[8px] shrink-0">
                  <FileDescriptionIcon className="w-[16px] h-[16px] text-black shrink-0" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
                  Document B
                </p>
              </div>

              {/* Document C Badge */}
              <div className="absolute left-[197px] top-[247px] border border-[#ff7698] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px]">
                <div className="bg-[#ff7698] flex gap-[10px] items-center p-[8px] rounded-[8px] shrink-0">
                  <FileDescriptionIcon className="w-[16px] h-[16px] text-black shrink-0" />
                </div>
                <p className="font-['IBM_Plex_Mono',monospace] font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
                  Document C
                </p>
              </div>

              {/* Connection Lines */}
              {/* From Organization to Folders */}
              <svg className="absolute left-[81px] top-[47.5px]" width="205" height="92" viewBox="0 0 205 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1C1 1 1 45.5 102.5 45.5C204 45.5 204 91 204 91" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              </svg>

              {/* Vertical line from Organization */}
              <svg className="absolute left-[286px] top-[62px]" width="2" height="77" viewBox="0 0 2 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="0" x2="1" y2="77" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              </svg>

              {/* From Folder B to Document A */}
              <svg className="absolute left-[286px] top-[99.5px]" width="205" height="40" viewBox="0 0 205 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L1 20C1 20 1 40 102.5 40C204 40 204 40 204 40" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              </svg>

              {/* Vertical line from Folder A */}
              <svg className="absolute left-[80px] top-[188px]" width="2" height="59" viewBox="0 0 2 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="0" x2="1" y2="59" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>

              {/* Vertical line from Folder B */}
              <svg className="absolute left-[286px] top-[188px]" width="2" height="59" viewBox="0 0 2 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="0" x2="1" y2="59" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
