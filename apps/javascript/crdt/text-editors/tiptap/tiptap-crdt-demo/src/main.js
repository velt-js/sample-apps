/**
 * Main Entry Point
 *
 * Vanilla JS TipTap CRDT Demo
 * Initializes Velt client, user, document, and renders the UI.
 */

// Import styles
import '../styles/globals.css';
import '../styles/tiptap.css';
import './components/velt/ui-customization/styles.css';

// Import modules
import { initializeUser } from './lib/user.js';
import { initializeDocument } from './lib/document.js';
import {
  initializeVelt,
  authenticateUser,
  setVeltDocument,
  enableDarkMode,
} from './lib/velt.js';
import { createDocumentCanvas } from './components/document/document-canvas.js';
import { configureNotificationsTool } from './components/velt/velt-tools.js';
import { createTipTapEditor } from './components/document/tiptap/index.js';
import { createVeltCollaboration } from './components/velt/velt-collaboration.js';

// App state
let documentCanvas = null;
let editorInstance = null;

/**
 * Wait for Velt to be fully initialized (user + document synced)
 * This ensures the awareness system knows the user info for cursor labels
 * @param {Object} veltClient - Velt client instance
 * @param {number} timeout - Timeout in milliseconds (default 30s)
 * @returns {Promise<boolean>}
 */
function waitForVeltInitState(veltClient, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const subscription = veltClient.getVeltInitState().subscribe((state) => {
      console.log('[App] Velt init state:', state);

      if (state === true) {
        subscription?.unsubscribe();
        resolve(true);
        return;
      }

      // Check for timeout
      if (Date.now() - startTime > timeout) {
        subscription?.unsubscribe();
        console.warn('[App] Velt init state timeout, proceeding anyway');
        resolve(false);
      }
    });

    // Fallback timeout
    setTimeout(() => {
      subscription?.unsubscribe();
      console.warn('[App] Velt init state timeout (fallback), proceeding anyway');
      resolve(false);
    }, timeout);
  });
}

/**
 * Initialize the application
 */
async function init() {
  console.log('[App] Starting initialization...');

  const app = document.getElementById('app');
  if (!app) {
    console.error('[App] No #app element found');
    return;
  }

  // Show loading state
  app.innerHTML = `
    <div class="flex items-center justify-center h-screen w-screen bg-black">
      <div class="text-white text-center">
        <div class="mb-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
        <p>Initializing collaboration...</p>
      </div>
    </div>
  `;

  try {
    // Step 1: Initialize user
    console.log('[App] Step 1: Initializing user...');
    const user = initializeUser();
    if (!user) {
      throw new Error('Failed to initialize user');
    }
    console.log('[App] User initialized:', user.name);

    // Step 2: Initialize document
    console.log('[App] Step 2: Initializing document...');
    const doc = initializeDocument();
    if (!doc.documentId) {
      throw new Error('Failed to initialize document');
    }
    console.log('[App] Document initialized:', doc.documentId);

    // Step 3: Initialize Velt client
    console.log('[App] Step 3: Initializing Velt client...');
    const veltClient = await initializeVelt();
    if (!veltClient) {
      throw new Error('Failed to initialize Velt client');
    }

    // Step 4: Authenticate user with Velt
    console.log('[App] Step 4: Authenticating user with Velt...');
    await authenticateUser(user);

    // Step 5: Set document in Velt
    console.log('[App] Step 5: Setting document in Velt...');
    await setVeltDocument(doc.documentId, doc.documentName);

    // Step 6: Enable dark mode
    console.log('[App] Step 6: Enabling dark mode...');
    enableDarkMode();

    // Step 7: Configure notifications
    console.log('[App] Step 7: Configuring notifications...');
    configureNotificationsTool(veltClient);

    // Clear loading state
    app.innerHTML = '';

    // Step 8: Create main layout
    console.log('[App] Step 8: Creating main layout...');
    const mainContainer = document.createElement('main');
    mainContainer.className = 'w-full h-screen relative';
    app.appendChild(mainContainer);

    // Create document canvas
    documentCanvas = createDocumentCanvas(mainContainer);

    // Step 9: Wait for Velt init state before creating editor
    console.log('[App] Step 9: Waiting for Velt init state...');

    const editorContainer = documentCanvas.editorContainer;

    // Wait for Velt to be fully initialized (user + document synced)
    // This is critical - the editor must be created AFTER Velt knows who the user is
    await waitForVeltInitState(veltClient);
    console.log('[App] Velt fully initialized, creating editor...');

    if (editorContainer) {
      // Create editor with CRDT - now Velt knows the user info for cursor labels
      editorInstance = await createTipTapEditor(
        editorContainer,
        veltClient,
        doc.documentId, // Use documentId as editorId for TipTap CRDT
        user
      );
      console.log('[App] Editor created successfully');
    }

    // Add Velt collaboration components (comments, sidebar)
    createVeltCollaboration(app);

    console.log('[App] Initialization complete!');
  } catch (error) {
    console.error('[App] Initialization failed:', error);
    app.innerHTML = `
      <div class="flex items-center justify-center h-screen w-screen bg-black">
        <div class="text-red-400 text-center">
          <p class="text-xl mb-2">Failed to initialize</p>
          <p class="opacity-70">${error.message}</p>
          <button
            onclick="window.location.reload()"
            class="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    `;
  }
}

/**
 * Cleanup on page unload
 */
function cleanup() {
  if (editorInstance && editorInstance.destroy) {
    editorInstance.destroy();
  }
  if (documentCanvas && documentCanvas.destroy) {
    documentCanvas.destroy();
  }
}

// Register cleanup
window.addEventListener('beforeunload', cleanup);

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
