"""
Test utilities and mongomock setup
"""
import mongomock
from pymongo.database import Database
from velt_integration.config import Config
from velt_integration.database import reset_connection


def get_mock_database() -> Database:
    """
    Get a mock MongoDB database using mongomock
    
    Returns:
        Mock MongoDB Database instance
    """
    client = mongomock.MongoClient()
    return client['test_db']


def get_mock_config() -> Config:
    """
    Get a mock configuration for testing
    
    Returns:
        Config instance with test settings
    """
    config = {
        'database': {
            'host': 'localhost:27017',
            'username': 'test_user',
            'password': 'test_pass',
            'auth_database': 'admin',
            'database_name': 'test_db'
        },
        'apiKey': 'test-api-key',
        'authToken': 'test-auth-token'
    }
    return Config(config)


def cleanup():
    """Reset connection state for testing"""
    reset_connection()

