"""
Base Exception Classes

Provides foundation exception classes for the API layer.
All custom exceptions should inherit from BaseApiException.
"""

from typing import Optional, Dict, Any
from enum import Enum

class ErrorKind(Enum):
    """Enumeration of error types"""
    VALIDATION_ERROR = "validation_error"
    HARDWARE_ERROR = "hardware_error"
    NETWORK_ERROR = "network_error"
    INTERNAL_ERROR = "internal_error"
    NOT_FOUND = "not_found"
    UNAUTHORIZED = "unauthorized"

class BaseApiException(Exception):
    """
    Base exception class for all API-related exceptions.
    
    Provides consistent error handling with error codes, context, and structured information.
    """
    
    def __init__(
        self,
        message: str,
        error_kind: ErrorKind = ErrorKind.INTERNAL_ERROR,
        error_code: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        """
        Initialize base API exception.
        
        Args:
            message: Human-readable error message
            error_kind: Type of error from ErrorKind enum
            error_code: Specific error code for programmatic handling
            context: Additional context information
            inner_exception: Original exception that caused this error
        """
        super().__init__(message)
        self.message = message
        self.error_kind = error_kind
        self.error_code = error_code or error_kind.value
        self.context = context or {}
        self.inner_exception = inner_exception
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert exception to dictionary for JSON serialization."""
        return {
            "error_kind": self.error_kind.value,
            "error_code": self.error_code,
            "message": self.message,
            "context": self.context,
            "inner_exception": str(self.inner_exception) if self.inner_exception else None
        }
    
    def __str__(self) -> str:
        """String representation of the exception."""
        context_str = f" | Context: {self.context}" if self.context else ""
        return f"[{self.error_kind.value}] {self.message}{context_str}"