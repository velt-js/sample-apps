'use client'

import { useState } from 'react'

type ReviewStatus = 'Draft' | 'In Review' | 'Approved' | 'Changes Requested'

const STATUS_COLORS: Record<ReviewStatus, string> = {
  'Draft': 'rgba(127,127,127,0.16)',
  'In Review': 'rgba(245,170,66,0.18)',
  'Approved': 'rgba(52,199,89,0.18)',
  'Changes Requested': 'rgba(245,93,103,0.18)',
}

const MOCKUPS = [
  { label: 'Mockup A — Onboarding flow', detail: 'First-run wizard, 3 steps' },
  { label: 'Mockup B — Workspace home', detail: 'Document grid + quick actions' },
  { label: 'Mockup C — Share dialog', detail: 'Invite by email, link permissions' },
]

export default function DocumentArticle() {
  const [status, setStatus] = useState<ReviewStatus>('In Review')

  return (
    <article
      data-name="document"
      className="max-w-[760px] mx-auto px-8 py-12"
      style={{ color: 'var(--app-text-primary)' }}
    >
      {/* Title + meta */}
      <div id="doc-header" className="mb-6">
        <h1 className="font-['Urbanist',sans-serif] font-semibold text-[34px] leading-tight mb-3">
          Q3 Launch — Product Spec
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

      {/* Reviewer callout */}
      <div
        className="flex items-start gap-3 rounded-xl px-4 py-3 mb-8 text-[14px] leading-relaxed"
        style={{
          border: '1px solid var(--app-border)',
          backgroundColor: 'var(--app-surface)',
          color: 'var(--app-text-secondary)',
        }}
      >
        <svg className="shrink-0 mt-[2px]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="6" width="13" height="12" rx="2" />
          <path d="M15 10l7-3v10l-7-3" />
        </svg>
        <p>
          <strong style={{ color: 'var(--app-text-primary)' }}>Reviewers:</strong>{' '}
          use the <strong style={{ color: 'var(--app-text-primary)' }}>Record</strong> button in the
          top bar to leave audio, video, or screen walkthrough feedback. Recordings appear in the
          Recordings panel with a transcript and AI summary.
        </p>
      </div>

      {/* Review status toolbar */}
      <div
        className="flex flex-wrap gap-2 mb-8 pb-6"
        style={{ borderBottom: '1px solid var(--app-divider)' }}
      >
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

      {/* Body */}
      <div className="flex flex-col gap-8 text-[16px] leading-[1.7]" style={{ color: 'var(--app-text-secondary)' }}>
        <section id="overview">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-2" style={{ color: 'var(--app-text-primary)' }}>
            Overview
          </h2>
          <p className="mb-3">
            This spec covers the Q3 launch of the new onboarding and sharing experience. The goal
            is to cut time-to-first-document from four minutes to under one, and to make sharing a
            workspace as easy as sending a link.
          </p>
          <p>
            Rather than trading written comments back and forth, reviewers record their feedback:
            talk through a concern, walk the team through a flow on screen, or react to a mockup on
            camera. Async review, without the meeting.
          </p>
        </section>

        <section id="mockups">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-3" style={{ color: 'var(--app-text-primary)' }}>
            Design mockups
          </h2>
          <div className="flex flex-col gap-4">
            {MOCKUPS.map((mockup) => (
              <figure
                key={mockup.label}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: 'var(--app-border)' }}
              >
                <div
                  className="aspect-video flex flex-col items-center justify-center gap-1"
                  style={{
                    background: 'linear-gradient(135deg, var(--app-surface) 0%, var(--app-bg) 100%)',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--app-text-tertiary)" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-[14px] font-medium" style={{ color: 'var(--app-text-primary)' }}>
                    {mockup.label}
                  </span>
                  <span className="text-[12px]" style={{ color: 'var(--app-text-tertiary)' }}>
                    {mockup.detail}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section id="requirements">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-2" style={{ color: 'var(--app-text-primary)' }}>
            Requirements
          </h2>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>New users reach a created document in under 60 seconds, with no required setup steps.</li>
            <li>Share dialog supports invite-by-email and public link with viewer / editor permissions.</li>
            <li>Onboarding wizard is skippable and resumable; progress persists across sessions.</li>
            <li>All three mockup flows ship behind a feature flag for staged rollout.</li>
          </ul>
        </section>

        <section id="open-questions">
          <h2 className="font-['Urbanist',sans-serif] font-semibold text-[20px] mb-2" style={{ color: 'var(--app-text-primary)' }}>
            Open questions
          </h2>
          <p>
            Should the share link default to viewer or editor access? Is the three-step wizard one
            step too many? Record a quick walkthrough of your take — a screen recording over the
            mockups above works best — and it will show up in the Recordings panel for the team.
          </p>
        </section>
      </div>
    </article>
  )
}
