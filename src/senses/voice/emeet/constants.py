"""Speaker constants for EMEET M0 Plus"""


class SpeakerConstants:
    """Speaker configuration constants"""
    
    # Audio settings
    DEFAULT_SAMPLE_RATE: int = 44100
    DEFAULT_CHANNELS: int = 2
    DEFAULT_CHUNK_SIZE: int = 1024
    
    # Audio format settings
    AUDIO_FORMAT: int = 16  # 16-bit PCM
    BYTES_PER_SAMPLE: int = 2
    
    # Volume settings
    MIN_VOLUME: float = 0.0
    MAX_VOLUME: float = 1.0
    DEFAULT_VOLUME: float = 0.5
    VOLUME_STEP: float = 0.1
    
    # Playback parameters
    MAX_PLAYBACK_DURATION: float = 300.0  # 5 minutes
    DEFAULT_PLAYBACK_DURATION: float = 30.0
    
    # Tone generation
    MIN_FREQUENCY: float = 20.0   # Hz
    MAX_FREQUENCY: float = 20000.0  # Hz
    DEFAULT_FREQUENCY: float = 440.0  # A4 note
    
    # Timing constants
    PLAYBACK_TIMEOUT: float = 60.0
    INITIALIZATION_TIMEOUT: float = 5.0
    
    # Buffer settings
    BUFFER_SIZE: int = 4096
    MAX_BUFFER_SIZE: int = 32768
    
    # Audio quality settings
    BITRATE: int = 320  # kbps
    QUALITY: str = "high"