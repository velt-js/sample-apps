"""
Enums for Velt SDK

Based on Velt API documentation:
https://docs.velt.dev/api-reference/sdk/models/data-models
"""
from enum import Enum


class ResolverActions(str, Enum):
    """
    Resolver actions enum
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#resolveractions
    """
    COMMENT_ANNOTATION_ADD = 'comment_annotation.add'
    COMMENT_ANNOTATION_DELETE = 'comment_annotation.delete'
    COMMENT_ADD = 'comment.add'
    COMMENT_DELETE = 'comment.delete'
    COMMENT_UPDATE = 'comment.update'
    REACTION_ADD = 'reaction.add'
    REACTION_DELETE = 'reaction.delete'
    ATTACHMENT_ADD = 'attachment.add'
    ATTACHMENT_DELETE = 'attachment.delete'
