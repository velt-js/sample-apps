# AG-Grid Single Comment Tool Demo

> **[🚀 View Live Demo](https://sample-apps-ag-grid-single-tool.vercel.app)**


https://github.com/user-attachments/assets/a26b8d70-cdd6-40a4-8939-a2bee74d97a4



## Overview

This demo showcases **click-to-target commenting** in a **marketing spend analytics table** built with **AG-Grid** and **Velt's single comment tool pattern**. Unlike traditional cell-by-cell comment tools, this pattern uses one global comment tool in the header - users click the tool, then click any cell to add a comment. This provides a cleaner UI with fewer visible buttons while maintaining full commenting functionality.

## Path

```
apps/react/comments/tables/ag-grid/single-tool/
```

## Package Name

`@apps/react-tables-AgGrid-marketing-spend-demo-single-comment`

## Features

### Single Comment Tool Pattern
- **Global Comment Tool**: One comment tool button in the header (not per-cell)
- **Click-to-Target**: Click the tool, then click any cell to add a comment
- **Clean UI**: No hover-state comment buttons cluttering cells
- **Comment Bubbles**: Visual indicators showing existing comments on cells
- **Comments Sidebar**: Centralized panel displaying all comments across the table
- **Presence Awareness**: See who's currently viewing the table
- **Notifications**: Stay updated on new comments and mentions

### Table Features
- **Multi-Channel Analytics**: Track spending across X (Twitter), LinkedIn, Facebook, and Instagram
- **100 Rows of Data**: Daily marketing spend data
- **Custom Sorting**: Click column headers to sort with visual indicators
- **Text Formatting**: Apply bold, italic, underline, and strikethrough to selected cells
- **Inline Editing**: Click cells to edit values directly
- **Pinned Columns**: Row numbers pinned to left for easy reference
- **Dark Theme**: Professional dark mode interface optimized for data viewing
- **Responsive Layout**: Collapsible sidebar for focused table viewing

### Data Model
- **100 Rows**: Daily marketing spend data across 4 channels
- **Date Column**: Formatted dates (e.g., "Mon, Jan 1")
- **Spend Ranges**: Channel-specific spend ranges ($300-$999)

## Directory Structure

```
single-tool/
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
│   └── page.tsx                        # Main page with VeltProvider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, comment tool, sidebar toggle, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main table wrapper
│   │   ├── grid-components/
│   │   │   ├── CustomHeaderComponent.tsx    # Clickable column headers with sort icons
│   │   │   ├── RowNumberRenderer.tsx        # 1-indexed row numbers
│   │   │   ├── VeltCellRenderer.tsx         # Cell content with click-to-target setup
│   │   │   └── SortIcon.tsx                 # Sort direction indicators
│   │   ├── ui-components/
│   │   │   ├── Breadcrumb.tsx               # Navigation breadcrumb
│   │   │   └── Toolbar.tsx                  # Text formatting buttons
│   │   ├── day-view-table-component.tsx     # Main AG-Grid table orchestrator
│   │   ├── day-view-table-component.css     # Critical styling for comment integration
│   │   └── utils.ts                         # Data generation & utility functions
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx        # Velt UI customization wrapper
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
- **AG-Grid Community v34** - Advanced table features
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
cd apps/react/comments/tables/ag-grid/single-tool
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-tables-AgGrid-marketing-spend-demo-single-comment dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-tables-AgGrid-marketing-spend-demo-single-comment build
```

## Usage

### Adding Comments (Click-to-Target)

1. **Click the comment tool**: In the header, click the comment button
2. **Click a cell**: Click any cell in the table to target it
3. **Add your comment**: Type your comment in the popover
4. **Submit**: Comment appears for all users

**Important**: You must click the comment tool first, then click the cell. This is different from the multiple-tools pattern where each cell has its own button.

### Viewing Existing Comments

1. **Comment bubbles**: Cells with comments show bubble indicators with count
2. **Click bubble**: Click to read and reply to existing comments
3. **Sidebar view**: Use sidebar button to see all comments in one panel

### Formatting Text

1. Select a cell by clicking it
2. Use toolbar buttons to apply formatting:
   - **B** - Bold
   - **I** - Italic
   - **U** - Underline
   - **S** - Strikethrough

### Sorting Data

1. Click any column header to sort
2. Click again to reverse sort direction
3. Visual indicators show current sort state

### Viewing All Comments

1. Click the sidebar button in the header
2. The comments sidebar slides in from the right
3. View all comments organized by cell
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
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set in `app/page.tsx`
2. Verify user initialization in browser console
3. Ensure you're running the dev server on the correct port

### Click-to-Target Not Working
If clicking cells doesn't add comments:
1. Verify you clicked the comment tool in the header first
2. Check that both `id` and `data-velt-target-comment-element-id` are set on cells
3. Ensure both attributes have the same value
4. Inspect the cell element in browser DevTools to confirm attributes

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
- [Velt Click-to-Target Documentation](https://docs.velt.dev/comments/customize-behavior/click-to-target)
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
