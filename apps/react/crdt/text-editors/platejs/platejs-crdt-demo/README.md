# PlateJS CRDT Demo

## Overview

This demo showcases **real-time collaborative text editing** built using **PlateJS** with **Velt's CRDT extension**. Multiple users can simultaneously edit content with automatic conflict resolution, ensuring a smooth collaborative writing experience.

Velt's CRDT extension is based on Yjs.

## Path

```
apps/react/crdt/text-editors/platejs/platejs-crdt-demo/
```

## Package Name

`@apps/react-crdt-text-editors-platejs-platejs-crdt-demo`

## Features

### Real-time Collaboration
- **Live Co-editing**: Multiple users can simultaneously edit the document with Velt's CRDT synchronization
- **Presence Awareness**: See who's currently viewing and editing the document
- **Live Cursors**: See collaborators' cursor positions in real-time
- **Notifications**: Stay updated on document activity
- **Conflict Resolution**: Automatic CRDT-based conflict resolution for simultaneous edits

### Editor Features
- **Rich Text Editing**: Full-featured rich text editor powered by PlateJS
- **History**: Undo/redo functionality that respects collaborative changes
- **Extensible**: Built on PlateJS's powerful plugin system

## Directory Structure

```
platejs-crdt-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts            # Velt JWT token generation endpoint
│   ├── document/
│   │   ├── DocumentContext.tsx         # Document context provider
│   │   └── useCurrentDocument.ts       # Document management hook
│   ├── userAuth/
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   ├── useAppUser.ts               # User authentication hook
│   │   └── AppProviders.tsx            # App providers wrapper
│   ├── layout.tsx                      # Root layout with Velt provider
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── PlateComponent/
│   │       ├── PlateComponent.tsx      # Main PlateJS editor with Velt CRDT
│   │       ├── constants.ts            # Editor configuration constants
│   │       ├── types.ts                # TypeScript type definitions
│   │       └── ui/
│   │           ├── BubbleMenuToolbar.tsx # Floating formatting toolbar
│   │           ├── ToolbarButton.tsx    # Toolbar button component
│   │           └── ToolbarDivider.tsx   # Toolbar divider component
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Custom notifications wireframe
│       │   └── styles.css              # Custom Velt styles
│       ├── VeltCollaboration.tsx       # Velt client setup and configuration
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── public/                             # Static assets
├── styles/
│   └── globals.css                     # Global styles
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **PlateJS** - Rich text editor built on Slate
- **@veltdev/plate-crdt-react** - Velt CRDT extension for PlateJS
- **@veltdev/plate-comments-react** - Velt comments extension for PlateJS
- **@veltdev/react** - Velt collaboration components
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
cd apps/react/crdt/text-editors/platejs/platejs-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-crdt-text-editors-platejs-platejs-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-crdt-text-editors-platejs-platejs-crdt-demo build
```

## Usage

### Basic Editing

1. **Type content**: Click into the editor and start writing
2. **See collaborators**: View other users' cursors in real-time
3. **Edit simultaneously**: Multiple users can type in different parts of the document

### Collaborative Features

1. **Join session**: Open the same document in multiple browsers
2. **Switch users**: Use the login panel to switch between test users
3. **See active users**: View avatars of online collaborators in the header
4. **Live cursors**: See where other users are typing in real-time
5. **Simultaneous edits**: Type in different parts of the document simultaneously

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
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in your environment
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
1. Check that PlateJS plugins are loaded correctly
2. Verify collaboration config is available before editor initialization
3. Ensure `isLoading` is false before rendering editor
4. Check browser console for PlateJS errors

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
