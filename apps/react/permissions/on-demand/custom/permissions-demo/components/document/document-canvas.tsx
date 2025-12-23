'use client'

import { useState, useEffect, useRef } from 'react'
import {
  LegoIcon,
  HierarchyIcon,
  HierarchyIconBlack,
  FolderOpenIcon,
  FolderOpenIconBlack,
  FileDescriptionIcon,
  FileDescriptionIconBlack,
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  ClockIcon,
  SmallArrowIcon,
} from './icons'
import {
  PermissionSetting,
  UserRole,
  AccessRole,
  PermissionSettings,
  AccessRoleSettings,
  HIERARCHY_NODES,
  DEFAULT_PERMISSION_SETTINGS,
  DEFAULT_ACCESS_ROLE_SETTINGS,
  PERMISSION_OPTIONS,
  USER_OPTIONS,
  computeEffectiveAccess,
  getPermissionBadgeColor,
  savePermissionSettings,
  loadPermissionSettings,
  saveSelectedUser,
  loadSelectedUser,
  saveAccessRoleSettings,
  loadAccessRoleSettings,
  EffectiveAccess,
} from '@/lib/permissions-data'

// Dropdown component for permission selection
function PermissionDropdown({
  value,
  onChange,
  nodeId,
}: {
  value: PermissionSetting
  onChange: (value: PermissionSetting) => void
  nodeId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const colors = getPermissionBadgeColor(value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-[4px] items-center px-[8px] py-[6px] rounded-[24px] shrink-0 transition-colors"
        style={{ backgroundColor: colors.bg }}
      >
        <p
          className="font-ibm-plex-mono font-medium text-[14px] text-center whitespace-nowrap leading-[1.1]"
          style={{ color: colors.text }}
        >
          {value}
        </p>
        <ChevronDownIcon className="w-[16px] h-[16px] shrink-0" style={{ color: colors.text }} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-[4px] bg-[#151515] border border-white/[0.08] rounded-[8px] p-[4px] z-50 min-w-[196px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.75)]">
          {PERMISSION_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full text-left p-[8px] font-ibm-plex-mono text-[14px] rounded-[8px] transition-colors ${
                option === value ? 'text-white bg-white/[0.09]' : 'text-white hover:bg-white/[0.05]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Dropdown component for user selection
function UserDropdown({
  value,
  onChange,
}: {
  value: UserRole
  onChange: (value: UserRole) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex gap-[7px] items-center">
        <p className="font-ibm-plex-mono font-medium text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {value}
        </p>
        <SmallArrowIcon className="w-[8px] h-[4px] text-white/[0.32]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-[4px] bg-[#151515] border border-white/[0.08] rounded-[8px] p-[4px] z-50 min-w-[103px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.75)]">
          {USER_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full text-left p-[8px] font-ibm-plex-mono text-[14px] rounded-[8px] transition-colors ${
                option === value ? 'text-white bg-white/[0.09]' : 'text-white hover:bg-white/[0.05]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Access badge toggle between viewer/editor
function AccessBadge({
  access,
  accessRole,
  onChange,
}: {
  access: EffectiveAccess
  accessRole: AccessRole
  onChange: (role: AccessRole) => void
}) {
  if (!access.hasAccess) {
    return (
      <div className="bg-white/[0.08] flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0 opacity-50">
        <div className="flex items-center p-[4px]">
          <EyeIcon className="w-[16px] h-[16px] text-white/50 shrink-0" />
        </div>
        <div className="bg-white/[0.16] flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] shrink-0">
          <p className="font-ibm-plex-mono font-semibold text-[10px] text-white/50 uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1]">
            no access
          </p>
        </div>
      </div>
    )
  }

  const isViewer = accessRole === 'viewer'
  const isEditor = accessRole === 'editor'

  return (
    <div className="bg-white/[0.08] flex gap-[2px] items-center p-[2px] rounded-[32px] shrink-0">
      {/* Viewer toggle */}
      <button
        onClick={() => onChange('viewer')}
        className={`flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] transition-colors ${
          isViewer ? 'bg-white/[0.16]' : ''
        }`}
      >
        <EyeIcon className={`w-[16px] h-[16px] shrink-0 ${isViewer ? 'text-white' : 'text-white/[0.32]'}`} />
        <p className={`font-ibm-plex-mono font-semibold text-[10px] uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1] ${isViewer ? 'text-white' : 'text-white/[0.32]'}`}>
          viewer
        </p>
      </button>
      {/* Editor toggle */}
      <button
        onClick={() => onChange('editor')}
        className={`flex gap-[4px] items-center px-[6px] py-[4px] rounded-[32px] transition-colors ${
          isEditor ? 'bg-white/[0.16]' : ''
        }`}
      >
        <PencilIcon className={`w-[12px] h-[12px] shrink-0 ${isEditor ? 'text-white' : 'text-white/[0.32]'}`} />
        <p className={`font-ibm-plex-mono font-semibold text-[10px] uppercase tracking-[0.5px] whitespace-nowrap leading-[1.1] ${isEditor ? 'text-white' : 'text-white/[0.32]'}`}>
          editor
        </p>
      </button>
    </div>
  )
}

export default function DocumentCanvas() {
  const [selectedUser, setSelectedUser] = useState<UserRole>('Intern')
  const [permissionSettings, setPermissionSettings] = useState<PermissionSettings>(DEFAULT_PERMISSION_SETTINGS)
  const [accessRoleSettings, setAccessRoleSettings] = useState<AccessRoleSettings>(DEFAULT_ACCESS_ROLE_SETTINGS)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load initial state from localStorage
  useEffect(() => {
    setSelectedUser(loadSelectedUser())
    setPermissionSettings(loadPermissionSettings())
    setAccessRoleSettings(loadAccessRoleSettings())
    setIsInitialized(true)
  }, [])

  // Listen for cross-tab updates via storage events
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === 'velt-demo-permission-settings' && event.newValue) {
        try {
          setPermissionSettings(JSON.parse(event.newValue))
        } catch {
          // Ignore parse errors
        }
      }
      if (event.key === 'velt-demo-selected-user' && event.newValue) {
        if (['Intern', 'Owner', 'Custom'].includes(event.newValue)) {
          setSelectedUser(event.newValue as UserRole)
        }
      }
      if (event.key === 'velt-demo-access-role-settings' && event.newValue) {
        try {
          setAccessRoleSettings(JSON.parse(event.newValue))
        } catch {
          // Ignore parse errors
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Handle user change
  function handleUserChange(user: UserRole) {
    setSelectedUser(user)
    saveSelectedUser(user)
  }

  // Handle permission change
  function handlePermissionChange(nodeId: string, permission: PermissionSetting) {
    const newSettings = { ...permissionSettings, [nodeId]: permission }
    setPermissionSettings(newSettings)
    savePermissionSettings(newSettings)
  }

  // Handle access role change
  function handleAccessRoleChange(nodeId: string, role: AccessRole) {
    const newSettings = { ...accessRoleSettings, [nodeId]: role }
    setAccessRoleSettings(newSettings)
    saveAccessRoleSettings(newSettings)
  }

  // Compute access for all nodes
  const accessMap: Record<string, EffectiveAccess> = {}
  for (const node of HIERARCHY_NODES) {
    accessMap[node.id] = computeEffectiveAccess(node.id, selectedUser, permissionSettings)
  }

  // Get node data helpers
  const orgA = HIERARCHY_NODES.find((n) => n.id === 'org-a')!
  const folderA = HIERARCHY_NODES.find((n) => n.id === 'folder-a')!
  const folderB = HIERARCHY_NODES.find((n) => n.id === 'folder-b')!
  const docA = HIERARCHY_NODES.find((n) => n.id === 'doc-a')!
  const docB = HIERARCHY_NODES.find((n) => n.id === 'doc-b')!
  const docC = HIERARCHY_NODES.find((n) => n.id === 'doc-c')!

  // Don't render until initialized to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 relative">
            <div className="w-full h-full bg-black" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black relative w-full h-full overflow-hidden">
      {/* Dot Grid Background */}
      <div className="absolute flex h-[731px] items-center justify-center left-[calc(50%-0.11px)] top-[-593px] -translate-x-1/2 w-[1422px]">
        <div className="flex-none rotate-180">
          <div className="h-[731px] relative w-[1422px]">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute w-full h-full bg-repeat opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute bg-gradient-to-t from-transparent inset-0 to-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Left Section: User and Permissions List */}
      {/* User Section */}
      <div className="absolute flex gap-[12px] items-center left-[75px] top-[137px]">
        <LegoIcon className="w-[32px] h-[32px] shrink-0" />
        <div className="flex flex-col gap-[4px] items-start justify-center">
          <UserDropdown value={selectedUser} onChange={handleUserChange} />
          <p className="font-ibm-plex-mono text-[14px] text-white opacity-[0.52] whitespace-nowrap leading-[1.1]">
            is part of Organization A
          </p>
        </div>
      </div>

      {/* Permissions List */}
      <div className="absolute flex flex-col gap-[40px] items-start left-[75px] top-[224px] w-[523px]">
        {/* Organization Section */}
        <div className="flex flex-col gap-[15px] items-start justify-center w-full">
          <div className="flex gap-[15px] items-start w-full">
            <HierarchyIcon className="w-[18px] h-[18px] text-[#7DC8FF] shrink-0" />
            <p className="font-ibm-plex-mono text-[14px] text-white opacity-[0.52] uppercase tracking-[0.7px] whitespace-nowrap leading-[1.1]">
              Organization
            </p>
          </div>
          <div className="flex gap-[10px] items-center">
            <div className="bg-white/[0.08] flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
              <p className="font-urbanist font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                {orgA.name}
              </p>
              <PermissionDropdown
                value={permissionSettings['org-a']}
                onChange={(v) => handlePermissionChange('org-a', v)}
                nodeId="org-a"
              />
            </div>
            <AccessBadge access={accessMap['org-a']} accessRole={accessRoleSettings['org-a']} onChange={(role) => handleAccessRoleChange('org-a', role)} />
            <ClockIcon className="w-[20px] h-[20px] text-white/[0.32] shrink-0" />
          </div>
        </div>

        {/* Folders Section */}
        <div className="flex flex-col gap-[15px] items-start justify-center w-full">
          <div className="flex gap-[15px] items-start w-full">
            <FolderOpenIcon className="w-[18px] h-[18px] text-[#49CC87] shrink-0" />
            <p className="font-ibm-plex-mono text-[14px] text-white opacity-[0.52] uppercase tracking-[0.7px] whitespace-nowrap leading-[1.1]">
              Folders
            </p>
          </div>

          {/* Folder A */}
          <div className="flex gap-[10px] items-center">
            <div className="bg-white/[0.08] flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
              <p className="font-urbanist font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                {folderA.name}
              </p>
              <PermissionDropdown
                value={permissionSettings['folder-a']}
                onChange={(v) => handlePermissionChange('folder-a', v)}
                nodeId="folder-a"
              />
            </div>
            <AccessBadge access={accessMap['folder-a']} accessRole={accessRoleSettings['folder-a']} onChange={(role) => handleAccessRoleChange('folder-a', role)} />
            <ClockIcon className="w-[20px] h-[20px] text-white/[0.32] shrink-0" />
          </div>

          {/* Folder B */}
          <div className="flex gap-[10px] items-center">
            <div className="bg-white/[0.08] flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
              <p className="font-urbanist font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                {folderB.name}
              </p>
              <PermissionDropdown
                value={permissionSettings['folder-b']}
                onChange={(v) => handlePermissionChange('folder-b', v)}
                nodeId="folder-b"
              />
            </div>
            <AccessBadge access={accessMap['folder-b']} accessRole={accessRoleSettings['folder-b']} onChange={(role) => handleAccessRoleChange('folder-b', role)} />
            <ClockIcon className="w-[20px] h-[20px] text-white/[0.32] shrink-0" />
          </div>
        </div>

        {/* Documents Section */}
        <div className="flex flex-col gap-[15px] items-start justify-center w-full">
          <div className="flex gap-[15px] items-start w-full">
            <FileDescriptionIcon className="w-[18px] h-[18px] text-[#FF7698] shrink-0" />
            <p className="font-ibm-plex-mono text-[14px] text-white opacity-[0.52] uppercase tracking-[0.7px] whitespace-nowrap leading-[1.1]">
              Documents
            </p>
          </div>

          {/* Document A */}
          <div className="flex gap-[10px] items-center">
            <div className="bg-white/[0.08] flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
              <p className="font-urbanist font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                {docA.name}
              </p>
              <PermissionDropdown
                value={permissionSettings['doc-a']}
                onChange={(v) => handlePermissionChange('doc-a', v)}
                nodeId="doc-a"
              />
            </div>
            <AccessBadge access={accessMap['doc-a']} accessRole={accessRoleSettings['doc-a']} onChange={(role) => handleAccessRoleChange('doc-a', role)} />
            <ClockIcon className="w-[20px] h-[20px] text-white/[0.32] shrink-0" />
          </div>

          {/* Document B */}
          <div className="flex gap-[10px] items-center">
            <div className="bg-white/[0.08] flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
              <p className="font-urbanist font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                {docB.name}
              </p>
              <PermissionDropdown
                value={permissionSettings['doc-b']}
                onChange={(v) => handlePermissionChange('doc-b', v)}
                nodeId="doc-b"
              />
            </div>
            <AccessBadge access={accessMap['doc-b']} accessRole={accessRoleSettings['doc-b']} onChange={(role) => handleAccessRoleChange('doc-b', role)} />
            <ClockIcon className="w-[20px] h-[20px] text-white/[0.32] shrink-0" />
          </div>

          {/* Document C */}
          <div className="flex gap-[10px] items-center">
            <div className="bg-white/[0.08] flex gap-[10px] items-center justify-center min-w-[52px] pl-[12px] pr-[4px] py-[4px] rounded-[32px] shrink-0">
              <p className="font-urbanist font-semibold text-[16px] text-center text-white whitespace-nowrap leading-[1.1]">
                {docC.name}
              </p>
              <PermissionDropdown
                value={permissionSettings['doc-c']}
                onChange={(v) => handlePermissionChange('doc-c', v)}
                nodeId="doc-c"
              />
            </div>
            <AccessBadge access={accessMap['doc-c']} accessRole={accessRoleSettings['doc-c']} onChange={(role) => handleAccessRoleChange('doc-c', role)} />
            <ClockIcon className="w-[20px] h-[20px] text-white/[0.32] shrink-0" />
          </div>
        </div>
      </div>

      {/* Right Section: Hierarchy Diagram */}
      {/* Organization A Badge */}
      <div
        className={`absolute left-[915px] top-[253px] border border-[#39efdd] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px] transition-opacity ${
          accessMap['org-a'].hasAccess ? 'opacity-100' : 'opacity-[0.32]'
        }`}
      >
        <div className="bg-[#39efdd] flex items-center p-[8px] rounded-[8px] shrink-0">
          <HierarchyIconBlack className="w-[16px] h-[16px] shrink-0" />
        </div>
        <p className="font-ibm-plex-mono font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {orgA.name}
        </p>
      </div>

      {/* Folder A Badge */}
      <div
        className={`absolute left-[747px] top-[393px] border border-[#76bdff] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px] transition-opacity ${
          accessMap['folder-a'].hasAccess ? 'opacity-100' : 'opacity-[0.32]'
        }`}
      >
        <div className="bg-[#76bdff] flex items-center p-[8px] rounded-[8px] shrink-0">
          <FolderOpenIconBlack className="w-[16px] h-[16px] shrink-0" />
        </div>
        <p className="font-ibm-plex-mono font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {folderA.name}
        </p>
      </div>

      {/* Folder B Badge */}
      <div
        className={`absolute left-[944px] top-[393px] border border-[#76bdff] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px] transition-opacity ${
          accessMap['folder-b'].hasAccess ? 'opacity-100' : 'opacity-[0.32]'
        }`}
      >
        <div className="bg-[#76bdff] flex items-center p-[8px] rounded-[8px] shrink-0">
          <FolderOpenIconBlack className="w-[16px] h-[16px] shrink-0" />
        </div>
        <p className="font-ibm-plex-mono font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {folderB.name}
        </p>
      </div>

      {/* Document A Badge */}
      <div
        className={`absolute left-[1143px] top-[393px] border border-[#ff7698] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px] transition-opacity ${
          accessMap['doc-a'].hasAccess ? 'opacity-100' : 'opacity-[0.32]'
        }`}
      >
        <div className="bg-[#ff7698] flex items-center p-[8px] rounded-[8px] shrink-0">
          <FileDescriptionIconBlack className="w-[16px] h-[16px] shrink-0" />
        </div>
        <p className="font-ibm-plex-mono font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {docA.name}
        </p>
      </div>

      {/* Document B Badge */}
      <div
        className={`absolute left-[738px] top-[500px] border border-[#ff7698] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px] transition-opacity ${
          accessMap['doc-b'].hasAccess ? 'opacity-100' : 'opacity-[0.32]'
        }`}
      >
        <div className="bg-[#ff7698] flex items-center p-[8px] rounded-[8px] shrink-0">
          <FileDescriptionIconBlack className="w-[16px] h-[16px] shrink-0" />
        </div>
        <p className="font-ibm-plex-mono font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {docB.name}
        </p>
      </div>

      {/* Document C Badge */}
      <div
        className={`absolute left-[935px] top-[500px] border border-[#ff7698] border-solid flex gap-[10px] items-center pl-[8px] pr-[16px] py-[8px] rounded-[16px] transition-opacity ${
          accessMap['doc-c'].hasAccess ? 'opacity-100' : 'opacity-[0.32]'
        }`}
      >
        <div className="bg-[#ff7698] flex items-center p-[8px] rounded-[8px] shrink-0">
          <FileDescriptionIconBlack className="w-[16px] h-[16px] shrink-0" />
        </div>
        <p className="font-ibm-plex-mono font-semibold text-[16px] text-white whitespace-nowrap leading-[1.1]">
          {docC.name}
        </p>
      </div>

      {/* Connection Lines */}
      {/* From Organization A to Folder A - curved line */}
      <svg
        className="absolute left-[819px] top-[300.5px]"
        width="207"
        height="92"
        viewBox="0 0 207 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M206 0V28C206 41.2548 195.255 52 182 52H25C11.7452 52 1 62.7452 1 76V92"
          stroke={accessMap['folder-a'].hasAccess ? '#49CC87' : 'white'}
          strokeOpacity={accessMap['folder-a'].hasAccess ? 1 : 0.32}
          strokeWidth="2"
          strokeDasharray={accessMap['folder-a'].hasAccess ? 'none' : '12 12'}
        />
      </svg>

      {/* From Organization A to Folder B - vertical dashed line */}
      <svg
        className="absolute left-[1024px] top-[315px]"
        width="2"
        height="77"
        viewBox="0 0 2 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0V77"
          stroke={accessMap['folder-b'].hasAccess ? '#49CC87' : 'white'}
          strokeOpacity={accessMap['folder-b'].hasAccess ? 1 : 0.32}
          strokeWidth="2"
          strokeDasharray={accessMap['folder-b'].hasAccess ? 'none' : '12 12'}
        />
      </svg>

      {/* From Folder B area to Document A - curved dashed line */}
      <svg
        className="absolute left-[1024px] top-[352.5px]"
        width="206"
        height="41"
        viewBox="0 0 206 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1H181C194.255 1 205 11.7452 205 25V41"
          stroke={accessMap['doc-a'].hasAccess ? '#49CC87' : 'white'}
          strokeOpacity={accessMap['doc-a'].hasAccess ? 1 : 0.32}
          strokeWidth="2"
          strokeDasharray={accessMap['doc-a'].hasAccess ? 'none' : '12 12'}
        />
      </svg>

      {/* From Folder A to Document B - vertical line */}
      <svg
        className="absolute left-[818px] top-[441px]"
        width="2"
        height="59"
        viewBox="0 0 2 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="59"
          stroke={accessMap['doc-b'].hasAccess ? '#49CC87' : 'white'}
          strokeOpacity={accessMap['doc-b'].hasAccess ? 1 : 0.32}
          strokeWidth="2"
          strokeDasharray={accessMap['doc-b'].hasAccess ? 'none' : '12 12'}
        />
      </svg>

      {/* From Folder B to Document C - vertical line */}
      <svg
        className="absolute left-[1024px] top-[441px]"
        width="2"
        height="59"
        viewBox="0 0 2 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="59"
          stroke={accessMap['doc-c'].hasAccess ? '#49CC87' : 'white'}
          strokeOpacity={accessMap['doc-c'].hasAccess ? 1 : 0.32}
          strokeWidth="2"
          strokeDasharray={accessMap['doc-c'].hasAccess ? 'none' : '12 12'}
        />
      </svg>
    </div>
  )
}
