# Page Mode Forms Demo - Django Backend (Self-Hosted)

## Overview

This demo showcases a self-hosted comments feature using **Django** as the backend framework and **MongoDB Atlas** as the database. This full-stack implementation demonstrates how to self-host Velt's collaboration features with Python/Django handling all data operations.

## Path

```
apps/react/self-hosting/forms/page-mode-demo/
```

## Package Name

`@apps/react-self-hosting-forms-page-mode-demo`

## Getting Started

### Install Dependencies

**Frontend:**

From the monorepo root:

```bash
pnpm install
```

**Backend (Django):**

Python dependencies are already installed. If you need to reinstall:

```bash
cd apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend
pip3 install -r requirements.txt --user
```

### Run Development Servers

This demo requires both frontend and backend to run.

**Option 1: Run Both Servers Together (Recommended)**

```bash
cd apps/react/self-hosting/forms/page-mode-demo
pnpm run dev:all
```

This runs both Next.js (port 3000) and Django (port 8000) concurrently.

**Option 2: Run Separately**

Terminal 1 - Frontend:
```bash
cd apps/react/self-hosting/forms/page-mode-demo
pnpm dev
```

Terminal 2 - Backend:
```bash
cd apps/react/self-hosting/forms/page-mode-demo
pnpm run dev:backend
```

**Or from the root:**

```bash
# Both servers
pnpm --filter @apps/react-self-hosting-forms-page-mode-demo run dev:all

# Frontend only
pnpm --filter @apps/react-self-hosting-forms-page-mode-demo dev

# Backend only
pnpm --filter @apps/react-self-hosting-forms-page-mode-demo run dev:backend
```

### Build for Production

```bash
pnpm --filter @apps/react-self-hosting-forms-page-mode-demo build
```

## Django Backend

### Backend Structure

The Django backend is located in `app/api/velt/backend/`:

```
backend/
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (MongoDB, Velt credentials)
├── config/                # Django project settings
│   ├── settings.py        # Django configuration
│   ├── urls.py            # URL routing
│   └── wsgi.py            # WSGI config
└── api/                   # API application
    ├── urls.py            # API routes
    ├── store.py           # MongoDB operations
    ├── sdk.py             # Velt SDK wrapper
    ├── handlers/          # Request handlers
    │   ├── comments.py
    │   ├── reactions.py
    │   ├── users.py
    │   ├── attachments.py
    │   └── tokens.py
    └── tests/
        └── test_api.py
```

### Backend Commands

**Check Configuration:**
```bash
cd app/api/velt/backend
python3 manage.py check
```

**Run Server Manually:**
```bash
cd app/api/velt/backend
python3 manage.py runserver
```

**Run Tests:**
```bash
cd app/api/velt/backend
python3 api/tests/test_api.py
```

### API Endpoints

The Django backend provides these endpoints at `http://localhost:8000/api/velt/`:

- `POST /api/velt/comments/get` - Retrieve comments
- `POST /api/velt/comments/save` - Save comments
- `POST /api/velt/comments/delete` - Delete comments
- `POST /api/velt/reactions/get` - Retrieve reactions
- `POST /api/velt/reactions/save` - Save reactions
- `POST /api/velt/users/get` - Retrieve users
- `POST /api/velt/users/save` - Save users
- `POST /api/velt/attachments/save` - Save attachments
- `POST /api/velt/attachments/get/<id>` - Get attachment
- `POST /api/velt/token` - Generate auth token

See `app/api/velt/backend/README.md` for detailed API documentation.

## Database Access

### Viewing the MongoDB Database

To view and manage the MongoDB database, log in to MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with your credentials
3. Navigate to the cluster to browse collections:
   - `comment_annotations` - Comments
   - `reaction_annotations` - Reactions
   - `users` - User data
   - `attachments` - Attachment files

### Connection String

The Django backend uses MongoDB Atlas. Connection string is configured in `app/api/velt/backend/.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

## Directory Structure

```
page-mode-demo/
├── app/
│   ├── api/velt/              # API routes
│   │   ├── token/             # Next.js token endpoint
│   │   │   └── route.ts
│   │   └── backend/           # Django backend (Python)
│   │       ├── manage.py
│   │       ├── requirements.txt
│   │       ├── .env
│   │       ├── config/        # Django settings
│   │       └── api/           # API handlers
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page with VeltProvider
├── components/
│   ├── header/
│   │   └── header.tsx         # Header with presence, sidebar toggle
│   ├── sidebar/
│   │   └── sidebar.tsx        # Left navigation
│   ├── document/
│   │   ├── document-canvas.tsx        # Main document component
│   │   └── CommentsSidebar.tsx        # Comments sidebar
│   └── velt/
│       ├── VeltCollaboration.tsx      # Velt client setup
│       ├── VeltInitializeDocument.tsx # Document initialization
│       ├── VeltInitializeUser.tsx     # User auth provider
│       ├── VeltDataProviders.ts       # Self-hosting data providers
│       ├── VeltTools.tsx              # Velt component exports
│       └── ui-customization/
│           ├── VeltCustomization.tsx              # UI customization wrapper
│           ├── VeltCommentBubbleWf.tsx            # Comment bubble customization
│           ├── VeltCommentToolWf.tsx              # Comment tool customization
│           ├── VeltSidebarButtonWf.tsx            # Sidebar button customization
│           ├── VeltCommentsSidebarHeaderWf.tsx    # Sidebar header customization
│           ├── VeltCommentsSidebarFocusedThreadWf.tsx  # Focused thread customization
│           └── styles.css                         # Custom Velt styles
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
│   └── utils.ts
├── public/                    # Static assets
├── styles/                    # Global styles
│   └── globals.css
├── .npmrc                     # pnpm config
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── components.json            # shadcn/ui configuration
└── package.json
```

## Key Technologies

### Frontend
- **Next.js 15** with React 19
- **@veltdev/react** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript** - Type safety

### Backend
- **Python 3.13** - Programming language
- **Django 4.2** - Web framework
- **PyMongo 4.6** - MongoDB driver
- **MongoDB Atlas** - Cloud database
- **velt-py** - Velt Python SDK

## Features

- **Self-Hosted Comments**: Full data ownership with Django backend
- **Page Mode**: Comments tied to document pages
- **Embedded Comments Sidebar**: Focused thread view
- **Presence Awareness**: See active users
- **Reactions**: React to comments
- **Attachments**: File uploads
- **Custom UI**: Tailored comment bubbles and sidebar

## Environment Variables

### Frontend (.env.local)

Create `.env.local` from `.env.local.example`:

```env
NEXT_PUBLIC_VELT_API_KEY=your_velt_api_key
NEXT_PUBLIC_SELF_HOSTING_BASE_URL=http://localhost:8000/api/velt
VELT_AUTH_TOKEN=your_velt_auth_token
```

### Backend (.env)

Configure in `app/api/velt/backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/...
MONGODB_DATABASE=velt_comments
VELT_API_KEY=your_velt_api_key
VELT_AUTH_TOKEN=your_velt_auth_token
```

## Troubleshooting

### Backend Won't Start

Verify Python dependencies:
```bash
cd app/api/velt/backend
pip3 install -r requirements.txt --user
python3 manage.py check
```

### Frontend Can't Connect

1. Verify backend is running: `curl http://localhost:8000/api/velt/token`
2. Check `.env.local` has correct `NEXT_PUBLIC_SELF_HOSTING_BASE_URL`

### MongoDB Connection Errors

1. Verify `MONGODB_URI` in `app/api/velt/backend/.env`
2. Check MongoDB Atlas network access allows your IP
3. Verify database credentials

### Port Already in Use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
cd app/api/velt/backend
python3 manage.py runserver 8080
```

## Important Configuration

### .npmrc File

This demo includes a `.npmrc` file that prevents pnpm from hoisting Tailwind CSS v4:

```
public-hoist-pattern[]=*
public-hoist-pattern[]=!@tailwindcss*
```

**Do not delete the `.npmrc` file** - it ensures the correct Tailwind version is used.

## Learn More

- [Velt Documentation](https://docs.velt.dev)
- [Velt Self-Hosting Guide](https://docs.velt.dev/self-host-data/overview)
- [Django Documentation](https://docs.djangoproject.com/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
