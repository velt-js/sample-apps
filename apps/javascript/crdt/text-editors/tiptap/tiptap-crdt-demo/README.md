# TipTap CRDT Demo (Vanilla JavaScript)

> **[🚀 View Live Demo](https://sample-apps-tiptap-non-react-crdt-d.vercel.app/)**

## Overview

This demo showcases **real-time collaborative text editing** built using **TipTap** with **Velt's CRDT extension**. Multiple users can simultaneously edit content with automatic conflict resolution, ensuring a smooth collaborative writing experience.

This is a **vanilla JavaScript** implementation — no React, Vue, or Angular. It uses Velt web components and direct DOM manipulation.

Velt's CRDT extension is based on Yjs.

## Path

```
apps/javascript/crdt/text-editors/tiptap/tiptap-crdt-demo/
```

## Package Name

`@apps/vanilla-js-CRDT-text-editors-tiptap-tiptap-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users can simultaneously edit the document with Velt's CRDT synchronization
- **Presence Awareness**: See who's currently viewing and editing the document
- **Live Cursors**: See collaborators' cursor positions in real-time
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic CRDT-based conflict resolution for simultaneous edits

### Editor Features
- **Rich Text Editing**: Full-featured rich text editor powered by TipTap
- **History**: Undo/redo functionality that respects collaborative changes
- **Extensible**: Built on TipTap's powerful extension system

## Directory Structure

```
tiptap-crdt-demo/
├── src/
│   ├── main.js                           # Entry point — init flow, layout, editor
│   ├── lib/
│   │   ├── velt.js                       # Velt client initialization & auth
│   │   ├── user.js                       # Demo user management (localStorage)
│   │   └── document.js                   # Document ID from URL/localStorage
│   └── components/
│       ├── document/
│       │   ├── document-canvas.js        # Main layout wrapper (header, sidebar, editor)
│       │   └── tiptap/
│       │       ├── tiptap.js             # TipTap editor with Velt CRDT (v2 API)
│       │       ├── constants.js          # Initial editor content
│       │       ├── extensions.js         # Custom inline heading marks
│       │       ├── index.js              # Barrel export
│       │       └── ui/
│       │           ├── bubble-menu-toolbar.js  # Formatting toolbar + comment button
│       │           ├── toolbar-button.js       # Toolbar button component
│       │           ├── toolbar-divider.js      # Toolbar divider component
│       │           └── index.js                # Barrel export
│       ├── header/
│       │   └── header.js                 # Header with Velt tools (presence, notifications)
│       ├── sidebar/
│       │   └── sidebar.js                # Table of contents sidebar
│       └── velt/
│           ├── index.js                  # Barrel export
│           ├── velt-collaboration.js     # Velt comments & sidebar web components
│           ├── velt-initialize-document.js # Document initialization wrapper
│           ├── velt-initialize-user.js   # User initialization wrapper
│           ├── velt-tools.js             # Velt tool web components
│           └── ui-customization/
│               └── styles.css            # Custom Velt theme (CSS variables)
├── styles/
│   ├── globals.css                       # Global styles & Tailwind layers
│   └── tiptap.css                        # TipTap editor & collaboration cursor styles
├── public/
│   └── icons/                            # SVG toolbar icons
├── index.html                            # HTML entry point
├── vite.config.js                        # Vite configuration
├── tailwind.config.js                    # Tailwind CSS configuration
├── postcss.config.js                     # PostCSS configuration
├── tsconfig.json                         # TypeScript config (for IDE tooling)
├── .npmrc                                # pnpm config to prevent Tailwind v4 hoisting
└── package.json
```

## Key Technologies

- **Vite** - Build tool and dev server
- **Vanilla JavaScript** - No framework, direct DOM manipulation
- **TipTap 3.x** - Headless rich text editor (core, not @tiptap/react)
- **@veltdev/tiptap-crdt** - Velt CRDT extension for TipTap (v2 API)
- **@veltdev/client** - Velt SDK for vanilla JavaScript
- **@veltdev/tiptap-velt-comments** - TipTap comment integration
- **Yjs** - Underlying CRDT implementation
- **Tailwind CSS v3.4** - Styling
- **Velt Web Components** - `<velt-presence>`, `<velt-comments>`, `<velt-comments-sidebar>`, etc.

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/javascript/crdt/text-editors/tiptap/tiptap-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-tiptap-tiptap-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-tiptap-tiptap-crdt-demo build
```

## Usage

### Basic Editing

1. **Type content**: Click into the editor and start writing
2. **See collaborators**: View other users' cursors in real-time
3. **Edit simultaneously**: Multiple users can type in different parts of the document

### Collaborative Features

1. **Join session**: Open the same document in multiple browsers
2. **See active users**: View avatars of online collaborators in the header
3. **Live cursors**: See where other users are typing in real-time
4. **Simultaneous edits**: Type in different parts of the document simultaneously

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows document activity
- **Real-time updates**: All edits appear instantly for all users

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

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
1. Check that TipTap extensions are loaded correctly
2. Verify `createCollaboration()` resolves before creating the editor
3. Check browser console for TipTap or Velt errors

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

## Important Configuration

### .npmrc File

This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```
public-hoist-pattern[]=*
public-hoist-pattern[]=!@tailwindcss*
```

**Why this matters**:
- This demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration
- Other apps in the monorepo may use Tailwind CSS v4
- Without the `.npmrc`, pnpm would hoist v4 and cause PostCSS build errors

**Do not delete the `.npmrc` file** - it ensures the correct Tailwind version is used.
