"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
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

  if (segments[0] === 'react') {
    return {
      sampleId: sample.metadata.id,
      framework: 'React',
      feature: segments[1] || '',
      appType: segments[2] || '',
      library: segments[3] || '',
      demoName: segments[4] || segments[segments.length - 1] || '',
    }
  }

  // For non-react-prefixed routes (e.g., cursors)
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

// Fixed entries to match screenshot (these show even if no demos exist yet)
const FRAMEWORK_EXTRAS = [
  { id: 'Angular', icon: 'angular' },
  { id: 'Vue', icon: 'vue' },
]

const FEATURE_EXTRAS: string[] = []

export function DemoSwitcher({ isOpen, onClose, onSampleSelect, currentSampleId, initialLevel }: DemoSwitcherProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('React')
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [selectedAppType, setSelectedAppType] = useState<string | null>(null)
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Parse all samples once
  const allParsed = useMemo(() => {
    return getAllSamples().map(parseSample)
  }, [])

  // Initialize selections from current sample, respecting initialLevel from breadcrumb clicks
  useEffect(() => {
    if (isOpen && currentSampleId) {
      const current = allParsed.find(p => p.sampleId === currentSampleId)
      if (current) {
        if (initialLevel !== undefined) {
          // Breadcrumb click: preserve selections up to and including the clicked level,
          // clear everything below it so the user can re-navigate from that point
          setSelectedFramework(current.framework)
          setSelectedFeature(initialLevel >= 1 ? (current.feature || null) : null)
          setSelectedAppType(initialLevel >= 2 ? (current.appType || null) : null)
          setSelectedLibrary(initialLevel >= 3 ? (current.library || null) : null)
        } else {
          // Search button or Cmd+K: show full current selection
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
    // Delay to prevent immediate close on the same click that opened it
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
    // Add extras from screenshot
    FRAMEWORK_EXTRAS.forEach(f => {
      if (!unique.includes(f.id)) unique.push(f.id)
    })
    return unique
  }, [allParsed])

  const filteredByFramework = useMemo(() => {
    return allParsed.filter(p => p.framework === selectedFramework)
  }, [allParsed, selectedFramework])

  const features = useMemo(() => {
    const unique = [...new Set(filteredByFramework.map(p => p.feature).filter(Boolean))]
    FEATURE_EXTRAS.forEach(f => {
      const lower = f.toLowerCase()
      if (!unique.some(u => u.toLowerCase() === lower)) unique.push(f.toLowerCase())
    })
    return unique
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

  // Search filter
  const searchFilter = useCallback((value: string) => {
    if (!searchQuery) return true
    return value.toLowerCase().includes(searchQuery.toLowerCase())
  }, [searchQuery])

  // Handle selection and auto-navigate to demo
  const selectAndNavigate = useCallback((framework: string, feature: string | null, appType: string | null, library: string | null) => {
    let candidates = allParsed.filter(p => p.framework === framework)
    if (feature) candidates = candidates.filter(p => p.feature === feature)
    if (appType) candidates = candidates.filter(p => p.appType === appType)
    if (library) candidates = candidates.filter(p => p.library === library)

    if (candidates.length === 1) {
      onSampleSelect(candidates[0].sampleId)
      onClose()
    } else if (candidates.length > 0 && library) {
      // If we have a library selected but multiple demos, pick the first
      onSampleSelect(candidates[0].sampleId)
      onClose()
    }
  }, [allParsed, onSampleSelect, onClose])

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

    // Check if only one app type available
    const filtered = filteredByFramework.filter(p => p.feature === feature)
    const types = [...new Set(filtered.map(p => p.appType).filter(Boolean))]
    if (types.length === 1) {
      const libs = [...new Set(filtered.filter(p => p.appType === types[0]).map(p => p.library).filter(Boolean))]
      if (libs.length === 1) {
        setSelectedAppType(types[0])
        setSelectedLibrary(libs[0])
        selectAndNavigate(selectedFramework, feature, types[0], libs[0])
        return
      } else if (libs.length === 0) {
        // No library level, select directly
        setSelectedAppType(types[0])
        selectAndNavigate(selectedFramework, feature, types[0], null)
        return
      }
    }
    if (types.length === 0 && filtered.length === 1) {
      selectAndNavigate(selectedFramework, feature, null, null)
    }
  }

  const handleAppTypeSelect = (appType: string) => {
    setSelectedAppType(appType)
    setSelectedLibrary(null)

    // Check if only one library available
    const filtered = filteredByFeature.filter(p => p.appType === appType)
    const libs = [...new Set(filtered.map(p => p.library).filter(Boolean))]
    if (libs.length === 1) {
      setSelectedLibrary(libs[0])
      selectAndNavigate(selectedFramework, selectedFeature, appType, libs[0])
      return
    }
    if (libs.length === 0 && filtered.length === 1) {
      selectAndNavigate(selectedFramework, selectedFeature, appType, null)
    }
  }

  const handleLibrarySelect = (library: string) => {
    setSelectedLibrary(library)
    selectAndNavigate(selectedFramework, selectedFeature, selectedAppType, library)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Overlay Panel */}
      <div
        ref={overlayRef}
        className="absolute left-1/2 -translate-x-1/2 top-[44px] w-[714px] max-w-[calc(100vw-24px)] bg-[#0e0e0e] border border-[rgba(255,255,255,0.08)] rounded-[16px] shadow-[0px_24px_80px_0px_black] overflow-hidden"
      >
        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/52" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[9px] bg-[rgba(255,255,255,0.04)] border border-white px-10 py-2 text-sm text-white placeholder:text-white/52 focus:outline-none font-[family-name:var(--font-urbanist)]"
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

        {/* Category Columns */}
        <div className="flex gap-4 px-4 pb-4 font-[family-name:var(--font-urbanist)]">
          {/* Framework Column */}
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-white/52 mb-3 px-2">
              Framework
            </div>
            <div className="space-y-1">
              {frameworks.filter(f => searchFilter(f)).map(framework => {
                const hasDemo = allParsed.some(p => p.framework === framework)
                return (
                  <button
                    key={framework}
                    onClick={() => hasDemo && handleFrameworkSelect(framework)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                      selectedFramework === framework
                        ? "bg-[#171617] text-white"
                        : hasDemo
                          ? "text-white hover:bg-[#171617]/50"
                          : "text-white/52 cursor-not-allowed"
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
            <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-white/52 mb-3 px-2">
              Feature
            </div>
            <div className="space-y-1">
              {features.filter(f => searchFilter(f)).map(feature => {
                const hasDemo = filteredByFramework.some(p => p.feature === feature)
                return (
                  <button
                    key={feature}
                    onClick={() => hasDemo && handleFeatureSelect(feature)}
                    className={cn(
                      "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                      selectedFeature === feature
                        ? "bg-[#171617] text-white"
                        : hasDemo
                          ? "text-white/52 hover:bg-[#171617]/50"
                          : "text-white/30 cursor-not-allowed"
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
            <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-white/52 mb-3 px-2">
              App Type
            </div>
            <div className="space-y-1">
              {appTypes.filter(a => searchFilter(a)).map(appType => (
                <button
                  key={appType}
                  onClick={() => handleAppTypeSelect(appType)}
                  className={cn(
                    "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                    selectedAppType === appType
                      ? "bg-[#171617] text-white"
                      : "text-white/52 hover:bg-[#171617]/50"
                  )}
                >
                  {formatLabel(appType)}
                </button>
              ))}
              {appTypes.length === 0 && selectedFeature && (
                <div className="px-2 py-2 text-xs text-white/30">
                  Select a feature
                </div>
              )}
            </div>
          </div>

          {/* Library Column */}
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-normal uppercase tracking-[1.35px] text-white/52 mb-3 px-2">
              Library
            </div>
            <div className="space-y-1">
              {libraries.filter(l => searchFilter(l)).map(library => (
                <button
                  key={library}
                  onClick={() => handleLibrarySelect(library)}
                  className={cn(
                    "w-full rounded-[8px] px-2 py-2 text-[13px] text-left transition-colors",
                    selectedLibrary === library
                      ? "bg-[#171617] text-white"
                      : "text-white/52 hover:bg-[#171617]/50"
                  )}
                >
                  {formatLabel(library)}
                </button>
              ))}
              {libraries.length === 0 && selectedAppType && (
                <div className="px-2 py-2 text-xs text-white/30">
                  No library needed
                </div>
              )}
            </div>
          </div>
        </div>
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
