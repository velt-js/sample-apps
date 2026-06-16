'use client'

import type { CSSProperties } from 'react'
import { useSuggestions, VeltCommentThread } from '@veltdev/react'
import { FIELD_LABEL, TARGET } from './types'

/**
 * Lists every Suggestion on the document. For each one we show the actual
 * pending change (label + old → new diff, or a summary for the body), then a
 * <VeltCommentThread> — Velt's default comment dialog — for the Accept / Reject
 * actions + discussion. Reviewers act here; the outcome flows to the inline
 * suggestion bridge (body) and <ApplySuggestions /> (fields).
 */
export default function OpenSuggestionsPanel() {
  const suggestions = useSuggestions() ?? []
  const pendingCount = suggestions.filter((s) => s.status === 'pending').length
  // Newest first — sort by creation time descending.
  const ordered = [...suggestions].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))

  return (
    <div style={S.card}>
      <div style={S.sectionLabel}>
        Open suggestions{pendingCount ? ` · ${pendingCount} pending` : ''}
      </div>

      {suggestions.length === 0 ? (
        <div style={S.empty}>
          No suggestions yet. Edit a field — or the article body — to propose a
          change; every edit is captured as a <strong>suggestion</strong>.
        </div>
      ) : (
        <ul style={S.list}>
          {ordered.map((s) => (
            <li key={s.annotationId} style={S.listItem}>
              <div style={S.changeHeader}>
                <span style={S.changeLabel}>{labelFor(s)}</span>
                <span style={statusStyle(s.status)}>{s.status}</span>
              </div>

              <div style={S.diff}>
                <Diff s={s} />
              </div>

              <VeltCommentThread annotationId={s.annotationId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// A suggestion can come from a metadata field (title/status/category/date) or
// from an inline body edit produced by the Tiptap suggestion engine. Inline
// body edits carry `metadata.kind` and the real diff in `metadata.oldValue` /
// `metadata.newValue` (the SDK's top-level oldValue is empty for those).
type SuggestionLike = {
  targetId: string
  oldValue: unknown
  newValue: unknown
  summary: string | null
  metadata?: Record<string, unknown>
}

function isInlineBody(s: SuggestionLike): boolean {
  return typeof s.metadata?.kind === 'string'
}

function labelFor(s: SuggestionLike): string {
  if (isInlineBody(s)) return 'Article body'
  return FIELD_LABEL[s.targetId] ?? s.targetId
}

function Diff({ s }: { s: SuggestionLike }) {
  // Inline body edit — read the real per-edit diff from metadata.
  if (isInlineBody(s)) {
    const kind = String(s.metadata?.kind)
    if (kind === 'format-add' || kind === 'format-remove') {
      return <span style={S.summary}>{s.summary ?? 'Formatting change'}</span>
    }
    const oldV = String(s.metadata?.oldValue ?? '')
    const newV = String(s.metadata?.newValue ?? '')
    return (
      <>
        {oldV && <span style={S.oldValue}>{truncate(oldV)}</span>}
        {oldV && newV && <span style={S.arrow}>→</span>}
        {newV && <span style={S.newValue}>{truncate(newV)}</span>}
      </>
    )
  }
  // Date field — neutral before → after (no strikethrough).
  if (s.targetId === TARGET.publishDate) {
    return (
      <>
        <span style={S.oldValueNeutral}>{truncate(String(s.oldValue))}</span>
        <span style={S.arrow}>→</span>
        <span style={S.newValue}>{truncate(String(s.newValue))}</span>
      </>
    )
  }
  // Text field (title/status/category) — strikethrough old → new.
  return (
    <>
      <span style={S.oldValue}>{truncate(String(s.oldValue))}</span>
      <span style={S.arrow}>→</span>
      <span style={S.newValue}>{truncate(String(s.newValue))}</span>
    </>
  )
}

function truncate(v: string, max = 120): string {
  return v.length > max ? `${v.slice(0, max)}…` : v
}

function statusStyle(status: string): CSSProperties {
  const map: Record<string, { bg: string; fg: string }> = {
    pending: { bg: 'rgba(99,102,241,0.14)', fg: '#6366f1' },
    approved: { bg: 'rgba(25,143,101,0.16)', fg: '#198f65' },
    rejected: { bg: 'rgba(255,113,98,0.16)', fg: '#ff7162' },
    stale: { bg: 'rgba(128,128,128,0.16)', fg: '#9aa0a6' },
    apply_failed: { bg: 'rgba(255,113,98,0.16)', fg: '#ff7162' },
  }
  const c = map[status] ?? map.stale
  return {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '.06em',
    textTransform: 'uppercase',
    color: c.fg,
    background: c.bg,
    padding: '2px 8px',
    borderRadius: 999,
  }
}

const S: Record<string, CSSProperties> = {
  card: {
    background: 'var(--app-surface)',
    border: '1px solid var(--app-surface-border)',
    borderRadius: 16,
    padding: '16px 14px 18px',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--app-text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    paddingBottom: 12,
    marginBottom: 16,
    borderBottom: '1px solid var(--app-surface-border)',
  },
  empty: {
    fontSize: 13,
    color: 'var(--app-text-tertiary)',
    background: 'var(--app-bg)',
    border: '1px dashed var(--app-surface-border)',
    borderRadius: 10,
    padding: '20px 16px',
    textAlign: 'center',
  },
  list: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    maxHeight: 'calc(100vh - 160px)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  listItem: {
    listStyle: 'none',
    border: '1px solid var(--app-surface-border)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    background: 'var(--app-bg)',
  },
  changeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  changeLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--app-text-primary)',
  },
  diff: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 12,
    marginBottom: 10,
  },
  oldValue: {
    color: 'var(--app-text-tertiary)',
    textDecoration: 'line-through',
    background: 'rgba(255,113,98,0.10)',
    padding: '2px 6px',
    borderRadius: 4,
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  oldValueNeutral: {
    color: 'var(--app-text-secondary)',
    background: 'var(--app-surface-hover)',
    padding: '2px 6px',
    borderRadius: 4,
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  arrow: { color: 'var(--app-text-tertiary)' },
  newValue: {
    color: 'var(--app-text-primary)',
    background: 'rgba(25,143,101,0.14)',
    padding: '2px 6px',
    borderRadius: 4,
    fontWeight: 500,
    overflowWrap: 'anywhere',
    minWidth: 0,
  },
  summary: { color: 'var(--app-text-secondary)', fontStyle: 'italic' },
}
