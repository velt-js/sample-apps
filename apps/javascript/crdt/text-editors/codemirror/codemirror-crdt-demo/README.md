# CodeMirror CRDT Demo (Vanilla JavaScript)

> **[🚀 View Live Demo](https://sample-apps-codemirror-non-react-cr.vercel.app/)** | **[🔗 Alt Demo](https://sample-apps-codemirror-non-react-crdt-demo-velt-team-eng.vercel.app/)**

## Overview

This demo showcases **real-time collaborative code editing** built using **CodeMirror 6** with **Velt's CRDT extension** in **vanilla JavaScript** (no React). Multiple users can simultaneously edit code with automatic conflict resolution and live cursor tracking - perfect for pair programming and collaborative code review.

Velt's CRDT extension is based on Yjs. This demo uses `@veltdev/client` and `@veltdev/codemirror-crdt` (the non-React packages) with Vite as the build tool, demonstrating that Velt collaboration works seamlessly outside the React ecosystem.

## Path

```
apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo/
```

## Package Name

`@apps/vanilla-js-CRDT-text-editors-codemirror-codemirror-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users can simultaneously edit code with Velt's CRDT synchronization
- **Presence Awareness**: See who's currently viewing and editing the document
- **Live Cursors**: See collaborators' cursor positions and selections in real-time
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic CRDT-based conflict resolution for simultaneous edits

### Editor Features
- **Syntax Highlighting**: Code highlighting powered by CodeMirror with One Dark theme
- **Rich Code Editing**: Full-featured code editor with CodeMirror 6
- **Multi-language Support**: JavaScript, CSS, and HTML language modes
- **Undo/Redo**: History that respects collaborative changes
- **Extensible**: Built on CodeMirror 6's extension system

## Directory Structure

```
codemirror-crdt-demo/
├── src/
│   ├── main.js                              # Entry point - initializes app
│   ├── lib/
│   │   ├── velt.js                          # Velt client initialization & auth
│   │   ├── user.js                          # User management (demo only)
│   │   └── document.js                      # Document ID management
│   └── components/
│       ├── document/
│       │   ├── codemirror.js                # CodeMirror editor with Velt CRDT
│       │   └── document-canvas.js           # Main layout with file tree
│       ├── header/
│       │   └── header.js                    # Header with Velt tools (presence, notifications)
│       ├── sidebar/
│       │   └── sidebar.js                   # Left navigation sidebar
│       └── velt/
│           ├── index.js                     # Velt component exports
│           ├── velt-collaboration.js         # Velt comments and sidebar setup
│           ├── velt-initialize-user.js       # User initialization helper
│           ├── velt-initialize-document.js   # Document initialization helper
│           ├── velt-tools.js                 # Velt tool web components
│           └── ui-customization/
│               └── styles.css               # Custom Velt theme variables
├── styles/
│   ├── globals.css                          # Global styles (Tailwind)
│   └── codemirror.css                       # CodeMirror editor styles
├── public/                                  # Static assets (icons, figma assets)
├── index.html                               # HTML entry point
├── vite.config.js                           # Vite configuration
├── tailwind.config.js                       # Tailwind configuration
├── postcss.config.js                        # PostCSS configuration
├── tsconfig.json
└── package.json
```

## Key Technologies

- **Vite 5** - Build tool
- **CodeMirror 6** - Code editor
- **@veltdev/client** - Velt SDK for vanilla JavaScript
- **@veltdev/codemirror-crdt** - Velt CRDT extension for CodeMirror
- **y-codemirror.next** - Yjs binding for CodeMirror
- **Yjs** - Underlying CRDT implementation
- **Tailwind CSS v3.4** - Styling

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/javascript/crdt/text-editors/codemirror/codemirror-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-codemirror-codemirror-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-codemirror-codemirror-crdt-demo build
pnpm --filter @apps/vanilla-js-CRDT-text-editors-codemirror-codemirror-crdt-demo preview
```

## Usage

### Basic Editing

1. **Type code**: Click into the editor and start coding
2. **See collaborators**: View other users' cursors in real-time
3. **Edit simultaneously**: Multiple users can code in different parts of the file

### Collaborative Features

1. **Join session**: Open the same document in multiple browsers
2. **See active users**: View avatars of online collaborators in the header
3. **Live cursors**: See where other users are typing in real-time
4. **Simultaneous edits**: Code in different parts of the file simultaneously

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows document activity
- **Real-time updates**: All edits appear instantly for all users

## Troubleshooting

### Velt Not Loading
If Velt features don't appear:
1. Check that the Velt API key is set in `src/lib/velt.js`
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port

### CRDT Sync Issues
If changes aren't syncing:
1. Check browser console for WebSocket errors
2. Verify the `editorId` is unique for your document
3. Ensure multiple users are on the same document ID
4. Test with two unique users on two different browser profiles (e.g., Chrome regular + Chrome incognito, or different browsers)

### Editor Not Loading
If the editor doesn't appear:
1. Check that CodeMirror extensions are loaded correctly
2. Verify the Velt init state resolved before editor creation
3. Ensure `createCollaboration()` completed successfully
4. Check browser console for errors

### Styles Not Applied
If the UI looks unstyled:
1. Run `pnpm install` to ensure Tailwind is installed
2. Check that CSS files are imported in `src/main.js`
3. Verify `vite.config.js` has PostCSS configured

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
- [CodeMirror Documentation](https://codemirror.net/)
- [Velt CodeMirror CRDT Guide](https://docs.velt.dev/live-co-editing/text-editors/codemirror)
