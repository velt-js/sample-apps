'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { Proposal, INITIAL_PROPOSAL, writeProposalField } from './types'

type ProposalContextValue = {
  proposal: Proposal
  // Idempotent setter: always sets the field to `value` (never increments),
  // so it's safe to run repeatedly across reconnects / multiple tabs — the
  // contract Velt's suggestionApproved handler expects.
  writeField: (targetId: string, value: unknown) => void
}

const ProposalContext = createContext<ProposalContextValue | undefined>(undefined)

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [proposal, setProposal] = useState<Proposal>(INITIAL_PROPOSAL)

  const writeField = useCallback((targetId: string, value: unknown) => {
    setProposal((prev) => writeProposalField(prev, targetId, value))
  }, [])

  return (
    <ProposalContext.Provider value={{ proposal, writeField }}>
      {children}
    </ProposalContext.Provider>
  )
}

export function useProposal(): ProposalContextValue {
  const ctx = useContext(ProposalContext)
  if (!ctx) {
    throw new Error('useProposal must be used within a ProposalProvider')
  }
  return ctx
}
