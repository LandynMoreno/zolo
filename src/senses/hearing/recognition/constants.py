"""Speech recognition constants"""


class RecognitionConstants:
    """Speech recognition configuration constants"""
    
    # Language settings
    DEFAULT_LANGUAGE: str = 'en-US'
    SUPPORTED_LANGUAGES: list = [
        'en-US', 'en-GB', 'en-CA', 'en-AU',
        'es-ES', 'es-MX', 'fr-FR', 'de-DE',
        'it-IT', 'pt-BR', 'ru-RU', 'ja-JP',
        'ko-KR', 'zh-CN', 'ar-SA'
    ]
    
    # Recognition settings
    RECOGNITION_TIMEOUT: float = 5.0
    PHRASE_TIMEOUT: float = 1.0
    PAUSE_THRESHOLD: float = 0.8
    
    # Audio processing
    ENERGY_THRESHOLD: int = 300
    DYNAMIC_ENERGY_THRESHOLD: bool = True
    DYNAMIC_ENERGY_ADJUSTMENT_DAMPING: float = 0.15
    DYNAMIC_ENERGY_RATIO: float = 1.5
    
    # Wake word detection
    DEFAULT_WAKE_WORD: str = "zolo"
    WAKE_WORD_THRESHOLD: float = 0.7
    WAKE_WORD_TIMEOUT: float = 1.0
    
    # Voice command settings
    COMMAND_TIMEOUT: float = 10.0
    MAX_COMMAND_LENGTH: int = 100
    MIN_COMMAND_LENGTH: int = 2
    
    # Recognition engines
    GOOGLE_ENGINE: str = "google"
    SPHINX_ENGINE: str = "sphinx"
    WHISPER_ENGINE: str = "whisper"
    DEFAULT_ENGINE: str = GOOGLE_ENGINE
    
    # Common voice commands
    COMMON_COMMANDS: list = [
        "hello", "hi", "hey", "wake up",
        "lights on", "lights off", "brightness up", "brightness down",
        "play music", "stop music", "volume up", "volume down",
        "what time is it", "weather", "status",
        "shutdown", "restart", "sleep"
    ]