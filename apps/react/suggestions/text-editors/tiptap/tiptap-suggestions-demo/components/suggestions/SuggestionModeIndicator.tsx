'use client'

import { useEffect } from 'react'
import { useEnableSuggestionMode, useVeltClient } from '@veltdev/react'
import type { TargetEditDetails } from '@veltdev/types'
import { FIELD_LABEL } from './types'

/**
 * This demo runs in suggestion mode only — there is no "editing" mode. We
 * enable suggestion mode as soon as the Velt client is ready and keep it on, so
 * every edit to a tagged field becomes a proposed change. (The article body is
 * handled separately by the inline Tiptap suggestion engine.) The badge is
 * purely informational (not a toggle).
 */
export default function SuggestionModeIndicator() {
  const { client } = useVeltClient()
  const { enableSuggestionMode } = useEnableSuggestionMode()

  useEffect(() => {
    if (!client) return
    enableSuggestionMode({
      onTargetEditCommit: ({ targetId, oldValue, newValue }: TargetEditDetails) => {
        return {
          summary: `${FIELD_LABEL[targetId] ?? targetId}: "${String(oldValue)}" → "${String(newValue)}"`,
        }
      },
    })
  }, [client, enableSuggestionMode])

  return (
    <span
      title="Every edit is captured as a suggestion"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        height: 28,
        padding: '0 12px',
        borderRadius: 999,
        border: '1px solid #6366f1',
        background: 'rgba(99,102,241,0.14)',
        color: '#6366f1',
        fontSize: 12,
        fontWeight: 600,
        userSelect: 'none',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 999, background: '#6366f1' }} />
      Suggesting
    </span>
  )
}
