"""
Direct MongoDB client for Velt self-hosting operations not supported by SDK.
Used for users/save and attachments/get endpoints.
"""
from django.conf import settings
from pymongo import MongoClient, UpdateOne
from pymongo.database import Database

# MongoDB connection singleton
_mongo_client = None
_mongo_db = None

# Collection names (match the reference demo)
USERS_COLLECTION = 'users'
ATTACHMENTS_COLLECTION = 'attachments'
COMMENTS_COLLECTION = 'comment_annotations'
REACTIONS_COLLECTION = 'reaction_annotations'


def get_mongodb_uri():
    """Get MongoDB URI from Django settings."""
    # Use the MONGODB_URI from Django settings (which reads from env)
    uri = getattr(settings, 'MONGODB_URI', None)
    if uri:
        return uri

    # Return None if not configured
    return None


def get_database_name():
    """Get database name from Django settings."""
    return getattr(settings, 'MONGODB_DATABASE', 'velt_comments')


def get_db() -> Database:
    """Get MongoDB database connection."""
    global _mongo_client, _mongo_db

    if _mongo_db is not None:
        return _mongo_db

    uri = get_mongodb_uri()
    if not uri:
        raise ValueError(
            "MongoDB connection string not configured. "
            "Set MONGODB_URI or VELT_MONGODB_CONNECTION_STRING environment variable."
        )

    # Create client with connection pool settings suitable for Django
    # tlsAllowInvalidCertificates=True is for development only - fixes macOS SSL issues
    _mongo_client = MongoClient(
        uri,
        maxPoolSize=10,
        minPoolSize=1,
        maxIdleTimeMS=30000,
        serverSelectionTimeoutMS=10000,
        socketTimeoutMS=45000,
        retryWrites=True,
        retryReads=True,
        tlsAllowInvalidCertificates=True,  # Dev only - fixes SSL cert issues on macOS
    )

    db_name = get_database_name()
    _mongo_db = _mongo_client[db_name]

    # Create indexes
    _ensure_indexes(_mongo_db)

    return _mongo_db


def _ensure_indexes(db: Database):
    """Create indexes for collections."""
    try:
        # Users index
        db[USERS_COLLECTION].create_index('userId', unique=True)
        # Attachments index
        db[ATTACHMENTS_COLLECTION].create_index('attachmentId', unique=True)
        db[ATTACHMENTS_COLLECTION].create_index('documentId')
        # Comments indexes
        db[COMMENTS_COLLECTION].create_index('annotationId', unique=True)
        db[COMMENTS_COLLECTION].create_index('documentId')
        db[COMMENTS_COLLECTION].create_index('organizationId')
        # Reactions indexes
        db[REACTIONS_COLLECTION].create_index('annotationId', unique=True)
        db[REACTIONS_COLLECTION].create_index('documentId')
        db[REACTIONS_COLLECTION].create_index('organizationId')
    except Exception as e:
        # Log but don't fail - indexes may already exist
        print(f"[MongoDB] Index creation note: {e}")


# ============================================================
# User Operations
# ============================================================

def save_user(user: dict) -> bool:
    """
    Save or update a user in MongoDB.

    Args:
        user: Dict with userId and optional name, email, photoUrl, etc.

    Returns:
        True if successful
    """
    db = get_db()
    collection = db[USERS_COLLECTION]

    user_id = user.get('userId')
    if not user_id:
        raise ValueError("User must have a userId")

    collection.update_one(
        {'userId': user_id},
        {'$set': user},
        upsert=True
    )
    return True


def get_users(user_ids: list) -> dict:
    """
    Get users by their IDs.

    Args:
        user_ids: List of user IDs to fetch

    Returns:
        Dict mapping userId to user data
    """
    if not user_ids:
        return {}

    db = get_db()
    collection = db[USERS_COLLECTION]

    users = collection.find({'userId': {'$in': user_ids}})

    result = {}
    for user in users:
        # Remove MongoDB's _id field
        user.pop('_id', None)
        result[user['userId']] = user

    return result


# ============================================================
# Attachment Operations
# ============================================================

def save_attachment(attachment: dict, metadata: dict = None) -> dict:
    """
    Save attachment to MongoDB.

    Args:
        attachment: Attachment data including attachmentId, name, mimeType, base64Data
        metadata: Optional metadata with documentId, organizationId

    Returns:
        Dict with url pointing to GET endpoint
    """
    db = get_db()
    collection = db[ATTACHMENTS_COLLECTION]

    attachment_id = attachment.get('attachmentId')
    if attachment_id is None:
        raise ValueError("Attachment must have an attachmentId")

    # Build document to save
    doc = {
        **attachment,
        'documentId': (metadata or {}).get('documentId') or attachment.get('documentId'),
        'organizationId': (metadata or {}).get('organizationId') or attachment.get('organizationId'),
    }

    collection.update_one(
        {'attachmentId': attachment_id},
        {'$set': doc},
        upsert=True
    )

    # Return URL pointing to our GET endpoint
    return {'url': f'/api/velt/attachments/get/{attachment_id}'}


def get_attachment(attachment_id: int) -> dict:
    """
    Get attachment by ID.

    Args:
        attachment_id: The attachment ID (integer)

    Returns:
        Attachment document or None
    """
    db = get_db()
    collection = db[ATTACHMENTS_COLLECTION]

    attachment = collection.find_one({'attachmentId': attachment_id})
    if attachment:
        attachment.pop('_id', None)

    return attachment


def delete_attachment(attachment_id: int) -> bool:
    """
    Delete attachment by ID.

    Args:
        attachment_id: The attachment ID (integer)

    Returns:
        True if deleted
    """
    db = get_db()
    collection = db[ATTACHMENTS_COLLECTION]

    result = collection.delete_one({'attachmentId': attachment_id})
    return result.deleted_count > 0


# ============================================================
# Comment Operations
# ============================================================

def save_comments(annotations: dict, metadata: dict = None) -> bool:
    """
    Save comment annotations to MongoDB with proper structure matching reference demo.

    Args:
        annotations: Dict of annotationId -> annotation data
        metadata: Optional metadata with documentId, organizationId, apiKey

    Returns:
        True if successful
    """
    db = get_db()
    collection = db[COMMENTS_COLLECTION]

    operations = []
    for annotation_id, annotation in annotations.items():
        # Extract first comment to get 'from' user
        comments = annotation.get('comments', {})
        from_user = None
        if comments:
            first_comment = next(iter(comments.values()), {})
            from_user = first_comment.get('from')

        # Build document with top-level fields (matching reference demo)
        doc = {
            **annotation,
            'annotationId': annotation_id,
            # Top-level fields for querying
            'documentId': (metadata or {}).get('documentId') or annotation.get('documentId'),
            'organizationId': (metadata or {}).get('organizationId') or annotation.get('organizationId'),
        }

        # Add 'from' at top level if present
        if from_user:
            doc['from'] = from_user

        # Keep metadata as well (for compatibility)
        if metadata:
            doc['metadata'] = metadata
        elif 'metadata' in annotation:
            doc['metadata'] = annotation['metadata']

        operations.append(
            UpdateOne(
                {'annotationId': annotation_id},
                {'$set': doc},
                upsert=True
            )
        )

    if operations:
        collection.bulk_write(operations, ordered=False)

    return True


def get_comments(filters: dict) -> dict:
    """
    Get comment annotations from MongoDB.

    Args:
        filters: Dict with organizationId, commentAnnotationIds, documentIds

    Returns:
        Dict mapping annotationId to annotation data
    """
    db = get_db()
    collection = db[COMMENTS_COLLECTION]

    query = {}

    if filters.get('commentAnnotationIds'):
        query['annotationId'] = {'$in': filters['commentAnnotationIds']}
    if filters.get('documentIds'):
        query['documentId'] = {'$in': filters['documentIds']}
    if filters.get('organizationId'):
        query['organizationId'] = filters['organizationId']

    annotations = collection.find(query)

    result = {}
    for annotation in annotations:
        annotation.pop('_id', None)
        annotation_id = annotation.get('annotationId')
        if annotation_id:
            result[annotation_id] = annotation

    return result


def delete_comment(annotation_id: str) -> bool:
    """
    Delete a comment annotation.

    Args:
        annotation_id: The annotation ID

    Returns:
        True if deleted
    """
    db = get_db()
    collection = db[COMMENTS_COLLECTION]

    result = collection.delete_one({'annotationId': annotation_id})
    return result.deleted_count > 0


# ============================================================
# Reaction Operations
# ============================================================

def save_reactions(annotations: dict, metadata: dict = None) -> bool:
    """
    Save reaction annotations to MongoDB with proper structure.

    Args:
        annotations: Dict of annotationId -> annotation data
        metadata: Optional metadata with documentId, organizationId, apiKey

    Returns:
        True if successful
    """
    db = get_db()
    collection = db[REACTIONS_COLLECTION]

    operations = []
    for annotation_id, annotation in annotations.items():
        # Build document with top-level fields
        doc = {
            **annotation,
            'annotationId': annotation_id,
            'documentId': (metadata or {}).get('documentId') or annotation.get('documentId'),
            'organizationId': (metadata or {}).get('organizationId') or annotation.get('organizationId'),
        }

        # Keep metadata as well
        if metadata:
            doc['metadata'] = metadata
        elif 'metadata' in annotation:
            doc['metadata'] = annotation['metadata']

        operations.append(
            UpdateOne(
                {'annotationId': annotation_id},
                {'$set': doc},
                upsert=True
            )
        )

    if operations:
        collection.bulk_write(operations, ordered=False)

    return True


def get_reactions(filters: dict) -> dict:
    """
    Get reaction annotations from MongoDB.

    Args:
        filters: Dict with organizationId, reactionAnnotationIds, documentIds

    Returns:
        Dict mapping annotationId to annotation data
    """
    db = get_db()
    collection = db[REACTIONS_COLLECTION]

    query = {}

    if filters.get('reactionAnnotationIds'):
        query['annotationId'] = {'$in': filters['reactionAnnotationIds']}
    if filters.get('documentIds'):
        query['documentId'] = {'$in': filters['documentIds']}
    if filters.get('organizationId'):
        query['organizationId'] = filters['organizationId']

    annotations = collection.find(query)

    result = {}
    for annotation in annotations:
        annotation.pop('_id', None)
        annotation_id = annotation.get('annotationId')
        if annotation_id:
            result[annotation_id] = annotation

    return result


def delete_reaction(annotation_id: str) -> bool:
    """
    Delete a reaction annotation.

    Args:
        annotation_id: The annotation ID

    Returns:
        True if deleted
    """
    db = get_db()
    collection = db[REACTIONS_COLLECTION]

    result = collection.delete_one({'annotationId': annotation_id})
    return result.deleted_count > 0
