# BlockNote Collaborative Editor Demo

> **[🚀 View Live Demo](https://sample-apps-blocknote-demo.vercel.app)**

## Overview

This demo showcases **real-time collaborative editing** with **BlockNote**, a modern block-based rich text editor built on TipTap, integrated with **Velt's CRDT extension**. Multiple users can simultaneously edit content with automatic conflict resolution and inline commenting capabilities.

BlockNote offers a **Notion-like editing experience** with its intuitive block-based approach, making it ideal for creating documentation, wikis, and content management systems. Unlike traditional text editors, BlockNote treats each paragraph, heading, list item, or media element as an independent block that can be easily manipulated, reordered, and styled.

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
apps/react/crdt/text-editors/blocknote/blocknote-demo/
```

## Package Name

`@apps/react-text-editors-blocknote-blocknote-demo`

## Features

### Real-time Collaboration Features
- **Live Co-editing**: Multiple users can simultaneously edit the document with Velt's CRDT synchronization
- **Text Comments**: Add inline comments directly on selected text passages
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
- **CRDT Synchronization**: Real-time document syncing via `@veltdev/blocknote-crdt-react`
- **Comment Annotations**: Inline comments with automatic position tracking
- **Comment Bubbles**: Visual indicators showing existing comments
- **Comment Tools**: Quick-access comment creation interface
- **Sidebar Comments**: View all comments in organized sidebar
- **Custom UI**: Customized Velt components matching BlockNote's aesthetic

## Directory Structure

```
blocknote-demo/
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
│   │   ├── useAppUser.ts               # User authentication hook
│   │   └── users.ts                    # Mock user data for testing
│   ├── layout.tsx                      # Root layout with app providers
│   └── page.tsx                        # Main page with Velt provider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── BlockNote Component/
│   │       ├── blocknote.tsx           # BlockNote editor with CRDT integration
│   │       └── constants.ts            # Editor configuration constants
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCommentBubbleWf.tsx # Customized comment bubble wireframe
│       │   ├── VeltCommentToolWf.tsx   # Customized comment tool wireframe
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Customized notifications wireframe
│       │   ├── VeltSidebarButtonWf.tsx # Customized sidebar button wireframe
│       │   └── styles.css              # Custom Velt styles
│       ├── VeltCollaboration.tsx       # Velt client setup and configuration
│       ├── VeltInitializeDocument.tsx  # Document initialization component
│       ├── VeltInitializeUser.tsx      # User initialization with auth provider
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
- **BlockNote 0.41.1** - Block-based rich text editor
  - `@blocknote/core` - Core editor functionality
  - `@blocknote/react` - React integration
  - `@blocknote/mantine` - Mantine UI components for BlockNote
- **@veltdev/blocknote-crdt-react** - CRDT extension for real-time collaboration
- **@veltdev/react** - Velt collaboration components
- **Mantine 8.x** - UI component library for BlockNote
- **TipTap 2.x** - Underlying editor framework (BlockNote is built on TipTap)
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
cd apps/react/crdt/text-editors/blocknote/blocknote-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-blocknote-blocknote-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-blocknote-blocknote-demo build
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
2. **Switch users**: Use the login panel to switch between test users
3. **See collaborators**: View other users' avatars in the header
4. **Live cursors**: See where other users are typing in real-time
5. **Simultaneous edits**: Type in different parts of the document simultaneously

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
5. Filter and search through comments

### Keyboard Shortcuts

- **Cmd/Ctrl + B** - Bold
- **Cmd/Ctrl + I** - Italic
- **Cmd/Ctrl + U** - Underline
- **Cmd/Ctrl + Z** - Undo
- **Cmd/Ctrl + Shift + Z** - Redo
- **/** - Open block menu
- **Tab** - Increase list indentation
- **Shift + Tab** - Decrease list indentation

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in `app/page.tsx`
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
2. Check that VeltComments component is rendered
3. Ensure comment mode is enabled in Velt configuration
4. Verify document ID is consistent across users
5. Check browser console for Velt comment errors

### BlockNote Styling Issues
If blocks appear unstyled:
1. Ensure Mantine styles are imported: `@blocknote/mantine/style.css`
2. Verify BlockNote fonts are loaded: `@blocknote/core/fonts/inter.css`
3. Check that Mantine core and hooks packages are installed
4. Clear browser cache and rebuild the application

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
- [BlockNote Documentation](https://www.blocknotejs.org/)
- [Velt Text Comments Documentation](https://docs.velt.dev/comments/text-comments/overview)
- [Velt CRDT Guide](https://docs.velt.dev/live-co-editing/overview)

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

