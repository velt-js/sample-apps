/**
 * Velt Initialize Document Component
 *
 * Vanilla JS port of the React VeltInitializeDocument component.
 * Sets the document context in Velt for collaboration scoping.
 */

import { getVeltClient, setVeltDocument } from '../../lib/velt.js';
import { getCurrentDocument, initializeDocument } from '../../lib/document.js';
import { getUser } from '../../lib/user.js';

/**
 * Initialize the document in Velt
 * This sets up the collaboration scope for all Velt features.
 *
 * @returns {Promise<Object>} - Document info
 */
export async function initializeVeltDocument() {
  const client = getVeltClient();
  if (!client) {
    throw new Error('Velt client not initialized');
  }

  const user = getUser();
  if (!user) {
    throw new Error('User not initialized');
  }

  // Initialize document ID from URL/storage
  const doc = initializeDocument();

  if (!doc.documentId) {
    throw new Error('Document ID not found');
  }

  // Set document in Velt
  await setVeltDocument(doc.documentId, doc.documentName);

  return doc;
}

/**
 * Get current document info
 * @returns {Object} - Document info with documentId and documentName
 */
export { getCurrentDocument, initializeDocument } from '../../lib/document.js';
