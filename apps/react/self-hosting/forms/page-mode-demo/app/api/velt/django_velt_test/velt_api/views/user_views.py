"""
User-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from ..mongodb_client import save_user as db_save_user, get_users as db_get_users


@csrf_exempt
@require_http_methods(["POST"])
def get_users(request):
    """Get users endpoint - retrieves users from MongoDB."""
    try:
        data = json.loads(request.body)
        user_ids = data.get('userIds', [])
        users = db_get_users(user_ids)

        return JsonResponse({
            'success': True,
            'result': users,
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
def save_user(request):
    """Save user endpoint - stores user in MongoDB for self-hosting."""
    try:
        data = json.loads(request.body)
        user = data.get('user')

        if not user:
            return JsonResponse({
                'success': False,
                'error': 'No user provided',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        if not user.get('userId'):
            return JsonResponse({
                'success': False,
                'error': 'User must have a userId',
                'errorCode': 'INVALID_INPUT',
                'statusCode': 400
            }, status=400)

        db_save_user(user)

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
