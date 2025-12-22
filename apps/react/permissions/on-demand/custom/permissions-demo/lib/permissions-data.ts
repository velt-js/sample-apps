// Permission Settings that can be assigned to nodes
export type PermissionSetting = 'Inherit' | 'Public' | 'OrganizationPrivate' | 'Restricted';

// User roles for the demo
export type UserRole = 'Intern' | 'Owner' | 'Custom';

// Node types in the hierarchy
export type NodeType = 'organization' | 'folder' | 'document';

// Access role for Velt
export type AccessRole = 'viewer' | 'editor';

// Node in the hierarchy
export interface HierarchyNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
}

// Permission settings state
export interface PermissionSettings {
  [nodeId: string]: PermissionSetting;
}

// Access role settings state
export interface AccessRoleSettings {
  [nodeId: string]: AccessRole;
}

// Effective access result
export interface EffectiveAccess {
  hasAccess: boolean;
  accessRole: AccessRole;
  effectivePermission: PermissionSetting;
}

// Static hierarchy data matching Figma
export const HIERARCHY_NODES: HierarchyNode[] = [
  { id: 'org-a', name: 'Organization A', type: 'organization', parentId: null },
  { id: 'folder-a', name: 'Folder A', type: 'folder', parentId: 'org-a' },
  { id: 'folder-b', name: 'Folder B', type: 'folder', parentId: 'org-a' },
  { id: 'doc-a', name: 'Document A', type: 'document', parentId: 'folder-b' },
  { id: 'doc-b', name: 'Document B', type: 'document', parentId: 'folder-a' },
  { id: 'doc-c', name: 'Document C', type: 'document', parentId: 'org-a' },
];

// Default permission settings matching Figma initial state
export const DEFAULT_PERMISSION_SETTINGS: PermissionSettings = {
  'org-a': 'OrganizationPrivate',
  'folder-a': 'Inherit',
  'folder-b': 'Restricted',
  'doc-a': 'Restricted',
  'doc-b': 'Inherit',
  'doc-c': 'Public',
};

// Default access role settings (all start as editor)
export const DEFAULT_ACCESS_ROLE_SETTINGS: AccessRoleSettings = {
  'org-a': 'editor',
  'folder-a': 'editor',
  'folder-b': 'editor',
  'doc-a': 'editor',
  'doc-b': 'editor',
  'doc-c': 'editor',
};

// User role configurations
export const USER_CONFIGS: Record<UserRole, {
  orgMember: boolean;
  isOwner: boolean;
  customAccess?: string[]; // node IDs with explicit access
}> = {
  'Intern': {
    orgMember: true,
    isOwner: false
  },
  'Owner': {
    orgMember: true,
    isOwner: true
  },
  'Custom': {
    orgMember: false,
    isOwner: false,
    customAccess: ['doc-c'] // Only public docs and explicitly granted
  },
};

// Get node by ID
export function getNodeById(nodeId: string): HierarchyNode | undefined {
  return HIERARCHY_NODES.find(n => n.id === nodeId);
}

// Get parent chain for a node (from node to root)
export function getParentChain(nodeId: string): HierarchyNode[] {
  const chain: HierarchyNode[] = [];
  let currentId: string | null = nodeId;

  while (currentId) {
    const node = getNodeById(currentId);
    if (!node) break;
    chain.push(node);
    currentId = node.parentId;
  }

  return chain;
}

// Resolve the effective permission setting (handling Inherit)
export function resolveEffectivePermission(
  nodeId: string,
  settings: PermissionSettings
): PermissionSetting {
  const chain = getParentChain(nodeId);

  for (const node of chain) {
    const setting = settings[node.id];
    if (setting && setting !== 'Inherit') {
      return setting;
    }
  }

  // Default to OrganizationPrivate if nothing found
  return 'OrganizationPrivate';
}

// Compute effective access for a user on a node
export function computeEffectiveAccess(
  nodeId: string,
  userRole: UserRole,
  settings: PermissionSettings
): EffectiveAccess {
  const effectivePermission = resolveEffectivePermission(nodeId, settings);
  const userConfig = USER_CONFIGS[userRole];
  const node = getNodeById(nodeId);

  let hasAccess = false;
  let accessRole: AccessRole = 'viewer';

  switch (effectivePermission) {
    case 'Public':
      // Everyone has access to public resources
      hasAccess = true;
      accessRole = userConfig.isOwner ? 'editor' : 'viewer';
      break;

    case 'OrganizationPrivate':
      // Only org members have access
      hasAccess = userConfig.orgMember;
      accessRole = userConfig.isOwner ? 'editor' : 'editor'; // Org members get editor
      break;

    case 'Restricted':
      // Only owners or users with explicit custom access
      if (userConfig.isOwner) {
        hasAccess = true;
        accessRole = 'editor';
      } else if (userConfig.customAccess?.includes(nodeId)) {
        hasAccess = true;
        accessRole = 'viewer';
      } else {
        hasAccess = false;
      }
      break;

    case 'Inherit':
      // This shouldn't happen after resolution, but handle it
      hasAccess = userConfig.orgMember;
      accessRole = 'viewer';
      break;
  }

  return { hasAccess, accessRole, effectivePermission };
}

// LocalStorage key for permission settings
const STORAGE_KEY = 'velt-demo-permission-settings';
const USER_STORAGE_KEY = 'velt-demo-selected-user';
const ACCESS_ROLE_STORAGE_KEY = 'velt-demo-access-role-settings';

// Save permission settings to localStorage
export function savePermissionSettings(settings: PermissionSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Dispatch a custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('permission-settings-changed', { detail: settings }));
  }
}

// Load permission settings from localStorage
export function loadPermissionSettings(): PermissionSettings {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall back to defaults
      }
    }
  }
  return { ...DEFAULT_PERMISSION_SETTINGS };
}

// Save selected user to localStorage
export function saveSelectedUser(user: UserRole): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_STORAGE_KEY, user);
    window.dispatchEvent(new CustomEvent('selected-user-changed', { detail: user }));
  }
}

// Load selected user from localStorage
export function loadSelectedUser(): UserRole {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored && ['Intern', 'Owner', 'Custom'].includes(stored)) {
      return stored as UserRole;
    }
  }
  return 'Intern';
}

// Save access role settings to localStorage
export function saveAccessRoleSettings(settings: AccessRoleSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_ROLE_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('access-role-settings-changed', { detail: settings }));
  }
}

// Load access role settings from localStorage
export function loadAccessRoleSettings(): AccessRoleSettings {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(ACCESS_ROLE_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall back to defaults
      }
    }
  }
  return { ...DEFAULT_ACCESS_ROLE_SETTINGS };
}

// Permission setting options for dropdowns
export const PERMISSION_OPTIONS: PermissionSetting[] = [
  'Inherit',
  'Public',
  'OrganizationPrivate',
  'Restricted',
];

// User role options for dropdown
export const USER_OPTIONS: UserRole[] = ['Intern', 'Owner', 'Custom'];

// Get color for permission badge based on setting
export function getPermissionBadgeColor(setting: PermissionSetting): {
  bg: string;
  text: string;
} {
  switch (setting) {
    case 'Public':
      return { bg: 'rgba(152,246,255,0.08)', text: '#98f6ff' };
    case 'Restricted':
      return { bg: 'rgba(246,158,35,0.08)', text: '#f69e23' };
    case 'OrganizationPrivate':
      return { bg: 'rgba(255,255,255,0.08)', text: 'white' };
    case 'Inherit':
    default:
      return { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.75)' };
  }
}
