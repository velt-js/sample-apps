"""
Host App URL configuration
Handles application-specific functionality separate from Velt API
"""
from django.urls import path
from .views import save_user

urlpatterns = [
    path('users/save', save_user, name='save_user'),
]
