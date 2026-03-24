/**
 * CodeMirror Component with Velt CRDT
 *
 * Vanilla JS implementation using createCollaboration from @veltdev/codemirror-crdt (v2 API).
 * Supports light and dark themes via CSS class on <html>.
 */

import { createCollaboration } from '@veltdev/codemirror-crdt';
import { yCollab } from 'y-codemirror.next';
import { EditorState, Compartment } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { getTheme, subscribeToTheme } from '../../lib/theme.js';

// Initial content for the editor (TypeScript)
const initialContent = `interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users');
  const data = await response.json();

  return {
    data: data.users,
    status: response.status,
    message: response.ok ? 'Success' : 'Failed to fetch users',
  };
}

function formatUserName(user: User): string {
  return user.name.trim() || 'Anonymous';
}

export { User, ApiResponse, fetchUsers, formatUserName };
`;

/**
 * Build the light theme EditorView.theme extension
 */
function lightEditorTheme() {
  return EditorView.theme({
    '&': {
      height: '100%',
      fontSize: '14px',
      backgroundColor: '#ffffff',
    },
    '.cm-scroller': {
      overflow: 'auto',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    },
    '.cm-content': {
      caretColor: '#24292f',
      padding: '10px 0',
    },
    '.cm-line': {
      padding: '0 8px',
    },
    '.cm-gutters': {
      backgroundColor: '#f6f8fa',
      color: '#656d76',
      border: 'none',
      borderRight: '1px solid #d1d9e0',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#f0f6ff',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(84, 174, 255, 0.08)',
    },
  });
}

/**
 * Build the dark theme EditorView.theme extension (+ oneDark syntax)
 */
function darkEditorTheme() {
  return [
    oneDark,
    EditorView.theme({
      '&': {
        height: '100%',
        fontSize: '14px',
        backgroundColor: '#1e1e1e',
      },
      '.cm-scroller': {
        overflow: 'auto',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      },
      '.cm-content': {
        caretColor: '#fff',
        padding: '10px 0',
      },
      '.cm-line': {
        padding: '0 8px',
      },
      '.cm-gutters': {
        backgroundColor: '#1e1e1e',
        color: '#858585',
        border: 'none',
      },
      '.cm-activeLineGutter': {
        backgroundColor: '#2a2a2a',
      },
      '.cm-activeLine': {
        backgroundColor: '#2a2a2a',
      },
    }),
  ];
}

/**
 * Create loading spinner
 * @returns {HTMLElement} - Loading spinner element
 */
function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'flex items-center justify-center h-full';
  spinner.style.backgroundColor = 'var(--app-filetree-bg)';
  spinner.innerHTML = `
    <div style="color: var(--app-text-primary);">Loading editor...</div>
  `;
  return spinner;
}

/**
 * Create CodeMirror editor with Velt CRDT
 * @param {HTMLElement} container - Container element to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {string} editorId - Unique editor ID
 * @returns {Promise<Object>} - Component API with el and destroy methods
 */
export async function createCodeMirrorEditor(container, veltClient, editorId = 'codemirror-editor-1') {
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'h-full w-full overflow-hidden';

  // Show loading state
  const loadingSpinner = createLoadingSpinner();
  wrapper.appendChild(loadingSpinner);
  container.appendChild(wrapper);

  let view = null;
  let manager = null;
  let themeUnsubscribe = null;

  // Theme compartment for dynamic reconfiguration
  const themeCompartment = new Compartment();

  try {
    // [Velt] Create the CollaborationManager using createCollaboration (v2 API)
    console.log('[CodeMirror] Creating collaboration manager...');
    manager = await createCollaboration({
      editorId: editorId,
      veltClient: veltClient,
      initialContent: initialContent,
      onError: (error) => console.error('[CodeMirror] Collaboration error:', error),
    });

    console.log('[CodeMirror] Collaboration manager created, initializing editor...');

    // Remove loading spinner
    wrapper.removeChild(loadingSpinner);

    // Create editor container
    const editorDiv = document.createElement('div');
    editorDiv.className = 'h-full w-full';
    editorDiv.style.overflow = 'auto';
    wrapper.appendChild(editorDiv);

    // [Velt] Get Yjs primitives from the collaboration manager (v2 API)
    const { ytext, awareness, undoManager } = manager.getCollaborationPrimitives();

    // Determine initial theme
    const { resolvedTheme } = getTheme();
    const initialThemeExtension = resolvedTheme === 'dark' ? darkEditorTheme() : lightEditorTheme();

    // Create editor state
    const startState = EditorState.create({
      doc: ytext?.toString() ?? '',
      extensions: [
        basicSetup,
        themeCompartment.of(initialThemeExtension),
        css(),
        javascript(),
        html(),
        // yCollab enables real-time collaborative editing with CodeMirror using Yjs
        yCollab(ytext, awareness, { undoManager }),
      ],
    });

    // Create editor view
    view = new EditorView({
      state: startState,
      parent: editorDiv,
    });

    console.log('[CodeMirror] Editor initialized successfully');

    // Subscribe to theme changes to reconfigure editor
    themeUnsubscribe = subscribeToTheme(({ resolvedTheme: newResolved }) => {
      if (view) {
        const newThemeExtension = newResolved === 'dark' ? darkEditorTheme() : lightEditorTheme();
        view.dispatch({
          effects: themeCompartment.reconfigure(newThemeExtension),
        });
      }
    });

    // [Velt] Subscribe to status and sync events (v2 API)
    manager.onStatusChange((status) => {
      console.log('[CodeMirror] Connection status:', status);
    });

    manager.onSynced((synced) => {
      console.log('[CodeMirror] Synced:', synced);
    });
  } catch (error) {
    console.error('[CodeMirror] Failed to initialize:', error);

    // Show error state
    wrapper.innerHTML = `
      <div class="flex items-center justify-center h-full" style="background-color: var(--app-filetree-bg);">
        <div class="text-red-400 text-center">
          <p>Failed to load editor</p>
          <p class="text-sm opacity-70">${error.message}</p>
        </div>
      </div>
    `;
  }

  return {
    el: wrapper,
    view,
    manager,
    destroy() {
      if (themeUnsubscribe) {
        themeUnsubscribe();
        themeUnsubscribe = null;
      }
      if (view) {
        view.destroy();
        view = null;
      }
      if (manager) {
        manager.destroy();
        manager = null;
      }
      wrapper.remove();
    },
  };
}

/**
 * Create a deferred CodeMirror editor (waits for Velt to be ready)
 * @param {HTMLElement} container - Container element to mount into
 * @returns {Object} - Component API with initialize method
 */
export function createDeferredCodeMirrorEditor(container) {
  // Create wrapper with loading state
  const wrapper = document.createElement('div');
  wrapper.className = 'h-full w-full overflow-hidden';

  const loadingSpinner = createLoadingSpinner();
  wrapper.appendChild(loadingSpinner);
  container.appendChild(wrapper);

  let editorInstance = null;
  let isDestroyed = false;

  return {
    el: wrapper,
    /**
     * Initialize the editor when Velt is ready
     * @param {Object} veltClient - Velt client instance
     * @param {string} editorId - Unique editor ID
     * @returns {Promise<Object>} - Editor instance
     */
    async initialize(veltClient, editorId = 'codemirror-editor-1') {
      if (isDestroyed) {
        console.warn('[CodeMirror] Cannot initialize destroyed editor');
        return null;
      }

      // Remove loading spinner
      if (loadingSpinner.parentNode === wrapper) {
        wrapper.removeChild(loadingSpinner);
      }

      try {
        editorInstance = await createCodeMirrorEditor(wrapper, veltClient, editorId);
        return editorInstance;
      } catch (error) {
        console.error('[CodeMirror] Failed to initialize:', error);
        wrapper.innerHTML = `
          <div class="flex items-center justify-center h-full">
            <div class="text-red-400 text-center">
              <p>Failed to load editor</p>
              <p class="text-sm opacity-70">${error.message}</p>
            </div>
          </div>
        `;
        return null;
      }
    },
    destroy() {
      isDestroyed = true;
      if (editorInstance && editorInstance.destroy) {
        editorInstance.destroy();
      }
      wrapper.remove();
    },
  };
}
