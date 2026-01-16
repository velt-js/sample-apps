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
from ..sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def save_attachment(request):
    """Save attachment endpoint - accepts multipart/form-data with file and request JSON"""
    try:
        # Check content type - only accept multipart/form-data
        content_type = request.content_type or ''
        
        if 'multipart/form-data' not in content_type:
            return JsonResponse({
                'success': False,
                'error': 'Content-Type must be multipart/form-data',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        # Extract file from request.FILES
        file = request.FILES.get('file')
        if not file:
            return JsonResponse({
                'success': False,
                'error': 'File is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        # Extract request JSON from request.POST
        request_json_str = request.POST.get('request')
        if not request_json_str:
            return JsonResponse({
                'success': False,
                'error': 'Request JSON is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        # Parse the request JSON structure
        try:
            request_data = json.loads(request_json_str)
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'error': 'Invalid request JSON',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        # Get SDK and config
        sdk = get_velt_sdk()
        config = sdk.config
        
        # Validate S3 is enabled
        if not config.is_s3_enabled():
            return JsonResponse({
                'success': False,
                'error': 'S3 configuration is required for attachments',
                'errorCode': 'CONFIGURATION_ERROR',
                'statusCode': 500
            }, status=500)
        
        # Read file bytes
        file_bytes = file.read()
        
        # Upload to S3
        from velt_py.services.storage.s3_service import S3Service
        aws_config = config.get_aws_config()
        s3_service = S3Service(aws_config)
        
        # Get API key from config for folder structure
        api_key = config.get_api_key()
        
        # Get file name and mime type from request or file
        attachment_data = request_data.get('attachment', {})
        file_name = attachment_data.get('name') or file.name
        mime_type = attachment_data.get('mimeType') or file.content_type
        
        # Upload to S3
        s3_url = s3_service.upload_file(
            file_data=file_bytes,
            file_name=file_name,
            mime_type=mime_type,
            api_key=api_key,
            folder_prefix='attachments'
        )
        
        # Inject S3 URL into request structure
        if 'attachment' not in request_data:
            request_data['attachment'] = {}
        request_data['attachment']['file'] = s3_url
        
        # Ensure attachment has required fields from file
        if not request_data['attachment'].get('name'):
            request_data['attachment']['name'] = file.name
        if not request_data['attachment'].get('mimeType'):
            request_data['attachment']['mimeType'] = file.content_type
        
        # Create SaveAttachmentResolverRequest from the structure
        save_request = SaveAttachmentResolverRequest.from_dict(request_data)
        
        # Call SDK
        result = sdk.selfHosting.attachments.saveAttachment(save_request)
        
        return JsonResponse(result, status=result.get('statusCode', 200))
        
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
