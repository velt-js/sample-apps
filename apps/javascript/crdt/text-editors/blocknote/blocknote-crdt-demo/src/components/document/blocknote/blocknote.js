/**
 * BlockNote Editor Component with Velt CRDT
 *
 * Vanilla JS implementation using createCollaboration from @veltdev/blocknote-crdt (v2 API)
 * for real-time collaborative block editing.
 */

import { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { createCollaboration } from '@veltdev/blocknote-crdt';
import { blockNoteInitialContent } from './constants.js';
import { getResolvedTheme, subscribeToTheme } from '../../../lib/theme.js';

/**
 * Create loading spinner element
 * @returns {HTMLElement}
 */
function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'flex items-center justify-center h-full';
  spinner.style.color = 'var(--app-text-tertiary)';
  spinner.innerHTML = `
    <div class="text-center">
      <div class="mb-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto"></div>
      </div>
      <p>Loading editor...</p>
    </div>
  `;
  return spinner;
}

/**
 * Create status indicator element
 * @returns {Object} - { el, update }
 */
function createStatusIndicator() {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center gap-1.5 px-4 pt-2';

  const dot = document.createElement('span');
  dot.className = 'inline-block rounded-full shrink-0';
  Object.assign(dot.style, { width: '8px', height: '8px', backgroundColor: '#eab308' });

  const label = document.createElement('span');
  label.className = 'text-xs';
  label.style.color = 'var(--app-text-tertiary)';
  label.textContent = 'Connecting\u2026';

  wrapper.appendChild(dot);
  wrapper.appendChild(label);

  return {
    el: wrapper,
    update(status, synced) {
      if (status === 'connected') {
        dot.style.backgroundColor = synced ? '#22c55e' : '#eab308';
        label.textContent = synced ? 'Synced' : 'Syncing\u2026';
      } else if (status === 'connecting') {
        dot.style.backgroundColor = '#eab308';
        label.textContent = 'Connecting\u2026';
      } else {
        dot.style.backgroundColor = '#ef4444';
        label.textContent = 'Disconnected';
      }
    },
  };
}

/**
 * Create BlockNote editor with Velt CRDT
 * @param {HTMLElement} container - Container element to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {string} editorId - Unique editor ID
 * @returns {Promise<Object>} - Component API with editor, manager, and destroy methods
 */
export async function createBlockNoteEditor(container, veltClient, editorId) {
  // Create editor container structure
  const editorContainerEl = document.createElement('div');
  editorContainerEl.className = 'editor-container';

  // Show loading state
  const loadingSpinner = createLoadingSpinner();
  const editorContent = document.createElement('div');
  editorContent.className = 'editor-content';
  editorContent.appendChild(loadingSpinner);
  editorContainerEl.appendChild(editorContent);
  container.appendChild(editorContainerEl);

  let editor = null;
  let manager = null;
  let statusIndicator = null;
  let themeUnsubscribe = null;

  try {
    // [Velt] Create the CollaborationManager using createCollaboration (v2 API)
    console.log('[BlockNote] Creating collaboration manager...');
    manager = await createCollaboration({
      editorId: editorId,
      veltClient: veltClient,
      initialContent: blockNoteInitialContent,
      onError: (error) => console.error('[BlockNote] Collaboration error:', error),
    });

    console.log('[BlockNote] Collaboration manager created, initializing editor...');

    // Get collaboration config for BlockNote
    const collabConfig = manager.getCollaborationConfig();

    // Create BlockNote editor with collaboration
    editor = BlockNoteEditor.create({
      collaboration: collabConfig,
    });

    // Remove loading spinner and rebuild layout
    editorContent.removeChild(loadingSpinner);

    // Add status indicator before editor content
    statusIndicator = createStatusIndicator();
    editorContainerEl.insertBefore(statusIndicator.el, editorContent);

    // Create mount point for BlockNote
    const mountPoint = document.createElement('div');
    mountPoint.className = 'w-full h-full';
    editorContent.appendChild(mountPoint);

    // Mount editor to DOM
    editor.mount(mountPoint);

    // [Velt] Subscribe to status and sync events (v2 API)
    statusIndicator.update(manager.status, manager.synced);

    manager.onStatusChange((status) => {
      console.log('[BlockNote] Connection status:', status);
      statusIndicator.update(status, manager.synced);
    });

    manager.onSynced((synced) => {
      console.log('[BlockNote] Synced:', synced);
      statusIndicator.update(manager.status, synced);
    });

    // Theme: BlockNote dark mode is handled via CSS (.dark .bn-editor selectors in globals.css)
    // We also set the data-color-scheme attribute on the BlockNote container
    themeUnsubscribe = subscribeToTheme((resolved) => {
      const bnContainer = mountPoint.querySelector('.bn-container');
      if (bnContainer) {
        bnContainer.setAttribute('data-color-scheme', resolved);
      }
    });

    console.log('[BlockNote] Editor initialized successfully');

  } catch (error) {
    console.error('[BlockNote] Failed to initialize:', error);

    // Show error state
    editorContainerEl.innerHTML = '';
    statusIndicator = createStatusIndicator();
    statusIndicator.update('disconnected', false);
    editorContainerEl.appendChild(statusIndicator.el);

    // Update status to show error
    const dot = statusIndicator.el.querySelector('span');
    if (dot) dot.style.backgroundColor = '#ef4444';
    const label = statusIndicator.el.querySelectorAll('span')[1];
    if (label) {
      label.style.color = '#ef4444';
      label.textContent = `Failed to initialize: ${error.message}`;
    }
  }

  return {
    editor,
    manager,
    destroy() {
      if (themeUnsubscribe) {
        themeUnsubscribe();
        themeUnsubscribe = null;
      }
      if (editor) {
        editor.mount(null);
        editor = null;
      }
      if (manager) {
        manager.destroy();
        manager = null;
      }
      editorContainerEl.remove();
    },
  };
}
