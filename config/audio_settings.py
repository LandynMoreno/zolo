"""Audio device settings and configuration for EMEET M0 Plus"""

from typing import Dict, Any, Optional, List


class AudioSettings:
    """Audio configuration settings for EMEET M0 Plus speakerphone"""
    
    # Device identification
    DEVICE_NAME: str = "EMEET M0 Plus"
    DEVICE_TYPE: str = "USB Conference Speakerphone"
    
    # Audio format settings
    SAMPLE_RATE: int = 44100
    SAMPLE_RATES_SUPPORTED: List[int] = [8000, 16000, 22050, 44100, 48000]
    
    # Channel configuration
    INPUT_CHANNELS: int = 1    # Mono microphone
    OUTPUT_CHANNELS: int = 2   # Stereo speakers
    
    # Bit depth settings
    BIT_DEPTH: int = 16
    BYTES_PER_SAMPLE: int = 2
    
    # Buffer settings
    BUFFER_SIZE: int = 4096
    BUFFER_COUNT: int = 4
    CHUNK_SIZE: int = 1024
    
    # Volume settings
    DEFAULT_INPUT_VOLUME: float = 0.7
    DEFAULT_OUTPUT_VOLUME: float = 0.6
    MIN_VOLUME: float = 0.0
    MAX_VOLUME: float = 1.0
    VOLUME_STEP: float = 0.1
    
    # Microphone settings
    MIC_GAIN: float = 0.8
    MIC_SENSITIVITY: float = 0.7
    NOISE_GATE_THRESHOLD: float = 0.02
    AGC_ENABLED: bool = True
    ECHO_CANCELLATION: bool = True
    
    # Speaker settings
    SPEAKER_BOOST: bool = False
    BASS_BOOST: float = 0.0
    TREBLE_BOOST: float = 0.0
    SPEAKER_PROTECTION: bool = True
    
    # Recording settings
    RECORDING_QUALITY: str = "high"
    RECORDING_FORMAT: str = "wav"
    MAX_RECORDING_TIME: int = 300  # seconds
    
    # Playback settings
    PLAYBACK_QUALITY: str = "high"
    CROSSFADE_ENABLED: bool = False
    GAPLESS_PLAYBACK: bool = True
    
    # Communication settings
    FULL_DUPLEX: bool = True
    HALF_DUPLEX_DELAY: float = 0.1
    
    # DSP settings
    NOISE_REDUCTION: bool = True
    VOICE_ENHANCEMENT: bool = True
    AUTOMATIC_GAIN_CONTROL: bool = True
    
    # Latency settings
    INPUT_LATENCY: float = 0.02   # 20ms
    OUTPUT_LATENCY: float = 0.02  # 20ms
    TARGET_LATENCY: float = 0.05  # 50ms total
    
    # Device detection
    USB_VENDOR_ID: str = "0x1234"  # Placeholder - would need actual ID
    USB_PRODUCT_ID: str = "0x5678"  # Placeholder - would need actual ID
    
    @classmethod
    def get_default_config(cls) -> Dict[str, Any]:
        """
        <summary>Get default audio configuration</summary>
        <returns>Dictionary containing default audio settings</returns>
        """
        return {
            'sample_rate': cls.SAMPLE_RATE,
            'input_channels': cls.INPUT_CHANNELS,
            'output_channels': cls.OUTPUT_CHANNELS,
            'bit_depth': cls.BIT_DEPTH,
            'buffer_size': cls.BUFFER_SIZE,
            'chunk_size': cls.CHUNK_SIZE,
            'input_volume': cls.DEFAULT_INPUT_VOLUME,
            'output_volume': cls.DEFAULT_OUTPUT_VOLUME,
            'mic_gain': cls.MIC_GAIN,
            'noise_gate_threshold': cls.NOISE_GATE_THRESHOLD,
            'agc_enabled': cls.AGC_ENABLED,
            'echo_cancellation': cls.ECHO_CANCELLATION,
            'noise_reduction': cls.NOISE_REDUCTION,
            'voice_enhancement': cls.VOICE_ENHANCEMENT,
            'full_duplex': cls.FULL_DUPLEX,
            'target_latency': cls.TARGET_LATENCY
        }
    
    @classmethod
    def get_recording_config(cls) -> Dict[str, Any]:
        """
        <summary>Get recording-specific configuration</summary>
        <returns>Dictionary containing recording settings</returns>
        """
        return {
            'sample_rate': cls.SAMPLE_RATE,
            'channels': cls.INPUT_CHANNELS,
            'bit_depth': cls.BIT_DEPTH,
            'chunk_size': cls.CHUNK_SIZE,
            'format': cls.RECORDING_FORMAT,
            'quality': cls.RECORDING_QUALITY,
            'max_duration': cls.MAX_RECORDING_TIME,
            'gain': cls.MIC_GAIN,
            'noise_gate': cls.NOISE_GATE_THRESHOLD
        }
    
    @classmethod
    def get_playback_config(cls) -> Dict[str, Any]:
        """
        <summary>Get playback-specific configuration</summary>
        <returns>Dictionary containing playback settings</returns>
        """
        return {
            'sample_rate': cls.SAMPLE_RATE,
            'channels': cls.OUTPUT_CHANNELS,
            'bit_depth': cls.BIT_DEPTH,
            'buffer_size': cls.BUFFER_SIZE,
            'volume': cls.DEFAULT_OUTPUT_VOLUME,
            'quality': cls.PLAYBACK_QUALITY,
            'crossfade': cls.CROSSFADE_ENABLED,
            'gapless': cls.GAPLESS_PLAYBACK,
            'speaker_protection': cls.SPEAKER_PROTECTION
        }
    
    @classmethod
    def validate_sample_rate(cls, rate: int) -> bool:
        """
        <summary>Validate if sample rate is supported</summary>
        <param name="rate">Sample rate to validate</param>
        <returns>True if supported, False otherwise</returns>
        """
        return rate in cls.SAMPLE_RATES_SUPPORTED
    
    @classmethod
    def validate_volume(cls, volume: float) -> bool:
        """
        <summary>Validate if volume is within acceptable range</summary>
        <param name="volume">Volume level to validate</param>
        <returns>True if valid, False otherwise</returns>
        """
        return cls.MIN_VOLUME <= volume <= cls.MAX_VOLUME