"""
Comment models for Velt SDK

Based on Velt API documentation:
https://docs.velt.dev/api-reference/sdk/models/data-models
"""
from typing import Optional, List, Dict, Any, Union
from dataclasses import dataclass

from .base import BaseMetadata
from .user import PartialUser, PartialTaggedUserContacts
from .attachment import PartialAttachment
from .enums import ResolverActions


@dataclass
class PartialComment:
    """
    Partial comment model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#partialcomment
    """
    commentId: Union[str, int]
    commentHtml: Optional[str] = None
    commentText: Optional[str] = None
    attachments: Optional[Dict[int, PartialAttachment]] = None
    from_: Optional[PartialUser] = None  # Using from_ to avoid Python keyword conflict
    to: Optional[List[PartialUser]] = None
    taggedUserContacts: Optional[List[PartialTaggedUserContacts]] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {
            'commentId': self.commentId
        }
        if self.commentHtml is not None:
            result['commentHtml'] = self.commentHtml
        if self.commentText is not None:
            result['commentText'] = self.commentText
        if self.attachments is not None:
            # MongoDB requires string keys, so convert attachment IDs to strings
            result['attachments'] = {
                str(attach_id): attach.to_dict() if isinstance(attach, PartialAttachment) else attach
                for attach_id, attach in self.attachments.items()
            }
        if self.from_ is not None:
            result['from'] = self.from_.to_dict() if isinstance(self.from_, PartialUser) else self.from_
        if self.to is not None:
            result['to'] = [
                user.to_dict() if isinstance(user, PartialUser) else user
                for user in self.to
            ]
        if self.taggedUserContacts is not None:
            result['taggedUserContacts'] = [
                contact.to_dict() if isinstance(contact, PartialTaggedUserContacts) else contact
                for contact in self.taggedUserContacts
            ]
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PartialComment':
        """Create from dictionary"""
        attachments = None
        if 'attachments' in data and data['attachments']:
            # Convert attachments dict to Dict[int, PartialAttachment]
            attachments = {
                int(attach_id): PartialAttachment.from_dict(attach_data) if isinstance(attach_data, dict) else attach_data
                for attach_id, attach_data in data['attachments'].items()
            }
        
        from_user = None
        if 'from' in data and data['from']:
            if isinstance(data['from'], dict):
                from_user = PartialUser.from_dict(data['from'])
            elif isinstance(data['from'], PartialUser):
                from_user = data['from']
        
        to_users = None
        if 'to' in data and data['to']:
            to_users = []
            for user_data in data['to']:
                if isinstance(user_data, dict):
                    to_users.append(PartialUser.from_dict(user_data))
                elif isinstance(user_data, PartialUser):
                    to_users.append(user_data)
        
        tagged_user_contacts = None
        if 'taggedUserContacts' in data and data['taggedUserContacts']:
            tagged_user_contacts = []
            for contact_data in data['taggedUserContacts']:
                if isinstance(contact_data, dict):
                    tagged_user_contacts.append(PartialTaggedUserContacts.from_dict(contact_data))
                elif isinstance(contact_data, PartialTaggedUserContacts):
                    tagged_user_contacts.append(contact_data)
        
        return cls(
            commentId=data.get('commentId'),
            commentHtml=data.get('commentHtml'),
            commentText=data.get('commentText'),
            attachments=attachments,
            from_=from_user,
            to=to_users,
            taggedUserContacts=tagged_user_contacts
        )


@dataclass
class PartialCommentAnnotation:
    """
    Partial comment annotation model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#partialcommentannotation
    
    According to BaseMetadata, metadata should contain:
    - documentId (string, optional)
    - organizationId (string, optional)
    - apiKey (string, optional)
    - folderId (string, optional)
    """
    annotationId: str
    metadata: Optional[BaseMetadata] = None
    comments: Optional[Dict[str, PartialComment]] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {
            'annotationId': self.annotationId
        }
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, BaseMetadata) else self.metadata
        if self.comments is not None:
            # Convert PartialComment objects to dicts
            result['comments'] = {}
            for k, v in self.comments.items():
                if isinstance(v, PartialComment):
                    comment_dict = v.to_dict()
                else:
                    # Fallback for dict or other types
                    comment_dict = v if isinstance(v, dict) else {'commentId': str(v)}
                result['comments'][k] = comment_dict
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PartialCommentAnnotation':
        """Create from dictionary"""
        comments = None
        if 'comments' in data and data['comments']:
            comments = {}
            for k, v in data['comments'].items():
                # Handle both dict and PartialComment objects
                if isinstance(v, dict):
                    comments[k] = PartialComment.from_dict(v)
                elif isinstance(v, PartialComment):
                    comments[k] = v
        
        metadata = None
        if 'metadata' in data and data['metadata']:
            if isinstance(data['metadata'], dict):
                metadata = BaseMetadata.from_dict(data['metadata'])
            elif isinstance(data['metadata'], BaseMetadata):
                metadata = data['metadata']
        
        return cls(
            annotationId=data.get('annotationId', ''),
            metadata=metadata,
            comments=comments
        )


@dataclass
class GetCommentResolverRequest:
    """
    Request model for GetCommentResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#getcommentresolverrequest
    """
    organizationId: str
    commentAnnotationIds: Optional[List[str]] = None
    documentIds: Optional[List[str]] = None
    folderId: Optional[str] = None
    allDocuments: Optional[bool] = None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'GetCommentResolverRequest':
        """
        Create GetCommentResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            GetCommentResolverRequest instance
        """
        return cls(
            organizationId=data.get('organizationId', ''),
            commentAnnotationIds=data.get('commentAnnotationIds'),
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
        if self.commentAnnotationIds is not None:
            result['commentAnnotationIds'] = self.commentAnnotationIds
        if self.documentIds is not None:
            result['documentIds'] = self.documentIds
        if self.folderId is not None:
            result['folderId'] = self.folderId
        if self.allDocuments is not None:
            result['allDocuments'] = self.allDocuments
        return result


@dataclass
class SaveCommentResolverRequest:
    """
    Request model for SaveCommentResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#savecommentresolverrequest
    
    organizationId can be retrieved from metadata.organizationId
    """
    commentAnnotation: Dict[str, PartialCommentAnnotation]  # Record<string, PartialCommentAnnotation>
    event: Optional[ResolverActions] = None
    metadata: Optional[BaseMetadata] = None
    commentId: Optional[str] = None
    
    @property
    def organizationId(self) -> Optional[str]:
        """Get organizationId from metadata if available"""
        return self.metadata.organizationId if self.metadata else None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'SaveCommentResolverRequest':
        """
        Create SaveCommentResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            SaveCommentResolverRequest instance
        """
        comment_annotation = {}
        if 'commentAnnotation' in data and data['commentAnnotation']:
            # Convert dict of dicts to dict of PartialCommentAnnotation objects
            for ann_id, ann_data in data['commentAnnotation'].items():
                if isinstance(ann_data, dict):
                    comment_annotation[ann_id] = PartialCommentAnnotation.from_dict(ann_data)
                elif isinstance(ann_data, PartialCommentAnnotation):
                    comment_annotation[ann_id] = ann_data
        
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
            commentAnnotation=comment_annotation,
            event=event,
            metadata=metadata,
            commentId=data.get('commentId')
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert to dictionary
        
        Returns:
            Dictionary representation
        """
        result: Dict[str, Any] = {
            'commentAnnotation': {
                k: v.to_dict() if isinstance(v, PartialCommentAnnotation) else v
                for k, v in self.commentAnnotation.items()
            }
        }
        if self.event is not None:
            # Serialize ResolverActions enum to its string value
            if isinstance(self.event, ResolverActions):
                result['event'] = self.event.value
            else:
                result['event'] = self.event
        if self.metadata is not None:
            result['metadata'] = self.metadata.to_dict() if isinstance(self.metadata, BaseMetadata) else self.metadata
        if self.commentId is not None:
            result['commentId'] = self.commentId
        return result


@dataclass
class DeleteCommentResolverRequest:
    """
    Request model for DeleteCommentResolver endpoint
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#deletecommentresolverrequest
    
    organizationId can be retrieved from metadata.organizationId
    """
    commentAnnotationId: str
    metadata: Optional[BaseMetadata] = None
    event: Optional[ResolverActions] = None
    
    @property
    def organizationId(self) -> Optional[str]:
        """Get organizationId from metadata if available"""
        return self.metadata.organizationId if self.metadata else None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'DeleteCommentResolverRequest':
        """
        Create DeleteCommentResolverRequest from dictionary
        
        Args:
            data: Dictionary containing request fields
            
        Returns:
            DeleteCommentResolverRequest instance
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
            commentAnnotationId=data.get('commentAnnotationId', ''),
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
            'commentAnnotationId': self.commentAnnotationId
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
