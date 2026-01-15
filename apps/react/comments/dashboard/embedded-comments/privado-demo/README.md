# privado-demo

## Overview

This demo showcases **embedded-comments** for **comments** (dashboard) in **react**.

## Path

```
apps/react/comments/dashboard/embedded-comments/privado-demo/
```

## Package Name

`@apps/react-comments-dashboard-embedded-comments-privado-demo`

## Directory Structure

```
privado-demo/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── header/             # Header components (Velt presence, etc.)
│   │   └── header.tsx
│   ├── sidebar/            # Sidebar components
│   │   └── sidebar.tsx
│   └── document/           # Main document/canvas logic
│       ├── document-canvas.tsx
│       └── CommentsSidebar.tsx
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
│   └── utils.ts
├── public/                 # Static assets
├── styles/                 # Global styles
│   └── globals.css
├── .npmrc                  # pnpm config to prevent Tailwind v4 hoisting
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json         # shadcn/ui configuration
└── package.json
```

## Getting Started

### Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### Run Development Server

```bash
cd apps/react/comments/dashboard/embedded-comments/privado-demo
pnpm dev
```

Or from the root:

```bash
pnpm --filter @apps/react-comments-dashboard-embedded-comments-privado-demo dev
```

### Build for Production

```bash
pnpm --filter @apps/react-comments-dashboard-embedded-comments-privado-demo build
```

## Structure

- **Framework**: react
- **Feature**: comments
- **Document**: dashboard
- **Library**: embedded-comments
- **Demo**: privado-demo

## Component Organization

- **`components/header/`** - Contains Velt components like presence indicators, header buttons
- **`components/sidebar/`** - Contains sidebar-related components
- **`components/document/`** - Contains the main application logic and embedded-comments integration
- **`hooks/`** - Custom React hooks for state management and side effects
- **`lib/`** - Utility functions and helpers

## Important Configuration

### .npmrc File
This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4 from other workspace packages. This is necessary because:
- This demo uses Tailwind CSS v3.4.x with traditional PostCSS configuration
- Other apps in the monorepo may use Tailwind CSS v4
- Without the `.npmrc`, pnpm would hoist v4 and cause PostCSS errors

**Do not delete the `.npmrc` file** - it ensures the correct Tailwind version is used.

## Features

- **Embedded Comments**: Comments sidebar with focused thread mode for contextual discussions
- **VeltInlineCommentsSection**: Focused comment threads per question/row
- **Presence Awareness**: See who's currently viewing the document
- **Light Mode**: Custom theme to match Privado's design system

## Next Steps

1. Add your embedded-comments implementation in `components/document/`
2. Add Velt collaboration features in `components/header/`
3. Update this README with specific usage instructions
4. Add the demo to `master-sample-app` if it should be showcased
5. Update deployment configs (Vercel, GitHub Actions) if needed

## Learn More

- [Monorepo Structure Guide](../../../../../README_MONOREPO.md)
- [Structure Documentation](../../../../../docs/structure.md)
- [Velt Documentation](https://docs.velt.dev)
