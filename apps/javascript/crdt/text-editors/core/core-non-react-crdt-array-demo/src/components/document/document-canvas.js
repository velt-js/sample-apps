/**
 * Document Canvas Component
 *
 * Layout: full-screen with Header (top-right) and TaskListEditor (full area).
 * The task list editor includes its own sidebar, so no separate sidebar
 * component is mounted here (unlike the text CRDT demo which has a
 * document-level Table of Contents sidebar).
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

  // Editor container — TaskListEditor mounts here
  const editorContainer = document.createElement('div');
  editorContainer.style.cssText = 'position:relative;width:100%;height:100%;overflow:hidden;';
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
