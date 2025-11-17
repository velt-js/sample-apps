# TanStack Table Multiple Comment Tools Demo

## Overview

This demo showcases **per-cell comment tools** in a **marketing spend analytics table** built with **TanStack Table** and **Velt's multiple comment tools pattern**. Each cell has its own comment button that appears on hover, providing a more discoverable and direct commenting experience. This demo demonstrates the headless UI approach of TanStack Table combined with Velt's flexible commenting system.

## Path

```
apps/react/comments/tables/tanstack/multiple-tools/
```

## Package Name

`@apps/react-tables-TanStack-marketing-spend-demo-multiple-comments`

## Features

### Multiple Comment Tools Pattern
- **Per-Cell Comment Tools**: Each cell has its own comment button (appears on hover)
- **One-Click Commenting**: Hover over cell, click comment button, add comment
- **More Discoverable**: No need to find a global tool first
- **Visual Feedback**: Comment tool visible on hover makes commenting obvious
- **Comment Bubbles**: Visual indicators showing existing comments on cells
- **Comments Sidebar**: Centralized panel displaying all comments across the table
- **Presence Awareness**: See who's currently viewing the table
- **Notifications**: Stay updated on new comments and mentions

### Table Features
- **Multi-Channel Analytics**: Track spending across X (Twitter), LinkedIn, Facebook, and Instagram
- **100 Rows of Data**: Daily marketing spend data
- **Custom Sorting**: Click column headers to sort with visual indicators
- **Text Formatting**: Apply bold, italic, underline, and strikethrough to selected cells
- **Inline Editing**: Double-click cells to edit values directly
- **Pinned Columns**: Row numbers pinned to left for easy reference
- **Dark Theme**: Professional dark mode interface optimized for data viewing
- **Responsive Layout**: Collapsible sidebar for focused table viewing

### TanStack Table Advantages
- **Headless UI**: Complete control over table rendering and styling
- **Lightweight**: No dependency on heavy grid libraries (~15KB)
- **Flexible Rendering**: Custom cell renderers with full React component control
- **Type Safety**: Full TypeScript support with strong typing
- **Performance**: Efficient re-rendering and virtual scrolling support

### Data Model
- **100 Rows**: Daily marketing spend data across 4 channels
- **Date Column**: Formatted dates (e.g., "Mon, Jan 1")
- **Spend Ranges**: Channel-specific spend ranges ($300-$999)

## Directory Structure

```
multiple-tools/
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
│   │   └── header.tsx                  # Header with Velt tools (presence, sidebar toggle, notifications)
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main table wrapper
│   │   ├── grid-components/
│   │   │   ├── CustomHeaderComponent.tsx    # Clickable column headers with sort icons
│   │   │   ├── RowNumberRenderer.tsx        # 1-indexed row numbers
│   │   │   ├── VeltCellRenderer.tsx         # Cell content with per-cell comment tools
│   │   │   └── SortIcon.tsx                 # Sort direction indicators
│   │   ├── ui-components/
│   │   │   ├── Breadcrumb.tsx               # Navigation breadcrumb
│   │   │   └── Toolbar.tsx                  # Text formatting buttons
│   │   ├── hooks/
│   │   │   └── useTableState.tsx            # Table state management hook
│   │   ├── day-view-table-component.tsx     # Main TanStack Table orchestrator
│   │   ├── day-view-table-component.css     # Table styling
│   │   ├── styles.ts                        # Inline style definitions
│   │   ├── types.ts                         # TypeScript type definitions
│   │   └── utils.ts                         # Data generation & utility functions
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx        # Velt UI customization wrapper
│       │   └── styles.css                   # Custom Velt styles
│       ├── VeltCollaboration.tsx            # Velt client setup and comments configuration
│       ├── VeltInitializeDocument.tsx       # Document initialization
│       ├── VeltInitializeUser.tsx           # User initialization
│       └── VeltTools.tsx                    # Velt component exports
├── hooks/                                   # Application-level hooks
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
- **TanStack Table v8** - Headless table library
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
cd apps/react/comments/tables/tanstack/multiple-tools
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-tables-TanStack-marketing-spend-demo-multiple-comments dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-tables-TanStack-marketing-spend-demo-multiple-comments build
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
- Main orchestrator using TanStack Table's `useReactTable` hook
- Manages table data, sorting, and cell selection state
- Renders custom table structure with full control over HTML/CSS
- Integrates custom cell renderer with per-cell comment tools

### Multiple Comment Tools Pattern

The key differentiator of this demo is **per-cell comment tools** that appear on hover.

**How It Works**:

1. **Per-Cell Tools**: Each cell renders its own `VeltCommentTool` with `targetElementId`
2. **Hover State**: Comment tool only visible when hovering over the cell
3. **User Flow**: Hover over cell → Click comment button → Add comment

**Cell Renderer Implementation** (`VeltCellRenderer.tsx`):

```tsx
export const VeltCellRenderer: React.FC<VeltCellRendererProps> = ({
  data,
  value,
  columnId,
  cellFormatting,
  onCellClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cellId = `cell-${data.id}-${columnId}`;

  // Set ID on parent <td> element
  useEffect(() => {
    if (cellRef.current) {
      const parentCell = cellRef.current.closest('td');
      if (parentCell && parentCell.id !== cellId) {
        parentCell.id = cellId;
      }
    }
  }, [cellId]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{/* Cell content */}</div>

      {/* Comment tool appears only on hover */}
      {isHovered && <VeltCommentTool targetElementId={cellId} />}
    </div>
  );
};
```

**Benefits**:
- **More Discoverable**: Comment tool appears on hover, making it obvious
- **One-Click Experience**: Single click to add comment (vs. two clicks in single-tool)
- **Contextual**: Tool appears exactly where user is focused
- **Intuitive UX**: Follows familiar hover-to-reveal pattern

**Tradeoffs**:
- **More DOM Elements**: Each cell has a VeltCommentTool component (100s of instances)
- **Potentially More Clutter**: Hover state adds visual elements
- **Performance Consideration**: More React components to render and manage

### TanStack Table Integration

**Headless Table Approach**:

TanStack Table is a headless library, providing table logic without enforcing any UI:

```tsx
const table = useReactTable({
  data: rowData,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  sortingFns: {
    dateSortFn,
  },
});
```

**Custom Table Rendering**:

Complete control over table HTML structure:

```tsx
<table className="tanstack-table">
  <thead>
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <th key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody>
    {table.getRowModel().rows.map(row => (
      <tr key={row.id}>
        {row.getVisibleCells().map(cell => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
```

**Column Definitions**:

Columns are defined with full TypeScript typing:

```tsx
const columns = useMemo<ColumnDef<TableData>[]>(() => [
  {
    id: 'rowNumber',
    header: () => <div>#</div>,
    cell: (info) => <RowNumberRenderer rowIndex={info.row.index} />,
    size: 60,
  },
  {
    accessorKey: 'date',
    header: (info) => <CustomHeaderComponent {...info} />,
    cell: (info) => <VeltCellRenderer {...info} />,
    sortingFn: dateSortFn,
  },
  // ... more columns
], []);
```

**Custom Cell Renderer** (`VeltCellRenderer.tsx`):

The cell renderer handles:
- Hover state management for comment tool visibility
- Inline editing via `contentEditable`
- Text formatting styles
- Parent `<td>` element ID assignment

**Inline Editing**:

Cells support inline editing:

```tsx
const handleDoubleClick = () => {
  if (contentRef.current) {
    contentRef.current.contentEditable = 'true';
    setIsEditing(true);
    // Focus and select text
  }
};
```

### Single-Tool vs Multiple-Tools Pattern

**Key Differences**:

| Feature | Single-Tool | Multiple-Tools |
|---------|-------------|----------------|
| **Comment Tools** | 1 global tool | 1 per cell (~500 instances) |
| **Clicks to Comment** | 2 (tool + cell) | 1 (cell hover + click) |
| **Discoverability** | Lower | Higher |
| **DOM Elements** | Fewer | More |
| **Visual Clutter** | Less | More (on hover) |
| **Target Attribute** | Required (`data-velt-target-comment-element-id`) | Not required |
| **Performance** | Better for large tables | Consideration for 1000+ cells |

**When to Use Multiple-Tools**:
- Smaller to medium tables (< 500 cells)
- Discoverability is priority
- One-click experience desired
- Visual feedback on hover is helpful

**When to Use Single-Tool**:
- Very large tables (1000+ cells)
- Performance is critical
- Clean UI is priority
- Users familiar with click-to-target pattern

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

The header (`components/header/header.tsx`) contains Velt tools:
1. **VeltPresence** - Show online users
2. **VeltSidebarButton** - Toggle comments sidebar
3. **VeltNotificationsTool** - Notifications with tabs

**Note**: No global `VeltCommentTool` in header (each cell has its own tool)

## Usage

### Adding Comments (Hover-to-Comment)

1. **Hover over a cell**: Comment tool button appears
2. **Click the comment button**: Comment composer opens
3. **Type your comment**: Add your comment text
4. **Submit**: Comment appears for all users

**Tip**: This is a one-click experience - just hover and click!

### Editing Cell Values

1. **Double-click a cell**: Enter edit mode
2. **Type new value**: Cell becomes editable
3. **Press Enter**: Save changes
4. **Press Escape**: Cancel editing

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

### Styling the Table

TanStack Table gives complete control over table styling. All styles are in:
- **`day-view-table-component.css`**: Main table styles
- **`styles.ts`**: Inline style definitions
- **Custom components**: Full control over header/cell rendering

Example custom styling:

```css
.tanstack-table {
  background: #090909;
  color: white;
}

.tanstack-table td {
  border: 1px solid #1a1a1a;
  padding: 12px;
}

.tanstack-header-cell.header-selected {
  background: rgba(255, 255, 255, 0.1);
}
```

### Switching to Single-Tool Pattern

To switch from multiple-tools to single-tool pattern:

1. **Remove per-cell tools**: Remove `<VeltCommentTool />` from `VeltCellRenderer.tsx`
2. **Add global tool**: Add `<VeltCommentTool />` to header (no `targetElementId`)
3. **Add target attribute**: Add `data-velt-target-comment-element-id` to cells
4. **Remove hover state**: Remove hover state management from cell renderer

See the `single-tool` demo for reference implementation.

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

### Comment Tools Not Appearing on Hover
If hover doesn't show comment tools:
1. Check that hover state is being managed correctly (`isHovered`)
2. Verify `onMouseEnter` and `onMouseLeave` handlers are attached
3. Ensure conditional rendering of `VeltCommentTool` is working
4. Check CSS isn't hiding the comment tool

### Table Not Rendering
If the table doesn't appear:
1. Check browser console for TanStack Table errors
2. Verify data is being generated correctly
3. Ensure column definitions are valid
4. Check that `useReactTable` hook is called correctly

### Performance Issues
If the table feels slow with many cells:
1. Consider using single-tool pattern for large tables
2. Check React DevTools for unnecessary re-renders
3. Ensure cell renderers are properly memoized
4. Consider virtual scrolling for very large datasets

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
- [Velt Comments Documentation](https://docs.velt.dev/comments/overview)
- [TanStack Table Documentation](https://tanstack.com/table/latest)

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
- TanStack Table: [Documentation](https://tanstack.com/table/latest)
- Velt: [Documentation](https://docs.velt.dev)
- Velt Support: [Contact](https://velt.dev/contact)
