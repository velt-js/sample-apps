# Lexical Comments Demo

> **[🚀 View Live Demo](https://sample-apps-lexical-comments-demo.vercel.app)**


https://github.com/user-attachments/assets/1cb77742-17e1-4213-a28f-e1cecaf145fa


## Overview

This demo showcases **inline text commenting** built using **Lexical** text editor integrated with **Velt's commenting system**. Users can select text passages and add contextual comments directly within the document, creating threaded discussions on specific content sections.

## Path

```
apps/react/comments/text-editors/lexical/lexical-comments-demo/
```

## Package Name

`@apps/react-text-editors-lexical-lexical-comments-demo`

## Features

### Velt Commenting Features
- **Text Selection Comments**: Highlight text passages and add comments
- **Inline Comment Markers**: Visual indicators showing commented text sections
- **Comment Bubbles**: Clickable bubbles displaying comment threads
- **Threaded Discussions**: Reply to comments and maintain conversation context
- **Comment Annotations**: Automatic tracking of comment positions as text changes
- **Comments Sidebar**: Centralized view of all document comments
- **Real-time Updates**: See new comments and replies instantly
- **Presence Awareness**: See who's currently viewing the document
- **Notifications**: Get notified of new comments and mentions

### Editor Features
- **Rich Text Editing**: Bold, italic, underline, strikethrough formatting
- **Bubble Menu Toolbar**: Appears on text selection with formatting and comment options
- **Sidebar Navigation**: Table of contents generated from document headings
- **History**: Undo/redo functionality

## Directory Structure

```
lexical-comments-demo/
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
│   │   └── header.tsx                  # Header with Velt tools
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Document outline sidebar with TOC
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── LexicalComponent/
│   │       ├── LexicalComponent.tsx    # Main Lexical editor with Velt integration
│   │       ├── constants.ts            # Initial document content
│   │       ├── types.ts                # TypeScript type definitions
│   │       ├── nodes/
│   │       │   └── HeadingSpanNode.tsx # Custom heading node for TOC
│   │       ├── plugins/
│   │       │   ├── BubbleMenuPlugin.tsx    # Text selection toolbar plugin
│   │       │   ├── FormattingPlugin.tsx    # Rich text formatting commands
│   │       │   ├── HeadingPlugin.tsx       # Heading style plugin
│   │       │   ├── TextAlignPlugin.tsx     # Text alignment plugin
│   │       │   └── InitialContentPlugin.tsx # Load initial content
│   │       └── ui/
│   │           ├── BubbleMenuToolbar.tsx   # Formatting toolbar component
│   │           ├── ToolbarButton.tsx       # Reusable toolbar button component
│   │           └── ToolbarDivider.tsx      # Toolbar separator component
│   └── velt/
│       ├── ui-customization/
│       │   └── ...                     # Velt UI customization components
│       ├── VeltCollaboration.tsx       # Velt client setup
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/                             # Static assets
├── styles/
│   └── globals.css                     # Global styles with Lexical theming
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **Lexical 0.19.0** - Extensible text editor framework
  - `lexical` - Core editor package
  - `@lexical/react` - React integration and plugins
  - `@lexical/rich-text` - Rich text editing functionality
  - `@lexical/selection` - Selection manipulation utilities
  - `@lexical/utils` - Helper utilities
  - `@lexical/html` - HTML import/export
- **@veltdev/lexical-velt-comments** - Velt comments integration for Lexical
- **@veltdev/react** - Velt collaboration components
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
cd apps/react/comments/text-editors/lexical/lexical-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-lexical-lexical-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-lexical-lexical-comments-demo build
```

## Usage

### Adding Comments

1. **Select text**: Highlight the passage you want to comment on
2. **Click comment button**: In the bubble menu toolbar (comment icon)
3. **Type comment**: Enter your comment in the popover
4. **Submit**: Press Enter or click submit
5. **View comments**: Click comment bubbles to read and reply

### Viewing All Comments

1. Click the sidebar button in the header
2. The comments sidebar appears on the right
3. View all comments organized by location
4. Click a comment to jump to that text section
5. Reply to comments in the sidebar

### Text Editing

1. **Type content**: Click into the editor and start writing
2. **Format text**: Select text to reveal the bubble menu toolbar
3. **Navigate**: Use sidebar headings to jump to document sections

### Keyboard Shortcuts

- **Cmd/Ctrl + B** - Bold
- **Cmd/Ctrl + I** - Italic
- **Cmd/Ctrl + U** - Underline
- **Cmd/Ctrl + Z** - Undo
- **Cmd/Ctrl + Shift + Z** - Redo

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
4. Check browser console for Velt SDK errors

### Comments Not Appearing
If comments don't render:
1. Verify CommentNode is registered in editor config
2. Check that `useCommentAnnotations()` returns data
3. Ensure `renderComments()` is called in useEffect
4. Verify text selection before creating comment
5. Check browser console for errors

### Lexical Errors
Common Lexical issues:

**"Cannot resolve module 'lexical'"**
- Run `pnpm install` from monorepo root
- Clear node_modules and reinstall

**"Node type not registered"**
- Add custom node to `initialConfig.nodes` array
- Ensure node class has `static getType()` method

**"Cannot update outside of editor.update"**
- Wrap state modifications in `editor.update(() => {})`
- Use `editor.getEditorState().read()` for read-only operations

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
