"""
Base models for Velt SDK

Based on Velt API documentation:
https://docs.velt.dev/api-reference/sdk/models/data-models
"""
from typing import Optional, Dict, Any
from dataclasses import dataclass


@dataclass
class BaseMetadata:
    """
    Base metadata model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#basemetadata
    """
    apiKey: Optional[str] = None
    documentId: Optional[str] = None
    clientDocumentId: Optional[str] = None
    organizationId: Optional[str] = None
    clientOrganizationId: Optional[str] = None
    folderId: Optional[str] = None
    veltFolderId: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {}
        if self.apiKey is not None:
            result['apiKey'] = self.apiKey
        if self.documentId is not None:
            result['documentId'] = self.documentId
        if self.clientDocumentId is not None:
            result['clientDocumentId'] = self.clientDocumentId
        if self.organizationId is not None:
            result['organizationId'] = self.organizationId
        if self.clientOrganizationId is not None:
            result['clientOrganizationId'] = self.clientOrganizationId
        if self.folderId is not None:
            result['folderId'] = self.folderId
        if self.veltFolderId is not None:
            result['veltFolderId'] = self.veltFolderId
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'BaseMetadata':
        """Create from dictionary"""
        return cls(
            apiKey=data.get('apiKey'),
            documentId=data.get('documentId'),
            clientDocumentId=data.get('clientDocumentId'),
            organizationId=data.get('organizationId'),
            clientOrganizationId=data.get('clientOrganizationId'),
            folderId=data.get('folderId'),
            veltFolderId=data.get('veltFolderId')
        )


@dataclass
class ResolverResponse:
    """
    Resolver response wrapper
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#resolverresponse
    
    Generic type T represents the data payload (e.g., Record<string, PartialCommentAnnotation>)
    The data field contains the actual data payload
    """
    data: Dict[str, Any]
    success: bool = True
    statusCode: int = 200
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert to dictionary
        
        Returns:
            Dictionary with 'data', 'success', and 'statusCode' keys
            Format: { 'data': Record<string, PartialCommentAnnotation>, 'success': bool, 'statusCode': int }
        """
        return {
            'data': self.data,
            'success': self.success,
            'statusCode': self.statusCode
        }
    
    @classmethod
    def from_dict(cls, response_data: Dict[str, Any]) -> 'ResolverResponse':
        """Create from dictionary"""
        return cls(
            data=response_data.get('data', response_data.get('result', {})),  # Support both 'data' and 'result' for compatibility
            success=response_data.get('success', True),
            statusCode=response_data.get('statusCode', 200)
        )
