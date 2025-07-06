# API Endpoints Constants
class APIEndpoints:
    """Centralized API endpoint constants for easy maintenance"""
    
    # Base URLs
    BASE_API = "/api/v1"
    BASE_WS = "/ws"
    
    # Robot Control
    ROBOT_STATUS = f"{BASE_API}/robot/status"
    ROBOT_EMERGENCY_STOP = f"{BASE_API}/robot/emergency"
    
    # Sensors
    SENSOR_DATA = f"{BASE_API}/sensors/data"
    SENSOR_CALIBRATE = f"{BASE_API}/sensors/calibrate"
    CAMERA_CAPTURE = f"{BASE_API}/camera/capture"
    CAMERA_STREAM = f"{BASE_WS}/camera/stream"
    
    # Audio
    AUDIO_PLAY = f"{BASE_API}/audio/play"
    AUDIO_RECORD = f"{BASE_API}/audio/record"
    AUDIO_TTS = f"{BASE_API}/audio/tts"
    AUDIO_STREAM = f"{BASE_WS}/audio/stream"
    
    # NeoPixel LEDs
    LED_CONTROL = f"{BASE_API}/led/control"
    LED_PATTERN = f"{BASE_API}/led/pattern"
    
    # Music Player
    MUSIC_PLAY = f"{BASE_API}/music/play"
    MUSIC_PAUSE = f"{BASE_API}/music/pause"
    MUSIC_STOP = f"{BASE_API}/music/stop"
    MUSIC_QUEUE = f"{BASE_API}/music/queue"
    MUSIC_CURRENT = f"{BASE_API}/music/current"
    
    # Photo Gallery
    PHOTO_LIST = f"{BASE_API}/photos/list"
    PHOTO_UPLOAD = f"{BASE_API}/photos/upload"
    PHOTO_DELETE = f"{BASE_API}/photos/delete"
    PHOTO_METADATA = f"{BASE_API}/photos/metadata"