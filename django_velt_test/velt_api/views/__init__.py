"""
Views package for Velt API

Exports all view functions for easy importing in urls.py
"""
from .comment_views import get_comments, save_comments, delete_comment
from .reaction_views import get_reactions, save_reactions, delete_reaction
from .recorder_views import get_recorder_annotations, save_recorder_annotation, delete_recorder_annotation
from .notification_views import get_notifications, save_notifications, delete_notification
from .attachment_views import save_attachment, delete_attachment
from .activity_views import get_activities, save_activities
from .user_views import get_users
from .token_views import get_token

__all__ = [
    # Comment views
    'get_comments',
    'save_comments',
    'delete_comment',
    # Reaction views
    'get_reactions',
    'save_reactions',
    'delete_reaction',
    # Recorder views
    'get_recorder_annotations',
    'save_recorder_annotation',
    'delete_recorder_annotation',
    # Notification views
    'get_notifications',
    'save_notifications',
    'delete_notification',
    # Attachment views
    'save_attachment',
    'delete_attachment',
    # Activity views
    'get_activities',
    'save_activities',
    # User views
    'get_users',
    # Token views
    'get_token',
]
