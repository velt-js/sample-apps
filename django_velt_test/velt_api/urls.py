"""
URL configuration for velt_api app
"""
from django.urls import path
from .views import (
    get_comments,
    save_comments,
    delete_comment,
    get_reactions,
    save_reactions,
    delete_reaction,
    get_recorder_annotations,
    save_recorder_annotation,
    delete_recorder_annotation,
    get_notifications,
    save_notifications,
    delete_notification,
    save_attachment,
    delete_attachment,
    get_activities,
    save_activities,
    get_users,
    get_token,
)

urlpatterns = [
    # Comments endpoints
    path('comments/get', get_comments, name='get_comments'),
    path('comments/save', save_comments, name='save_comments'),
    path('comments/delete', delete_comment, name='delete_comment'),
    
    # Reactions endpoints
    path('reactions/get', get_reactions, name='get_reactions'),
    path('reactions/save', save_reactions, name='save_reactions'),
    path('reactions/delete', delete_reaction, name='delete_reaction'),
    
    # Recorders endpoints
    path('recorders/get', get_recorder_annotations, name='get_recorder_annotations'),
    path('recorders/save', save_recorder_annotation, name='save_recorder_annotation'),
    path('recorders/delete', delete_recorder_annotation, name='delete_recorder_annotation'),

    # Notifications endpoints
    path('notifications/get', get_notifications, name='get_notifications'),
    path('notifications/save', save_notifications, name='save_notifications'),
    path('notifications/delete', delete_notification, name='delete_notification'),

    # Attachments endpoints
    path('attachments/save', save_attachment, name='save_attachment'),
    path('attachments/delete', delete_attachment, name='delete_attachment'),
    
    # Activities endpoints
    path('activities/get', get_activities, name='get_activities'),
    path('activities/save', save_activities, name='save_activities'),

    # Users endpoints
    path('users/get', get_users, name='get_users'),
    
    # Token endpoint
    path('token', get_token, name='get_token'),
]

