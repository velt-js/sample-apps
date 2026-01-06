"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { SampleViewer } from "@/components/viewer/sample-viewer"
import { getDefaultSample, getSampleById, getAllSamples } from "@/samples"

// Enable debug logging
const DEBUG = true

// Debug helper to log localStorage state
function logStorageState(context: string) {
  if (!DEBUG || typeof window === 'undefined') return

  const keys = Object.keys(localStorage).filter(k =>
    k.includes('document') || k.includes('sample') || k.includes('demo')
  )
  const state: Record<string, string | null> = {}
  keys.forEach(k => state[k] = localStorage.getItem(k))

  console.log(`[Page] localStorage (${context}):`, state)
}

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  // Always initialize with default to match server render
  const [currentSampleId, setCurrentSampleId] = useState<string>(getDefaultSample().metadata.id)
  const [documentId, setDocumentId] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)
  const isInitialized = useRef(false)
  const renderCount = useRef(0)

  renderCount.current++

  const currentSample = getSampleById(currentSampleId) || getDefaultSample()

  // Debug: Track renders
  useEffect(() => {
    if (DEBUG) {
      console.log(`[Page] Render #${renderCount.current}`, {
        currentSampleId,
        documentId,
        isMounted,
        isInitialized: isInitialized.current,
      })
    }
  })

  // Helper function to get document ID for a specific demo
  const getDocumentIdForDemo = useCallback((demoId: string): string => {
    if (typeof window === 'undefined') return ''

    const storageKey = `demo-${demoId}-document-id`
    const stored = localStorage.getItem(storageKey)

    if (DEBUG) {
      console.log(`[Page] getDocumentIdForDemo("${demoId}")`, {
        storageKey,
        storedValue: stored,
      })
    }

    if (stored) {
      return stored
    }

    // Generate a new document ID for this demo
    const newDocId = `doc-${demoId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem(storageKey, newDocId)

    if (DEBUG) {
      console.log(`[Page] Generated new documentId:`, newDocId)
    }

    return newDocId
  }, [])

  // Initialize: determine sample from URL path and get/set document ID
  useEffect(() => {
    if (isInitialized.current) return
    if (typeof window === 'undefined') return

    if (DEBUG) {
      console.log('[Page] === INITIALIZATION START ===')
      console.log('[Page] URL:', window.location.href)
      logStorageState('before init')
    }

    try {
      // 1. Determine which sample to load based on URL path
      const currentPath = window.location.pathname
      const allSamples = getAllSamples()
      const sampleFromPath = allSamples.find(s => s.metadata.routePath === currentPath)

      let targetSampleId = getDefaultSample().metadata.id

      if (DEBUG) {
        console.log('[Page] Path resolution:', {
          currentPath,
          sampleFromPath: sampleFromPath?.metadata.id,
        })
      }

      // Priority order: URL path > localStorage > default
      if (sampleFromPath) {
        targetSampleId = sampleFromPath.metadata.id
      } else {
        // Fallback to last selected sample from localStorage
        const lastSelected = localStorage.getItem('last-selected-sample-id')
        if (lastSelected) {
          const lastSample = getSampleById(lastSelected)
          if (lastSample) {
            targetSampleId = lastSelected
          }
        }
      }

      if (DEBUG) {
        console.log('[Page] Target sample:', targetSampleId)
      }

      // Store the selection for persistence
      localStorage.setItem('last-selected-sample-id', targetSampleId)

      // 2. Check URL for documentId parameter
      const urlParams = new URLSearchParams(window.location.search)
      let docId = urlParams.get('documentId')

      if (DEBUG) {
        console.log('[Page] URL documentId param:', docId)
      }

      if (docId) {
        // Use document ID from URL (shareable link)
        localStorage.setItem(`demo-${targetSampleId}-document-id`, docId)
        if (DEBUG) {
          console.log('[Page] Using documentId from URL:', docId)
        }
      } else {
        // Get or generate document ID for this specific demo
        docId = getDocumentIdForDemo(targetSampleId)
        if (DEBUG) {
          console.log('[Page] Got/generated documentId:', docId)
        }
      }

      // Mark as initialized BEFORE setting state to prevent sample change effect from running
      isInitialized.current = true

      if (DEBUG) {
        console.log('[Page] Setting state:', { targetSampleId, docId })
        logStorageState('after init')
      }

      // Update state atomically - both sampleId and documentId together
      // This ensures the iframe never renders with mismatched sample/document
      if (targetSampleId !== currentSampleId) {
        setCurrentSampleId(targetSampleId)
      }
      setDocumentId(docId)
      setIsMounted(true)

      if (DEBUG) {
        console.log('[Page] === INITIALIZATION COMPLETE ===')
      }
    } catch (error) {
      console.error('Error initializing:', error)
      setIsMounted(true)
    }
  }, [])

  // Debug: Periodic storage check
  useEffect(() => {
    if (!DEBUG || !isMounted) return

    const interval = setInterval(() => {
      logStorageState('periodic check')
    }, 5000) // Every 5 seconds

    return () => clearInterval(interval)
  }, [isMounted])

  // Handle sample selection: atomically update both sample and document ID
  // to prevent race conditions where iframe renders with mismatched data
  const handleSampleSelect = useCallback((newSampleId: string) => {
    if (newSampleId === currentSampleId) return
    if (typeof window === 'undefined') return

    if (DEBUG) {
      console.log('[Page] === SAMPLE SELECT ===', newSampleId)
      logStorageState('before sample select')
    }

    try {
      const sample = getSampleById(newSampleId)
      if (!sample) return

      // Store the current selection for persistence
      localStorage.setItem('last-selected-sample-id', newSampleId)

      // Get or generate document ID for this demo BEFORE updating state
      const docId = getDocumentIdForDemo(newSampleId)

      if (DEBUG) {
        console.log('[Page] Sample select - setting state:', { newSampleId, docId })
      }

      // ATOMIC UPDATE: Set both sample and document ID together
      // This prevents the iframe from rendering with mismatched data
      setCurrentSampleId(newSampleId)
      setDocumentId(docId)

      // Update URL after state update
      const routePath = sample.metadata.routePath || window.location.pathname
      const newUrl = `${routePath}?documentId=${docId}`

      if (window.location.href !== window.location.origin + newUrl) {
        window.history.pushState({}, '', newUrl)
        if (DEBUG) {
          console.log('[Page] Updated URL to:', newUrl)
        }
      }

      if (DEBUG) {
        logStorageState('after sample select')
      }
    } catch (error) {
      console.error('Error changing sample:', error)
    }
  }, [currentSampleId, getDocumentIdForDemo])

  // Handle reset: generate new document ID for current demo
  const handleReset = useCallback(() => {
    if (typeof window === 'undefined') return

    if (DEBUG) {
      console.log('[Page] === RESET ===')
      logStorageState('before reset')
    }

    try {
      const sample = getSampleById(currentSampleId)
      if (!sample) return

      // Generate a new document ID for this specific demo
      const newDocId = `doc-${currentSampleId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      if (DEBUG) {
        console.log('[Page] Generated new documentId for reset:', newDocId)
      }

      // Update localStorage for this demo
      localStorage.setItem(`demo-${currentSampleId}-document-id`, newDocId)

      // Update state
      setDocumentId(newDocId)

      // Update URL
      const routePath = sample.metadata.routePath || window.location.pathname
      const newUrl = `${routePath}?documentId=${newDocId}`

      if (window.location.href !== window.location.origin + newUrl) {
        window.history.pushState({}, '', newUrl)
        if (DEBUG) {
          console.log('[Page] Updated URL to:', newUrl)
        }
      }

      if (DEBUG) {
        logStorageState('after reset')
      }
    } catch (error) {
      console.error('Error resetting document:', error)
    }
  }, [currentSampleId])

  // Show loading state during hydration to prevent flash
  if (!isMounted) {
    return (
      <div className="flex h-screen overflow-hidden bg-background items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentSampleId={currentSampleId}
        onSampleSelect={handleSampleSelect}
      />

      {/* Main Content */}
      <SampleViewer
        sample={currentSample}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        documentId={documentId}
        onReset={handleReset}
      />
    </div>
  )
}
