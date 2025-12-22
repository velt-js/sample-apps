# Dashboard PostgreSQL Self-Hosting Demo

## Overview

This demo showcases a self-hosted comments feature using **Neon PostgreSQL** as the database backend.

## Path

```
apps/react/comments/dashboard/self-hosting/dashboard-postgres-demo/
```

## Package Name

`@apps/react-comments-dashboard-postgres-demo`

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

```bash
cd apps/react/comments/dashboard/self-hosting/dashboard-postgres-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-dashboard-postgres-demo dev
```

### Build for Production

```bash
pnpm --filter @apps/react-comments-dashboard-postgres-demo build
```

## Database Access

### Viewing the PostgreSQL Database

To view and manage the PostgreSQL database, log in to Neon:

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign in with the following credentials:
   - **Username:** eng@velt.dev
   - **Password:** Engpostgresdb1!
3. Navigate to the project to browse tables and data

### Connection String

The application uses the following Neon PostgreSQL connection string (hardcoded in `app/api/velt/comments/store.ts`):

```
postgresql://neondb_owner:npg_ytNISs3UM0hl@ep-delicate-scene-a4k5mjyr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Connecting via psql

You can also connect directly using the `psql` command-line tool:

```bash
psql 'postgresql://neondb_owner:npg_ytNISs3UM0hl@ep-delicate-scene-a4k5mjyr-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

## Directory Structure

```
dashboard-postgres-demo/
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
- [Neon Documentation](https://neon.tech/docs)
