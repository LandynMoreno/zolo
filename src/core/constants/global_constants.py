"""Global constants for Zolo robot system"""


class ZoloConstants:
    """Global system constants"""
    
    # Project information
    PROJECT_NAME: str = "Zolo"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Modular robot head with integrated sensors and AI capabilities"
    
    # System timeouts and retries
    MAX_SENSOR_RETRIES: int = 3
    DEFAULT_TIMEOUT: float = 5.0
    INITIALIZATION_TIMEOUT: float = 10.0
    SHUTDOWN_TIMEOUT: float = 30.0
    
    # System states
    STATE_IDLE: str = "idle"
    STATE_INITIALIZING: str = "initializing"
    STATE_READY: str = "ready"
    STATE_LISTENING: str = "listening"
    STATE_PROCESSING: str = "processing"
    STATE_RESPONDING: str = "responding"
    STATE_ERROR: str = "error"
    STATE_SHUTDOWN: str = "shutdown"
    
    # Log levels
    LOG_LEVEL_DEBUG: str = "DEBUG"
    LOG_LEVEL_INFO: str = "INFO"
    LOG_LEVEL_WARNING: str = "WARNING"
    LOG_LEVEL_ERROR: str = "ERROR"
    LOG_LEVEL_CRITICAL: str = "CRITICAL"
    DEFAULT_LOG_LEVEL: str = LOG_LEVEL_INFO
    
    # File paths
    LOG_FILE_PATH: str = "/var/log/zolo/zolo.log"
    CONFIG_FILE_PATH: str = "/etc/zolo/config.yaml"
    CACHE_DIR: str = "/var/cache/zolo"
    
    # Performance settings
    MAX_THREADS: int = 4
    MAX_QUEUE_SIZE: int = 100
    WATCHDOG_TIMEOUT: float = 60.0