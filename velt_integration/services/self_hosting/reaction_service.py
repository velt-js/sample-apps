"""
Reaction service for managing reaction annotations
"""
from typing import Dict, Any, Optional
from pymongo.errors import PyMongoError

from .base_service import BaseService
from ...exceptions import VeltDatabaseError, VeltValidationError
from ...models import (
    GetReactionResolverRequest,
    SaveReactionResolverRequest,
    DeleteReactionResolverRequest,
    ResolverResponse,
    PartialReactionAnnotation
)
from ...config import Config


class ReactionService(BaseService):
    """Service for managing reaction annotations"""
    
    def __init__(self, database, config: Optional[Config] = None):
        """
        Initialize reaction service
        
        Args:
            database: DatabaseAdapter instance
            config: Optional Config instance for accessing API key
        """
        super().__init__(database)
        self.collection_name = config.get_collection_name('reactions') if config else 'reaction_annotations'
        self.config = config
    
    def getReactions(
        self,
        request: GetReactionResolverRequest
    ) -> Dict[str, Any]:
        """
        Get reactions based on GetReactionResolverRequest
        
        Query logic:
        1. If organizationId + documentIds: filter by metadata.organizationId, metadata.documentId in documentIds, metadata.apiKey
        2. If organizationId + reactionAnnotationIds: filter by metadata.organizationId, annotationId in reactionAnnotationIds, metadata.apiKey
        3. If organizationId + folderId + allDocuments=True: filter by metadata.organizationId, metadata.folderId, metadata.apiKey
        
        Args:
            request: GetReactionResolverRequest object containing query parameters
            
        Returns:
            Response dictionary with 'data', 'success', and 'statusCode' keys
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
            
            # Query scenario 2: organizationId + reactionAnnotationIds
            elif request.reactionAnnotationIds:
                query['annotationId'] = {'$in': request.reactionAnnotationIds}
            
            # Query scenario 3: organizationId + folderId + allDocuments=True
            elif request.folderId and request.allDocuments is True:
                query['metadata.folderId'] = request.folderId
            
            # Execute query using adapter
            annotations = self.database.find(self.collection_name, query)
            
            # Convert to Record<string, PartialReactionAnnotation> format expected by Velt
            result: Dict[str, Dict[str, Any]] = {}
            for annotation in annotations:
                # Convert ObjectId to string if present
                annotation_id = annotation.get('annotationId')
                if annotation_id:
                    # Remove MongoDB _id field for cleaner response
                    annotation.pop('_id', None)
                    # Convert to PartialReactionAnnotation and then to dict
                    partial_annotation = PartialReactionAnnotation.from_dict(annotation)
                    result[annotation_id] = partial_annotation.to_dict()
            
            # Return ResolverResponse format: { data: Record<string, PartialReactionAnnotation>, success: bool, statusCode: int }
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
                'error': f"Database error while getting reactions: {str(e)}",
                'errorCode': 'DATABASE_ERROR'
            }
        except Exception as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Unexpected error while getting reactions: {str(e)}",
                'errorCode': 'INTERNAL_ERROR'
            }
    
    def saveReactions(
        self,
        request: SaveReactionResolverRequest
    ) -> Dict[str, Any]:
        """
        Save reaction annotations based on SaveReactionResolverRequest
        
        Args:
            request: SaveReactionResolverRequest object containing reactionAnnotation and metadata
            
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
            
            if not request.reactionAnnotation or not isinstance(request.reactionAnnotation, dict):
                # Return error response in ResolverResponse format
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'reactionAnnotation must be a non-empty dictionary',
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
            for annotation_id, annotation in request.reactionAnnotation.items():
                if not annotation_id:
                    continue
                
                # Convert PartialReactionAnnotation to dict for saving
                if isinstance(annotation, PartialReactionAnnotation):
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
            raise VeltDatabaseError(f"Database error while saving reactions: {str(e)}")
        except Exception as e:
            raise VeltDatabaseError(f"Unexpected error while saving reactions: {str(e)}")
    
    def deleteReaction(self, request: DeleteReactionResolverRequest) -> Dict[str, Any]:
        """
        Delete a reaction annotation based on DeleteReactionResolverRequest
        
        Args:
            request: DeleteReactionResolverRequest object containing reactionAnnotationId
            
        Returns:
            ResolverResponse format: { 'success': bool, 'statusCode': int } (no data field)
        """
        try:
            if not request.reactionAnnotationId:
                return {
                    'success': False,
                    'statusCode': 400,
                    'error': 'reactionAnnotationId is required',
                    'errorCode': 'INVALID_INPUT'
                }
            
            # Delete by annotationId only
            query_filter: Dict[str, Any] = {
                'annotationId': request.reactionAnnotationId
            }
            
            # Delete the reaction annotation using adapter
            result = self.database.delete_one(self.collection_name, query_filter)
            
            # Check if document was deleted (adapter-specific check)
            deleted_count = getattr(result, 'deleted_count', 1 if result else 0)
            if deleted_count == 0:
                return {
                    'success': False,
                    'statusCode': 404,
                    'error': 'Reaction annotation not found',
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
                'error': f"Database error while deleting reaction: {str(e)}",
                'errorCode': 'DATABASE_ERROR'
            }
        except Exception as e:
            return {
                'success': False,
                'statusCode': 500,
                'error': f"Unexpected error while deleting reaction: {str(e)}",
                'errorCode': 'INTERNAL_ERROR'
            }

