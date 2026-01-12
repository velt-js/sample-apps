"""
Reaction models for Velt SDK

Based on Velt API documentation:
https://docs.velt.dev/api-reference/sdk/models/data-models
"""
from typing import Optional, List, Dict, Any
from dataclasses import dataclass

from .base import BaseMetadata
from .user import PartialUser
from .enums import ResolverActions


@dataclass
class PartialReactionAnnotation:
    """
    Partial reaction annotation model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#partialreactionannotation
    
    According to BaseMetadata, metadata should contain:
    - documentId (string, optional)
    - organizationId (string, optional)
    - apiKey (string, optional)
    - folderId (string, optional)
    """
    annotationId: str
    metadata: Optional[BaseMetadata] = None
    icon: Optional[str] = None
    user: Optional[PartialUser] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {
            'annotationId': self.annotationId
        }
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, BaseMetadata) else self.metadata
        if self.icon is not None:
            result['icon'] = self.icon
        if self.user is not None:
            result['user'] = self.user.to_dict() if isinstance(self.user, PartialUser) else self.user
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PartialReactionAnnotation':
        """Create from dictionary"""
        user = None
        if 'user' in data and data['user']:
            if isinstance(data['user'], dict):
                user = PartialUser.from_dict(data['user'])
            elif isinstance(data['user'], PartialUser):
                user = data['user']
        
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = BaseMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], BaseMetadata):
                metadata = data['metadata']
        
        return cls(
            annotationId=data.get('annotationId', ''),
            metadata=metadata,
            icon=data.get('icon'),
            user=user
        )


@dataclass
class GetReactionResolverRequest:
    """
    Request model for GetReactionResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#getreactionresolverrequest
    """
    organizationId: str
    reactionAnnotationIds: Optional[List[str]] = None
    documentIds: Optional[List[str]] = None
    folderId: Optional[str] = None
    allDocuments: Optional[bool] = None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'GetReactionResolverRequest':
        """
        Create GetReactionResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            GetReactionResolverRequest instance
        """
        return cls(
            organizationId=data.get('organizationId', ''),
            reactionAnnotationIds=data.get('reactionAnnotationIds'),
            documentIds=data.get('documentIds'),
            folderId=data.get('folderId'),
            allDocuments=data.get('allDocuments')
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert to dictionary
        
        Returns:
            Dictionary representation
        """
        result: Dict[str, Any] = {
            'organizationId': self.organizationId
        }
        if self.reactionAnnotationIds is not None:
            result['reactionAnnotationIds'] = self.reactionAnnotationIds
        if self.documentIds is not None:
            result['documentIds'] = self.documentIds
        if self.folderId is not None:
            result['folderId'] = self.folderId
        if self.allDocuments is not None:
            result['allDocuments'] = self.allDocuments
        return result


@dataclass
class SaveReactionResolverRequest:
    """
    Request model for SaveReactionResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#savereactionresolverrequest
    
    organizationId can be retrieved from metadata.organizationId
    """
    reactionAnnotation: Dict[str, PartialReactionAnnotation]  # Record<string, PartialReactionAnnotation>
    metadata: Optional[BaseMetadata] = None
    event: Optional[ResolverActions] = None
    
    @property
    def organizationId(self) -> Optional[str]:
        """Get organizationId from metadata if available"""
        return self.metadata.organizationId if self.metadata else None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'SaveReactionResolverRequest':
        """
        Create SaveReactionResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            SaveReactionResolverRequest instance
        """
        reaction_annotation = {}
        if 'reactionAnnotation' in data and data['reactionAnnotation']:
            # Convert dict of dicts to dict of PartialReactionAnnotation objects
            for ann_id, ann_data in data['reactionAnnotation'].items():
                if isinstance(ann_data, dict):
                    reaction_annotation[ann_id] = PartialReactionAnnotation.from_dict(ann_data)
                elif isinstance(ann_data, PartialReactionAnnotation):
                    reaction_annotation[ann_id] = ann_data
        
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = BaseMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], BaseMetadata):
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
            reactionAnnotation=reaction_annotation,
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
            'reactionAnnotation': {
                k: v.to_dict() if isinstance(v, PartialReactionAnnotation) else v
                for k, v in self.reactionAnnotation.items()
            }
        }
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, BaseMetadata) else self.metadata
        if self.event is not None:
            # Serialize ResolverActions enum to its string value
            if isinstance(self.event, ResolverActions):
                result['event'] = self.event.value
            else:
                result['event'] = self.event
        return result


@dataclass
class DeleteReactionResolverRequest:
    """
    Request model for DeleteReactionResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#deletereactionresolverrequest
    
    organizationId can be retrieved from metadata.organizationId
    """
    reactionAnnotationId: str
    metadata: Optional[BaseMetadata] = None
    event: Optional[ResolverActions] = None
    
    @property
    def organizationId(self) -> Optional[str]:
        """Get organizationId from metadata if available"""
        return self.metadata.organizationId if self.metadata else None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'DeleteReactionResolverRequest':
        """
        Create DeleteReactionResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            DeleteReactionResolverRequest instance
        """
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = BaseMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], BaseMetadata):
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
            reactionAnnotationId=data.get('reactionAnnotationId', ''),
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
            'reactionAnnotationId': self.reactionAnnotationId
        }
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, BaseMetadata) else self.metadata
        if self.event is not None:
            # Serialize ResolverActions enum to its string value
            if isinstance(self.event, ResolverActions):
                result['event'] = self.event.value
            else:
                result['event'] = self.event
        return result
