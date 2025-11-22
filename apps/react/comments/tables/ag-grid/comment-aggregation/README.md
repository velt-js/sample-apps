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
- Handles view switching (day/week/month) with data aggregation
- Manages cell selection, formatting, and sorting state
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

### AG-Grid Integration

**Custom Cell Renderer** (`VeltCellRenderer.tsx`):

The key component combining AG-Grid cells with Velt comments:

```tsx
<div className="velt-cell-content">
  <span style={textStyle}>{params.value}</span>

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

## Customization

### UI Customization

Velt components are customized using wireframes in `components/velt/ui-customization/`:
- Custom comment tool styling (dark pill button)
- Custom comment bubble styling (count display)
- Branded notification panel
- Theme-matched sidebar button

### Adding New Columns

To add a new marketing channel column:

1. Update `TableData` interface in `day-view-table-component.tsx`
2. Add column definition to `columnDefs` array
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
- 📦 [GitHub](https://github.com/velt-js/docs) - Velt documentation repository
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

## Support

For issues or questions:
- AG-Grid: [Documentation](https://www.ag-grid.com/react-data-grid/)
- Velt: [Documentation](https://docs.velt.dev)
- Velt Support: [Contact](https://velt.dev/contact)
