# SlateJS Comments Demo

> **[🚀 View Live Demo](https://sample-apps-slatejs-comments-demo.vercel.app)**

https://github.com/user-attachments/assets/69ec01d8-e240-4820-8af3-fd5347e28f93



## Overview

This demo showcases **inline text commenting** with **SlateJS** integrated with **Velt's commenting system**. Users can select text passages and add contextual comments directly within the document, with real-time collaboration and threaded discussions.

SlateJS is a customizable framework for building rich text editors in React, providing flexibility for implementing custom editor behaviors alongside Velt's collaboration features.

## Path

```
apps/react/comments/text-editors/slatejs/slatejs-comments-demo/
```

## Package Name

`@apps/react-text-editors-slatejs-slatejs-comments-demo`

## Features

### Velt Commenting Features
- **Text Selection Comments**: Highlight text passages and add inline comments
- **Comment Bubbles**: Clickable bubbles showing comment threads on selected text
- **Threaded Discussions**: Reply to comments and maintain conversation context
- **Real-time Updates**: See new comments and replies instantly
- **Comment Annotations**: Automatic position tracking as document changes
- **Comments Sidebar**: Centralized view of all document comments
- **Presence Awareness**: See who's currently viewing the document
- **Notifications**: Get notified of new comments and mentions
- **Bubble Menu Integration**: Add comments via text selection toolbar

### Editor Features
- **Rich Text Formatting**: Bold, italic, underline, strikethrough
- **Bubble Menu Toolbar**: Formatting options on text selection
- **Sidebar Navigation**: Auto-generated table of contents
- **History**: Undo/redo functionality

## Directory Structure

```
slatejs-comments-demo/
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
│   │   └── header.tsx                  # Header with Velt tools
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Document outline sidebar with TOC
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── SlateJSComponent/
│   │       ├── SlateJSComponent.tsx    # Main SlateJS editor component
│   │       ├── constants.ts            # Initial document content
│   │       ├── types.ts                # TypeScript type definitions
│   │       └── ui/
│   │           └── BubbleMenuToolbar.tsx # Formatting toolbar component
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
│   └── globals.css                     # Global styles with SlateJS theming
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **SlateJS 0.103.0** - Customizable editor framework
  - `slate` - Core editor package with primitives
  - `slate-react` - React bindings and hooks
  - `slate-history` - Undo/redo functionality
- **@veltdev/slate-velt-comments** - Velt comments integration for SlateJS
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
cd apps/react/comments/text-editors/slatejs/slatejs-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-slatejs-slatejs-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-slatejs-slatejs-comments-demo build
```

## Usage

### Adding Comments

1. **Select text**: Highlight the passage you want to comment on
2. **Click comment button**: Click the comment icon in the bubble menu toolbar
3. **Type comment**: Enter your comment in the popover
4. **Submit**: Press Enter or click submit
5. **View comments**: Click comment bubbles to read and reply to existing comments

### Viewing All Comments

1. Click the sidebar button in the header
2. Comments sidebar appears on the right
3. View all comments organized by location
4. Click a comment to jump to that text in the document
5. Reply to comments in threaded discussions

### Collaboration Features
- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Get notified of new comments and mentions
- **Real-time updates**: See comments from other users instantly as they're added

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
1. Verify `withVeltComments` wraps the editor in the correct order
2. Check that `SlateVeltComment` component renders for 'veltComment' type elements
3. Ensure `useCommentAnnotations()` hook returns data
4. Verify `renderComments()` is called when annotations change
5. Check browser console for errors

### Comment Button Not Working
If you can't add comments:
1. Check that text is selected before clicking comment button
2. Verify `addComment()` function is called correctly
3. Ensure editor has focus when adding comments
4. Check browser console for Velt SDK errors

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

