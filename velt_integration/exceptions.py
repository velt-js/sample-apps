"""
Custom exceptions for Velt SDK
"""


class VeltSDKError(Exception):
    """Base exception for all Velt SDK errors"""
    pass


class VeltDatabaseError(VeltSDKError):
    """Exception raised for database-related errors"""
    pass


class VeltValidationError(VeltSDKError):
    """Exception raised for validation errors"""
    pass


class VeltTokenError(VeltSDKError):
    """Exception raised for token-related errors"""
    pass

