"""
API Logger Utility

Provides logging functionality for API operations with request context.
Inspired by the C# KoddiPayLogger pattern.
"""

import logging
import time
from typing import Any, Callable, TypeVar, Optional, Dict
from functools import wraps
from datetime import datetime

T = TypeVar('T')

class ApiLogger:
    """
    API Logger for tracking operations with request context.
    
    Provides structured logging with timing, context, and error handling.
    """
    
    def __init__(self, logger_name: str = "api"):
        """
        Initialize the API logger.
        
        Args:
            logger_name: Name of the logger instance
        """
        self.logger = logging.getLogger(logger_name)
        self.logger.setLevel(logging.INFO)
        
        # Create console handler if no handlers exist
        if not self.logger.handlers:
            console_handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)
    
    def log_info(self, context: Dict[str, Any], message: str) -> None:
        """
        Log an info message with context.
        
        Args:
            context: Request context information
            message: Log message
        """
        self._log_with_context(logging.INFO, context, message)
    
    def log_error(self, context: Dict[str, Any], error: Exception, message: str = None) -> None:
        """
        Log an error with context.
        
        Args:
            context: Request context information
            error: Exception that occurred
            message: Optional custom message
        """
        error_message = message or f"Error occurred: {str(error)}"
        self._log_with_context(logging.ERROR, context, error_message, error)
    
    def log_warning(self, context: Dict[str, Any], message: str) -> None:
        """
        Log a warning message with context.
        
        Args:
            context: Request context information
            message: Warning message
        """
        self._log_with_context(logging.WARNING, context, message)
    
    def execute_with_logging(
        self,
        context: Dict[str, Any],
        func: Callable[[], T],
        operation_name: str,
        log_success: bool = True
    ) -> T:
        """
        Execute a function with automatic logging and timing.
        
        Args:
            context: Request context information
            func: Function to execute
            operation_name: Name of the operation for logging
            log_success: Whether to log successful operations
            
        Returns:
            Result of the function execution
            
        Raises:
            Re-raises any exception that occurs during execution
        """
        start_time = time.time()
        
        try:
            self.log_info(context, f"Starting {operation_name}")
            result = func()
            
            if log_success:
                elapsed = time.time() - start_time
                self.log_info(
                    context, 
                    f"Successfully completed {operation_name} in {elapsed:.3f}s"
                )
            
            return result
            
        except Exception as e:
            elapsed = time.time() - start_time
            self.log_error(
                context, 
                e, 
                f"Failed to execute {operation_name} after {elapsed:.3f}s"
            )
            raise
    
    def _log_with_context(
        self, 
        level: int, 
        context: Dict[str, Any], 
        message: str, 
        error: Optional[Exception] = None
    ) -> None:
        """
        Internal method to log with context information.
        
        Args:
            level: Logging level
            context: Request context information
            message: Log message
            error: Optional exception for error logging
        """
        context_str = self._format_context(context)
        full_message = f"{message} | Context: {context_str}"
        
        if error:
            self.logger.log(level, full_message, exc_info=error)
        else:
            self.logger.log(level, full_message)
    
    def _format_context(self, context: Dict[str, Any]) -> str:
        """
        Format context dictionary for logging.
        
        Args:
            context: Context dictionary
            
        Returns:
            Formatted context string
        """
        if not context:
            return "None"
        
        context_items = []
        for key, value in context.items():
            context_items.append(f"{key}={value}")
        
        return ", ".join(context_items)

def log_operation(operation_name: str, logger: ApiLogger):
    """
    Decorator to automatically log function execution.
    
    Args:
        operation_name: Name of the operation for logging
        logger: Logger instance to use
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Try to extract context from first argument if it's a dict
            context = {}
            if args and isinstance(args[0], dict):
                context = args[0]
            
            return logger.execute_with_logging(
                context=context,
                func=lambda: func(*args, **kwargs),
                operation_name=operation_name
            )
        return wrapper
    return decorator