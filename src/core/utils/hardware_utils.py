"""
<summary>
Hardware utility functions for Zolo robot system
</summary>
<hardware>Generic hardware utilities for all components</hardware>
<dependencies>time, threading</dependencies>
"""

import time
import threading
from typing import Callable, Optional, Any
from functools import wraps

from ..constants.global_constants import ZoloConstants


class HardwareUtils:
    """
    <summary>
    Utility functions for hardware operations and management
    </summary>
    """
    
    @staticmethod
    def retry_on_failure(max_retries: int = ZoloConstants.MAX_SENSOR_RETRIES, delay: float = 0.1) -> Callable:
        """
        <summary>Decorator to retry hardware operations on failure</summary>
        <param name="max_retries">Maximum number of retry attempts</param>
        <param name="delay">Delay between retries in seconds</param>
        <returns>Decorator function</returns>
        """
        def decorator(func: Callable) -> Callable:
            @wraps(func)
            def wrapper(*args, **kwargs) -> Any:
                for attempt in range(max_retries + 1):
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        if attempt == max_retries:
                            raise e
                        time.sleep(delay)
                return None
            return wrapper
        return decorator
    
    @staticmethod
    def timeout_handler(timeout_seconds: float) -> Callable:
        """
        <summary>Decorator to add timeout to hardware operations</summary>
        <param name="timeout_seconds">Timeout duration in seconds</param>
        <returns>Decorator function</returns>
        """
        def decorator(func: Callable) -> Callable:
            @wraps(func)
            def wrapper(*args, **kwargs) -> Any:
                result = [None]
                exception = [None]
                
                def target():
                    try:
                        result[0] = func(*args, **kwargs)
                    except Exception as e:
                        exception[0] = e
                
                thread = threading.Thread(target=target)
                thread.daemon = True
                thread.start()
                thread.join(timeout_seconds)
                
                if thread.is_alive():
                    raise TimeoutError(f"Operation timed out after {timeout_seconds} seconds")
                
                if exception[0]:
                    raise exception[0]
                
                return result[0]
            return wrapper
        return decorator
    
    @staticmethod
    def validate_range(value: float, min_val: float, max_val: float) -> bool:
        """
        <summary>Validate if value is within specified range</summary>
        <param name="value">Value to validate</param>
        <param name="min_val">Minimum allowed value</param>
        <param name="max_val">Maximum allowed value</param>
        <returns>True if value is in range, False otherwise</returns>
        """
        return min_val <= value <= max_val
    
    @staticmethod
    def clamp(value: float, min_val: float, max_val: float) -> float:
        """
        <summary>Clamp value to specified range</summary>
        <param name="value">Value to clamp</param>
        <param name="min_val">Minimum value</param>
        <param name="max_val">Maximum value</param>
        <returns>Clamped value</returns>
        """
        return max(min_val, min(max_val, value))
    
    @staticmethod
    def safe_divide(numerator: float, denominator: float, default: float = 0.0) -> float:
        """
        <summary>Perform safe division with default value for zero division</summary>
        <param name="numerator">Numerator</param>
        <param name="denominator">Denominator</param>
        <param name="default">Default value if division by zero</param>
        <returns>Division result or default value</returns>
        """
        if denominator == 0:
            return default
        return numerator / denominator
    
    @staticmethod
    def create_watchdog(timeout: float, callback: Callable) -> threading.Timer:
        """
        <summary>Create a watchdog timer for hardware operations</summary>
        <param name="timeout">Watchdog timeout in seconds</param>
        <param name="callback">Callback function to execute on timeout</param>
        <returns>Timer object</returns>
        """
        return threading.Timer(timeout, callback)
    
    @staticmethod
    def emergency_stop() -> None:
        """
        <summary>Emergency stop function for all hardware operations</summary>
        <returns>None</returns>
        """
        # Skeleton implementation
        print("EMERGENCY STOP ACTIVATED")
        pass