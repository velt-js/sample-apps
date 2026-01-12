/**
 * CodeMirror Component with Velt CRDT
 *
 * Vanilla JS port using createVeltCodeMirrorStore from @veltdev/codemirror-crdt.
 */

import { createVeltCodeMirrorStore } from '@veltdev/codemirror-crdt';
import { yCollab } from 'y-codemirror.next';
import { EditorState } from '@codemirror/state';
import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

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
 * Create loading spinner
 * @returns {HTMLElement} - Loading spinner element
 */
function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'flex items-center justify-center h-full bg-[#1e1e1e]';
  spinner.innerHTML = `
    <div class="text-white">Loading editor...</div>
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
  wrapper.className = 'h-full w-full overflow-hidden bg-[#1e1e1e]';

  // Show loading state
  const loadingSpinner = createLoadingSpinner();
  wrapper.appendChild(loadingSpinner);
  container.appendChild(wrapper);

  let view = null;
  let store = null;

  try {
    // Create the CRDT store
    console.log('[CodeMirror] Creating Velt CRDT store...');
    store = await createVeltCodeMirrorStore({
      editorId: editorId,
      veltClient: veltClient,
      initialContent: initialContent,
    });

    if (!store) {
      throw new Error('Failed to create CRDT store');
    }

    console.log('[CodeMirror] Store created, initializing editor...');

    // Remove loading spinner
    wrapper.removeChild(loadingSpinner);

    // Create editor container
    const editorDiv = document.createElement('div');
    editorDiv.className = 'h-full w-full';
    editorDiv.style.overflow = 'auto';
    wrapper.appendChild(editorDiv);

    // Create editor state
    const startState = EditorState.create({
      doc: store.getYText()?.toString() ?? '',
      extensions: [
        basicSetup,
        oneDark,
        css(),
        javascript(),
        html(),
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
        // yCollab enables real-time collaborative editing with CodeMirror using Yjs
        yCollab(store.getYText(), store.getAwareness(), {
          undoManager: store.getUndoManager(),
        }),
      ],
    });

    // Create editor view
    view = new EditorView({
      state: startState,
      parent: editorDiv,
    });

    console.log('[CodeMirror] Editor initialized successfully');
  } catch (error) {
    console.error('[CodeMirror] Failed to initialize:', error);

    // Show error state
    wrapper.innerHTML = `
      <div class="flex items-center justify-center h-full bg-[#1e1e1e]">
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
    store,
    destroy() {
      if (view) {
        view.destroy();
        view = null;
      }
      if (store && store.destroy) {
        store.destroy();
        store = null;
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
  wrapper.className = 'h-full w-full overflow-hidden bg-[#1e1e1e]';

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
