# Core Array CRDT Demo (Vanilla JavaScript)

## Overview

This demo showcases **real-time collaborative task list management** using **Velt's core CRDT store** (`createVeltStore`) with `type: 'array'`. It is a **vanilla JavaScript** implementation—no React, Vue, or any UI framework. All DOM manipulation is done with native browser APIs (`document.createElement`, `addEventListener`, etc.).

### Why a Vanilla JS / Core Array Demo?

- **Zero framework dependency**: Only `@veltdev/crdt` and `@veltdev/client`—no React, Vue, Angular, TipTap, BlockNote, or CodeMirror
- **Transparent CRDT usage**: Shows the raw `createVeltStore` API with `type: 'array'` for array-level conflict resolution
- **Live focus via `getLiveStateSyncElement`**: Demonstrates task focus broadcasting without any editor plugin
- **v2 API reference**: Uses the latest Velt v2 initialization pattern (`initVelt`, `client.identify`, `client.setDocument`, `createVeltStore`)
- **Reference architecture**: A starting point for integrating Velt CRDT array stores into any non-React application

**Compared to other CRDT demos:**
- **vs React Array CRDT**: Same concept but uses imperative DOM instead of React components and hooks
- **vs Core Text CRDT**: Uses `type: 'array'` for structured list data instead of `type: 'text'` for plain text
- **vs TipTap / BlockNote / CodeMirror CRDT**: No rich-text editor dependency

## Path

```
apps/javascript/crdt/text-editors/core/core-non-react-crdt-array-demo/
```

## Package Name

`@apps/vanilla-js-CRDT-text-editors-core-core-non-react-crdt-array-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users simultaneously manage a shared task list via Velt's CRDT `createVeltStore` API
- **Live Focus**: See which task other users are currently focused on, with colored border indicators and name labels
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic Yjs-based CRDT conflict resolution for simultaneous array mutations

### Task List Features
- **Add / Edit / Delete Tasks**: Full CRUD operations on a collaborative task list
- **Status Cycling**: Toggle task status between Open, In Progress, and Resolved
- **Expandable Descriptions**: Click a task row to expand and edit a rich description
- **Search & Filter**: Filter tasks by title with a search bar
- **Team Sidebar**: Collapsible sidebar with team list navigation
- **Sync Status Indicator**: Live connection and sync status (Synced / Syncing / Disconnected)
- **Dark / Light / System Theme**: Full theme support with URL-param override for master-sample-app embedding

## Directory Structure

```
core-non-react-crdt-array-demo/
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
│       │   └── task-list/
│       │       ├── task-list-editor.js    # Task list editor with CRDT array store + live focus
│       │       ├── task-list-sidebar.js   # Team list sidebar with search
│       │       └── constants.js           # Store ID, colors, team lists, initial tasks
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
- **@veltdev/crdt** - Core CRDT store (`createVeltStore` for array)
- **@veltdev/client** - Velt client initialization (`initVelt`, `client.identify`, `client.setDocument`)
- **Yjs** - Underlying CRDT implementation
- **Tailwind CSS v3.4** - Styling
- **Velt Web Components** - `<velt-comments>`, `<velt-comments-sidebar>`, `<velt-presence>`, `<velt-notifications-tool>`, etc.

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/javascript/crdt/text-editors/core/core-non-react-crdt-array-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-core-core-non-react-crdt-array-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-core-core-non-react-crdt-array-demo build
```

## Usage

### Basic Task Management

1. **Add tasks**: Click "Add New Task" to create a new task
2. **Edit titles**: Click a task title to edit it inline
3. **Change status**: Click the status button to cycle between Open / In Progress / Resolved
4. **Expand details**: Click a task row to expand its description area
5. **Delete tasks**: Hover over a task and click the trash icon

### Collaborative Features

1. **Join session**: Open the same document URL in multiple browsers or incognito windows
2. **See active users**: View avatars of online collaborators via the presence indicator
3. **Live focus**: See colored border indicators showing which task other users are focused on
4. **Simultaneous edits**: Add, edit, or delete tasks simultaneously—CRDT merges all changes automatically
5. **Connection status**: The status dot shows Synced (green), Syncing (yellow), or Disconnected (red)

### Collaboration Features

- **Comments**: Add comments on the document
- **Notifications**: Bell icon shows document activity
- **Huddle**: Start audio/video calls with collaborators
- **Sidebar**: Toggle the comments sidebar for a centralized view

## How It Works

### CRDT Array Store

The editor uses Velt's `createVeltStore` API with `type: 'array'` to create a shared Yjs `Y.Array` document:

```javascript
import { createVeltStore } from '@veltdev/crdt';

const store = await createVeltStore({
  id: 'core-crdt-task-list-1',
  type: 'array',
  initialValue: initialTasks,
  veltClient: veltClient,
});

// Read the current array value
const tasks = store.getValue() || [];

// Update the array (add a new task)
const current = store.getValue() || [];
store.update([...current, newTask]);

// Update a task by ID
store.update(current.map(t => t.id === id ? { ...t, ...changes } : t));

// Delete a task by ID
store.update(current.filter(t => t.id !== id));

// Subscribe to changes (local + remote)
store.subscribe((newTasks) => {
  renderTaskList(Array.isArray(newTasks) ? newTasks : []);
});
```

Every mutation calls `store.update(newArray)`, replacing the full array value. The CRDT library handles conflict-free merging with other users' edits automatically.

### Live Task Focus

Remote task focus is broadcast via `getLiveStateSyncElement` and rendered as colored border indicators with user name labels:

```javascript
const liveStateElement = veltClient.getLiveStateSyncElement();

// Broadcast which task the local user is focused on
liveStateElement.setLiveStateData('core-crdt-task-focuses', focusData);

// Listen for remote focus changes
liveStateElement.getLiveStateData('core-crdt-task-focuses', { listenToNewChangesOnly: true })
  .subscribe((data) => {
    renderRemoteFocusIndicators(data);
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
1. Ensure the second user has clicked on a task (focus broadcasts on row click)
2. Focus indicators expire after 30 seconds of inactivity—have the remote user interact with the task list
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
