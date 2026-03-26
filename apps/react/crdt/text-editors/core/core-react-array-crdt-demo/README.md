# Core Array CRDT Demo

## Overview

This demo showcases **real-time collaborative task list editing** using **Velt's core CRDT store** (`useStore`) with `type: 'array'`. Unlike the text CRDT demo (which uses a plain textarea) or editor-framework demos (TipTap, BlockNote, CodeMirror), this example demonstrates how to synchronize structured array data—a list of task objects—using Velt CRDT.

### Why an Array CRDT Demo?

- **Structured data sync**: Shows `useStore` with `type: 'array'` for synchronizing arrays of objects, not just text
- **Minimal dependencies**: Only `@veltdev/crdt-react` and `@veltdev/react`—no editor framework required
- **Live focus via `useLiveState`**: Demonstrates broadcasting which task a user is focused on, with colored indicators
- **Inline comments**: Per-task commenting via `VeltInlineCommentsSection` and page-mode comment sidebar
- **Reference architecture**: A starting point for integrating Velt CRDT into any list-based or structured-data application

**Compared to other CRDT demos:**
- **vs Core Text CRDT**: Array of objects rather than a single text string
- **vs TipTap CRDT**: No rich-text extensions or ProseMirror dependency
- **vs BlockNote CRDT**: No block-level abstractions or Mantine UI
- **vs CodeMirror CRDT**: No CodeMirror view or state management
- **vs ReactFlow CRDT**: List-based rather than canvas/node-based

## Path

```
apps/react/crdt/text-editors/core/core-react-array-crdt-demo/
```

## Package Name

`@apps/react-crdt-text-editors-core-core-react-array-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously add, edit, and delete tasks via Velt's CRDT `useStore` hook with `type: 'array'`
- **Live Focus Indicators**: See which task other users are focused on, with colored border highlights and name labels via `useLiveState`
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic Yjs-based CRDT conflict resolution for simultaneous task mutations

### Task List Features
- **Task CRUD**: Add, edit title/description, change status (Open / In Progress / Resolved), and delete tasks
- **Expandable Rows**: Click a task to expand inline editing of title, description, and status
- **Search & Filter**: Filter tasks by title with a search bar
- **Team Sidebar**: Collapsible sidebar with team list navigation
- **Inline Comments**: Per-task comment modal using `VeltInlineCommentsSection`
- **Comment Sidebar**: Global page-mode comment sidebar with focused-thread support
- **Sync Status Indicator**: Live connection and sync status (Synced / Syncing / Connecting / Disconnected)
- **Dark / Light / System Theme**: Full theme support with URL-param override for embedding

## Directory Structure

```
core-react-array-crdt-demo/
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
│   │   └── TaskListEditor/
│   │       ├── TaskListEditor.tsx      # Array CRDT task list with live focus + comments
│   │       ├── TaskRow.tsx             # Individual task row with expand/edit/delete
│   │       ├── TaskCommentsModal.tsx   # Per-task inline comments modal
│   │       ├── TaskListSidebar.tsx     # Team list navigation sidebar
│   │       ├── constants.ts            # Store ID, initial tasks, team list config
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
- **@veltdev/crdt** + **@veltdev/crdt-react** - Core CRDT store (`useStore` for arrays, `useLiveState` for focus)
- **@veltdev/react** - Velt collaboration components (comments, presence, notifications, huddle)
- **Yjs** - Underlying CRDT implementation
- **Tailwind CSS v3.4** - Styling
- **Inter + Urbanist** - Google Fonts for task list typography
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
cd apps/react/crdt/text-editors/core/core-react-array-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-react-array-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-react-array-crdt-demo build
```

## Usage

### Basic Editing

1. **Add a task**: Click "Add New Task" to create a new task in the list
2. **Edit a task**: Click a task row to expand it, then edit the title, description, or status
3. **Delete a task**: Click the trash icon on an expanded task row

### Collaborative Features

1. **Join session**: Open the same document URL in multiple browsers or incognito windows
2. **See active users**: View avatars of online collaborators via the presence indicator
3. **Live focus**: See which task other users are focused on via colored border highlights
4. **Simultaneous edits**: Multiple users can add, edit, or delete different tasks—CRDT merges all changes automatically
5. **Connection status**: The status dot shows Synced (green), Syncing (yellow), or Disconnected (red)

### Collaboration Features

- **Comments**: Add per-task comments via the comment icon, or use the page-mode comment sidebar
- **Notifications**: Bell icon shows document activity
- **Huddle**: Start audio/video calls with collaborators
- **Sidebar**: Toggle the comments sidebar for a centralized view

## How It Works

### CRDT Array Store

The editor uses Velt's `useStore` hook with `type: 'array'` to create a shared Yjs `Y.Array` document:

```typescript
const {
  value: tasks,
  update: updateTasks,
  store,
  status,
  isSynced,
} = useStore<Task[]>({
  storeId: 'core-crdt-task-list-1',
  type: 'array',
  initialValue: initialTasks,
});
```

Each task mutation calls `updateTasks(newArray)`, which applies a Yjs array diff under the hood. Concurrent edits from multiple users are merged automatically.

### Live Focus Broadcasting

Remote focus state is broadcast via `useLiveState` and rendered as colored task border highlights:

```typescript
const [focuses, setFocuses] = useLiveState<FocusMap>('core-crdt-task-focuses', {}, {
  syncDuration: 100,
  listenToNewChangesOnly: true,
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
