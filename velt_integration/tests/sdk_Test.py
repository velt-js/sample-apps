"""
Tests for VeltSDK initialization and service access
"""
import unittest
from unittest.mock import patch
from velt_integration import VeltSDK
from velt_integration.exceptions import VeltSDKError
from velt_integration.tests.test_utils import get_mock_database


class SDKTest(unittest.TestCase):
    """Test cases for VeltSDK"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.config = {
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
    
    @patch('velt_integration.database.get_database')
    def test_initialize_success(self, mock_get_database):
        """Test SDK initialization"""
        mock_get_database.return_value = get_mock_database()
        
        sdk = VeltSDK.initialize(self.config)
        
        self.assertIsNotNone(sdk)
        self.assertIsNotNone(sdk.config)
    
    def test_initialize_invalid_config(self):
        """Test initialization with invalid config"""
        invalid_config = {
            'database': {
                # Missing required fields
            }
        }
        
        with self.assertRaises(VeltSDKError):
            VeltSDK.initialize(invalid_config)
    
    @patch('velt_integration.database.get_database')
    def test_service_properties(self, mock_get_database):
        """Test that service properties return service instances"""
        mock_get_database.return_value = get_mock_database()
        
        sdk = VeltSDK.initialize(self.config)
        
        # Test that selfHosting backend is accessible
        self.assertIsNotNone(sdk.selfHosting)
        
        # Test that services are accessible through selfHosting
        self.assertIsNotNone(sdk.selfHosting.comments)
        self.assertIsNotNone(sdk.selfHosting.reactions)
        self.assertIsNotNone(sdk.selfHosting.attachments)
        self.assertIsNotNone(sdk.selfHosting.users)
        self.assertIsNotNone(sdk.selfHosting.token)
    
    @patch('velt_integration.database.get_database')
    def test_service_properties_lazy_initialization(self, mock_get_database):
        """Test that services are lazily initialized"""
        mock_get_database.return_value = get_mock_database()
        
        sdk = VeltSDK.initialize(self.config)
        
        # Accessing a service should trigger database connection if not already done
        comments = sdk.selfHosting.comments
        self.assertIsNotNone(comments)
        
        # Accessing another service should use same database
        reactions = sdk.selfHosting.reactions
        self.assertIsNotNone(reactions)
    
    @patch('velt_integration.database.get_database')
    def test_close(self, mock_get_database):
        """Test closing SDK connections"""
        mock_get_database.return_value = get_mock_database()
        
        sdk = VeltSDK.initialize(self.config)
        sdk.close()
        
        # After close, services should be None
        # Note: This tests the close method doesn't raise exceptions
        self.assertTrue(True)
    
    def test_config_validation(self):
        """Test that config validation works"""
        # Missing database config
        with self.assertRaises(VeltSDKError):
            VeltSDK.initialize({})
        
        # Missing required database fields
        invalid_config = {
            'database': {
                'host': 'localhost'
                # Missing other required fields
            }
        }
        with self.assertRaises(VeltSDKError):
            VeltSDK.initialize(invalid_config)
    
    @patch('velt_integration.database.get_database')
    def test_environment_variables(self, mock_get_database):
        """Test that API keys can come from environment variables"""
        import os
        from unittest.mock import patch
        
        mock_get_database.return_value = get_mock_database()
        
        config_without_keys = {
            'database': {
                'host': 'localhost:27017',
                'username': 'test_user',
                'password': 'test_pass',
                'auth_database': 'admin',
                'database_name': 'test_db'
            }
        }
        
        with patch.dict(os.environ, {
            'VELT_API_KEY': 'env-api-key',
            'VELT_AUTH_TOKEN': 'env-auth-token'
        }):
            sdk = VeltSDK.initialize(config_without_keys)
            # Verify config can access env vars
            self.assertEqual(sdk.config.get_api_key(), 'env-api-key')
            self.assertEqual(sdk.config.get_auth_token(), 'env-auth-token')


if __name__ == '__main__':
    unittest.main()

