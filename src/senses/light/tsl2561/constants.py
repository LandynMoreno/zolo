"""TSL2561 light sensor constants"""


class LightConstants:
    """Light sensor configuration constants"""
    
    # I2C settings
    DEFAULT_I2C_ADDRESS: int = 0x39
    ALTERNATIVE_I2C_ADDRESS: int = 0x49
    I2C_BUS: int = 1
    
    # Gain settings
    GAIN_LOW: int = 1
    GAIN_HIGH: int = 16
    DEFAULT_GAIN: int = GAIN_LOW
    
    # Integration time settings (milliseconds)
    INTEGRATION_TIME_FAST: int = 13
    INTEGRATION_TIME_MEDIUM: int = 101
    INTEGRATION_TIME_SLOW: int = 402
    DEFAULT_INTEGRATION_TIME: int = INTEGRATION_TIME_MEDIUM
    
    # Light level thresholds (lux)
    THRESHOLD_DARK: float = 1.0
    THRESHOLD_DIM: float = 10.0
    THRESHOLD_BRIGHT: float = 100.0
    THRESHOLD_VERY_BRIGHT: float = 1000.0
    
    # Light level categories
    LEVEL_DARK: str = "dark"
    LEVEL_DIM: str = "dim"
    LEVEL_BRIGHT: str = "bright"
    LEVEL_VERY_BRIGHT: str = "very_bright"
    LEVEL_UNKNOWN: str = "unknown"
    
    # Measurement ranges
    MIN_LUX: float = 0.0
    MAX_LUX: float = 40000.0
    
    # Calibration settings
    CALIBRATION_SAMPLES: int = 10
    CALIBRATION_TIMEOUT: float = 10.0
    
    # Error handling
    MAX_RETRIES: int = 3
    RETRY_DELAY: float = 0.1
    MEASUREMENT_TIMEOUT: float = 1.0
    
    # Common light levels for reference
    MOONLIGHT: float = 0.1
    CANDLE: float = 1.0
    INDOOR_LIGHTING: float = 100.0
    OFFICE_LIGHTING: float = 500.0
    OVERCAST_DAY: float = 1000.0
    SUNNY_DAY: float = 10000.0
    DIRECT_SUNLIGHT: float = 100000.0
    
    # Status codes
    STATUS_OK: int = 0
    STATUS_ERROR: int = 1
    STATUS_TIMEOUT: int = 2
    STATUS_NOT_INITIALIZED: int = 3
    STATUS_SATURATED: int = 4