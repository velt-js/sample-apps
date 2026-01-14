"""
User models for Velt SDK

Based on Velt API documentation:
https://docs.velt.dev/api-reference/sdk/models/data-models
"""
from typing import Optional, Dict, Any
from dataclasses import dataclass



@dataclass
class PartialUser:
    """
    Partial user model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#partialuser
    """
    userId: str
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'userId': self.userId
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PartialUser':
        """Create from dictionary"""
        return cls(
            userId=data.get('userId', '')
        )


@dataclass
class PartialTaggedUserContacts:
    """
    Partial tagged user contacts model
    
    Based on: https://docs.velt.dev/api-reference/sdk/models/data-models#partialtaggedusercontacts
    """
    userId: str
    contact: Optional['PartialUser'] = None
    text: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        result: Dict[str, Any] = {
            'userId': self.userId
        }
        if self.contact is not None:
            result['contact'] = self.contact.to_dict() if isinstance(self.contact, PartialUser) else self.contact
        if self.text is not None:
            result['text'] = self.text
        return result
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'PartialTaggedUserContacts':
        """Create from dictionary"""
        contact = None
        if 'contact' in data and data['contact']:
            if isinstance(data['contact'], dict):
                contact = PartialUser.from_dict(data['contact'])
            elif isinstance(data['contact'], PartialUser):
                contact = data['contact']
        
        return cls(
            userId=data.get('userId', ''),
            contact=contact,
            text=data.get('text')
        )
