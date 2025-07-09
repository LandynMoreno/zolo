"""
LED-specific exception classes
"""

from typing import Dict, Any, Optional
from .base import ZoloException, ZoloValidationException, ZoloHardwareException, ErrorKind


class LEDException(ZoloException):
    """Base exception for LED-related errors"""
    
    def __init__(
        self,
        message: str,
        error_kind: ErrorKind = ErrorKind.INTERNAL_ERROR,
        led_index: Optional[int] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if led_index is not None:
            context['led_index'] = led_index
            
        super().__init__(
            message=message,
            error_kind=error_kind,
            context=context,
            inner_exception=inner_exception
        )


class LEDValidationException(LEDException):
    """Exception for LED validation errors"""
    
    def __init__(
        self,
        message: str,
        field_name: Optional[str] = None,
        field_value: Optional[Any] = None,
        led_index: Optional[int] = None,
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
            led_index=led_index,
            context=context
        )


class LEDHardwareException(LEDException):
    """Exception for LED hardware errors"""
    
    def __init__(
        self,
        message: str,
        led_index: Optional[int] = None,
        hardware_component: str = "NeoPixel",
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        context['hardware_component'] = hardware_component
        
        super().__init__(
            message=message,
            error_kind=ErrorKind.HARDWARE_ERROR,
            led_index=led_index,
            context=context,
            inner_exception=inner_exception
        )


class LEDPatternException(LEDException):
    """Exception for LED pattern-related errors"""
    
    def __init__(
        self,
        message: str,
        pattern_name: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if pattern_name:
            context['pattern_name'] = pattern_name
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.VALIDATION_ERROR,
            context=context,
            inner_exception=inner_exception
        )