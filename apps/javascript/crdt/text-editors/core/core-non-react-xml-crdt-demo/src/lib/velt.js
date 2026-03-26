/**
 * Velt Client Initialization Module
 *
 * Uses @veltdev/client for vanilla JavaScript initialization.
 */

// [Velt] Import Velt client SDK
import { initVelt } from '@veltdev/client';

// [Velt] Replace with your own API key from https://console.velt.dev
const VELT_API_KEY = '6xTcUFtlYAlCdh11zrKB';
const VELT_AUTH_TOKEN = 'bd4d5226050470b6c658054fcdf1092a';

let veltClient = null;
let veltInitialized = false;
const initListeners = [];

/**
 * Get Velt client instance
 * @returns {Object|null} - Velt client or null
 */
export function getVeltClient() {
  return veltClient;
}

/**
 * Check if Velt is initialized
 * @returns {boolean} - Initialization state
 */
export function isVeltInitialized() {
  return veltInitialized;
}

/**
 * Subscribe to Velt initialization
 * @param {Function} callback - Callback function
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToVeltInit(callback) {
  initListeners.push(callback);
  // Call immediately if already initialized
  if (veltInitialized) {
    callback(veltClient);
  }
  return () => {
    const index = initListeners.indexOf(callback);
    if (index > -1) {
      initListeners.splice(index, 1);
    }
  };
}

/**
 * Notify all listeners of initialization
 */
function notifyInitListeners() {
  initListeners.forEach(callback => callback(veltClient));
}

/**
 * Generate JWT token from Velt API
 * @param {Object} user - User object with userId, organizationId, email
 * @returns {Promise<string>} - JWT token
 */
async function generateVeltToken(user) {
  const body = {
    data: {
      userId: user.userId,
      userProperties: {
        organizationId: user.organizationId,
        email: user.email || undefined,
      },
    },
  };

  const response = await fetch('https://api.velt.dev/v2/auth/token/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-velt-api-key': VELT_API_KEY,
      'x-velt-auth-token': VELT_AUTH_TOKEN,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  const token = json?.result?.data?.token;

  if (!response.ok || !token) {
    throw new Error(json?.error?.message || 'Failed to generate token');
  }

  return token;
}

/**
 * Initialize Velt client
 * @returns {Promise<Object>} - Velt client
 */
export async function initializeVelt() {
  if (veltClient) {
    return veltClient;
  }

  try {
    // [Velt] Initialize Velt client
    veltClient = await initVelt(VELT_API_KEY);
    console.log('[Velt] Client initialized');
    return veltClient;
  } catch (error) {
    console.error('[Velt] Failed to initialize client:', error);
    throw error;
  }
}

/**
 * Authenticate user with Velt
 * @param {Object} user - User object
 * @returns {Promise<void>}
 */
export async function authenticateUser(user) {
  if (!veltClient) {
    throw new Error('Velt client not initialized');
  }

  if (!user) {
    throw new Error('User is required');
  }

  try {
    // Generate JWT token for secure authentication
    const token = await generateVeltToken(user);

    // [Velt] Identify user with JWT token
    await veltClient.identify(user, {
      authToken: token,
    });

    console.log('[Velt] User authenticated:', user.name);
  } catch (error) {
    console.error('[Velt] Failed to authenticate user:', error);
    // Fallback to simple identify without token (for demo purposes)
    try {
      await veltClient.identify(user);
      console.log('[Velt] User authenticated (without token):', user.name);
    } catch (fallbackError) {
      console.error('[Velt] Fallback authentication failed:', fallbackError);
      throw fallbackError;
    }
  }
}

/**
 * Set document in Velt
 * @param {string} documentId - Document ID
 * @param {string} documentName - Document name
 * @returns {Promise<void>}
 */
export async function setVeltDocument(documentId, documentName = 'Untitled') {
  if (!veltClient) {
    throw new Error('Velt client not initialized');
  }

  try {
    // [Velt] Set document scope
    await veltClient.setDocument(documentId, {
      documentName: documentName,
    });
    console.log('[Velt] Document set:', documentId);
  } catch (error) {
    console.error('[Velt] Failed to set document:', error);
    throw error;
  }
}

/**
 * Enable dark mode
 */
export function enableDarkMode() {
  if (veltClient) {
    // [Velt] Enable dark mode
    veltClient.setDarkMode(true);
  }
}

/**
 * Set Velt dark mode
 * @param {boolean} isDark - Whether to enable dark mode
 */
export function setVeltDarkMode(isDark) {
  if (veltClient) {
    // [Velt] Toggle dark mode
    veltClient.setDarkMode(isDark);
  }
}

/**
 * Sign out user
 */
export async function signOutUser() {
  if (veltClient) {
    try {
      // [Velt] Sign out user
      await veltClient.signOutUser();
      console.log('[Velt] User signed out');
    } catch (error) {
      console.error('[Velt] Failed to sign out user:', error);
    }
  }
}

/**
 * Mark Velt as fully initialized (user + document set)
 */
export function markVeltInitialized() {
  veltInitialized = true;
  notifyInitListeners();
}

/**
 * Subscribe to Velt init state
 * @param {Function} callback - Callback function receiving boolean
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToVeltInitState(callback) {
  if (!veltClient) {
    callback(false);
    return () => {};
  }

  const subscription = veltClient.getVeltInitState().subscribe((state) => {
    callback(state === true);
  });

  return () => {
    subscription?.unsubscribe();
  };
}
