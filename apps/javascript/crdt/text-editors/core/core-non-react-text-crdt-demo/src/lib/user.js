/**
 * User Management Module
 *
 * This user authentication logic is ONLY for demo purposes.
 */

const STORAGE_KEY = 'core-crdt-demo-user';

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

function hashStringToIndex(str, arrayLength) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % arrayLength;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).padStart(8, '0');
}

function generateRandomUser() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  const userId = `user-${hashString(fullName)}`;
  const colorIndex = hashStringToIndex(userId, avatarColors.length);
  const avatarColor = avatarColors[colorIndex];

  return {
    userId,
    name: fullName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    organizationId: 'sample-apps-demo-org',
    photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${avatarColor.substring(1)}&color=fff&size=128`,
  };
}

function getStorage() {
  try {
    const isInIframe = window.self !== window.top;
    return isInIframe ? sessionStorage : localStorage;
  } catch {
    return localStorage;
  }
}

let currentUser = undefined;
let isUserLoggedIn = undefined;
const userListeners = [];

export function getUser() { return currentUser; }
export function getIsUserLoggedIn() { return isUserLoggedIn; }

export function subscribeToUser(callback) {
  userListeners.push(callback);
  callback(currentUser, isUserLoggedIn);
  return () => {
    const index = userListeners.indexOf(callback);
    if (index > -1) userListeners.splice(index, 1);
  };
}

function notifyListeners() {
  userListeners.forEach(callback => callback(currentUser, isUserLoggedIn));
}

export function initializeUser() {
  try {
    const storage = getStorage();
    const stored = storage.getItem(STORAGE_KEY);
    if (stored) {
      currentUser = JSON.parse(stored);
    } else {
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

export function login(user) {
  try {
    const storage = getStorage();
    currentUser = user;
    isUserLoggedIn = true;
    storage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyListeners();
  } catch {}
}

export function logout() {
  try {
    const storage = getStorage();
    currentUser = undefined;
    isUserLoggedIn = false;
    storage.removeItem(STORAGE_KEY);
    notifyListeners();
  } catch {}
}
