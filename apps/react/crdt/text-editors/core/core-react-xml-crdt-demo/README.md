# Core XML CRDT Mind Map Demo

> **[🚀 View Live Demo](https://sample-apps-core-react-xml-crdt-demo.vercel.app/)**

## Overview

This demo showcases **real-time collaborative mind map editing** using **Velt's core CRDT store** (`useStore`) with `type: 'xml'` for hierarchical data. Unlike the text-based core CRDT demo, this example uses a **Yjs `XmlFragment`** to represent a tree of nodes—demonstrating how Velt CRDT synchronization works with structured, nested data.

### Why an XML / Mind Map Demo?

- **Hierarchical CRDT data**: Shows `useStore` with `type: 'xml'` for tree-structured content (vs `type: 'text'` for flat strings)
- **Live focus via `useLiveState`**: Broadcasts which mind map node each user is focused on, with colored borders and name labels
- **Inline comments per node**: Each node has a comment button that opens a `VeltInlineCommentsSection` modal scoped to that node
- **Pannable + zoomable canvas**: SVG-based mind map with drag-to-pan and scroll-to-zoom

**Compared to other CRDT demos:**
- **vs Core Text CRDT**: Hierarchical XML tree vs flat text string
- **vs TipTap CRDT**: No rich-text editor; visual mind map nodes instead
- **vs BlockNote CRDT**: No block-level abstractions; raw Yjs XmlElement manipulation
- **vs ReactFlow CRDT**: Pure SVG rendering vs ReactFlow's node/edge graph library

## Path

```
apps/react/crdt/text-editors/core/core-react-xml-crdt-demo/
```

## Package Name

`@apps/react-crdt-text-editors-core-core-react-xml-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously add, rename, and delete mind map nodes via Velt's CRDT `useStore` hook with `type: 'xml'`
- **Live Focus**: See which node other users are focused on, with colored borders and name labels
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic Yjs-based CRDT conflict resolution for simultaneous tree mutations

### Editor Features
- **Mind Map Canvas**: Pannable and zoomable SVG canvas with top-down tree layout
- **Node Editing**: Double-click to rename nodes; click + button to add children; trash to delete
- **Per-Node Comments**: Click the comment icon on any node to open an inline comment thread
- **Sync Status Indicator**: Live connection and sync status (Synced / Syncing / Connecting / Disconnected)
- **Store Sidebar**: Collapsible sidebar with multiple store entries
- **Dark / Light / System Theme**: Full theme support with URL-param override for master-sample-app embedding

## Directory Structure

```
core-react-xml-crdt-demo/
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
│   │   └── MindMapEditor/
│   │       ├── MindMapEditor.tsx       # Mind map editor with CRDT XML store + live focus
│   │       ├── MindMapSidebar.tsx      # Store list sidebar (search, sections)
│   │       ├── MindMapCommentsModal.tsx # Per-node inline comment modal
│   │       ├── constants.ts            # Store ID, initial XML content, store items
│   │       ├── types.ts                # TypeScript type definitions
│   │       ├── icons.tsx               # SVG icon components
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
│       ├── VeltCollaboration.tsx       # Velt client setup and configuration
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization with auth provider
│       ├── VeltTools.tsx               # Velt component exports
│       └── useVeltEventHandlers.ts    # Comment tool, bubble, and sidebar event handlers
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
- **@veltdev/crdt** + **@veltdev/crdt-react** - Core CRDT store (`useStore` for XML, `useLiveState` for focus)
- **@veltdev/react** - Velt collaboration components (comments, presence, notifications, huddle)
- **Yjs** - Underlying CRDT implementation (`Y.XmlFragment` / `Y.XmlElement`)
- **Tailwind CSS v3.4** - Styling
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
cd apps/react/crdt/text-editors/core/core-react-xml-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-react-xml-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-react-xml-crdt-demo build
```

## Usage

### Basic Editing

1. **Add nodes**: Click the + button on any node or the + button below the tree
2. **Rename nodes**: Double-click a node to edit its text
3. **Delete nodes**: Hover over a node and click the trash icon
4. **Pan and zoom**: Drag the canvas to pan; scroll to zoom in/out

### Collaborative Features

1. **Join session**: Open the same document URL in multiple browsers or incognito windows
2. **See active users**: View avatars of online collaborators via the presence indicator
3. **Live focus**: See colored borders and name labels on nodes other users are focused on
4. **Simultaneous edits**: Multiple users can add, rename, and delete nodes—CRDT merges all changes automatically
5. **Connection status**: The status dot shows Synced (green), Syncing (yellow), or Disconnected (red)

### Collaboration Features

- **Per-node comments**: Click the comment icon on any node to open an inline comment thread
- **Comments sidebar**: Toggle the sidebar to view all comment threads
- **Notifications**: Bell icon shows document activity
- **Huddle**: Start audio/video calls with collaborators

## How It Works

### CRDT XML Store

The editor uses Velt's `useStore` hook with `type: 'xml'` to create a shared Yjs `XmlFragment` tree:

```typescript
const { store, status, isSynced } = useStore<string>({
  storeId: 'core-crdt-xml-mindmap-1',
  type: 'xml',
});
```

The XML tree is read with `store.getXml()` and mutated inside `doc.transact()` blocks. Each node is a `Y.XmlElement` with `id` and `text` attributes, and children nested inside.

### Live Focus

Remote focus state is broadcast via `useLiveState` to show which node each user is working on:

```typescript
const [focuses, setFocuses] = useLiveState<FocusMap>('core-crdt-xml-focuses', {}, {
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

### Live Focus Not Appearing
If remote focus indicators aren't visible:
1. Focus entries expire after 30 seconds of inactivity—have the remote user click a node
2. Check that `useLiveState` is returning data in browser console

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
