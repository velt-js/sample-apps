'use client'

import type { CSSProperties } from 'react'
import { usePendingSuggestion, useSuggestionModeState } from '@veltdev/react'
import { useProposal } from './ProposalContext'
import { TARGET, STATUS_OPTIONS, CATEGORY_OPTIONS } from './types'

/**
 * The "article metadata" card. Every control is tagged with
 * `data-velt-suggestion-target` so that — when suggestion mode is on — editing
 * a field and blurring it creates a pending Velt Suggestion (old → new) instead
 * of a silent write. The rich-text body below (TipTap) stays the comments
 * surface; these structured fields are the suggestion surface.
 */
export default function ProposalFields() {
  const { proposal, writeField } = useProposal()

  return (
    <div style={S.card}>
      <div style={S.sectionLabel}>Article details</div>

      <Field
        kind="input"
        label="Title"
        targetId={TARGET.title}
        value={proposal.title}
        onChange={(v) => writeField(TARGET.title, v)}
      />

      <div style={S.row}>
        <Field
          kind="select"
          label="Status"
          targetId={TARGET.status}
          options={STATUS_OPTIONS}
          value={proposal.status}
          onChange={(v) => writeField(TARGET.status, v)}
        />
        <Field
          kind="select"
          label="Category"
          targetId={TARGET.category}
          options={CATEGORY_OPTIONS}
          value={proposal.category}
          onChange={(v) => writeField(TARGET.category, v)}
        />
        <Field
          kind="date"
          label="Publish date"
          targetId={TARGET.publishDate}
          value={proposal.publishDate}
          onChange={(v) => writeField(TARGET.publishDate, v)}
        />
      </div>
    </div>
  )
}

// ── Field ───────────────────────────────────────────────────────────────────
// One primitive control. The `data-velt-suggestion-target` attribute goes on
// the form element itself; the SDK reads `.value` at focus and blur to detect a
// change. Controlled inputs (state updates each keystroke) keep `.value` in
// sync, so no `registerTarget` getter is needed for these simple primitives.

type CommonFieldProps = {
  label: string
  targetId: string
  value: string
  onChange: (v: string) => void
}

type FieldProps = CommonFieldProps &
  ({ kind: 'input' | 'date' } | { kind: 'select'; options: string[] })

function Field(props: FieldProps) {
  const { label, targetId, value, onChange, kind } = props
  const suggesting = useSuggestionModeState() ?? false
  const pending = usePendingSuggestion(targetId)

  return (
    <label style={S.field}>
      <span style={S.fieldLabel}>{label}</span>
      <div style={S.fieldWrap}>
        {kind === 'input' && (
          <input
            type="text"
            data-velt-suggestion-target={targetId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={controlStyle(suggesting, !!pending)}
          />
        )}

        {kind === 'select' && (
          <select
            data-velt-suggestion-target={targetId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={controlStyle(suggesting, !!pending)}
          >
            {props.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}

        {kind === 'date' && (
          <input
            type="date"
            data-velt-suggestion-target={targetId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={controlStyle(suggesting, !!pending)}
          />
        )}

        {pending && (
          <span style={S.pendingPill} title={pending.summary ?? undefined}>
            PENDING
          </span>
        )}
      </div>
    </label>
  )
}

const ACCENT = '#6366f1'
const ACCENT_DIM = 'rgba(99,102,241,0.10)'
const WARN = '#f59e0b'
const WARN_DIM = 'rgba(245,158,11,0.12)'

function controlStyle(suggesting: boolean, pending: boolean): CSSProperties {
  const base: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 10px',
    border: '1px solid var(--app-surface-border)',
    borderRadius: 8,
    fontSize: 13,
    fontFamily: 'inherit',
    color: 'var(--app-text-primary)',
    background: 'var(--app-bg)',
    outline: 'none',
    transition: 'border-color .15s, background .15s',
  }
  if (pending) return { ...base, border: `1px dashed ${WARN}`, background: WARN_DIM }
  if (suggesting) return { ...base, border: `1px solid ${ACCENT}`, background: ACCENT_DIM }
  return base
}

const S: Record<string, CSSProperties> = {
  card: {
    background: 'var(--app-surface)',
    border: '1px solid var(--app-surface-border)',
    borderRadius: 16,
    padding: '20px 24px 24px',
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
  row: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  field: { display: 'block', marginBottom: 14, flex: '1 1 160px' },
  fieldLabel: {
    display: 'block',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--app-text-secondary)',
    marginBottom: 6,
  },
  fieldWrap: { position: 'relative' },
  pendingPill: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: WARN,
    color: '#1a1205',
    fontSize: 9,
    fontWeight: 700,
    padding: '2px 7px',
    borderRadius: 4,
    pointerEvents: 'none',
    letterSpacing: '.08em',
  },
}
