"""
URL configuration for velt_test_project project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    """Simple health check endpoint for Railway"""
    return JsonResponse({'status': 'ok', 'service': 'velt-django-backend'})

urlpatterns = [
    path('', health_check, name='health_check'),
    path('api/velt/', include('velt_api.urls')),
    path('api/host-app/', include('host_app.urls')),
]

