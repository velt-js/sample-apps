# Dashboard PostgreSQL Self-Hosting Demo

> **[🚀 View Live Demo](https://sample-apps-dashboard-postgres-demo.vercel.app)**


<!-- VIDEO_PLACEHOLDER -->


## Overview

This demo showcases a **self-hosted comments feature** using **Neon PostgreSQL** as the database backend. Instead of using Velt's managed data storage, all comments, reactions, attachments, and user data are stored in your own PostgreSQL database, giving you full control over your collaboration data while still leveraging Velt's powerful UI components.

## Path

```
apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo/
```

## Package Name

`@apps/react-comments-dashboard-postgres-demo`

## Features

### Self-Hosting Features
- **Neon PostgreSQL Backend**: All data stored in your own PostgreSQL database
- **Custom Data Providers**: Full control over data fetching and storage
- **Comment CRUD Operations**: Self-managed create, read, update, delete for comments
- **Attachment Storage**: Self-hosted file attachment management
- **Reaction Storage**: Self-managed reaction data
- **User Data Management**: Store and retrieve user information from PostgreSQL

### Commenting Features
- **Popover Comments**: Add comments on job items and line items
- **Comment Sidebar**: Centralized panel displaying all comments
- **@Mentions**: Tag collaborators in comments
- **Reactions**: React to comments with emojis
- **Attachments**: Attach files to comments
- **Notifications Panel**: Custom notifications display
- **Presence Awareness**: See who's currently viewing

### Dashboard Features
- **Jobs Tracking Table**: View and manage job items with status tracking
- **Summary Cards**: Quick overview of job statistics and metrics
- **Job Detail View**: Detailed view with line item comments
- **Line Items Sidebar**: Comments sidebar for individual line items
- **Status Badges**: Visual indicators for job status
- **Due Date Badges**: Track deadlines with visual indicators
- **Pagination**: Navigate through large datasets
- **Dark Theme**: Professional dark mode interface
- **Responsive Layout**: Collapsible sidebar for focused viewing

## Directory Structure

```
dashboard-postgres-demo/
├── app/
│   ├── api/
│   │   └── velt/
│   │       ├── attachments/
│   │       │   ├── delete/route.ts     # Delete attachment endpoint
│   │       │   ├── get/route.ts        # Get attachments endpoint
│   │       │   └── save/route.ts       # Save attachment endpoint
│   │       ├── comments/
│   │       │   ├── delete/route.ts     # Delete comment endpoint
│   │       │   ├── get/route.ts        # Get comments endpoint
│   │       │   └── save/route.ts       # Save comment endpoint
│   │       ├── reactions/
│   │       │   ├── delete/route.ts     # Delete reaction endpoint
│   │       │   ├── get/route.ts        # Get reactions endpoint
│   │       │   └── save/route.ts       # Save reaction endpoint
│   │       ├── users/
│   │       │   ├── get/route.ts        # Get users endpoint
│   │       │   └── save/route.ts       # Save user endpoint
│   │       ├── store.ts                # PostgreSQL connection and operations
│   │       └── token/route.ts          # Velt JWT token generation
│   ├── document/
│   │   └── JobsContext.tsx             # Jobs data context provider
│   ├── userAuth/
│   │   ├── AppProviders.tsx            # App-level providers
│   │   ├── AppUserContext.tsx          # User authentication context
│   │   └── useAppUser.ts               # User authentication hook
│   ├── layout.tsx                      # Root layout with providers
│   └── page.tsx                        # Main page
├── components/
│   ├── header/
│   │   └── header.tsx                  # Header with Velt tools
│   ├── sidebar/
│   │   └── sidebar.tsx                 # Left navigation sidebar
│   ├── document/
│   │   ├── document-canvas.tsx         # Main dashboard wrapper
│   │   ├── JobsTable.tsx               # Jobs tracking table
│   │   ├── JobsList.tsx                # Jobs list view
│   │   ├── JobDetail.tsx               # Job detail component
│   │   ├── SummaryCards.tsx            # Dashboard summary cards
│   │   ├── LineItemCommentsSidebar.tsx # Line item comments panel
│   │   ├── NotificationsPanel.tsx      # Custom notifications panel
│   │   ├── StatusBadge.tsx             # Status badge component
│   │   ├── DueBadge.tsx                # Due date badge component
│   │   ├── ActionModal.tsx             # Action modal component
│   │   ├── Avatar.tsx                  # User avatar component
│   │   ├── Pagination.tsx              # Pagination component
│   │   ├── icons.tsx                   # Icon components
│   │   ├── jobs-data.ts                # Jobs data definitions
│   │   └── types.ts                    # TypeScript type definitions
│   └── velt/
│       ├── ui-customization/           # Custom Velt UI wireframes
│       ├── VeltCollaboration.tsx       # Velt client setup
│       ├── VeltDataProviders.ts        # Custom data providers for self-hosting
│       ├── VeltInitializeDocument.tsx  # Document initialization
│       ├── VeltInitializeUser.tsx      # User initialization
│       └── VeltTools.tsx               # Velt component exports
├── hooks/                              # Custom React hooks
├── lib/
│   └── utils.ts                        # Utility functions
├── public/
│   └── icons/                          # SVG icons
├── styles/
│   └── globals.css                     # Global styles
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json                     # shadcn/ui configuration
└── package.json
```

## Key Technologies

- **Next.js 16** with React 19
- **pg v8** - PostgreSQL client for Node.js
- **@veltdev/react** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety
- **Sass** - SCSS styling support

## Database Access

### Viewing the PostgreSQL Database

To view and manage the PostgreSQL database, log in to Neon:

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign in with the following credentials:
   - **Username:** eng@velt.dev
   - **Password:** Engpostgresdb1!
3. Navigate to the project to browse tables and data

### Connection String

The application uses the following Neon PostgreSQL connection string (configured in `app/api/velt/store.ts`):

```
postgresql://neondb_owner:npg_ytNISs3UM0hl@ep-delicate-scene-a4k5mjyr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Connecting via psql

You can also connect directly using the `psql` command-line tool:

```bash
psql 'postgresql://neondb_owner:npg_ytNISs3UM0hl@ep-delicate-scene-a4k5mjyr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

Navigate to the demo directory:

```bash
cd apps/react/self-hosting/dashboard/postgres/dashboard-postgres-demo
pnpm dev
```

Or run from the root:

```bash
pnpm --filter @apps/react-comments-dashboard-postgres-demo dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm --filter @apps/react-comments-dashboard-postgres-demo build
```

## Usage

### Adding Comments

1. **Click on a job item**: Opens the comment dialog
2. **Write comment**: Add your feedback with optional @mentions
3. **Submit**: Comment is stored in PostgreSQL and appears for all users

### Viewing Comments

1. **Click comment indicators**: View existing comments on items
2. **Comments sidebar**: Open sidebar to see all comments
3. **Line item comments**: View comments on specific line items in job detail view

### Self-Hosting Data Flow

1. **User adds comment**: Velt SDK captures the comment data
2. **Data provider called**: Custom data provider sends data to your API
3. **API stores in PostgreSQL**: Your Next.js API route stores data in Neon PostgreSQL
4. **Real-time sync**: Other users receive updates via Velt's real-time system

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/velt/comments/get` | POST | Fetch comments for a document |
| `/api/velt/comments/save` | POST | Save a new or updated comment |
| `/api/velt/comments/delete` | POST | Delete a comment |
| `/api/velt/reactions/get` | POST | Fetch reactions |
| `/api/velt/reactions/save` | POST | Save a reaction |
| `/api/velt/reactions/delete` | POST | Delete a reaction |
| `/api/velt/attachments/get` | POST | Fetch attachments |
| `/api/velt/attachments/save` | POST | Save an attachment |
| `/api/velt/attachments/delete` | POST | Delete an attachment |
| `/api/velt/users/get` | POST | Fetch user data |
| `/api/velt/users/save` | POST | Save user data |
| `/api/velt/token` | GET | Generate Velt JWT token |

## Troubleshooting

### PostgreSQL Connection Issues
If the database connection fails:
1. Verify the connection string in `app/api/velt/store.ts`
2. Check Neon project status in the console
3. Ensure SSL mode is properly configured
4. Verify your network allows connections to Neon

### Comments Not Persisting
If comments aren't being saved:
1. Check browser console for API errors
2. Verify PostgreSQL connection in server logs
3. Ensure data providers are properly configured in `VeltDataProviders.ts`
4. Check that database tables are properly created

### Velt Not Loading
If Velt features don't appear:
1. Check that `NEXT_PUBLIC_VELT_API_KEY` is set
2. Verify user initialization in browser console
3. Ensure data providers are registered with Velt client

## About Velt SDK

<a href="https://npmjs.org/package/@veltdev/react">
  <img src="https://img.shields.io/npm/v/@veltdev/react?style=flat&label=npm&color=09f" alt="NPM" />
</a>

With Velt SDK you can add powerful collaboration features to your product extremely fast.

The SDK provides **fullstack components**:
- UI and behavior are fully customizable to match your product's needs
- Fully-managed on a scalable realtime backend OR self-hosted with your own database

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
- 📚 [Self-Hosting Guide](https://docs.velt.dev/self-host-data/overview) - Self-hosting documentation
- 🎨 [Use Cases](https://velt.dev/use-case) - See collaboration in action
- 🎭 [Figma Template](https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit) - Visualize features for your product
- 📝 [Release Notes](https://docs.velt.dev/release-notes/version-4/sdk-changelog) - Latest changes
- 🔒 [Security](https://velt.dev/security) - SOC2 Type 2 & HIPAA compliant
- 🐦 [X/Twitter](https://x.com/veltjs) - Updates and announcements
