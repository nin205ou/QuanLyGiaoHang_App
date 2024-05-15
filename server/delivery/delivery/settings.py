"""
Django settings for delivery project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-6k!7i7h1no$&uvpf@=*-o%u$5r3^@=46gw0h+e-h8yt(+og(8!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'e762-2402-800-6314-c783-cc02-7086-2a86-c9f1.ngrok-free.app',
    'localhost',
    '192.168.1.46',
    '192.168.0.138',
    '192.168.1.5'
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'api.apps.ApiConfig',
    'rest_framework',
    'django.contrib.auth',
    'django.contrib.messages',
    
    'oauth2_provider',
    'corsheaders',
    'django.contrib.humanize',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'delivery.urls'
MEDIA_ROOT = '%s/api/static' % BASE_DIR

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'delivery.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'delivery_app_db',
        'USER': 'root',
        'PASSWORD': '123',
        'OPTIONS': {
            'charset': 'utf8',
            'collation': 'utf8_general_ci',
        },
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    ),
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_PERMISSIONS_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

CORS_ORIGIN_WHITELIST = [
    "http://192.168.1.33",
]

AUTH_USER_MODEL = "api.User"

CLIENT_ID = 'AENcdHOHsUoIgOSKLSNtH5pIZbbJzWhLodGkgCRt'
CLIENT_SECRET = 'GxDX99jOIbBwIeS0YmsSlKV0ltFrO1ZrxUIcV8nhUffz8qA7jd6ouLH1lCkBWU8aSU08qlB2dDhpndKdg6Rb2e9NyQER4MimQyndabuJNGVToplN9jMLh8Rq9bFTOlrm'

# Email sirvice
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # SMTP server
EMAIL_PORT = 587  # Cổng SMTP 
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'services2907@gmail.com'
EMAIL_HOST_PASSWORD = 'dwkl aedq ptpq uros'

# Momo payment settings
ACCESS_KEY = "F8BBA842ECF85"
PARTNER_CODE = "MOMO"
SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
REQUEST_TYPE = "captureWallet"
REDIRECT_URL = "https://" + ALLOWED_HOSTS[0] + "/api/payment_success/"
IPN_URL = "https://" + ALLOWED_HOSTS[0] + "/api/momo_notify/"
ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create"

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
