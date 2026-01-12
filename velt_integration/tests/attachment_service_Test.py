"""
Tests for AttachmentService
"""
import unittest
from velt_integration.services.self_hosting.attachment_service import AttachmentService
from velt_integration.tests.test_utils import get_mock_database
from velt_integration.exceptions import VeltValidationError


class AttachmentServiceTest(unittest.TestCase):
    """Test cases for AttachmentService"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.database = get_mock_database()
        self.service = AttachmentService(self.database)
        self.organization_id = 'org-123'
    
    def test_getAttachment_success(self):
        """Test getting an attachment successfully"""
        self.database['attachments'].insert_one({
            'attachmentId': 12345,
            'organizationId': self.organization_id,
            'name': 'test.pdf',
            'mimeType': 'application/pdf',
            'size': 1024,
            'base64Data': 'dGVzdA=='
        })
        
        result = self.service.getAttachment(self.organization_id, 12345)
        self.assertTrue(result['success'])
        self.assertEqual(result['data']['attachmentId'], 12345)
        self.assertEqual(result['data']['name'], 'test.pdf')
    
    def test_getAttachment_not_found(self):
        """Test getting a non-existent attachment"""
        result = self.service.getAttachment(self.organization_id, 99999)
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'NOT_FOUND')
    
    def test_getAttachment_wrong_organization(self):
        """Test getting an attachment from wrong organization"""
        self.database['attachments'].insert_one({
            'attachmentId': 12345,
            'organizationId': 'org-456',
            'name': 'test.pdf'
        })
        
        result = self.service.getAttachment(self.organization_id, 12345)
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'NOT_FOUND')
    
    def test_saveAttachment_success(self):
        """Test saving an attachment successfully"""
        attachment = {
            'attachmentId': 12345,
            'name': 'test.pdf',
            'mimeType': 'application/pdf',
            'size': 1024,
            'base64Data': 'dGVzdA=='
        }
        
        result = self.service.saveAttachment(
            self.organization_id,
            attachment
        )
        self.assertTrue(result['success'])
        self.assertIn('url', result['data'])
        self.assertIn('12345', result['data']['url'])
        
        # Verify saved
        saved = self.database['attachments'].find_one({'attachmentId': 12345})
        self.assertIsNotNone(saved)
        self.assertEqual(saved['organizationId'], self.organization_id)
    
    def test_saveAttachment_with_documentId(self):
        """Test saving an attachment with document ID"""
        attachment = {
            'attachmentId': 12345,
            'name': 'test.pdf',
            'mimeType': 'application/pdf'
        }
        
        result = self.service.saveAttachment(
            self.organization_id,
            attachment,
            documentId='doc-1'
        )
        self.assertTrue(result['success'])
        
        saved = self.database['attachments'].find_one({'attachmentId': 12345})
        self.assertEqual(saved['documentId'], 'doc-1')
    
    def test_saveAttachment_missing_attachmentId(self):
        """Test saving attachment without attachmentId"""
        attachment = {
            'name': 'test.pdf'
        }
        
        result = self.service.saveAttachment(self.organization_id, attachment)
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'INVALID_INPUT')
    
    def test_saveAttachment_upsert(self):
        """Test that saving updates existing attachment"""
        # Insert initial attachment
        self.database['attachments'].insert_one({
            'attachmentId': 12345,
            'organizationId': self.organization_id,
            'name': 'old.pdf'
        })
        
        # Update it
        attachment = {
            'attachmentId': 12345,
            'name': 'new.pdf',
            'mimeType': 'application/pdf'
        }
        
        result = self.service.saveAttachment(self.organization_id, attachment)
        self.assertTrue(result['success'])
        
        saved = self.database['attachments'].find_one({'attachmentId': 12345})
        self.assertEqual(saved['name'], 'new.pdf')
    
    def test_deleteAttachment_success(self):
        """Test deleting an attachment successfully"""
        self.database['attachments'].insert_one({
            'attachmentId': 12345,
            'organizationId': self.organization_id,
            'name': 'test.pdf'
        })
        
        result = self.service.deleteAttachment(self.organization_id, 12345)
        self.assertTrue(result['success'])
        
        count = self.database['attachments'].count_documents({'attachmentId': 12345})
        self.assertEqual(count, 0)
    
    def test_deleteAttachment_not_found(self):
        """Test deleting a non-existent attachment"""
        result = self.service.deleteAttachment(self.organization_id, 99999)
        self.assertFalse(result['success'])
        self.assertEqual(result['errorCode'], 'NOT_FOUND')
    
    def test_deleteAttachment_wrong_organization(self):
        """Test deleting an attachment from wrong organization"""
        self.database['attachments'].insert_one({
            'attachmentId': 12345,
            'organizationId': 'org-456',
            'name': 'test.pdf'
        })
        
        result = self.service.deleteAttachment(self.organization_id, 12345)
        self.assertFalse(result['success'])


if __name__ == '__main__':
    unittest.main()

