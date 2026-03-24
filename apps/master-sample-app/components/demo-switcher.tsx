"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import { getAllSamples } from "@/samples"
import { Sample } from "@/types/sample"
import { cn } from "@/lib/utils"

interface DemoSwitcherProps {
  isOpen: boolean
  onClose: () => void
  onSampleSelect: (sampleId: string) => void
  currentSampleId: string
  initialLevel?: number
}

interface ParsedSample {
  sampleId: string
  framework: string
  feature: string
  appType: string
  library: string
  demoName: string
}

function parseSample(sample: Sample): ParsedSample {
  const routePath = sample.metadata.routePath || ''
  const segments = routePath.split('/').filter(Boolean)

  const knownFrameworks: Record<string, string> = {
    react: 'React',
    javascript: 'JavaScript',
    vue: 'Vue',
    angular: 'Angular',
  }

  const frameworkKey = segments[0]
  if (frameworkKey && knownFrameworks[frameworkKey]) {
    return {
      sampleId: sample.metadata.id,
      framework: knownFrameworks[frameworkKey],
      feature: segments[1] || '',
      appType: segments[2] || '',
      library: segments[3] || '',
      demoName: segments[4] || segments[segments.length - 1] || '',
    }
  }

  // For non-framework-prefixed routes (e.g., cursors)
  return {
    sampleId: sample.metadata.id,
    framework: 'React',
    feature: segments[0] || '',
    appType: segments[1] || '',
    library: '',
    demoName: segments[segments.length - 1] || '',
  }
}

function formatLabel(value: string): string {
  if (!value) return ''
  return value
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Fixed entries (these show even if no demos exist yet)
const FRAMEWORK_EXTRAS = [
  { id: 'Angular', icon: 'angular' },
  { id: 'Vue', icon: 'vue' },
]

export function DemoSwitcher({ isOpen, onClose, onSampleSelect, currentSampleId, initialLevel }: DemoSwitcherProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('React')
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [selectedAppType, setSelectedAppType] = useState<string | null>(null)
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Parse all samples once, keeping title for search
  const allSamples = useMemo(() => getAllSamples(), [])
  const allParsed = useMemo(() => {
    return allSamples.map(parseSample)
  }, [allSamples])

  // Flat search results: match against title, demoName, and all segments
  const searchResults = useMemo(() => {
    if (!searchQuery) return []
    const q = searchQuery.toLowerCase()
    return allSamples
      .map((sample, i) => ({ sample, parsed: allParsed[i] }))
      .filter(({ sample, parsed }) => {
        const title = sample.metadata.title.toLowerCase()
        const segments = [parsed.framework, parsed.feature, parsed.appType, parsed.library, parsed.demoName]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return title.includes(q) || segments.includes(q) || parsed.demoName.toLowerCase().includes(q)
      })
  }, [searchQuery, allSamples, allParsed])

  // Initialize selections from current sample, respecting initialLevel from breadcrumb clicks
  useEffect(() => {
    if (isOpen && currentSampleId) {
      const current = allParsed.find(p => p.sampleId === currentSampleId)
      if (current) {
        if (initialLevel !== undefined) {
          setSelectedFramework(current.framework)
          setSelectedFeature(initialLevel >= 1 ? (current.feature || null) : null)
          setSelectedAppType(initialLevel >= 2 ? (current.appType || null) : null)
          setSelectedLibrary(initialLevel >= 3 ? (current.library || null) : null)
        } else {
          setSelectedFramework(current.framework)
          setSelectedFeature(current.feature || null)
          setSelectedAppType(current.appType || null)
          setSelectedLibrary(current.library || null)
        }
      }
    }
  }, [isOpen, currentSampleId, allParsed, initialLevel])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('')
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)
    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Get unique values for each column based on cascading filters
  const frameworks = useMemo(() => {
    const unique = [...new Set(allParsed.map(p => p.framework))]
    FRAMEWORK_EXTRAS.forEach(f => {
      if (!unique.includes(f.id)) unique.push(f.id)
    })
    return unique
  }, [allParsed])

  const filteredByFramework = useMemo(() => {
    return allParsed.filter(p => p.framework === selectedFramework)
  }, [allParsed, selectedFramework])

  const features = useMemo(() => {
    return [...new Set(filteredByFramework.map(p => p.feature).filter(Boolean))]
  }, [filteredByFramework])

  const filteredByFeature = useMemo(() => {
    if (!selectedFeature) return filteredByFramework
    return filteredByFramework.filter(p => p.feature === selectedFeature)
  }, [filteredByFramework, selectedFeature])

  const appTypes = useMemo(() => {
    return [...new Set(filteredByFeature.map(p => p.appType).filter(Boolean))]
  }, [filteredByFeature])

  const filteredByAppType = useMemo(() => {
    if (!selectedAppType) return filteredByFeature
    return filteredByFeature.filter(p => p.appType === selectedAppType)
  }, [filteredByFeature, selectedAppType])

  const libraries = useMemo(() => {
    return [...new Set(filteredByAppType.map(p => p.library).filter(Boolean))]
  }, [filteredByAppType])

  const filteredByLibrary = useMemo(() => {
    if (!selectedLibrary) return filteredByAppType
    return filteredByAppType.filter(p => p.library === selectedLibrary)
  }, [filteredByAppType, selectedLibrary])

  // Demo names for the 5th column, sorted alphabetically for consistent ordering
  const demos = useMemo(() => {
    return filteredByLibrary
      .map(p => ({ demoName: p.demoName, sampleId: p.sampleId }))
      .sort((a, b) => a.demoName.localeCompare(b.demoName))
  }, [filteredByLibrary])

  const handleFrameworkSelect = (framework: string) => {
    setSelectedFramework(framework)
    setSelectedFeature(null)
    setSelectedAppType(null)
    setSelectedLibrary(null)
  }

  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature)
    setSelectedAppType(null)
    setSelectedLibrary(null)

    // Auto-cascade column selections (but never navigate - only demo click navigates)
    const filtered = filteredByFramework.filter(p => p.feature === feature)
    const types = [...new Set(filtered.map(p => p.appType).filter(Boolean))]
    if (types.length === 1) {
      setSelectedAppType(types[0])
      const withType = filtered.filter(p => p.appType === types[0])
      const libs = [...new Set(withType.map(p => p.library).filter(Boolean))]
      if (libs.length === 1) {
        setSelectedLibrary(libs[0])
      }
    }
  }

  const handleAppTypeSelect = (appType: string) => {
    setSelectedAppType(appType)
    setSelectedLibrary(null)

    // Auto-cascade column selections (but never navigate)
    const filtered = filteredByFeature.filter(p => p.appType === appType)
    const libs = [...new Set(filtered.map(p => p.library).filter(Boolean))]
    if (libs.length === 1) {
      setSelectedLibrary(libs[0])
    }
  }

  const handleLibrarySelect = (library: string) => {
    setSelectedLibrary(library)
  }

  const handleDemoSelect = (sampleId: string) => {
    onSampleSelect(sampleId)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Overlay Panel */}
      <div
        ref={overlayRef}
        className="absolute left-1/2 -translate-x-1/2 top-[44px] w-[880px] max-w-[calc(100vw-24px)] bg-white dark:bg-[#0e0e0e] border border-black/8 dark:border-white/8 rounded-[16px] shadow-[0px_24px_80px_0px_rgba(0,0,0,0.15)] dark:shadow-[0px_24px_80px_0px_black] overflow-hidden"
      >
        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/52 dark:text-white/52" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[9px] bg-black/4 dark:bg-white/4 border border-black dark:border-white px-10 py-2 text-sm text-black dark:text-white placeholder:text-black/52 dark:placeholder:text-white/52 focus:outline-none font-[family-name:var(--font-urbanist)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results (flat list) or Category Columns */}
        {searchQuery ? (
          <div className="px-4 pb-4 font-[family-name:var(--font-urbanist)] max-h-[400px] overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="px-2 py-4 text-sm text-black/30 dark:text-white/30 text-center">
                No demos found
              </div>
            ) : (
              <div className="space-y-0.5">
                {searchResults.map(({ sample, parsed }) => (
                  <button
                    key={parsed.sampleId}
                    onClick={() => handleDemoSelect(parsed.sampleId)}
                    className={cn(
                      "w-full rounded-[8px] px-3 py-2.5 text-left transition-colors flex items-center justify-between gap-4",
                      currentSampleId === parsed.sampleId
                        ? "bg-black/6 dark:bg-[#171617] text-black dark:text-white"
                        : "text-black/80 dark:text-white/80 hover:bg-black/4 dark:hover:bg-[#171617]/50"
                    )}
                  >
                    <span className="text-[13px]">{sample.metadata.title}</span>
                    <span className="text-[11px] text-black/30 dark:text-white/30 shrink-0">
                      {[parsed.feature, parsed.appType, parsed.library].filter(Boolean).map(formatLabel).join(' / ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 px-4 pb-4 font-[family-name:var(--font-urbanist)]">
            {/* Framework Column */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-black/52 dark:text-white/52 mb-3 px-2">
                Framework
              </div>
              <div className="space-y-1">
                {frameworks.map(framework => {
                  const hasDemo = allParsed.some(p => p.framework === framework)
                  return (
                    <button
                      key={framework}
                      onClick={() => hasDemo && handleFrameworkSelect(framework)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                        selectedFramework === framework
                          ? "bg-black/6 dark:bg-[#171617] text-black dark:text-white"
                          : hasDemo
                            ? "text-black dark:text-white hover:bg-black/4 dark:hover:bg-[#171617]/50"
                            : "text-black/52 dark:text-white/52 cursor-not-allowed"
                      )}
                      disabled={!hasDemo}
                    >
                      <FrameworkIcon framework={framework} />
                      <span>{framework}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Feature Column */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-black/52 dark:text-white/52 mb-3 px-2">
                Feature
              </div>
              <div className="space-y-1">
                {features.map(feature => {
                  const hasDemo = filteredByFramework.some(p => p.feature === feature)
                  return (
                    <button
                      key={feature}
                      onClick={() => hasDemo && handleFeatureSelect(feature)}
                      className={cn(
                        "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                        selectedFeature === feature
                          ? "bg-black/6 dark:bg-[#171617] text-black dark:text-white"
                          : hasDemo
                            ? "text-black/52 dark:text-white/52 hover:bg-black/4 dark:hover:bg-[#171617]/50"
                            : "text-black/30 dark:text-white/30 cursor-not-allowed"
                      )}
                      disabled={!hasDemo}
                    >
                      {formatLabel(feature)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* App Type Column */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-black/52 dark:text-white/52 mb-3 px-2">
                App Type
              </div>
              <div className="space-y-1">
                {appTypes.map(appType => (
                  <button
                    key={appType}
                    onClick={() => handleAppTypeSelect(appType)}
                    className={cn(
                      "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                      selectedAppType === appType
                        ? "bg-black/6 dark:bg-[#171617] text-black dark:text-white"
                        : "text-black/52 dark:text-white/52 hover:bg-black/4 dark:hover:bg-[#171617]/50"
                    )}
                  >
                    {formatLabel(appType)}
                  </button>
                ))}
                {appTypes.length === 0 && selectedFeature && (
                  <div className="px-2 py-2 text-xs text-black/30 dark:text-white/30">
                    Select a feature
                  </div>
                )}
              </div>
            </div>

            {/* Library Column */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-black/52 dark:text-white/52 mb-3 px-2">
                Library
              </div>
              <div className="space-y-1">
                {libraries.map(library => (
                  <button
                    key={library}
                    onClick={() => handleLibrarySelect(library)}
                    className={cn(
                      "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                      selectedLibrary === library
                        ? "bg-black/6 dark:bg-[#171617] text-black dark:text-white"
                        : "text-black/52 dark:text-white/52 hover:bg-black/4 dark:hover:bg-[#171617]/50"
                    )}
                  >
                    {formatLabel(library)}
                  </button>
                ))}
                {libraries.length === 0 && selectedAppType && (
                  <div className="px-2 py-2 text-xs text-black/30 dark:text-white/30">
                    No library needed
                  </div>
                )}
              </div>
            </div>

            {/* Demo Column - always visible */}
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-black/52 dark:text-white/52 mb-3 px-2">
                Demo
              </div>
              <div className="space-y-1 max-h-[300px] overflow-y-auto">
                {demos.map(demo => (
                  <button
                    key={demo.sampleId}
                    onClick={() => handleDemoSelect(demo.sampleId)}
                    className={cn(
                      "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                      currentSampleId === demo.sampleId
                        ? "bg-black/6 dark:bg-[#171617] text-black dark:text-white"
                        : "text-black/52 dark:text-white/52 hover:bg-black/4 dark:hover:bg-[#171617]/50"
                    )}
                  >
                    {formatLabel(demo.demoName)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FrameworkIcon({ framework }: { framework: string }) {
  if (framework === 'React') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
      </svg>
    )
  }
  if (framework === 'Angular') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M12 2L3 6.5L4.5 18L12 22L19.5 18L21 6.5L12 2Z" fill="#DD0031" />
        <path d="M12 2V22L19.5 18L21 6.5L12 2Z" fill="#C3002F" />
        <path d="M12 5.5L7 17H9L10 14H14L15 17H17L12 5.5ZM13 12.5H11L12 9L13 12.5Z" fill="white" />
      </svg>
    )
  }
  if (framework === 'Javascript') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <rect width="24" height="24" rx="2" fill="#F7DF1E" />
        <path d="M6.4 19.2l1.7-1c.3.6.7 1 1.4 1 .7 0 1.1-.3 1.1-1.5v-8h2.1v8c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.5-.9-2.9-2zm6.9-.3l1.7-1c.4.7 1 1.2 2 1.2.8 0 1.4-.4 1.4-1s-.5-1-1.5-1.4l-.5-.2c-1.5-.6-2.4-1.4-2.4-3 0-1.5 1.1-2.6 2.9-2.6 1.3 0 2.2.4 2.8 1.6l-1.6 1c-.3-.6-.7-.9-1.3-.9-.6 0-.9.4-.9.9s.4.9 1.2 1.3l.5.2c1.7.7 2.7 1.5 2.7 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-3-.9-3.6-2z" fill="#000" />
      </svg>
    )
  }
  if (framework === 'JavaScript') {
    return (
      <svg width="16" height="16" viewBox="0 0 256 256" className="shrink-0">
        <rect width="256" height="256" fill="#F7DF1E" rx="16" />
        <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#000" />
      </svg>
    )
  }
  if (framework === 'Vue') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M2 3H5.5L12 14L18.5 3H22L12 21L2 3Z" fill="#41B883" />
        <path d="M5.5 3H9.5L12 7.5L14.5 3H18.5L12 14L5.5 3Z" fill="#34495E" />
      </svg>
    )
  }
  return <div className="w-4 h-4 rounded bg-muted-foreground/20 shrink-0" />
}
