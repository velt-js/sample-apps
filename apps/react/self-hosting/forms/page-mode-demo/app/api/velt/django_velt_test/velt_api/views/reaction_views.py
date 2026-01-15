"""
Reaction-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .. import mongodb_client


@csrf_exempt
@require_http_methods(["POST"])
def get_reactions(request):
    """Get reactions endpoint"""
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
            'reactionAnnotationIds': data.get('reactionAnnotationIds', []),
            'documentIds': data.get('documentIds', [])
        }

        # Get reactions from MongoDB
        result = mongodb_client.get_reactions(filters)

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
def save_reactions(request):
    """Save reactions endpoint"""
    try:
        data = json.loads(request.body)

        # Extract reaction annotation and metadata
        reaction_annotation = data.get('reactionAnnotation', {})
        metadata = data.get('metadata', {})

        if not reaction_annotation:
            return JsonResponse({
                'success': False,
                'error': 'reactionAnnotation is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Save to MongoDB with proper structure
        mongodb_client.save_reactions(reaction_annotation, metadata)

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
def delete_reaction(request):
    """Delete reaction endpoint"""
    try:
        data = json.loads(request.body)

        # Frontend sends reactionAnnotationId
        annotation_id = data.get('reactionAnnotationId')
        if not annotation_id:
            return JsonResponse({
                'success': False,
                'error': 'reactionAnnotationId is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Delete from MongoDB
        deleted = mongodb_client.delete_reaction(annotation_id)

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
