"""
LED-specific exception classes

Provides custom exceptions for LED hardware and pattern operations.
"""

from typing import Optional, Dict, Any
from .base_exception import BaseApiException, ErrorKind

class LedControlException(BaseApiException):
    """Exception for LED control operations"""
    
    def __init__(
        self,
        message: str,
        led_index: Optional[int] = None,
        color: Optional[str] = None,
        brightness: Optional[int] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = {}
        if led_index is not None:
            context["led_index"] = led_index
        if color is not None:
            context["color"] = color
        if brightness is not None:
            context["brightness"] = brightness
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.HARDWARE_ERROR,
            error_code="LED_CONTROL_ERROR",
            context=context,
            inner_exception=inner_exception
        )

class LedPatternException(BaseApiException):
    """Exception for LED pattern operations"""
    
    def __init__(
        self,
        message: str,
        pattern_name: Optional[str] = None,
        action: Optional[str] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = {}
        if pattern_name is not None:
            context["pattern_name"] = pattern_name
        if action is not None:
            context["action"] = action
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.HARDWARE_ERROR,
            error_code="LED_PATTERN_ERROR",
            context=context,
            inner_exception=inner_exception
        )