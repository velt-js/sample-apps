'use client'

import { useState } from 'react'
import { useActivityActions } from '@/hooks/useActivityActions'

type ReviewStatus = 'Draft' | 'In Review' | 'Approved' | 'Changes Requested'

const STATUS_COLORS: Record<ReviewStatus, string> = {
  'Draft': 'rgba(127,127,127,0.16)',
  'In Review': 'rgba(245,170,66,0.18)',
  'Approved': 'rgba(52,199,89,0.18)',
  'Changes Requested': 'rgba(245,93,103,0.18)',
}

export default function DocumentArticle() {
  const [status, setStatus] = useState<ReviewStatus>('In Review')
  // [Velt] Emit custom activity records for app-level document events
  const { logStatusChanged, logShared } = useActivityActions()

  const changeStatus = (next: ReviewStatus) => {
    setStatus(next)
    void logStatusChanged(next)
  }

  return (
    <article
      data-name="document"
      className="max-w-[760px] mx-auto px-8 py-12"
      style={{ color: 'var(--app-text-primary)' }}
    >
      {/* Title + meta */}
      <div id="doc-header" className="mb-6">
        <h1 className="font-['Urbanist',sans-serif] font-semibold text-[34px] leading-tight mb-3">
          Q3 Product Spec: Collaborative Editor
        </h1>
        <div className="flex items-center gap-3 text-[14px]" style={{ color: 'var(--app-text-tertiary)' }}>
          <span>By Jordan Lee</span>
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

      {/* Review toolbar: each action writes a custom activity */}
      <div
        className="flex flex-wrap gap-2 mb-8 pb-6"
        style={{ borderBottom: '1px solid var(--app-divider)' }}
      >
        <button
          onClick={() => changeStatus('Approved')}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ✓ Approve
        </button>
        <button
          onClick={() => changeStatus('Changes Requested')}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ✎ Request changes
        </button>
        <button
          onClick={() => changeStatus('In Review')}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ↻ Move to review
        </button>
        <button
          onClick={() => void logShared()}
          className="px-3 py-[6px] rounded-lg text-[13px] cursor-pointer transition-colors"
          style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface)', color: 'var(--app-text-primary)' }}
        >
          ↗ Share
        </button>
      </div>

      {/* Body: commentable content */}
      <div className="flex flex-col gap-6 text-[16px] leading-[1.7]" style={{ color: 'var(--app-text-secondary)' }}>
        <p id="doc-p-1">
          This document outlines the scope for the Q3 collaborative editor. The goal is
          to let multiple teammates review and sign off on specs without leaving the page.
          Highlight any sentence and leave a comment to start a thread. Every comment,
          reply, and reaction is captured in the Activity Log on the right.
        </p>

        <section id="doc-section-goals">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-2" style={{ color: 'var(--app-text-primary)' }}>
            Goals
          </h2>
          <p>
            Reviewers should be able to comment inline, react to messages, and change the
            document status (Approve, Request changes). Each of those actions becomes an
            entry in a single, chronological audit trail so anyone can see what happened
            and when.
          </p>
        </section>

        <section id="doc-section-scope">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-2" style={{ color: 'var(--app-text-primary)' }}>
            In scope
          </h2>
          <p>
            Threaded comments, reactions, presence avatars, and a live activity feed.
            Out of scope for this milestone: real-time co-editing of the document body
            and any automated bots.
          </p>
        </section>

        <section id="doc-section-notes">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-2" style={{ color: 'var(--app-text-primary)' }}>
            Open questions
          </h2>
          <p>
            Should status changes notify subscribers by email? How long should the
            activity history be retained? Drop your thoughts as comments, and try it with a
            second browser profile to watch the feed update in real time.
          </p>
        </section>
      </div>
    </article>
  )
}
