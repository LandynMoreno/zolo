"""
Base Model Classes

Provides foundation request and response models for the API layer.
All API models should inherit from these base classes.
"""

from typing import Optional, Dict, Any, Generic, TypeVar
from pydantic import BaseModel, Field
from datetime import datetime

T = TypeVar('T')

class BaseRequest(BaseModel):
    """Base class for all API requests"""
    
    request_id: Optional[str] = Field(default=None, description="Unique request identifier")
    timestamp: datetime = Field(default_factory=datetime.now, description="Request timestamp")
    
    class Config:
        """Pydantic configuration"""
        validate_assignment = True
        extra = "forbid"

class BaseResponse(BaseModel):
    """Base class for all API responses"""
    
    success: bool = Field(description="Indicates if the request was successful")
    message: Optional[str] = Field(default=None, description="Response message")
    timestamp: datetime = Field(default_factory=datetime.now, description="Response timestamp")
    
    class Config:
        """Pydantic configuration"""
        validate_assignment = True

class ApiResponse(BaseResponse, Generic[T]):
    """Generic API response wrapper"""
    
    data: Optional[T] = Field(default=None, description="Response data")
    error: Optional[Dict[str, Any]] = Field(default=None, description="Error information")
    
    @classmethod
    def success_response(cls, data: T, message: str = "Success") -> "ApiResponse[T]":
        """Create a successful response"""
        return cls(
            success=True,
            message=message,
            data=data
        )
    
    @classmethod
    def error_response(cls, error: Dict[str, Any], message: str = "Error") -> "ApiResponse[T]":
        """Create an error response"""
        return cls(
            success=False,
            message=message,
            error=error
        )