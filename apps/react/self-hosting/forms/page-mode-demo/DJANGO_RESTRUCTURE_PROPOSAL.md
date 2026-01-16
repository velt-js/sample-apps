# Django Backend Reorganization Proposal (Keep Python)

## Current Structure
```
app/api/velt/
├── token/
│   └── route.ts (Next.js token endpoint)
└── django_velt_test/ (Django backend - nested)
    ├── manage.py
    ├── requirements.txt
    ├── .env
    ├── .gitignore
    ├── README.md
    ├── QUICKSTART.md
    ├── test_api.py
    ├── db.sqlite3
    ├── venv/ (virtual environment)
    ├── velt_api/ (Django app)
    │   ├── __init__.py
    │   ├── urls.py
    │   ├── velt_sdk.py
    │   ├── mongodb_client.py
    │   └── views/
    │       ├── __init__.py
    │       ├── attachment_views.py
    │       ├── comment_views.py
    │       ├── reaction_views.py
    │       ├── token_views.py
    │       └── user_views.py
    └── velt_test_project/ (Django project settings)
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
```

## Proposed Structure (Option 1: Flatten & Organize)
```
app/api/velt/
├── token/
│   └── route.ts (existing Next.js endpoint)
├── backend/ (Clearer naming - this is the Python backend)
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   ├── db.sqlite3
│   ├── venv/
│   ├── config/ (renamed from velt_test_project - clearer purpose)
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── api/ (renamed from velt_api - clearer purpose)
│       ├── __init__.py
│       ├── urls.py
│       ├── store.py (renamed from mongodb_client.py - matches Next.js naming)
│       ├── sdk.py (renamed from velt_sdk.py - shorter, clearer)
│       ├── handlers/ (renamed from views - more API-focused naming)
│       │   ├── __init__.py
│       │   ├── attachments.py (renamed from attachment_views.py)
│       │   ├── comments.py (renamed from comment_views.py)
│       │   ├── reactions.py (renamed from reaction_views.py)
│       │   ├── tokens.py (renamed from token_views.py)
│       │   └── users.py (renamed from user_views.py)
│       └── tests/ (NEW - organized test location)
│           └── test_api.py (moved from root)
```

## Proposed Structure (Option 2: Maximum Flattening)
```
app/api/velt/
├── token/
│   └── route.ts (existing Next.js endpoint)
├── python/ (Clear indicator this is Python implementation)
│   ├── __init__.py
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── README.md
│   ├── store.py (MongoDB client)
│   ├── sdk.py (Velt SDK wrapper)
│   ├── urls.py (URL routing)
│   ├── settings.py (Django settings)
│   ├── wsgi.py (WSGI config)
│   └── handlers/
│       ├── __init__.py
│       ├── attachments.py
│       ├── comments.py
│       ├── reactions.py
│       ├── tokens.py
│       └── users.py
```

## Proposed Structure (Option 3: Keep Django Structure, Just Rename)
```
app/api/velt/
├── token/
│   └── route.ts (existing Next.js endpoint)
└── backend/ (renamed from django_velt_test - clearer purpose)
    ├── manage.py
    ├── requirements.txt
    ├── .env
    ├── .gitignore
    ├── README.md
    ├── QUICKSTART.md
    ├── test_api.py
    ├── db.sqlite3
    ├── venv/
    ├── api/ (renamed from velt_api)
    │   ├── __init__.py
    │   ├── urls.py
    │   ├── store.py (renamed from mongodb_client.py)
    │   ├── sdk.py (renamed from velt_sdk.py)
    │   └── views/
    │       ├── __init__.py
    │       ├── attachments.py
    │       ├── comments.py
    │       ├── reactions.py
    │       ├── tokens.py
    │       └── users.py
    └── config/ (renamed from velt_test_project)
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
```

## Comparison of Options

### Option 1: Flatten & Organize (Recommended)
**Pros:**
- Clearer separation of concerns
- "backend/" clearly indicates this is the Python backend
- "config/" and "api/" are more descriptive than velt_test_project/velt_api
- "handlers/" is more API-focused than "views/"
- "store.py" matches the Next.js reference naming
- Organized tests directory

**Cons:**
- More renaming work
- Need to update imports in all Python files
- Need to update Django settings INSTALLED_APPS

**Changes needed:**
- 3 folder renames
- 6 file renames
- Update imports in ~10 files
- Update manage.py, settings.py, wsgi.py references

### Option 2: Maximum Flattening
**Pros:**
- Minimal nesting
- Very clear "python/" indicator
- Simplified structure

**Cons:**
- Breaks Django conventions significantly
- Mixing project config with app code
- Would require significant Django configuration changes
- Less maintainable for Django developers

### Option 3: Keep Django Structure, Just Rename (Least Invasive)
**Pros:**
- Minimal changes to imports
- Maintains Django conventions
- Clearer naming without major restructure
- Only file/folder renames, no restructure

**Cons:**
- Still has some nested structure
- Minimal organizational improvement

## Recommended Approach: Option 1

Option 1 provides the best balance of:
- ✅ Clearer organization
- ✅ Better naming (backend/, config/, api/, handlers/, store.py)
- ✅ More aligned with modern API patterns
- ✅ Still maintains Django's core structure
- ✅ Manageable migration effort

## Implementation Steps for Option 1

1. **Rename main folder**
   ```bash
   mv django_velt_test/ backend/
   ```

2. **Rename Django project folder**
   ```bash
   mv backend/velt_test_project/ backend/config/
   ```

3. **Rename Django app folder**
   ```bash
   mv backend/velt_api/ backend/api/
   ```

4. **Rename view files**
   ```bash
   mv backend/api/views/ backend/api/handlers/
   mv backend/api/handlers/attachment_views.py backend/api/handlers/attachments.py
   mv backend/api/handlers/comment_views.py backend/api/handlers/comments.py
   mv backend/api/handlers/reaction_views.py backend/api/handlers/reactions.py
   mv backend/api/handlers/token_views.py backend/api/handlers/tokens.py
   mv backend/api/handlers/user_views.py backend/api/handlers/users.py
   ```

5. **Rename utility files**
   ```bash
   mv backend/api/mongodb_client.py backend/api/store.py
   mv backend/api/velt_sdk.py backend/api/sdk.py
   ```

6. **Create tests directory and move test file**
   ```bash
   mkdir backend/api/tests/
   mv backend/test_api.py backend/api/tests/test_api.py
   ```

7. **Update imports in Python files**
   - Update `backend/manage.py`
   - Update `backend/config/settings.py`
   - Update `backend/config/wsgi.py`
   - Update `backend/config/urls.py`
   - Update `backend/api/urls.py`
   - Update all handler files to import from `store` and `sdk`

8. **Update package.json script**
   ```json
   "dev:backend": "cd app/api/velt/backend && python3 manage.py runserver"
   ```

9. **Update documentation**
   - Update backend/README.md with new structure
   - Update main README.md

## Files That Need Import Updates (Option 1)

1. `backend/manage.py` - Update DJANGO_SETTINGS_MODULE
2. `backend/config/settings.py` - Update INSTALLED_APPS, ROOT_URLCONF
3. `backend/config/urls.py` - Update include path
4. `backend/config/wsgi.py` - Update DJANGO_SETTINGS_MODULE
5. `backend/api/urls.py` - Update import paths for handlers
6. `backend/api/handlers/*.py` - Update imports for store.py and sdk.py

## What Gets Preserved

- ✅ All Python/Django code
- ✅ All functionality (no logic changes)
- ✅ Django architecture
- ✅ MongoDB operations
- ✅ Environment variables
- ✅ Virtual environment
- ✅ Tests

## Summary

**My Recommendation: Option 1 (Flatten & Organize)**

This provides the clearest improvement in organization while keeping Django intact:
- `backend/` - Clear name for Python backend
- `config/` - Clear name for Django settings
- `api/` - Clear name for API code
- `handlers/` - More descriptive than views
- `store.py` - Matches reference naming
- `tests/` - Organized test location

---

**Which option would you like me to implement?**

Or would you like a different organization? I can adjust the proposal based on your preferences.
