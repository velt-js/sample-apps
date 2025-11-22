# TipTap CRDT Demo

> **[🚀 View Live Demo](https://sample-apps-tiptap-crdt-demo.vercel.app/)**


https://github.com/user-attachments/assets/ba757155-087d-4c1f-9d80-47b72d29ca9b


## Overview

This demo showcases **real-time collaborative text editing** built using **TipTap** with **Velt's CRDT extension**. Multiple users can simultaneously edit content with automatic conflict resolution, ensuring a smooth collaborative writing experience.

Velt's CRDT extension is based on Yjs.

## Path

```
apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo/
```

## Package Name

`@apps/react-crdt-text-editors-tiptap-tiptap-crdt-demo`

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
│   │   ├── LoginPanel.tsx              # User login panel component
│   │   ├── useAppUser.ts               # User authentication hook
│   │   └── users.ts                    # Mock user data
│   ├── layout.tsx                      # Root layout with Velt provider
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── TipTapComponent/
│   │       ├── TipTapComponent.tsx     # Main TipTap editor with Velt CRDT
│   │       ├── constants.ts            # Editor configuration constants
│   │       └── types.ts                # TypeScript type definitions
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Custom notifications wireframe
│       │   └── styles.css              # Custom Velt styles
│       ├── VeltCollaboration.tsx       # Velt client setup and configuration
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/                             # Static assets
├── styles/
│   └── globals.css                     # Global styles
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **TipTap 2.x** - Headless rich text editor
- **@veltdev/tiptap-crdt** - Velt CRDT extension for TipTap
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
cd apps/react/crdt/text-editors/tiptap/tiptap-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-crdt-text-editors-tiptap-tiptap-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-crdt-text-editors-tiptap-tiptap-crdt-demo build
```

## Implementation Details

### Application Architecture

The application is structured around several key areas:

**User Authentication** (`app/userAuth/`)
- `AppUserContext` provides user state across the application
- `useAppUser` hook manages user selection and authentication
- `LoginPanel` allows switching between mock users for testing collaboration
- Mock user data simulates multi-user scenarios

**Document Management** (`app/document/`)
- `DocumentContext` manages the current document state
- `useCurrentDocument` hook provides document access and switching capabilities
- Documents represent separate collaborative editing sessions

**JWT Token Generation** (`app/api/velt/token/`)
- Backend route generates secure JWT tokens for Velt authentication
- Integrates with Velt's Auth Provider approach

**TipTap Editor** (`components/document/TipTapComponent/`)
- Main editor component with Velt CRDT integration
- Configured with collaborative editing extensions
- Real-time synchronization across all users

### Velt CRDT Integration

The core integration uses the `useVeltTipTapCrdtExtension` hook:

```tsx
const { collaborationConfig, isLoading } = useVeltTipTapCrdtExtension({
  editorId: 'tiptap-crdt-demo-editor',
  initialContent: '<p>Start typing...</p>'
});

const editor = useEditor({
  extensions: [
    StarterKit,
    Collaboration.configure(collaborationConfig),
    CollaborationCursor.configure(collaborationConfig.cursorConfig),
  ],
  content: collaborationConfig.initialContent,
}, [collaborationConfig]);
```

This hook provides:
- Real-time synchronized editor state across all connected users
- Automatic conflict resolution when multiple users edit simultaneously
- CRDT-based state management for collaborative editing
- Awareness protocol for showing collaborator cursors and selections
- Undo/redo functionality that respects collaborative changes

### Collaborative Editing Flow

**How it works:**
1. The `useVeltTipTapCrdtExtension` hook initializes a Yjs document for CRDT synchronization
2. It connects to Velt's WebSocket backend for real-time updates
3. TipTap's Collaboration extension is configured with Yjs bindings
4. All editor changes are synced via the CRDT network
5. Conflicts are resolved automatically using Yjs's operational transformation
6. Collaborator cursors and selections are shared in real-time

**Key Features:**
- **Live Updates**: Changes appear instantly for all users
- **Cursor Tracking**: See where each collaborator is typing
- **Selection Sharing**: View text selections of other users
- **Conflict-Free**: Yjs CRDT ensures all users converge to the same state

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom notification panel styling
- Theme-matched Velt components
- Custom CSS for collaboration UI

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
1. Check that TipTap extensions are loaded correctly
2. Verify collaboration config is available before editor initialization
3. Ensure `isLoading` is false before rendering editor
4. Check browser console for TipTap errors

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
- 📝 [Release Notes](https://docs.velt.dev/release-notes/) - Latest changes
- 🔒 [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- 🐦 [X/Twitter](https://x.com/veltjs) - Updates and announcements
- 📦 [GitHub](https://github.com/velt-js/docs) - Velt documentation repository
- [TipTap Documentation](https://tiptap.dev/)
- [Velt TipTap CRDT Guide](https://docs.velt.dev/live-co-editing/text-editors/tiptap)

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

## Support

For issues or questions:
- TipTap: [Documentation](https://tiptap.dev/)
- Velt: [Documentation](https://docs.velt.dev)
- Velt Support: [Contact](https://velt.dev/contact)
