# ProseMirror Comments Demo

> View live demo: https://sample-apps-prosemirror-comments-demo.vercel.app

## Overview

This demo showcases inline text commenting in a ProseMirror editor using Velt. Users can select text in the document, add contextual comments from the selection toolbar, and view threaded discussions in the Velt comments sidebar.

## Path

```txt
apps/react/comments/text-editors/prosemirror/prosemirror-comments-demo/
```

## Package Name

`@apps/react-text-editors-prosemirror-prosemirror-comments-demo`

## Features

### Velt Commenting Features

- Text selection comments in ProseMirror
- View-only comment overlays rendered through `<velt-comment-text>`
- Comment bubbles and threaded discussions
- Comment annotations that follow edited ProseMirror content
- Comments sidebar for a document-wide view
- Real-time updates across collaborators
- Presence, huddle, and notifications tools

### Editor Features

- Raw ProseMirror `EditorView` integration
- Bold, italic, underline, and strikethrough formatting
- Selection toolbar with formatting and comment controls
- Sidebar navigation for document sections
- Local document persistence without storing Velt comment marks in the ProseMirror document

## Directory Structure

```txt
prosemirror-comments-demo/
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
│   ├── layout.tsx                      # Root layout and global CSS imports
│   └── page.tsx                        # Main page with VeltProvider
├── components/
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── ProseMirrorComponent/
│   │       ├── ProseMirrorComponent.tsx # ProseMirror editor with Velt integration
│   │       ├── constants.ts            # Initial document content and IDs
│   │       ├── types.ts                # Component types
│   │       ├── index.tsx               # Component export
│   │       └── ui/
│   │           ├── BubbleMenuToolbar.tsx # Selection toolbar with comment button
│   │           ├── ToolbarButton.tsx   # Reusable toolbar button component
│   │           └── ToolbarDivider.tsx  # Toolbar separator component
│   ├── header/                         # Header with Velt tools
│   ├── sidebar/                        # Document outline sidebar
│   ├── theme/                          # Theme provider and toggle
│   ├── velt/                           # Velt initialization and UI customization
│   └── velt-logo.tsx                   # Velt logo component
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   └── icons/                          # SVG icons for toolbar and Velt tools
├── styles/
│   └── globals.css                     # App and ProseMirror styles
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── components.json                     # shadcn/ui configuration
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Technologies

- Next.js 16 with React 19
- ProseMirror editor packages
- `@veltdev/prosemirror-velt-comments`
- `@veltdev/react`
- Tailwind CSS v3.4
- TypeScript

## Getting Started

Install dependencies from the monorepo root:

```bash
pnpm install
```

Run from the root:

```bash
pnpm --filter @apps/react-text-editors-prosemirror-prosemirror-comments-demo dev
```

Or run from the demo directory:

```bash
cd apps/react/comments/text-editors/prosemirror/prosemirror-comments-demo
pnpm dev
```

Build for production from the root:

```bash
pnpm --filter @apps/react-text-editors-prosemirror-prosemirror-comments-demo build
```

This demo uses the published `@veltdev/prosemirror-velt-comments` package for the ProseMirror-specific Velt comments integration.

## Usage

### Adding Comments

1. Select text in the ProseMirror editor.
2. Click the comment icon in the selection toolbar.
3. Enter your comment in the Velt dialog.
4. Use the comments sidebar to review and reply to threads.

### Text Editing

- Select text to reveal the toolbar.
- Use the toolbar to apply bold, italic, underline, or strikethrough.
- Use the left sidebar to jump between document sections.

## Velt Integration Points

- `components/velt/VeltCollaboration.tsx` renders `VeltComments` with `textMode={false}` so the ProseMirror package controls text comments.
- `components/document/ProseMirrorComponent/ProseMirrorComponent.tsx` creates the ProseMirror `EditorView`.
- `VeltCommentsPlugin({ editorId })` from `@veltdev/prosemirror-velt-comments` registers the ProseMirror plugin that tracks comment anchors and remaps them through document edits.
- `addComment({ editor, editorId })` from `@veltdev/prosemirror-velt-comments` creates a Velt comment for the current text selection.
- `renderComments({ editor, editorId, commentAnnotations })` from `@veltdev/prosemirror-velt-comments` renders Velt annotations in ProseMirror.
- The demo persists `view.state.doc.toJSON()` directly because ProseMirror highlights are view-only overlays and are not stored in the document.

## Troubleshooting

### PostCSS Errors

If you see PostCSS or Tailwind errors:

1. Confirm `.npmrc` exists in this directory.
2. Run `pnpm install` from the monorepo root.
3. Confirm the app is using Tailwind v3.

This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```txt
public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
shamefully-hoist=false
```

Do not delete the `.npmrc` file. It keeps this app on Tailwind CSS v3.4 with the traditional PostCSS configuration.

### Velt Not Loading

If Velt features do not appear:

1. Confirm the Velt API key in `app/page.tsx` belongs to a project that allows your local or deployed domain.
2. Verify `components/velt/VeltInitializeUser.tsx` can fetch a JWT from `app/api/velt/token/route.ts`.
3. Confirm `components/velt/VeltInitializeDocument.tsx` calls `setDocuments()` after the Velt user is authenticated.
4. Check the browser console for SDK or token-generation errors.

### Comments Do Not Appear

1. Confirm `VeltComments` is mounted with `textMode={false}`.
2. Confirm `useCommentAnnotations()` returns data.
3. Confirm `VeltCommentsPlugin({ editorId })` is included in the editor state's plugins.
4. Confirm `renderComments()` is called with the same `editorId` used by `addComment()`.
5. Select text before clicking the comment icon.

### ProseMirror Package Is Missing

The integration package is published as `@veltdev/prosemirror-velt-comments`.

1. Run `pnpm install` from the monorepo root.
2. Confirm `@veltdev/prosemirror-velt-comments` is present in `package.json`.
3. If installation fails, confirm your npm registry access can install scoped `@veltdev` packages.

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product quickly.

The SDK provides full-stack collaboration components:

- UI and behavior are fully customizable to match your product's needs
- Fully managed on a scalable realtime backend

Features include:

- Comments like Figma, Frame.io, Google Docs, Sheets, and more
- Recording like Loom for audio, video, and screen capture
- Huddle like Slack for audio, video, and screen sharing
- In-app and off-app notifications
- Mentions and assignment
- Presence, cursors, and live selection
- Live state sync with Single Editor Mode
- Multiplayer editing with conflict resolution
- Follow mode like Figma

### Resources

- [Documentation](https://docs.velt.dev/get-started/overview) - Guides and API references
- [Use Cases](https://velt.dev/use-case) - See collaboration in action
- [Figma Template](https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit) - Visualize features for your product
- [Release Notes](https://docs.velt.dev/release-notes/version-4/sdk-changelog) - Latest changes
- [Security](https://velt.dev/security) - SOC2 Type 2 and HIPAA compliant
- [X/Twitter](https://x.com/veltjs) - Updates and announcements
- [ProseMirror Documentation](https://prosemirror.net/)
- [Velt ProseMirror Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/prosemirror)
