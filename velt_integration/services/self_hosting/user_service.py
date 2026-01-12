"""
User service for managing users
"""
from typing import Dict, Any, List, Optional, Union
from pymongo.errors import PyMongoError

from .base_service import BaseService
from ...exceptions import VeltDatabaseError, VeltValidationError
from ...config import Config


class UserService(BaseService):
    """Service for managing users"""
    
    def __init__(self, database, config: Optional[Config] = None):
        """
        Initialize user service
        
        Args:
            database: DatabaseAdapter instance
            config: Optional configuration instance for schema mapping
        """
        super().__init__(database)
        self.collection_name = config.get_collection_name('users') if config else 'users'
        self.config = config
        self._user_schema = None
        self._load_user_schema()
    
    def _load_user_schema(self):
        """Load user schema mapping from config"""
        if self.config:
            self._user_schema = self.config.get_user_schema()
    
    def _get_field_value(self, doc: Dict[str, Any], sdk_field: str) -> Any:
        """
        Get field value from document using schema mapping
        
        Args:
            doc: MongoDB document
            sdk_field: SDK field name (e.g., 'userId', 'name')
            
        Returns:
            Field value or None if not found
        """
        if not self._user_schema or sdk_field not in self._user_schema:
            # No schema mapping, use SDK field name directly
            return doc.get(sdk_field)
        
        mapping = self._user_schema[sdk_field]
        
        if isinstance(mapping, str):
            # Direct mapping: 'userId' -> 'id'
            return doc.get(mapping)
        elif isinstance(mapping, list):
            # Try multiple field names in order
            for field_name in mapping:
                if field_name in doc:
                    return doc.get(field_name)
            return None
        else:
            # Invalid mapping type, fallback to SDK field name
            return doc.get(sdk_field)
    
    def _transform_user(self, user_doc: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform user document from customer schema to SDK schema
        
        Args:
            user_doc: Raw MongoDB document
            
        Returns:
            Transformed user document with SDK field names
        """
        if not self._user_schema:
            # No schema mapping, return as-is (remove _id)
            user_doc.pop('_id', None)
            return user_doc
        
        transformed: Dict[str, Any] = {}
        
        # Map all SDK fields based on User class specification:
        # userId (required), name, photoUrl, email, color, textColor, isAdmin, initial
        # organizationId is kept for internal filtering but can be included if present
        sdk_fields = [
            'userId',      # Required: Unique user identifier
            'name',         # Optional: User's full name
            'photoUrl',     # Optional: Display picture URL
            'email',        # Optional: Email for notifications
            'color',        # Optional: Avatar border and cursor color
            'textColor',    # Optional: Avatar text color
            'isAdmin',      # Optional: Admin flag
            'initial',      # Optional: Initial character
            'organizationId'  # Optional: For data isolation (internal use)
        ]
        
        for sdk_field in sdk_fields:
            value = self._get_field_value(user_doc, sdk_field)
            if value is not None:
                transformed[sdk_field] = value
        
        # Include any other fields from the original document that aren't mapped
        # This allows customers to include custom fields
        for key, value in user_doc.items():
            if key not in transformed and key != '_id':
                # Check if this key is a mapped field (reverse lookup)
                is_mapped = False
                for sdk_field, mapping in self._user_schema.items():
                    if isinstance(mapping, str) and mapping == key:
                        is_mapped = True
                        break
                    elif isinstance(mapping, list) and key in mapping:
                        is_mapped = True
                        break
                
                if not is_mapped:
                    transformed[key] = value
        
        return transformed
    
    def _get_user_id_field(self) -> Union[str, List[str]]:
        """
        Get the field name(s) to use for userId in queries
        
        Returns:
            Field name string or list of field names to try
        """
        if not self._user_schema or 'userId' not in self._user_schema:
            return 'userId'
        
        mapping = self._user_schema['userId']
        if isinstance(mapping, str):
            return mapping
        elif isinstance(mapping, list):
            return mapping
        else:
            return 'userId'
    
    def _get_organization_id_field(self) -> str:
        """
        Get the field name to use for organizationId in queries
        
        Returns:
            Field name string
        """
        if not self._user_schema or 'organizationId' not in self._user_schema:
            return 'organizationId'
        
        mapping = self._user_schema['organizationId']
        if isinstance(mapping, str):
            return mapping
        elif isinstance(mapping, list) and mapping:
            return mapping[0]
        else:
            return 'organizationId'
    
    def getUsers(self, organizationId: str, userIds: List[str]) -> Dict[str, Any]:
        """
        Get users by their IDs
        
        Args:
            organizationId: Organization ID (required for data isolation)
            userIds: List of user IDs to retrieve
            
        Returns:
            Response dictionary with 'success' and 'data' keys
        """
        try:
            self._validate_organization_id(organizationId)
            
            if not userIds or not isinstance(userIds, list):
                return self._success_response(data={})
            
            # Build query using schema mapping
            user_id_field = self._get_user_id_field()
            org_id_field = self._get_organization_id_field()
            
            # Build query filter
            query_filter: Dict[str, Any] = {}
            
            if isinstance(user_id_field, list):
                # Try to match any of the field names (OR condition)
                # MongoDB doesn't support OR for field names directly, so we'll query each
                # For simplicity, use the first field name and let transformation handle it
                query_filter[user_id_field[0]] = {'$in': userIds}
            else:
                query_filter[user_id_field] = {'$in': userIds}
            
            # Add organizationId filter
            query_filter[org_id_field] = organizationId
            
            # Query database using adapter
            users = self.database.find(self.collection_name, query_filter)
            
            # Transform and convert to Record format expected by Velt (dict keyed by userId)
            result: Dict[str, Dict[str, Any]] = {}
            for user in users:
                # Transform user document using schema
                transformed_user = self._transform_user(user)
                
                # Get userId from transformed document (should be in SDK format now)
                user_id = transformed_user.get('userId')
                if user_id:
                    result[user_id] = transformed_user
            
            return self._success_response(data=result)
            
        except VeltValidationError:
            raise
        except PyMongoError as e:
            raise VeltDatabaseError(f"Database error while getting users: {str(e)}")
        except Exception as e:
            raise VeltDatabaseError(f"Unexpected error while getting users: {str(e)}")
    
    def saveUser(self, organizationId: str, user: Dict[str, Any]) -> Dict[str, Any]:
        """
        Save a user
        
        Args:
            organizationId: Organization ID (required for data isolation)
            user: User dictionary with userId and other fields
            
        Returns:
            Response dictionary with 'success' key
        """
        try:
            self._validate_organization_id(organizationId)
            
            if not user:
                return self._error_response("user is required", "INVALID_INPUT")
            
            user_id = user.get('userId')
            if not user_id:
                return self._error_response("user.userId is required", "INVALID_INPUT")
            
            # Ensure organizationId is set
            user_data = self._ensure_organization_id(user, organizationId)
            
            # Upsert user using adapter
            self.database.update_one(
                self.collection_name,
                {'userId': user_id, 'organizationId': organizationId},
                {'$set': user_data},
                upsert=True
            )
            
            return self._success_response()
            
        except VeltValidationError:
            raise
        except PyMongoError as e:
            raise VeltDatabaseError(f"Database error while saving user: {str(e)}")
        except Exception as e:
            raise VeltDatabaseError(f"Unexpected error while saving user: {str(e)}")

