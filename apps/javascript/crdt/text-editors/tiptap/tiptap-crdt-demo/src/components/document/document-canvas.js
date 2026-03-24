/**
 * Document Canvas Component
 *
 * Vanilla JS port of the React DocumentCanvas component.
 * Main layout container with header, sidebar, and TipTap editor area.
 */

import { createSidebar } from '../sidebar/sidebar.js';
import { createHeader } from '../header/header.js';

/**
 * Create the Document Canvas component
 * @param {HTMLElement} container - Container element to mount into
 * @returns {Object} - Component API with el, editorContainer, and destroy methods
 */
export function createDocumentCanvas(container) {
  // Create root element matching React structure
  const root = document.createElement('div');
  root.className = 'w-full h-screen relative';

  // Create header
  const headerInstance = createHeader(root);

  // Create the main TipTap content area
  const tiptapContainer = document.createElement('div');
  tiptapContainer.className = 'relative size-full overflow-hidden';
  tiptapContainer.style.backgroundColor = 'var(--app-bg)';
  tiptapContainer.setAttribute('data-name', 'Tiptap / Bubble Menu');

  // Create scroll container
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'absolute inset-0 overflow-y-auto pb-20';
  scrollContainer.id = 'tiptap-scroll-container';

  // Create centered content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'flex justify-center pt-[51px] px-4';

  // Create max-width container
  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.className = 'w-full max-w-[850px]';

  // Create the document card
  const documentCard = document.createElement('div');
  documentCard.className = 'border border-solid rounded-[16px] p-[42px_56px_64px_56px] min-h-[880px]';
  documentCard.style.backgroundColor = 'var(--app-surface)';
  documentCard.style.borderColor = 'var(--app-surface-border)';

  // Create editor content wrapper
  const editorWrapper = document.createElement('div');
  editorWrapper.className = 'w-full max-w-[738px]';

  // Create the editor container where TipTap will be mounted
  const editorContainer = document.createElement('div');
  editorContainer.id = 'tiptap-editor-container';
  editorContainer.className = 'tiptap-editor-content prose prose-invert max-w-none';

  // Assemble the structure
  editorWrapper.appendChild(editorContainer);
  documentCard.appendChild(editorWrapper);
  maxWidthContainer.appendChild(documentCard);
  contentWrapper.appendChild(maxWidthContainer);
  scrollContainer.appendChild(contentWrapper);
  tiptapContainer.appendChild(scrollContainer);

  root.appendChild(tiptapContainer);

  // Create sidebar wrapper (positioned absolutely)
  const sidebarWrapper = document.createElement('div');
  sidebarWrapper.className = 'absolute top-0 left-0 z-10';
  root.appendChild(sidebarWrapper);

  // Scroll to heading function
  const scrollToHeading = (headingText) => {
    const headings = scrollContainer.querySelectorAll('[data-heading]');
    const targetHeading = Array.from(headings).find(
      (heading) => heading.textContent?.toLowerCase().trim() === headingText.toLowerCase().trim()
    );

    if (targetHeading) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const headingRect = targetHeading.getBoundingClientRect();
      const scrollTop = headingRect.top - containerRect.top + scrollContainer.scrollTop;

      scrollContainer.scrollTo({
        top: scrollTop - 50,
        behavior: 'smooth'
      });
    }
  };

  // Create sidebar with scroll callback
  const sidebarInstance = createSidebar(sidebarWrapper, {
    onScrollToHeading: scrollToHeading,
  });

  container.appendChild(root);

  return {
    el: root,
    editorContainer,
    scrollContainer,
    header: headerInstance,
    sidebar: sidebarInstance,
    destroy() {
      headerInstance.destroy();
      sidebarInstance.destroy();
      root.remove();
    },
  };
}
