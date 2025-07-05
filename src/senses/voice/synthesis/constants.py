"""Text-to-speech synthesis constants"""


class SynthesisConstants:
    """Text-to-speech configuration constants"""
    
    # Voice settings
    DEFAULT_RATE: int = 200  # words per minute
    MIN_RATE: int = 50
    MAX_RATE: int = 500
    RATE_STEP: int = 25
    
    # Volume settings
    DEFAULT_VOLUME: float = 0.8
    MIN_VOLUME: float = 0.0
    MAX_VOLUME: float = 1.0
    VOLUME_STEP: float = 0.1
    
    # Voice types
    VOICE_MALE: str = "male"
    VOICE_FEMALE: str = "female"
    VOICE_CHILD: str = "child"
    DEFAULT_VOICE_TYPE: str = VOICE_MALE
    
    # Language settings
    DEFAULT_LANGUAGE: str = "en"
    SUPPORTED_LANGUAGES: list = [
        "en", "es", "fr", "de", "it", "pt", "ru", "ja", "ko", "zh", "ar"
    ]
    
    # Audio format settings
    AUDIO_FORMAT: str = "wav"
    SAMPLE_RATE: int = 22050
    CHANNELS: int = 1
    BITRATE: int = 128
    
    # Text processing
    MAX_TEXT_LENGTH: int = 1000
    MIN_TEXT_LENGTH: int = 1
    SENTENCE_PAUSE: float = 0.5  # seconds
    PARAGRAPH_PAUSE: float = 1.0  # seconds
    
    # Timing constants
    SYNTHESIS_TIMEOUT: float = 30.0
    INITIALIZATION_TIMEOUT: float = 5.0
    
    # Common responses
    GREETING_RESPONSES: list = [
        "Hello! I'm Zolo, your robot companion.",
        "Hi there! How can I help you today?",
        "Greetings! I'm ready to assist you.",
        "Hello! Nice to meet you!"
    ]
    
    CONFIRMATION_RESPONSES: list = [
        "Understood.",
        "Got it.",
        "I'll do that for you.",
        "Consider it done."
    ]
    
    ERROR_RESPONSES: list = [
        "I'm sorry, I didn't understand that.",
        "Could you please repeat that?",
        "I'm having trouble understanding.",
        "Let me try that again."
    ]