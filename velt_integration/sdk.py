"""
Velt SDK main class
"""
from typing import Dict, Any

from .config import Config
from .database import reset_connection
from .backends.self_hosting_backend import SelfHostingBackend
from .exceptions import VeltSDKError


class VeltSDK:
    """
    Main SDK class for Velt integration
    
    Provides access to different backends:
    - selfHosting: Direct database access (self-hosted)
    - api: REST API calls (to be implemented)
    """
    
    def __init__(self, config: Config):
        """
        Initialize SDK instance
        
        Args:
            config: Configuration instance
        """
        self.config = config
        self._self_hosting = None
    
    @classmethod
    def initialize(cls, config: Dict[str, Any]) -> 'VeltSDK':
        """
        Initialize SDK with configuration
        
        Args:
            config: Configuration dictionary with database and optional API settings
            
        Returns:
            Initialized VeltSDK instance
            
        Example:
            >>> sdk = VeltSDK.initialize({
            ...     'database': {
            ...         'host': 'localhost:27017',
            ...         'username': 'user',
            ...         'password': 'pass',
            ...         'auth_database': 'admin',
            ...         'database_name': 'velt-integration'
            ...     },
            ...     'apiKey': 'your-api-key',
            ...     'authToken': 'your-auth-token'
            ... })
        """
        try:
            config_obj = Config(config)
            sdk = cls(config_obj)
            return sdk
        except Exception as e:
            raise VeltSDKError(f"Failed to initialize SDK: {str(e)}")
    
    @property
    def selfHosting(self) -> SelfHostingBackend:
        """
        Get self-hosting backend instance
        
        Provides direct database access for self-hosted installations.
        
        Example:
            >>> sdk = VeltSDK.initialize(config)
            >>> result = sdk.selfHosting.comments.getComments(request)
        """
        if self._self_hosting is None:
            self._self_hosting = SelfHostingBackend(self.config)
        return self._self_hosting
    
    def close(self):
        """Close database connections (useful for cleanup)"""
        reset_connection()
        self._self_hosting = None

