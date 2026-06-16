// Shared model for the "proposal document" metadata fields that act as
// Velt Suggestion targets. Each field is tagged with
// `data-velt-suggestion-target="<targetId>"` so the Suggestions SDK can
// capture before/after values when suggestion mode is on.

export type Proposal = {
  title: string
  status: string
  category: string
  publishDate: string
}

// Stable, app-owned target ids — reused as the React state keys (NOT random
// UUIDs, which would change across re-renders and break matching).
// `body` is the TipTap editor itself (registered via a getter in
// TipTapComponent), so the whole rich-text body can be proposed too.
export const TARGET = {
  title: 'proposal.title',
  status: 'proposal.status',
  category: 'proposal.category',
  publishDate: 'proposal.publishDate',
  body: 'proposal.body',
} as const

export const FIELD_LABEL: Record<string, string> = {
  [TARGET.title]: 'Title',
  [TARGET.status]: 'Status',
  [TARGET.category]: 'Category',
  [TARGET.publishDate]: 'Publish date',
  [TARGET.body]: 'Article body',
}

export const STATUS_OPTIONS = ['Draft', 'In Review', 'Approved', 'Published']
export const CATEGORY_OPTIONS = ['Engineering', 'Product', 'Design', 'Marketing', 'Company']

export const INITIAL_PROPOSAL: Proposal = {
  title: 'Building Real-Time Collaboration with Velt',
  status: 'Draft',
  category: 'Engineering',
  publishDate: '2026-07-01',
}

// Maps a Velt suggestion target onto the matching field of local state.
// Centralizing the switch lets the approve / reject handlers share it — they
// only differ in which value (newValue vs oldValue) they pass in.
export function writeProposalField(
  prev: Proposal,
  targetId: string,
  value: unknown,
): Proposal {
  switch (targetId) {
    case TARGET.title:
      return { ...prev, title: String(value) }
    case TARGET.status:
      return { ...prev, status: String(value) }
    case TARGET.category:
      return { ...prev, category: String(value) }
    case TARGET.publishDate:
      return { ...prev, publishDate: String(value) }
    default:
      return prev
  }
}
