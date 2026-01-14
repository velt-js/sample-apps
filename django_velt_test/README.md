# Django Velt SDK Test App

A simple Django application to test the Velt Integration SDK.

## Setup

### 1. Install Dependencies

```bash
cd django_velt_test
pip install -r requirements.txt
```

### 2. Configure MongoDB Connection

**For MongoDB Atlas (Recommended):**

1. Get your connection string from MongoDB Atlas:

   - Go to MongoDB Atlas → Clusters → Connect → Connect your application
   - Copy the connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/...`)

2. Set environment variable:

   ```bash
   export VELT_MONGODB_CONNECTION_STRING="mongodb+srv://username:password@cluster.mongodb.net/velt-integration?retryWrites=true&w=majority"
   ```

   Or create a `.env` file:

   ```bash
   VELT_MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/velt-integration?retryWrites=true&w=majority
   ```

**For Local MongoDB:**

Set individual components:

```bash
export VELT_MONGODB_HOST=localhost:27017
export VELT_MONGODB_USERNAME=your_username
export VELT_MONGODB_PASSWORD=your_password
export VELT_MONGODB_AUTH_DB=admin
export VELT_MONGODB_DATABASE=velt-integration
```

**Optional - Velt API Credentials (only needed for token generation):**

```bash
export VELT_API_KEY=your_api_key
export VELT_AUTH_TOKEN=your_auth_token
```

Or edit `velt_test_project/settings.py` directly to set MongoDB connection details.

### 3. Ensure Velt SDK is Available

The app expects `velt_py` to be in the parent directory. Make sure the SDK is accessible:

```bash
# From django_velt_test directory
ls ../velt_py  # Should show the SDK files
```

If needed, you can install the SDK in development mode:

```bash
cd ../velt_py
pip install -e .
```

### 4. Run the Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/velt/`

## API Endpoints

### Comments

- **GET Comments**: `POST /api/velt/comments/get`

  ```json
  {
    "organizationId": "org-123",
    "commentAnnotationIds": ["ann-1"],
    "documentIds": ["doc-1"]
  }
  ```

- **SAVE Comments**: `POST /api/velt/comments/save`

  ```json
  {
    "organizationId": "org-123",
    "commentAnnotation": {
      "ann-1": {
        "comments": {
          "comment-1": {
            "commentId": "comment-1",
            "commentText": "Hello world"
          }
        },
        "metadata": {
          "documentId": "doc-1",
          "organizationId": "org-123"
        }
      }
    },
    "documentId": "doc-1"
  }
  ```

- **DELETE Comment**: `POST /api/velt/comments/delete`
  ```json
  {
    "organizationId": "org-123",
    "commentAnnotationId": "ann-1"
  }
  ```

### Reactions

- **GET Reactions**: `POST /api/velt/reactions/get`
- **SAVE Reactions**: `POST /api/velt/reactions/save`

### Users

- **GET Users**: `POST /api/velt/users/get`

  ```json
  {
    "organizationId": "org-123",
    "userIds": ["user-1", "user-2"]
  }
  ```

- **SAVE User**: `POST /api/velt/users/save`
  ```json
  {
    "organizationId": "org-123",
    "user": {
      "userId": "user-1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Token

- **GET Token**: `POST /api/velt/token`
  ```json
  {
    "organizationId": "org-123",
    "userId": "user-1",
    "email": "user@example.com",
    "isAdmin": false
  }
  ```

## Testing with cURL

```bash
# Get comments
curl -X POST http://localhost:8000/api/velt/comments/get \
  -H "Content-Type: application/json" \
  -d '{
    "organizationId": "org-123",
    "documentIds": ["doc-1"]
  }'

# Save a comment
curl -X POST http://localhost:8000/api/velt/comments/save \
  -H "Content-Type: application/json" \
  -d '{
    "organizationId": "org-123",
    "commentAnnotation": {
      "ann-1": {
        "comments": {
          "comment-1": {
            "commentId": "comment-1",
            "commentText": "Test comment"
          }
        },
        "metadata": {
          "documentId": "doc-1",
          "organizationId": "org-123"
        }
      }
    },
    "documentId": "doc-1"
  }'

# Get users
curl -X POST http://localhost:8000/api/velt/users/get \
  -H "Content-Type: application/json" \
  -d '{
    "organizationId": "org-123",
    "userIds": ["user-1"]
  }'
```

## Testing with Python

```python
import requests

# Get comments
response = requests.post('http://localhost:8000/api/velt/comments/get', json={
    'organizationId': 'org-123',
    'documentIds': ['doc-1']
})
print(response.json())

# Save a comment
response = requests.post('http://localhost:8000/api/velt/comments/save', json={
    'organizationId': 'org-123',
    'commentAnnotation': {
        'ann-1': {
            'comments': {
                'comment-1': {
                    'commentId': 'comment-1',
                    'commentText': 'Hello from Python!'
                }
            },
            'metadata': {
                'documentId': 'doc-1',
                'organizationId': 'org-123'
            }
        }
    },
    'documentId': 'doc-1'
})
print(response.json())
```

## Project Structure

```
django_velt_test/
├── manage.py
├── requirements.txt
├── velt_test_project/      # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── velt_api/               # Django app with Velt endpoints
    ├── __init__.py
    ├── urls.py
    ├── views.py
    └── velt_sdk.py         # SDK initialization
```

## Notes

- The app uses CORS headers to allow frontend integration
- All endpoints accept POST requests with JSON bodies
- Error responses follow the standard format: `{'success': False, 'error': '...', 'errorCode': '...'}`
- Success responses follow: `{'success': True, 'data': {...}}`
