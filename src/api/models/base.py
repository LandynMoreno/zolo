"""
Base Request and Response Models
"""

from typing import Dict, Any, Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from enum import Enum


class RequestStatus(str, Enum):
    """Status of request processing"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ValidationResult:
    """Result of request validation"""
    
    def __init__(self, is_valid: bool = True, errors: Optional[List[str]] = None):
        self.is_valid = is_valid
        self.errors = errors or []
    
    def add_error(self, error: str):
        """Add validation error"""
        self.errors.append(error)
        self.is_valid = False
    
    @staticmethod
    def get_validation_error_message(validation_result: 'ValidationResult') -> str:
        """Get formatted validation error message"""
        if validation_result.is_valid:
            return "Request is valid"
        
        return f"Validation failed: {'; '.join(validation_result.errors)}"


class ZoloRequest(BaseModel):
    """Base request model for all API endpoints"""
    
    request_id: Optional[str] = Field(None, description="Unique request identifier")
    timestamp: datetime = Field(default_factory=datetime.now, description="Request timestamp")
    user_id: Optional[str] = Field(None, description="User making the request")
    context: Dict[str, Any] = Field(default_factory=dict, description="Additional request context")
    
    def set_requesting_user_id(self, user_id: str):
        """Set the requesting user ID"""
        self.user_id = user_id
    
    def validate(self, request_type: str, validation_type: str = "default") -> ValidationResult:
        """Validate the request based on type and validation requirements"""
        result = ValidationResult()
        
        # Base validation - can be overridden in subclasses
        if not self.timestamp:
            result.add_error("Timestamp is required")
        
        return result
    
    class Config:
        """Pydantic configuration"""
        use_enum_values = True
        validate_assignment = True


class ZoloResponse(BaseModel):
    """Base response model for all API endpoints"""
    
    success: bool = Field(True, description="Whether the request was successful")
    message: Optional[str] = Field(None, description="Response message")
    request_id: Optional[str] = Field(None, description="Original request identifier")
    timestamp: datetime = Field(default_factory=datetime.now, description="Response timestamp")
    status: RequestStatus = Field(RequestStatus.COMPLETED, description="Request processing status")
    data: Optional[Dict[str, Any]] = Field(None, description="Response data")
    errors: Optional[List[str]] = Field(None, description="List of errors if any")
    
    def __init__(self, request: Optional[ZoloRequest] = None, **data):
        super().__init__(**data)
        if request:
            self.request_id = request.request_id
    
    def set_error(self, message: str, errors: Optional[List[str]] = None):
        """Set error response"""
        self.success = False
        self.message = message
        self.status = RequestStatus.FAILED
        self.errors = errors or []
    
    def set_success(self, message: str = "Request completed successfully", data: Optional[Dict[str, Any]] = None):
        """Set success response"""
        self.success = True
        self.message = message
        self.status = RequestStatus.COMPLETED
        self.data = data or {}
    
    class Config:
        """Pydantic configuration"""
        use_enum_values = True
        validate_assignment = True


class ErrorResponse(ZoloResponse):
    """Standardized error response model"""
    
    error_code: str = Field(..., description="Error code for programmatic handling")
    error_kind: str = Field(..., description="Error classification")
    context: Dict[str, Any] = Field(default_factory=dict, description="Error context information")
    
    def __init__(self, error_code: str, error_kind: str, message: str, context: Optional[Dict[str, Any]] = None, **data):
        super().__init__(**data)
        self.success = False
        self.error_code = error_code
        self.error_kind = error_kind
        self.message = message
        self.context = context or {}
        self.status = RequestStatus.FAILED