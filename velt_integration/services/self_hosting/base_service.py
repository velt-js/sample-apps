"""
Base service class with common methods and response formatting
"""
from typing import Dict, Any, Optional
from ...exceptions import VeltValidationError
from ...database.base import DatabaseAdapter


class BaseService:
    """Base class for all service classes"""
    
    def __init__(self, database: DatabaseAdapter):
        """
        Initialize base service
        
        Args:
            database: DatabaseAdapter instance (database-agnostic)
        """
        self.database = database
    
    def _success_response(self, data: Optional[Dict[str, Any]] = None, **kwargs) -> Dict[str, Any]:
        """
        Create success response
        
        Args:
            data: Response data dictionary
            **kwargs: Additional response fields
            
        Returns:
            Success response dictionary
        """
        response = {'success': True}
        if data is not None:
            response['data'] = data
        response.update(kwargs)
        return response
    
    def _error_response(self, error: str, error_code: Optional[str] = None) -> Dict[str, Any]:
        """
        Create error response
        
        Args:
            error: Human-readable error message
            error_code: Optional error code
            
        Returns:
            Error response dictionary
        """
        response = {
            'success': False,
            'error': error
        }
        if error_code:
            response['errorCode'] = error_code
        return response
    
    def _validate_organization_id(self, organizationId: str):
        """
        Validate organizationId parameter
        
        Args:
            organizationId: Organization ID to validate
            
        Raises:
            VeltValidationError: If organizationId is invalid
        """
        if not organizationId or not isinstance(organizationId, str):
            raise VeltValidationError("organizationId must be a non-empty string")
    
    def _ensure_organization_id(self, document: Dict[str, Any], organizationId: str) -> Dict[str, Any]:
        """
        Ensure organizationId is set in document
        
        Args:
            document: Document dictionary
            organizationId: Organization ID to set
            
        Returns:
            Document with organizationId ensured
        """
        doc = document.copy()
        doc['organizationId'] = organizationId
        return doc

