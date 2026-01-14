"""
Attachment-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from velt_py import (
    SaveAttachmentResolverRequest,
    DeleteAttachmentResolverRequest
)
from ..velt_sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def save_attachment(request):
    """Save attachment endpoint"""
    try:
        data = json.loads(request.body)
        save_request = SaveAttachmentResolverRequest.from_dict(data)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.attachments.saveAttachment(save_request)
        
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
def delete_attachment(request):
    """Delete attachment endpoint"""
    try:
        data = json.loads(request.body)
        delete_request = DeleteAttachmentResolverRequest.from_dict(data)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.attachments.deleteAttachment(delete_request)
        
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
