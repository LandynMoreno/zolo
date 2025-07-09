"""
API Exception Classes
"""

from .base import ZoloException, ZoloValidationException, ZoloHardwareException
from .led import LEDException, LEDValidationException, LEDHardwareException
from .sensor import SensorException, SensorValidationException, SensorHardwareException
from .camera import CameraException, CameraValidationException, CameraHardwareException
from .audio import AudioException, AudioValidationException, AudioHardwareException

__all__ = [
    'ZoloException',
    'ZoloValidationException', 
    'ZoloHardwareException',
    'LEDException',
    'LEDValidationException',
    'LEDHardwareException',
    'SensorException',
    'SensorValidationException',
    'SensorHardwareException',
    'CameraException',
    'CameraValidationException',
    'CameraHardwareException',
    'AudioException',
    'AudioValidationException',
    'AudioHardwareException',
]