"""
Backend implementations for Velt SDK

Supports different backends:
- selfHosting: Direct database access (self-hosted)
- api: REST API calls (to be implemented)
"""
from .self_hosting_backend import SelfHostingBackend

__all__ = ['SelfHostingBackend']
