/**
 * Document Management Module
 */

const STORAGE_KEY = 'core-map-crdt-document-id';

let documentId = null;
let isInitialized = false;

export function getCurrentDocument() {
  return { documentId, documentName: 'My Document' };
}

export function initializeDocument() {
  if (isInitialized) return getCurrentDocument();

  const urlParams = new URLSearchParams(window.location.search);
  let docId = urlParams.get('documentId');

  if (docId) {
    documentId = docId;
    localStorage.setItem(STORAGE_KEY, docId);
  } else {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      docId = stored;
    } else {
      docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(STORAGE_KEY, docId);
    }
    const newUrl = `${window.location.pathname}?documentId=${docId}`;
    window.history.pushState({}, '', newUrl);
    documentId = docId;
  }

  isInitialized = true;
  return getCurrentDocument();
}

export function getDocumentId() { return documentId; }
