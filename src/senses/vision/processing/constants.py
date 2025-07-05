"""Image processing constants for OpenCV operations"""


class ProcessingConstants:
    """Image processing configuration constants"""
    
    # Edge detection parameters
    CANNY_THRESHOLD_LOW: int = 50
    CANNY_THRESHOLD_HIGH: int = 150
    CANNY_APERTURE_SIZE: int = 3
    
    # Blur and noise reduction
    GAUSSIAN_KERNEL_SIZE: int = 5
    GAUSSIAN_SIGMA_X: float = 0.0
    GAUSSIAN_SIGMA_Y: float = 0.0
    
    # Contrast enhancement
    CONTRAST_ALPHA: float = 1.5  # Contrast control (1.0-3.0)
    CONTRAST_BETA: int = 0       # Brightness control (0-100)
    
    # Object detection parameters
    MIN_OBJECT_AREA: int = 100
    MAX_OBJECT_AREA: int = 10000
    DETECTION_THRESHOLD: float = 0.5
    
    # Face detection parameters
    FACE_CASCADE_PATH: str = '/usr/share/opencv/haarcascades/haarcascade_frontalface_default.xml'
    FACE_SCALE_FACTOR: float = 1.1
    FACE_MIN_NEIGHBORS: int = 3
    FACE_MIN_SIZE: tuple = (30, 30)
    
    # Image format constants
    DEFAULT_CHANNELS: int = 3
    GRAYSCALE_CHANNELS: int = 1
    
    # Processing timeouts
    PROCESSING_TIMEOUT: float = 2.0