'use client';
import { useMemo, useEffect, useState, useRef } from 'react';

// [Velt] Minimal hard-coded current document hook
export type CurrentDocument = {
  documentId: string;
  documentName: string;
};

export function useCurrentDocument(): CurrentDocument {
  const [documentId, setDocumentId] = useState<string>('');
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization (React Strict Mode, HMR, etc.)
    if (isInitialized.current) return;

    // 1. Check URL for documentId parameter first
    const urlParams = new URLSearchParams(window.location.search);
    let docId = urlParams.get('documentId');

    if (docId) {
      // Use document ID from URL (shareable link)
      setDocumentId(docId);
      localStorage.setItem('tiptap-document-id', docId);
    } else {
      // 2. Check localStorage for existing document
      const stored = localStorage.getItem('tiptap-document-id');
      if (stored) {
        docId = stored;
      } else {
        // 3. Generate new document ID
        docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('tiptap-document-id', docId);
      }

      // Update URL with document ID for shareability
      const newUrl = `${window.location.pathname}?documentId=${docId}`;
      window.history.pushState({}, '', newUrl);

      setDocumentId(docId);
    }

    isInitialized.current = true;
  }, []);

  // Listen for URL changes (e.g., when user manually changes the URL)
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const docId = urlParams.get('documentId');

      if (docId && docId !== documentId) {
        console.log('[DocumentContext] URL changed, loading document:', docId);
        setDocumentId(docId);
        localStorage.setItem('tiptap-document-id', docId);
      }
    };

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleUrlChange);

    // Also check on interval for manual URL edits (not ideal but works)
    const interval = setInterval(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const docId = urlParams.get('documentId');
      if (docId && docId !== documentId) {
        handleUrlChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      clearInterval(interval);
    };
  }, [documentId]);
  
  return useMemo(
    () => ({
      documentId: documentId || 'loading',
      documentName: "TipTap Document",
    }),
    [documentId]
  );
}
