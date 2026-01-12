"""
Velt SDK initialization for Django app
"""
from django.conf import settings
from velt_integration import VeltSDK

# Initialize SDK once at module level
_velt_sdk = None

def get_velt_sdk():
    """Get or initialize Velt SDK instance"""
    global _velt_sdk
    if _velt_sdk is None:
        _velt_sdk = VeltSDK.initialize(settings.VELT_SDK_CONFIG)
    return _velt_sdk

