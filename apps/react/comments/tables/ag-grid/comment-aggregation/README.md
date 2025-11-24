# AG-Grid Comment Aggregation Demo

> **[🚀 View Live Demo](https://sample-apps-ag-grid-comment-aggrega.vercel.app)**


https://github.com/user-attachments/assets/b96205d4-61ff-4cfb-9f88-ad45bb486e44



## Overview

This demo showcases **comment aggregation** in a **marketing spend analytics dashboard** built with **AG-Grid** and **Velt's commenting system**. The key innovation is **context-aware comment organization** that allows comments to "bubble up" through aggregation levels - comments on individual days automatically appear in weekly and monthly views.

## Path

```
apps/react/comments/tables/ag-grid/comment-aggregation/
```

## Package Name

`@apps/react-tables-AgGrid-marketing-spend-demo-comment-aggregation`

## Features

### Comment Aggregation System
- **Context-Based Organization**: Comments automatically group across view levels using partial context matching
- **Multi-Level Views**: Switch between Day View (100 days), Weekly View (52 weeks), and Monthly View (12 months)
- **Intelligent Grouping**: Add a comment on Day 15 LinkedIn, see it on Week 2 LinkedIn and April LinkedIn
- **Cell-Level Comments**: Add comments directly to individual cells with VeltCommentTool
- **Comment Bubbles**: Visual indicators showing comment count on cells
- **Comments Sidebar**: Centralized panel displaying all comments across the table
- **Presence Awareness**: See who's currently viewing the table
- **Notifications**: Stay updated on new comments and mentions

### Table Features
- **Multi-Channel Analytics**: Track spending across X (Twitter), LinkedIn, Facebook, and Instagram
- **Data Aggregation**: Automatic rollup of daily spend to weekly and monthly totals
- **Custom Sorting**: Click column headers to sort with visual indicators
- **Text Formatting**: Apply bold, italic, underline, and strikethrough to selected cells
- **Inline Editing**: Click cells to edit values directly
- **Pinned Columns**: Row numbers pinned to left for easy reference
- **Dark Theme**: Professional dark mode interface optimized for data viewing
- **Responsive Layout**: Collapsible sidebar for focused table viewing

### Data Model
- **100 Rows**: Daily marketing spend data across 4 channels
- **Deterministic Generation**: Seeded random values for consistent SSR
- **Date Metadata**: Each row includes day, week, month, year for context matching
- **Spend Ranges**: Channel-specific spend ranges ($300-$999)

## Directory Structure

```
comment-aggregation/
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
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, sidebar toggle, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main table wrapper with SidebarProvider
│   │   ├── grid-components/
│   │   │   ├── CustomHeaderComponent.tsx    # Clickable column headers with sort icons
│   │   │   ├── RowNumberRenderer.tsx        # 1-indexed row numbers
│   │   │   ├── VeltCellRenderer.tsx         # Cell content + Velt comment tools
│   │   │   └── SortIcon.tsx                 # Sort direction indicators
│   │   ├── ui-components/
│   │   │   ├── Breadcrumb.tsx               # Navigation breadcrumb
│   │   │   ├── ViewToggle.tsx               # Day/Week/Month view buttons
│   │   │   └── Toolbar.tsx                  # Text formatting buttons
│   │   ├── day-view-table-component.tsx     # Main AG-Grid table orchestrator
│   │   ├── day-view-table-component.css     # Critical styling for comment tools
│   │   └── utils.ts                         # Data generation & aggregation logic
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx        # Velt UI customization wrapper
│       │   ├── VeltCommentToolWf.tsx        # Custom comment button wireframe
│       │   ├── VeltCommentBubbleWf.tsx      # Custom comment bubble wireframe
│       │   ├── VeltNotificationsToolWf.tsx  # Custom notifications wireframe
│       │   ├── VeltSidebarButtonWf.tsx      # Custom sidebar button wireframe
│       │   └── styles.css                   # Custom Velt styles
│       ├── VeltCollaboration.tsx            # Velt client setup and comments configuration
│       ├── VeltInitializeDocument.tsx       # Document initialization
│       ├── VeltInitializeUser.tsx           # User initialization
│       └── VeltTools.tsx                    # Velt component exports
├── hooks/
│   └── use-table-state.tsx                  # Table state management hook
├── lib/
│   └── utils.ts                             # Utility functions
├── public/
│   └── assets/                              # Icons and images
├── styles/
│   └── globals.css                          # Global styles
├── .npmrc                                   # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                          # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 15** with React 19
- **AG-Grid Community v33** - Advanced table features
- **@veltdev/react** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety
- **seedrandom** - Deterministic data generation

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/comments/tables/ag-grid/comment-aggregation
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-tables-AgGrid-marketing-spend-demo-comment-aggregation dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-tables-AgGrid-marketing-spend-demo-comment-aggregation build
```

## Usage

### Adding Comments

1. **Comment on a cell**: Click the comment icon on any cell
2. **Add your comment**: Type your comment in the popover
3. **Submit**: Comment appears for all users
4. **View existing comments**: Click comment bubbles showing count

### Viewing Comment Aggregation

1. **Start in Day View**: Add a comment to any cell (e.g., Day 15, LinkedIn)
2. **Switch to Week View**: Click "Weekly View" - your comment appears on the corresponding week
3. **Switch to Month View**: Click "Monthly View" - your comment appears on the month total
4. The comment "bubbles up" through aggregation levels automatically

### Switching Views

- **Day View**: Shows 100 individual days of data
- **Weekly View**: Shows 52 weeks with aggregated spend totals
- **Monthly View**: Shows 12 months with aggregated spend totals

### Formatting Text

1. Select a cell by clicking it
2. Use toolbar buttons to apply formatting:
   - **B** - Bold
   - **I** - Italic
   - **U** - Underline
   - **S** - Strikethrough

### Viewing All Comments

1. Click the sidebar button in the header
2. The comments sidebar slides in from the right
3. View all comments organized by context
4. Click cells to navigate to commented areas

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

### Comments Not Aggregating
If comments aren't appearing across view levels:
1. Verify `partialMatch: true` is set in `contextOptions`
2. Check that context structure matches the pattern (day → week → month hierarchy)
3. Ensure `groupMatchedComments={true}` in VeltComments configuration
4. Test with browser console to see context values

### AG-Grid Not Rendering
If the table doesn't appear:
1. Check browser console for AG-Grid license warnings (community version is free)
2. Verify AG-Grid CSS is imported in `day-view-table-component.tsx`
3. Ensure custom theme parameters are valid

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
- 📝 [Release Notes](https://docs.velt.dev/release-notes/) - Latest changes
- 🔒 [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- 🐦 [X/Twitter](https://x.com/veltjs) - Updates and announcements
- [Velt Comment Aggregation Documentation](https://docs.velt.dev/comments/customize-behavior/group-matched-comments)
- [AG-Grid Documentation](https://www.ag-grid.com/react-data-grid/)

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
