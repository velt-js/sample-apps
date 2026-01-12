"""
Self-hosting backend implementation

Provides direct database access for self-hosted Velt installations.
"""
from typing import Optional
from ..config import Config
from ..database import get_database
from ..services.self_hosting.comment_service import CommentService
from ..services.self_hosting.reaction_service import ReactionService
from ..services.self_hosting.attachment_service import AttachmentService
from ..services.self_hosting.user_service import UserService
from ..services.api.token_service import TokenService


class SelfHostingBackend:
    """
    Self-hosting backend for direct database access
    
    Provides access to all Velt services through database adapters.
    Currently supports MongoDB, with PostgreSQL and other databases coming soon.
    """
    
    def __init__(self, config: Config):
        """
        Initialize self-hosting backend
        
        Args:
            config: Configuration instance
        """
        self.config = config
        self._database = None
        self._comments = None
        self._reactions = None
        self._attachments = None
        self._users = None
        self._token = None
    
    @property
    def database(self):
        """Get database adapter instance"""
        if self._database is None:
            self._database = get_database(self.config)
        return self._database
    
    @property
    def comments(self) -> CommentService:
        """Get CommentService instance"""
        if self._comments is None:
            self._comments = CommentService(self.database, self.config)
        return self._comments
    
    @property
    def reactions(self) -> ReactionService:
        """Get ReactionService instance"""
        if self._reactions is None:
            self._reactions = ReactionService(self.database, self.config)
        return self._reactions
    
    @property
    def attachments(self) -> AttachmentService:
        """Get AttachmentService instance"""
        if self._attachments is None:
            self._attachments = AttachmentService(self.database, self.config)
        return self._attachments
    
    @property
    def users(self) -> UserService:
        """Get UserService instance"""
        if self._users is None:
            self._users = UserService(self.database, self.config)
        return self._users
    
    @property
    def token(self) -> TokenService:
        """Get TokenService instance"""
        if self._token is None:
            api_key = self.config.get_api_key()
            auth_token = self.config.get_auth_token()
            self._token = TokenService(self.database, api_key, auth_token)
        return self._token
