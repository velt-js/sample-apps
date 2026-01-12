"""
Comment service for managing comment annotations
"""
from typing import Dict, Any, Optional
from pymongo.errors import PyMongoError

from .base_service import BaseService
from ...exceptions import VeltDatabaseError, VeltValidationError
from ...models import (
    GetCommentResolverRequest,
    SaveCommentResolverRequest,
    DeleteCommentResolverRequest,
    ResolverResponse,
    PartialCommentAnnotation
)
from ...config import Config


class CommentService(BaseService):
    """Service for managing comment annotations"""
    
    def __init__(self, database, config: Optional[Config] = None):
        """
        Initialize comment service
        
        Args:
            database: DatabaseAdapter instance
            config: Optional Config instance for accessing API key
        """
        super().__init__(database)
        self.collection_name = config.get_collection_name('comments') if config else 'comment_annotations'
        self.config = config
    
    def getComments(
        self,
        request: GetCommentResolverRequest
    ) -> Dict[str, Any]:
        """
        Get comments based on GetCommentResolverRequest
        
        Query logic:
        1. If organizationId + documentIds: filter by metadata.organizationId, metadata.documentId in documentIds, metadata.apiKey
        2. If organizationId + commentAnnotationIds: filter by metadata.organizationId, annotationId in commentAnnotationIds, metadata.apiKey
        3. If organizationId + folderId + allDocuments=True: filter by metadata.organizationId, metadata.folderId, metadata.apiKey
        
        Args:
            request: GetCommentResolverRequest object containing query parameters
            
        Returns:
            Response dictionary with 'success' and 'data' keys
        """
        try:
            if not request.organizationId:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'organizationId is required',
                    'errorCode': 'INVALID_INPUT'
                }
            
            self._validate_organization_id(request.organizationId)
            
            # Get API key from config if available
            api_key = None
            if self.config:
                api_key = self.config.get_api_key()
            
            # Build base query with organizationId and apiKey from metadata
            # According to BaseMetadata, organizationId and apiKey are stored in metadata
            query: Dict[str, Any] = {'metadata.organizationId': request.organizationId}
            
            # Add apiKey filter if available
            if api_key:
                query['metadata.apiKey'] = api_key
            
            # Query scenario 1: organizationId + documentIds
            if request.documentIds:
                query['metadata.documentId'] = {'$in': request.documentIds}
            
            # Query scenario 2: organizationId + commentAnnotationIds
            elif request.commentAnnotationIds:
                query['annotationId'] = {'$in': request.commentAnnotationIds}
            
            # Query scenario 3: organizationId + folderId + allDocuments=True
            elif request.folderId and request.allDocuments is True:
                query['metadata.folderId'] = request.folderId
            
            # Execute query using adapter
            annotations = self.database.find(self.collection_name, query)
            
            # Convert to Record<string, PartialCommentAnnotation> format expected by Velt
            result: Dict[str, Dict[str, Any]] = {}
            for annotation in annotations:
                # Convert ObjectId to string if present
                annotation_id = annotation.get('annotationId')
                if annotation_id:
                    # Remove MongoDB _id field for cleaner response
                    annotation.pop('_id', None)
                    # Convert to PartialCommentAnnotation and then to dict
                    partial_annotation = PartialCommentAnnotation.from_dict(annotation)
                    result[annotation_id] = partial_annotation.to_dict()
            
            # Return ResolverResponse format: { data: Record<string, PartialCommentAnnotation>, success: bool, statusCode: int }
            return ResolverResponse(data=result, success=True, statusCode=200).to_dict()
            
        except VeltValidationError as e:
            return {
                'success': False,
                'statusCode': 400,
                'error': str(e),
                'errorCode': 'VALIDATION_ERROR'
            }
        except PyMongoError as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Database error while getting comments: {str(e)}",
                'errorCode': 'DATABASE_ERROR'
            }
        except Exception as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Unexpected error while getting comments: {str(e)}",
                'errorCode': 'INTERNAL_ERROR'
            }
    
    def saveComments(
        self,
        request: SaveCommentResolverRequest
    ) -> Dict[str, Any]:
        """
        Save comment annotations based on SaveCommentResolverRequest
        
        Args:
            request: SaveCommentResolverRequest object containing commentAnnotation and metadata
            
        Returns:
            ResolverResponse format: { 'success': bool, 'statusCode': int } (no data field)
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
            
            if not request.commentAnnotation or not isinstance(request.commentAnnotation, dict):
                # Return error response in ResolverResponse format
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'commentAnnotation must be a non-empty dictionary',
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
            
            # Prepare bulk write operations
            operations = []
            for annotation_id, annotation in request.commentAnnotation.items():
                if not annotation_id:
                    continue
                
                # Convert PartialCommentAnnotation to dict for saving
                if isinstance(annotation, PartialCommentAnnotation):
                    annotation_data = annotation.to_dict()
                else:
                    annotation_data = annotation.copy() if isinstance(annotation, dict) else {}
                
                annotation_data['annotationId'] = annotation_id
                
                # Initialize metadata if not present
                if 'metadata' not in annotation_data:
                    annotation_data['metadata'] = {}
                
                # Set organizationId in metadata (from request metadata)
                annotation_data['metadata']['organizationId'] = organization_id
                
                # Set documentId in metadata (from request metadata or annotation metadata)
                if document_id:
                    annotation_data['metadata']['documentId'] = document_id
                elif annotation_data.get('metadata', {}).get('documentId'):
                    # Keep existing documentId from annotation
                    pass
                
                # Set folderId in metadata if provided
                if folder_id:
                    annotation_data['metadata']['folderId'] = folder_id
                elif annotation_data.get('metadata', {}).get('folderId'):
                    # Keep existing folderId from annotation
                    pass
                
                # Set apiKey in metadata if available from config
                if api_key:
                    annotation_data['metadata']['apiKey'] = api_key
                elif request_metadata and request_metadata.apiKey:
                    annotation_data['metadata']['apiKey'] = request_metadata.apiKey
                
                # Use adapter to update (upsert) each annotation
                filter_query = {'annotationId': annotation_id, 'metadata.organizationId': organization_id}
                update_query = {'$set': annotation_data}
                self.database.update_one(
                    self.collection_name,
                    filter_query,
                    update_query,
                    upsert=True
                )
            
            # Return ResolverResponse format without data field (just success and statusCode)
            return {
                'success': True,
                'statusCode': 200
            }
            
        except VeltValidationError:
            raise
        except PyMongoError as e:
            raise VeltDatabaseError(f"Database error while saving comments: {str(e)}")
        except Exception as e:
            raise VeltDatabaseError(f"Unexpected error while saving comments: {str(e)}")
    
    def deleteComment(self, request: DeleteCommentResolverRequest) -> Dict[str, Any]:
        """
        Delete a comment annotation based on DeleteCommentResolverRequest
        
        Args:
            request: DeleteCommentResolverRequest object containing commentAnnotationId and metadata
            
        Returns:
            ResolverResponse format: { 'success': bool, 'statusCode': int } (no data field)
        """
        try:
            if not request.commentAnnotationId:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'commentAnnotationId is required',
                    'errorCode': 'INVALID_INPUT'
                }
            
            # Delete by annotationId only
            query_filter: Dict[str, Any] = {
                'annotationId': request.commentAnnotationId
            }
            
            # Delete the comment annotation using adapter
            result = self.database.delete_one(self.collection_name, query_filter)
            
            # Check if document was deleted (adapter-specific check)
            # For MongoDB adapter, result has deleted_count attribute
            deleted_count = getattr(result, 'deleted_count', 1 if result else 0)
            if deleted_count == 0:
                return {
                    'success': False,
                    'statusCode': 404,
                    'error': 'Comment annotation not found',
                    'errorCode': 'NOT_FOUND'
                }
            
            # Return ResolverResponse format without data field (just success and statusCode)
            return {
                'success': True,
                'statusCode': 200
            }
            
        except PyMongoError as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Database error while deleting comment: {str(e)}",
                'errorCode': 'DATABASE_ERROR'
            }
        except Exception as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Unexpected error while deleting comment: {str(e)}",
                'errorCode': 'INTERNAL_ERROR'
            }

