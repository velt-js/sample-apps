"use client";
import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react';
import { useCurrentDocument } from '@/app/document/useCurrentDocument';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();

  // [Velt] Get document setter hook
  const { setDocuments } = useSetDocuments();

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    if (!documentId || !documentName) return;
    console.log("Setting document", documentId, documentName);

    setDocuments([
      { id: documentId, metadata: { documentName: documentName } },
    ]);
  }, [setDocuments, documentId, documentName]);

  return null;
}
