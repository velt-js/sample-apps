# CodeMirror Comments Demo

> **[View Live Demo](https://sample-apps-codemirror-comments-demo.vercel.app)**

## Overview

This demo showcases **inline text commenting** built using **CodeMirror 6** code editor integrated with **Velt's commenting system**. Users can select text passages and add contextual comments directly within the editor, creating threaded discussions on specific code sections.

## Path

```
apps/react/comments/text-editors/codemirror/codemirror-comments-demo/
```

## Package Name

`@apps/react-comments-text-editors-codemirror-codemirror-comments-demo`

## Features

### Velt Commenting Features
- **Text Selection Comments**: Highlight code passages and add comments
- **Inline Comment Markers**: Visual indicators showing commented text sections
- **Bubble Menu**: Appears on text selection with a comment button
- **Threaded Discussions**: Reply to comments and maintain conversation context
- **Comment Annotations**: Automatic tracking of comment positions as code changes
- **Comments Sidebar**: Centralized view of all document comments
- **Real-time Updates**: See new comments and replies instantly
- **Presence Awareness**: See who's currently viewing the document
- **Notifications**: Get notified of new comments and mentions

### Editor Features
- **Syntax Highlighting**: Code highlighting powered by CodeMirror 6
- **TypeScript Support**: Language support for JavaScript/TypeScript
- **Light/Dark Themes**: Toggle between light and dark editor themes
- **Code Editing**: Full-featured code editor with CodeMirror 6 extensions

## Directory Structure

```
codemirror-comments-demo/
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
│   │   └── useAppUser.ts              # User authentication hook
│   ├── layout.tsx                      # Root layout with app providers
│   └── page.tsx                        # Main page with Velt provider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper with file tree
│   │   └── CodeMirrorComponent/
│   │       ├── CodeMirrorComponent.tsx # Main CodeMirror editor with Velt comments
│   │       └── ui/
│   │           └── BubbleMenuToolbar.tsx # Comment button toolbar on text selection
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltCommentBubbleWf.tsx # Custom comment bubble wireframe
│       │   ├── VeltCommentToolWf.tsx   # Custom comment tool wireframe
│       │   ├── VeltNotificationsToolWf.tsx # Custom notifications wireframe
│       │   ├── VeltSidebarButtonWf.tsx # Custom sidebar button wireframe
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
│   ├── globals.css                     # Global styles
│   └── codemirror.css                  # CodeMirror editor styles
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **CodeMirror 6** - Code editor
  - `codemirror` - Core editor with basic setup
  - `@codemirror/lang-javascript` - JavaScript/TypeScript language support
  - `@codemirror/state` - Editor state management
  - `@codemirror/theme-one-dark` - Dark theme
- **@veltdev/codemirror-velt-comments** - Velt comments integration for CodeMirror
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
cd apps/react/comments/text-editors/codemirror/codemirror-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-comments-text-editors-codemirror-codemirror-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-comments-text-editors-codemirror-codemirror-comments-demo build
```

## Usage

### Adding Comments

1. **Select text**: Highlight the code passage you want to comment on
2. **Click comment button**: In the bubble menu toolbar that appears above the selection
3. **Type comment**: Enter your comment in the popover
4. **Submit**: Press Enter or click submit
5. **View comments**: Click comment markers to read and reply

### Viewing All Comments

1. Click the sidebar button in the header
2. The comments sidebar appears on the right
3. View all comments organized by location
4. Click a comment to jump to that code section
5. Reply to comments in the sidebar

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows document activity
- **Real-time updates**: All comments appear instantly for all users

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
1. Check that `useCommentAnnotations()` returns data
2. Ensure `renderComments()` is called in useEffect
3. Verify text selection before creating comment
4. Check that `CodemirrorVeltComments()` extension is loaded
5. Check browser console for errors

### Editor Not Loading
If the editor doesn't appear:
1. Check that CodeMirror extensions are loaded correctly
2. Verify the editor container ref is available
3. Check browser console for errors

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
- 📖 [CodeMirror Documentation](https://codemirror.net/)
- 💬 [Velt CodeMirror Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/codemirror)

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
