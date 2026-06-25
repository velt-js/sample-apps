# SuperDoc Comments Demo

> View live demo: https://sample-apps-superdoc-comments-demo.vercel.app

## Overview

This demo showcases inline text commenting in a SuperDoc DOCX editor using Velt. Users can select text in the document, add contextual comments with the floating comment button, and view threaded discussions in the Velt comments sidebar.

## Path

```txt
apps/react/comments/text-editors/superdoc/superdoc-comments-demo/
```

## Package Name

`@apps/react-text-editors-superdoc-superdoc-comments-demo`

## Features

### Velt Commenting Features

- Text selection comments in SuperDoc
- View-only comment overlays rendered through `<velt-comment-text>`
- Comment bubbles and threaded discussions
- Comment annotations that follow edited SuperDoc content
- Comments sidebar for a document-wide view
- Real-time updates across collaborators
- Presence, huddle, and notifications tools

### Editor Features

- SuperDoc DOCX editor loaded client-side with the Velt SuperDoc comments extension
- Bundled DOCX sample document based on the shared text-editor demo content
- Floating add-comment button that preserves the active SuperDoc selection
- Sidebar navigation for document sections
- Document-scoped local ProseMirror JSON persistence without storing Velt comment marks in the DOCX content

## Directory Structure

This tree focuses on the runtime SuperDoc comments app and the files developers
need to understand the integration.

```txt
superdoc-comments-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts              # Velt JWT token generation endpoint
│   ├── document/
│   │   ├── DocumentContext.tsx           # Document ID state hook
│   │   └── useCurrentDocument.ts         # Document management hook
│   ├── userAuth/
│   │   ├── AppProviders.tsx              # App-level providers wrapper
│   │   ├── AppUserContext.tsx            # User authentication context
│   │   └── useAppUser.ts                 # User authentication hook
│   ├── layout.tsx                        # Root layout and global CSS imports
│   └── page.tsx                          # Main page with VeltProvider
├── components/
│   ├── document/
│   │   ├── document-canvas.tsx           # Main document wrapper
│   │   └── SuperDocComponent/
│   │       ├── SuperDocComponent.tsx     # SuperDoc editor with Velt integration
│   │       ├── constants.ts              # SuperDoc document and editor IDs
│   │       ├── types.ts                  # Component types
│   │       ├── index.tsx                 # Component export
│   │       └── ui/
│   │           └── AddCommentToolbar.tsx # Floating comment button
│   ├── header/                           # Header with Velt tools
│   ├── sidebar/                          # Document outline sidebar
│   ├── theme/                            # Theme provider and toggle
│   ├── velt/                             # Velt initialization and UI customization
│   └── velt-logo.tsx                     # Velt logo component
├── hooks/                                # Custom React hooks
├── lib/
│   └── utils.ts                          # Utility functions
├── public/
│   ├── icons/                            # SVG icons for Velt tools
│   └── sample.docx                       # Bundled SuperDoc document
├── styles/
│   └── globals.css                       # App and SuperDoc styles
├── components.json                       # shadcn/ui configuration
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Technologies

- Next.js 16 with React 19
- SuperDoc from `@harbour-enterprises/superdoc`
- `@hocuspocus/provider`, installed as a SuperDoc peer dependency
- `@veltdev/superdoc-velt-comments`
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
pnpm --filter @apps/react-text-editors-superdoc-superdoc-comments-demo dev
```

Or run from the demo directory:

```bash
cd apps/react/comments/text-editors/superdoc/superdoc-comments-demo
pnpm dev
```

Build for production from the root:

```bash
pnpm --filter @apps/react-text-editors-superdoc-superdoc-comments-demo build
```

This demo uses the `@veltdev/superdoc-velt-comments` package for the SuperDoc-specific Velt comments integration.

The SuperDoc demo uses the SuperDoc-specific Velt packages and versions required
by the current SuperDoc integration. It does not use the Tiptap, Lexical, or
CRDT packages from the sibling text-editor demos.

## Usage

### Adding Comments

1. Select text in the SuperDoc editor.
2. Click the floating Add Comment button.
3. Enter your comment in the Velt dialog.
4. Use the comments sidebar to review and reply to threads.

### Text Editing

- Edit the DOCX document with SuperDoc's toolbar.
- Use the left sidebar to jump between document sections when headings are present in the rendered document.
- Refresh the page to restore locally persisted demo edits for the current document ID.

## Velt Integration Points

- `components/velt/VeltCollaboration.tsx` renders `VeltComments` with `textMode={false}` so the SuperDoc package controls text comments.
- `components/document/document-canvas.tsx` loads the SuperDoc component with `next/dynamic` and `ssr: false` because SuperDoc depends on browser-only APIs.
- `app/layout.tsx` imports `@harbour-enterprises/superdoc/style.css` globally; the SuperDoc SDK itself is dynamically imported in the editor component.
- `components/document/SuperDocComponent/SuperDocComponent.tsx` dynamically imports `@harbour-enterprises/superdoc` and `@veltdev/superdoc-velt-comments` inside a client-side effect.
- `SuperDocVeltComments.configure({ editorId }).attach(instance)` wires Velt comments to the ready SuperDoc instance and returns a cleanup handle.
- `addComment({ instance })` from `@veltdev/superdoc-velt-comments` creates a Velt comment for the current SuperDoc text selection.
- `renderComments({ instance, commentAnnotations })` from `@veltdev/superdoc-velt-comments` renders Velt annotations as view-only SuperDoc overlays.
- The demo persists `activeEditor.getJSON()` under a document-scoped localStorage key because Velt highlights are view-only overlays and are not stored in the DOCX content.

## Workspace Package Config

The sample-apps workspace includes a root `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages:

```txt
public-hoist-pattern[]=*
public-hoist-pattern[]=!tailwindcss
public-hoist-pattern[]=@veltdev/*
shamefully-hoist=false
```

Do not delete the root `sample-apps/.npmrc` file. It keeps this app on Tailwind CSS v3.4 with the traditional PostCSS configuration.

## Troubleshooting

### PostCSS Errors

If you see PostCSS or Tailwind errors:

1. Confirm the root `sample-apps/.npmrc` file is present.
2. Run `pnpm install` from the monorepo root.
3. Confirm the app is using Tailwind v3.

### Velt Not Loading

If Velt features do not appear:

1. Confirm the Velt API key in `app/page.tsx` belongs to a project that allows your local or deployed domain.
2. Verify `components/velt/VeltInitializeUser.tsx` can fetch a JWT from `app/api/velt/token/route.ts`.
3. Confirm `components/velt/VeltInitializeDocument.tsx` calls `setDocuments()` after the Velt user is authenticated.
4. Check the browser console and network panel for SDK or token-generation errors.

### Comments Do Not Appear

1. Confirm `VeltComments` is mounted with `textMode={false}`.
2. Confirm `useCommentAnnotations()` returns data.
3. Confirm `SuperDocVeltComments.configure(...).attach(instance)` runs after the SuperDoc `onReady` callback.
4. Confirm `renderComments()` receives the same SuperDoc instance that was passed to `attach()`.
5. Select text in the document before clicking Add Comment.

### SuperDoc Package Is Missing

The integration package used by this demo is `@veltdev/superdoc-velt-comments`.

1. Run `pnpm install` from the monorepo root.
2. Confirm `@veltdev/superdoc-velt-comments`, `@harbour-enterprises/superdoc`, and SuperDoc's `@hocuspocus/provider` peer dependency are present in `package.json`.
3. If installation fails, confirm your npm registry access can install scoped `@veltdev` and `@harbour-enterprises` packages.

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

## Related

- [Velt Documentation](https://docs.velt.dev)
- [SuperDoc Documentation](https://www.superdoc.dev/)
- [Velt SuperDoc Comments Guide](https://docs.velt.dev/async-collaboration/comments/setup/superdoc)
