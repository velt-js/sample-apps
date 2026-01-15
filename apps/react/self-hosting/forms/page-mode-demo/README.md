# Page Mode Demo (Self-Hosted)

## Overview

This demo showcases **self-hosted Velt comments** with **page mode** for **forms/documents** in **React**. It includes a full Django backend for MongoDB persistence and demonstrates how to implement Velt's self-hosting data providers.

## Path

```
apps/react/self-hosting/forms/page-mode-demo/
```

## Package Name

`@apps/react-self-hosting-forms-page-mode-demo`

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

This demo requires both a **Next.js frontend** and a **Django backend** to be running.

### 1. Install Dependencies

**Frontend (Node.js/pnpm):**

From this directory:

```bash
pnpm install
```

**Backend (Python):**

Python dependencies are already installed in the `app/api/velt/django_velt_test/` folder.

### 2. Configure Environment Variables

**Frontend (.env.local):**

Copy `.env.local.example` to `.env.local` and configure:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Velt credentials:

```env
NEXT_PUBLIC_VELT_API_KEY=your_velt_api_key_here
NEXT_PUBLIC_SELF_HOSTING_BASE_URL=http://localhost:8000/api/velt
VELT_AUTH_TOKEN=your_velt_auth_token_here
```

**Backend (.env):**

The Django backend is already configured in `app/api/velt/django_velt_test/.env` with MongoDB connection and Velt credentials.

### 3. Run Development Servers

**Option A: Run Both Servers Together (Recommended):**

```bash
pnpm run dev:all
```

This runs both the Next.js frontend (port 3000) and Django backend (port 8000) concurrently.

**Option B: Run Servers Separately:**

Terminal 1 (Frontend):
```bash
pnpm dev
```

Terminal 2 (Backend):
```bash
pnpm run dev:backend
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
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

## Architecture

### Frontend (Next.js)
- React application with Velt SDK integration
- Self-hosting data providers configured to use Django backend
- API route at `/api/velt/token` for Velt authentication token generation

### Backend (Django)
Located in `app/api/velt/django_velt_test/`, the backend provides:

- **MongoDB Integration**: Stores comments, reactions, and user data
- **Velt API Endpoints**: RESTful endpoints for Velt operations
  - `POST /api/velt/comments/get` - Retrieve comments
  - `POST /api/velt/comments/save` - Save comments
  - `POST /api/velt/comments/delete` - Delete comments
  - `POST /api/velt/reactions/get` - Retrieve reactions
  - `POST /api/velt/reactions/save` - Save reactions
  - `POST /api/velt/users/get` - Retrieve users
  - `POST /api/velt/users/save` - Save users
  - `POST /api/velt/token` - Generate Velt auth tokens

See `app/api/velt/django_velt_test/README.md` for detailed API documentation.

## Features

- **Self-Hosted Comments**: Full ownership of comment data stored in MongoDB
- **Embedded Comments**: Comments sidebar with focused thread mode for contextual discussions
- **VeltInlineCommentsSection**: Focused comment threads per question/row
- **Presence Awareness**: See who's currently viewing the document
- **Light Mode**: Custom theme to match Privado's design system
- **Django Backend**: Production-ready API with CORS support and error handling

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
