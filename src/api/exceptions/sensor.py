"""
Sensor-specific exception classes
"""

from typing import Dict, Any, Optional
from .base import ZoloException, ZoloValidationException, ZoloHardwareException, ErrorKind


class SensorException(ZoloException):
    """Base exception for sensor-related errors"""
    
    def __init__(
        self,
        message: str,
        error_kind: ErrorKind = ErrorKind.INTERNAL_ERROR,
        sensor_type: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if sensor_type:
            context['sensor_type'] = sensor_type
            
        super().__init__(
            message=message,
            error_kind=error_kind,
            context=context,
            inner_exception=inner_exception
        )


class SensorValidationException(SensorException):
    """Exception for sensor validation errors"""
    
    def __init__(
        self,
        message: str,
        field_name: Optional[str] = None,
        field_value: Optional[Any] = None,
        sensor_type: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ):
        context = context or {}
        if field_name:
            context['field_name'] = field_name
        if field_value is not None:
            context['field_value'] = field_value
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.VALIDATION_ERROR,
            sensor_type=sensor_type,
            context=context
        )


class SensorHardwareException(SensorException):
    """Exception for sensor hardware errors"""
    
    def __init__(
        self,
        message: str,
        sensor_type: Optional[str] = None,
        hardware_component: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if hardware_component:
            context['hardware_component'] = hardware_component
        
        super().__init__(
            message=message,
            error_kind=ErrorKind.HARDWARE_ERROR,
            sensor_type=sensor_type,
            context=context,
            inner_exception=inner_exception
        )


class SensorCalibrationException(SensorException):
    """Exception for sensor calibration errors"""
    
    def __init__(
        self,
        message: str,
        sensor_type: Optional[str] = None,
        calibration_step: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        inner_exception: Optional[Exception] = None
    ):
        context = context or {}
        if calibration_step:
            context['calibration_step'] = calibration_step
            
        super().__init__(
            message=message,
            error_kind=ErrorKind.VALIDATION_ERROR,
            sensor_type=sensor_type,
            context=context,
            inner_exception=inner_exception
        )