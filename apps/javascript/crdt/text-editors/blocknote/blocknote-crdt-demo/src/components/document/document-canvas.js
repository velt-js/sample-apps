/**
 * Document Canvas Component
 *
 * Vanilla JS port of the React DocumentCanvas component.
 * Main layout wrapper with Header, Sidebar, and Editor area.
 */

import { createHeader } from '../header/header.js';
import { createSidebar } from '../sidebar/sidebar.js';

/**
 * Create the document canvas layout
 * @param {HTMLElement} container - Container element to append to
 * @returns {Object} - Component API with editorContainer, el, and destroy methods
 */
export function createDocumentCanvas(container) {
  // Root: flex column, full size
  const root = document.createElement('div');
  root.className = 'flex flex-col w-full h-full';

  // Header
  const headerInstance = createHeader(root);

  // Content area: flex row
  const content = document.createElement('div');
  content.className = 'flex flex-1 overflow-hidden';

  // Sidebar
  const sidebarInstance = createSidebar(content);

  // Editor wrapper
  const editorWrapper = document.createElement('div');
  editorWrapper.className = 'flex-1 overflow-hidden';

  const editorContainer = document.createElement('div');
  editorContainer.className = 'w-full h-full relative';
  editorWrapper.appendChild(editorContainer);

  content.appendChild(editorWrapper);
  root.appendChild(content);
  container.appendChild(root);

  return {
    el: root,
    editorContainer,
    destroy() {
      if (headerInstance && headerInstance.destroy) headerInstance.destroy();
      if (sidebarInstance && sidebarInstance.destroy) sidebarInstance.destroy();
      root.remove();
    },
  };
}
