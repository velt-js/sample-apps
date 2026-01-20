# Dashboard Inline Comments Demo

> **[🚀 View Live Demo](https://sample-apps-dashboard-inline-commen.vercel.app)**


<!-- VIDEO_PLACEHOLDER -->


## Overview

This demo showcases **inline comments** in a **jobs tracking dashboard** built with **React** and **Velt's commenting system**. Users can add inline comments directly on table cells and job items, enabling contextual feedback and collaboration on specific data points within the dashboard interface.

## Path

```
apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo/
```

## Package Name

`@apps/react-comments-dashboard-inline-comments-demo`

## Features

### Commenting Features
- **Inline Comments**: Add comments directly on table cells and job items
- **Cell-Level Targeting**: Click any cell to attach contextual feedback
- **Comment Bubbles**: Visual indicators showing comment count on cells
- **Comments Sidebar**: Centralized panel displaying all comments across the dashboard
- **@Mentions**: Tag collaborators in comments for direct feedback
- **Notifications**: Stay updated on new comments and replies
- **Presence Awareness**: See who's currently viewing the dashboard

### Dashboard Features
- **Jobs Tracking Table**: View and manage job items with status tracking
- **Summary Cards**: Quick overview of job statistics and metrics
- **Status Badges**: Visual indicators for job status (pending, in progress, completed)
- **Due Date Badges**: Track deadlines with visual due date indicators
- **Pagination**: Navigate through large datasets efficiently
- **Job Detail Modal**: Detailed view of individual job items
- **Action Modal**: Quick actions on job items
- **Dark Theme**: Professional dark mode interface
- **Responsive Layout**: Collapsible sidebar for focused viewing

### Data Model
- **Jobs Data**: Structured job items with status, dates, and metadata
- **User Authentication**: Mock user system with multiple test users
- **Document Context**: Scoped commenting per document/view

## Directory Structure

```
dashboard-inline-comments-demo/
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
│   ├── layout.tsx                      # Root layout with providers
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, sidebar toggle, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main dashboard wrapper
│   │   ├── JobsTable.tsx               # Jobs tracking table component
│   │   ├── SummaryCards.tsx            # Dashboard summary cards
│   │   ├── JobDetailModal.tsx          # Job detail modal
│   │   ├── ActionModal.tsx             # Action modal component
│   │   ├── CommentsSidebar.tsx         # Comments sidebar panel
│   │   ├── StatusBadge.tsx             # Status badge component
│   │   ├── DueBadge.tsx                # Due date badge component
│   │   ├── Avatar.tsx                  # User avatar component
│   │   ├── Pagination.tsx              # Pagination component
│   │   ├── icons.tsx                   # Icon components
│   │   ├── jobs-data.ts                # Jobs data definitions
│   │   └── types.ts                    # TypeScript type definitions
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx        # Velt UI customization wrapper
│       │   ├── VeltCommentToolWf.tsx        # Custom comment button wireframe
│       │   ├── VeltCommentBubbleWf.tsx      # Custom comment bubble wireframe
│       │   ├── VeltCommentsSidebarHeaderWf.tsx # Custom sidebar header wireframe
│       │   ├── VeltNotificationsToolWf.tsx  # Custom notifications wireframe
│       │   ├── VeltSidebarButtonWf.tsx      # Custom sidebar button wireframe
│       │   └── styles.css                   # Custom Velt styles
│       ├── VeltCollaboration.tsx            # Velt client setup and comments configuration
│       ├── VeltInitializeDocument.tsx       # Document initialization
│       ├── VeltInitializeUser.tsx           # User initialization
│       └── VeltTools.tsx                    # Velt component exports
├── hooks/                                   # Custom React hooks
├── lib/
│   └── utils.ts                             # Utility functions
├── public/
│   └── icons/                               # SVG icons
├── styles/
│   └── globals.css                          # Global styles
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                          # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **@veltdev/react** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety
- **Lucide React** - Icons

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/comments/dashboard/inline-comments/dashboard-inline-comments-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-comments-dashboard-inline-comments-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-comments-dashboard-inline-comments-demo build
```

## Usage

### Adding Inline Comments

1. **Hover over a cell**: The comment icon appears on hover
2. **Click comment icon**: Opens the comment dialog
3. **Write comment**: Add your feedback with optional @mentions
4. **Submit**: Comment appears as a bubble indicator on the cell

### Viewing Comments

1. **Cell indicators**: Click comment bubbles showing count on cells
2. **Comments sidebar**: Open the sidebar to see all comments in one place
3. **Navigate to context**: Click comments in sidebar to jump to the relevant cell

### Managing Jobs

1. **View job details**: Click on a job row to open the detail modal
2. **Track status**: View status badges for each job
3. **Monitor deadlines**: Check due date badges for upcoming deadlines
4. **Navigate pages**: Use pagination to browse large datasets

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows comment activity
- **Real-time updates**: All comments appear instantly for all users

## Troubleshooting

### PostCSS Errors
If you see PostCSS/Tailwind errors, ensure:
1. You ran `pnpm install` from the monorepo root
2. You're not accidentally using Tailwind v4

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in your environment
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port

### Comments Not Appearing
If comments aren't showing:
1. Check browser console for errors
2. Verify document ID is properly initialized
3. Ensure Velt components are properly configured

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
