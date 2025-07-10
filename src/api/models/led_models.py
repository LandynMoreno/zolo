"""
LED API Models

Request and response models for LED control and pattern operations.
"""

from typing import Optional, List
from pydantic import BaseModel, Field, validator
from .base_models import BaseRequest, BaseResponse

class LedControlRequest(BaseRequest):
    """Request model for LED control operations"""
    
    action: str = Field(..., description="Action to perform (set_led, clear_all, set_brightness)")
    led_index: Optional[int] = Field(default=None, description="LED index (0-11)")
    color: Optional[str] = Field(default=None, description="Color in hex format (#RRGGBB)")
    brightness: Optional[int] = Field(default=None, description="Brightness level (0-100)")
    
    @validator('action')
    def validate_action(cls, v):
        valid_actions = ['set_led', 'clear_all', 'set_brightness']
        if v not in valid_actions:
            raise ValueError(f"Action must be one of {valid_actions}")
        return v
    
    @validator('led_index')
    def validate_led_index(cls, v):
        if v is not None and (v < 0 or v > 11):
            raise ValueError("LED index must be between 0 and 11")
        return v
    
    @validator('color')
    def validate_color(cls, v):
        if v is not None:
            if not v.startswith('#') or len(v) != 7:
                raise ValueError("Color must be in hex format (#RRGGBB)")
            try:
                int(v[1:], 16)
            except ValueError:
                raise ValueError("Invalid hex color format")
        return v
    
    @validator('brightness')
    def validate_brightness(cls, v):
        if v is not None and (v < 0 or v > 100):
            raise ValueError("Brightness must be between 0 and 100")
        return v

class LedControlResponse(BaseResponse):
    """Response model for LED control operations"""
    
    led_index: Optional[int] = Field(default=None, description="LED index that was controlled")
    color: Optional[str] = Field(default=None, description="Color that was set")
    brightness: Optional[int] = Field(default=None, description="Brightness level that was set")

class LedPatternRequest(BaseRequest):
    """Request model for LED pattern operations"""
    
    action: str = Field(..., description="Action to perform (preset, test, stop)")
    pattern_name: Optional[str] = Field(default=None, description="Name of the pattern to apply")
    colors: Optional[List[str]] = Field(default=None, description="List of colors for the pattern")
    duration: Optional[int] = Field(default=None, description="Duration in milliseconds")
    brightness: Optional[int] = Field(default=None, description="Brightness level (0-100)")
    
    @validator('action')
    def validate_action(cls, v):
        valid_actions = ['preset', 'test', 'stop']
        if v not in valid_actions:
            raise ValueError(f"Action must be one of {valid_actions}")
        return v
    
    @validator('colors')
    def validate_colors(cls, v):
        if v is not None:
            for color in v:
                if not color.startswith('#') or len(color) != 7:
                    raise ValueError("Each color must be in hex format (#RRGGBB)")
                try:
                    int(color[1:], 16)
                except ValueError:
                    raise ValueError("Invalid hex color format")
        return v
    
    @validator('brightness')
    def validate_brightness(cls, v):
        if v is not None and (v < 0 or v > 100):
            raise ValueError("Brightness must be between 0 and 100")
        return v

class LedPatternResponse(BaseResponse):
    """Response model for LED pattern operations"""
    
    pattern_name: Optional[str] = Field(default=None, description="Pattern name that was applied")
    duration: Optional[int] = Field(default=None, description="Pattern duration in milliseconds")
    active: bool = Field(default=False, description="Whether pattern is currently active")