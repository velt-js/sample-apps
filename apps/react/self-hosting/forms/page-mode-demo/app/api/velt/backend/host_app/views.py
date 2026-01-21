"""
Host App Views - Application-specific functionality
"""
import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from pymongo import MongoClient

# MongoDB client cache
_mongo_client = None

def get_mongo_client():
    """Get cached MongoDB client"""
    global _mongo_client
    if _mongo_client is None:
        connection_string = os.environ.get('VELT_MONGODB_CONNECTION_STRING')
        if not connection_string:
            raise ValueError('VELT_MONGODB_CONNECTION_STRING not configured')
        _mongo_client = MongoClient(connection_string)
    return _mongo_client


@csrf_exempt
@require_http_methods(["POST"])
def save_user(request):
    """
    Save user to MongoDB

    This is part of the HOST APP, not Velt implementation.
    Saves users to MongoDB when they log in or are created.

    Request body:
    {
        "user": {
            "userId": "string",
            "name": "string",
            "email": "string",
            "organizationId": "string",
            "photoUrl": "string"
        }
    }
    """
    try:
        data = json.loads(request.body)
        user = data.get('user')

        if not user or not user.get('userId'):
            return JsonResponse({
                'success': False,
                'error': 'userId is required',
                'statusCode': 400
            }, status=400)

        # Get MongoDB connection
        client = get_mongo_client()
        db_name = os.environ.get('VELT_MONGODB_DATABASE', 'velt_comments')
        db = client[db_name]
        collection = db['users']

        # Upsert user (update if exists, insert if not)
        collection.update_one(
            {'userId': user['userId']},
            {'$set': user},
            upsert=True
        )

        print(f"[Host App] User saved to MongoDB: {user['userId']}")

        return JsonResponse({
            'success': True,
            'statusCode': 200
        })

    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON',
            'statusCode': 400
        }, status=400)
    except Exception as e:
        print(f"[Host App] Error saving user: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': str(e),
            'statusCode': 500
        }, status=500)
