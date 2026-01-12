"""
Configuration management for Velt SDK
"""
import os
from typing import Dict, Optional, Any
from urllib.parse import quote_plus


class Config:
    """Configuration validator and MongoDB URI builder"""
    
    def __init__(self, config: Dict[str, Any]):
        """
        Initialize configuration
        
        Args:
            config: Configuration dictionary with database and optional API settings
        """
        self.config = config
        self._validate_config()
        self._build_mongodb_uri()
    
    def _validate_config(self):
        """Validate required configuration fields"""
        if 'database' not in self.config:
            raise ValueError("Configuration must include 'database' key")
        
        db_config = self.config['database']
        required_fields = ['host', 'username', 'password', 'auth_database', 'database_name']
        
        for field in required_fields:
            if field not in db_config:
                raise ValueError(f"Database configuration must include '{field}'")
    
    def _build_mongodb_uri(self):
        """Build MongoDB connection URI from configuration"""
        db_config = self.config['database']
        
        # Support connection string override
        if 'connection_string' in db_config and db_config['connection_string']:
            # Use connection string as-is - SRV connections handle TLS automatically
            self.mongodb_uri = db_config['connection_string']
            return
        
        # Build URI from components
        username = quote_plus(db_config['username'])
        password = quote_plus(db_config['password'])
        host = db_config['host']
        database_name = db_config['database_name']
        auth_database = db_config['auth_database']
        
        # Check if SRV connection is needed (MongoDB Atlas uses .mongodb.net domains)
        # For Atlas, always prefer mongodb+srv:// as it handles TLS automatically
        is_atlas = '.mongodb.net' in host
        use_srv = db_config.get('use_srv', False) or is_atlas
        
        # Handle different host formats
        if host.startswith('mongodb://') or host.startswith('mongodb+srv://'):
            # Already a connection string
            if 'mongodb+srv://' in host:
                # SRV connection string - use as-is (already has TLS)
                self.mongodb_uri = f"mongodb+srv://{username}:{password}@{host.replace('mongodb+srv://', '').split('/')[0]}/{database_name}?authSource={auth_database}"
            else:
                # Standard connection string - if Atlas, convert to SRV or add TLS
                if is_atlas:
                    # Convert to SRV for better TLS handling
                    host_clean = host.replace('mongodb://', '').split('/')[0]
                    self.mongodb_uri = f"mongodb+srv://{username}:{password}@{host_clean}/{database_name}?authSource={auth_database}&retryWrites=true&w=majority"
                else:
                    self.mongodb_uri = f"mongodb://{username}:{password}@{host.replace('mongodb://', '').split('/')[0]}/{database_name}?authSource={auth_database}"
        else:
            # Simple host format
            if use_srv or is_atlas:
                # MongoDB Atlas SRV connection (recommended for Atlas)
                self.mongodb_uri = f"mongodb+srv://{username}:{password}@{host}/{database_name}?authSource={auth_database}&retryWrites=true&w=majority"
            else:
                # Standard MongoDB connection
                self.mongodb_uri = f"mongodb://{username}:{password}@{host}/{database_name}?authSource={auth_database}"
    
    def get_mongodb_uri(self) -> str:
        """Get MongoDB connection URI"""
        return self.mongodb_uri
    
    def get_database_name(self) -> str:
        """Get database name"""
        return self.config['database']['database_name']
    
    def get_database_type(self) -> str:
        """
        Get database type from config
        
        Returns:
            Database type ('mongodb', 'postgresql', etc.). Defaults to 'mongodb'.
        """
        return self.config.get('database', {}).get('type', 'mongodb')
    
    def get_api_key(self) -> Optional[str]:
        """Get Velt API key from config or environment"""
        if 'apiKey' in self.config:
            return self.config['apiKey']
        return os.getenv('VELT_API_KEY')
    
    def get_auth_token(self) -> Optional[str]:
        """Get Velt auth token from config or environment"""
        if 'authToken' in self.config:
            return self.config['authToken']
        return os.getenv('VELT_AUTH_TOKEN')
    
    def get_user_schema(self) -> Optional[Dict[str, Any]]:
        """
        Get user schema mapping from config
        
        Returns:
            Dictionary mapping SDK field names to customer field names.
            Values can be:
            - A string: Direct field name mapping
            - A list: Try these field names in order until one is found
            
        Example:
            {
                'userId': ['userId', 'id', 'user_id'],  # Try these in order
                'name': 'full_name',  # Direct mapping
                'email': 'email_address',
                'photoUrl': 'photo_url'
            }
        """
        return self.config.get('user_schema')
    
    def get_collection_name(self, collection_type: str) -> str:
        """
        Get collection name for a given collection type
        
        Args:
            collection_type: Type of collection ('comments', 'reactions', 'attachments', 'users')
            
        Returns:
            Collection name (defaults to standard names if not configured)
            
        Example:
            Config with custom collection names:
            {
                'collections': {
                    'comments': 'my_comments',
                    'reactions': 'my_reactions',
                    'attachments': 'my_attachments',
                    'users': 'my_users'
                }
            }
        """
        collections = self.config.get('collections', {})
        default_names = {
            'comments': 'comment_annotations',
            'reactions': 'reaction_annotations',
            'attachments': 'attachments',
            'users': 'users'
        }
        return collections.get(collection_type, default_names.get(collection_type, collection_type))

