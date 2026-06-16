'use client'

import {
  useEnableSuggestionMode,
  useDisableSuggestionMode,
  useSuggestionModeState,
} from '@veltdev/react'
import type { TargetEditDetails } from '@veltdev/types'
import { FIELD_LABEL, TARGET } from './types'

/**
 * Header toggle that flips between normal editing and suggestion mode.
 *
 * When enabled we pass `onTargetEditCommit`, so the SDK auto-creates a pending
 * Suggestion as soon as an edit to a tagged field is committed (blur for text /
 * date, change for select), using the summary we return here.
 */
export default function SuggestionModeToggle() {
  const suggesting = useSuggestionModeState() ?? false
  const { enableSuggestionMode } = useEnableSuggestionMode()
  const { disableSuggestionMode } = useDisableSuggestionMode()

  const onTargetEditCommit = ({ targetId, oldValue, newValue }: TargetEditDetails) => {
    // The body's values are HTML strings — show a friendly summary instead of
    // dumping markup into the diff.
    if (targetId === TARGET.body) {
      return { summary: 'Proposed an edit to the article body' }
    }
    return {
      summary: `${FIELD_LABEL[targetId] ?? targetId}: "${String(oldValue)}" → "${String(newValue)}"`,
    }
  }

  const toggle = () => {
    if (suggesting) disableSuggestionMode()
    else enableSuggestionMode({ onTargetEditCommit })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={
        suggesting
          ? 'Edits to the fields are captured as suggestions'
          : 'Turn on suggestion mode to propose changes'
      }
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        height: 28,
        padding: '0 12px',
        borderRadius: 999,
        border: `1px solid ${suggesting ? '#6366f1' : 'var(--app-surface-border)'}`,
        background: suggesting ? 'rgba(99,102,241,0.14)' : 'var(--app-bg)',
        color: suggesting ? '#6366f1' : 'var(--app-text-secondary)',
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all .15s',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: suggesting ? '#6366f1' : 'var(--app-text-tertiary)',
        }}
      />
      {suggesting ? 'Suggesting' : 'Editing'}
    </button>
  )
}
