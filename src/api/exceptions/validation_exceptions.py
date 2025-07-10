"""
Validation exception classes

Provides custom exceptions for request validation errors.
"""

from typing import Optional, Dict, Any, List
from .base_exception import BaseApiException, ErrorKind

class ValidationException(BaseApiException):
    """Exception for request validation errors"""
    
    def __init__(
        self,
        message: str,
        field_name: Optional[str] = None,
        field_value: Optional[Any] = None,
        validation_errors: Optional[List[str]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = {}
        if field_name is not None:
            context["field_name"] = field_name
        if field_value is not None:
            context["field_value"] = str(field_value)
        if validation_errors is not None:
            context["validation_errors"] = validation_errors
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.VALIDATION_ERROR,
            error_code="VALIDATION_ERROR",
            context=context,
            inner_exception=inner_exception
        )