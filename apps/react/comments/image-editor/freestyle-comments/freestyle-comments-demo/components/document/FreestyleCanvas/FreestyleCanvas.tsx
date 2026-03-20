'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const IMAGES = [
  { src: '/assets/ai-1.webp', prompt: 'A futuristic cityscape at sunset with neon lights reflecting off rain-soaked streets, cyberpunk aesthetic, ultra detailed' },
  { src: '/assets/ai-2.webp', prompt: 'An enchanted forest with bioluminescent mushrooms and floating fireflies, magical atmosphere, soft ethereal lighting' },
  { src: '/assets/ai-3.webp', prompt: 'Abstract fluid art in deep ocean colors with gold metallic accents, high resolution, dramatic contrast' },
  { src: '/assets/ai-4.webp', prompt: 'A cozy mountain cabin in winter with warm light spilling from windows, snow-covered pines, northern lights in the sky' },
]

export default function FreestyleCanvas() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(66)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [showDetailsPanel, setShowDetailsPanel] = useState(true)
  const panStart = useRef({ x: 0, y: 0 })
  const panOffsetStart = useRef({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const changeImage = useCallback((index: number) => {
    setActiveImageIndex(index)
    setPanOffset({ x: 0, y: 0 })
  }, [])

  const prevImage = useCallback(() => {
    changeImage((activeImageIndex - 1 + IMAGES.length) % IMAGES.length)
  }, [activeImageIndex, changeImage])

  const nextImage = useCallback(() => {
    changeImage((activeImageIndex + 1) % IMAGES.length)
  }, [activeImageIndex, changeImage])

  const zoomIn = useCallback(() => {
    setZoomLevel(z => Math.min(400, z + 10))
  }, [])

  const zoomOut = useCallback(() => {
    setZoomLevel(z => Math.max(10, z - 10))
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2

    setZoomLevel(prevZoom => {
      const newZoom = Math.min(400, Math.max(10, prevZoom + e.deltaY * -0.1))
      const zoomFactor = newZoom / prevZoom
      setPanOffset(prev => ({
        x: mouseX - (mouseX - prev.x) * zoomFactor,
        y: mouseY - (mouseY - prev.y) * zoomFactor,
      }))
      return Math.round(newZoom)
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
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

  return (
    <div
      className="absolute inset-0 flex flex-col select-text"
      style={{ backgroundColor: '#1a1a1a', color: '#e0e0e0' }}
      data-name="freestyle"
    >
      {/* Top Toolbar */}
      <div
        className="flex items-center justify-between px-4 shrink-0"
        style={{ height: '48px', backgroundColor: '#252525', borderBottom: '1px solid #333' }}
      >
        {/* Left: Zoom controls + tool icons */}
        <div className="flex items-center gap-1">
          {/* Zoom out */}
          <button
            onClick={zoomOut}
            className="flex items-center justify-center rounded hover:bg-[#333]"
            style={{ width: '28px', height: '28px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {/* Zoom in */}
          <button
            onClick={zoomIn}
            className="flex items-center justify-center rounded hover:bg-[#333]"
            style={{ width: '28px', height: '28px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {/* Zoom percentage */}
          <button
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#333] text-xs"
            style={{ color: '#aaa', fontFamily: 'system-ui' }}
          >
            <span>{zoomLevel}%</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Separator */}
          <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 4px' }} />

          {/* Download */}
          <button className="flex items-center justify-center rounded hover:bg-[#333]" style={{ width: '28px', height: '28px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          {/* Star */}
          <button className="flex items-center justify-center rounded hover:bg-[#333]" style={{ width: '28px', height: '28px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
          {/* Trash */}
          <button className="flex items-center justify-center rounded hover:bg-[#333]" style={{ width: '28px', height: '28px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
          {/* Pen / Edit */}
          <button className="flex items-center justify-center rounded hover:bg-[#333]" style={{ width: '28px', height: '28px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          {/* Sliders / Settings */}
          <button className="flex items-center justify-center rounded hover:bg-[#333]" style={{ width: '28px', height: '28px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
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

        {/* Right: Info, prev/next, close */}
        <div className="flex items-center gap-1">
          {/* Info toggle */}
          <button
            onClick={() => setShowDetailsPanel(p => !p)}
            className="flex items-center justify-center rounded hover:bg-[#333]"
            style={{ width: '28px', height: '28px', backgroundColor: showDetailsPanel ? '#444' : 'transparent' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>

          {/* Separator */}
          <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 4px' }} />

          {/* Prev */}
          <button
            onClick={prevImage}
            className="flex items-center justify-center rounded hover:bg-[#333]"
            style={{ width: '28px', height: '28px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {/* Next */}
          <button
            onClick={nextImage}
            className="flex items-center justify-center rounded hover:bg-[#333]"
            style={{ width: '28px', height: '28px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Separator */}
          <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 4px' }} />

          {/* Close */}
          <button className="flex items-center justify-center rounded hover:bg-[#333]" style={{ width: '28px', height: '28px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Image canvas area */}
        <div
          ref={canvasRef}
          className="flex-1 flex items-center justify-center overflow-hidden relative"
          style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          data-name="ImageCanvas"
        >
          <img
            src={IMAGES[activeImageIndex].src}
            alt={`AI generated image ${activeImageIndex + 1}`}
            draggable={false}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              transform: `scale(${zoomLevel / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: 'center center',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        </div>

        {/* Details Panel */}
        {showDetailsPanel && (
          <div
            className="shrink-0 flex flex-col overflow-y-auto"
            style={{
              width: '280px',
              backgroundColor: '#222',
              borderLeft: '1px solid #333',
            }}
          >
            {/* Tabs */}
            <div className="flex" style={{ borderBottom: '1px solid #333' }}>
              <button
                className="flex-1 py-3 text-xs font-medium text-center"
                style={{ color: '#fff', borderBottom: '2px solid #fff' }}
              >
                Details
              </button>
              <button
                className="flex-1 py-3 text-xs font-medium text-center"
                style={{ color: '#666' }}
              >
                Properties
              </button>
            </div>

            {/* Prompt section */}
            <div className="p-4" style={{ borderBottom: '1px solid #333' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ color: '#888' }}>Prompt</span>
                <div className="flex items-center gap-2">
                  {/* Copy icon */}
                  <button className="flex items-center justify-center hover:opacity-80" style={{ width: '20px', height: '20px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                  {/* Heart icon */}
                  <button className="flex items-center justify-center hover:opacity-80" style={{ width: '20px', height: '20px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-xs leading-relaxed select-text" style={{ color: '#ccc' }}>
                {IMAGES[activeImageIndex].prompt}
              </p>
            </div>

            {/* Organization section */}
            <div className="p-4" style={{ borderBottom: '1px solid #333' }}>
              <span className="text-xs font-medium block mb-2" style={{ color: '#888' }}>Organization</span>
              <button className="text-xs hover:underline" style={{ color: '#7B9FFF' }}>
                My First Project
              </button>
            </div>

            {/* Tags section */}
            <div className="p-4">
              <span className="text-xs font-medium block mb-2" style={{ color: '#888' }}>Tags</span>
              <button
                className="text-xs px-3 py-1.5 rounded-full border border-dashed hover:border-solid"
                style={{ color: '#888', borderColor: '#555' }}
              >
                Add Tag +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom thumbnail strip */}
      <div
        className="flex items-center justify-center gap-2 px-4 shrink-0"
        style={{ height: '72px', backgroundColor: '#1e1e1e', borderTop: '1px solid #333' }}
      >
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => changeImage(i)}
            className="rounded overflow-hidden shrink-0"
            style={{
              width: '52px',
              height: '52px',
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
