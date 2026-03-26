/**
 * Document Canvas Component
 *
 * Layout: full-screen with Header (top-right), CoreEditor (full area), Sidebar (top-left overlay).
 */

import { createHeader } from '../header/header.js';
import { createSidebar } from '../sidebar/sidebar.js';

/**
 * Create the document canvas layout
 * @param {HTMLElement} container - Container to append to
 * @returns {Object} - Component API with editorContainer, scrollContainerRef
 */
export function createDocumentCanvas(container) {
  const root = document.createElement('div');
  root.className = 'w-full h-screen relative';

  // Header (absolute top-right)
  const headerInstance = createHeader(root);

  // Editor area — the scroll container and editor mount point are created here
  // but the actual CoreEditor mounts into editorContainer later
  const editorContainer = document.createElement('div');
  editorContainer.className = 'relative size-full overflow-hidden';
  editorContainer.style.backgroundColor = 'var(--app-bg)';
  root.appendChild(editorContainer);

  // Scroll container ref (for sidebar scroll-to-heading)
  let scrollContainer = null;

  // Sidebar (absolute overlay)
  const sidebarWrapper = document.createElement('div');
  sidebarWrapper.className = 'absolute top-0 left-0 z-10';
  root.appendChild(sidebarWrapper);

  const sidebarInstance = createSidebar(sidebarWrapper, {
    onScrollToHeading: (headingText) => {
      if (!scrollContainer) return;
      // Search for heading text in the textarea content by finding it in the scroll area
      // The core editor renders a textarea, not headings — we'll search the scroll container
      // for any data-heading elements or fall back to text search
      const headings = scrollContainer.querySelectorAll('[data-heading]');
      const target = Array.from(headings).find(
        (h) => h.textContent?.toLowerCase().trim() === headingText.toLowerCase().trim()
      );
      if (target) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const headingRect = target.getBoundingClientRect();
        const scrollTop = headingRect.top - containerRect.top + scrollContainer.scrollTop;
        scrollContainer.scrollTo({ top: scrollTop - 50, behavior: 'smooth' });
      }
    },
  });

  container.appendChild(root);

  return {
    el: root,
    editorContainer,
    setScrollContainer(el) {
      scrollContainer = el;
    },
    destroy() {
      if (headerInstance && headerInstance.destroy) headerInstance.destroy();
      if (sidebarInstance && sidebarInstance.destroy) sidebarInstance.destroy();
      root.remove();
    },
  };
}
