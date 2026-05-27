"use client"

import { Search, Github } from "lucide-react"
import { VeltLogo } from "../velt-logo"
import { HeaderThemeToggle } from "../header-theme-toggle"

interface LandingNavProps {
  query: string
  onQueryChange: (q: string) => void
  githubUrl?: string
}

export function LandingNav({ query, onQueryChange, githubUrl }: LandingNavProps) {
  return (
    <header className="flex h-[48px] items-center border-b border-black/8 dark:border-white/8 bg-white dark:bg-[#0e0e0e] px-[19px] shrink-0 font-[family-name:var(--font-urbanist)]">
      {/* Left: Brand + All Demos */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <VeltLogo className="h-[20px] w-[20px] text-foreground" />
          <span className="text-[20px] font-bold text-black dark:text-white tracking-[0.2px] leading-none">Velt</span>
        </div>
        <div className="h-[18px] w-px bg-black/12 dark:bg-white/12 shrink-0" />
        <span className="text-[14px] text-black dark:text-white leading-none">All Demos</span>
      </div>

      {/* Right: Theme + Search + GitHub */}
      <div className="flex items-center gap-3 shrink-0 ml-auto">
        <HeaderThemeToggle />
        <div className="relative w-[233px]">
          <Search className="absolute left-3 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-black/52 dark:text-white/52" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full rounded-lg border border-black/12 dark:border-white/12 bg-transparent pl-9 pr-3 py-[5px] text-[14px] leading-normal text-black dark:text-white placeholder:text-black/52 dark:placeholder:text-white/52 focus:outline-none"
          />
        </div>
        {githubUrl && (
          <button
            onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github className="h-[14.8px] w-[14.8px]" />
          </button>
        )}
      </div>
    </header>
  )
}
