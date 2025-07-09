"""
API Request and Response Models
"""

from .base import ZoloRequest, ZoloResponse, ValidationResult
from .led import (
    LEDColorRequest, LEDColorResponse,
    LEDPatternRequest, LEDPatternResponse,
    LEDBrightnessRequest, LEDBrightnessResponse,
    LEDPresetsRequest, LEDPresetsResponse
)

__all__ = [
    'ZoloRequest',
    'ZoloResponse', 
    'ValidationResult',
    'LEDColorRequest',
    'LEDColorResponse',
    'LEDPatternRequest',
    'LEDPatternResponse',
    'LEDBrightnessRequest',
    'LEDBrightnessResponse',
    'LEDPresetsRequest',
    'LEDPresetsResponse',
]