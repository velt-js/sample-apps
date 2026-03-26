# Core CRDT Demo (Vanilla JavaScript)

> **[🚀 View Live Demo](https://sample-apps-core-non-react-crdt-dem.vercel.app/)** | **[🔗 Alt Demo](https://sample-apps-core-non-react-crdt-demo-velt-team-eng.vercel.app/)**

## Overview

This demo showcases **real-time collaborative text editing** using a **plain textarea** with **Velt's core CRDT store** (`createVeltStore`). It is a **vanilla JavaScript** implementation—no React, Vue, or any UI framework. All DOM manipulation is done with native browser APIs (`document.createElement`, `addEventListener`, etc.).

### Why a Vanilla JS / Core Textarea Demo?

- **Zero framework dependency**: Only `@veltdev/crdt` and `@veltdev/client`—no React, Vue, Angular, TipTap, BlockNote, or CodeMirror
- **Transparent CRDT usage**: Shows the raw `createVeltStore` API with `type: 'text'` for character-level conflict resolution
- **Live cursors via `getLiveStateSyncElement`**: Demonstrates cursor broadcasting without any editor plugin—purely geometric position mapping
- **v2 API reference**: Uses the latest Velt v2 initialization pattern (`initVelt`, `client.identify`, `client.setDocument`, `createVeltStore`)
- **Reference architecture**: A starting point for integrating Velt CRDT into any non-React application or custom editor surface

**Compared to other CRDT demos:**
- **vs React Core CRDT**: Same concept but uses imperative DOM instead of React components and hooks
- **vs TipTap CRDT**: No rich-text extensions or ProseMirror dependency
- **vs BlockNote CRDT**: No block-level abstractions or Mantine UI
- **vs CodeMirror CRDT**: No CodeMirror view or state management

## Path

```
apps/javascript/crdt/text-editors/core/core-crdt-demo/
```

## Package Name

`@apps/vanilla-js-CRDT-text-editors-core-core-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously edit a shared plain-text document via Velt's CRDT `createVeltStore` API
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
├── src/
│   ├── main.js                            # Entry point: Velt init, user auth, document setup, layout
│   ├── lib/
│   │   ├── velt.js                        # Velt client initialization + JWT token generation
│   │   ├── user.js                        # User management (random user generation for demo)
│   │   ├── document.js                    # Document ID management (URL param + localStorage)
│   │   └── theme.js                       # Theme management (light/dark/system + postMessage)
│   └── components/
│       ├── document/
│       │   ├── document-canvas.js         # Main document layout wrapper
│       │   └── core-editor/
│       │       ├── core-editor.js         # Core textarea editor with CRDT + live cursors
│       │       └── constants.js           # Initial content and section heading config
│       ├── header/
│       │   ├── header.js                  # Header with theme toggle + Velt tools
│       │   └── theme-toggle.js            # Light / Dark / System toggle
│       ├── sidebar/
│       │   └── sidebar.js                 # Table of contents sidebar
│       └── velt/
│           ├── index.js                   # Barrel exports
│           ├── velt-collaboration.js      # Velt comments + sidebar web components
│           ├── velt-tools.js              # Velt presence, sidebar button, notifications, huddle
│           └── ui-customization/
│               └── styles.css             # Custom Velt styles
├── public/
│   └── icons/
│       └── chevron-left-pipe.svg          # Sidebar expand/collapse icon
├── styles/
│   └── globals.css                        # Global styles with CSS variables
├── index.html                             # HTML entry point
├── vite.config.js                         # Vite bundler configuration
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Key Technologies

- **Vite 5** - Fast development server and bundler
- **Vanilla JavaScript** - No UI framework; all DOM is imperative
- **@veltdev/crdt** - Core CRDT store (`createVeltStore` for text)
- **@veltdev/client** - Velt client initialization (`initVelt`, `client.identify`, `client.setDocument`)
- **Yjs** - Underlying CRDT implementation
- **Tailwind CSS v3.4** - Styling
- **Velt Web Components** - `<velt-comments>`, `<velt-presence>`, `<velt-notifications-tool>`, etc.

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/javascript/crdt/text-editors/core/core-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-core-core-crdt-demo dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-core-core-crdt-demo build
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

The editor uses Velt's `createVeltStore` API with `type: 'text'` to create a shared Yjs `Y.Text` document:

```javascript
import { createVeltStore } from '@veltdev/crdt';

const store = await createVeltStore({
  id: 'core-crdt-notepad-1',
  type: 'text',
  initialValue: initialContent,
  veltClient: veltClient,
});

// Read the current value
const text = store.getValue();

// Update the text
store.update(newText);

// Subscribe to changes (local + remote)
store.subscribe((newText) => {
  textarea.value = newText;
});
```

Every keystroke calls `store.update(newValue)`, which applies a Yjs text diff under the hood. Concurrent edits from multiple users are merged automatically.

### Live Cursors

Remote cursor positions are broadcast via `getLiveStateSyncElement` and rendered by measuring character offsets in a hidden mirror `<div>` that replicates the textarea's styling:

```javascript
const liveStateElement = veltClient.getLiveStateSyncElement();

// Broadcast local cursor position
liveStateElement.setLiveStateData('core-crdt-cursors', cursorData);

// Listen for remote cursor changes
liveStateElement.getLiveStateData('core-crdt-cursors', { listenToNewChangesOnly: true })
  .subscribe((data) => {
    renderRemoteCursors(data);
  });
```

### Velt Initialization (v2 API)

The app follows the v2 initialization sequence using `@veltdev/client`:

```javascript
import { initVelt } from '@veltdev/client';

const client = await initVelt('YOUR_API_KEY');
await client.identify(user, { authToken: token });
client.setDocument(documentId, { documentName });

client.getVeltInitState().subscribe((isReady) => {
  if (isReady) {
    // Safe to create CRDT stores
  }
});
```

## Troubleshooting

### Velt Not Loading
If Velt features don't appear:
1. Check that the API key is set in `src/lib/velt.js`
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
3. Check that `getLiveStateSyncElement` is returning data in browser console

### Yjs Duplicate Instance Errors
If you see "Yjs was already imported" warnings:
1. Verify `vite.config.js` has appropriate resolve aliases if needed
2. Run `pnpm install` from the monorepo root to ensure correct deduplication
3. Clear the Vite cache and restart the dev server

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/client">
  <img src="https://img.shields.io/npm/v/@veltdev/client?style=flat&label=npm&color=09f" alt="NPM" />
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
