'use client'

import { useState } from 'react'
// [Velt] Comment mode state drives the hint chip
import { useCommentModeState } from '@veltdev/react'
import DashboardGrid from '@/components/dashboard/DashboardGrid'

type ReviewStatus = 'Draft' | 'In Review' | 'Approved' | 'Changes Requested'

const STATUS_COLORS: Record<ReviewStatus, string> = {
  'Draft': 'rgba(127,127,127,0.16)',
  'In Review': 'rgba(245,170,66,0.18)',
  'Approved': 'rgba(52,199,89,0.18)',
  'Changes Requested': 'rgba(245,93,103,0.18)',
}

export default function DocumentArticle() {
  const [status, setStatus] = useState<ReviewStatus>('In Review')
  // [Velt] True while the comment tool is active
  const commentMode = useCommentModeState()

  return (
    <article
      data-name="document"
      className="max-w-[1080px] mx-auto px-8 py-12"
      style={{ color: 'var(--app-text-primary)' }}
    >
      {/* Title + meta */}
      <div className="mb-6">
        <h1 className="font-['Urbanist',sans-serif] font-semibold text-[34px] leading-tight mb-3">
          Q2 Product Usage Review
        </h1>
        <div className="flex items-center gap-3 text-[14px]" style={{ color: 'var(--app-text-tertiary)' }}>
          <span>Prepared by Jordan Lee</span>
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
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
        <p>
          <strong style={{ color: 'var(--app-text-primary)' }}>Reviewers:</strong>{' '}
          hover a chart (or activate the comment tool in the top bar) to reveal a comment icon
          on every data point and pie slice, then click one to start a thread on that exact
          value ("why did W4 dip?"). The comment dialog shows the point's series, label, and
          value, and pins persist across theme changes and reloads.
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
        {/* Comment-mode hint chip; visibility toggle keeps the row from
            reflowing, so chart pins never shift mid-comment */}
        <span
          className="flex items-center gap-2 rounded-lg px-3 py-[6px] text-[13px]"
          style={{
            backgroundColor: 'rgba(99,102,241,0.12)',
            color: 'var(--app-text-primary)',
            visibility: commentMode ? 'visible' : 'hidden',
          }}
        >
          <span className="inline-block size-2 rounded-full shrink-0" style={{ backgroundColor: '#6366f1' }} />
          Comment mode is on. Click a data point icon to start a thread.
        </span>
      </div>

      {/* The dashboard: metric cards + the two commentable charts */}
      <DashboardGrid />
    </article>
  )
}
