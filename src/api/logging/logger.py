"""
Zolo API Logger Implementation
"""

import logging
import sys
from datetime import datetime
from typing import Dict, Any, Optional, Callable, TypeVar, Union
from functools import wraps
from enum import Enum

T = TypeVar('T')


class LogLevel(Enum):
    """Log levels for Zolo API"""
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class ZoloLogger:
    """
    Main logging class for Zolo API
    Inspired by the C# logging pattern with structured logging
    """
    
    def __init__(self, name: str = "ZoloAPI"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)
        
        # Create console handler if not already exists
        if not self.logger.handlers:
            handler = logging.StreamHandler(sys.stdout)
            handler.setLevel(logging.DEBUG)
            
            # Create formatter
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            
            self.logger.addHandler(handler)
    
    def _log_with_context(self, level: LogLevel, message: str, context: Optional[Dict[str, Any]] = None, exception: Optional[Exception] = None):
        """Log message with structured context"""
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'level': level.value,
            'message': message,
            'context': context or {}
        }
        
        if exception:
            log_entry['exception'] = {
                'type': type(exception).__name__,
                'message': str(exception),
                'traceback': str(exception.__traceback__) if exception.__traceback__ else None
            }
        
        # Format message with context
        formatted_message = f"{message}"
        if context:
            context_str = ", ".join([f"{k}={v}" for k, v in context.items()])
            formatted_message += f" | Context: {context_str}"
        
        # Log based on level
        if level == LogLevel.DEBUG:
            self.logger.debug(formatted_message)
        elif level == LogLevel.INFO:
            self.logger.info(formatted_message)
        elif level == LogLevel.WARNING:
            self.logger.warning(formatted_message)
        elif level == LogLevel.ERROR:
            self.logger.error(formatted_message, exc_info=exception)
        elif level == LogLevel.CRITICAL:
            self.logger.critical(formatted_message, exc_info=exception)
    
    def debug(self, message: str, context: Optional[Dict[str, Any]] = None):
        """Log debug message"""
        self._log_with_context(LogLevel.DEBUG, message, context)
    
    def info(self, message: str, context: Optional[Dict[str, Any]] = None):
        """Log info message"""
        self._log_with_context(LogLevel.INFO, message, context)
    
    def warning(self, message: str, context: Optional[Dict[str, Any]] = None):
        """Log warning message"""
        self._log_with_context(LogLevel.WARNING, message, context)
    
    def error(self, message: str, context: Optional[Dict[str, Any]] = None, exception: Optional[Exception] = None):
        """Log error message"""
        self._log_with_context(LogLevel.ERROR, message, context, exception)
    
    def critical(self, message: str, context: Optional[Dict[str, Any]] = None, exception: Optional[Exception] = None):
        """Log critical message"""
        self._log_with_context(LogLevel.CRITICAL, message, context, exception)
    
    def execute_with_logging(
        self,
        operation: Callable[[], T],
        operation_name: str,
        context: Optional[Dict[str, Any]] = None,
        log_success: bool = True
    ) -> T:
        """
        Execute operation with automatic logging
        Inspired by the C# ValidateAndExecute pattern
        """
        start_time = datetime.now()
        operation_context = {
            'operation': operation_name,
            'start_time': start_time.isoformat(),
            **(context or {})
        }
        
        try:
            self.info(f"Starting operation: {operation_name}", operation_context)
            
            result = operation()
            
            if log_success:
                end_time = datetime.now()
                duration = (end_time - start_time).total_seconds()
                success_context = {
                    **operation_context,
                    'end_time': end_time.isoformat(),
                    'duration_seconds': duration,
                    'status': 'success'
                }
                self.info(f"Operation completed successfully: {operation_name}", success_context)
            
            return result
            
        except Exception as e:
            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds()
            error_context = {
                **operation_context,
                'end_time': end_time.isoformat(),
                'duration_seconds': duration,
                'status': 'error',
                'error_type': type(e).__name__,
                'error_message': str(e)
            }
            
            self.error(f"Operation failed: {operation_name}", error_context, e)
            raise
    
    def log_api_request(self, method: str, endpoint: str, request_data: Optional[Dict[str, Any]] = None, user_id: Optional[str] = None):
        """Log API request"""
        context = {
            'method': method,
            'endpoint': endpoint,
            'user_id': user_id,
            'request_data': request_data or {}
        }
        self.info(f"API Request: {method} {endpoint}", context)
    
    def log_api_response(self, method: str, endpoint: str, status_code: int, response_time: float, user_id: Optional[str] = None):
        """Log API response"""
        context = {
            'method': method,
            'endpoint': endpoint,
            'status_code': status_code,
            'response_time_ms': response_time * 1000,
            'user_id': user_id
        }
        self.info(f"API Response: {method} {endpoint} - {status_code}", context)
    
    def log_hardware_operation(self, hardware_type: str, operation: str, success: bool, context: Optional[Dict[str, Any]] = None):
        """Log hardware operation"""
        operation_context = {
            'hardware_type': hardware_type,
            'operation': operation,
            'success': success,
            **(context or {})
        }
        
        if success:
            self.info(f"Hardware operation successful: {hardware_type}.{operation}", operation_context)
        else:
            self.error(f"Hardware operation failed: {hardware_type}.{operation}", operation_context)


# Global logger instance
_logger_instance = None


def get_logger() -> ZoloLogger:
    """Get global logger instance"""
    global _logger_instance
    if _logger_instance is None:
        _logger_instance = ZoloLogger()
    return _logger_instance