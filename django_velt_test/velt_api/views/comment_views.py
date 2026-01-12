"""
Comment-related API views
"""
import json
import sys
from pathlib import Path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# Add parent directory to path to import velt_integration
parent_dir = Path(__file__).resolve().parent.parent.parent.parent
if str(parent_dir) not in sys.path:
    sys.path.insert(0, str(parent_dir))

from velt_integration import (
    GetCommentResolverRequest,
    SaveCommentResolverRequest,
    DeleteCommentResolverRequest
)
from ..velt_sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def get_comments(request):
    """Get comments endpoint"""
    try:
        data = json.loads(request.body)
        comment_request = GetCommentResolverRequest.from_dict(data)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.comments.getComments(comment_request)
        
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
