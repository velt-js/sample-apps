"""
URL configuration for velt_test_project project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/velt/', include('velt_api.urls')),
    path('api/host-app/', include('host_app.urls')),
]

