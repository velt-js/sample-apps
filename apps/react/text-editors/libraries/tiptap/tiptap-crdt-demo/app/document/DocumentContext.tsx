'use client';
import { useMemo, useEffect, useState, useRef } from 'react';

/**
 * ⚠️ IMPORTANT DISCLAIMER FOR DEVELOPERS ⚠️
 *
 * This documentId logic using URL parameters is ONLY for demo sharing purposes.
 * It allows users to share a link to a specific document in this demo app.
 *
 * IN YOUR REAL APPLICATION:
 * - Use your own document ID system (e.g., from your database, CMS, or file system)
 * - You do NOT need to use URLs as document IDs
 * - You do NOT need to store document IDs in localStorage or URL params
 * - Simply pass your existing document identifier to Velt
 *
 * Examples of real-world document IDs:
 * - Database record ID: "user-doc-12345"
 * - File path: "/projects/my-project/document.txt"
 * - UUID: "550e8400-e29b-41d4-a716-446655440000"
 * - Any unique identifier from your system
 *
 * The URL-based approach here is purely for convenience in this demo environment
 * to enable sharing and collaboration testing. Do not feel obligated to replicate
 * this pattern in your production application.
 */

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
