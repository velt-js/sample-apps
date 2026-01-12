"""
Tests for ReactionService
"""
import unittest
from velt_integration.services.self_hosting.reaction_service import ReactionService
from velt_integration.tests.test_utils import get_mock_database
from velt_integration.exceptions import VeltValidationError


class ReactionServiceTest(unittest.TestCase):
    """Test cases for ReactionService"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.database = get_mock_database()
        self.service = ReactionService(self.database)
        self.organization_id = 'org-123'
    
    def test_getReactions_empty(self):
        """Test getting reactions when none exist"""
        result = self.service.getReactions(self.organization_id)
        self.assertTrue(result['success'])
        self.assertEqual(result['data'], {})
    
    def test_getReactions_with_organizationId(self):
        """Test getting reactions filtered by organizationId"""
        self.database['reaction_annotations'].insert_one({
            'annotationId': 'reaction-1',
            'organizationId': self.organization_id,
            'icon': '👍'
        })
        
        self.database['reaction_annotations'].insert_one({
            'annotationId': 'reaction-2',
            'organizationId': 'org-456',
            'icon': '👎'
        })
        
        result = self.service.getReactions(self.organization_id)
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 1)
        self.assertIn('reaction-1', result['data'])
    
    def test_getReactions_with_annotationIds(self):
        """Test getting reactions filtered by annotation IDs"""
        self.database['reaction_annotations'].insert_many([
            {'annotationId': 'reaction-1', 'organizationId': self.organization_id, 'icon': '👍'},
            {'annotationId': 'reaction-2', 'organizationId': self.organization_id, 'icon': '👎'},
            {'annotationId': 'reaction-3', 'organizationId': self.organization_id, 'icon': '❤️'}
        ])
        
        result = self.service.getReactions(
            self.organization_id,
            reactionAnnotationIds=['reaction-1', 'reaction-3']
        )
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 2)
    
    def test_getReactions_with_documentIds(self):
        """Test getting reactions filtered by document IDs"""
        self.database['reaction_annotations'].insert_many([
            {'annotationId': 'reaction-1', 'organizationId': self.organization_id, 'documentId': 'doc-1', 'icon': '👍'},
            {'annotationId': 'reaction-2', 'organizationId': self.organization_id, 'documentId': 'doc-2', 'icon': '👎'}
        ])
        
        result = self.service.getReactions(
            self.organization_id,
            documentIds=['doc-1']
        )
        self.assertTrue(result['success'])
        self.assertEqual(len(result['data']), 1)
    
    def test_saveReactions_single(self):
        """Test saving a single reaction annotation"""
        reaction_annotation = {
            'reaction-1': {
                'icon': '👍',
                'metadata': {}
            }
        }
        
        result = self.service.saveReactions(
            self.organization_id,
            reaction_annotation
        )
        self.assertTrue(result['success'])
        
        saved = self.database['reaction_annotations'].find_one({'annotationId': 'reaction-1'})
        self.assertIsNotNone(saved)
        self.assertEqual(saved['organizationId'], self.organization_id)
    
    def test_saveReactions_with_documentId(self):
        """Test saving reactions with document ID"""
        reaction_annotation = {
            'reaction-1': {
                'icon': '👍',
                'metadata': {}
            }
        }
        
        result = self.service.saveReactions(
            self.organization_id,
            reaction_annotation,
            documentId='doc-1'
        )
        self.assertTrue(result['success'])
        
        saved = self.database['reaction_annotations'].find_one({'annotationId': 'reaction-1'})
        self.assertEqual(saved['documentId'], 'doc-1')
    
    def test_deleteReaction_success(self):
        """Test deleting a reaction successfully"""
        self.database['reaction_annotations'].insert_one({
            'annotationId': 'reaction-1',
            'organizationId': self.organization_id,
            'icon': '👍'
        })
        
        result = self.service.deleteReaction(self.organization_id, 'reaction-1')
        self.assertTrue(result['success'])
        
        count = self.database['reaction_annotations'].count_documents({'annotationId': 'reaction-1'})
        self.assertEqual(count, 0)
    
    def test_deleteReaction_not_found(self):
        """Test deleting a non-existent reaction"""
        result = self.service.deleteReaction(self.organization_id, 'reaction-nonexistent')
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'NOT_FOUND')
    
    def test_deleteReaction_wrong_organization(self):
        """Test deleting a reaction from wrong organization"""
        self.database['reaction_annotations'].insert_one({
            'annotationId': 'reaction-1',
            'organizationId': 'org-456',
            'icon': '👍'
        })
        
        result = self.service.deleteReaction(self.organization_id, 'reaction-1')
        self.assertFalse(result['success'])


if __name__ == '__main__':
    unittest.main()

