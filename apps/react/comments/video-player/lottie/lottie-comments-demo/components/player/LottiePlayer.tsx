'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AnimationItem } from 'lottie-web'
// [Velt] VeltCommentPlayerTimeline renders comment bubbles over the seek bar;
// VeltCommentTool starts comment mode; VeltReactionTool pins emoji reactions
// to the current frame; useVeltClient gives setLocation/removeLocation
import {
  VeltCommentPlayerTimeline,
  VeltCommentTool,
  VeltReactionTool,
  useCommentUtils,
  useVeltClient,
} from '@veltdev/react'

export type SeekToCommentHandler = (event: { location?: { currentMediaPosition?: number } }) => void

interface LottiePlayerProps {
  /** Receives the seek-to-comment handler so the comments sidebar can reuse it */
  registerSeekHandler?: (handler: SeekToCommentHandler) => void
}

/**
 * Minimal Lottie review player. Frames are the media unit: pausing, seeking,
 * or entering comment mode sets a Velt Location keyed by the protected
 * `currentMediaPosition` field, which both pins comments to that frame and
 * positions their bubbles proportionally on the timeline.
 */
export default function LottiePlayer({ registerSeekHandler }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const seekBarRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames, setTotalFrames] = useState(0)

  // [Velt] Client for Location APIs; comment element for player config
  const { client } = useVeltClient()
  const commentElement = useCommentUtils()
  const clientRef = useRef(client)
  clientRef.current = client

  // Initialize lottie-web (client-side only; the library touches the DOM)
  useEffect(() => {
    if (!containerRef.current) return
    let animation: AnimationItem | undefined
    let cancelled = false

    void (async () => {
      const lottie = (await import('lottie-web')).default
      if (cancelled || !containerRef.current) return

      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/assets/lottie/brand-intro.json',
      })
      animationRef.current = animation

      animation.addEventListener('DOMLoaded', () => {
        setTotalFrames(Math.floor(animation!.totalFrames))
      })
      // Drives the progress bar and the frame counter
      animation.addEventListener('enterFrame', (e: { currentTime: number }) => {
        setCurrentFrame(Math.floor(e.currentTime))
      })
      animation.addEventListener('complete', () => {
        animation!.goToAndStop(0, true)
        setCurrentFrame(0)
        setIsPlaying(false)
      })
    })()

    return () => {
      cancelled = true
      animationRef.current = null
      animation?.destroy()
    }
  }, [])

  // [Velt] Tell the timeline the media length (in frames) so bubble positions
  // are proportional; runs once both the animation and comment element exist
  useEffect(() => {
    if (commentElement && totalFrames > 0) {
      commentElement.setTotalMediaLength(totalFrames)
    }
  }, [commentElement, totalFrames])

  // [Velt] Location ties a comment to a frame. `currentMediaPosition` is the
  // protected key the SDK uses to place bubbles on the player timeline.
  const setFrameLocation = useCallback((frame: number) => {
    clientRef.current?.setLocation({
      id: `frame-${frame}`,
      locationName: `Frame ${frame}`,
      currentMediaPosition: frame,
      videoPlayerId: 'lottiePlayer',
    })
  }, [])

  const pauseAtCurrentFrame = useCallback(() => {
    const animation = animationRef.current
    if (!animation) return
    animation.pause()
    setIsPlaying(false)
    setFrameLocation(Math.floor(animation.currentFrame))
  }, [setFrameLocation])

  const togglePlayPause = () => {
    const animation = animationRef.current
    if (!animation) return
    if (isPlaying) {
      pauseAtCurrentFrame()
    } else {
      // [Velt] Clear the Location while playing so frame-pinned comments
      // don't linger over moving frames
      clientRef.current?.removeLocation()
      animation.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const animation = animationRef.current
    const bar = seekBarRef.current
    if (!animation || !bar || totalFrames === 0) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const frame = Math.floor(ratio * totalFrames)
    animation.goToAndStop(frame, true)
    setCurrentFrame(frame)
    setIsPlaying(false)
    setFrameLocation(frame)
  }

  // [Velt] Entering comment mode pauses on the exact frame and sets the
  // Location, so the new comment is pinned to what the reviewer sees
  const onCommentModeChange = useCallback((mode: boolean) => {
    if (mode) {
      pauseAtCurrentFrame()
    }
  }, [pauseAtCurrentFrame])

  // [Velt] Clicking a timeline bubble (or a sidebar comment) seeks the
  // animation to the comment's frame and restores that Location
  const seekToComment = useCallback<SeekToCommentHandler>((event) => {
    const animation = animationRef.current
    const location = event?.location
    const frame = location?.currentMediaPosition
    if (!animation || !location || frame == null) return
    animation.goToAndStop(frame, true)
    setCurrentFrame(Math.floor(frame))
    setIsPlaying(false)
    clientRef.current?.setLocation(location)
  }, [])

  // Expose the seek handler to the host (used by the comments sidebar drawer)
  useEffect(() => {
    registerSeekHandler?.(seekToComment)
  }, [registerSeekHandler, seekToComment])

  const progressPercent = totalFrames > 0 ? (currentFrame / totalFrames) * 100 : 0

  return (
    <div className="relative">
      {/* [Velt] Comment target — commenting is restricted to this element via
          allowedElementIds(['lottiePlayer']) in VeltCollaboration */}
      <div
        id="lottiePlayer"
        ref={containerRef}
        className="w-full rounded-xl border overflow-hidden aspect-[700/650] max-h-[520px] [&>svg]:!h-full [&>svg]:!w-full"
        style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)' }}
      />

      {/* Player chrome */}
      <div
        className="mt-3 rounded-xl border px-3 py-2"
        style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface)' }}
      >
        {/* Seek zone — relative (non-static) parent so the Velt timeline can
            anchor its bubbles above the track */}
        <div className="relative pt-6">
          {/* [Velt] Comment bubbles over the seek bar; clicking one seeks to
              that frame. Sibling of the player per the Lottie setup docs. */}
          <div className="absolute inset-x-0 top-0 h-6">
            <VeltCommentPlayerTimeline
              videoPlayerId="lottiePlayer"
              totalMediaLength={totalFrames > 0 ? totalFrames : undefined}
              onCommentClick={seekToComment}
            />
          </div>
          <div
            ref={seekBarRef}
            onClick={handleSeek}
            className="group h-[8px] hover:h-[12px] transition-all rounded-full cursor-pointer"
            style={{ backgroundColor: 'var(--app-border)' }}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={totalFrames}
            aria-valuenow={currentFrame}
          >
            <div
              className="h-full rounded-full transition-[width] duration-75"
              style={{ width: `${progressPercent}%`, backgroundColor: '#6366f1' }}
            />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={togglePlayPause}
            className="flex items-center justify-center size-8 rounded-full cursor-pointer hover:opacity-90 transition-opacity shrink-0"
            style={{ backgroundColor: '#6366f1', color: '#fff' }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span
            className="text-[12px] tabular-nums shrink-0"
            style={{ color: 'var(--app-text-tertiary)' }}
          >
            frame {currentFrame} / {totalFrames || '…'}
          </span>

          <div className="ml-auto flex items-center gap-2">
            {/* [Velt] Pin an emoji reaction to the current frame */}
            <VeltReactionTool videoPlayerId="lottiePlayer" />
            {/* [Velt] Start comment mode; pauses the player on the exact frame */}
            <VeltCommentTool onCommentModeChange={onCommentModeChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
