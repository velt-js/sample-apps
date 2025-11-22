# AG-Grid Single Comment Tool Demo

> **[🚀 View Live Demo](https://sample-apps-ag-grid-single-tool.vercel.app)**

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

## Implementation Details

### Application Architecture

The application is structured around several key areas:

**User Authentication** (`app/userAuth/`)
- `AppUserContext` provides user state across the application
- `useAppUser` hook manages user selection and authentication
- `LoginPanel` allows switching between mock users for testing collaboration
- Mock user data simulates multi-user scenarios

**Document Management** (`app/document/`)
- `DocumentContext` manages the current document state
- Document ID tracked via URL parameter and localStorage
- Each document is an independent Velt collaboration scope

**JWT Token Generation** (`app/api/velt/token/`)
- Backend route generates secure JWT tokens for Velt authentication
- Integrates with Velt's Auth Provider approach

**Table Component** (`components/document/day-view-table-component.tsx`)
- Main orchestrator managing AG-Grid instance, data, and Velt integration
- Handles cell selection, formatting, and sorting state
- Integrates custom cell renderer with click-to-target comment pattern

### Single Comment Tool Pattern

The key differentiator of this demo is the **click-to-target commenting pattern** using a global comment tool.

**How It Works**:

1. **Global Comment Tool**: One `VeltCommentTool` component in the header (no `targetElementId` prop)
2. **Cell Setup**: Each cell has both `id` and `data-velt-target-comment-element-id` attributes with matching values
3. **User Flow**: Click comment tool → Click cell → Add comment

**Cell Renderer Implementation** (`VeltCellRenderer.tsx`):

```tsx
useEffect(() => {
  if (cellRef.current) {
    const parentCell = cellRef.current.closest('.ag-cell');
    if (parentCell) {
      // [Velt] Set the element ID
      parentCell.id = cellId;
      // [Velt] For single-tool pattern: both attributes must match
      parentCell.setAttribute('data-velt-target-comment-element-id', cellId);
    }
  }
}, [cellId]);
```

**Benefits**:
- **Cleaner UI**: No comment tool buttons in every cell
- **Fewer DOM Elements**: Better performance with large tables
- **Consistent UX**: Familiar click-to-target interaction pattern
- **Less Visual Clutter**: Focus remains on data, not tools

**Tradeoffs**:
- **Two Clicks Required**: Must click tool first, then cell (vs. one-click in multiple-tools pattern)
- **Less Discoverable**: Users must notice the header tool
- **Mode-Based Interaction**: Users enter "comment mode" temporarily

### AG-Grid Integration

**Custom Cell Renderer** (`VeltCellRenderer.tsx`):

The cell renderer is a factory function that creates AG-Grid-compatible cell renderers:

```tsx
export const createVeltCellRenderer = (
  cellFormatting: Record<string, CellFormatting>,
  documentId: string | null
) => {
  const VeltCellRenderer = (props: any) => {
    // Cell rendering logic with click-to-target setup
  };
  return VeltCellRenderer;
};
```

**Dark Theme Configuration**:

Custom AG-Grid theme using `themeQuartz.withParams()`:

```javascript
{
  backgroundColor: '#090909',
  headerBackgroundColor: '#090909',
  rowHoverColor: 'rgba(255, 255, 255, 0.05)',
  rowHeight: 54,
  headerHeight: 54,
  fontFamily: 'Urbanist, sans-serif'
}
```

**Grid Features**:
- Pinned row number column
- Resizable columns
- Sortable columns with custom comparator for dates
- Editable cells
- Custom header component with sort indicators

### Velt Comments Configuration

In `VeltCollaboration.tsx`:

```tsx
<VeltComments
  popoverMode={true}
  commentPinHighlighter={false}
  textMode={false}
  shadowDom={false}
/>

<VeltCommentsSidebar />
```

Key configurations:
- `popoverMode={true}`: Comments appear in popovers, not inline
- `shadowDom={false}`: Allows custom CSS styling
- No `groupMatchedComments` (not using context-based grouping in this demo)

### Header Integration

The header (`components/header/header.tsx`) contains Velt tools in this order:
1. **VeltPresence** - Show online users
2. **VeltCommentTool** - Global click-to-target comment tool (no `targetElementId`)
3. **VeltSidebarButton** - Toggle comments sidebar
4. **VeltNotificationsTool** - Notifications with tabs

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

## Customization

### UI Customization

Velt components can be customized in `components/velt/ui-customization/`:
- Custom styling via `VeltCustomization` component
- Theme matching with table's dark aesthetic
- Custom CSS for Velt components

### Switching to Multiple-Tools Pattern

To switch from single-tool to multiple-tools pattern:

1. **Remove global tool**: Remove `<VeltCommentTool />` from header
2. **Add per-cell tools**: Import `VeltCommentTool` in `VeltCellRenderer.tsx`
3. **Update cell renderer**: Add `<VeltCommentTool targetElementId={cellId} />` to each cell
4. **Remove target attribute**: Remove `data-velt-target-comment-element-id` from cells (keep `id`)
5. **Add hover state**: Show/hide comment tool based on cell hover

See the `multiple-tools` demo for reference implementation.

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
- 📦 [GitHub](https://github.com/velt-js/docs) - Velt documentation repository
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

## Support

For issues or questions:
- AG-Grid: [Documentation](https://www.ag-grid.com/react-data-grid/)
- Velt: [Documentation](https://docs.velt.dev)
- Velt Support: [Contact](https://velt.dev/contact)
