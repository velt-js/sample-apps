"""
WSGI config for velt_test_project project.
"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'velt_test_project.settings')

application = get_wsgi_application()

