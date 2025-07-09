"""
LED Manager

Business logic manager for LED operations.
Handles LED control and pattern operations with proper error handling and logging.
"""

from typing import Dict, Any, List, Optional
from ..models.led_models import LedControlRequest, LedControlResponse, LedPatternRequest, LedPatternResponse
from ..exceptions.led_exceptions import LedControlException, LedPatternException
from ..utils.logger import ApiLogger
from ...senses.eyes.neopixel.neopixel import NeoPixel

class LedManager:
    """
    Manager for LED operations.
    
    Provides business logic for LED control and pattern operations,
    orchestrating between the API layer and the NeoPixel hardware.
    """
    
    def __init__(self, neopixel: NeoPixel, logger: ApiLogger):
        """
        Initialize LED manager with dependencies.
        
        Args:
            neopixel: NeoPixel hardware controller
            logger: API logger instance
        """
        self.neopixel = neopixel
        self.logger = logger
        self.active_patterns: Dict[str, Any] = {}
    
    def handle_led_control(self, request: LedControlRequest) -> LedControlResponse:
        """
        Handle LED control operations.
        
        Args:
            request: LED control request
            
        Returns:
            LedControlResponse with operation result
            
        Raises:
            LedControlException: If operation fails
        """
        context = {
            "request_id": request.request_id,
            "action": request.action,
            "led_index": request.led_index,
            "color": request.color,
            "brightness": request.brightness
        }
        
        try:
            return self.logger.execute_with_logging(
                context=context,
                func=lambda: self._execute_led_control(request),
                operation_name=f"LED Control - {request.action}"
            )
        except Exception as e:
            raise LedControlException(
                message=f"Failed to execute LED control action '{request.action}': {str(e)}",
                led_index=request.led_index,
                color=request.color,
                brightness=request.brightness,
                inner_exception=e
            )
    
    def handle_led_pattern(self, request: LedPatternRequest) -> LedPatternResponse:
        """
        Handle LED pattern operations.
        
        Args:
            request: LED pattern request
            
        Returns:
            LedPatternResponse with operation result
            
        Raises:
            LedPatternException: If operation fails
        """
        context = {
            "request_id": request.request_id,
            "action": request.action,
            "pattern_name": request.pattern_name,
            "duration": request.duration
        }
        
        try:
            return self.logger.execute_with_logging(
                context=context,
                func=lambda: self._execute_led_pattern(request),
                operation_name=f"LED Pattern - {request.action}"
            )
        except Exception as e:
            raise LedPatternException(
                message=f"Failed to execute LED pattern action '{request.action}': {str(e)}",
                pattern_name=request.pattern_name,
                action=request.action,
                inner_exception=e
            )
    
    def _execute_led_control(self, request: LedControlRequest) -> LedControlResponse:
        """Execute LED control operation."""
        if not self.neopixel.is_initialized:
            if not self.neopixel.initialize():
                raise LedControlException("Failed to initialize NeoPixel hardware")
        
        if request.action == "set_led":
            if request.led_index is None or request.color is None:
                raise LedControlException("LED index and color are required for set_led action")
            
            # Convert hex color to RGB tuple
            color_rgb = self._hex_to_rgb(request.color)
            
            # Set brightness if provided
            if request.brightness is not None:
                self.neopixel.set_brightness(request.brightness / 100.0)
            
            # Set individual LED
            success = self.neopixel.set_pixel(request.led_index, color_rgb)
            if not success:
                raise LedControlException(f"Failed to set LED {request.led_index} to color {request.color}")
            
            return LedControlResponse(
                success=True,
                message=f"Successfully set LED {request.led_index} to color {request.color}",
                led_index=request.led_index,
                color=request.color,
                brightness=request.brightness
            )
        
        elif request.action == "clear_all":
            success = self.neopixel.clear()
            if not success:
                raise LedControlException("Failed to clear all LEDs")
            
            return LedControlResponse(
                success=True,
                message="Successfully cleared all LEDs"
            )
        
        elif request.action == "set_brightness":
            if request.brightness is None:
                raise LedControlException("Brightness value is required for set_brightness action")
            
            success = self.neopixel.set_brightness(request.brightness / 100.0)
            if not success:
                raise LedControlException(f"Failed to set brightness to {request.brightness}%")
            
            return LedControlResponse(
                success=True,
                message=f"Successfully set brightness to {request.brightness}%",
                brightness=request.brightness
            )
        
        else:
            raise LedControlException(f"Unknown LED control action: {request.action}")
    
    def _execute_led_pattern(self, request: LedPatternRequest) -> LedPatternResponse:
        """Execute LED pattern operation."""
        if not self.neopixel.is_initialized:
            if not self.neopixel.initialize():
                raise LedPatternException("Failed to initialize NeoPixel hardware")
        
        if request.action == "preset":
            if request.pattern_name is None:
                raise LedPatternException("Pattern name is required for preset action")
            
            # Set brightness if provided
            if request.brightness is not None:
                self.neopixel.set_brightness(request.brightness / 100.0)
            
            # Apply preset pattern
            success = self._apply_preset_pattern(request.pattern_name, request.colors)
            if not success:
                raise LedPatternException(f"Failed to apply preset pattern: {request.pattern_name}")
            
            return LedPatternResponse(
                success=True,
                message=f"Successfully applied preset pattern: {request.pattern_name}",
                pattern_name=request.pattern_name,
                active=True
            )
        
        elif request.action == "test":
            # Start test pattern (rainbow cycle)
            success = self.neopixel.rainbow_cycle()
            if not success:
                raise LedPatternException("Failed to start test pattern")
            
            # Store active pattern info
            self.active_patterns["test"] = {
                "name": "rainbow_cycle",
                "duration": request.duration or 3000
            }
            
            return LedPatternResponse(
                success=True,
                message="Test pattern started successfully",
                pattern_name="rainbow_cycle",
                duration=request.duration or 3000,
                active=True
            )
        
        elif request.action == "stop":
            # Stop any active patterns
            success = self.neopixel.clear()
            if not success:
                raise LedPatternException("Failed to stop pattern")
            
            self.active_patterns.clear()
            
            return LedPatternResponse(
                success=True,
                message="Pattern stopped successfully",
                active=False
            )
        
        else:
            raise LedPatternException(f"Unknown LED pattern action: {request.action}")
    
    def _apply_preset_pattern(self, pattern_name: str, colors: Optional[List[str]]) -> bool:
        """Apply a preset LED pattern."""
        if not colors:
            # Default colors for common patterns
            pattern_colors = {
                "warm_white": ["#FFF8DC", "#F5DEB3", "#DDD"],
                "ocean_waves": ["#0077BE", "#00A8CC", "#40E0D0"],
                "sunset_fade": ["#FF6B35", "#F7931E", "#FFD23F"],
                "rainbow_cycle": ["#FF0000", "#00FF00", "#0000FF"],
                "breathing": ["#E8A87C", "#D2691E", "#8B4513"],
                "sparkle": ["#FFFFFF", "#FFD700", "#C0C0C0"]
            }
            colors = pattern_colors.get(pattern_name, ["#FFFFFF"])
        
        # Apply colors to LEDs in sequence
        for i in range(12):  # 12 LEDs in the ring
            color_index = i % len(colors)
            color_rgb = self._hex_to_rgb(colors[color_index])
            if not self.neopixel.set_pixel(i, color_rgb):
                return False
        
        return True
    
    def _hex_to_rgb(self, hex_color: str) -> tuple:
        """Convert hex color to RGB tuple."""
        hex_color = hex_color.lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))