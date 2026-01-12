"""
Base database adapter interface

All database adapters must implement this interface to ensure
consistent behavior across different database backends.
"""
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional


class DatabaseAdapter(ABC):
    """
    Abstract base class for database adapters
    
    This interface defines the operations that all database adapters
    must implement, allowing services to work with any database backend.
    """
    
    @abstractmethod
    def find(
        self,
        collection: str,
        query: Dict[str, Any],
        projection: Optional[Dict[str, Any]] = None,
        sort: Optional[List[tuple]] = None,
        limit: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Find multiple documents matching query
        
        Args:
            collection: Collection/table name
            query: Query filter dictionary
            projection: Optional fields to include/exclude
            sort: Optional sort specification as list of (field, direction) tuples
            limit: Optional limit on number of results
            
        Returns:
            List of matching documents
        """
        pass
    
    @abstractmethod
    def find_one(
        self,
        collection: str,
        query: Dict[str, Any],
        projection: Optional[Dict[str, Any]] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Find a single document matching query
        
        Args:
            collection: Collection/table name
            query: Query filter dictionary
            projection: Optional fields to include/exclude
            
        Returns:
            Matching document or None if not found
        """
        pass
    
    @abstractmethod
    def insert_one(
        self,
        collection: str,
        document: Dict[str, Any]
    ) -> Any:
        """
        Insert a single document
        
        Args:
            collection: Collection/table name
            document: Document to insert
            
        Returns:
            Insert result (implementation-specific)
        """
        pass
    
    @abstractmethod
    def update_one(
        self,
        collection: str,
        filter: Dict[str, Any],
        update: Dict[str, Any],
        upsert: bool = False
    ) -> Any:
        """
        Update a single document
        
        Args:
            collection: Collection/table name
            filter: Query filter to find document
            update: Update operations
            upsert: If True, create document if it doesn't exist
            
        Returns:
            Update result (implementation-specific)
        """
        pass
    
    @abstractmethod
    def update_many(
        self,
        collection: str,
        filter: Dict[str, Any],
        update: Dict[str, Any]
    ) -> Any:
        """
        Update multiple documents
        
        Args:
            collection: Collection/table name
            filter: Query filter to find documents
            update: Update operations
            
        Returns:
            Update result (implementation-specific)
        """
        pass
    
    @abstractmethod
    def delete_one(
        self,
        collection: str,
        filter: Dict[str, Any]
    ) -> Any:
        """
        Delete a single document
        
        Args:
            collection: Collection/table name
            filter: Query filter to find document
            
        Returns:
            Delete result (implementation-specific)
        """
        pass
    
    @abstractmethod
    def delete_many(
        self,
        collection: str,
        filter: Dict[str, Any]
    ) -> Any:
        """
        Delete multiple documents
        
        Args:
            collection: Collection/table name
            filter: Query filter to find documents
            
        Returns:
            Delete result (implementation-specific)
        """
        pass
    
    @abstractmethod
    def create_index(
        self,
        collection: str,
        keys: List[tuple],
        unique: bool = False,
        background: bool = True
    ) -> None:
        """
        Create an index on a collection
        
        Args:
            collection: Collection/table name
            keys: List of (field, direction) tuples for index keys
            unique: Whether index should enforce uniqueness
            background: Whether to create index in background (non-blocking)
        """
        pass
    
    @abstractmethod
    def get_collection(self, collection: str):
        """
        Get collection/table object (for database-specific operations)
        
        Args:
            collection: Collection/table name
            
        Returns:
            Collection/table object (implementation-specific)
        """
        pass
