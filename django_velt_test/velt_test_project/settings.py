"""
Django settings for velt_test_project project.
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-test-key-change-in-production'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'corsheaders',
    'velt_api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'velt_test_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'velt_test_project.wsgi.application'

# Database (not used, we use MongoDB via Velt SDK)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings for frontend integration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True

# Velt SDK Configuration
# Option 1: Use MongoDB Atlas connection string (recommended)
# Get your connection string from: MongoDB Atlas → Connect → Connect your application
# Format: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
VELT_SDK_CONFIG = {
    'database': {
        # Use connection_string for MongoDB Atlas (easiest)
        # Username: samarth_new
        # Password: samarth_new
        'connection_string': os.getenv(
            'VELT_MONGODB_CONNECTION_STRING',
            'mongodb+srv://samarth_new:samarth_new@cluster0.0uziymu.mongodb.net/velt-integration?appName=Cluster0&retryWrites=true&w=majority'
        ),
        # OR use individual components (for local MongoDB or if connection_string not set)
        # For MongoDB Atlas SRV: use cluster hostname (fallback if connection_string not set)
        # The SDK will automatically detect .mongodb.net domains and use SRV connection
        'host': os.getenv('VELT_MONGODB_HOST', 'cluster0.0uziymu.mongodb.net'),
        'username': os.getenv('VELT_MONGODB_USERNAME', 'samarth_new'),
        'password': os.getenv('VELT_MONGODB_PASSWORD', 'samarth_new'),
        'auth_database': os.getenv('VELT_MONGODB_AUTH_DB', 'admin'),
        'database_name': os.getenv('VELT_MONGODB_DATABASE', 'velt-integration')
    },
    'user_schema': {
        'userId': ['userId', 'id', 'user_id'],
        'name': 'full_name',
        'photoUrl': 'photo_url',
        'email': 'email_address',
        'color': 'avatar_color',
        'textColor': 'text_color',
        'isAdmin': 'is_admin',
        'initial': 'initials'
    },
    'collections': {
        'comments': 'my_comments',           # Custom collection names
        'reactions': 'my_reactions',
        'attachments': 'my_attachments',
        'users': 'my_users'
    },
    'apiKey': os.getenv('VELT_API_KEY', ''),
    'authToken': os.getenv('VELT_AUTH_TOKEN', '')
}

