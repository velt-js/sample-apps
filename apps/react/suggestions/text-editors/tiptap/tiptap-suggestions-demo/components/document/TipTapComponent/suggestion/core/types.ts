export type SuggestionKind =
  | 'replacement'
  | 'insertion'
  | 'deletion'
  | 'format-add'
  | 'format-remove'
  | 'pending';

export interface FormatOp {
  markName: string;
  attrs: Record<string, unknown>;
  op: 'add' | 'remove';
}

export interface SuggestionMarkAttrs {
  pendingId: string;
  suggestionId: string | null;
  targetId: string | null;
  kind: SuggestionKind;
  oldValue: string;
  newValue: string;
  formatOp: FormatOp | null;
  userId: string | null;
  userName: string | null;
  color: string;
  timestamp: number;
}

export interface SuggestionAuthor {
  userId: string;
  name: string;
  color: string;
}
