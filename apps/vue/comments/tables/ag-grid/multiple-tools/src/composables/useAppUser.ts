import { ref, provide, inject, type InjectionKey, type Ref } from 'vue';

export interface AppUser {
  userId: string;
  name: string;
  email: string;
  organizationId: string;
  photoUrl: string;
}

interface AppUserContext {
  user: Ref<AppUser | undefined>;
  isUserLoggedIn: Ref<boolean | undefined>;
  login: (u: AppUser) => void;
  logout: () => void;
}

const AppUserKey: InjectionKey<AppUserContext> = Symbol('AppUser');

function hashStringToIndex(str: string, arrayLength: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % arrayLength;
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).padStart(8, '0');
}

function generateRandomUser(): AppUser {
  const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

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

const STORAGE_KEY = 'ag-grid-multiple-tools-user';

export function provideAppUser() {
  const user = ref<AppUser | undefined>(undefined);
  const isUserLoggedIn = ref<boolean | undefined>(undefined);

  // Initialize user from storage
  try {
    const isInIframe = window.self !== window.top;
    const storage = isInIframe ? sessionStorage : localStorage;
    const stored = storage.getItem(STORAGE_KEY);

    if (stored) {
      user.value = JSON.parse(stored);
    } else {
      const newUser = generateRandomUser();
      storage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      user.value = newUser;
    }
    isUserLoggedIn.value = true;
  } catch {}

  function login(next: AppUser) {
    try {
      const isInIframe = window.self !== window.top;
      const storage = isInIframe ? sessionStorage : localStorage;
      user.value = next;
      isUserLoggedIn.value = true;
      storage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function logout() {
    try {
      const isInIframe = window.self !== window.top;
      const storage = isInIframe ? sessionStorage : localStorage;
      user.value = undefined;
      isUserLoggedIn.value = false;
      storage.removeItem(STORAGE_KEY);
    } catch {}
  }

  const ctx: AppUserContext = { user, isUserLoggedIn, login, logout };
  provide(AppUserKey, ctx);
  return ctx;
}

export function useAppUser() {
  const ctx = inject(AppUserKey);
  if (!ctx) throw new Error('useAppUser must be used within provideAppUser');
  return ctx;
}
