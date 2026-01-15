"""
Attachment-related API views
"""
import json
import base64
import re
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from ..mongodb_client import (
    save_attachment as db_save_attachment,
    get_attachment as db_get_attachment,
    delete_attachment as db_delete_attachment,
)


def sanitize_filename(filename: str) -> str:
    """Sanitize filename to prevent header injection."""
    if not filename:
        return 'attachment'
    # Remove control characters and problematic characters
    sanitized = re.sub(r'[\x00-\x1f\x7f]', '', filename)
    sanitized = re.sub(r'[\\"/]', '_', sanitized)
    return sanitized.strip() or 'attachment'


@csrf_exempt
@require_http_methods(["POST"])
def save_attachment(request):
    """Save attachment endpoint - stores in MongoDB and returns URL for retrieval."""
    try:
        data = json.loads(request.body)
        attachment = data.get('attachment')
        metadata = data.get('metadata', {})

        if not attachment:
            return JsonResponse({
                'success': False,
                'error': 'No attachment provided',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        if attachment.get('attachmentId') is None:
            return JsonResponse({
                'success': False,
                'error': 'No attachment ID provided',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Save attachment to MongoDB and get URL
        result = db_save_attachment(attachment, metadata)

        return JsonResponse({
            'success': True,
            'result': result,  # Contains { url: '/api/velt/attachments/get/{id}' }
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
@require_http_methods(["GET"])
def get_attachment(request, attachment_id):
    """Get attachment endpoint - serves the file binary data."""
    try:
        # Parse attachment ID
        try:
            attachment_id_num = int(attachment_id)
        except (ValueError, TypeError):
            return JsonResponse({
                'success': False,
                'error': 'Invalid attachment ID',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        # Get attachment from MongoDB
        attachment = db_get_attachment(attachment_id_num)

        if not attachment:
            return JsonResponse({
                'success': False,
                'error': 'Attachment not found',
                'errorCode': 'NOT_FOUND',
                'statusCode': 404
            }, status=404)

        # Check if we have base64Data
        base64_data = attachment.get('base64Data')
        if not base64_data:
            return JsonResponse({
                'success': False,
                'error': 'No file data available',
                'errorCode': 'NOT_FOUND',
                'statusCode': 404
            }, status=404)

        # Handle data URL format (e.g., "data:application/pdf;base64,...")
        if ',' in base64_data:
            base64_content = base64_data.split(',')[1]
        else:
            base64_content = base64_data

        # Convert base64 to binary
        binary_data = base64.b64decode(base64_content)

        # Sanitize filename
        safe_filename = sanitize_filename(attachment.get('name'))

        # Return binary response with appropriate headers
        response = HttpResponse(
            binary_data,
            content_type=attachment.get('mimeType', 'application/octet-stream')
        )
        response['Content-Disposition'] = f'inline; filename="{safe_filename}"'
        response['Content-Length'] = len(binary_data)
        response['Cache-Control'] = 'public, max-age=31536000'

        return response

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
        attachment_id = data.get('attachmentId')

        if attachment_id is None:
            return JsonResponse({
                'success': False,
                'error': 'No attachment ID provided',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        db_delete_attachment(int(attachment_id))

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
