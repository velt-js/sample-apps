# Django Backend → Next.js API Routes Restructure Proposal

## Current Structure
```
app/api/velt/
├── token/
│   └── route.ts (existing)
└── django_velt_test/ (Django backend)
    ├── manage.py
    ├── requirements.txt
    ├── .env
    ├── velt_api/
    │   ├── mongodb_client.py (MongoDB operations)
    │   ├── urls.py (Django URL routing)
    │   └── views/ (Django view handlers)
    └── velt_test_project/ (Django settings)
```

## Target Structure (Matching dashboard-mongo-db-demo)
```
app/api/velt/
├── token/
│   └── route.ts (existing - keep as is)
├── store.ts (NEW - MongoDB client & data access functions)
├── comments/
│   ├── get/
│   │   └── route.ts (NEW)
│   ├── save/
│   │   └── route.ts (NEW)
│   └── delete/
│       └── route.ts (NEW)
├── reactions/
│   ├── get/
│   │   └── route.ts (NEW)
│   ├── save/
│   │   └── route.ts (NEW)
│   └── delete/
│       └── route.ts (NEW)
├── users/
│   ├── get/
│   │   └── route.ts (NEW)
│   └── save/
│       └── route.ts (NEW)
├── attachments/
│   ├── get/
│   │   └── [attachmentId]/
│   │       └── route.ts (NEW)
│   ├── save/
│   │   └── route.ts (NEW)
│   └── delete/
│       └── route.ts (NEW)
└── backend/ (MOVED - Django backend for reference)
    └── django_velt_test/ (entire folder moved here)
```

## Proposed Changes

### 1. **Create `store.ts`** - MongoDB Client & Data Access Layer
Convert Django's `mongodb_client.py` to TypeScript:
- MongoDB connection management with connection pooling
- Type definitions (CommentAnnotation, ReactionAnnotation, User, Attachment)
- Data access functions:
  - `getComments()`, `saveComments()`, `deleteComment()`
  - `getReactions()`, `saveReactions()`, `deleteReaction()`
  - `getUsers()`, `saveUser()`
  - `getAttachment()`, `saveAttachment()`, `deleteAttachment()`

### 2. **Create Next.js API Routes**
Each endpoint becomes a `route.ts` file following Next.js 13+ App Router pattern:

**Comments:**
- `comments/get/route.ts` - POST handler for fetching comments
- `comments/save/route.ts` - POST handler for saving comments
- `comments/delete/route.ts` - POST handler for deleting comments

**Reactions:**
- `reactions/get/route.ts` - POST handler for fetching reactions
- `reactions/save/route.ts` - POST handler for saving reactions
- `reactions/delete/route.ts` - POST handler for deleting reactions

**Users:**
- `users/get/route.ts` - POST handler for fetching users
- `users/save/route.ts` - POST handler for saving users

**Attachments:**
- `attachments/get/[attachmentId]/route.ts` - GET handler for serving attachment files
- `attachments/save/route.ts` - POST handler for saving attachments
- `attachments/delete/route.ts` - POST handler for deleting attachments

### 3. **Move Django Backend**
```bash
mv app/api/velt/django_velt_test → app/api/velt/backend/django_velt_test
```
- Keeps Django backend as reference/alternative implementation
- Won't interfere with Next.js API routes
- Can still be run separately if needed (update package.json script)

### 4. **Update Dependencies**
Add to `package.json`:
```json
"dependencies": {
  "mongodb": "^6.3.0"
}
```

### 5. **Update Environment Variables**
The `.env.local` already has MongoDB connection string from Django setup:
- `MONGODB_URI` - MongoDB Atlas connection string
- `MONGODB_DATABASE` - Database name (defaults to 'velt_comments')

### 6. **Update Scripts in package.json**
```json
"scripts": {
  "dev": "next dev",
  "dev:django": "cd app/api/velt/backend/django_velt_test && python3 manage.py runserver",
  "dev:all": "concurrently \"npm run dev\" --names \"nextjs\" --prefix-colors \"cyan\"",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Benefits of This Restructure

1. **Consistent with Next.js App Router** - Native Next.js API routes instead of external Django server
2. **Simpler Architecture** - Single Node.js process instead of Next.js + Django
3. **Better Performance** - No HTTP calls between frontend and Django backend (same process)
4. **Easier Deployment** - Deploy as single Next.js app (Vercel, etc.)
5. **TypeScript End-to-End** - Type safety across frontend and backend
6. **Matches Reference Demo** - Same structure as dashboard-mongo-db-demo
7. **Keeps Django Reference** - Original Django code preserved in backend/ folder

## Implementation Steps (If Approved)

1. Install `mongodb` npm package
2. Create `store.ts` with TypeScript MongoDB client
3. Create all API route folders and `route.ts` files
4. Move `django_velt_test` to `backend/django_velt_test`
5. Update `package.json` scripts
6. Test all endpoints with frontend
7. Update documentation

## What Gets Preserved

- ✅ All Django code (moved to backend/ folder)
- ✅ MongoDB connection configuration
- ✅ All API endpoint logic (converted to TypeScript)
- ✅ Existing token endpoint
- ✅ Environment variables

## Files to Create (Total: 13 new files)

1. `store.ts` (1 file)
2. Comments routes (3 files)
3. Reactions routes (3 files)
4. Users routes (2 files)
5. Attachments routes (3 files)
6. Attachment GET dynamic route folder (1 folder structure)

---

## ⚠️ Important Notes

- **No deletion** - Django backend will be moved to `backend/` folder, not deleted
- **Backward compatible** - Can switch back to Django by updating package.json scripts
- **Gradual migration** - Can test Next.js routes while Django backend still available
- **Same database** - Both implementations use the same MongoDB database

## Request for Approval

Please review this proposal and let me know if you'd like me to proceed with the restructure. I will:
- ✅ Create all new files
- ✅ Move (not delete) the Django backend
- ✅ Update configuration files
- ✅ Test the implementation

Would you like me to proceed with this restructure?
