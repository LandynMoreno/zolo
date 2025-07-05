"""
<summary>
Abstract base class for all sensor interfaces in the Zolo robot system
</summary>
<hardware>Generic sensor interface for all hardware components</hardware>
<dependencies>abc</dependencies>
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional


class SensorInterface(ABC):
    """
    <summary>
    Abstract base class that defines the common interface for all sensors
    </summary>
    """
    
    @abstractmethod
    def initialize(self) -> bool:
        """
        <summary>Initialize the sensor hardware and configuration</summary>
        <returns>True if successful, False otherwise</returns>
        """
        pass
    
    @abstractmethod
    def get_reading(self) -> Optional[Any]:
        """
        <summary>Get the current sensor reading</summary>
        <returns>Sensor reading or None if failed</returns>
        """
        pass
    
    @abstractmethod
    def is_ready(self) -> bool:
        """
        <summary>Check if sensor is ready for operations</summary>
        <returns>True if ready, False otherwise</returns>
        """
        pass
    
    @abstractmethod
    def cleanup(self) -> None:
        """
        <summary>Clean up sensor resources</summary>
        <returns>None</returns>
        """
        pass
    
    @abstractmethod
    def get_status(self) -> Dict[str, Any]:
        """
        <summary>Get sensor status information</summary>
        <returns>Dictionary containing status information</returns>
        """
        pass
    
    @abstractmethod
    def calibrate(self) -> bool:
        """
        <summary>Calibrate the sensor</summary>
        <returns>True if successful, False otherwise</returns>
        """
        pass