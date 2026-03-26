/**
 * Document Canvas Component
 *
 * Layout: full-screen with Header (top-right) and MapStoreEditor (full area).
 * The map demo includes a sidebar within the editor itself (MapStoreSidebar),
 * so no external sidebar is mounted here — unlike the text demo which has a
 * separate Table of Contents sidebar overlay.
 */

import { createHeader } from '../header/header.js';

/**
 * Create the document canvas layout
 * @param {HTMLElement} container - Container to append to
 * @returns {Object} - Component API with editorContainer
 */
export function createDocumentCanvas(container) {
  const root = document.createElement('div');
  root.className = 'w-full h-screen relative';

  // Header (absolute top-right)
  const headerInstance = createHeader(root);

  // Editor area — the MapStoreEditor mounts into editorContainer later
  const editorContainer = document.createElement('div');
  editorContainer.className = 'relative size-full overflow-hidden';
  editorContainer.style.backgroundColor = 'var(--app-bg)';
  root.appendChild(editorContainer);

  container.appendChild(root);

  return {
    el: root,
    editorContainer,
    destroy() {
      if (headerInstance && headerInstance.destroy) headerInstance.destroy();
      root.remove();
    },
  };
}
