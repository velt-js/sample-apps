/**
 * Document Canvas Component
 *
 * Layout: full-screen with Header (top-right) and editor area (full).
 */

import { createHeader } from '../header/header.js';

/**
 * Create the document canvas layout
 * @param {HTMLElement} container - Container to append to
 * @returns {Object} - Component API with editorContainer and destroy
 */
export function createDocumentCanvas(container) {
  const root = document.createElement('div');
  root.className = 'w-full h-screen relative';

  // Header (absolute top-right)
  const headerInstance = createHeader(root);

  // Editor area — the mind map editor mounts into editorContainer later
  const editorContainer = document.createElement('div');
  editorContainer.style.cssText = 'position: relative; width: 100%; height: 100%; overflow: hidden;';
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
