"""
Recorder-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from velt_py import (
    GetRecorderResolverRequest,
    SaveRecorderResolverRequest,
    DeleteRecorderResolverRequest
)
from ..velt_sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def get_recorder_annotations(request):
    """Get recorder annotations endpoint"""
    try:
        data = json.loads(request.body)
        recorder_request = GetRecorderResolverRequest.from_dict(data)

        sdk = get_velt_sdk()
        result = sdk.selfHosting.recorders.getRecorderAnnotations(recorder_request)

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
def save_recorder_annotation(request):
    """Save recorder annotation endpoint"""
    try:
        data = json.loads(request.body)
        save_request = SaveRecorderResolverRequest.from_dict(data)

        sdk = get_velt_sdk()
        result = sdk.selfHosting.recorders.saveRecorderAnnotation(save_request)

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
def delete_recorder_annotation(request):
    """Delete recorder annotation endpoint"""
    try:
        data = json.loads(request.body)
        delete_request = DeleteRecorderResolverRequest.from_dict(data)

        sdk = get_velt_sdk()
        result = sdk.selfHosting.recorders.deleteRecorderAnnotation(delete_request)

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
