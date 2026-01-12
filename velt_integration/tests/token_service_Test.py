"""
Tests for TokenService
"""
import unittest
from unittest.mock import patch, Mock
from velt_integration.services.api.token_service import TokenService
from velt_integration.tests.test_utils import get_mock_database
from velt_integration.exceptions import VeltValidationError, VeltTokenError


class TokenServiceTest(unittest.TestCase):
    """Test cases for TokenService"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.database = get_mock_database()
        self.api_key = 'test-api-key'
        self.auth_token = 'test-auth-token'
        self.service = TokenService(self.database, self.api_key, self.auth_token)
        self.organization_id = 'org-123'
    
    @patch('velt_integration.services.token_service.requests.post')
    def test_getToken_success(self, mock_post):
        """Test getting token successfully"""
        mock_response = Mock()
        mock_response.ok = True
        mock_response.json.return_value = {
            'result': {
                'data': {
                    'token': 'test-token-123'
                }
            }
        }
        mock_post.return_value = mock_response
        
        result = self.service.getToken(
            self.organization_id,
            'user-1',
            email='user@example.com',
            isAdmin=False
        )
        
        self.assertTrue(result['success'])
        self.assertEqual(result['data']['token'], 'test-token-123')
        
        # Verify API call
        mock_post.assert_called_once()
        call_args = mock_post.call_args
        self.assertEqual(call_args[0][0], TokenService.VELT_API_URL)
        self.assertIn('x-velt-api-key', call_args[1]['headers'])
        self.assertIn('x-velt-auth-token', call_args[1]['headers'])
    
    @patch('velt_integration.services.token_service.requests.post')
    def test_getToken_without_email_and_admin(self, mock_post):
        """Test getting token without optional parameters"""
        mock_response = Mock()
        mock_response.ok = True
        mock_response.json.return_value = {
            'result': {
                'data': {
                    'token': 'test-token-123'
                }
            }
        }
        mock_post.return_value = mock_response
        
        result = self.service.getToken(self.organization_id, 'user-1')
        self.assertTrue(result['success'])
        
        # Verify request body doesn't include email or isAdmin
        call_args = mock_post.call_args
        body = call_args[1]['json']
        self.assertNotIn('email', body['data']['userProperties'])
        self.assertNotIn('isAdmin', body['data']['userProperties'])
    
    @patch('velt_integration.services.token_service.requests.post')
    def test_getToken_api_error(self, mock_post):
        """Test handling API error response"""
        mock_response = Mock()
        mock_response.ok = False
        mock_response.json.return_value = {
            'error': {
                'message': 'Invalid credentials'
            }
        }
        mock_post.return_value = mock_response
        
        result = self.service.getToken(self.organization_id, 'user-1')
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'VELT_API_ERROR')
        self.assertIn('Invalid credentials', result['error'])
    
    @patch('velt_integration.services.token_service.requests.post')
    def test_getToken_no_token_in_response(self, mock_post):
        """Test handling response without token"""
        mock_response = Mock()
        mock_response.ok = True
        mock_response.json.return_value = {
            'result': {
                'data': {}
            }
        }
        mock_post.return_value = mock_response
        
        result = self.service.getToken(self.organization_id, 'user-1')
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'NO_TOKEN')
    
    def test_getToken_missing_userId(self):
        """Test getting token without userId"""
        result = self.service.getToken(self.organization_id, '')
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'INVALID_INPUT')
    
    def test_getToken_missing_auth_token(self):
        """Test getting token without auth token"""
        service = TokenService(self.database, self.api_key, None)
        result = service.getToken(self.organization_id, 'user-1')
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'CONFIG_ERROR')
    
    def test_getToken_missing_api_key(self):
        """Test getting token without API key"""
        service = TokenService(self.database, None, self.auth_token)
        result = service.getToken(self.organization_id, 'user-1')
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'CONFIG_ERROR')
    
    @patch('velt_integration.services.token_service.requests.post')
    def test_getToken_network_error(self, mock_post):
        """Test handling network error"""
        import requests
        mock_post.side_effect = requests.exceptions.RequestException('Network error')
        
        with self.assertRaises(VeltTokenError):
            self.service.getToken(self.organization_id, 'user-1')
    
    def test_getToken_invalid_organizationId(self):
        """Test getting token with invalid organizationId"""
        with self.assertRaises(VeltValidationError):
            self.service.getToken('', 'user-1')


if __name__ == '__main__':
    unittest.main()

