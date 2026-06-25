# TinyMCE Comments Demo

> View live demo: https://sample-apps-tinymce-comments-demo.vercel.app

## Overview

This demo showcases inline text commenting in a TinyMCE editor using Velt. Users can select text in the document, add contextual comments from the selection toolbar, and view threaded discussions in the Velt comments sidebar.

## Path

```txt
apps/react/comments/text-editors/tinymce/tinymce-comments-demo/
```

## Package Name

`@apps/react-text-editors-tinymce-tinymce-comments-demo`

## Features

### Velt Commenting Features

- Text selection comments in TinyMCE
- View-only comment overlays rendered through `<velt-comment-text>`
- Comment bubbles and threaded discussions
- Comment annotations that follow edited TinyMCE content
- Comments sidebar for a document-wide view
- Real-time updates across collaborators
- Presence, huddle, and notifications tools

### Editor Features

- TinyMCE React integration with the published Velt TinyMCE plugin
- Bold, italic, underline, and strikethrough formatting
- Selection toolbar with formatting and comment controls
- Sidebar navigation for document sections
- Document-scoped local HTML persistence without storing Velt comment marks in the TinyMCE content

## Directory Structure

```txt
tinymce-comments-demo/
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
│   │   └── TinyMCEComponent/
│   │       ├── TinyMCEComponent.tsx # TinyMCE editor with Velt integration
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
│   └── globals.css                     # App and TinyMCE styles
├── components.json                     # shadcn/ui configuration
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Technologies

- Next.js 16 with React 19
- TinyMCE and `@tinymce/tinymce-react`
- `@veltdev/tinymce-velt-comments`
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
pnpm --filter @apps/react-text-editors-tinymce-tinymce-comments-demo dev
```

Or run from the demo directory:

```bash
cd apps/react/comments/text-editors/tinymce/tinymce-comments-demo
pnpm dev
```

Build for production from the root:

```bash
pnpm --filter @apps/react-text-editors-tinymce-tinymce-comments-demo build
```

This demo uses the published `@veltdev/tinymce-velt-comments` package for the TinyMCE-specific Velt comments integration.

## Usage

### Adding Comments

1. Select text in the TinyMCE editor.
2. Click the comment icon in the selection toolbar.
3. Enter your comment in the Velt dialog.
4. Use the comments sidebar to review and reply to threads.

### Text Editing

- Select text to reveal the toolbar.
- Use the toolbar to apply bold, italic, underline, or strikethrough.
- Use the left sidebar to jump between document sections.

## Velt Integration Points

- `components/velt/VeltCollaboration.tsx` renders `VeltComments` with `textMode={false}` so the TinyMCE package controls text comments.
- `components/document/TinyMCEComponent/TinyMCEComponent.tsx` renders the TinyMCE React editor and imports TinyMCE's self-hosted assets.
- TinyMCE uses the `autoresize` plugin and explicitly runs `mceAutoResize` after initialization, edits, and comment rendering so the editor iframe grows with the full document.
- `components/document/document-canvas.tsx` loads TinyMCE with `next/dynamic` and `ssr: false` because TinyMCE depends on browser-only APIs.
- The document sidebar reads headings from TinyMCE's editor iframe, so its navigation differs from Tiptap and Lexical, where headings live in the main document DOM.
- `VeltCommentsPlugin` from `@veltdev/tinymce-velt-comments` is included in TinyMCE's `plugins` list and reads `velt_comments_editor_id` from editor init options.
- `addComment({ editor, editorId })` from `@veltdev/tinymce-velt-comments` creates a Velt comment for the current text selection.
- `renderComments({ editor, editorId, commentAnnotations })` from `@veltdev/tinymce-velt-comments` renders Velt annotations in TinyMCE.
- The demo persists `editor.getContent()` HTML under a document-scoped localStorage key because TinyMCE highlights are view-only overlays and are not stored in the content.

## Troubleshooting

### PostCSS Errors

If you see PostCSS or Tailwind errors:

1. Confirm the root `sample-apps/.npmrc` file is present.
2. Run `pnpm install` from the monorepo root.
3. Confirm the app is using Tailwind v3.

The sample-apps workspace includes a root `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```txt
public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
public-hoist-pattern[]=@veltdev/*
shamefully-hoist=false
```

Do not delete the root `sample-apps/.npmrc` file. It keeps this app on Tailwind CSS v3.4 with the traditional PostCSS configuration.

### Velt Not Loading

If Velt features do not appear:

1. Confirm the Velt API key in `app/page.tsx` belongs to a project that allows your local or deployed domain.
2. Verify `components/velt/VeltInitializeUser.tsx` can fetch a JWT from `app/api/velt/token/route.ts`.
3. Confirm `components/velt/VeltInitializeDocument.tsx` calls `setDocuments()` after the Velt user is authenticated.
4. Check the browser console for SDK or token-generation errors.

### Comments Do Not Appear

1. Confirm `VeltComments` is mounted with `textMode={false}`.
2. Confirm `useCommentAnnotations()` returns data.
3. Confirm `VeltCommentsPlugin` is included in TinyMCE's `plugins` list.
4. Confirm `renderComments()` is called with the same `editorId` used by `addComment()`.
5. Select text before clicking the comment icon.

### TinyMCE Package Is Missing

The integration package is published as `@veltdev/tinymce-velt-comments`.

1. Run `pnpm install` from the monorepo root.
2. Confirm `@veltdev/tinymce-velt-comments` is present in `package.json`.
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
- [TinyMCE Documentation](https://www.tiny.cloud/docs/tinymce/latest/)
- [Velt TinyMCE Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/tinymce)
