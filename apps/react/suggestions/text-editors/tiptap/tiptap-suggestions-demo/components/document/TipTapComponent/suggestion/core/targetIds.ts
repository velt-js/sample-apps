export const TARGET_ID_PREFIX = 'velt-tiptap';

export function newSuggestionId(): string {
  const rand =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `${TARGET_ID_PREFIX}:${rand}`;
}
