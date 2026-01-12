"""
Attachment service for managing file attachments
"""
from typing import Dict, Any
from pymongo.errors import PyMongoError

from .base_service import BaseService
from ...exceptions import VeltDatabaseError, VeltValidationError
from ...models import (
    SaveAttachmentResolverRequest,
    SaveAttachmentResolverData,
    DeleteAttachmentResolverRequest,
    ResolverResponse,
    ResolverAttachment
)


class AttachmentService(BaseService):
    """Service for managing file attachments"""
    
    def __init__(self, database, config=None):
        """
        Initialize attachment service
        
        Args:
            database: DatabaseAdapter instance
            config: Optional Config instance for API key access
        """
        super().__init__(database)
        self.collection_name = config.get_collection_name('attachments') if config else 'attachments'
        self.config = config
    
    def getAttachment(self, organizationId: str, attachmentId: int) -> Dict[str, Any]:
        """
        Get an attachment by ID
        
        Args:
            organizationId: Organization ID (required for data isolation)
            attachmentId: Attachment ID to retrieve
            
        Returns:
            Response dictionary with 'success' and 'data' keys
        """
        try:
            self._validate_organization_id(organizationId)
            
            if attachmentId is None:
                return self._error_response("attachmentId is required", "INVALID_INPUT")
            
            # Query with organizationId filter for data isolation
            # According to BaseMetadata, organizationId is stored in metadata
            attachment = self.database.find_one(
                self.collection_name,
                {
                    'attachmentId': attachmentId,
                    'metadata.organizationId': organizationId
                }
            )
            
            if not attachment:
                return self._error_response(
                    "Attachment not found or does not belong to organization",
                    "NOT_FOUND"
                )
            
            # Remove MongoDB _id field for cleaner response
            attachment.pop('_id', None)
            
            return self._success_response(data=attachment)
            
        except VeltValidationError:
            raise
        except PyMongoError as e:
            raise VeltDatabaseError(f"Database error while getting attachment: {str(e)}")
        except Exception as e:
            raise VeltDatabaseError(f"Unexpected error while getting attachment: {str(e)}")
    
    def saveAttachment(
        self,
        request: SaveAttachmentResolverRequest
    ) -> Dict[str, Any]:
        """
        Save an attachment based on SaveAttachmentResolverRequest
        
        Args:
            request: SaveAttachmentResolverRequest object containing attachment and metadata
            
        Returns:
            ResolverResponse format: { 'data': SaveAttachmentResolverData, 'success': bool, 'statusCode': int }
        """
        try:
            # Get organizationId from metadata
            organization_id = None
            if request.metadata:
                organization_id = request.metadata.organizationId
            
            if not organization_id:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'organizationId is required in metadata',
                    'errorCode': 'INVALID_INPUT'
                }
            
            self._validate_organization_id(organization_id)
            
            if not request.attachment:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'attachment is required',
                    'errorCode': 'INVALID_INPUT'
                }
            
            attachment_id = request.attachment.attachmentId
            if attachment_id is None:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'attachment.attachmentId is required',
                    'errorCode': 'INVALID_INPUT'
                }
            
            # Get API key from config if available
            api_key = None
            if self.config:
                api_key = self.config.get_api_key()
            
            # Extract metadata from request
            request_metadata = request.metadata
            document_id = request_metadata.documentId if request_metadata else None
            folder_id = request_metadata.folderId if request_metadata else None
            
            # Convert ResolverAttachment to dict for saving
            if isinstance(request.attachment, ResolverAttachment):
                attachment_data = request.attachment.to_dict()
            else:
                attachment_data = request.attachment.copy() if isinstance(request.attachment, dict) else {}
            
            # Initialize metadata if not present
            if 'metadata' not in attachment_data:
                attachment_data['metadata'] = {}
            
            # Set organizationId in metadata (from request metadata)
            attachment_data['metadata']['organizationId'] = organization_id
            
            # Set documentId in metadata (from request metadata or attachment metadata)
            if document_id:
                attachment_data['metadata']['documentId'] = document_id
            elif attachment_data.get('metadata', {}).get('documentId'):
                # Keep existing documentId from attachment
                pass
            
            # Set folderId in metadata if provided
            if folder_id:
                attachment_data['metadata']['folderId'] = folder_id
            elif attachment_data.get('metadata', {}).get('folderId'):
                # Keep existing folderId from attachment
                pass
            
            # Set apiKey in metadata if available from config
            if api_key:
                attachment_data['metadata']['apiKey'] = api_key
            elif request_metadata and request_metadata.apiKey:
                attachment_data['metadata']['apiKey'] = request_metadata.apiKey
            
            # Store the full attachment data including file data using adapter
            self.database.update_one(
                self.collection_name,
                {'attachmentId': attachment_id, 'metadata.organizationId': organization_id},
                {'$set': attachment_data},
                upsert=True
            )
            
            # Return URL format that customers can use in their Django routes
            url = f"/api/velt/attachments/get/{attachment_id}"
            
            # Return ResolverResponse format with SaveAttachmentResolverData
            save_data = SaveAttachmentResolverData(url=url)
            return ResolverResponse(data=save_data.to_dict(), success=True, statusCode=200).to_dict()
            
        except VeltValidationError:
            raise
        except PyMongoError as e:
            raise VeltDatabaseError(f"Database error while saving attachment: {str(e)}")
        except Exception as e:
            raise VeltDatabaseError(f"Unexpected error while saving attachment: {str(e)}")
    
    def deleteAttachment(self, request: DeleteAttachmentResolverRequest) -> Dict[str, Any]:
        """
        Delete an attachment based on DeleteAttachmentResolverRequest
        
        Args:
            request: DeleteAttachmentResolverRequest object containing attachmentId and metadata
            
        Returns:
            ResolverResponse format: { 'success': bool, 'statusCode': int } (no data field, undefined type)
        """
        try:
            if request.attachmentId is None:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'attachmentId is required',
                    'errorCode': 'INVALID_INPUT'
                }
            
            # Delete by attachmentId only
            query_filter: Dict[str, Any] = {
                'attachmentId': request.attachmentId
            }
            
            # Delete the attachment using adapter
            result = self.database.delete_one(self.collection_name, query_filter)
            
            # Check if document was deleted (adapter-specific check)
            deleted_count = getattr(result, 'deleted_count', 1 if result else 0)
            if deleted_count == 0:
                return {
                    'success': False,
                    'statusCode': 404,
                    'error': 'Attachment not found',
                    'errorCode': 'NOT_FOUND'
                }
            
            # Return ResolverResponse format without data field (just success and statusCode)
            # Return type is Promise<ResolverResponse<undefined>>, so no data field
            return {
                'success': True,
                'statusCode': 200
            }
            
        except PyMongoError as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Database error while deleting attachment: {str(e)}",
                'errorCode': 'DATABASE_ERROR'
            }
        except Exception as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Unexpected error while deleting attachment: {str(e)}",
                'errorCode': 'INTERNAL_ERROR'
            }

