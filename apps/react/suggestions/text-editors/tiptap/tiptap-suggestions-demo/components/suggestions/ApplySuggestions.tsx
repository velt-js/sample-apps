'use client'

import { useEffect } from 'react'
import { useSuggestionEventCallback } from '@veltdev/react'
import { useProposal } from './ProposalContext'

/**
 * Renderless. The SDK never mutates your data for you — it captures intent and
 * orchestrates review; applying the change is your code's job. Here we listen
 * for the approve / reject outcomes and write the proposal fields accordingly:
 *   - approved → write `newValue`
 *   - rejected → revert to `oldValue`
 */
export default function ApplySuggestions() {
  const { writeField } = useProposal()

  const approved = useSuggestionEventCallback('suggestionApproved')
  const rejected = useSuggestionEventCallback('suggestionRejected')

  useEffect(() => {
    const s = approved?.suggestion
    if (!s) return
    writeField(s.targetId, s.newValue)
  }, [approved, writeField])

  useEffect(() => {
    const s = rejected?.suggestion
    if (!s) return
    writeField(s.targetId, s.oldValue)
  }, [rejected, writeField])

  return null
}
