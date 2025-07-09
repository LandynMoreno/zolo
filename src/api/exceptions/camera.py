"""
Camera-specific exception classes
"""

from typing import Dict, Any, Optional
from .base import ZoloException, ZoloValidationException, ZoloHardwareException, ErrorKind


class CameraException(ZoloException):
    """Base exception for camera-related errors"""
    
    def __init__(
        self,
        message: str,
        error_kind: ErrorKind = ErrorKind.INTERNAL_ERROR,
        camera_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if camera_id:
            context['camera_id'] = camera_id
            
        super().__init__(
            message=message,
            error_kind=error_kind,
            context=context,
            inner_exception=inner_exception
        )


class CameraValidationException(CameraException):
    """Exception for camera validation errors"""
    
    def __init__(
        self,
        message: str,
        field_name: Optional[str] = None,
        field_value: Optional[Any] = None,
        camera_id: Optional[str] = None,
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
            camera_id=camera_id,
            context=context
        )


class CameraHardwareException(CameraException):
    """Exception for camera hardware errors"""
    
    def __init__(
        self,
        message: str,
        camera_id: Optional[str] = None,
        hardware_component: str = "Camera",
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        context['hardware_component'] = hardware_component
        
        super().__init__(
            message=message,
            error_kind=ErrorKind.HARDWARE_ERROR,
            camera_id=camera_id,
            context=context,
            inner_exception=inner_exception
        )


class CameraStreamException(CameraException):
    """Exception for camera streaming errors"""
    
    def __init__(
        self,
        message: str,
        camera_id: Optional[str] = None,
        stream_type: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if stream_type:
            context['stream_type'] = stream_type
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.NETWORK_ERROR,
            camera_id=camera_id,
            context=context,
            inner_exception=inner_exception
        )