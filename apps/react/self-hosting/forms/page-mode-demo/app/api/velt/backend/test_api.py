#!/usr/bin/env python
"""
Simple test script for Velt API endpoints
"""
import requests
import json

BASE_URL = 'http://localhost:8000/api/velt'

def test_get_comments():
    """Test getting comments"""
    print("\n=== Testing GET Comments ===")
    response = requests.post(f'{BASE_URL}/comments/get', json={
        'organizationId': 'org-123',
        'documentIds': ['doc-1']
    })
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_save_comment():
    """Test saving a comment"""
    print("\n=== Testing SAVE Comment ===")
    response = requests.post(f'{BASE_URL}/comments/save', json={
        'organizationId': 'org-123',
        'commentAnnotation': {
            'ann-1': {
                'comments': {
                    'comment-1': {
                        'commentId': 'comment-1',
                        'commentText': 'Hello from test script!',
                        'commentHtml': '<p>Hello from test script!</p>'
                    }
                },
                'metadata': {
                    'documentId': 'doc-1',
                    'organizationId': 'org-123'
                }
            }
        },
        'documentId': 'doc-1'
    })
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_get_users():
    """Test getting users"""
    print("\n=== Testing GET Users ===")
    response = requests.post(f'{BASE_URL}/users/get', json={
        'organizationId': 'org-123',
        'userIds': ['user-1']
    })
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

if __name__ == '__main__':
    print("Velt SDK API Test Script")
    print("=" * 50)
    print("Make sure Django server is running: python manage.py runserver")
    print("=" * 50)
    
    try:
        # Test user operations first
        test_get_users()
        
        # Test comment operations
        test_save_comment()
        test_get_comments()
        
        print("\n✅ All tests completed!")
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to Django server.")
        print("   Make sure the server is running: python manage.py runserver")
    except Exception as e:
        print(f"\n❌ Error: {e}")

