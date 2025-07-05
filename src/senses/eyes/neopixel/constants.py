"""NeoPixel ring constants for WS2812 RGB LEDs"""


class NeoPixelConstants:
    """NeoPixel configuration constants"""
    
    # Hardware settings
    DEFAULT_PIN: int = 18
    LED_COUNT: int = 12
    LED_FREQ_HZ: int = 800000  # LED signal frequency in Hz
    LED_DMA: int = 10          # DMA channel
    LED_INVERT: bool = False   # True to invert signal
    LED_CHANNEL: int = 0       # Set to '1' for GPIOs 13, 19, 41, 45 or 53
    
    # Brightness settings
    DEFAULT_BRIGHTNESS: float = 0.5
    MIN_BRIGHTNESS: float = 0.0
    MAX_BRIGHTNESS: float = 1.0
    BRIGHTNESS_STEP: float = 0.1
    
    # Color definitions (RGB tuples)
    COLOR_OFF: tuple = (0, 0, 0)
    COLOR_RED: tuple = (255, 0, 0)
    COLOR_GREEN: tuple = (0, 255, 0)
    COLOR_BLUE: tuple = (0, 0, 255)
    COLOR_WHITE: tuple = (255, 255, 255)
    COLOR_YELLOW: tuple = (255, 255, 0)
    COLOR_CYAN: tuple = (0, 255, 255)
    COLOR_MAGENTA: tuple = (255, 0, 255)
    COLOR_ORANGE: tuple = (255, 165, 0)
    COLOR_PURPLE: tuple = (128, 0, 128)
    COLOR_PINK: tuple = (255, 192, 203)
    
    # Status colors
    STATUS_READY: tuple = COLOR_GREEN
    STATUS_LISTENING: tuple = COLOR_BLUE
    STATUS_SPEAKING: tuple = COLOR_YELLOW
    STATUS_THINKING: tuple = COLOR_CYAN
    STATUS_ERROR: tuple = COLOR_RED
    STATUS_WARNING: tuple = COLOR_ORANGE
    STATUS_SLEEP: tuple = COLOR_PURPLE
    
    # Animation settings
    ANIMATION_SPEED_SLOW: float = 0.2
    ANIMATION_SPEED_MEDIUM: float = 0.1
    ANIMATION_SPEED_FAST: float = 0.05
    DEFAULT_ANIMATION_SPEED: float = ANIMATION_SPEED_MEDIUM
    
    # Pattern definitions
    PATTERN_SOLID: str = "solid"
    PATTERN_BREATHING: str = "breathing"
    PATTERN_RAINBOW: str = "rainbow"
    PATTERN_SPINNING: str = "spinning"
    PATTERN_PULSE: str = "pulse"
    PATTERN_CHASE: str = "chase"
    
    # Timing constants
    FRAME_DELAY: float = 0.016  # ~60 FPS
    PATTERN_TIMEOUT: float = 30.0
    
    # Rainbow cycle constants
    RAINBOW_STEPS: int = 256
    RAINBOW_SPEED: float = 0.01
    
    # Breathing effect constants
    BREATHING_MIN: float = 0.1
    BREATHING_MAX: float = 1.0
    BREATHING_STEPS: int = 50