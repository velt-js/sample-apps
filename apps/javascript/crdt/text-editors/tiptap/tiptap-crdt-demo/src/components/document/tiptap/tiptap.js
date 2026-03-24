/**
 * TipTap Editor Component with Velt CRDT
 *
 * Vanilla JS implementation using createCollaboration from @veltdev/tiptap-crdt (v2 API)
 * for real-time collaborative editing.
 */

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { createCollaboration } from '@veltdev/tiptap-crdt';
import { TiptapVeltComments, addComment, renderComments } from '@veltdev/tiptap-velt-comments';

import { getVeltClient } from '../../../lib/velt.js';
import { initialContent } from './constants.js';
import { InlineH1, InlineH2, InlineH3 } from './extensions.js';
import { createBubbleMenuToolbar } from './ui/bubble-menu-toolbar.js';

/**
 * Create loading spinner element
 * @returns {HTMLElement} - Loading spinner element
 */
function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'flex items-center justify-center h-full';
  spinner.innerHTML = `
    <div class="text-white text-center">
      <div class="mb-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
      <p>Loading editor...</p>
    </div>
  `;
  return spinner;
}

/**
 * Create TipTap editor with Velt CRDT
 * @param {HTMLElement} container - Container element to mount into
 * @param {Object} veltClient - Velt client instance
 * @param {string} editorId - Unique editor ID
 * @param {Object} user - User object for collaboration cursor
 * @returns {Promise<Object>} - Component API with editor and destroy methods
 */
export async function createTipTapEditor(container, veltClient, editorId, user) {
  // Show loading state
  const loadingSpinner = createLoadingSpinner();
  container.appendChild(loadingSpinner);

  let editor = null;
  let manager = null;
  let bubbleMenuElement = null;

  try {
    // [Velt] Create the CollaborationManager using createCollaboration (v2 API)
    console.log('[TipTap] Creating collaboration manager...');
    manager = await createCollaboration({
      editorId: editorId,
      veltClient: veltClient,
      initialContent: initialContent,
      onError: (error) => console.error('[TipTap] Collaboration error:', error),
    });

    console.log('[TipTap] Collaboration manager created, initializing editor...');

    // Store editorId globally for comment handler access
    window.__veltEditorId = editorId;

    // Remove loading spinner
    container.removeChild(loadingSpinner);

    // Create bubble menu element BEFORE editor initialization
    bubbleMenuElement = document.createElement('div');
    bubbleMenuElement.className = 'bubble-menu-container';
    document.body.appendChild(bubbleMenuElement);

    // Build extensions array
    const extensions = [
      StarterKit.configure({
        history: false, // Disable history as CRDT handles undo/redo
        heading: false, // Using custom inline headings
        dropcursor: false, // Disable to avoid conflicts
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Underline,
      InlineH1,
      InlineH2,
      InlineH3,
      // [Velt] TipTap extension for Velt comments - enables comment markers and selection tracking
      TiptapVeltComments,
      // BubbleMenu extension - must be configured before editor creation
      BubbleMenu.configure({
        element: bubbleMenuElement,
        tippyOptions: {
          placement: 'top',
          offset: [0, 8],
        },
        shouldShow: ({ editor, from, to }) => {
          // Only show bubble menu when there's a text selection
          return from !== to && editor.isEditable;
        },
      }),
      // [Velt] Single extension that bundles Yjs document binding + remote cursor rendering (v2 API)
      manager.createExtension(),
    ];

    // Debug: Check what's in the Yjs document
    const yXml = manager.getXmlFragment();
    const yDoc = manager.getDoc();
    console.log('[TipTap] YXml content:', yXml?.toString());
    console.log('[TipTap] YDoc:', yDoc);
    console.log('[TipTap] Connection status:', manager.status);

    // Create the TipTap editor
    editor = new Editor({
      element: container,
      extensions: extensions,
      content: '', // Content comes from CRDT store
      editorProps: {
        attributes: {
          class: 'prose prose-invert max-w-none focus:outline-none',
        },
      },
    });

    // Create and attach bubble menu toolbar content
    const bubbleMenuToolbar = createBubbleMenuToolbar({
      editor,
      onAddComment: () => {
        // [Velt] Trigger comment creation on selected text using Velt TipTap Comments
        console.log('[TipTap] Comment button clicked, selection:', editor.state.selection);
        console.log('[TipTap] Selection empty?', editor.state.selection.empty);
        const currentEditorId = window.__veltEditorId;
        try {
          addComment({ editor, editorId: currentEditorId });
          console.log('[TipTap] addComment called successfully with editorId:', currentEditorId);
        } catch (err) {
          console.error('[TipTap] Error calling addComment:', err);
        }
      },
    });
    bubbleMenuElement.appendChild(bubbleMenuToolbar);

    console.log('[TipTap] Editor initialized successfully');
    console.log('[TipTap] Editor content after init:', editor.getHTML());

    // [Velt] Subscribe to status and sync events (v2 API)
    manager.onStatusChange((status) => {
      console.log('[TipTap] Connection status:', status);
    });

    manager.onSynced((synced) => {
      console.log('[TipTap] Synced:', synced);
    });

    // [Velt] Subscribe to comment annotations and render them in the editor
    const client = getVeltClient();
    if (client) {
      const commentElement = client.getCommentElement();
      commentElement.getAllCommentAnnotations().subscribe((annotations) => {
        if (editor && annotations?.length) {
          console.log('[TipTap] Rendering', annotations.length, 'comment annotations');
          renderComments({
            editor,
            editorId: editorId,
            commentAnnotations: annotations,
          });
        }
      });
    }

  } catch (error) {
    console.error('[TipTap] Failed to initialize:', error);

    // Remove loading spinner if still present
    if (loadingSpinner.parentNode === container) {
      container.removeChild(loadingSpinner);
    }

    // Show error state
    container.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-red-400 text-center">
          <p>Failed to load editor</p>
          <p class="text-sm opacity-70">${error.message}</p>
        </div>
      </div>
    `;
  }

  return {
    editor,
    manager,
    destroy() {
      // [Velt] Cleanup — destroying the editor automatically triggers manager.destroy()
      // via the extension's onDestroy hook, but we call it explicitly for safety
      if (editor) {
        editor.destroy();
        editor = null;
      }
      if (manager) {
        manager.destroy();
        manager = null;
      }
      if (bubbleMenuElement) {
        bubbleMenuElement.remove();
        bubbleMenuElement = null;
      }
    },
  };
}

