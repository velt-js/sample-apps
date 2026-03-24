# Core CRDT Demo

> **[🚀 View Live Demo](https://sample-apps-core-react-crdt-demo.vercel.app/)** | **[🔗 Alt Demo](https://sample-apps-core-react-crdt-demo-velt-team-eng.vercel.app/)**

## Overview

This demo showcases **real-time collaborative text editing** using a **plain textarea** with **Velt's core CRDT store** (`useStore`). Unlike editor-framework demos (TipTap, BlockNote, CodeMirror), this example intentionally avoids third-party editor libraries to illustrate how Velt CRDT synchronization works at the lowest level—directly on a text string.

### Why a Core / Textarea Demo?

- **Minimal dependencies**: Only `@veltdev/crdt-react` and `@veltdev/react`—no TipTap, BlockNote, or CodeMirror
- **Transparent CRDT usage**: Shows the raw `useStore` hook with `type: 'text'` for character-level conflict resolution
- **Live cursors via `useLiveState`**: Demonstrates cursor broadcasting without any editor plugin—purely geometric position mapping
- **Reference architecture**: A starting point for integrating Velt CRDT into any custom editor or input surface

**Compared to other CRDT demos:**
- **vs TipTap CRDT**: No rich-text extensions or ProseMirror dependency
- **vs BlockNote CRDT**: No block-level abstractions or Mantine UI
- **vs CodeMirror CRDT**: No CodeMirror view or state management
- **vs ReactFlow CRDT**: Text-based rather than canvas/node-based

## Path

```
apps/react/crdt/text-editors/core/core-crdt-demo/
```

## Package Name

`@apps/react-crdt-text-editors-core-core-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously edit a shared plain-text document via Velt's CRDT `useStore` hook
- **Live Cursors**: Remote cursor positions and text selections rendered as colored carets and highlight overlays using a hidden mirror `<div>` for pixel-position measurement
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic Yjs-based CRDT conflict resolution for simultaneous character-level edits

### Editor Features
- **Plain Textarea**: Zero-dependency editing surface—just a `<textarea>` with CRDT-backed state
- **Sync Status Indicator**: Live connection and sync status (Synced / Syncing / Connecting / Disconnected)
- **Table of Contents Sidebar**: Collapsible sidebar with section-based navigation
- **Dark / Light / System Theme**: Full theme support with URL-param override for master-sample-app embedding

## Directory Structure

```
core-crdt-demo/
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
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Table of contents sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── CoreEditor/
│   │       ├── CoreEditor.tsx          # Core textarea editor with CRDT + live cursors
│   │       ├── constants.ts            # Initial content and section heading config
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
- **@veltdev/crdt** + **@veltdev/crdt-react** - Core CRDT store (`useStore` for text, `useLiveState` for cursors)
- **@veltdev/react** - Velt collaboration components (comments, presence, notifications, huddle)
- **Yjs** - Underlying CRDT implementation
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
cd apps/react/crdt/text-editors/core/core-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-crdt-text-editors-core-core-crdt-demo build
```

## Usage

### Basic Editing

1. **Type content**: Click into the textarea and start writing
2. **See collaborators**: View other users' cursors and selections in real-time
3. **Edit simultaneously**: Multiple users can type in different parts of the document

### Collaborative Features

1. **Join session**: Open the same document URL in multiple browsers or incognito windows
2. **See active users**: View avatars of online collaborators via the presence indicator
3. **Live cursors**: See colored carets and selection highlights for each remote user
4. **Simultaneous edits**: Type at different positions—CRDT merges all changes automatically
5. **Connection status**: The status dot shows Synced (green), Syncing (yellow), or Disconnected (red)

### Collaboration Features

- **Comments**: Add popover comments on the document
- **Notifications**: Bell icon shows document activity
- **Huddle**: Start audio/video calls with collaborators
- **Sidebar**: Toggle the comments sidebar for a centralized view

## How It Works

### CRDT Text Store

The editor uses Velt's `useStore` hook with `type: 'text'` to create a shared Yjs `Y.Text` document:

```typescript
const { value: text, update: updateText, status, isSynced } = useStore<string>({
  storeId: 'core-crdt-notepad-1',
  type: 'text',
  initialValue: initialContent,
});
```

Every keystroke calls `updateText(newValue)`, which applies a Yjs text diff under the hood. Concurrent edits from multiple users are merged automatically.

### Live Cursors

Remote cursor positions are broadcast via `useLiveState` and rendered by measuring character offsets in a hidden mirror `<div>` that replicates the textarea's styling:

```typescript
const [cursors, setCursors] = useLiveState<CursorMap>('core-crdt-cursors', {}, {
  syncDuration: 50,
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

### Live Cursors Not Appearing
If remote cursors aren't visible:
1. Ensure the second user has focus on the textarea (cursors broadcast on selection/click/keyup events)
2. Cursors expire after 30 seconds of inactivity—have the remote user interact with the editor
3. Check that `useLiveState` is returning data in browser console

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
