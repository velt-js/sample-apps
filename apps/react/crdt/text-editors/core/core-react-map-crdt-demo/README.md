# Core Map CRDT Demo

## Overview

This demo showcases **real-time collaborative key-value editing** using **Velt's core CRDT store** (`useStore`) with `type: 'map'`. Unlike the text CRDT demo (which uses a plain textarea) or the array CRDT demo (which synchronizes a task list), this example demonstrates how to synchronize a `Record<string, string>` map—a set of key-value pairs—using Velt CRDT.

### Why a Map CRDT Demo?

- **Key-value data sync**: Shows `useStore` with `type: 'map'` for synchronizing string-to-string maps, not text or arrays
- **Minimal dependencies**: Only `@veltdev/crdt-react` and `@veltdev/react`—no editor framework required
- **Drag-and-drop reordering**: Synced key order via `useLiveState` so reordering is shared across users
- **Live focus via `useLiveState`**: Demonstrates broadcasting which entry a user is focused on, with colored indicators
- **Inline comments**: Per-entry commenting via `VeltInlineCommentsSection` and page-mode comment sidebar
- **Reference architecture**: A starting point for integrating Velt CRDT into any key-value or settings-based application

**Compared to other CRDT demos:**
- **vs Core Text CRDT**: Map of key-value pairs rather than a single text string
- **vs Core Array CRDT**: Flat key-value pairs rather than an array of structured task objects
- **vs TipTap CRDT**: No rich-text extensions or ProseMirror dependency
- **vs BlockNote CRDT**: No block-level abstractions or Mantine UI
- **vs CodeMirror CRDT**: No CodeMirror view or state management
- **vs ReactFlow CRDT**: Key-value based rather than canvas/node-based

## Path

```
apps/react/crdt/text-editors/core/core-react-map-crdt-demo/
```

## Package Name

`@apps/react-crdt-text-editors-core-core-react-map-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously add, edit, rename, and delete key-value entries via Velt's CRDT `useStore` hook with `type: 'map'`
- **Live Focus Indicators**: See which entry other users are focused on, with colored border highlights and name labels via `useLiveState`
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic Yjs-based CRDT conflict resolution for simultaneous map mutations

### Map Store Features
- **Entry CRUD**: Add, rename keys, edit values, and delete key-value entries
- **Drag-and-Drop Reordering**: Reorder entries with drag handles; order is synced across users via `useLiveState`
- **Store Sidebar**: Collapsible sidebar with store list navigation
- **Inline Comments**: Per-entry comment modal using `VeltInlineCommentsSection`
- **Comment Sidebar**: Global page-mode comment sidebar with focused-thread support
- **Sync Status Indicator**: Live connection and sync status (Synced / Syncing / Connecting / Disconnected)
- **Dark / Light / System Theme**: Full theme support with URL-param override for embedding

## Directory Structure

```
core-react-map-crdt-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts            # Velt JWT token generation endpoint
│   ├── document/
│   │   ├── DocumentContext.tsx         # Document context provider
│   │   └── useCurrentDocument.ts       # Document management hook
│   ├── userAuth/
│   │   ├── AppProviders.tsx            # App-level providers wrapper
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   └── useAppUser.ts               # User authentication hook
│   ├── layout.tsx                      # Root layout with app providers
│   └── page.tsx                        # Main page with Velt provider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, notifications)
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── MapStoreEditor/
│   │       ├── MapStoreEditor.tsx      # Map CRDT editor with live focus + comments
│   │       ├── MapEntryRow.tsx         # Individual key-value row with drag, edit, delete
│   │       ├── MapCommentsModal.tsx    # Per-entry inline comments modal
│   │       ├── MapStoreSidebar.tsx     # Store list navigation sidebar
│   │       ├── constants.ts            # Store ID, initial map data, store list config
│   │       ├── icons.tsx               # SVG icon components
│   │       ├── types.ts                # TypeScript type definitions
│   │       └── index.ts                # Barrel export
│   ├── theme/
│   │   ├── ThemeContext.tsx            # Theme provider with URL-param support
│   │   └── ThemeToggle.tsx            # Light / Dark / System toggle
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCommentBubbleWf.tsx # Customized comment bubble wireframe
│       │   ├── VeltCommentToolWf.tsx   # Customized comment tool wireframe
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Customized notifications wireframe
│       │   ├── VeltSidebarButtonWf.tsx # Customized sidebar button wireframe
│       │   └── styles.css              # Custom Velt styles
│       ├── useVeltEventHandlers.ts    # Velt comment/sidebar event handler hooks
│       ├── VeltCollaboration.tsx       # Velt client setup and configuration
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization with auth provider
│       └── VeltTools.tsx               # Velt component exports
├── public/
│   └── icons/                          # SVG icons for toolbar and sidebar
├── styles/
│   └── globals.css                     # Global styles with CSS variables
├── next.config.js                      # Webpack alias for Yjs deduplication
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **@veltdev/crdt** + **@veltdev/crdt-react** - Core CRDT store (`useStore` for maps, `useLiveState` for focus and key order)
- **@veltdev/react** - Velt collaboration components (comments, presence, notifications, huddle)
- **Yjs** - Underlying CRDT implementation
- **Tailwind CSS v3.4** - Styling
- **Inter + Urbanist** - Google Fonts for map store typography
- **TypeScript** - Type safety

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/crdt/text-editors/core/core-react-map-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-react-map-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-react-map-crdt-demo build
```

## Usage

### Basic Editing

1. **Add an entry**: Click the + button to create a new key-value pair
2. **Edit an entry**: Click a key or value field to edit it inline, then blur or press Enter to save
3. **Rename a key**: Edit the key field directly; the old key is removed and the new key is created
4. **Delete an entry**: Hover over a row and click the trash icon
5. **Reorder entries**: Drag rows using the grip handle to reorder; order is synced across users

### Collaborative Features

1. **Join session**: Open the same document URL in multiple browsers or incognito windows
2. **See active users**: View avatars of online collaborators via the presence indicator
3. **Live focus**: See which entry other users are focused on via colored border highlights
4. **Simultaneous edits**: Multiple users can add, edit, or delete different entries—CRDT merges all changes automatically
5. **Connection status**: The status dot shows Synced (green), Syncing (yellow), or Disconnected (red)

### Collaboration Features

- **Comments**: Add per-entry comments via the comment icon, or use the page-mode comment sidebar
- **Notifications**: Bell icon shows document activity
- **Huddle**: Start audio/video calls with collaborators
- **Sidebar**: Toggle the comments sidebar for a centralized view

## How It Works

### CRDT Map Store

The editor uses Velt's `useStore` hook with `type: 'map'` to create a shared Yjs `Y.Map` document:

```typescript
const {
  value: entries,
  update: updateEntries,
  store,
  status,
  isSynced,
} = useStore<Record<string, string>>({
  storeId: 'core-crdt-map-store-1',
  type: 'map',
  initialValue: initialMapData,
});
```

Each mutation calls `updateEntries(newMap)`, which applies a Yjs map diff under the hood. Concurrent edits from multiple users are merged automatically.

### Synced Key Order

Entry order is broadcast via `useLiveState` so drag-and-drop reordering is shared across users:

```typescript
const [keyOrder, setKeyOrder] = useLiveState<string[]>('core-crdt-map-key-order', [], {
  syncDuration: 100,
});
```

## Troubleshooting

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in `app/page.tsx`
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port

### CRDT Sync Issues
If changes aren't syncing:
1. Check browser console for WebSocket errors
2. Verify the `storeId` is the same for all users
3. Ensure multiple users are on the same document ID
4. Test with two unique users on different browser profiles (e.g., Chrome regular + incognito)

### Yjs Duplicate Instance Errors
If you see "Yjs was already imported" warnings:
1. Verify `next.config.js` has the webpack `resolve.alias` for `yjs`, `y-protocols`, and `lib0`
2. Run `pnpm install` from the monorepo root to ensure correct deduplication
3. Clear `.next` cache and restart the dev server

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

The SDK provides **fullstack components**:
- UI and behavior are fully customizable to match your product's needs
- Fully-managed on a scalable realtime backend

**Features include:**
- **Comments** like Figma, Frame.io, Google Docs, Sheets and more
- **Recording** like Loom (audio, video, screen)
- **Huddle** like Slack (audio, video, screensharing)
- In-app and off-app **notifications**
- **@mentions** and assignment
- **Presence**, **Cursors**, **Live Selection**
- **Live state sync** with Single Editor mode
- **Multiplayer editing** with conflict resolution
- **Follow mode** like Figma
- ... and so much more

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview) - Guides and API references
- 🎨 [Use Cases](https://velt.dev/use-case) - See collaboration in action
- 🎭 [Figma Template](https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit) - Visualize features for your product
- 📝 [Release Notes](https://docs.velt.dev/release-notes/version-4/sdk-changelog) - Latest changes
- 🔒 [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- 🐦 [X/Twitter](https://x.com/veltjs) - Updates and announcements
- [Velt CRDT Guide](https://docs.velt.dev/live-co-editing/overview)
