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
 * DEMO USAGE:
 * - First visit: Randomly assigns a document (1-10), persists in localStorage
 * - Refresh: Same document (from localStorage)
 * - Explicit: Use ?documentId=3 in URL to force a specific document
 * - Share URL with documentId to collaborate on the same document
 */

// 10 demo documents
const DEMO_DOCUMENTS = [
  { id: "doc-1", name: "Project Roadmap" },
  { id: "doc-2", name: "Design Specs" },
  { id: "doc-3", name: "Meeting Notes" },
  { id: "doc-4", name: "Budget Report" },
  { id: "doc-5", name: "Product Brief" },
  { id: "doc-6", name: "Marketing Plan" },
  { id: "doc-7", name: "Technical Docs" },
  { id: "doc-8", name: "User Research" },
  { id: "doc-9", name: "Sprint Review" },
  { id: "doc-10", name: "Team Updates" },
];

const STORAGE_KEY = 'velt-demo-documentId';

export type CurrentDocument = {
  documentId: string | null;
  documentName: string;
};

/**
 * Get document index from various sources (URL param, localStorage, or random)
 * Returns a 1-based index (1-10)
 */
function getDocumentIndex(): number {
  // 1. Check URL param first (allows explicit document selection)
  const urlParams = new URLSearchParams(window.location.search);
  const urlDocId = urlParams.get('documentId');
  if (urlDocId) {
    const parsed = parseInt(urlDocId, 10);
    if (parsed >= 1 && parsed <= 10) {
      return parsed;
    }
  }

  // 2. Check localStorage for existing document
  const storedId = localStorage.getItem(STORAGE_KEY);
  if (storedId) {
    const parsed = parseInt(storedId, 10);
    if (parsed >= 1 && parsed <= 10) {
      return parsed;
    }
  }

  // 3. Generate random document (1-10)
  return Math.floor(Math.random() * 10) + 1;
}

export function useCurrentDocument(): CurrentDocument {
  const [document, setDocument] = useState<{ id: string; name: string } | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization (React Strict Mode, HMR, etc.)
    if (isInitialized.current) return;
    isInitialized.current = true;

    const docIndex = getDocumentIndex();
    const selectedDoc = DEMO_DOCUMENTS[docIndex - 1];

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, String(docIndex));

    // Update URL for shareability (preserve other params like userId)
    const url = new URL(window.location.href);
    url.searchParams.set('documentId', String(docIndex));
    window.history.replaceState({}, '', url.toString());

    setDocument(selectedDoc);
  }, []);

  return useMemo(
    () => ({
      documentId: document?.id ?? null,
      documentName: document?.name ?? "Loading...",
    }),
    [document]
  );
}

/** Export demo documents for external use if needed */
export { DEMO_DOCUMENTS };
