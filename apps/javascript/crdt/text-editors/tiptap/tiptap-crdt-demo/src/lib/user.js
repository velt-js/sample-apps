/**
 * User Management Module
 *
 * This user authentication logic is ONLY for demo purposes.
 * It generates random users and stores them in localStorage/sessionStorage to simulate
 * a multi-user collaboration environment for demonstration.
 *
 * IN YOUR REAL APPLICATION:
 * - Fetch the currently logged in user from YOUR existing authentication system
 * - Use your own user management (Auth0, Firebase Auth, custom backend, etc.)
 * - Simply pass your authenticated user object to Velt's identify() method
 */

const STORAGE_KEY = 'velt-demo-user';

// Avatar colors for user icons
const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

// Name pools for random user generation
const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

/**
 * Simple hash function to convert string to a consistent number
 * @param {string} str - Input string
 * @param {number} arrayLength - Array length for modulo
 * @returns {number} - Index within array bounds
 */
function hashStringToIndex(str, arrayLength) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % arrayLength;
}

/**
 * Generate a deterministic hash from a string (for userId generation)
 * @param {string} str - Input string
 * @returns {string} - Hash string
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to base36 and pad to ensure consistent length
  return Math.abs(hash).toString(36).padStart(8, '0');
}

/**
 * Generate a random user with deterministic ID based on name
 * @returns {Object} - User object
 */
function generateRandomUser() {
  // Randomly select first and last name
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  // Generate deterministic userId from the full name
  // This ensures "Alex Smith" always gets the same ID
  const userId = `user-${hashString(fullName)}`;

  // Use deterministic color based on userId for consistent photoUrl
  const colorIndex = hashStringToIndex(userId, avatarColors.length);
  const avatarColor = avatarColors[colorIndex];

  return {
    userId: userId,
    name: fullName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    organizationId: 'sample-apps-demo-org',
    photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${avatarColor.substring(1)}&color=fff&size=128`,
  };
}

/**
 * Get storage based on iframe context
 * @returns {Storage} - localStorage or sessionStorage
 */
function getStorage() {
  try {
    // Detect if running in iframe (for master-sample-app dual view)
    const isInIframe = window.self !== window.top;
    // In iframe: use sessionStorage (each origin/port is isolated automatically)
    // Not in iframe: use localStorage (same user across tabs)
    return isInIframe ? sessionStorage : localStorage;
  } catch {
    return localStorage;
  }
}

/**
 * User state management
 */
let currentUser = undefined;
let isUserLoggedIn = undefined;
const userListeners = [];

/**
 * Get current user
 * @returns {Object|undefined} - Current user or undefined
 */
export function getUser() {
  return currentUser;
}

/**
 * Check if user is logged in
 * @returns {boolean|undefined} - Login state
 */
export function getIsUserLoggedIn() {
  return isUserLoggedIn;
}

/**
 * Subscribe to user changes
 * @param {Function} callback - Callback function
 * @returns {Function} - Unsubscribe function
 */
export function subscribeToUser(callback) {
  userListeners.push(callback);
  // Call immediately with current state
  callback(currentUser, isUserLoggedIn);
  return () => {
    const index = userListeners.indexOf(callback);
    if (index > -1) {
      userListeners.splice(index, 1);
    }
  };
}

/**
 * Notify all listeners of user changes
 */
function notifyListeners() {
  userListeners.forEach(callback => callback(currentUser, isUserLoggedIn));
}

/**
 * Initialize user from storage or generate new one
 * @returns {Object} - User object
 */
export function initializeUser() {
  try {
    const storage = getStorage();

    // Check storage for existing user
    const stored = storage.getItem(STORAGE_KEY);

    if (stored) {
      // Use existing user from storage
      currentUser = JSON.parse(stored);
    } else {
      // Generate NEW random user
      currentUser = generateRandomUser();
      storage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    }

    isUserLoggedIn = true;
    notifyListeners();
    return currentUser;
  } catch {
    return undefined;
  }
}

/**
 * Login with a specific user
 * @param {Object} user - User object
 */
export function login(user) {
  try {
    const storage = getStorage();
    currentUser = user;
    isUserLoggedIn = true;
    storage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyListeners();
  } catch {
    // Ignore storage errors
  }
}

/**
 * Logout current user
 */
export function logout() {
  try {
    const storage = getStorage();
    currentUser = undefined;
    isUserLoggedIn = false;
    storage.removeItem(STORAGE_KEY);
    notifyListeners();
  } catch {
    // Ignore storage errors
  }
}
