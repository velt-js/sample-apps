'use client';
import { useEffect, useRef } from 'react';
import { useSetDocuments, useVeltClient } from '@veltdev/react';
import { useCurrentDocument } from '@/app/document/useCurrentDocument';
import { useAppUser } from '@/app/userAuth/useAppUser';

export default function VeltInitializeDocument() {
  const { documentId, documentName } = useCurrentDocument();
  const { user } = useAppUser();
  const { client } = useVeltClient();

  const { setDocuments } = useSetDocuments();
  const lastDocumentIdRef = useRef<string | null>(null);
  const initializationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // [Velt] Set document in Velt. This is the resource where all Velt collaboration data will be scoped.
  useEffect(() => {
    // Don't set document if user is not logged in or if documentId is not ready
    if (!user || !documentId || !documentName || !client) return;

    // Only set document if it's different from the last one (prevents unnecessary re-initialization)
    if (lastDocumentIdRef.current === documentId) return;

    // Clear any pending initialization
    if (initializationTimeoutRef.current) {
      clearTimeout(initializationTimeoutRef.current);
    }

    // Add a small delay to ensure Velt's UserConfig is fully initialized
    initializationTimeoutRef.current = setTimeout(() => {
      console.log('[Velt] Setting document:', documentId);

      setDocuments([
        { id: documentId, metadata: { documentName: documentName || 'Untitled' } },
      ]);

      lastDocumentIdRef.current = documentId;
    }, 100); // 100ms delay to allow Velt internal initialization

    return () => {
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current);
      }
    };
  }, [user, client, setDocuments, documentId, documentName]);

  return null;
}
