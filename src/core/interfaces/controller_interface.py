"""
<summary>
Abstract base class for all controller interfaces in the Zolo robot system
</summary>
<hardware>Generic controller interface for all hardware components</hardware>
<dependencies>abc</dependencies>
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional


class ControllerInterface(ABC):
    """
    <summary>
    Abstract base class that defines the common interface for all controllers
    </summary>
    """
    
    @abstractmethod
    def initialize(self) -> bool:
        """
        <summary>Initialize the controller hardware and configuration</summary>
        <returns>True if successful, False otherwise</returns>
        """
        pass
    
    @abstractmethod
    def start(self) -> bool:
        """
        <summary>Start the controller operations</summary>
        <returns>True if successful, False otherwise</returns>
        """
        pass
    
    @abstractmethod
    def stop(self) -> bool:
        """
        <summary>Stop the controller operations</summary>
        <returns>True if successful, False otherwise</returns>
        """
        pass
    
    @abstractmethod
    def is_active(self) -> bool:
        """
        <summary>Check if controller is currently active</summary>
        <returns>True if active, False otherwise</returns>
        """
        pass
    
    @abstractmethod
    def cleanup(self) -> None:
        """
        <summary>Clean up controller resources</summary>
        <returns>None</returns>
        """
        pass
    
    @abstractmethod
    def get_status(self) -> Dict[str, Any]:
        """
        <summary>Get controller status information</summary>
        <returns>Dictionary containing status information</returns>
        """
        pass
    
    @abstractmethod
    def reset(self) -> bool:
        """
        <summary>Reset the controller to initial state</summary>
        <returns>True if successful, False otherwise</returns>
        """
        pass