# BlockNote CRDT Demo (Vanilla JavaScript)

> **[🚀 View Live Demo](https://sample-apps-blocknote-non-react-crd.vercel.app)** | **[🔗 Alt Demo](https://sample-apps-blocknote-non-react-crdt-demo-velt-team-eng.vercel.app)**

## Overview

This demo showcases **real-time collaborative editing** with **BlockNote**, a modern block-based rich text editor built on TipTap, integrated with **Velt's CRDT extension** — all implemented in **vanilla JavaScript** without React or any frontend framework.

BlockNote offers a **Notion-like editing experience** with its intuitive block-based approach, making it ideal for creating documentation, wikis, and content management systems. Unlike traditional text editors, BlockNote treats each paragraph, heading, list item, or media element as an independent block that can be easily manipulated, reordered, and styled.

This demo uses the **v2 `CollaborationManager` API** (`createCollaboration` from `@veltdev/blocknote-crdt`) which provides a single entry point for all collaboration functionality — it owns the CRDT store, sync provider, and BlockNote collaboration config lifecycle.

### Why Choose BlockNote?

- **Block-Based Architecture**: Each content element is an independent block, enabling easy drag-and-drop reordering
- **Notion-like UX**: Familiar slash command menu and inline formatting options
- **Built on TipTap**: Inherits TipTap's robustness while adding block-level abstractions
- **Extensible**: Easy to add custom block types and formatting options
- **Mantine Integration**: Comes with beautiful pre-built UI components via Mantine

**Compared to other editors:**
- **vs TipTap**: BlockNote adds block-level structure on top of TipTap's foundation
- **vs Lexical**: BlockNote provides more opinionated, ready-to-use block components
- **vs SlateJS**: Simpler API with less boilerplate for common use cases
- **vs CodeMirror**: Designed for rich documents rather than code editing

## Path

```
apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo/
```

## Package Name

`@apps/vanilla-js-CRDT-text-editors-blocknote-blocknote-crdt-demo`

## Features

### Real-time Collaboration Features
- **Live Co-editing**: Multiple users can simultaneously edit the document with Velt's CRDT synchronization
- **Presence Awareness**: See who's currently viewing and editing the document
- **Notifications**: Stay updated on comments and mentions
- **Comments Sidebar**: Centralized panel displaying all document comments
- **Live Cursors**: See collaborators' cursor positions in real-time
- **Conflict Resolution**: Automatic CRDT-based conflict resolution for simultaneous edits

### BlockNote Editor Features
- **Block-Based Editing**: Every element (paragraph, heading, list, etc.) is an independent block
- **Slash Commands**: Type `/` to open the block menu and insert different block types
- **Drag & Drop Blocks**: Reorder content by dragging block handles
- **Rich Text Formatting**: Bold, italic, underline, strikethrough, and more
- **Headings**: H1, H2, H3 with automatic table of contents generation
- **Lists**: Ordered lists, bullet lists, and checkboxes
- **Block Menu**: Side menu for quick block manipulation (appears on hover)
- **Inline Formatting**: Select text to reveal formatting toolbar
- **Keyboard Shortcuts**: Full keyboard navigation and editing support
- **Undo/Redo**: Built-in history management

### Velt Integration Features
- **CRDT Synchronization**: Real-time document syncing via `@veltdev/blocknote-crdt` (v2 API)
- **CollaborationManager**: Single entry point for store, provider, and config lifecycle
- **Comment Annotations**: Inline comments with automatic position tracking
- **Comment Bubbles**: Visual indicators showing existing comments
- **Sidebar Comments**: View all comments in organized sidebar
- **Custom UI Styling**: Customized Velt CSS variables matching BlockNote's aesthetic

### Vanilla JavaScript Architecture
- **No React/Framework Dependencies**: Pure DOM manipulation with `document.createElement()`
- **Web Components**: Uses Velt's native custom elements (`<velt-comments>`, `<velt-presence>`, etc.)
- **Module Pattern**: Clean module exports with subscriber-based state management
- **Vite Bundler**: Fast development and optimized production builds

## Directory Structure

```
blocknote-crdt-demo/
├── src/
│   ├── main.js                              # App entry point and initialization
│   ├── lib/
│   │   ├── velt.js                          # Velt client initialization and auth
│   │   ├── user.js                          # User management (demo auth)
│   │   ├── document.js                      # Document ID management
│   │   └── theme.js                         # Theme management (light/dark/system)
│   └── components/
│       ├── document/
│       │   ├── document-canvas.js           # Main document layout wrapper
│       │   └── blocknote/
│       │       ├── blocknote.js             # BlockNote editor with CRDT integration
│       │       └── constants.js             # Editor initial content
│       ├── header/
│       │   ├── header.js                    # Header with Velt tools
│       │   └── theme-toggle.js              # Light/dark/system theme toggle
│       ├── sidebar/
│       │   └── sidebar.js                   # Left navigation sidebar
│       └── velt/
│           ├── index.js                     # Barrel exports
│           ├── velt-collaboration.js        # Velt comments and sidebar setup
│           ├── velt-tools.js                # Velt presence, notifications, huddle
│           └── ui-customization/
│               └── styles.css               # Custom Velt CSS variables
├── styles/
│   └── globals.css                          # Global styles and BlockNote overrides
├── public/
│   └── icons/                               # SVG icons
├── index.html                               # HTML entry point
├── vite.config.js                           # Vite configuration
├── tailwind.config.js                       # Tailwind CSS v3 configuration
├── postcss.config.js                        # PostCSS configuration
├── tsconfig.json                            # TypeScript config (for IDE support)
└── package.json
```

## Key Technologies

- **Vite 5.x** - Fast build tool and dev server
- **BlockNote 0.41.1** - Block-based rich text editor
  - `@blocknote/core` - Core editor functionality (framework-agnostic)
  - `@blocknote/mantine` - Mantine UI components for BlockNote
- **@veltdev/blocknote-crdt 5.0.0-beta.1** - CRDT extension for real-time collaboration (v2 API)
- **@veltdev/client 5.0.2-beta.9** - Velt client SDK for vanilla JavaScript
- **Yjs** - Underlying CRDT framework
- **Tailwind CSS v3.4** - Styling
- **Vanilla JavaScript** - No framework dependency

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/javascript/crdt/text-editors/blocknote/blocknote-crdt-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-blocknote-blocknote-crdt-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/vanilla-js-CRDT-text-editors-blocknote-blocknote-crdt-demo build
```

## Usage

### Basic Editing

1. **Add content**: Click into the editor and start typing
2. **Create blocks**: Press Enter to create a new block
3. **Block menu**: Click the `+` button on the left or type `/` to open block menu
4. **Format text**: Select text to reveal the formatting toolbar
5. **Drag blocks**: Use the drag handle (six dots) on the left to reorder blocks

### Collaborative Editing

1. **Join session**: Open the same document in multiple browsers
2. **See collaborators**: View other users' avatars in the header
3. **Live cursors**: See where other users are typing in real-time
4. **Simultaneous edits**: Type in different parts of the document simultaneously

### Adding Comments

1. **Select text**: Highlight the text you want to comment on
2. **Open comment**: Click the comment button in the formatting toolbar
3. **Write comment**: Type your comment in the popover
4. **Submit**: Press Enter or click the submit button
5. **View comments**: Click comment bubbles to read and reply

### Viewing All Comments

1. Click the sidebar button in the header
2. The comments sidebar slides in from the right
3. View all comments organized by document location
4. Click on a comment to navigate to its location

### Keyboard Shortcuts

- **Cmd/Ctrl + B** - Bold
- **Cmd/Ctrl + I** - Italic
- **Cmd/Ctrl + U** - Underline
- **Cmd/Ctrl + Z** - Undo
- **Cmd/Ctrl + Shift + Z** - Redo
- **/** - Open block menu
- **Tab** - Increase list indentation
- **Shift + Tab** - Decrease list indentation

## Architecture Notes

### Vanilla JS vs React

This demo is the **vanilla JavaScript counterpart** of the React BlockNote CRDT demo at `apps/react/crdt/text-editors/blocknote/blocknote-demo/`. Key architectural differences:

| Concern | This Demo (Vanilla JS) | React Demo |
|---------|----------------------|------------|
| State management | Module exports with subscriber pattern | React Context + hooks |
| DOM manipulation | `document.createElement()` | JSX / React components |
| Velt components | Native custom elements (`<velt-comments>`) | React components (`<VeltComments>`) |
| CRDT package | `@veltdev/blocknote-crdt` | `@veltdev/blocknote-crdt-react` |
| Velt client | `@veltdev/client` (`initVelt()`) | `@veltdev/react` (`<VeltProvider>`) |
| Token generation | Client-side in `velt.js` | Server-side Next.js API route |
| Build tool | Vite | Next.js |

### v2 CollaborationManager API

This demo uses the v2 API exclusively:

```js
import { createCollaboration } from '@veltdev/blocknote-crdt';

const manager = await createCollaboration({
  editorId: 'my-document-id',
  veltClient: client,
  onError: (error) => console.error(error),
});

const collabConfig = manager.getCollaborationConfig();
const editor = BlockNoteEditor.create({ collaboration: collabConfig });
```

No legacy v1 APIs (manual Y.Doc, SyncProvider, or store creation) are used.

## Troubleshooting

### Velt Not Loading
If Velt features don't appear:
1. Check that the API key is set in `src/lib/velt.js`
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port
4. Check browser console for any Velt SDK errors

### CRDT Sync Issues
If changes aren't syncing between users:
1. Check browser console for WebSocket errors
2. Verify the `editorId` is the same for all users
3. Ensure multiple users are on the same document ID
4. Test with two unique users on different browser profiles
5. Check that both users have successfully initialized Velt

### Comments Not Appearing
If comments don't show up:
1. Verify text selection before creating comment
2. Check that `<velt-comments>` element is rendered in the DOM
3. Ensure comment mode is enabled in Velt configuration
4. Verify document ID is consistent across users

### BlockNote Styling Issues
If blocks appear unstyled:
1. Ensure Mantine styles are imported: `@blocknote/mantine/style.css`
2. Verify BlockNote fonts are loaded: `@blocknote/core/fonts/inter.css`
3. Clear browser cache and rebuild the application

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
- [BlockNote Documentation](https://www.blocknotejs.org/)
- [Velt CRDT Guide](https://docs.velt.dev/live-co-editing/overview)
