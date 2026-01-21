# Page Mode Forms Demo - Django Backend (Self-Hosted)

> **[🚀 View Live Demo](https://sample-apps-page-mode-demo.vercel.app/)**

https://github.com/user-attachments/assets/8acc089a-3f3a-44f9-832e-6b1b4278d290


## Overview

This demo showcases a self-hosted **Page Mode Comments** feature using:
- **Django** as the backend framework
- **MongoDB Atlas** for comment and user data storage
- **AWS S3** for attachment storage
- **Next.js frontend** with React 19

This full-stack implementation demonstrates how to self-host Velt's collaboration features with Python/Django handling all data operations.

## Path

```
apps/react/self-hosting/forms/page-mode-demo/
```

## Package Name

`@apps/react-self-hosting-forms-page-mode-demo`

## Quick Access Credentials

### MongoDB Atlas
- **URL:** https://cloud.mongodb.com/
- **Username:** eng@velt.dev
- **Password:** engmongodb

### AWS Console
- **URL:** https://console.aws.amazon.com/
- **User:** eng@velt.dev
- **Password:** engAWS1!
- **S3 Bucket:** velt-page-mode-demo (us-east-2)

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

**Environment Setup:**

Copy the example environment file and configure it:

```bash
cd apps/react/self-hosting/forms/page-mode-demo/app/api/velt/backend
cp .env.example .env
```

Then edit `.env` to add the actual AWS credentials. You can find them by logging into the AWS Console with the credentials in the "Quick Access Credentials" section above.

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

### MongoDB Atlas

This application stores Velt comments, users, reactions, and attachment metadata in MongoDB Atlas.

#### Viewing the MongoDB Database

To view and manage the MongoDB database, log in to MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with these credentials:
   - **Username:** eng@velt.dev
   - **Password:** engmongodb
3. Navigate to Cluster0 to browse collections:
   - `comment_annotations` - Comments
   - `reaction_annotations` - Reactions
   - `users` - User data
   - `attachments` - Attachment metadata

#### Connection String

The Django backend uses the following MongoDB Atlas connection string (configured in `app/api/velt/backend/.env`):

```
mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/velt_comments?appName=Cluster0&retryWrites=true&w=majority
```

**Database:** `velt_comments`

### AWS S3 Storage

#### Attachment File Storage

Comment attachments (files, images) are stored in AWS S3 for scalable file management.

#### AWS Console Access

To view and manage S3 attachments:

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Sign in with these credentials:
   - **User:** eng@velt.dev
   - **Password:** engAWS1!
3. Navigate to S3 service to view the bucket

#### S3 Bucket Configuration

The application uses AWS S3 for attachment storage. Configuration is stored in `app/api/velt/backend/.env`:

- **Bucket Name:** `velt-page-mode-demo`
- **Region:** `us-east-2`
- **Access Key ID:** See `.env` file
- **Secret Access Key:** See `.env` file

For the actual AWS credentials, check the `.env` file or log into the AWS Console using the credentials above.



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
- **Next.js 16** with React 19
- **@veltdev/react 4.7.1-beta.5** - Velt collaboration components
- **Tailwind CSS v3.4** - Styling
- **TypeScript 5** - Type safety

### Backend
- **Python 3.8+** - Programming language
- **Django 4.2+** - Web framework
- **PyMongo** - MongoDB driver
- **MongoDB Atlas** - Cloud database
- **Boto3** - AWS SDK for Python (S3 operations)
- **Velt Python SDK** - Velt backend integration

## Features

### Page Mode Comments

This demo implements Velt's **Page Mode** commenting system with:
- Inline comment bubbles on each form question
- Focused thread mode for per-question comments
- Global comments sidebar showing all comments across the form
- Comment context tied to specific question IDs
- Popover-style comment dialogs

### Form Questions

The demo includes 7 GDPR/PIA assessment questions with:
- Dropdown inputs for answers
- Progress tracking (Step X of 7)
- Section navigation with numbered badges
- Question-specific comment threads
- "Privado Agent" attribution badges (demo UI element)

### Velt Features Showcased

- **Self-Hosted Comments**: Full data ownership with Django backend
- **Page Mode**: Comments tied to specific elements via `targetElementId`
- **Presence Awareness**: Real-time user avatars showing active collaborators
- **Reactions**: React to comments (stored in MongoDB)
- **Attachments**: File uploads (stored in AWS S3)
- **Custom UI**: Shadow DOM disabled for full styling control
- **Embedded Sidebar**: Both focused thread and global comment views

## Environment Variables

The backend configuration is stored in `app/api/velt/backend/.env`:

```env
# Django Configuration
DJANGO_SECRET_KEY=django-insecure-dev-key-change-in-production
DEBUG=True

# MongoDB Configuration
VELT_MONGODB_CONNECTION_STRING=mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/velt_comments?appName=Cluster0&retryWrites=true&w=majority
VELT_MONGODB_DATABASE=velt_comments

# Velt API Credentials (get from https://console.velt.dev)
NEXT_PUBLIC_VELT_API_KEY=6xTcUFtlYAlCdh11zrKB
NEXT_PUBLIC_SELF_HOSTING_BASE_URL=http://localhost:8000/api/velt
VELT_AUTH_TOKEN=bd4d5226050470b6c658054fcdf1092a

# AWS S3 Configuration for Attachments
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=<see .env file or AWS Console>
AWS_SECRET_ACCESS_KEY=<see .env file or AWS Console>
AWS_S3_BUCKET=velt-page-mode-demo

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Note:** AWS credentials are stored in `app/api/velt/backend/.env`. To access them, either check the `.env` file or log into the AWS Console with the credentials provided in the "Quick Access Credentials" section above.

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
- [Velt Page Mode Guide](https://docs.velt.dev/comments/customize-behavior/page-mode)
- [Django Documentation](https://docs.djangoproject.com/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
