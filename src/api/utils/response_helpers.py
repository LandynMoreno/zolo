"""
Response Helper Utilities

Provides helper functions for creating standardized API responses.
"""

from typing import Any, Dict, Optional
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from ..models.base_models import ApiResponse
from ..exceptions.base_exception import BaseApiException

def create_success_response(
    data: Any = None,
    message: str = "Success",
    status_code: int = 200
) -> JSONResponse:
    """
    Create a standardized success response.
    
    Args:
        data: Response data
        message: Success message
        status_code: HTTP status code
        
    Returns:
        JSONResponse with success structure
    """
    response = ApiResponse.success_response(data=data, message=message)
    return JSONResponse(
        content=response.dict(),
        status_code=status_code
    )

def create_error_response(
    error: BaseApiException,
    status_code: int = 400
) -> JSONResponse:
    """
    Create a standardized error response from an exception.
    
    Args:
        error: BaseApiException instance
        status_code: HTTP status code
        
    Returns:
        JSONResponse with error structure
    """
    response = ApiResponse.error_response(
        error=error.to_dict(),
        message=error.message
    )
    return JSONResponse(
        content=response.dict(),
        status_code=status_code
    )

def handle_api_exception(error: Exception) -> JSONResponse:
    """
    Handle API exceptions and convert to appropriate HTTP responses.
    
    Args:
        error: Exception that occurred
        
    Returns:
        JSONResponse with appropriate error structure
    """
    if isinstance(error, BaseApiException):
        # Determine appropriate HTTP status code based on error kind
        status_code_map = {
            "validation_error": 400,
            "not_found": 404,
            "unauthorized": 401,
            "hardware_error": 500,
            "network_error": 502,
            "internal_error": 500
        }
        status_code = status_code_map.get(error.error_kind.value, 500)
        return create_error_response(error, status_code)
    
    # Handle generic exceptions
    from ..exceptions.base_exception import BaseApiException, ErrorKind
    generic_error = BaseApiException(
        message=str(error),
        error_kind=ErrorKind.INTERNAL_ERROR,
        inner_exception=error
    )
    return create_error_response(generic_error, 500)