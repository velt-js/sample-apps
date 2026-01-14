"""
Token service for generating Velt authentication tokens
"""
from typing import Dict, Any, Optional
import requests
from requests.exceptions import RequestException

from ..self_hosting.base_service import BaseService
from ...exceptions import VeltTokenError, VeltValidationError


class TokenService(BaseService):
    """Service for generating Velt authentication tokens"""
    
    VELT_API_URL = 'https://api.velt.dev/v2/auth/token/get'
    
    def __init__(self, database, api_key: Optional[str] = None, auth_token: Optional[str] = None):
        """
        Initialize token service
        
        Args:
            database: MongoDB Database instance (not used but required by base class)
            api_key: Velt API key
            auth_token: Velt auth token
        """
        super().__init__(database)
        self.api_key = api_key
        self.auth_token = auth_token
    
    def getToken(
        self,
        organizationId: str,
        userId: str,
        email: Optional[str] = None,
        isAdmin: Optional[bool] = None
    ) -> Dict[str, Any]:
        """
        Get authentication token from Velt API
        
        Args:
            organizationId: Organization ID
            userId: User ID
            email: Optional user email
            isAdmin: Optional admin flag
            
        Returns:
            Response dictionary with 'success' and 'data' keys containing token
        """
        try:
            self._validate_organization_id(organizationId)
            
            if not userId:
                return self._error_response("userId is required", "INVALID_INPUT")
            
            if not self.auth_token:
                return self._error_response(
                    "Velt auth token is required. Set it in config or VELT_AUTH_TOKEN environment variable",
                    "CONFIG_ERROR"
                )
            
            if not self.api_key:
                return self._error_response(
                    "Velt API key is required. Set it in config or VELT_API_KEY environment variable",
                    "CONFIG_ERROR"
                )
            
            # Prepare request body
            body = {
                'data': {
                    'userId': userId,
                    'userProperties': {
                        'organizationId': organizationId
                    }
                }
            }
            
            # Add optional fields
            if email:
                body['data']['userProperties']['email'] = email
            
            if isinstance(isAdmin, bool):
                body['data']['userProperties']['isAdmin'] = isAdmin
            
            # Make request to Velt API
            headers = {
                'Content-Type': 'application/json',
                'x-velt-api-key': self.api_key,
                'x-velt-auth-token': self.auth_token
            }
            
            response = requests.post(
                self.VELT_API_URL,
                json=body,
                headers=headers,
                timeout=10
            )
            
            # Parse response
            if not response.ok:
                error_data = response.json() if response.content else {}
                error_message = error_data.get('error', {}).get('message', 'Failed to generate token')
                return self._error_response(
                    f"Velt API error: {error_message}",
                    "VELT_API_ERROR"
                )
            
            json_response = response.json()
            token = json_response.get('result', {}).get('data', {}).get('token')
            
            if not token:
                return self._error_response(
                    "No token received from Velt API",
                    "NO_TOKEN"
                )
            
            return self._success_response(data={'token': token})
            
        except VeltValidationError:
            raise
        except RequestException as e:
            raise VeltTokenError(f"Network error while getting token: {str(e)}")
        except Exception as e:
            raise VeltTokenError(f"Unexpected error while getting token: {str(e)}")

