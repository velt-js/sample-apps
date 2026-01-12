"""
User-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from ..velt_sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def get_users(request):
    """Get users endpoint"""
    try:
        data = json.loads(request.body)
        organization_id = data.get('organizationId')
        user_ids = data.get('userIds', [])
        
        if not organization_id:
            return JsonResponse({
                'success': False,
                'error': 'organizationId is required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.users.getUsers(
            organizationId=organization_id,
            userIds=user_ids
        )
        
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'errorCode': 'INTERNAL_ERROR',
            'statusCode': 500
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def save_user(request):
    """Save user endpoint"""
    try:
        data = json.loads(request.body)
        organization_id = data.get('organizationId')
        user = data.get('user')
        
        if not organization_id or not user:
            return JsonResponse({
                'success': False,
                'error': 'organizationId and user are required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.users.saveUser(
            organizationId=organization_id,
            user=user
        )
        
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'errorCode': 'INTERNAL_ERROR',
            'statusCode': 500
        }, status=500)
