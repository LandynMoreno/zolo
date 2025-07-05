"""VL53L0X distance sensor constants"""


class DistanceConstants:
    """Distance sensor configuration constants"""
    
    # I2C settings
    DEFAULT_I2C_ADDRESS: int = 0x29
    I2C_BUS: int = 1
    
    # Measurement settings
    MIN_DISTANCE_MM: float = 30.0
    MAX_DISTANCE_MM: float = 2000.0
    ACCURACY_HIGH: str = "high"
    ACCURACY_BETTER: str = "better"
    ACCURACY_LONG_RANGE: str = "long_range"
    DEFAULT_ACCURACY: str = ACCURACY_BETTER
    
    # Timing budget settings (microseconds)
    TIMING_BUDGET_MIN: int = 20000
    TIMING_BUDGET_MAX: int = 1000000
    TIMING_BUDGET_DEFAULT: int = 33000
    TIMING_BUDGET_FAST: int = 20000
    TIMING_BUDGET_ACCURATE: int = 200000
    
    # Detection thresholds
    PROXIMITY_THRESHOLD_CM: float = 30.0
    CLOSE_THRESHOLD_CM: float = 10.0
    VERY_CLOSE_THRESHOLD_CM: float = 5.0
    
    # Measurement modes
    MODE_SINGLE: str = "single"
    MODE_CONTINUOUS: str = "continuous"
    DEFAULT_MODE: str = MODE_SINGLE
    
    # Calibration settings
    CALIBRATION_SAMPLES: int = 10
    CALIBRATION_TIMEOUT: float = 10.0
    
    # Error handling
    MAX_RETRIES: int = 3
    RETRY_DELAY: float = 0.1
    MEASUREMENT_TIMEOUT: float = 1.0
    
    # Range categories
    RANGE_VERY_CLOSE: str = "very_close"    # < 5 cm
    RANGE_CLOSE: str = "close"              # 5-30 cm
    RANGE_MEDIUM: str = "medium"            # 30-100 cm
    RANGE_FAR: str = "far"                  # 100-200 cm
    RANGE_OUT_OF_RANGE: str = "out_of_range"  # > 200 cm
    
    # Status codes
    STATUS_OK: int = 0
    STATUS_ERROR: int = 1
    STATUS_TIMEOUT: int = 2
    STATUS_NOT_INITIALIZED: int = 3