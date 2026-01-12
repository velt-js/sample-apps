"""
Tests for CommentService
"""
import unittest
from velt_integration.services.self_hosting.comment_service import CommentService
from velt_integration.tests.test_utils import get_mock_database
from velt_integration.exceptions import VeltValidationError, VeltDatabaseError
from velt_integration.models import GetCommentResolverRequest, DeleteCommentResolverRequest


class CommentServiceTest(unittest.TestCase):
    """Test cases for CommentService"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.database = get_mock_database()
        self.service = CommentService(self.database)
        self.organization_id = 'org-123'
    
    def test_getComments_empty(self):
        """Test getting comments when none exist"""
        request = GetCommentResolverRequest(organizationId=self.organization_id)
        result = self.service.getComments(request)
        self.assertTrue(result['success'])
        self.assertEqual(result['data'], {})
    
    def test_getComments_with_organizationId(self):
        """Test getting comments filtered by organizationId"""
        # Insert test data with metadata structure
        self.database['comment_annotations'].insert_one({
            'annotationId': 'ann-1',
            'metadata': {
                'organizationId': self.organization_id,
                'documentId': 'doc-1'
            },
            'comments': {}
        })
        
        # Insert data for different organization (should not be returned)
        self.database['comment_annotations'].insert_one({
            'annotationId': 'ann-2',
            'metadata': {
                'organizationId': 'org-456',
                'documentId': 'doc-1'
            },
            'comments': {}
        })
        
        request = GetCommentResolverRequest(organizationId=self.organization_id)
        result = self.service.getComments(request)
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 1)
        self.assertIn('ann-1', result['data'])
        self.assertNotIn('ann-2', result['data'])
    
    def test_getComments_with_annotationIds(self):
        """Test getting comments filtered by annotation IDs"""
        self.database['comment_annotations'].insert_many([
            {
                'annotationId': 'ann-1',
                'metadata': {'organizationId': self.organization_id},
                'comments': {}
            },
            {
                'annotationId': 'ann-2',
                'metadata': {'organizationId': self.organization_id},
                'comments': {}
            },
            {
                'annotationId': 'ann-3',
                'metadata': {'organizationId': self.organization_id},
                'comments': {}
            }
        ])
        
        request = GetCommentResolverRequest(
            organizationId=self.organization_id,
            commentAnnotationIds=['ann-1', 'ann-3']
        )
        result = self.service.getComments(request)
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 2)
        self.assertIn('ann-1', result['data'])
        self.assertIn('ann-3', result['data'])
        self.assertNotIn('ann-2', result['data'])
    
    def test_getComments_with_documentIds(self):
        """Test getting comments filtered by document IDs"""
        self.database['comment_annotations'].insert_many([
            {
                'annotationId': 'ann-1',
                'metadata': {
                    'organizationId': self.organization_id,
                    'documentId': 'doc-1'
                },
                'comments': {}
            },
            {
                'annotationId': 'ann-2',
                'metadata': {
                    'organizationId': self.organization_id,
                    'documentId': 'doc-2'
                },
                'comments': {}
            }
        ])
        
        request = GetCommentResolverRequest(
            organizationId=self.organization_id,
            documentIds=['doc-1']
        )
        result = self.service.getComments(request)
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 1)
        self.assertIn('ann-1', result['data'])
    
    def test_getComments_with_folderId_and_allDocuments(self):
        """Test getting comments filtered by folderId when allDocuments is True"""
        self.database['comment_annotations'].insert_many([
            {
                'annotationId': 'ann-1',
                'metadata': {
                    'organizationId': self.organization_id,
                    'folderId': 'folder-1'
                },
                'comments': {}
            },
            {
                'annotationId': 'ann-2',
                'metadata': {
                    'organizationId': self.organization_id,
                    'folderId': 'folder-2'
                },
                'comments': {}
            }
        ])
        
        request = GetCommentResolverRequest(
            organizationId=self.organization_id,
            folderId='folder-1',
            allDocuments=True
        )
        result = self.service.getComments(request)
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 1)
        self.assertIn('ann-1', result['data'])
        self.assertNotIn('ann-2', result['data'])
    
    def test_getComments_with_apiKey(self):
        """Test getting comments filtered by apiKey when config is provided"""
        from velt_integration.config import Config
        
        # Create service with config that has apiKey
        config = Config({
            'database': {
                'host': 'localhost',
                'username': 'test',
                'password': 'test',
                'auth_database': 'admin',
                'database_name': 'test'
            },
            'apiKey': 'test-api-key'
        })
        service_with_config = CommentService(self.database, config)
        
        # Insert test data with apiKey in metadata
        self.database['comment_annotations'].insert_many([
            {
                'annotationId': 'ann-1',
                'metadata': {
                    'organizationId': self.organization_id,
                    'apiKey': 'test-api-key'
                },
                'comments': {}
            },
            {
                'annotationId': 'ann-2',
                'metadata': {
                    'organizationId': self.organization_id,
                    'apiKey': 'other-api-key'
                },
                'comments': {}
            }
        ])
        
        request = GetCommentResolverRequest(organizationId=self.organization_id)
        result = service_with_config.getComments(request)
        self.assertTrue(result['success'])
        # Should only return ann-1 with matching apiKey
        self.assertEqual(len(result['data']), 1)
        self.assertIn('ann-1', result['data'])
        self.assertNotIn('ann-2', result['data'])
    
    def test_getComments_invalid_organizationId(self):
        """Test getting comments with invalid organizationId"""
        request = GetCommentResolverRequest(organizationId='')
        with self.assertRaises(VeltValidationError):
            self.service.getComments(request)
    
    def test_saveComments_single(self):
        """Test saving a single comment annotation"""
        comment_annotation = {
            'ann-1': {
                'comments': {'comment-1': {'commentId': 'comment-1', 'commentText': 'Hello'}},
                'metadata': {}
            }
        }
        
        result = self.service.saveComments(
            self.organization_id,
            comment_annotation
        )
        self.assertTrue(result['success'])
        
        # Verify saved
        saved = self.database['comment_annotations'].find_one({'annotationId': 'ann-1'})
        self.assertIsNotNone(saved)
        self.assertEqual(saved['metadata']['organizationId'], self.organization_id)
    
    def test_saveComments_multiple(self):
        """Test saving multiple comment annotations"""
        comment_annotation = {
            'ann-1': {
                'comments': {},
                'metadata': {}
            },
            'ann-2': {
                'comments': {},
                'metadata': {}
            }
        }
        
        result = self.service.saveComments(
            self.organization_id,
            comment_annotation
        )
        self.assertTrue(result['success'])
        
        # Verify both saved
        count = self.database['comment_annotations'].count_documents({
            'metadata.organizationId': self.organization_id
        })
        self.assertEqual(count, 2)
    
    def test_saveComments_with_documentId(self):
        """Test saving comments with document ID"""
        comment_annotation = {
            'ann-1': {
                'comments': {},
                'metadata': {}
            }
        }
        
        result = self.service.saveComments(
            self.organization_id,
            comment_annotation,
            documentId='doc-1'
        )
        self.assertTrue(result['success'])
        
        saved = self.database['comment_annotations'].find_one({'annotationId': 'ann-1'})
        self.assertEqual(saved['metadata']['documentId'], 'doc-1')
    
    def test_saveComments_invalid_input(self):
        """Test saving comments with invalid input"""
        result = self.service.saveComments(self.organization_id, {})
        self.assertFalse(result['success'])
        self.assertIn('error', result)
        
        result = self.service.saveComments(self.organization_id, None)
        self.assertFalse(result['success'])
    
    def test_deleteComment_success(self):
        """Test deleting a comment successfully"""
        self.database['comment_annotations'].insert_one({
            'annotationId': 'ann-1',
            'metadata': {'organizationId': self.organization_id},
            'comments': {}
        })
        
        delete_request = DeleteCommentResolverRequest(
            organizationId=self.organization_id,
            commentAnnotationId='ann-1'
        )
        result = self.service.deleteComment(delete_request)
        self.assertTrue(result['success'])
        self.assertEqual(result['statusCode'], 200)
        
        # Verify deleted
        count = self.database['comment_annotations'].count_documents({'annotationId': 'ann-1'})
        self.assertEqual(count, 0)
    
    def test_deleteComment_not_found(self):
        """Test deleting a non-existent comment"""
        delete_request = DeleteCommentResolverRequest(
            organizationId=self.organization_id,
            commentAnnotationId='ann-nonexistent'
        )
        result = self.service.deleteComment(delete_request)
        self.assertFalse(result['success'])
        self.assertEqual(result['statusCode'], 404)
        self.assertEqual(result['errorCode'], 'NOT_FOUND')
    
    def test_deleteComment_wrong_organization(self):
        """Test deleting a comment from wrong organization"""
        self.database['comment_annotations'].insert_one({
            'annotationId': 'ann-1',
            'metadata': {'organizationId': 'org-456'},
            'comments': {}
        })
        
        delete_request = DeleteCommentResolverRequest(
            organizationId=self.organization_id,
            commentAnnotationId='ann-1'
        )
        result = self.service.deleteComment(delete_request)
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'NOT_FOUND')
    
    def test_deleteComment_invalid_organizationId(self):
        """Test deleting comment with invalid organizationId"""
        delete_request = DeleteCommentResolverRequest(
            organizationId='',
            commentAnnotationId='ann-1'
        )
        with self.assertRaises(VeltValidationError):
            self.service.deleteComment(delete_request)
    
    def test_deleteComment_with_apiKey(self):
        """Test deleting a comment with API key filtering"""
        self.database['comment_annotations'].insert_one({
            'annotationId': 'ann-1',
            'metadata': {
                'organizationId': self.organization_id,
                'apiKey': 'test-api-key'
            },
            'comments': {}
        })
        
        delete_request = DeleteCommentResolverRequest(
            organizationId=self.organization_id,
            commentAnnotationId='ann-1',
            metadata={'apiKey': 'test-api-key'}
        )
        result = self.service.deleteComment(delete_request)
        self.assertTrue(result['success'])
        self.assertEqual(result['statusCode'], 200)


if __name__ == '__main__':
    unittest.main()

