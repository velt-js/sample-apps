"""
Reaction-related API views
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from velt_py import (
    GetReactionResolverRequest,
    SaveReactionResolverRequest,
    DeleteReactionResolverRequest
)
from ..velt_sdk import get_velt_sdk


@csrf_exempt
@require_http_methods(["POST"])
def get_reactions(request):
    """Get reactions endpoint"""
    try:
        data = json.loads(request.body)
        reaction_request = GetReactionResolverRequest.from_dict(data)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.reactions.getReactions(reaction_request)
        
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
def save_reactions(request):
    """Save reactions endpoint"""
    try:
        data = json.loads(request.body)
        save_request = SaveReactionResolverRequest.from_dict(data)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.reactions.saveReactions(save_request)
        
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
def delete_reaction(request):
    """Delete reaction endpoint"""
    try:
        data = json.loads(request.body)
        delete_request = DeleteReactionResolverRequest.from_dict(data)
        
        sdk = get_velt_sdk()
        result = sdk.selfHosting.reactions.deleteReaction(delete_request)
        
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
