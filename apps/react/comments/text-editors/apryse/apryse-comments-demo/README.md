# Apryse Comments Demo

## Overview

This demo showcases **contextual commenting on documents** built using the **Apryse WebViewer** with **Velt's commenting integration**. Users can select text in a document, add comments with @mentions, and collaborate asynchronously on document feedback.

## Features

### Commenting Features
- **Text Selection Comments**: Select any text in the document to add inline comments
- **Add Comment Toolbar**: Floating pill button to create a comment on the current selection
- **Comment Annotations**: Visual markers showing commented text with highlighting
- **@Mentions**: Tag collaborators in comments for direct feedback
- **Notifications**: Stay updated on new comments and replies
- **Comment Sidebar**: View and manage all document comments in one place

### Editor Features
- **Apryse WebViewer**: DOCX rendering and editing powered by Apryse (`docxEditor` mode)

## Directory Structure

```
velt-apryse-comments-demo-v2/
├── app/
│   ├── api/velt/token/route.ts          # JWT token endpoint for Velt auth
│   ├── document/                        # Demo document-id helpers
│   ├── userAuth/                        # Demo user auth helpers
│   ├── layout.tsx                       # Root layout with providers
│   └── page.tsx                         # Main page with Velt provider
├── components/
│   ├── header/header.tsx                # Header with Velt tools
│   ├── document/
│   │   ├── document-canvas.tsx          # Document wrapper component
│   │   └── ApryseComponent/
│   │       ├── ApryseComponent.tsx      # Apryse WebViewer with Velt comments
│   │       ├── constants.ts             # WebViewer config (doc URL, editor id)
│   │       ├── types.ts                 # TypeScript type definitions
│   │       └── ui/
│   │           └── AddCommentToolbar.tsx # Floating "Add Comment" toolbar
│   └── velt/                            # Velt collaboration components
├── velt-apryse-comments/                # Local Apryse <> Velt comments library
├── scripts/copy-webviewer-assets.mjs    # Copies WebViewer static assets to /public
├── lib/utils.ts
├── public/icons/                        # SVG icons
├── styles/globals.css                   # Global styles
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

> **`velt-apryse-comments/`** is the Apryse commenting library. It is kept in
> the repo (instead of installed from npm) because the public package is not
> yet published. Imported via the `@/velt-apryse-comments` path alias.

## Key Technologies

- **Next.js 16** with React 19
- **@pdftron/webviewer** - Apryse WebViewer for document rendering/editing
- **@veltdev/react** - Velt collaboration components
- **velt-apryse-comments** - Local Apryse-specific comment integration library
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety

## Getting Started

### Install Dependencies

```bash
npm install
```

The `postinstall` script copies the Apryse WebViewer static assets from
`node_modules/@pdftron/webviewer/public` into `public/lib/webviewer`.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Scope | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_VELT_API_KEY` | Browser | Yes | Velt public API key (from [console.velt.dev](https://console.velt.dev)) |
| `VELT_AUTH_TOKEN` | Server only | Yes | Velt auth token — **secret**, used by `/api/velt/token` to mint JWTs |
| `NEXT_PUBLIC_APRYSE_LICENSE_KEY` | Browser | No | Apryse license key — without it the viewer runs in demo mode (watermark) |

`.env.local` is gitignored, so secrets are never committed. The
`NEXT_PUBLIC_` prefix exposes a variable to the browser; `VELT_AUTH_TOKEN`
has no prefix and stays server-side only.

### Deploying to Vercel

Add the same variables under **Project → Settings → Environment Variables**.

- `NEXT_PUBLIC_*` variables are inlined at **build time** — set them before
  deploying (or redeploy after adding them).
- `VELT_AUTH_TOKEN` is read at **runtime** on the server.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Usage

### Adding Comments

1. **Select text**: Highlight any portion of text in the document
2. **Click "Add Comment"**: Use the floating toolbar at the bottom of the editor
3. **Write comment**: Add your feedback with optional @mentions
4. **Submit**: Comment appears as a highlighted annotation on the text

### Viewing Comments

1. **Inline highlights**: Commented text is visually marked with highlights
2. **Click highlights**: Click any highlighted text to view and reply to comments
3. **Comment sidebar**: Open the sidebar to see all comments
4. **Notifications**: Check the bell icon for new comment activity

## About Velt SDK

With Velt SDK you can add powerful collaboration features to your product extremely fast.

### Resources
- 📚 [Documentation](https://docs.velt.dev/get-started/overview)
- 🎨 [Use Cases](https://velt.dev/use-case)
- 📝 [Release Notes](https://docs.velt.dev/release-notes/version-4/sdk-changelog)
