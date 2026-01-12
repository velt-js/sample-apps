"""
Tests for UserService
"""
import unittest
from velt_integration.services.self_hosting.user_service import UserService
from velt_integration.tests.test_utils import get_mock_database
from velt_integration.exceptions import VeltValidationError


class UserServiceTest(unittest.TestCase):
    """Test cases for UserService"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.database = get_mock_database()
        self.service = UserService(self.database)
        self.organization_id = 'org-123'
    
    def test_getUsers_empty_list(self):
        """Test getting users with empty list"""
        result = self.service.getUsers(self.organization_id, [])
        self.assertTrue(result['success'])
        self.assertEqual(result['data'], {})
    
    def test_getUsers_success(self):
        """Test getting users successfully"""
        self.database['users'].insert_many([
            {
                'userId': 'user-1',
                'organizationId': self.organization_id,
                'name': 'John Doe',
                'email': 'john@example.com'
            },
            {
                'userId': 'user-2',
                'organizationId': self.organization_id,
                'name': 'Jane Doe',
                'email': 'jane@example.com'
            }
        ])
        
        result = self.service.getUsers(self.organization_id, ['user-1', 'user-2'])
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 2)
        self.assertIn('user-1', result['data'])
        self.assertIn('user-2', result['data'])
    
    def test_getUsers_filtered_by_organizationId(self):
        """Test that getUsers only returns users from the specified organization"""
        self.database['users'].insert_many([
            {
                'userId': 'user-1',
                'organizationId': self.organization_id,
                'name': 'John Doe'
            },
            {
                'userId': 'user-2',
                'organizationId': 'org-456',
                'name': 'Jane Doe'
            }
        ])
        
        result = self.service.getUsers(self.organization_id, ['user-1', 'user-2'])
        self.assertTrue(result['success'])
        # Should only return user-1 since user-2 belongs to different org
        self.assertEqual(len(result['data']), 1)
        self.assertIn('user-1', result['data'])
        self.assertNotIn('user-2', result['data'])
    
    def test_getUsers_partial_match(self):
        """Test getting users when some don't exist"""
        self.database['users'].insert_one({
            'userId': 'user-1',
            'organizationId': self.organization_id,
            'name': 'John Doe'
        })
        
        result = self.service.getUsers(self.organization_id, ['user-1', 'user-nonexistent'])
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 1)
        self.assertIn('user-1', result['data'])
    
    def test_saveUser_success(self):
        """Test saving a user successfully"""
        user = {
            'userId': 'user-1',
            'name': 'John Doe',
            'email': 'john@example.com',
            'photoUrl': 'https://example.com/photo.jpg'
        }
        
        result = self.service.saveUser(self.organization_id, user)
        self.assertTrue(result['success'])
        
        saved = self.database['users'].find_one({'userId': 'user-1'})
        self.assertIsNotNone(saved)
        self.assertEqual(saved['organizationId'], self.organization_id)
        self.assertEqual(saved['name'], 'John Doe')
    
    def test_saveUser_upsert(self):
        """Test that saving updates existing user"""
        # Insert initial user
        self.database['users'].insert_one({
            'userId': 'user-1',
            'organizationId': self.organization_id,
            'name': 'John Doe'
        })
        
        # Update it
        user = {
            'userId': 'user-1',
            'name': 'John Updated',
            'email': 'john@example.com'
        }
        
        result = self.service.saveUser(self.organization_id, user)
        self.assertTrue(result['success'])
        
        saved = self.database['users'].find_one({'userId': 'user-1'})
        self.assertEqual(saved['name'], 'John Updated')
        self.assertEqual(saved['email'], 'john@example.com')
    
    def test_saveUser_missing_userId(self):
        """Test saving user without userId"""
        user = {
            'name': 'John Doe'
        }
        
        result = self.service.saveUser(self.organization_id, user)
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'INVALID_INPUT')
    
    def test_saveUser_empty_user(self):
        """Test saving empty user"""
        result = self.service.saveUser(self.organization_id, {})
        self.assertFalse(result['success'])
    
    def test_saveUser_invalid_organizationId(self):
        """Test saving user with invalid organizationId"""
        user = {
            'userId': 'user-1',
            'name': 'John Doe'
        }
        
        with self.assertRaises(VeltValidationError):
            self.service.saveUser('', user)


if __name__ == '__main__':
    unittest.main()

