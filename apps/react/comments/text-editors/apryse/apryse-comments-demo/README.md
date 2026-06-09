# Apryse Comments Demo

## Overview

This demo showcases **contextual commenting on documents** built using the **Apryse WebViewer** integrated with **Velt's commenting system**. Users can select text in a DOCX, add comments with @mentions, and collaborate asynchronously on document feedback.

## Path

```
apps/react/comments/text-editors/apryse/apryse-comments-demo/
```

## Package Name

`@apps/react-text-editors-apryse-apryse-comments-demo`

## Features

### Velt Commenting Features
- **Text Selection Comments**: Select any text in the document to add inline comments
- **Add Comment Toolbar**: Floating pill button to create a comment on the current selection
- **Comment Annotations**: Visual markers showing commented text with highlighting
- **Comments Sidebar**: Centralized view of all document comments
- **@Mentions**: Tag collaborators in comments for direct feedback
- **Real-time Updates**: See new comments and replies instantly
- **Presence Awareness**: See who's currently viewing the document
- **Notifications**: Get notified of new comments and mentions

### Editor Features
- **Apryse WebViewer**: DOCX rendering and editing powered by Apryse (`docxEditor` mode)
- **Theme Sync**: WebViewer light/dark theme follows the app's theme toggle

## Directory Structure

```
apryse-comments-demo/
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
│   ├── icon.png                        # Favicon
│   ├── layout.tsx                      # Root layout with app providers
│   └── page.tsx                        # Main page with Velt provider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools and theme toggle
│   ├── theme/
│   │   ├── ThemeContext.tsx            # Light/dark theme context
│   │   └── ThemeToggle.tsx             # Theme toggle button
│   ├── document/
│   │   ├── document-canvas.tsx         # Main document wrapper
│   │   └── ApryseComponent/
│   │       ├── ApryseComponent.tsx     # Apryse WebViewer with Velt comments
│   │       ├── index.tsx               # Barrel export
│   │       ├── constants.ts            # WebViewer config (doc URL, editor id)
│   │       ├── types.ts                # TypeScript type definitions
│   │       └── ui/
│   │           └── AddCommentToolbar.tsx # Floating "Add Comment" toolbar
│   ├── velt/
│   │   ├── ui-customization/
│   │   │   ├── VeltCommentToolWf.tsx       # Customized comment tool
│   │   │   ├── VeltCustomization.tsx       # Velt UI customization wrapper
│   │   │   ├── VeltNotificationsToolWf.tsx # Customized notifications
│   │   │   ├── VeltSidebarButtonWf.tsx     # Customized sidebar button
│   │   │   └── styles.css                  # UI customization styles
│   │   ├── VeltCollaboration.tsx       # Velt client setup
│   │   ├── VeltInitializeDocument.tsx  # Document initialization
│   │   ├── VeltInitializeUser.tsx      # User initialization (authProvider + JWT)
│   │   └── VeltTools.tsx               # Velt component exports
│   └── velt-logo.tsx                   # Velt logo component
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   ├── icons/                          # SVG icons
│   └── lib/webviewer/                  # Apryse WebViewer assets (generated, gitignored)
├── scripts/
│   └── copy-webviewer-assets.mjs       # Copies WebViewer static assets to /public on install
├── styles/
│   └── globals.css                     # Global styles
├── .env.example                        # Example environment variables
├── .npmrc                              # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
├── vercel.json
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **@pdftron/webviewer** - Apryse WebViewer for document rendering/editing
- **@veltdev/apryse-velt-comments** - Velt comments integration for Apryse WebViewer
- **@veltdev/react** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

The `postinstall` script (`scripts/copy-webviewer-assets.mjs`) copies the Apryse WebViewer static assets from `node_modules/@pdftron/webviewer/public` into `public/lib/webviewer`. These assets are gitignored and regenerated on every install.

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

`.env.local` is gitignored, so secrets are never committed. The `NEXT_PUBLIC_` prefix exposes a variable to the browser; `VELT_AUTH_TOKEN` has no prefix and stays server-side only.

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/comments/text-editors/apryse/apryse-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-text-editors-apryse-apryse-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-text-editors-apryse-apryse-comments-demo build
```

### Deploying to Vercel

Add the same variables under **Project → Settings → Environment Variables**.

- `NEXT_PUBLIC_*` variables are inlined at **build time** — set them before deploying (or redeploy after adding them).
- `VELT_AUTH_TOKEN` is read at **runtime** on the server.

## Usage

### Adding Comments

1. **Select text**: Highlight any portion of text in the document
2. **Click "Add Comment"**: Use the floating toolbar at the bottom of the editor
3. **Write comment**: Add your feedback with optional @mentions
4. **Submit**: Comment appears as a highlighted annotation on the text

### Viewing Comments

1. **Inline highlights**: Commented text is visually marked with highlights
2. **Click highlights**: Click any highlighted text to view and reply to comments
3. **Comments sidebar**: Click the sidebar button in the header to see all comments
4. **Notifications**: Check the bell icon for new comment activity

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

### WebViewer Assets Missing
If the document fails to load or the viewer is blank:
1. Confirm `public/lib/webviewer` exists — it is generated by the `postinstall` script
2. Re-run `pnpm install` to trigger `scripts/copy-webviewer-assets.mjs`
3. Verify `@pdftron/webviewer` is installed in `node_modules`

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in `app/page.tsx`
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port
4. Check browser console for Velt SDK errors

### Comments Not Appearing
If comments aren't showing:
1. Verify the `ApryseVeltComments` extension is attached to the WebViewer instance
2. Check that `useCommentAnnotations()` returns data
3. Ensure `renderComments()` is called in a useEffect
4. Confirm you have text selected and are logged in before adding a comment

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
public-hoist-pattern[]=!tailwindcss
shamefully-hoist=false
```

**Why this matters**:
- This demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration
- Other apps in the monorepo may use Tailwind CSS v4
- Without the `.npmrc`, pnpm would hoist v4 and cause PostCSS build errors

**Do not delete the `.npmrc` file** - it ensures the correct Tailwind version is used.
