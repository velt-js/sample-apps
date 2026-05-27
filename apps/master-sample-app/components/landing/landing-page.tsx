"use client"

import { useMemo, useState } from "react"
import { getAllSamples } from "@/samples"
import { parseSample } from "@/lib/sample-taxonomy"
import { LandingNav } from "./landing-nav"
import { FilterSidebar, FilterGroup } from "./filter-sidebar"
import { DemoCard } from "./demo-card"

type FilterKey = FilterGroup["key"]

interface LandingPageProps {
  githubUrl?: string
}

export function LandingPage({ githubUrl }: LandingPageProps) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Record<FilterKey, Set<string>>>({
    framework: new Set(),
    feature: new Set(),
    library: new Set(),
  })

  const samples = useMemo(() => getAllSamples(), [])
  const parsed = useMemo(() => samples.map(parseSample), [samples])

  // Derive filter options from the data (preserves first-seen order)
  const groups: FilterGroup[] = useMemo(() => {
    const uniq = (values: string[]) => [...new Set(values.filter(Boolean))]
    return [
      { key: "framework", label: "Frameworks", options: uniq(parsed.map(p => p.framework)) },
      { key: "feature", label: "Features", options: uniq(parsed.map(p => p.feature)) },
      { key: "library", label: "Libraries", options: uniq(parsed.map(p => p.library)) },
    ]
  }, [parsed])

  const toggle = (key: FilterKey, value: string) => {
    setSelected(prev => {
      const next = new Set(prev[key])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...prev, [key]: next }
    })
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return samples
      .map((sample, i) => ({ sample, parsed: parsed[i] }))
      .filter(({ sample, parsed: p }) => {
        // Filter groups: OR within a group, AND across groups
        if (selected.framework.size && !selected.framework.has(p.framework)) return false
        if (selected.feature.size && !selected.feature.has(p.feature)) return false
        if (selected.library.size && !selected.library.has(p.library)) return false

        // Search across title + segments
        if (q) {
          const haystack = [
            sample.metadata.title,
            p.framework, p.feature, p.appType, p.library, p.demoName,
          ].join(" ").toLowerCase()
          if (!haystack.includes(q)) return false
        }
        return true
      })
  }, [samples, parsed, selected, query])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <LandingNav query={query} onQueryChange={setQuery} githubUrl={githubUrl} />

      <div className="flex flex-1 overflow-hidden">
        {/* Filter sidebar */}
        <div className="overflow-y-auto px-8 py-8 shrink-0">
          <FilterSidebar groups={groups} selected={selected} onToggle={toggle} />
        </div>

        {/* Card grid */}
        <main className="flex-1 overflow-y-auto px-4 py-8 pr-8">
          {visible.length === 0 ? (
            <div className="flex h-full items-center justify-center text-black/40 dark:text-white/40 font-[family-name:var(--font-urbanist)]">
              No demos found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mx-auto max-w-[1100px]">
              {visible.map(({ sample, parsed: p }) => (
                <DemoCard
                  key={sample.metadata.id}
                  sample={sample}
                  parsed={p}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
