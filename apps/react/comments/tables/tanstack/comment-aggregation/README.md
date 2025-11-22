# TanStack Table Comment Aggregation Demo

> **[🚀 View Live Demo](https://sample-apps-tanstack-comment-aggreg.vercel.app)**


https://github.com/user-attachments/assets/988642d5-7ad9-40e9-9db8-b8f114081cf7


## Overview

This demo showcases **comment aggregation** in a **marketing spend analytics table** built with **TanStack Table** and **Velt's context-based commenting system**. The key innovation is **context-aware comment organization** that allows comments to "bubble up" through aggregation levels - comments on individual days automatically appear in weekly and monthly views. This demonstrates TanStack Table's headless architecture combined with Velt's powerful partial context matching.

## Path

```
apps/react/comments/tables/tanstack/comment-aggregation/
```

## Package Name

`@apps/react-tables-TanStack-marketing-spend-demo-comment-aggregation`

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
- **Inline Editing**: Double-click cells to edit values directly
- **Pinned Columns**: Row numbers pinned to left for easy reference
- **Dark Theme**: Professional dark mode interface optimized for data viewing
- **Responsive Layout**: Collapsible sidebar for focused table viewing

### TanStack Table Advantages
- **Headless UI**: Complete control over table rendering and styling
- **Lightweight**: No dependency on heavy grid libraries (~15KB)
- **Flexible Rendering**: Custom cell renderers with full React component control
- **Type Safety**: Full TypeScript support with strong typing
- **Performance**: Efficient re-rendering and data transformation

### Data Model
- **100 Rows**: Daily marketing spend data across 4 channels
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
│   └── page.tsx                        # Main page with VeltProvider
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools (presence, sidebar toggle, notifications)
│   ├── sidebar/
│   │   ├── sidebar.tsx                 # Left navigation sidebar
│   │   └── SidebarContext.tsx          # Sidebar state context
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
│   │   ├── hooks/
│   │   │   └── useTableState.tsx            # Table state management hook
│   │   ├── day-view-table-component.tsx     # Main TanStack Table orchestrator
│   │   ├── day-view-table-component.css     # Table styling
│   │   ├── styles.ts                        # Inline style definitions
│   │   ├── types.ts                         # TypeScript type definitions
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
cd apps/react/comments/tables/tanstack/comment-aggregation
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-tables-TanStack-marketing-spend-demo-comment-aggregation dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-tables-TanStack-marketing-spend-demo-comment-aggregation build
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
- Manages table data, view switching (day/week/month), and aggregation
- Handles cell selection, formatting, and sorting state
- Integrates custom cell renderer with Velt comment tools

### Comment Aggregation System

The core innovation of this demo is **context-aware comment aggregation** using Velt's partial context matching.

**Comment Context Structure**:

```typescript
interface CommentContext {
  channel: string;     // "linkedin" | "facebook" | "instagram" | "x"
  day?: number;        // Only in day view (1-31)
  week?: number;       // In day & week views (1-53)
  month: number;       // Always included (1-12)
  year: number;        // Always included (2025)
}
```

**How Aggregation Works**:

1. **Day View**: Comments scoped to specific day + channel + month + year
   ```typescript
   { channel: "linkedin", day: 15, week: 3, month: 4, year: 2025 }
   ```

2. **Week View**: Comments scoped to week + channel (day removed)
   ```typescript
   { channel: "linkedin", week: 3, month: 4, year: 2025 }
   ```

3. **Month View**: Comments scoped to channel + month + year only
   ```typescript
   { channel: "linkedin", month: 4, year: 2025 }
   ```

**Partial Context Matching**:

The `VeltCommentTool` and `VeltCommentBubble` components use `contextOptions={{ partialMatch: true }}`, which enables comments to appear when context partially matches:

```tsx
<VeltCommentTool
  targetCommentElementId={cellId}
  context={commentContext}
  contextOptions={{ partialMatch: true }}
/>
```

**Example Workflow**:
- User adds comment to Day 15, LinkedIn cell: "Budget needs adjustment"
- Switches to Week View → Same comment appears on Week 3, LinkedIn
- Switches to Month View → Same comment appears on April, LinkedIn
- The comment "bubbles up" through the aggregation hierarchy

### TanStack Table Integration

**Headless Table Approach**:

TanStack Table provides table logic without enforcing any UI:

```tsx
const table = useReactTable({
  data: displayData, // Changes based on view type
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

**View Switching and Data Aggregation**:

The table data transforms based on the selected view:

```tsx
const displayData = useMemo(() => {
  switch (viewType) {
    case 'week':
      return aggregateDataByWeek(rowData);
    case 'month':
      return aggregateDataByMonth(rowData);
    default:
      return rowData;
  }
}, [viewType, rowData]);
```

**Custom Cell Renderer** (`VeltCellRenderer.tsx`):

The cell renderer combines TanStack Table's cell rendering with Velt comment tools and context:

```tsx
<div className="velt-cell-content">
  <span style={textStyle}>{value}</span>

  <VeltCommentTool
    targetCommentElementId={cellId}
    context={commentContext}
    contextOptions={{ partialMatch: true }}
  />

  <VeltCommentBubble
    targetCommentElementId={cellId}
    context={commentContext}
    contextOptions={{ partialMatch: true }}
  />
</div>
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

### Data Generation & Aggregation

**Daily Data Generation** (`generateTableData()`):
- Creates 100 rows with deterministic seeded random values
- Each row includes date metadata (day, week, month, year)
- Spend values within channel-specific ranges

**Weekly Aggregation** (`aggregateDataByWeek()`):
- Groups daily data into 52 weeks
- Sums spend values for each channel
- Maintains week/month/year context

**Monthly Aggregation** (`aggregateDataByMonth()`):
- Groups daily data into 12 months
- Sums spend values for each channel
- Maintains month/year context

### TanStack Table vs AG-Grid

**Key Differences in This Demo**:

| Feature | TanStack Table | AG-Grid |
|---------|----------------|---------|
| **Data Transformation** | Manual `useMemo` for view switching | Can use built-in aggregation |
| **Table Rendering** | Manual `<table>` elements | Automatic DOM generation |
| **Cell Context** | Props passed to cell components | Cell renderer receives `params` |
| **Styling** | Complete CSS control | Theme-based customization |
| **Bundle Size** | ~15KB | ~500KB+ |
| **Learning Curve** | Lower for basic tables | Higher for advanced features |

**Why TanStack Table for This Demo**:
- Complete control over aggregation logic
- Lighter weight for web applications
- Easier to understand data flow
- More flexibility in custom rendering

### Velt Comments Configuration

In `VeltCollaboration.tsx`:

```tsx
<VeltComments
  popoverMode={true}
  groupMatchedComments={true}
  commentPinHighlighter={false}
  textMode={false}
  shadowDom={false}
/>

<VeltCommentsSidebar
  groupConfig={{ enable: false }}
/>
```

Key configurations:
- `popoverMode={true}`: Comments appear in popovers, not inline
- `groupMatchedComments={true}`: Comments are grouped across contexts
- `shadowDom={false}`: Allows custom CSS styling

### Header Integration

The header (`components/header/header.tsx`) contains Velt tools:
1. **VeltPresence** - Show online users
2. **VeltSidebarButton** - Toggle comments sidebar
3. **VeltNotificationsTool** - Notifications with tabs

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

### Editing Cell Values

1. **Double-click a cell**: Enter edit mode
2. **Type new value**: Cell becomes editable
3. **Press Enter**: Save changes
4. **Press Escape**: Cancel editing

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

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom comment tool styling (dark pill button)
- Custom comment bubble styling (count display)
- Branded notification panel
- Theme-matched sidebar button

### Styling the Table

TanStack Table gives complete control over table styling:
- **`day-view-table-component.css`**: Main table styles
- **`styles.ts`**: Inline style definitions
- **Custom components**: Full control over header/cell rendering

### Adding New Columns

To add a new marketing channel column:

1. Update `TableData` interface in `types.ts`
2. Add column definition to `columns` array
3. Update `generateTableData()` to include new channel data
4. The comment system will automatically work with the new column

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

### Comments Not Aggregating
If comments aren't appearing across view levels:
1. Verify `partialMatch: true` is set in `contextOptions`
2. Check that context structure matches the pattern (day → week → month hierarchy)
3. Ensure `groupMatchedComments={true}` in VeltComments configuration
4. Test with browser console to see context values

### Table Not Rendering
If the table doesn't appear:
1. Check browser console for TanStack Table errors
2. Verify data is being generated correctly
3. Ensure column definitions are valid
4. Check that view switching logic is working

### View Switching Issues
If view switching doesn't work:
1. Verify `displayData` is updating based on `viewType`
2. Check aggregation functions (`aggregateDataByWeek`, `aggregateDataByMonth`)
3. Ensure context is being updated correctly for each view
4. Look for errors in browser console

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
- [Velt Comment Aggregation Documentation](https://docs.velt.dev/comments/customize-behavior/group-matched-comments)
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
