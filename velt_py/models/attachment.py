"""
Attachment models for Velt SDK

Based on Velt API documentation:
https://docs.velt.dev/api-reference/sdk/models/data-models
"""
from typing import Optional, Dict, Any, Union
from dataclasses import dataclass

from .enums import ResolverActions


@dataclass
class PartialAttachment:
    """
    Partial attachment model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#partialattachment
    """
    url: str
    name: str
    attachmentId: int
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'url': self.url,
            'name': self.name,
            'attachmentId': self.attachmentId
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PartialAttachment':
        """Create from dictionary"""
        return cls(
            url=data.get('url', ''),
            name=data.get('name', ''),
            attachmentId=data.get('attachmentId', 0)
        )


@dataclass
class AttachmentResolverMetadata:
    """
    Metadata model for AttachmentResolver requests
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#attachmentresolvermetadata
    """
    organizationId: Optional[str] = None
    documentId: Optional[str] = None
    folderId: Optional[str] = None
    attachmentId: Optional[int] = None
    commentAnnotationId: Optional[str] = None
    apiKey: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {}
        if self.organizationId is not None:
            result['organizationId'] = self.organizationId
        if self.documentId is not None:
            result['documentId'] = self.documentId
        if self.folderId is not None:
            result['folderId'] = self.folderId
        if self.attachmentId is not None:
            result['attachmentId'] = self.attachmentId
        if self.commentAnnotationId is not None:
            result['commentAnnotationId'] = self.commentAnnotationId
        if self.apiKey is not None:
            result['apiKey'] = self.apiKey
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'AttachmentResolverMetadata':
        """Create from dictionary"""
        return cls(
            organizationId=data.get('organizationId'),
            documentId=data.get('documentId'),
            folderId=data.get('folderId'),
            attachmentId=data.get('attachmentId'),
            commentAnnotationId=data.get('commentAnnotationId'),
            apiKey=data.get('apiKey')
        )


@dataclass
class SaveAttachmentResolverData:
    """
    Response data model for SaveAttachmentResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#saveattachmentresolverdata
    """
    url: str
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {'url': self.url}
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'SaveAttachmentResolverData':
        """Create from dictionary"""
        return cls(url=data.get('url', ''))


@dataclass
class ResolverAttachment:
    """
    Resolver attachment model for SaveAttachmentResolverRequest
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#resolverattachment
    
    Note: The `file` field represents file data. For JSON APIs, this is typically
    a base64-encoded string. For binary data handling, bytes can be used.
    """
    attachmentId: int
    file: Union[str, bytes]  # File data - base64 encoded string (for JSON) or bytes
    name: Optional[str] = None
    metadata: Optional[AttachmentResolverMetadata] = None
    mimeType: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {
            'attachmentId': self.attachmentId,
            'file': self.file if isinstance(self.file, str) else self.file.decode('utf-8', errors='ignore')
        }
        if self.name is not None:
            result['name'] = self.name
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, AttachmentResolverMetadata) else self.metadata
        if self.mimeType is not None:
            result['mimeType'] = self.mimeType
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'ResolverAttachment':
        """Create from dictionary"""
        file_data = data.get('file', '')
        # Handle both string (base64) and bytes
        if isinstance(file_data, bytes):
            file_value = file_data
        else:
            file_value = str(file_data)
        
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = AttachmentResolverMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], AttachmentResolverMetadata):
                metadata = data['metadata']
        
        return cls(
            attachmentId=data.get('attachmentId', 0),
            file=file_value,
            name=data.get('name'),
            metadata=metadata,
            mimeType=data.get('mimeType')
        )


@dataclass
class SaveAttachmentResolverRequest:
    """
    Request model for SaveAttachmentResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#saveattachmentresolverrequest
    
    organizationId can be retrieved from metadata.organizationId
    """
    attachment: ResolverAttachment
    metadata: Optional[AttachmentResolverMetadata] = None
    event: Optional[ResolverActions] = None
    
    @property
    def organizationId(self) -> Optional[str]:
        """Get organizationId from metadata if available"""
        return self.metadata.organizationId if self.metadata else None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'SaveAttachmentResolverRequest':
        """
        Create SaveAttachmentResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            SaveAttachmentResolverRequest instance
        """
        attachment = None
        if 'attachment' in data and data['attachment']:
            if isinstance(data['attachment'], dict):
                attachment = ResolverAttachment.from_dict(data['attachment'])
            elif isinstance(data['attachment'], ResolverAttachment):
                attachment = data['attachment']
        
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = AttachmentResolverMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], AttachmentResolverMetadata):
                metadata = data['metadata']
        
        event = None
        if 'event' in data and data['event']:
            if isinstance(data['event'], str):
                # Try to convert string to ResolverActions enum
                try:
                    event = ResolverActions(data['event'])
                except ValueError:
                    # If not a valid enum value, keep as string
                    event = data['event']
            elif isinstance(data['event'], ResolverActions):
                event = data['event']
            else:
                event = data['event']
        
        return cls(
            attachment=attachment,
            metadata=metadata,
            event=event
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert to dictionary
        
        Returns:
            Dictionary representation
        """
        result: Dict[str, Any] = {
            'attachment': self.attachment.to_dict() if isinstance(self.attachment, ResolverAttachment) else self.attachment
        }
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, AttachmentResolverMetadata) else self.metadata
        if self.event is not None:
            # Serialize ResolverActions enum to its string value
            if isinstance(self.event, ResolverActions):
                result['event'] = self.event.value
            else:
                result['event'] = self.event
        return result


@dataclass
class DeleteAttachmentResolverRequest:
    """
    Request model for DeleteAttachmentResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#deleteattachmentresolverrequest
    
    organizationId can be retrieved from metadata.organizationId
    """
    attachmentId: int
    metadata: Optional[AttachmentResolverMetadata] = None
    event: Optional[ResolverActions] = None
    
    @property
    def organizationId(self) -> Optional[str]:
        """Get organizationId from metadata if available"""
        return self.metadata.organizationId if self.metadata else None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'DeleteAttachmentResolverRequest':
        """
        Create DeleteAttachmentResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            DeleteAttachmentResolverRequest instance
        """
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = AttachmentResolverMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], AttachmentResolverMetadata):
                metadata = data['metadata']
        
        event = None
        if 'event' in data and data['event']:
            if isinstance(data['event'], str):
                # Try to convert string to ResolverActions enum
                try:
                    event = ResolverActions(data['event'])
                except ValueError:
                    # If not a valid enum value, keep as string
                    event = data['event']
            elif isinstance(data['event'], ResolverActions):
                event = data['event']
            else:
                event = data['event']
        
        return cls(
            attachmentId=data.get('attachmentId', 0),
            metadata=metadata,
            event=event
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert to dictionary
        
        Returns:
            Dictionary representation
        """
        result: Dict[str, Any] = {
            'attachmentId': self.attachmentId
        }
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, AttachmentResolverMetadata) else self.metadata
        if self.event is not None:
            # Serialize ResolverActions enum to its string value
            if isinstance(self.event, ResolverActions):
                result['event'] = self.event.value
            else:
                result['event'] = self.event
        return result
