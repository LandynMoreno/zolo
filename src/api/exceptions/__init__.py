"""
API Exceptions Module

This module provides custom exception classes for the API layer.
All exceptions inherit from a base exception class for consistent error handling.
"""

from .base_exception import BaseApiException
from .led_exceptions import LedControlException, LedPatternException
from .validation_exceptions import ValidationException

__all__ = [
    'BaseApiException',
    'LedControlException', 
    'LedPatternException',
    'ValidationException'
]