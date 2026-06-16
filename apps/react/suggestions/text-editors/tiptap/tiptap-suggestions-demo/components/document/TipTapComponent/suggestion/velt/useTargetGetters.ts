import { useEffect, useRef } from 'react';
import { useRegisterTarget, useUnregisterTarget } from '@veltdev/react';
import type { Editor } from '@tiptap/react';
import {
  deletionTextById,
  formatOpById,
  insertionTextById,
  listCommittedSuggestionIds,
  wrappingTextById,
} from '../core';

export function useTargetGetters(editor: Editor | null) {
  const { registerTarget } = useRegisterTarget();
  const { unregisterTarget } = useUnregisterTarget();
  const registeredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!editor) return undefined;

    const syncRegistry = () => {
      const ids = listCommittedSuggestionIds(editor.state.doc);
      for (const id of ids) {
        if (registeredRef.current.has(id)) continue;
        registerTarget({
          targetId: id,
          getter: () => {
            const formatOp = formatOpById(editor.state.doc, id);
            if (formatOp) {
              const text = wrappingTextById(editor.state.doc, id);
              return text || undefined;
            }
            const oldText = deletionTextById(editor.state.doc, id);
            const newText = insertionTextById(editor.state.doc, id);
            // No marks at all → target unresolvable → stale on approve.
            if (!oldText && !newText) return undefined;
            // Return the before-state. Empty string for pure insertion
            // matches the suggestion's recorded oldValue (drift detection).
            return oldText;
          },
        });
        registeredRef.current.add(id);
      }
    };

    syncRegistry();
    editor.on('update', syncRegistry);

    return () => {
      editor.off('update', syncRegistry);
      for (const id of registeredRef.current) unregisterTarget(id);
      registeredRef.current.clear();
    };
  }, [editor, registerTarget, unregisterTarget]);
}
