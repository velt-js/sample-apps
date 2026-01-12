/**
 * Document Management Module
 *
 * This documentId logic using URL parameters is ONLY for demo sharing purposes.
 * It allows users to share a link to a specific document in this demo app.
 *
 * IN YOUR REAL APPLICATION:
 * - Use your own document ID system (e.g., from your database, CMS, or file system)
 * - You do NOT need to use URLs as document IDs
 * - Simply pass your existing document identifier to Velt
 */

const STORAGE_KEY = 'tiptap-crdt-document-id';

let documentId = null;
let isInitialized = false;

/**
 * Get current document info
 * @returns {Object} - Document object with id and name
 */
export function getCurrentDocument() {
  return {
    documentId: documentId,
    documentName: 'My Document',
  };
}

/**
 * Initialize document from URL or storage
 * @returns {Object} - Document object
 */
export function initializeDocument() {
  // Prevent double initialization
  if (isInitialized) {
    return getCurrentDocument();
  }

  // 1. Check URL for documentId parameter first
  const urlParams = new URLSearchParams(window.location.search);
  let docId = urlParams.get('documentId');

  if (docId) {
    // Use document ID from URL (shareable link)
    documentId = docId;
    localStorage.setItem(STORAGE_KEY, docId);
  } else {
    // 2. Check localStorage for existing document
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      docId = stored;
    } else {
      // 3. Generate new document ID
      docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(STORAGE_KEY, docId);
    }

    // Update URL with document ID for shareability
    const newUrl = `${window.location.pathname}?documentId=${docId}`;
    window.history.pushState({}, '', newUrl);

    documentId = docId;
  }

  isInitialized = true;
  return getCurrentDocument();
}

/**
 * Get the document ID
 * @returns {string|null} - Document ID
 */
export function getDocumentId() {
  return documentId;
}
