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

// [Velt] Minimal hard-coded current document hook
export type CurrentDocument = {
  documentId: string | null;
  documentName: string;
};

export function useCurrentDocument(): CurrentDocument {
  const [documentId, setDocumentId] = useState<string | null>(null);
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
      localStorage.setItem('velt-demo-document-id', docId);
    } else {
      // 2. Check localStorage for existing document
      const stored = localStorage.getItem('velt-demo-document-id');
      if (stored) {
        docId = stored;
      } else {
        // 3. Generate new document ID
        docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('velt-demo-document-id', docId);
      }

      // Update URL with document ID for shareability
      const newUrl = `${window.location.pathname}?documentId=${docId}`;
      window.history.replaceState({}, '', newUrl);

      setDocumentId(docId);
    }

    isInitialized.current = true;
  }, []);

  return useMemo(
    () => ({
      documentId: documentId,
      documentName: "My Document",
    }),
    [documentId]
  );
}
