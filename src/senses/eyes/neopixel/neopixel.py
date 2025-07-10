"""
<summary>
Controls the 12-LED NeoPixel ring for visual feedback and status indication
</summary>
<hardware>NeoPixel Ring - 12 x WS2812 RGB LEDs connected to GPIO 18</hardware>
<dependencies>rpi_ws281x, adafruit-circuitpython-neopixel</dependencies>
"""

from typing import Tuple, List, Optional
import time
import threading
import math
try:
    import board
    import neopixel
    from rpi_ws281x import PixelStrip, Color
    WS281X_AVAILABLE = True
except ImportError:
    # Fallback for development environment
    board = None
    neopixel = None
    PixelStrip = None
    Color = None
    WS281X_AVAILABLE = False

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
        self.pixel_strip = None
        self.is_initialized = False
        self.current_pattern = None
        self.animation_running = False
        self.animation_thread = None
        self.animation_lock = threading.Lock()
    
    def initialize(self) -> bool:
        """
        <summary>Initialize NeoPixel hardware and configuration</summary>
        <returns>True if successful, False otherwise</returns>
        """
        try:
            if not WS281X_AVAILABLE:
                print("NeoPixel libraries not available - running in mock mode")
                self.is_initialized = True
                return True
            
            # Try rpi_ws281x first (more performant)
            if PixelStrip and Color:
                try:
                    self.pixel_strip = PixelStrip(
                        self.led_count,
                        self.pin_number,
                        800000,  # LED signal frequency in hertz
                        10,      # DMA channel
                        False,   # Invert signal
                        int(self.brightness * 255)  # Brightness
                    )
                    self.pixel_strip.begin()
                    self.is_initialized = True
                    print("NeoPixel initialized with rpi_ws281x")
                    return True
                except Exception as e:
                    print(f"rpi_ws281x initialization failed: {e}")
            
            # Fallback to CircuitPython
            if board and neopixel:
                pin = getattr(board, f'D{self.pin_number}', None)
                if pin:
                    self.pixels = neopixel.NeoPixel(pin, self.led_count, brightness=self.brightness)
                    self.is_initialized = True
                    print("NeoPixel initialized with CircuitPython")
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
        
        try:
            r, g, b = color
            
            if self.pixel_strip:
                # Using rpi_ws281x
                for i in range(self.led_count):
                    self.pixel_strip.setPixelColor(i, Color(r, g, b))
                self.pixel_strip.show()
            elif self.pixels:
                # Using CircuitPython
                self.pixels.fill((r, g, b))
                self.pixels.show()
            else:
                # Mock mode
                print(f"Mock: Setting all LEDs to RGB({r}, {g}, {b})")
            
            return True
        except Exception as e:
            print(f"Error setting color: {e}")
            return False
    
    def set_pixel(self, index: int, color: Tuple[int, int, int]) -> bool:
        """
        <summary>Set individual LED to specified color</summary>
        <param name="index">LED index (0-11)</param>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized or index >= self.led_count or index < 0:
            return False
        
        try:
            r, g, b = color
            
            if self.pixel_strip:
                # Using rpi_ws281x
                self.pixel_strip.setPixelColor(index, Color(r, g, b))
                self.pixel_strip.show()
            elif self.pixels:
                # Using CircuitPython
                self.pixels[index] = (r, g, b)
                self.pixels.show()
            else:
                # Mock mode
                print(f"Mock: Setting LED {index} to RGB({r}, {g}, {b})")
            
            return True
        except Exception as e:
            print(f"Error setting pixel {index}: {e}")
            return False
    
    def clear(self) -> bool:
        """
        <summary>Turn off all LEDs</summary>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        try:
            if self.pixel_strip:
                # Using rpi_ws281x
                for i in range(self.led_count):
                    self.pixel_strip.setPixelColor(i, Color(0, 0, 0))
                self.pixel_strip.show()
            elif self.pixels:
                # Using CircuitPython
                self.pixels.fill((0, 0, 0))
                self.pixels.show()
            else:
                # Mock mode
                print("Mock: Clearing all LEDs")
            
            return True
        except Exception as e:
            print(f"Error clearing LEDs: {e}")
            return False
    
    def set_brightness(self, brightness: float) -> bool:
        """
        <summary>Set overall brightness level</summary>
        <param name="brightness">Brightness level (0.0-1.0)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized or not (0.0 <= brightness <= 1.0):
            return False
        
        try:
            self.brightness = brightness
            
            if self.pixel_strip:
                # Using rpi_ws281x
                self.pixel_strip.setBrightness(int(brightness * 255))
                self.pixel_strip.show()
            elif self.pixels:
                # Using CircuitPython
                self.pixels.brightness = brightness
                self.pixels.show()
            else:
                # Mock mode
                print(f"Mock: Setting brightness to {brightness}")
            
            return True
        except Exception as e:
            print(f"Error setting brightness: {e}")
            return False
    
    def rainbow_cycle(self, speed: float = NeoPixelConstants.DEFAULT_ANIMATION_SPEED) -> bool:
        """
        <summary>Display rainbow color cycle animation</summary>
        <param name="speed">Animation speed (seconds between frames)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        def rainbow_animation():
            j = 0
            while self.animation_running:
                with self.animation_lock:
                    for i in range(self.led_count):
                        if not self.animation_running:
                            break
                        
                        # Calculate color for this pixel
                        pixel_index = int((i * 256 / self.led_count) + j) & 255
                        color = self._wheel(pixel_index)
                        
                        if self.pixel_strip:
                            self.pixel_strip.setPixelColor(i, Color(*color))
                        elif self.pixels:
                            self.pixels[i] = color
                        else:
                            print(f"Mock: LED {i} = {color}")
                    
                    self.show()
                
                j = (j + 1) % 256
                time.sleep(speed)
        
        return self.start_animation(rainbow_animation)
    
    def breathing_effect(self, color: Tuple[int, int, int], speed: float = NeoPixelConstants.ANIMATION_SPEED_FAST) -> bool:
        """
        <summary>Display breathing effect with specified color</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <param name="speed">Animation speed (seconds between frames)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        def breathing_animation():
            while self.animation_running:
                # Fade in
                for brightness in range(0, 256, 5):
                    if not self.animation_running:
                        break
                    
                    with self.animation_lock:
                        r, g, b = color
                        adjusted_color = (
                            int(r * brightness / 255),
                            int(g * brightness / 255),
                            int(b * brightness / 255)
                        )
                        self.set_color(adjusted_color)
                    
                    time.sleep(speed)
                
                # Fade out
                for brightness in range(255, -1, -5):
                    if not self.animation_running:
                        break
                    
                    with self.animation_lock:
                        r, g, b = color
                        adjusted_color = (
                            int(r * brightness / 255),
                            int(g * brightness / 255),
                            int(b * brightness / 255)
                        )
                        self.set_color(adjusted_color)
                    
                    time.sleep(speed)
        
        return self.start_animation(breathing_animation)
    
    def spinning_dot(self, color: Tuple[int, int, int], speed: float = NeoPixelConstants.DEFAULT_ANIMATION_SPEED) -> bool:
        """
        <summary>Display spinning dot animation</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <param name="speed">Animation speed (seconds between frames)</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        def spinning_animation():
            position = 0
            while self.animation_running:
                with self.animation_lock:
                    # Clear all LEDs
                    self.clear()
                    
                    # Set the spinning dot
                    self.set_pixel(position, color)
                
                position = (position + 1) % self.led_count
                time.sleep(speed)
        
        return self.start_animation(spinning_animation)
    
    def show_status(self, status: str) -> bool:
        """
        <summary>Display status-specific color pattern</summary>
        <param name="status">Status name (e.g., 'ready', 'listening', 'error')</param>
        <returns>True if successful, False otherwise</returns>
        """
        if not self.is_initialized:
            return False
        
        status_colors = {
            'ready': (0, 255, 0),      # Green
            'listening': (0, 0, 255),   # Blue
            'processing': (255, 255, 0), # Yellow
            'error': (255, 0, 0),       # Red
            'warning': (255, 165, 0),   # Orange
            'off': (0, 0, 0),           # Black
            'success': (0, 255, 0),     # Green
            'failed': (255, 0, 0),      # Red
        }
        
        color = status_colors.get(status.lower(), (255, 255, 255))  # Default to white
        
        if status.lower() in ['listening', 'processing']:
            # Use breathing effect for active states
            return self.breathing_effect(color)
        else:
            # Use solid color for static states
            return self.set_color(color)
    
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
                        self.pixels.fill((0, 0, 0))
                        self.pixels.show()
                        self.pixels.deinit()
                    else:
                        print("Mock: Cleanup - all LEDs off")
            
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
            else:
                print("Mock: Showing LED updates")
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
                
                # Calculate pulse brightness using sine wave
                brightness = (math.sin(i * 2 * math.pi / steps) + 1) / 2
                r, g, b = color
                pulsed_color = (int(r * brightness), int(g * brightness), int(b * brightness))
                
                with self.animation_lock:
                    self.set_color(pulsed_color)
                
                time.sleep(0.05)
            
            # Clear after pulse
            with self.animation_lock:
                self.clear()
        
        return self.start_animation(pulse_animation)