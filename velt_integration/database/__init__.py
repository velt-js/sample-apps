"""
Database abstraction layer for Velt SDK

Supports multiple database backends through adapter pattern.
"""
from .base import DatabaseAdapter
from .mongodb_adapter import MongoDBAdapter
from .connection import get_database, reset_connection

__all__ = [
    'DatabaseAdapter',
    'MongoDBAdapter',
    'get_database',
    'reset_connection',
]
