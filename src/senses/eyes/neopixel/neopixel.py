"""
<summary>
Controls the 12-LED NeoPixel ring for visual feedback and status indication
</summary>
<hardware>NeoPixel Ring - 12 x WS2812 RGB LEDs connected to GPIO 18</hardware>
<dependencies>rpi_ws281x, adafruit-circuitpython-neopixel</dependencies>
"""

from typing import Tuple, List, Optional
import time
try:
    import board
    import neopixel
except ImportError:
    # Fallback for development environment
    board = None
    neopixel = None

from .constants import NeoPixelConstants


class NeoPixel:
    """
    <summary>
    Manages NeoPixel ring operations including colors, patterns, and animations
    </summary>
    """
    
    def __init__(self, pin_number: int = NeoPixelConstants.DEFAULT_PIN, led_count: int = NeoPixelConstants.LED_COUNT, brightness: float = NeoPixelConstants.DEFAULT_BRIGHTNESS) -> None:
        """
        <summary>Initialize NeoPixel controller with hardware configuration</summary>
        <param name="pin_number">GPIO pin number for data line</param>
        <param name="led_count">Number of LEDs in the ring</param>
        <param name="brightness">Initial brightness level (0.0-1.0)</param>
        <returns>None</returns>
        """
        self.pin_number = pin_number
        self.led_count = led_count
        self.brightness = brightness
        self.pixels = None
        self.is_initialized = False
        self.current_pattern = None
    
    def initialize(self) -> bool:
        """
        <summary>Initialize NeoPixel hardware and configuration</summary>
        <returns>True if successful, False otherwise</returns>
        """
        try:
            if board and neopixel:
                pin = getattr(board, f'D{self.pin_number}', None)
                if pin:
                    self.pixels = neopixel.NeoPixel(pin, self.led_count, brightness=self.brightness)
                    self.is_initialized = True
                    return True
            return False
        except Exception as e:
            print(f"NeoPixel initialization failed: {e}")
            return False
    
    def set_color(self, color: Tuple[int, int, int]) -> bool:
        """
        <summary>Set all LEDs to specified color</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        # Skeleton implementation
        return True
    
    def set_pixel(self, index: int, color: Tuple[int, int, int]) -> bool:
        """
        <summary>Set individual LED to specified color</summary>
        <param name="index">LED index (0-11)</param>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized or index >= self.led_count:
            return False
        
        # Skeleton implementation
        return True
    
    def clear(self) -> bool:
        """
        <summary>Turn off all LEDs</summary>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        # Skeleton implementation
        return True
    
    def set_brightness(self, brightness: float) -> bool:
        """
        <summary>Set overall brightness level</summary>
        <param name="brightness">Brightness level (0.0-1.0)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized or not (0.0 <= brightness <= 1.0):
            return False
        
        self.brightness = brightness
        return True
    
    def rainbow_cycle(self, speed: float = NeoPixelConstants.DEFAULT_ANIMATION_SPEED) -> bool:
        """
        <summary>Display rainbow color cycle animation</summary>
        <param name="speed">Animation speed (seconds between frames)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        # Skeleton implementation
        return True
    
    def breathing_effect(self, color: Tuple[int, int, int], speed: float = NeoPixelConstants.ANIMATION_SPEED_FAST) -> bool:
        """
        <summary>Display breathing effect with specified color</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <param name="speed">Animation speed (seconds between frames)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        # Skeleton implementation
        return True
    
    def spinning_dot(self, color: Tuple[int, int, int], speed: float = NeoPixelConstants.DEFAULT_ANIMATION_SPEED) -> bool:
        """
        <summary>Display spinning dot animation</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <param name="speed">Animation speed (seconds between frames)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        # Skeleton implementation
        return True
    
    def show_status(self, status: str) -> bool:
        """
        <summary>Display status-specific color pattern</summary>
        <param name="status">Status name (e.g., 'ready', 'listening', 'error')</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        # Skeleton implementation
        return True
    
    def cleanup(self) -> None:
        """
        <summary>Clean up NeoPixel resources and turn off all LEDs</summary>
        <returns>None</returns>
        """
        try:
            # Stop any running animations
            self.stop_animation()
            
            # Clear all LEDs
            if self.is_initialized:
                with self.animation_lock:
                    if self.pixel_strip:
                        for i in range(self.led_count):
                            self.pixel_strip.setPixelColor(i, Color(0, 0, 0))
                        self.pixel_strip.show()
                    elif self.pixels:
                        self.pixels.fill(NeoPixelConstants.COLOR_OFF)
                        self.pixels.show()
                        self.pixels.deinit()
            
            # Reset state
            self.pixels = None
            self.pixel_strip = None
            self.is_initialized = False
            
            print("NeoPixel cleanup completed")
            
        except Exception as e:
            print(f"Error during NeoPixel cleanup: {e}")
            self.is_initialized = False
    
    def show(self) -> bool:
        """
        <summary>Update the LED strip to show current pixel colors</summary>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        try:
            if self.pixel_strip:
                self.pixel_strip.show()
            elif self.pixels:
                self.pixels.show()
            return True
        except Exception as e:
            print(f"Error showing pixels: {e}")
            return False
    
    def start_animation(self, animation_func) -> bool:
        """
        <summary>Start an animation in a separate thread</summary>
        <param name="animation_func">Function to run as animation</param>
        <returns>True if started successfully, False otherwise</returns>
        """
        try:
            # Stop any existing animation
            self.stop_animation()
            
            # Start new animation
            self.animation_running = True
            self.animation_thread = threading.Thread(target=animation_func, daemon=True)
            self.animation_thread.start()
            return True
        except Exception as e:
            print(f"Error starting animation: {e}")
            return False
    
    def stop_animation(self) -> None:
        """
        <summary>Stop the current animation</summary>
        <returns>None</returns>
        """
        if self.animation_running:
            self.animation_running = False
            if self.animation_thread and self.animation_thread.is_alive():
                self.animation_thread.join(timeout=1.0)
            self.animation_thread = None
    
    def _wheel(self, pos: int) -> Tuple[int, int, int]:
        """
        <summary>Generate rainbow colors across 0-255 positions</summary>
        <param name="pos">Position (0-255)</param>
        <returns>RGB color tuple</returns>
        """
        pos = pos % 256
        if pos < 85:
            return (pos * 3, 255 - pos * 3, 0)
        elif pos < 170:
            pos -= 85
            return (255 - pos * 3, 0, pos * 3)
        else:
            pos -= 170
            return (0, pos * 3, 255 - pos * 3)
    
    def pulse_color(self, color: Tuple[int, int, int], duration: float = 1.0) -> bool:
        """
        <summary>Pulse a color for a specified duration</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <param name="duration">Duration in seconds</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        def pulse_animation():
            steps = int(duration / 0.05)  # 50ms per step
            for i in range(steps):
                if not self.animation_running:
                    break
                
                # Calculate pulse brightness
                brightness = (math.sin(i * math.pi / steps) + 1) / 2
                r, g, b = color
                pulsed_color = (int(r * brightness), int(g * brightness), int(b * brightness))
                
                with self.animation_lock:
                    self.set_color(pulsed_color)
                    self.show()
                
                time.sleep(0.05)
            
            # Clear after pulse
            with self.animation_lock:
                self.clear()
        
        return self.start_animation(pulse_animation)