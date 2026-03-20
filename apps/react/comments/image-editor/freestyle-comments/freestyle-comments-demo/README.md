# Freestyle Comments Demo

> **[🚀 View Live Demo](https://sample-apps-freestyle-comments-demo.vercel.app)**

https://github.com/user-attachments/assets/d50a4a77-3c89-4fd9-b7f5-1a99cabf6aac


## Overview

This demo showcases **freestyle and text commenting on a website builder canvas** built using **Velt's commenting integration**. Users can pin comments anywhere on the canvas, select text to add inline comments, tag comments with custom labels, and collaborate asynchronously on design feedback.

## Path

```
apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo/
```

## Package Name

`@apps/react-comments-website-builder-freestyle-comments-freestyle-comments-demo`

## Features

### Commenting Features
- **Freestyle Comments**: Click anywhere on the canvas to pin comments
- **Text Selection Comments**: Highlight any text to add inline comments
- **Custom Tags**: Categorize comments with tags (Design, Content, Bug, Enhancement)
- **@Mentions**: Tag collaborators in comments for direct feedback
- **Notifications**: Stay updated on new comments and replies
- **Comment Sidebar**: View and manage all canvas comments in one place
- **Priority Indicators**: Mark comments with priority levels
- **Presence Awareness**: See who's currently viewing the canvas

### Canvas Features
- **Website Builder Preview**: Interactive waitlist landing page mockup
- **Device Preview**: Desktop (1440px) viewport indicator
- **iPhone Mockup**: Mobile preview within the canvas
- **Grid Background**: Visual alignment grid pattern
- **Collapsible Sidebar**: Toggle navigation panel
- **Dark Theme**: Professional dark mode interface

## Directory Structure

```
freestyle-comments-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts            # Velt JWT token generation endpoint
│   ├── document/
│   │   ├── DocumentContext.tsx         # Document context provider
│   │   └── useCurrentDocument.ts       # Document hook
│   ├── userAuth/
│   │   ├── AppProviders.tsx            # App-level providers
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   └── useAppUser.ts               # User authentication hook
│   ├── layout.tsx                      # Root layout with Velt provider
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Document wrapper component
│   │   └── FreestyleCanvas/
│   │       ├── FreestyleCanvas.tsx     # Main canvas with website mockup
│   │       └── index.tsx               # Barrel export
│   └── velt/
│       ├── ui-customization/
│       │   ├── styles.css              # Velt component styles
│       │   ├── VeltCommentBubbleWf.tsx # Customized comment bubble
│       │   ├── VeltCommentToolWf.tsx   # Customized comment tool
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   ├── VeltNotificationsToolWf.tsx # Customized notifications
│       │   └── VeltSidebarButtonWf.tsx # Customized sidebar button
│       ├── VeltCollaboration.tsx       # Velt client setup with custom tags
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   ├── assets/                         # Canvas assets (SVGs, images)
│   └── icons/                          # SVG icons
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

- **Next.js 16** with React 19
- **@veltdev/react** - Velt collaboration components
- **@xyflow/react** - React Flow for canvas interactions
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
cd apps/react/comments/website-builder/freestyle-comments/freestyle-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-comments-website-builder-freestyle-comments-freestyle-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-comments-website-builder-freestyle-comments-freestyle-comments-demo build
```

## Usage

### Adding Freestyle Comments

1. **Click comment tool**: Select the comment tool from the toolbar
2. **Click on canvas**: Click anywhere on the website preview to place a pin
3. **Write comment**: Add your feedback with optional @mentions and tags
4. **Submit**: Comment appears as a pin marker on the canvas

### Adding Text Comments

1. **Select text**: Highlight any text on the canvas
2. **Comment popup**: A comment dialog appears automatically
3. **Write comment**: Add your feedback with optional @mentions and tags
4. **Submit**: Comment is linked to the selected text

### Using Custom Tags

1. **Open comment dialog**: Create a new comment or reply
2. **Select tags**: Choose from Design, Content, Bug, or Enhancement
3. **Multiple tags**: Select multiple tags to categorize your feedback

### Viewing Comments

1. **Pin markers**: Click any pin on the canvas to view and reply to comments
2. **Text highlights**: Click highlighted text to view associated comments
3. **Comment sidebar**: Open the sidebar to see all comments in one place
4. **Notifications**: Check the bell icon for new comment activity

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows comment activity
- **Real-time updates**: All comments appear instantly for all users

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. The `.npmrc` file exists in this directory
2. You ran `pnpm install` from the monorepo root
3. You're not accidentally using Tailwind v4

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in your environment
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port

### Comments Not Appearing
If comments aren't showing:
1. Check browser console for errors
2. Verify the canvas element has `data-name="Waitlist"` attribute
3. Confirm document ID is properly initialized
4. Ensure `allowedElementQuerySelectors` is configured correctly

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
