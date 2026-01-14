"""
Database connection management and index creation

Supports multiple database backends through adapter pattern.
"""
import threading
from typing import Optional
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import ConnectionFailure, OperationFailure

from ..config import Config
from ..exceptions import VeltDatabaseError
from .mongodb_adapter import MongoDBAdapter
from .base import DatabaseAdapter


# Thread-safe connection caching
_client_lock = threading.Lock()
_client: Optional[MongoClient] = None
_database: Optional[Database] = None
_adapter: Optional[DatabaseAdapter] = None
_indexes_created = False
_index_creation_lock = threading.Lock()


def get_database(config: Config) -> DatabaseAdapter:
    """
    Get database adapter instance with connection pooling
    
    Currently supports MongoDB. Future versions will support PostgreSQL and others.
    
    Args:
        config: Configuration instance
        
    Returns:
        DatabaseAdapter instance (currently MongoDBAdapter)
        
    Raises:
        VeltDatabaseError: If connection fails
    """
    global _client, _database, _adapter, _indexes_created
    
    with _client_lock:
        if _adapter is None:
            # Get database type from config (defaults to 'mongodb')
            db_type = config.get_database_type()
            
            if db_type == 'mongodb':
                try:
                    mongodb_uri = config.get_mongodb_uri()
                    
                    # Create client with connection pooling settings
                    client_options = {
                        'maxPoolSize': 5,
                        'minPoolSize': 1,
                        'maxIdleTimeMS': 30000,
                        'serverSelectionTimeoutMS': 10000,
                        'socketTimeoutMS': 45000,
                        'retryWrites': True,
                        'retryReads': True,
                    }
                    
                    # MongoDB Atlas requires TLS/SSL for all connections
                    # Check if this is an Atlas connection (SRV or .mongodb.net domain)
                    is_atlas = 'mongodb+srv://' in mongodb_uri or '.mongodb.net' in mongodb_uri
                    is_srv = 'mongodb+srv://' in mongodb_uri
                    
                    if is_atlas:
                        # For SRV connections, TLS is handled automatically - don't override
                        # For non-SRV Atlas connections, explicitly enable TLS
                        if not is_srv:
                            client_options['tls'] = True
                            client_options['tlsAllowInvalidCertificates'] = False
                        
                        # Use certifi for SSL certificate verification when available
                        # Note: For SRV connections, certifi may not always be needed
                        # but can help with certificate validation issues
                        try:
                            import certifi
                            # Only set CA file for non-SRV connections
                            # SRV connections typically handle certificates automatically
                            if not is_srv:
                                client_options['tlsCAFile'] = certifi.where()
                        except ImportError:
                            # certifi not installed - will use system certificates
                            pass
                    
                    _client = MongoClient(mongodb_uri, **client_options)
                    
                    # Test connection
                    _client.admin.command('ping')
                    
                    # Get database
                    database_name = config.get_database_name()
                    _database = _client[database_name]
                    
                    # Create adapter
                    _adapter = MongoDBAdapter(_database)
                    
                    # Create indexes on first connection
                    _create_indexes(_adapter, config)
                    
                except ConnectionFailure as e:
                    _client = None
                    _database = None
                    _adapter = None
                    raise VeltDatabaseError(f"Failed to connect to MongoDB: {str(e)}")
                except Exception as e:
                    _client = None
                    _database = None
                    _adapter = None
                    raise VeltDatabaseError(f"Database error: {str(e)}")
            else:
                raise VeltDatabaseError(f"Unsupported database type: {db_type}. Currently only 'mongodb' is supported.")
    
    return _adapter


def _create_indexes(adapter: DatabaseAdapter, config: Config):
    """
    Create indexes on all collections
    
    Args:
        adapter: DatabaseAdapter instance
        config: Configuration instance for getting collection names
    """
    global _indexes_created
    
    with _index_creation_lock:
        if _indexes_created:
            return
        
        try:
            # Get collection names from config (with defaults)
            comment_collection_name = config.get_collection_name('comments')
            reaction_collection_name = config.get_collection_name('reactions')
            attachment_collection_name = config.get_collection_name('attachments')
            user_collection_name = config.get_collection_name('users')
            
            # Comments indexes
            # According to BaseMetadata, documentId, organizationId, apiKey, and folderId are in metadata
            adapter.create_index(comment_collection_name, [('annotationId', 1)], unique=True, background=True)
            adapter.create_index(comment_collection_name, [('metadata.documentId', 1)], background=True)
            adapter.create_index(comment_collection_name, [('metadata.organizationId', 1)], background=True)
            adapter.create_index(comment_collection_name, [('metadata.apiKey', 1)], background=True)
            adapter.create_index(comment_collection_name, [('metadata.folderId', 1)], background=True)
            # Compound indexes for common query patterns
            adapter.create_index(comment_collection_name, [('metadata.organizationId', 1), ('metadata.documentId', 1)], background=True)
            adapter.create_index(comment_collection_name, [('metadata.organizationId', 1), ('metadata.apiKey', 1), ('metadata.documentId', 1)], background=True)
            adapter.create_index(comment_collection_name, [('metadata.organizationId', 1), ('metadata.apiKey', 1), ('annotationId', 1)], background=True)
            adapter.create_index(comment_collection_name, [('metadata.organizationId', 1), ('metadata.apiKey', 1), ('metadata.folderId', 1)], background=True)
            
            # Reactions indexes
            # According to BaseMetadata, documentId, organizationId, apiKey, and folderId are in metadata
            adapter.create_index(reaction_collection_name, [('annotationId', 1)], unique=True, background=True)
            adapter.create_index(reaction_collection_name, [('metadata.documentId', 1)], background=True)
            adapter.create_index(reaction_collection_name, [('metadata.organizationId', 1)], background=True)
            adapter.create_index(reaction_collection_name, [('metadata.apiKey', 1)], background=True)
            adapter.create_index(reaction_collection_name, [('metadata.folderId', 1)], background=True)
            # Compound indexes for common query patterns
            adapter.create_index(reaction_collection_name, [('metadata.organizationId', 1), ('metadata.documentId', 1)], background=True)
            adapter.create_index(reaction_collection_name, [('metadata.organizationId', 1), ('metadata.apiKey', 1), ('metadata.documentId', 1)], background=True)
            adapter.create_index(reaction_collection_name, [('metadata.organizationId', 1), ('metadata.apiKey', 1), ('annotationId', 1)], background=True)
            adapter.create_index(reaction_collection_name, [('metadata.organizationId', 1), ('metadata.apiKey', 1), ('metadata.folderId', 1)], background=True)
            
            # Attachments indexes
            # According to BaseMetadata, documentId and organizationId are in metadata
            adapter.create_index(attachment_collection_name, [('attachmentId', 1)], unique=True, background=True)
            adapter.create_index(attachment_collection_name, [('metadata.documentId', 1)], background=True)
            
            # Users indexes
            # Users keep organizationId at top level for efficient querying
            adapter.create_index(user_collection_name, [('userId', 1)], unique=True, background=True)
            adapter.create_index(user_collection_name, [('organizationId', 1)], background=True)
            
            _indexes_created = True
            
        except Exception as e:
            # Log but don't fail initialization
            # Different databases may handle index creation differently
            print(f"[Velt SDK] Warning: Index creation failed (non-critical): {str(e)}")


def reset_connection():
    """Reset connection cache (useful for testing)"""
    global _client, _database, _adapter, _indexes_created
    
    with _client_lock:
        if _client:
            try:
                _client.close()
            except:
                pass
        _client = None
        _database = None
        _adapter = None
    
    with _index_creation_lock:
        _indexes_created = False
