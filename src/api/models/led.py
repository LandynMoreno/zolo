"""
LED Request and Response Models
"""

from typing import Dict, Any, Optional, List, Tuple
from pydantic import BaseModel, Field, validator
from .base import ZoloRequest, ZoloResponse, ValidationResult


class LEDColorRequest(ZoloRequest):
    """Request model for setting LED color"""
    
    led_index: int = Field(..., description="LED index (0-11)", ge=0, le=11)
    color: str = Field(..., description="Hex color code (e.g., #FF0000)")
    brightness: float = Field(1.0, description="Brightness level (0.0-1.0)", ge=0.0, le=1.0)
    
    @validator('color')
    def validate_color(cls, v):
        if not v.startswith('#') or len(v) != 7:
            raise ValueError('Color must be a valid hex color code (e.g., #FF0000)')
        
        try:
            int(v[1:], 16)
        except ValueError:
            raise ValueError('Color must be a valid hex color code')
        
        return v
    
    def validate(self, request_type: str, validation_type: str = "default") -> ValidationResult:
        """Validate LED color request"""
        result = super().validate(request_type, validation_type)
        
        if self.led_index < 0 or self.led_index > 11:
            result.add_error("LED index must be between 0 and 11")
        
        if self.brightness < 0.0 or self.brightness > 1.0:
            result.add_error("Brightness must be between 0.0 and 1.0")
        
        return result


class LEDColorResponse(ZoloResponse):
    """Response model for LED color operations"""
    
    led_index: int = Field(..., description="LED index that was modified")
    color: str = Field(..., description="Color that was set")
    brightness: float = Field(..., description="Brightness level that was set")
    
    def __init__(self, request: LEDColorRequest, **data):
        super().__init__(request, **data)
        self.led_index = request.led_index
        self.color = request.color
        self.brightness = request.brightness


class LEDPatternRequest(ZoloRequest):
    """Request model for LED pattern operations"""
    
    pattern: str = Field(..., description="Pattern name (e.g., 'rainbow', 'breathing', 'clear', 'test')")
    duration: Optional[int] = Field(None, description="Pattern duration in milliseconds")
    speed: Optional[float] = Field(None, description="Pattern speed multiplier")
    colors: Optional[List[str]] = Field(None, description="List of hex colors for the pattern")
    
    @validator('colors')
    def validate_colors(cls, v):
        if v is None:
            return v
        
        for color in v:
            if not color.startswith('#') or len(color) != 7:
                raise ValueError('All colors must be valid hex color codes')
            try:
                int(color[1:], 16)
            except ValueError:
                raise ValueError('All colors must be valid hex color codes')
        
        return v
    
    def validate(self, request_type: str, validation_type: str = "default") -> ValidationResult:
        """Validate LED pattern request"""
        result = super().validate(request_type, validation_type)
        
        valid_patterns = ['rainbow', 'breathing', 'clear', 'test', 'stop', 'solid', 'spinning']
        if self.pattern not in valid_patterns:
            result.add_error(f"Pattern must be one of: {', '.join(valid_patterns)}")
        
        if self.duration is not None and self.duration < 0:
            result.add_error("Duration must be non-negative")
        
        if self.speed is not None and self.speed <= 0:
            result.add_error("Speed must be positive")
        
        return result


class LEDPatternResponse(ZoloResponse):
    """Response model for LED pattern operations"""
    
    pattern: str = Field(..., description="Pattern that was applied")
    duration: Optional[int] = Field(None, description="Pattern duration in milliseconds")
    active: bool = Field(True, description="Whether the pattern is currently active")
    
    def __init__(self, request: LEDPatternRequest, **data):
        super().__init__(request, **data)
        self.pattern = request.pattern
        self.duration = request.duration
        self.active = request.pattern not in ['clear', 'stop']


class LEDBrightnessRequest(ZoloRequest):
    """Request model for LED brightness control"""
    
    brightness: float = Field(..., description="Brightness level (0.0-1.0)", ge=0.0, le=1.0)
    
    def validate(self, request_type: str, validation_type: str = "default") -> ValidationResult:
        """Validate LED brightness request"""
        result = super().validate(request_type, validation_type)
        
        if self.brightness < 0.0 or self.brightness > 1.0:
            result.add_error("Brightness must be between 0.0 and 1.0")
        
        return result


class LEDBrightnessResponse(ZoloResponse):
    """Response model for LED brightness operations"""
    
    brightness: float = Field(..., description="Brightness level that was set")
    
    def __init__(self, request: LEDBrightnessRequest, **data):
        super().__init__(request, **data)
        self.brightness = request.brightness


class LEDPresetsRequest(ZoloRequest):
    """Request model for LED preset operations"""
    
    preset_name: str = Field(..., description="Name of the preset to apply")
    colors: List[str] = Field(..., description="List of hex colors for the preset")
    brightness: float = Field(1.0, description="Brightness level (0.0-1.0)", ge=0.0, le=1.0)
    
    @validator('colors')
    def validate_colors(cls, v):
        if not v:
            raise ValueError('Colors list cannot be empty')
        
        for color in v:
            if not color.startswith('#') or len(color) != 7:
                raise ValueError('All colors must be valid hex color codes')
            try:
                int(color[1:], 16)
            except ValueError:
                raise ValueError('All colors must be valid hex color codes')
        
        return v
    
    def validate(self, request_type: str, validation_type: str = "default") -> ValidationResult:
        """Validate LED presets request"""
        result = super().validate(request_type, validation_type)
        
        if not self.preset_name:
            result.add_error("Preset name is required")
        
        if not self.colors:
            result.add_error("Colors list is required")
        
        if self.brightness < 0.0 or self.brightness > 1.0:
            result.add_error("Brightness must be between 0.0 and 1.0")
        
        return result


class LEDPresetsResponse(ZoloResponse):
    """Response model for LED preset operations"""
    
    preset_name: str = Field(..., description="Name of the preset that was applied")
    colors: List[str] = Field(..., description="List of colors that were applied")
    brightness: float = Field(..., description="Brightness level that was set")
    
    def __init__(self, request: LEDPresetsRequest, **data):
        super().__init__(request, **data)
        self.preset_name = request.preset_name
        self.colors = request.colors
        self.brightness = request.brightness