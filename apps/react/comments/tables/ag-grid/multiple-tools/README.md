# AG-Grid Multiple Comment Tools Demo

## Overview

This demo showcases **cell-level commenting with distributed UI** in a **marketing spend analytics table** built with **AG-Grid** and **Velt's commenting system**. Each cell has its own comment tool that appears on hover, enabling quick, contextual feedback directly where users need it.

## Path

```
apps/react/comments/tables/ag-grid/multiple-tools/
```

## Package Name

`@apps/react-tables-AgGrid-marketing-spend-demo-multiple-comments`

## Features

### Distributed Commenting System
- **Multiple Comment Tools**: Each cell has its own VeltCommentTool that appears on hover
- **Hover-Based UI**: Comment tools only visible when hovering over cells
- **Cell-Level Targeting**: Comments attached to specific cells via targetElementId
- **Independent Threads**: Each cell maintains separate comment discussions
- **Comments Sidebar**: Centralized panel for viewing all comments
- **Presence Awareness**: See who's currently viewing the table
- **Notifications**: Stay updated on new comments and mentions

### Table Features
- **Multi-Channel Analytics**: Track spending across X (Twitter), LinkedIn, Facebook, and Instagram
- **100+ Data Rows**: Daily marketing spend data
- **Custom Sorting**: Click column headers to sort with visual indicators
- **Text Formatting**: Apply bold, italic, underline, and strikethrough to selected cells
- **Inline Editing**: Click cells to edit values directly
- **Pinned Columns**: Row numbers pinned to left for easy reference
- **Dark Theme**: Professional dark mode interface optimized for data viewing
- **Responsive Layout**: Collapsible sidebar for focused table viewing

### User Experience
- **Natural Discovery**: Hover to find comment tools
- **Contextual Interaction**: Comment tool appears in the cell being commented
- **Minimal Visual Clutter**: Clean table appearance when not interacting
- **Immediate Feedback**: Tools appear instantly on hover

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
│   │   │   ├── VeltCellRenderer.tsx         # Cell content + hover-based VeltCommentTool
│   │   │   └── SortIcon.tsx                 # Sort direction indicators
│   │   ├── ui-components/
│   │   │   ├── Breadcrumb.tsx               # Navigation breadcrumb
│   │   │   └── Toolbar.tsx                  # Text formatting buttons
│   │   ├── day-view-table-component.tsx     # Main AG-Grid table orchestrator
│   │   ├── day-view-table-component.css     # Critical styling for comment tools
│   │   └── utils.ts                         # Data generation logic
│   └── velt/
│       ├── ui-customization/
│       │   ├── VeltCustomization.tsx        # Velt UI customization wrapper
│       │   ├── VeltCommentToolWf.tsx        # Custom comment button wireframe
│       │   ├── VeltNotificationsToolWf.tsx  # Custom notifications wireframe
│       │   ├── VeltSidebarButtonWf.tsx      # Custom sidebar button wireframe
│       │   └── styles.css                   # Custom Velt styles
│       ├── VeltCollaboration.tsx            # Velt client setup and comments configuration
│       ├── VeltInitializeDocument.tsx       # Document initialization
│       ├── VeltInitializeUser.tsx           # User initialization
│       └── VeltTools.tsx                    # Velt component exports (no VeltCommentTool here)
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
cd apps/react/comments/tables/ag-grid/multiple-tools
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-tables-AgGrid-marketing-spend-demo-multiple-comments dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-tables-AgGrid-marketing-spend-demo-multiple-comments build
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
- Integrates custom cell renderer with distributed Velt comment tools

### Distributed Comment Tools Pattern

The key feature of this demo is **hover-based distributed comment tools** - each cell gets its own VeltCommentTool that appears only when hovering.

**VeltCellRenderer Implementation** (`VeltCellRenderer.tsx`):

```tsx
export const createVeltCellRenderer = (cellFormatting) => (props: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const cellId = `cell-${params.data.id}-${params.colDef.field}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={textStyle}>{params.value}</span>

      {/* Comment tool only appears on hover */}
      {isHovered && <VeltCommentTool targetElementId={cellId} />}
    </div>
  );
};
```

**Key Characteristics**:
- **Hover State**: Each cell tracks its own hover state using `useState`
- **Conditional Rendering**: Comment tool only renders when `isHovered` is true
- **Element Targeting**: Uses `targetElementId` prop to attach comments to specific cells
- **No Comment Bubbles**: Unlike comment-aggregation demo, this doesn't show comment counts
- **Clean UI**: Table remains clean until user hovers over cells

### AG-Grid Integration

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
- Sortable columns with custom header component
- Editable cells
- Custom cell renderer with hover detection

**Column Configuration**:

```typescript
const columnDefs = [
  {
    field: 'rowNumber',
    headerName: '#',
    width: 50,
    pinned: 'left',
    cellRenderer: RowNumberRenderer,
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    minWidth: 150,
    cellRenderer: createVeltCellRenderer(cellFormatting),
  },
  // ... other columns
];
```

### Data Model

```typescript
interface TableData {
  id: number;
  rowNumber: number;
  date: string;
  x: string;
  linkedin: string;
  facebook: string;
  instagram: string;
}

interface CellFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}
```

**Data Generation**:
- 100 rows with deterministic seeded random values
- Each row includes formatted spend values
- SSR-safe data generation

### Velt Comments Configuration

In `VeltCollaboration.tsx`:

```tsx
<VeltComments
  popoverTriangleComponent={true}
  popoverMode={true}
  shadowDom={false}
  textMode={false}
  commentPinHighlighter={false}
  dialogOnHover={false}
/>
```

Key configurations:
- `popoverMode={true}`: Comments appear in popovers, not inline
- `shadowDom={false}`: Allows custom CSS styling
- No comment aggregation or context matching

## Usage

### Adding Comments

1. **Hover over a cell**: Move your mouse over any cell to reveal the comment tool
2. **Click the comment icon**: The VeltCommentTool appears as a button
3. **Add your comment**: Type your comment in the popover
4. **Submit**: Comment is attached to that specific cell
5. Other users can hover the same cell to see and add comments

### Viewing All Comments

1. Click the sidebar button in the header
2. The comments sidebar slides in from the right
3. View all comments organized by cell
4. Click comment threads to navigate to specific cells

### Formatting Text

1. Select a cell by clicking it
2. Use toolbar buttons to apply formatting:
   - **B** - Bold
   - **I** - Italic
   - **U** - Underline
   - **S** - Strikethrough

### Collaboration Features

- **See active users**: View avatars of online collaborators in the header
- **Receive notifications**: Bell icon shows comment activity
- **Real-time updates**: All comments appear instantly for all users
- **Hover discovery**: Natural interaction pattern - hover to find comment tools

## Comparison with Other Patterns

### vs. Comment Aggregation Demo
- **Aggregation**: Uses context-based grouping across view levels
- **Multiple Tools**: Uses simple element targeting with no aggregation
- **Aggregation**: Shows comment bubbles with counts
- **Multiple Tools**: No comment bubbles, cleaner visual appearance

### vs. Single Tool Demo
- **Single Tool**: One global VeltCommentTool in header, click-to-target pattern
- **Multiple Tools**: Individual tools per cell, hover-based discovery
- **Single Tool**: Two-step interaction (click tool → click cell)
- **Multiple Tools**: One-step interaction (hover → click)

### When to Use Multiple Tools
✅ **Good For:**
- Tables with moderate cell count (< 1000 visible cells)
- Desktop-first applications
- Users familiar with hover interactions
- Quick, contextual commenting workflows

❌ **Not Ideal For:**
- Mobile devices (hover not available)
- Very large tables (performance impact)
- Users who need persistent comment visibility

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom comment tool styling (dark pill button)
- Branded notification panel
- Theme-matched sidebar button

### Adjusting Hover Behavior

To change when comment tools appear, modify `VeltCellRenderer.tsx`:

```tsx
// Current: Appears on hover
{isHovered && <VeltCommentTool targetElementId={cellId} />}

// Alternative: Always visible
<VeltCommentTool targetElementId={cellId} />

// Alternative: Appears on cell focus
{isFocused && <VeltCommentTool targetElementId={cellId} />}
```

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

### Comment Tools Not Appearing on Hover
If comment tools don't show when hovering:
1. Check browser console for JavaScript errors
2. Verify `isHovered` state is updating (use React DevTools)
3. Check CSS for `display: none` or `visibility: hidden` overrides
4. Ensure hover event listeners are attached correctly

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
- [Velt Table Comments Documentation](https://docs.velt.dev/comments/customize-behavior/targeted-commenting)
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
