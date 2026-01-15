"""
Comment-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .. import mongodb_client


@csrf_exempt
@require_http_methods(["POST"])
def get_comments(request):
    """Get comments endpoint"""
    try:
        data = json.loads(request.body)

        # Validate required fields
        organization_id = data.get('organizationId')
        if not organization_id:
            return JsonResponse({
                'success': False,
                'error': 'organizationId is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Build filters
        filters = {
            'organizationId': organization_id,
            'commentAnnotationIds': data.get('commentAnnotationIds', []),
            'documentIds': data.get('documentIds', [])
        }

        # Get comments from MongoDB
        result = mongodb_client.get_comments(filters)

        return JsonResponse({
            'success': True,
            'result': result,
            'statusCode': 200
        }, status=200)
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
def save_comments(request):
    """Save comments endpoint"""
    try:
        data = json.loads(request.body)

        # Extract comment annotation and metadata
        comment_annotation = data.get('commentAnnotation', {})
        metadata = data.get('metadata', {})

        if not comment_annotation:
            return JsonResponse({
                'success': False,
                'error': 'commentAnnotation is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Save to MongoDB with proper structure
        mongodb_client.save_comments(comment_annotation, metadata)

        return JsonResponse({
            'success': True,
            'statusCode': 200
        }, status=200)
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

        # Frontend sends commentAnnotationId
        annotation_id = data.get('commentAnnotationId')
        if not annotation_id:
            return JsonResponse({
                'success': False,
                'error': 'commentAnnotationId is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Delete from MongoDB
        deleted = mongodb_client.delete_comment(annotation_id)

        return JsonResponse({
            'success': True,
            'statusCode': 200
        }, status=200)
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
