"""
LED Manager for business logic and hardware coordination
"""

from typing import Dict, Any, Optional
from ..models.led import (
    LEDColorRequest, LEDColorResponse,
    LEDPatternRequest, LEDPatternResponse,
    LEDBrightnessRequest, LEDBrightnessResponse,
    LEDPresetsRequest, LEDPresetsResponse
)
from ..exceptions.led import LEDException, LEDValidationException, LEDHardwareException
from ..logging.decorators import log_manager_call
from ...senses.eyes.neopixel.neopixel import NeoPixel
from ...senses.eyes.neopixel.constants import NeoPixelConstants


class LEDManager:
    """
    LED Manager handles LED-related business logic and hardware coordination
    Following the C# pattern: Controller -> Manager -> Hardware
    """
    
    def __init__(self, neopixel: NeoPixel):
        """
        Initialize LED Manager with NeoPixel dependency
        
        Args:
            neopixel: NeoPixel hardware controller instance
        """
        self.neopixel = neopixel
        self.current_pattern = None
        self.current_brightness = 1.0
    
    @log_manager_call("HandleSetLEDColor")
    def handle_set_led_color(self, request: LEDColorRequest) -> LEDColorResponse:
        """
        Handle LED color setting request
        
        Args:
            request: LED color request
            
        Returns:
            LEDColorResponse: Response with operation result
            
        Raises:
            LEDValidationException: If request validation fails
            LEDHardwareException: If hardware operation fails
        """
        try:
            # Validate request
            validation_result = request.validate("LEDColorRequest", "create")
            if not validation_result.is_valid:
                raise LEDValidationException(
                    message=f"Invalid LED color request: {'; '.join(validation_result.errors)}",
                    context={'validation_errors': validation_result.errors}
                )
            
            # Convert hex color to RGB tuple
            color_rgb = self._hex_to_rgb(request.color)
            
            # Set LED color via hardware
            success = self.neopixel.set_pixel(request.led_index, color_rgb)
            if not success:
                raise LEDHardwareException(
                    message=f"Failed to set LED {request.led_index} to color {request.color}",
                    led_index=request.led_index,
                    context={'color': request.color, 'brightness': request.brightness}
                )
            
            # Update brightness if needed
            if request.brightness != self.current_brightness:
                brightness_success = self.neopixel.set_brightness(request.brightness)
                if not brightness_success:
                    raise LEDHardwareException(
                        message=f"Failed to set brightness to {request.brightness}",
                        context={'brightness': request.brightness}
                    )
                self.current_brightness = request.brightness
            
            # Create successful response
            response = LEDColorResponse(request)
            response.set_success(
                message=f"Successfully set LED {request.led_index} to color {request.color}",
                data={
                    'led_index': request.led_index,
                    'color': request.color,
                    'brightness': request.brightness
                }
            )
            
            return response
            
        except (LEDValidationException, LEDHardwareException):
            raise
        except Exception as e:
            raise LEDHardwareException(
                message=f"Unexpected error setting LED color: {str(e)}",
                led_index=request.led_index,
                inner_exception=e
            )
    
    @log_manager_call("HandleLEDPattern")
    def handle_led_pattern(self, request: LEDPatternRequest) -> LEDPatternResponse:
        """
        Handle LED pattern request
        
        Args:
            request: LED pattern request
            
        Returns:
            LEDPatternResponse: Response with operation result
            
        Raises:
            LEDValidationException: If request validation fails
            LEDHardwareException: If hardware operation fails
        """
        try:
            # Validate request
            validation_result = request.validate("LEDPatternRequest", "create")
            if not validation_result.is_valid:
                raise LEDValidationException(
                    message=f"Invalid LED pattern request: {'; '.join(validation_result.errors)}",
                    context={'validation_errors': validation_result.errors}
                )
            
            # Execute pattern based on type
            success = self._execute_pattern(request.pattern, request)
            if not success:
                raise LEDHardwareException(
                    message=f"Failed to execute pattern: {request.pattern}",
                    context={'pattern': request.pattern, 'duration': request.duration}
                )
            
            # Update current pattern
            self.current_pattern = request.pattern if request.pattern not in ['clear', 'stop'] else None
            
            # Create successful response
            response = LEDPatternResponse(request)
            response.set_success(
                message=f"Successfully applied pattern: {request.pattern}",
                data={
                    'pattern': request.pattern,
                    'duration': request.duration,
                    'active': self.current_pattern is not None
                }
            )
            
            return response
            
        except (LEDValidationException, LEDHardwareException):
            raise
        except Exception as e:
            raise LEDHardwareException(
                message=f"Unexpected error executing pattern: {str(e)}",
                context={'pattern': request.pattern},
                inner_exception=e
            )
    
    @log_manager_call("HandleLEDBrightness")
    def handle_led_brightness(self, request: LEDBrightnessRequest) -> LEDBrightnessResponse:
        """
        Handle LED brightness request
        
        Args:
            request: LED brightness request
            
        Returns:
            LEDBrightnessResponse: Response with operation result
            
        Raises:
            LEDValidationException: If request validation fails
            LEDHardwareException: If hardware operation fails
        """
        try:
            # Validate request
            validation_result = request.validate("LEDBrightnessRequest", "create")
            if not validation_result.is_valid:
                raise LEDValidationException(
                    message=f"Invalid LED brightness request: {'; '.join(validation_result.errors)}",
                    context={'validation_errors': validation_result.errors}
                )
            
            # Set brightness via hardware
            success = self.neopixel.set_brightness(request.brightness)
            if not success:
                raise LEDHardwareException(
                    message=f"Failed to set brightness to {request.brightness}",
                    context={'brightness': request.brightness}
                )
            
            # Update current brightness
            self.current_brightness = request.brightness
            
            # Create successful response
            response = LEDBrightnessResponse(request)
            response.set_success(
                message=f"Successfully set brightness to {request.brightness * 100}%",
                data={'brightness': request.brightness}
            )
            
            return response
            
        except (LEDValidationException, LEDHardwareException):
            raise
        except Exception as e:
            raise LEDHardwareException(
                message=f"Unexpected error setting brightness: {str(e)}",
                context={'brightness': request.brightness},
                inner_exception=e
            )
    
    @log_manager_call("HandleLEDPresets")
    def handle_led_presets(self, request: LEDPresetsRequest) -> LEDPresetsResponse:
        """
        Handle LED presets request
        
        Args:
            request: LED presets request
            
        Returns:
            LEDPresetsResponse: Response with operation result
            
        Raises:
            LEDValidationException: If request validation fails
            LEDHardwareException: If hardware operation fails
        """
        try:
            # Validate request
            validation_result = request.validate("LEDPresetsRequest", "create")
            if not validation_result.is_valid:
                raise LEDValidationException(
                    message=f"Invalid LED presets request: {'; '.join(validation_result.errors)}",
                    context={'validation_errors': validation_result.errors}
                )
            
            # Set brightness first
            brightness_success = self.neopixel.set_brightness(request.brightness)
            if not brightness_success:
                raise LEDHardwareException(
                    message=f"Failed to set brightness for preset {request.preset_name}",
                    context={'preset_name': request.preset_name, 'brightness': request.brightness}
                )
            
            # Apply colors to LEDs
            for led_index in range(NeoPixelConstants.LED_COUNT):
                color_index = led_index % len(request.colors)
                color_rgb = self._hex_to_rgb(request.colors[color_index])
                
                success = self.neopixel.set_pixel(led_index, color_rgb)
                if not success:
                    raise LEDHardwareException(
                        message=f"Failed to set LED {led_index} for preset {request.preset_name}",
                        led_index=led_index,
                        context={'preset_name': request.preset_name, 'color': request.colors[color_index]}
                    )
            
            # Update current state
            self.current_brightness = request.brightness
            self.current_pattern = f"preset_{request.preset_name}"
            
            # Create successful response
            response = LEDPresetsResponse(request)
            response.set_success(
                message=f"Successfully applied preset: {request.preset_name}",
                data={
                    'preset_name': request.preset_name,
                    'colors': request.colors,
                    'brightness': request.brightness
                }
            )
            
            return response
            
        except (LEDValidationException, LEDHardwareException):
            raise
        except Exception as e:
            raise LEDHardwareException(
                message=f"Unexpected error applying preset: {str(e)}",
                context={'preset_name': request.preset_name},
                inner_exception=e
            )
    
    def _hex_to_rgb(self, hex_color: str) -> tuple:
        """Convert hex color to RGB tuple"""
        hex_color = hex_color.lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    
    def _execute_pattern(self, pattern: str, request: LEDPatternRequest) -> bool:
        """Execute specific LED pattern"""
        if pattern == 'clear' or pattern == 'stop':
            return self.neopixel.clear()
        elif pattern == 'test':
            # Simple test pattern - could be enhanced
            return self.neopixel.rainbow_cycle(request.speed or NeoPixelConstants.DEFAULT_ANIMATION_SPEED)
        elif pattern == 'rainbow':
            return self.neopixel.rainbow_cycle(request.speed or NeoPixelConstants.DEFAULT_ANIMATION_SPEED)
        elif pattern == 'breathing':
            if request.colors:
                color_rgb = self._hex_to_rgb(request.colors[0])
                return self.neopixel.breathing_effect(color_rgb, request.speed or NeoPixelConstants.ANIMATION_SPEED_FAST)
            else:
                # Default to warm white
                return self.neopixel.breathing_effect(NeoPixelConstants.WARM_WHITE, request.speed or NeoPixelConstants.ANIMATION_SPEED_FAST)
        elif pattern == 'spinning':
            if request.colors:
                color_rgb = self._hex_to_rgb(request.colors[0])
                return self.neopixel.spinning_dot(color_rgb, request.speed or NeoPixelConstants.DEFAULT_ANIMATION_SPEED)
            else:
                return self.neopixel.spinning_dot(NeoPixelConstants.PRIMARY_BLUE, request.speed or NeoPixelConstants.DEFAULT_ANIMATION_SPEED)
        elif pattern == 'solid':
            if request.colors:
                color_rgb = self._hex_to_rgb(request.colors[0])
                return self.neopixel.set_color(color_rgb)
            else:
                return self.neopixel.set_color(NeoPixelConstants.WARM_WHITE)
        else:
            return False