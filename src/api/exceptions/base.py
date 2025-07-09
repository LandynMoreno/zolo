"""
Base Exception Classes for Zolo API
"""

from typing import Dict, Any, Optional
from enum import Enum


class ErrorKind(Enum):
    """Error classification for better error handling"""
    VALIDATION_ERROR = "validation_error"
    HARDWARE_ERROR = "hardware_error"
    NOT_FOUND = "not_found"
    PERMISSION_DENIED = "permission_denied"
    INTERNAL_ERROR = "internal_error"
    TIMEOUT = "timeout"
    NETWORK_ERROR = "network_error"


class ZoloException(Exception):
    """
    Base exception class for all Zolo API exceptions.
    Provides structured error handling with error kinds and context.
    """
    
    def __init__(
        self,
        message: str,
        error_kind: ErrorKind = ErrorKind.INTERNAL_ERROR,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        super().__init__(message)
        self.message = message
        self.error_kind = error_kind
        self.context = context or {}
        self.inner_exception = inner_exception
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert exception to dictionary for API responses"""
        result = {
            'error': self.error_kind.value,
            'message': self.message,
            'context': self.context
        }
        
        if self.inner_exception:
            result['inner_error'] = str(self.inner_exception)
            
        return result
    
    def __str__(self) -> str:
        return f"{self.error_kind.value}: {self.message}"


class ZoloValidationException(ZoloException):
    """Exception for validation errors"""
    
    def __init__(
        self,
        message: str,
        field_name: Optional[str] = None,
        field_value: Optional[Any] = None,
        context: Optional[Dict[str, Any]] = None
    ):
        context = context or {}
        if field_name:
            context['field_name'] = field_name
        if field_value is not None:
            context['field_value'] = field_value
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.VALIDATION_ERROR,
            context=context
        )


class ZoloHardwareException(ZoloException):
    """Exception for hardware-related errors"""
    
    def __init__(
        self,
        message: str,
        hardware_component: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if hardware_component:
            context['hardware_component'] = hardware_component
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.HARDWARE_ERROR,
            context=context,
            inner_exception=inner_exception
        )


class ZoloNotFoundException(ZoloException):
    """Exception for resource not found errors"""
    
    def __init__(
        self,
        message: str,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ):
        context = context or {}
        if resource_type:
            context['resource_type'] = resource_type
        if resource_id:
            context['resource_id'] = resource_id
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.NOT_FOUND,
            context=context
        )


class ZoloTimeoutException(ZoloException):
    """Exception for timeout errors"""
    
    def __init__(
        self,
        message: str,
        timeout_duration: Optional[float] = None,
        operation: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ):
        context = context or {}
        if timeout_duration:
            context['timeout_duration'] = timeout_duration
        if operation:
            context['operation'] = operation
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.TIMEOUT,
            context=context
        )