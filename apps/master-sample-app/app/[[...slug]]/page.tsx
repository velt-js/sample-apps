"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { SampleViewer } from "@/components/viewer/sample-viewer"
import { getDefaultSample, getSampleById, getAllSamples } from "@/samples"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  // Always initialize with default to match server render
  const [currentSampleId, setCurrentSampleId] = useState<string>(getDefaultSample().metadata.id)
  const [documentId, setDocumentId] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)
  const isInitialized = useRef(false)
  
  const currentSample = getSampleById(currentSampleId) || getDefaultSample()

  // Helper function to get document ID for a specific demo
  const getDocumentIdForDemo = useCallback((demoId: string): string => {
    if (typeof window === 'undefined') return ''
    
    // Check if there's a stored document ID for this demo
    const stored = localStorage.getItem(`demo-${demoId}-document-id`)
    if (stored) {
      return stored
    }
    
    // Generate a new document ID for this demo
    const newDocId = `doc-${demoId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem(`demo-${demoId}-document-id`, newDocId)
    return newDocId
  }, [])

  // Initialize: determine sample from URL path and get/set document ID
  useEffect(() => {
    if (isInitialized.current) return
    if (typeof window === 'undefined') return

    try {
      // 1. Determine which sample to load based on URL path
      const currentPath = window.location.pathname
      const allSamples = getAllSamples()
      const sampleFromPath = allSamples.find(s => s.metadata.routePath === currentPath)

      let targetSampleId = getDefaultSample().metadata.id

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

      // Store the selection for persistence
      localStorage.setItem('last-selected-sample-id', targetSampleId)

      // 2. Check URL for documentId parameter
      const urlParams = new URLSearchParams(window.location.search)
      let docId = urlParams.get('documentId')

      if (docId) {
        // Use document ID from URL (shareable link)
        localStorage.setItem(`demo-${targetSampleId}-document-id`, docId)
      } else {
        // Get or generate document ID for this specific demo
        docId = getDocumentIdForDemo(targetSampleId)
      }

      // Mark as initialized BEFORE setting state to prevent sample change effect from running
      isInitialized.current = true

      // Update state atomically - both sampleId and documentId together
      // This ensures the iframe never renders with mismatched sample/document
      if (targetSampleId !== currentSampleId) {
        setCurrentSampleId(targetSampleId)
      }
      setDocumentId(docId)
      setIsMounted(true)
    } catch (error) {
      console.error('Error initializing:', error)
      setIsMounted(true)
    }
  }, [])

  // Handle sample selection: atomically update both sample and document ID
  // to prevent race conditions where iframe renders with mismatched data
  const handleSampleSelect = useCallback((newSampleId: string) => {
    if (newSampleId === currentSampleId) return
    if (typeof window === 'undefined') return

    try {
      const sample = getSampleById(newSampleId)
      if (!sample) return

      // Store the current selection for persistence
      localStorage.setItem('last-selected-sample-id', newSampleId)

      // Get or generate document ID for this demo BEFORE updating state
      const docId = getDocumentIdForDemo(newSampleId)

      // Update URL
      const routePath = sample.metadata.routePath || ''
      const newUrl = `${routePath}?documentId=${docId}`
      
      if (window.location.pathname + window.location.search !== newUrl) {
        window.history.pushState({}, '', newUrl)
      }

      // ATOMIC UPDATE: Set both sample and document ID together
      // This prevents the iframe from rendering with mismatched data
      setCurrentSampleId(newSampleId)
      setDocumentId(docId)
    } catch (error) {
      console.error('Error changing sample:', error)
    }
  }, [currentSampleId, getDocumentIdForDemo])

  // Handle sample change: only update URL if sample changed externally
  useEffect(() => {
    if (!isInitialized.current) return
    if (typeof window === 'undefined') return
    if (!documentId) return // Skip if document ID hasn't been set yet

    try {
      const sample = getSampleById(currentSampleId)
      if (!sample) return

      // Update URL if it doesn't match current state
      const routePath = sample.metadata.routePath || ''
      const expectedUrl = `${routePath}?documentId=${documentId}`

      if (window.location.pathname + window.location.search !== expectedUrl) {
        window.history.pushState({}, '', expectedUrl)
      }
    } catch (error) {
      console.error('Error syncing URL:', error)
    }
  }, [currentSampleId, documentId])

  // Handle reset: generate new document ID for current demo
  const handleReset = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      const sample = getSampleById(currentSampleId)
      if (!sample) return

      // Generate a new document ID for this specific demo
      const newDocId = `doc-${currentSampleId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      
      // Update localStorage for this demo
      localStorage.setItem(`demo-${currentSampleId}-document-id`, newDocId)
      
      // Update state and URL atomically
      setDocumentId(newDocId)
      const routePath = sample.metadata.routePath || ''
      const newUrl = `${routePath}?documentId=${newDocId}`
      
      window.history.pushState({}, '', newUrl)
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

