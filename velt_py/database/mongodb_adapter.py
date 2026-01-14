"""
MongoDB adapter implementation

Provides MongoDB-specific implementation of DatabaseAdapter interface.
"""
from typing import Dict, Any, List, Optional
from pymongo.database import Database
from pymongo.collection import Collection
from pymongo.errors import PyMongoError

from .base import DatabaseAdapter


class MongoDBAdapter(DatabaseAdapter):
    """
    MongoDB implementation of DatabaseAdapter
    
    Wraps MongoDB operations to provide a consistent interface
    that can be replaced with other database adapters.
    """
    
    def __init__(self, database: Database):
        """
        Initialize MongoDB adapter
        
        Args:
            database: MongoDB Database instance
        """
        self.database = database
    
    def find(
        self,
        collection: str,
        query: Dict[str, Any],
        projection: Optional[Dict[str, Any]] = None,
        sort: Optional[List[tuple]] = None,
        limit: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """Find multiple documents matching query"""
        coll = self.database[collection]
        cursor = coll.find(query, projection)
        
        if sort:
            cursor = cursor.sort(sort)
        
        if limit:
            cursor = cursor.limit(limit)
        
        return list(cursor)
    
    def find_one(
        self,
        collection: str,
        query: Dict[str, Any],
        projection: Optional[Dict[str, Any]] = None
    ) -> Optional[Dict[str, Any]]:
        """Find a single document matching query"""
        coll = self.database[collection]
        return coll.find_one(query, projection)
    
    def insert_one(
        self,
        collection: str,
        document: Dict[str, Any]
    ) -> Any:
        """Insert a single document"""
        coll = self.database[collection]
        return coll.insert_one(document)
    
    def update_one(
        self,
        collection: str,
        filter: Dict[str, Any],
        update: Dict[str, Any],
        upsert: bool = False
    ) -> Any:
        """Update a single document"""
        coll = self.database[collection]
        return coll.update_one(filter, update, upsert=upsert)
    
    def update_many(
        self,
        collection: str,
        filter: Dict[str, Any],
        update: Dict[str, Any]
    ) -> Any:
        """Update multiple documents"""
        coll = self.database[collection]
        return coll.update_many(filter, update)
    
    def delete_one(
        self,
        collection: str,
        filter: Dict[str, Any]
    ) -> Any:
        """Delete a single document"""
        coll = self.database[collection]
        return coll.delete_one(filter)
    
    def delete_many(
        self,
        collection: str,
        filter: Dict[str, Any]
    ) -> Any:
        """Delete multiple documents"""
        coll = self.database[collection]
        return coll.delete_many(filter)
    
    def create_index(
        self,
        collection: str,
        keys: List[tuple],
        unique: bool = False,
        background: bool = True
    ) -> None:
        """Create an index on a collection"""
        coll = self.database[collection]
        coll.create_index(keys, unique=unique, background=background)
    
    def get_collection(self, collection: str) -> Collection:
        """Get MongoDB collection object"""
        return self.database[collection]
