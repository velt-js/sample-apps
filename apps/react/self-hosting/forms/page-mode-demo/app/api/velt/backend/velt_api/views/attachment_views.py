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
    """Save attachment endpoint - accepts multipart/form-data with file and request JSON"""
    try:
        # Extract file and request JSON from multipart form
        file = request.FILES.get('file')
        request_json_str = request.POST.get('request')
        
        if not file or not request_json_str:
            return JsonResponse({
                'success': False,
                'error': 'File and request JSON are required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        # Parse request JSON
        try:
            request_data = json.loads(request_json_str)
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'error': 'Invalid request JSON',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        # Create request object
        save_request = SaveAttachmentResolverRequest.from_dict(request_data)
        
        # Read file bytes
        file_bytes = file.read()
        
        # Call SDK with file data - SDK handles S3 upload internally
        sdk = get_velt_sdk()
        result = sdk.selfHosting.attachments.saveAttachment(
            save_request,
            file_data=file_bytes,
            file_name=file.name,
            mime_type=file.content_type
        )
        
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
    """Delete attachment endpoint - deletes from S3 and MongoDB via SDK"""
    try:
        data = json.loads(request.body)
        delete_request = DeleteAttachmentResolverRequest.from_dict(data)
        sdk = get_velt_sdk()
        # SDK's deleteAttachment() handles S3 deletion internally
        result = sdk.selfHosting.attachments.deleteAttachment(delete_request)
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
