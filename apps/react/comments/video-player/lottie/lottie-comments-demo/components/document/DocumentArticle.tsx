'use client'

import { useState } from 'react'
import LottiePlayer, { type SeekToCommentHandler } from '@/components/player/LottiePlayer'

type ReviewStatus = 'Draft' | 'In Review' | 'Approved' | 'Changes Requested'

const STATUS_COLORS: Record<ReviewStatus, string> = {
  'Draft': 'rgba(127,127,127,0.16)',
  'In Review': 'rgba(245,170,66,0.18)',
  'Approved': 'rgba(52,199,89,0.18)',
  'Changes Requested': 'rgba(245,93,103,0.18)',
}

interface DocumentArticleProps {
  registerSeekHandler?: (handler: SeekToCommentHandler) => void
}

export default function DocumentArticle({ registerSeekHandler }: DocumentArticleProps) {
  const [status, setStatus] = useState<ReviewStatus>('In Review')

  return (
    <article
      data-name="document"
      className="max-w-[760px] mx-auto px-8 py-12"
      style={{ color: 'var(--app-text-primary)' }}
    >
      {/* Title + meta */}
      <div className="mb-6">
        <h1 className="font-['Urbanist',sans-serif] font-semibold text-[34px] leading-tight mb-3">
          Brand Intro — v3
        </h1>
        <div className="flex items-center gap-3 text-[14px]" style={{ color: 'var(--app-text-tertiary)' }}>
          <span>Animation by Jordan Lee</span>
          <span>·</span>
          <span>Updated today</span>
          <span
            className="px-2 py-[2px] rounded-full text-[12px] font-medium"
            style={{ backgroundColor: STATUS_COLORS[status], color: 'var(--app-text-primary)' }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Reviewer callout */}
      <div
        className="flex items-start gap-3 rounded-xl px-4 py-3 mb-6 text-[14px] leading-relaxed"
        style={{
          border: '1px solid var(--app-border)',
          backgroundColor: 'var(--app-surface)',
          color: 'var(--app-text-secondary)',
        }}
      >
        <svg className="shrink-0 mt-[2px]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
        <p>
          <strong style={{ color: 'var(--app-text-primary)' }}>Reviewers:</strong>{' '}
          pause on any frame (or scrub to it) and use the comment tool to pin feedback to that
          exact frame. Comments show up as bubbles on the timeline — click one to jump back to
          its frame.
        </p>
      </div>

      {/* Review status toolbar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setStatus('Approved')}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ✓ Approve
        </button>
        <button
          onClick={() => setStatus('Changes Requested')}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ✎ Request changes
        </button>
        <button
          onClick={() => setStatus('In Review')}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ↻ Move to review
        </button>
      </div>

      {/* The review stage: Lottie player + Velt comment timeline */}
      <LottiePlayer registerSeekHandler={registerSeekHandler} />
    </article>
  )
}
