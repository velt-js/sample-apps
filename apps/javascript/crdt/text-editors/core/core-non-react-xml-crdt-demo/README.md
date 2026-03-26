# Core XML CRDT Demo (Vanilla JavaScript)

## Overview

This demo showcases **real-time collaborative mind-map editing** using an **SVG canvas** with **Velt's core CRDT store** (`createVeltStore`) and **Yjs XML types** (`Y.XmlFragment`, `Y.XmlElement`). It is a **vanilla JavaScript** implementation—no React, Vue, or any UI framework. All DOM manipulation is done with native browser APIs (`document.createElement`, `addEventListener`, etc.).

### Why a Vanilla JS / Core XML Demo?

- **Zero framework dependency**: Only `@veltdev/crdt`, `@veltdev/client`, and `yjs`—no React, Vue, Angular, TipTap, BlockNote, or CodeMirror
- **XML CRDT usage**: Shows the raw `createVeltStore` API with `type: 'xml'` for tree-structured conflict resolution using `Y.XmlFragment` and `Y.XmlElement`
- **Live focus via `getLiveStateSyncElement`**: Demonstrates per-node focus broadcasting without any editor plugin
- **Inline comments via `velt-inline-comments-section`**: Shows per-node comment threads in a modal overlay
- **v2 API reference**: Uses the latest Velt v2 initialization pattern (`initVelt`, `client.identify`, `client.setDocument`, `createVeltStore`)
- **Reference architecture**: A starting point for integrating Velt CRDT XML stores into any non-React application or custom tree editor

**Compared to other CRDT demos:**
- **vs React Core XML CRDT**: Same concept but uses imperative DOM instead of React components and hooks
- **vs Core Text CRDT**: Uses `type: 'xml'` for tree data instead of `type: 'text'` for plain text
- **vs TipTap CRDT**: No rich-text extensions or ProseMirror dependency
- **vs BlockNote CRDT**: No block-level abstractions or Mantine UI

## Path

```
apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo/
```

## Package Name

`@apps/vanilla-js-CRDT-text-editors-core-core-non-react-xml-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously edit a shared mind-map tree via Velt's CRDT `createVeltStore` API with `type: 'xml'`
- **Live Focus Indicators**: Remote user focus on specific nodes rendered as colored borders with name labels
- **Inline Comments**: Per-node comment threads via `velt-inline-comments-section` with unread badges
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic Yjs-based CRDT conflict resolution for simultaneous tree edits

### Editor Features
- **Interactive Mind Map**: Pannable/zoomable SVG canvas with tree layout and rounded connector paths
- **Inline Node Editing**: Double-click any node to edit text in place
- **Add/Delete Nodes**: Hover buttons for adding child nodes or deleting existing ones
- **Sync Status Indicator**: Live connection and sync status (Synced / Connecting)
- **Collapsible Store Sidebar**: Switch between different store documents
- **Dark / Light / System Theme**: Full theme support with URL-param override for master-sample-app embedding

## Directory Structure

```
core-non-react-xml-crdt-demo/
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
│       │   └── mind-map/
│       │       ├── mind-map-editor.js     # Mind map SVG editor with XML CRDT + live focus
│       │       ├── mind-map-sidebar.js    # Collapsible store/document sidebar
│       │       └── constants.js           # Store config, initial XML tree, sidebar items
│       ├── header/
│       │   ├── header.js                  # Header with theme toggle + Velt tools
│       │   └── theme-toggle.js            # Light / Dark / System toggle
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
- **@veltdev/crdt** - Core CRDT store (`createVeltStore` for XML)
- **@veltdev/client** - Velt client initialization (`initVelt`, `client.identify`, `client.setDocument`)
- **Yjs** - Underlying CRDT implementation (`Y.XmlFragment`, `Y.XmlElement`)
- **Tailwind CSS v3.4** - Styling
- **Velt Web Components** - `<velt-comments>`, `<velt-inline-comments-section>`, `<velt-presence>`, `<velt-notifications-tool>`, etc.

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/javascript/crdt/text-editors/core/core-non-react-xml-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-core-core-non-react-xml-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-core-core-non-react-xml-crdt-demo build
```

## Usage

### Basic Editing

1. **Navigate the mind map**: Pan by dragging the canvas, zoom with the scroll wheel
2. **Edit node text**: Double-click any node to edit its text inline
3. **Add child nodes**: Hover over a node and click the + button
4. **Delete nodes**: Hover over a node and click the trash button

### Collaborative Features

1. **Join session**: Open the same document URL in multiple browsers or incognito windows
2. **See active users**: View avatars of online collaborators via the presence indicator
3. **Live focus**: See colored borders showing which node each remote user is focused on
4. **Simultaneous edits**: Edit different nodes simultaneously—CRDT merges all changes automatically
5. **Node comments**: Click the comment icon on any node to open a threaded comment dialog
6. **Connection status**: The status dot shows Synced (green) or Connecting (yellow)

### Collaboration Features

- **Comments**: Add inline comments on specific mind-map nodes via popover mode
- **Comments Sidebar**: Toggle the comments sidebar for a centralized view
- **Notifications**: Bell icon shows document activity
- **Huddle**: Start audio/video calls with collaborators

## How It Works

### CRDT XML Store

The editor uses Velt's `createVeltStore` API with `type: 'xml'` to create a shared Yjs `Y.XmlFragment` document:

```javascript
import { createVeltStore } from '@veltdev/crdt';
import * as Y from 'yjs';

const store = await createVeltStore({
  id: 'core-crdt-xml-mindmap-1',
  type: 'xml',
  veltClient: veltClient,
});

// Get the XML fragment for direct Yjs manipulation
const xml = store.getXml();

// Populate with initial content if empty
if (xml.length === 0) {
  const doc = store.getDoc();
  doc.transact(() => {
    const root = new Y.XmlElement('node');
    root.setAttribute('id', 'root');
    root.setAttribute('text', 'Root Node');
    xml.insert(0, [root]);
  });
}

// Subscribe to changes (local + remote)
store.subscribe(() => {
  const tree = xmlToTree(xml);
  renderTree(tree);
});
```

All tree mutations use fine-grained Yjs APIs (`setAttribute`, `insert`, `delete`) for optimal CRDT merge behavior.

### Live Focus

Remote user focus is broadcast via `getLiveStateSyncElement` and rendered as colored node borders with name labels:

```javascript
const liveStateElement = veltClient.getLiveStateSyncElement();

// Broadcast which node the local user clicked
liveStateElement.setLiveStateData('core-crdt-xml-focuses', focusData);

// Listen for remote focus changes
liveStateElement.getLiveStateData('core-crdt-xml-focuses', { listenToNewChangesOnly: true })
  .subscribe((data) => {
    renderRemoteFocuses(data);
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

### Live Focus Not Appearing
If remote focus indicators aren't visible:
1. Ensure the second user has clicked on a node (focus broadcasts on click events)
2. Focus indicators expire after 30 seconds of inactivity—have the remote user interact with a node
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
- [Documentation](https://docs.velt.dev/get-started/overview) - Guides and API references
- [Use Cases](https://velt.dev/use-case) - See collaboration in action
- [Figma Template](https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit) - Visualize features for your product
- [Release Notes](https://docs.velt.dev/release-notes/version-4/sdk-changelog) - Latest changes
- [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- [X/Twitter](https://x.com/veltjs) - Updates and announcements
- [Velt CRDT Guide](https://docs.velt.dev/live-co-editing/overview)
