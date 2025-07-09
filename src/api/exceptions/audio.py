"""
Audio-specific exception classes
"""

from typing import Dict, Any, Optional
from .base import ZoloException, ZoloValidationException, ZoloHardwareException, ErrorKind


class AudioException(ZoloException):
    """Base exception for audio-related errors"""
    
    def __init__(
        self,
        message: str,
        error_kind: ErrorKind = ErrorKind.INTERNAL_ERROR,
        audio_device: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if audio_device:
            context['audio_device'] = audio_device
            
        super().__init__(
            message=message,
            error_kind=error_kind,
            context=context,
            inner_exception=inner_exception
        )


class AudioValidationException(AudioException):
    """Exception for audio validation errors"""
    
    def __init__(
        self,
        message: str,
        field_name: Optional[str] = None,
        field_value: Optional[Any] = None,
        audio_device: Optional[str] = None,
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
            audio_device=audio_device,
            context=context
        )


class AudioHardwareException(AudioException):
    """Exception for audio hardware errors"""
    
    def __init__(
        self,
        message: str,
        audio_device: Optional[str] = None,
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
            audio_device=audio_device,
            context=context,
            inner_exception=inner_exception
        )


class AudioStreamException(AudioException):
    """Exception for audio streaming errors"""
    
    def __init__(
        self,
        message: str,
        audio_device: Optional[str] = None,
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
            audio_device=audio_device,
            context=context,
            inner_exception=inner_exception
        )