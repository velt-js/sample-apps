'use client';
import { useMemo } from 'react';

// [Velt] Minimal hard-coded current document hook
export type CurrentDocument = {
  documentId: string;
  documentName: string;
};

export function useCurrentDocument(): CurrentDocument {
  // [Velt] Demo values — change as needed
  return useMemo(
    () => ({
      documentId: "general-document-1",
      documentName: "General Document",
    }),
    []
  );
}

