# Velt Integration SDK for Python/Django

A Python SDK for integrating Velt comments, reactions, attachments, and user management into Django applications with MongoDB backend.

## Installation

```bash
pip install velt-integration
```

## Requirements

- Python 3.8+
- Django 4.2.26+
- MongoDB (Percona Server or MongoDB Atlas)
- PyMongo 4.6.3
- MongoEngine 0.27.0

## Quick Start

### 1. Initialize the SDK

```python
from velt_integration import VeltSDK

# Initialize SDK with your MongoDB configuration
sdk = VeltSDK.initialize(config={
    'database': {
        'host': 'localhost:27017',
        'username': 'your-username',
        'password': 'your-password',
        'auth_database': 'admin',
        'database_name': 'velt-integration'
    },
    'apiKey': 'your-velt-api-key',  # Optional: can use VELT_API_KEY env var
    'authToken': 'your-velt-auth-token'  # Optional: can use VELT_AUTH_TOKEN env var
})
```

### 2. Use Services

The SDK supports different backends. For self-hosted installations, use the `selfHosting` backend:

```python
# Comments
result = sdk.selfHosting.comments.getComments(
    organizationId='org-123',
    commentAnnotationIds=['ann-1', 'ann-2'],
    documentIds=['doc-1']
)

sdk.selfHosting.comments.saveComments(
    organizationId='org-123',
    commentAnnotation={
        'ann-1': {
            'comments': {'comment-1': {'commentId': 'comment-1', 'commentText': 'Hello'}},
            'metadata': {}
        }
    },
    documentId='doc-1'
)

sdk.selfHosting.comments.deleteComment(
    organizationId='org-123',
    commentAnnotationId='ann-1'
)

# Reactions
result = sdk.selfHosting.reactions.getReactions(
    organizationId='org-123',
    reactionAnnotationIds=['reaction-1'],
    documentIds=['doc-1']
)

sdk.selfHosting.reactions.saveReactions(
    organizationId='org-123',
    reactionAnnotation={
        'reaction-1': {
            'icon': '👍',
            'metadata': {}
        }
    },
    documentId='doc-1'
)

# Attachments
result = sdk.selfHosting.attachments.getAttachment(
    organizationId='org-123',
    attachmentId=12345
)

sdk.selfHosting.attachments.saveAttachment(
    organizationId='org-123',
    attachment={
        'attachmentId': 12345,
        'name': 'document.pdf',
        'mimeType': 'application/pdf',
        'base64Data': '...',
        'size': 1024
    },
    documentId='doc-1'
)

# Users
result = sdk.selfHosting.users.getUsers(
    organizationId='org-123',
    userIds=['user-1', 'user-2']
)

sdk.selfHosting.users.saveUser(
    organizationId='org-123',
    user={
        'userId': 'user-1',
        'name': 'John Doe',
        'email': 'john@example.com',
        'photoUrl': 'https://example.com/photo.jpg'
    }
)

# Token
result = sdk.selfHosting.token.getToken(
    organizationId='org-123',
    userId='user-1',
    email='john@example.com',
    isAdmin=False
)
token = result['data']['token']
```

## Response Format

All service methods return a standardized response format:

### Success Response

```python
{
    'success': True,
    'data': {
        # Service-specific data
    }
}
```

### Error Response

```python
{
    'success': False,
    'error': 'Human-readable error message',
    'errorCode': 'ERROR_CODE'  # Optional
}
```

## Data Isolation

All methods require `organizationId` as the first parameter to ensure data isolation between organizations. The SDK automatically filters all queries by `organizationId`.

## API Reference

### CommentService

- `getComments(organizationId, commentAnnotationIds=None, documentIds=None)` - Get comments
- `saveComments(organizationId, commentAnnotation, documentId=None)` - Save comments
- `deleteComment(organizationId, commentAnnotationId)` - Delete a comment

### ReactionService

- `getReactions(organizationId, reactionAnnotationIds=None, documentIds=None)` - Get reactions
- `saveReactions(organizationId, reactionAnnotation, documentId=None)` - Save reactions
- `deleteReaction(organizationId, reactionAnnotationId)` - Delete a reaction

### AttachmentService

- `getAttachment(organizationId, attachmentId)` - Get an attachment
- `saveAttachment(organizationId, attachment, documentId=None)` - Save an attachment
- `deleteAttachment(organizationId, attachmentId)` - Delete an attachment

### UserService

- `getUsers(organizationId, userIds)` - Get users by IDs
- `saveUser(organizationId, user)` - Save a user

### TokenService

- `getToken(organizationId, userId, email=None, isAdmin=None)` - Get authentication token

## Configuration

### Database Configuration

The SDK accepts database configuration in the following format:

```python
config = {
    'database': {
        'host': 'localhost:27017',  # or 'mongodb://...' connection string
        'username': 'your-username',
        'password': 'your-password',
        'auth_database': 'admin',
        'database_name': 'velt-integration',
        # Optional: override with full connection string
        # 'connection_string': 'mongodb://...'
    }
}
```

### Environment Variables

You can also use environment variables for API credentials:

- `VELT_API_KEY` - Velt API key
- `VELT_AUTH_TOKEN` - Velt auth token

## Error Handling

The SDK uses custom exceptions:

- `VeltSDKError` - Base exception
- `VeltDatabaseError` - Database-related errors
- `VeltValidationError` - Validation errors
- `VeltTokenError` - Token-related errors

```python
from velt_integration import VeltSDKError, VeltDatabaseError

try:
    result = sdk.selfHosting.comments.getComments(organizationId='org-123')
except VeltDatabaseError as e:
    print(f"Database error: {e}")
except VeltSDKError as e:
    print(f"SDK error: {e}")
```

## Testing

Install development dependencies:

```bash
pip install velt-integration[dev]
```

Run tests:

```bash
pytest tests/
```

## License

MIT

## Support

For issues and questions, please contact support@velt.dev or visit https://docs.velt.dev

