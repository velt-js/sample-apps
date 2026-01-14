# Dashboard MongoDB Self-Hosting Demo

## Overview

This demo showcases a self-hosted comments feature using **MongoDB Atlas** as the database backend.

## Path

```
apps/react/comments/dashboard/self-hosting/dashboard-mongo-db-demo/
```

## Package Name

`@apps/react-comments-dashboard-mongo-db-demo`

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

```bash
cd apps/react/comments/dashboard/self-hosting/dashboard-mongo-db-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-dashboard-mongo-db-demo dev
```

### Build for Production

```bash
pnpm --filter @apps/react-comments-dashboard-mongo-db-demo build
```

## Database Access

### Viewing the MongoDB Database

To view and manage the MongoDB database, log in to MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with the following credentials:
   - **Username:** eng@velt.dev
   - **Password:** engmongodb
3. Navigate to the cluster to browse collections and documents

### Connection String

The application uses the following MongoDB Atlas connection string (hardcoded in `app/api/velt/comments/store.ts`):

```
mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/?appName=Cluster0
```

## Directory Structure

```
dashboard-mongo-db-demo/
├── app/
│   ├── api/velt/          # Velt API routes (comments, token)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── header/            # Header components
│   ├── sidebar/           # Sidebar components
│   └── document/          # Main document/canvas logic
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Global styles
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json        # shadcn/ui configuration
└── package.json
```

## Learn More

- [Velt Documentation](https://docs.velt.dev)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
