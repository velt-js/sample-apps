'use client';
import { useMemo, useEffect, useState, useRef } from 'react';

export type CurrentDocument = {
  documentId: string | null;
  documentName: string;
};

export function useCurrentDocument(): CurrentDocument {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    let docId = urlParams.get('documentId');

    if (docId) {
      setDocumentId(docId);
      localStorage.setItem('tiptap-document-id', docId);
    } else {
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

    window.addEventListener('popstate', handleUrlChange);

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
      documentName: "Tiptap Editor",
    }),
    [documentId]
  );
}
