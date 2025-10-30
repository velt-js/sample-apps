'use client';
import { useMemo, useEffect, useState, useRef } from 'react';

export type CurrentDocument = {
  documentId: string;
  documentName: string;
};

export function useCurrentDocument(): CurrentDocument {
  // Initialize documentId synchronously on first render to avoid timing issues
  const [documentId, setDocumentId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';

    const urlParams = new URLSearchParams(window.location.search);
    const urlDocId = urlParams.get('documentId');

    if (urlDocId) {
      localStorage.setItem('tiptap-document-id', urlDocId);
      return urlDocId;
    }

    const stored = localStorage.getItem('tiptap-document-id');
    return stored || '';
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    let docId = urlParams.get('documentId');

    if (docId) {
      // URL has documentId - use it
      setDocumentId(docId);
      localStorage.setItem('tiptap-document-id', docId);
    } else {
      // No URL documentId - check localStorage or create new
      const stored = localStorage.getItem('tiptap-document-id');
      if (stored) {
        docId = stored;
      } else {
        docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('tiptap-document-id', docId);
      }

      const newUrl = `${window.location.pathname}?documentId=${docId}`;
      window.history.pushState({}, '', newUrl);

      setDocumentId(docId);
    }

    isInitialized.current = true;
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const docId = urlParams.get('documentId');

      if (docId && docId !== documentId) {
        setDocumentId(docId);
        localStorage.setItem('tiptap-document-id', docId);
      }
    };

    // Listen for browser back/forward navigation
    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [documentId]);

  return useMemo(
    () => ({
      documentId: documentId, // Return actual documentId, no 'loading' fallback
      documentName: "TipTap Document",
    }),
    [documentId]
  );
}
