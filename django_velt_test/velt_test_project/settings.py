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
        'connection_string': os.getenv(
            'VELT_MONGODB_CONNECTION_STRING',
            ''
        ),
        # OR use individual components (for local MongoDB or if connection_string not set)
        # For MongoDB Atlas SRV: use cluster hostname (fallback if connection_string not set)
        # The SDK will automatically detect .mongodb.net domains and use SRV connection
        'host': os.getenv('VELT_MONGODB_HOST', ''),
        'username': os.getenv('VELT_MONGODB_USERNAME', ''),
        'password': os.getenv('VELT_MONGODB_PASSWORD', ''),
        'auth_database': os.getenv('VELT_MONGODB_AUTH_DB', ''),
        'database_name': os.getenv('VELT_MONGODB_DATABASE', '')
    },
    'user_schema': {
        'userId': ['userId', 'user_id'],
        'name': 'full_name',
        'photoUrl': 'photo_url',
        'email': 'email_address',
        'color': 'avatar_color',
        'textColor': 'text_color',
        'isAdmin': 'is_admin',
        'initial': 'initials',
        'random':'random' # This is to test that the schema is working for random fields as well.
    },
    'collections': {
        'comments': 'my_comments',           # Custom collection names
        'reactions': 'my_reactions',
        'attachments': 'my_attachments',
        'users': 'my_users'
    },
    'aws': {
        'access_key_id': os.getenv('AWS_ACCESS_KEY_ID', ''),
        'secret_access_key': os.getenv('AWS_SECRET_ACCESS_KEY', ''),
        'region': os.getenv('AWS_REGION', ''),
        'bucket_name': os.getenv('AWS_S3_BUCKET_NAME', ''),
        # 'endpoint_url': os.getenv('AWS_S3_ENDPOINT_URL', ''),  # Optional for S3-compatible services
    },
    'apiKey': os.getenv('VELT_API_KEY', ''),
    'authToken': os.getenv('VELT_AUTH_TOKEN', '')
}

