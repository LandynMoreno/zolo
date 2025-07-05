"""Microphone constants for EMEET M0 Plus"""


class MicrophoneConstants:
    """Microphone configuration constants"""
    
    # Audio settings
    DEFAULT_SAMPLE_RATE: int = 44100
    DEFAULT_CHANNELS: int = 1
    DEFAULT_CHUNK_SIZE: int = 1024
    
    # Audio format settings
    AUDIO_FORMAT: int = 16  # 16-bit PCM
    BYTES_PER_SAMPLE: int = 2
    
    # Recording parameters
    MAX_RECORDING_DURATION: float = 60.0  # seconds
    DEFAULT_RECORDING_DURATION: float = 5.0
    
    # Audio detection
    SILENCE_THRESHOLD: float = 0.01
    AUDIO_THRESHOLD: float = 0.1
    NOISE_GATE_THRESHOLD: float = 0.05
    
    # Gain settings
    MIN_GAIN: float = 0.0
    MAX_GAIN: float = 1.0
    DEFAULT_GAIN: float = 0.5
    
    # Timing constants
    RECORDING_TIMEOUT: float = 30.0
    INITIALIZATION_TIMEOUT: float = 5.0
    
    # Buffer settings
    BUFFER_SIZE: int = 4096
    MAX_BUFFER_SIZE: int = 32768