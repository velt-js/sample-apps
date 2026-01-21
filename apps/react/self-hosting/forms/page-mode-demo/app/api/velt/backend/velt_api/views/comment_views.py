"""
Comment-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from velt_py import (
    GetCommentResolverRequest,
    SaveCommentResolverRequest,
    DeleteCommentResolverRequest
)
from ..velt_sdk import get_velt_sdk


def _get_comments_by_annotation_ids(annotation_ids: list) -> dict:
    """
    Directly query MongoDB for comments by annotation IDs.
    Used when organizationId is not provided but annotationIds are.
    """
    try:
        sdk = get_velt_sdk()
        db = sdk.db

        # Query the comment_annotations collection directly
        collection = db['comment_annotations']

        # Find all annotations matching the IDs
        cursor = collection.find({'annotationId': {'$in': annotation_ids}})

        result = {}
        for doc in cursor:
            annotation_id = doc.get('annotationId')
            if annotation_id:
                # Remove MongoDB's _id field for JSON serialization
                doc.pop('_id', None)
                result[annotation_id] = doc

        return {
            'data': result,
            'success': True,
            'statusCode': 200
        }
    except Exception as e:
        print(f'[Velt] Direct MongoDB query error: {e}')
        return {
            'data': {},
            'success': True,  # Return empty but successful to avoid client retries
            'statusCode': 200
        }


@csrf_exempt
@require_http_methods(["POST"])
def get_comments(request):
    """Get comments endpoint"""
    try:
        print(f'[Velt] get_comments raw body: {request.body}')
        print(f'[Velt] get_comments content-type: {request.content_type}')
        data = json.loads(request.body)
        print(f'[Velt] get_comments request: {data}')

        # Handle case where organizationId is empty but commentAnnotationIds are provided
        # This happens when the frontend SDK fetches specific annotations by ID
        organization_id = data.get('organizationId', '')
        annotation_ids = data.get('commentAnnotationIds', [])

        if not organization_id and annotation_ids:
            print(f'[Velt] Fetching comments by annotation IDs directly (no organizationId)')
            result = _get_comments_by_annotation_ids(annotation_ids)
            print(f'[Velt] get_comments result: {result}')
            return JsonResponse(result, status=result.get('statusCode', 200))

        try:
            comment_request = GetCommentResolverRequest.from_dict(data)
        except Exception as validation_error:
            print(f'[Velt] SDK validation error: {validation_error}')
            raise

        sdk = get_velt_sdk()
        result = sdk.selfHosting.comments.getComments(comment_request)
        print(f'[Velt] get_comments result: {result}')

        # SDK returns proper format with success, statusCode, error, errorCode
        return JsonResponse(result, status=result.get('statusCode', 200))
    except json.JSONDecodeError as e:
        print(f'[Velt] get_comments JSON error: {e}')
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'errorCode': 'INVALID_INPUT',
            'statusCode': 400
        }, status=400)
    except Exception as e:
        print(f'[Velt] get_comments error: {e}')
        return JsonResponse({
            'success': False,
            'error': str(e),
            'errorCode': 'INTERNAL_ERROR',
            'statusCode': 500
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def save_comments(request):
    """Save comments endpoint"""
    try:
        data = json.loads(request.body)
        save_request = SaveCommentResolverRequest.from_dict(data)

        sdk = get_velt_sdk()
        result = sdk.selfHosting.comments.saveComments(save_request)

        # SDK returns proper format with success, statusCode, error, errorCode
        return JsonResponse(result, status=result.get('statusCode', 200))
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'errorCode': 'INVALID_INPUT',
            'statusCode': 400
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'errorCode': 'INTERNAL_ERROR',
            'statusCode': 500
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def delete_comment(request):
    """Delete comment endpoint"""
    try:
        data = json.loads(request.body)
        delete_request = DeleteCommentResolverRequest.from_dict(data)

        sdk = get_velt_sdk()
        result = sdk.selfHosting.comments.deleteComment(delete_request)

        # SDK returns proper format with success, statusCode, error, errorCode
        return JsonResponse(result, status=result.get('statusCode', 200))
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'errorCode': 'INVALID_INPUT',
            'statusCode': 400
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'errorCode': 'INTERNAL_ERROR',
            'statusCode': 500
        }, status=500)
