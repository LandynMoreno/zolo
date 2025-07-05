"""Camera module constants for Arducam Module 3"""


class CameraConstants:
    """Camera configuration constants"""
    
    # Default camera settings
    DEFAULT_RESOLUTION: tuple = (1920, 1080)
    MAX_FPS: int = 30
    MIN_FPS: int = 1
    
    # Autofocus settings
    AUTOFOCUS_PIN: int = 22
    FOCUS_MIN: float = 0.0
    FOCUS_MAX: float = 1.0
    
    # Image format settings
    DEFAULT_FORMAT: str = 'RGB888'
    PREVIEW_FORMAT: str = 'XRGB8888'
    
    # Timing constants
    CAPTURE_TIMEOUT: float = 5.0
    PREVIEW_TIMEOUT: float = 2.0
    
    # Supported resolutions
    SUPPORTED_RESOLUTIONS: list = [
        (1920, 1080),  # Full HD
        (1280, 720),   # HD
        (640, 480),    # VGA
        (320, 240),    # QVGA
    ]