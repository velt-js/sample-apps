# Dashboard Page Comments Demo

> **[🚀 View Live Demo](https://sample-apps-dashboard-demo.vercel.app)**


https://github.com/user-attachments/assets/cd457439-841f-491a-93dc-b37f27034b58


## Overview

This demo showcases **contextual page comments** on a **marketing analytics dashboard** built with **Velt's commenting system**. Users can add comments directly on specific dashboard elements like metric cards, charts, and data panels, enabling targeted feedback and collaboration on data insights.

## Path

```
apps/react/comments/dashboard/custom/dashboard-demo/
```

## Package Name

`@apps/react-comments-dashboard-page-comments-dashboard-demo`

## Features

### Commenting System
- **Targeted Comments**: Add comments directly on specific dashboard elements (metric cards, charts, panels)
- **Comment Bubbles**: Visual indicators showing existing comments on dashboard elements
- **Comment Tools**: Click-to-comment interface on each commentable element
- **Comments Sidebar**: Centralized panel displaying all comments across the dashboard
- **Presence Awareness**: See who's currently viewing the dashboard
- **Notifications**: Stay updated on new comments and mentions

### Dashboard Features
- **Metric Cards**: Four key marketing metrics (Search, Reddit, Meta, Twitter/X) with:
  - Current spend values
  - Percentage change indicators
  - Trend visualization (up/down arrows)
  - Individual comment targeting
- **Chart Panels**: Two "Visitors per Week" chart sections with comment capabilities
- **Notification Banner**: Highlighted insights and alerts
- **Breadcrumb Navigation**: Contextual navigation path
- **Responsive Layout**: Clean, dark-themed dashboard interface

### Architecture Highlights
- **Host-Controlled Sidebar**: Comments sidebar state managed at the application level (not within Velt components)
- **Modular Components**: Clean separation with reusable dashboard components
- **Page-Level Comments**: Each panel has unique identifiers for targeted commenting

## Directory Structure

```
dashboard-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       └── token/
│   │           └── route.ts            # Velt JWT token generation endpoint
│   ├── document/
│   │   └── DocumentContext.tsx         # Document context provider
│   ├── userAuth/
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   ├── LoginPanel.tsx              # User login panel component
│   │   ├── useAppUser.ts               # User authentication hook
│   │   └── users.ts                    # Mock user data
│   ├── layout.tsx                      # Root layout with providers
│   └── page.tsx                        # Main page with sidebar state management
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, sidebar toggle, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main dashboard wrapper
│   │   ├── Breadcrumb.tsx              # Breadcrumb navigation component
│   │   ├── DashboardHeader.tsx         # Page title and subtitle component
│   │   ├── MetricCard.tsx              # Reusable metric card with comments
│   │   ├── ChartPanel.tsx              # Reusable chart panel with comments
│   │   ├── NotificationBanner.tsx      # Notification banner component
│   │   └── AddMetricSection.tsx        # Add new metric placeholder
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx   # Velt UI customization wrapper
│       │   └── styles.css              # Custom Velt styles
│       ├── VeltCollaboration.tsx       # Velt client setup and comments configuration
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       ├── VeltTools.tsx               # Velt component exports (Presence, CommentTool, Notifications)
│       └── CommentsSidebarContext.tsx  # Deprecated (state moved to host app)
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   └── assets/
│       └── dashboard/                  # Dashboard icons and images
│           ├── google-logo.svg
│           ├── reddit-logo.svg
│           ├── meta-logo-complete.svg
│           ├── twitter-logo.svg
│           ├── chart-graph.svg
│           ├── icon-*.svg              # Various UI icons
│           └── ...
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
- **@veltdev/react** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety
- **Next.js Image** - Optimized image handling

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/comments/dashboard/custom/dashboard-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-comments-dashboard-page-comments-dashboard-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-comments-dashboard-page-comments-dashboard-demo build
```

## Usage

### Adding Comments

1. **Comment on a specific element**: Click the comment tool icon on any metric card or chart panel
2. **Add your comment**: Type your comment in the popover
3. **Submit**: Comments are instantly visible to all users
4. **View existing comments**: Click comment bubbles to read and reply

### Viewing All Comments

1. Click the sidebar button in the header (chat icon)
2. The comments sidebar slides in from the right
3. View all comments organized by element
4. Filter and navigate through comments
5. Click the X button to close the sidebar

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows comment activity and mentions
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

### Comments Not Syncing
If comments aren't appearing for other users:
1. Check browser console for errors
2. Verify document ID is consistent across users
3. Test with two unique users on different browser profiles
4. Ensure both users are on the same document

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