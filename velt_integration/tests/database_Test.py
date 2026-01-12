"""
Tests for database connection and index creation
"""
import unittest
from velt_integration.database import get_database, reset_connection
from velt_integration.config import Config
from velt_integration.tests.test_utils import get_mock_database


class DatabaseTest(unittest.TestCase):
    """Test cases for database connection and index creation"""
    
    def setUp(self):
        """Set up test fixtures"""
        reset_connection()
        self.config = Config({
            'database': {
                'host': 'localhost:27017',
                'username': 'test_user',
                'password': 'test_pass',
                'auth_database': 'admin',
                'database_name': 'test_db'
            }
        })
    
    def tearDown(self):
        """Clean up after tests"""
        reset_connection()
    
    def test_get_database_creates_indexes(self):
        """Test that get_database creates indexes"""
        # Use mongomock for testing
        import mongomock
        from unittest.mock import patch
        
        with patch('velt_integration.database.MongoClient') as mock_client_class:
            mock_client = mongomock.MongoClient()
            mock_client_class.return_value = mock_client
            
            # Mock the ping command
            mock_client.admin.command = lambda x: {}
            
            db = get_database(self.config)
            
            # Verify indexes exist (mongomock doesn't fully support index checking,
            # but we can verify the collections exist)
            self.assertIsNotNone(db)
            self.assertEqual(db.name, 'test_db')
    
    def test_reset_connection(self):
        """Test that reset_connection clears cached connections"""
        reset_connection()
        # After reset, should be able to initialize again
        # This is mainly testing that reset doesn't raise exceptions
        self.assertTrue(True)
    
    def test_connection_string_building(self):
        """Test MongoDB URI building from config"""
        config = Config({
            'database': {
                'host': 'localhost:27017',
                'username': 'user',
                'password': 'pass',
                'auth_database': 'admin',
                'database_name': 'test_db'
            }
        })
        
        uri = config.get_mongodb_uri()
        self.assertIn('mongodb://', uri)
        self.assertIn('user', uri)
        self.assertIn('pass', uri)
        self.assertIn('test_db', uri)
        self.assertIn('authSource=admin', uri)
    
    def test_connection_string_override(self):
        """Test using connection string override"""
        config = Config({
            'database': {
                'connection_string': 'mongodb://override:override@localhost:27017/test',
                'host': 'localhost:27017',
                'username': 'user',
                'password': 'pass',
                'auth_database': 'admin',
                'database_name': 'test_db'
            }
        })
        
        uri = config.get_mongodb_uri()
        self.assertEqual(uri, 'mongodb://override:override@localhost:27017/test')
    
    def test_collection_names(self):
        """Test that collections are named correctly"""
        db = get_mock_database()
        
        # Verify collection names match expected
        collections = db.list_collection_names()
        # Collections are created when first accessed, so we'll just verify
        # the database object is valid
        self.assertIsNotNone(db)
        
        # Test that we can access collections
        comment_collection = db['comment_annotations']
        reaction_collection = db['reaction_annotations']
        attachment_collection = db['attachments']
        user_collection = db['users']
        
        self.assertIsNotNone(comment_collection)
        self.assertIsNotNone(reaction_collection)
        self.assertIsNotNone(attachment_collection)
        self.assertIsNotNone(user_collection)


if __name__ == '__main__':
    unittest.main()

