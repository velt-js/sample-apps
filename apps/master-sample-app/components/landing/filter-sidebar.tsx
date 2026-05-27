"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatLabel, FrameworkIcon } from "@/lib/sample-taxonomy"

export interface FilterGroup {
  key: "framework" | "feature" | "library"
  label: string
  options: string[]
}

interface FilterSidebarProps {
  groups: FilterGroup[]
  selected: Record<FilterGroup["key"], Set<string>>
  onToggle: (key: FilterGroup["key"], value: string) => void
}

export function FilterSidebar({ groups, selected, onToggle }: FilterSidebarProps) {
  return (
    <aside className="w-[180px] shrink-0 flex flex-col gap-8 font-[family-name:var(--font-urbanist)]">
      {groups.map(group => (
        <div key={group.key} className="flex flex-col gap-3">
          <div className="text-[10px] font-medium uppercase tracking-[1.35px] text-black/52 dark:text-white/52">
            {group.label}
          </div>
          <div className="flex flex-col gap-1">
            {group.options.map(option => {
              const isChecked = selected[group.key].has(option)
              return (
                <button
                  key={option}
                  onClick={() => onToggle(group.key, option)}
                  className="flex items-center gap-3 rounded-[8px] py-1 text-[13px] text-left text-black dark:text-white hover:bg-black/4 dark:hover:bg-white/[0.04] transition-colors"
                >
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-[4px] border transition-colors shrink-0",
                      isChecked
                        ? "bg-black dark:bg-white border-black dark:border-white"
                        : "border-black/20 dark:border-white/20"
                    )}
                  >
                    {isChecked && <Check className="size-3 text-white dark:text-black" strokeWidth={3} />}
                  </span>
                  {group.key === "framework" && <FrameworkIcon framework={option} />}
                  <span>{group.key === "framework" ? option : formatLabel(option)}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}
