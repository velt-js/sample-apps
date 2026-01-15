"""
Token-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from ..velt_sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def get_token(request):
    """Get Velt authentication token endpoint"""
    try:
        data = json.loads(request.body)
        organization_id = data.get('organizationId')
        user_id = data.get('userId')
        email = data.get('email')
        is_admin = data.get('isAdmin')
        
        if not organization_id or not user_id:
            return JsonResponse({
                'success': False,
                'error': 'organizationId and userId are required',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.token.getToken(
            organizationId=organization_id,
            userId=user_id,
            email=email,
            isAdmin=is_admin
        )
        
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'errorCode': 'INTERNAL_ERROR',
            'statusCode': 500
        }, status=500)
