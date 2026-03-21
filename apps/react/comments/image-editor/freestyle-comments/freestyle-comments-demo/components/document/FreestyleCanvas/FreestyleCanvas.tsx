'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import VeltTools from '../../velt/VeltTools'
import { IMAGES, ZOOM_PRESETS } from './constants'
import { PropertyRowProps } from './types'

const BASE_SIZE = 1024

export default function FreestyleCanvas() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(66)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [showDetailsPanel, setShowDetailsPanel] = useState(true)
  const [activeTab, setActiveTab] = useState<'details' | 'properties'>('details')
  const [showZoomMenu, setShowZoomMenu] = useState(false)
  const panStart = useRef({ x: 0, y: 0 })
  const panOffsetStart = useRef({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const zoomMenuRef = useRef<HTMLDivElement>(null)

  const activeImage = IMAGES[activeImageIndex]

  const getCenteredOffset = useCallback((zoom: number) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const scale = zoom / 100
    return {
      x: (canvas.clientWidth - BASE_SIZE * scale) / 2,
      y: (canvas.clientHeight - BASE_SIZE * scale) / 2,
    }
  }, [])

  useEffect(() => {
    setPanOffset(getCenteredOffset(zoomLevel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImageIndex])

  const changeImage = useCallback((index: number) => {
    setActiveImageIndex(index)
  }, [])

  const prevImage = useCallback(() => {
    changeImage((activeImageIndex - 1 + IMAGES.length) % IMAGES.length)
  }, [activeImageIndex, changeImage])

  const nextImage = useCallback(() => {
    changeImage((activeImageIndex + 1) % IMAGES.length)
  }, [activeImageIndex, changeImage])

  const zoomIn = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cx = canvas.clientWidth / 2
    const cy = canvas.clientHeight / 2
    setZoomLevel(z => {
      const newZ = Math.min(400, z + 10)
      const factor = newZ / z
      setPanOffset(prev => ({
        x: cx + (prev.x - cx) * factor,
        y: cy + (prev.y - cy) * factor,
      }))
      return newZ
    })
  }, [])

  const zoomOut = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cx = canvas.clientWidth / 2
    const cy = canvas.clientHeight / 2
    setZoomLevel(z => {
      const newZ = Math.max(10, z - 10)
      const factor = newZ / z
      setPanOffset(prev => ({
        x: cx + (prev.x - cx) * factor,
        y: cy + (prev.y - cy) * factor,
      }))
      return newZ
    })
  }, [])

  // Attach wheel handler as non-passive so preventDefault() works
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      setZoomLevel(prevZoom => {
        const newZoom = Math.min(400, Math.max(10, prevZoom + e.deltaY * -0.1))
        const zoomFactor = newZoom / prevZoom
        setPanOffset(prev => ({
          x: mouseX + (prev.x - mouseX) * zoomFactor,
          y: mouseY + (prev.y - mouseY) * zoomFactor,
        }))
        return Math.round(newZoom)
      })
    }

    canvas.addEventListener('wheel', handleWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleWheel)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    if ((e.target as HTMLElement).closest?.('velt-comment-pin')) return
    setIsPanning(true)
    panStart.current = { x: e.clientX, y: e.clientY }
    panOffsetStart.current = { ...panOffset }
  }, [panOffset])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return
    setPanOffset({
      x: panOffsetStart.current.x + (e.clientX - panStart.current.x),
      y: panOffsetStart.current.y + (e.clientY - panStart.current.y),
    })
  }, [isPanning])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPanning(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  // Close zoom menu on outside click
  useEffect(() => {
    if (!showZoomMenu) return
    const handleClick = (e: MouseEvent) => {
      if (zoomMenuRef.current && !zoomMenuRef.current.contains(e.target as Node)) {
        setShowZoomMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showZoomMenu])

  const fitToPage = useCallback(() => {
    setZoomLevel(66)
    setPanOffset(getCenteredOffset(66))
    setShowZoomMenu(false)
  }, [getCenteredOffset])

  const fitToWidth = useCallback(() => {
    setZoomLevel(100)
    setPanOffset(getCenteredOffset(100))
    setShowZoomMenu(false)
  }, [getCenteredOffset])

  const selectZoom = useCallback((level: number) => {
    setZoomLevel(level)
    setPanOffset(getCenteredOffset(level))
    setShowZoomMenu(false)
  }, [getCenteredOffset])

  const truncatedFilename = activeImage.filename.length > 40
    ? activeImage.filename.slice(0, 40) + '...'
    : activeImage.filename

  return (
    <div
      className="absolute inset-0 flex flex-col select-text"
      style={{ backgroundColor: '#1a1a1a', color: '#e0e0e0' }}
      data-name="freestyle"
    >
      {/* Main content area (relative container for floating controls + panel) */}
      <div className="relative flex-1 min-h-0">
        {/* Image canvas area - takes full space */}
        <div
          ref={canvasRef}
          className="absolute inset-0 overflow-hidden"
          style={{ cursor: isPanning ? 'grabbing' : 'grab', width: '100%', height: '100%' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          data-name="ImageCanvas"
        >
          <div
            style={{
              width: '1024px',
              height: '1024px',
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: '0 0',
              // pointerEvents: 'none',
            }}
            id="image-canvas"
          >
            <img
              src={activeImage.src}
              alt={`AI generated image ${activeImageIndex + 1}`}
              width={1024}
              height={1024}
              draggable={false}
              style={{
                display: 'block',
                pointerEvents: 'auto',
                userSelect: 'none',
              }}
            />
          </div>
        </div>

        {/* Floating top-left: Zoom controls */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-30">
          <div
            className="flex items-center gap-0.5 px-1"
            style={{ backgroundColor: '#252525', borderRadius: '12px', height: '40px' }}
          >
            <button
              onClick={zoomOut}
              className="flex items-center justify-center rounded-full hover:bg-[#333]"
              style={{ width: '32px', height: '32px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="8" y1="11" x2="14" y2="11" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              onClick={zoomIn}
              className="flex items-center justify-center rounded-full hover:bg-[#333]"
              style={{ width: '32px', height: '32px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <div className="relative" ref={zoomMenuRef}>
              <button
                onClick={() => setShowZoomMenu(v => !v)}
                className="flex items-center gap-1 px-3 py-1 rounded-full hover:bg-[#333] text-[13px]"
                style={{ color: '#ccc', fontFamily: 'system-ui', border: '1px solid #444' }}
              >
                <span>{zoomLevel}%</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showZoomMenu && (
                <div
                  className="absolute left-0 top-full mt-1 py-1 rounded-lg z-50"
                  style={{ backgroundColor: '#2a2a2a', border: '1px solid #444', minWidth: '140px' }}
                >
                  <button onClick={fitToWidth} className="w-full text-left px-4 py-1.5 text-[13px] hover:bg-[#383838]" style={{ color: '#ccc' }}>Fit to Width</button>
                  <button onClick={fitToPage} className="w-full text-left px-4 py-1.5 text-[13px] hover:bg-[#383838]" style={{ color: '#ccc' }}>Fit to Page</button>
                  {ZOOM_PRESETS.map(level => (
                    <button
                      key={level}
                      onClick={() => selectZoom(level)}
                      className="w-full text-left px-4 py-1.5 text-[13px] hover:bg-[#383838]"
                      style={{ color: '#ccc', fontWeight: level === zoomLevel ? 600 : 400 }}
                    >
                      {level}%
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tool icons group */}
          <div
            className="flex items-center gap-0.5 px-1"
            style={{ backgroundColor: '#252525', borderRadius: '12px', height: '40px' }}
          >
            <button className="flex items-center justify-center rounded-full hover:bg-[#333]" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-[#333]" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-[#333]" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-[#333]" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-[#333]" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating top-right: Velt controls + nav controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-30">
          {/* Velt controls */}
          <div className="flex items-center gap-1">
            <VeltTools />
          </div>

          {/* Nav controls: info toggle, prev/next, close */}
          <div
            className="flex items-center gap-0.5 px-1"
            style={{ backgroundColor: '#252525', borderRadius: '12px', height: '40px' }}
          >
            <button
              onClick={() => setShowDetailsPanel(p => !p)}
              className="flex items-center justify-center rounded-full hover:bg-[#333]"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: showDetailsPanel ? '#333' : 'transparent',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <circle cx="12" cy="8" r="0.5" fill="#ccc" />
              </svg>
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 2px' }} />

            <button
              onClick={prevImage}
              className="flex items-center justify-center rounded-full hover:bg-[#333]"
              style={{ width: '32px', height: '32px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="flex items-center justify-center rounded-full hover:bg-[#333]"
              style={{ width: '32px', height: '32px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 2px' }} />

            <button className="flex items-center justify-center rounded-full hover:bg-[#333]" style={{ width: '32px', height: '32px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating Details/Properties Panel */}
        {showDetailsPanel && (
          <div
            className="absolute flex flex-col overflow-y-auto z-20"
            style={{
              top: '56px',
              right: '12px',
              width: '280px',
              maxHeight: 'calc(100% - 60px)',
              backgroundColor: '#1e1e1e',
              borderRadius: '12px',
              border: '1px solid #333',
            }}
          >
            {/* Tabs + Close */}
            <div className="flex items-center shrink-0 px-2 pt-2" style={{ borderBottom: '1px solid #333' }}>
              <button
                onClick={() => setActiveTab('details')}
                className="flex items-center gap-1.5 px-3 pb-3 pt-1 text-[13px] font-medium"
                style={{
                  color: activeTab === 'details' ? '#ddd' : '#666',
                  borderBottom: activeTab === 'details' ? '2px solid #ddd' : '2px solid transparent',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <circle cx="12" cy="8" r="0.5" fill="currentColor" />
                </svg>
                Details
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className="flex items-center gap-1.5 px-3 pb-3 pt-1 text-[13px] font-medium"
                style={{
                  color: activeTab === 'properties' ? '#ddd' : '#666',
                  borderBottom: activeTab === 'properties' ? '2px solid #ddd' : '2px solid transparent',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="4" />
                  <rect x="14" y="10" width="7" height="4" />
                  <rect x="3" y="13" width="7" height="7" />
                </svg>
                Properties
              </button>
              <div className="flex-1" />
              <button
                onClick={() => setShowDetailsPanel(false)}
                className="flex items-center justify-center rounded hover:bg-[#333] mb-2"
                style={{ width: '24px', height: '24px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {activeTab === 'details' ? (
              <>
                {/* Prompt section */}
                <div className="px-5 pt-5 pb-5" style={{ borderBottom: '1px solid #333' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px]" style={{ color: '#999' }}>Prompt</span>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center justify-center hover:opacity-80" style={{ width: '20px', height: '20px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                      <button className="flex items-center justify-center hover:opacity-80" style={{ width: '20px', height: '20px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-[14px] leading-relaxed select-text" style={{ color: '#ddd' }}>
                    {activeImage.prompt}
                  </p>
                </div>

                {/* Organization section */}
                <div className="px-5 pt-5 pb-5">
                  <span className="text-[14px] block mb-4" style={{ color: '#999' }}>Organization</span>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-[14px] font-semibold" style={{ color: '#ddd' }}>Project:</span>
                    <button className="text-[14px] hover:underline" style={{ color: '#c8a96e' }}>
                      My First Project
                    </button>
                  </div>
                  <button
                    className="text-[13px] px-4 py-2 rounded-full border border-dashed hover:border-solid"
                    style={{ color: '#999', borderColor: '#555' }}
                  >
                    Add Tag +
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Properties tab: filename */}
                <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #333' }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] select-text truncate" style={{ color: '#888' }}>
                      {truncatedFilename}
                    </span>
                    <button className="flex items-center justify-center shrink-0 hover:opacity-80" style={{ width: '20px', height: '20px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Properties tab: metadata */}
                <div className="px-5 pt-4 pb-5 flex flex-col gap-4">
                  <PropertyRow label="Tool" value="Create" />
                  <PropertyRow label="Model" value="Stable Image Ultra" />
                  <PropertyRow label="Ratio" value="1 x 1" />
                  <PropertyRow label="Image Dimensions" value={activeImage.dimensions} />
                  <PropertyRow label="Image Size" value={activeImage.size} />
                  <div className="flex items-baseline gap-1.5 flex-nowrap">
                    <span className="text-[13px] font-semibold shrink-0 whitespace-nowrap" style={{ color: '#ddd' }}>Seed:</span>
                    <span className="text-[13px] select-text whitespace-nowrap" style={{ color: '#ddd' }}>{activeImage.seed}</span>
                    <button className="flex items-center justify-center shrink-0 hover:opacity-80 ml-1" style={{ width: '16px', height: '16px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom thumbnail strip */}
      <div
        className="flex items-center justify-center gap-3 px-4 shrink-0"
        style={{ height: '80px', backgroundColor: '#1a1a1a', borderTop: '1px solid #333' }}
      >
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => changeImage(i)}
            className="rounded overflow-hidden shrink-0"
            style={{
              width: '56px',
              height: '56px',
              border: i === activeImageIndex ? '2px solid #fff' : '2px solid transparent',
              opacity: i === activeImageIndex ? 1 : 0.5,
              transition: 'opacity 0.15s, border-color 0.15s',
            }}
          >
            <img
              src={img.src}
              alt={`Thumbnail ${i + 1}`}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function PropertyRow({ label, value }: PropertyRowProps) {
  return (
    <div className="flex items-baseline gap-1.5 flex-nowrap">
      <span className="text-[13px] font-semibold shrink-0 whitespace-nowrap" style={{ color: '#ddd' }}>{label}:</span>
      <span className="text-[13px] select-text whitespace-nowrap" style={{ color: '#ddd' }}>{value}</span>
    </div>
  )
}
