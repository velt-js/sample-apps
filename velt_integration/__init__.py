"""
Velt Integration SDK for Django

A Python SDK for integrating Velt comments, reactions, attachments, and user management
into Django applications with MongoDB backend.
"""

__version__ = '0.1.0'

from .sdk import VeltSDK
from .exceptions import (
    VeltSDKError,
    VeltDatabaseError,
    VeltValidationError,
    VeltTokenError
)
from .models import (
    GetCommentResolverRequest,
    SaveCommentResolverRequest,
    DeleteCommentResolverRequest,
    GetReactionResolverRequest,
    SaveReactionResolverRequest,
    DeleteReactionResolverRequest,
    SaveAttachmentResolverRequest,
    DeleteAttachmentResolverRequest,
    SaveAttachmentResolverData,
    AttachmentResolverMetadata,
    ResolverAttachment,
    ResolverActions,
    ResolverResponse,
    BaseMetadata,
    PartialCommentAnnotation,
    PartialComment,
    PartialAttachment,
    PartialReactionAnnotation,
    PartialUser,
    PartialTaggedUserContacts
)

__all__ = [
    'VeltSDK',
    'VeltSDKError',
    'VeltDatabaseError',
    'VeltValidationError',
    'VeltTokenError',
    'GetCommentResolverRequest',
    'SaveCommentResolverRequest',
    'DeleteCommentResolverRequest',
    'GetReactionResolverRequest',
    'SaveReactionResolverRequest',
    'DeleteReactionResolverRequest',
    'SaveAttachmentResolverRequest',
    'DeleteAttachmentResolverRequest',
    'SaveAttachmentResolverData',
    'AttachmentResolverMetadata',
    'ResolverAttachment',
    'ResolverActions',
    'ResolverResponse',
    'BaseMetadata',
    'PartialCommentAnnotation',
    'PartialComment',
    'PartialAttachment',
    'PartialReactionAnnotation',
    'PartialUser',
    'PartialTaggedUserContacts'
]

