"""
Django settings for velt_test_project project.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
import certifi

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file
load_dotenv(BASE_DIR / '.env')

# Set SSL certificate path for MongoDB
os.environ['SSL_CERT_FILE'] = certifi.where()

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
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

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

WSGI_APPLICATION = 'config.wsgi.application'

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
# Add all origins where your frontend runs
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",    # Next.js default
    "http://localhost:5173",    # Vite default
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True

# Allow additional CORS headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# MongoDB Configuration
# Primary: MONGODB_URI (same as reference demo for consistency)
# Fallback: VELT_MONGODB_CONNECTION_STRING (legacy Django framework convention)
# Format: mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_URI = os.getenv('MONGODB_URI') or os.getenv('VELT_MONGODB_CONNECTION_STRING')
MONGODB_DATABASE = os.getenv('MONGODB_DATABASE', os.getenv('VELT_MONGODB_DATABASE', 'velt_comments'))

# Velt SDK Configuration (used by existing SDK-based endpoints)
# For new direct MongoDB endpoints, see MONGODB_URI above
VELT_SDK_CONFIG = {
    'database': {
        # Use connection_string for MongoDB Atlas (easiest)
        'connection_string': MONGODB_URI,
        # OR use individual components (for local MongoDB or if connection_string not set)
        # For MongoDB Atlas SRV: use cluster hostname (fallback if connection_string not set)
        # The SDK will automatically detect .mongodb.net domains and use SRV connection
        'host': os.getenv('VELT_MONGODB_HOST'),
        'username': os.getenv('VELT_MONGODB_USERNAME'),
        'password': os.getenv('VELT_MONGODB_PASSWORD'),
        'auth_database': os.getenv('VELT_MONGODB_AUTH_DB'),
        'database_name': MONGODB_DATABASE
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
        'comments': 'comment_annotations',   # Match reference demo collection names
        'reactions': 'reaction_annotations',
        'attachments': 'attachments',
        'users': 'users'
    },
    'apiKey': os.getenv('VELT_API_KEY', ''),
    'authToken': os.getenv('VELT_AUTH_TOKEN', '')
}

