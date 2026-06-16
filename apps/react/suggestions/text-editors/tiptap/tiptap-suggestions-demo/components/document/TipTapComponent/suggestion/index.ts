// Inline per-edit suggestion engine for the Tiptap body (Google-Docs style).
// Wraps each edit in deletion (strikethrough) + insertion (underline) marks and
// commits each edit cluster as its own Velt suggestion carrying the real diff.
export { SuggestionExtensions } from './core';
export type { SuggestionAuthor, SuggestionKind } from './core';
export { VeltSuggestionBridge } from './velt/VeltSuggestionBridge';
