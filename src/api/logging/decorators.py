"""
Logging Decorators for API Methods
"""

from functools import wraps
from typing import Callable, Dict, Any, Optional
from datetime import datetime
import inspect
from .logger import get_logger


def log_api_call(operation_name: Optional[str] = None, log_success: bool = True):
    """
    Decorator to log API controller calls
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            logger = get_logger()
            
            # Get operation name from function or parameter
            op_name = operation_name or f"{func.__module__}.{func.__name__}"
            
            # Extract context from arguments
            context = {}
            if args:
                # Try to extract request info from first argument
                request_arg = args[0]
                if hasattr(request_arg, '__dict__'):
                    context.update({
                        'request_type': type(request_arg).__name__,
                        'request_id': getattr(request_arg, 'request_id', None),
                        'user_id': getattr(request_arg, 'user_id', None)
                    })
            
            # Add function signature info
            sig = inspect.signature(func)
            context['function_signature'] = str(sig)
            
            return logger.execute_with_logging(
                operation=lambda: func(*args, **kwargs),
                operation_name=op_name,
                context=context,
                log_success=log_success
            )
        
        return wrapper
    return decorator


def log_manager_call(operation_name: Optional[str] = None, log_success: bool = True):
    """
    Decorator to log manager method calls
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            logger = get_logger()
            
            # Get operation name from function or parameter
            op_name = operation_name or f"{func.__module__}.{func.__name__}"
            
            # Extract context from arguments
            context = {}
            if args:
                # Try to extract manager info from self (first argument)
                manager_self = args[0]
                if hasattr(manager_self, '__class__'):
                    context['manager_type'] = manager_self.__class__.__name__
                
                # Try to extract request info from second argument
                if len(args) > 1:
                    request_arg = args[1]
                    if hasattr(request_arg, '__dict__'):
                        context.update({
                            'request_type': type(request_arg).__name__,
                            'request_id': getattr(request_arg, 'request_id', None),
                            'user_id': getattr(request_arg, 'user_id', None)
                        })
            
            # Add function signature info
            sig = inspect.signature(func)
            context['function_signature'] = str(sig)
            
            return logger.execute_with_logging(
                operation=lambda: func(*args, **kwargs),
                operation_name=op_name,
                context=context,
                log_success=log_success
            )
        
        return wrapper
    return decorator


def log_hardware_call(hardware_type: str, log_success: bool = True):
    """
    Decorator to log hardware operation calls
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            logger = get_logger()
            
            operation_name = f"{hardware_type}.{func.__name__}"
            
            # Extract context from arguments
            context = {
                'hardware_type': hardware_type,
                'operation': func.__name__
            }
            
            if args:
                # Try to extract hardware info from self (first argument)
                hardware_self = args[0]
                if hasattr(hardware_self, '__dict__'):
                    context.update({
                        'hardware_class': hardware_self.__class__.__name__,
                        'is_initialized': getattr(hardware_self, 'is_initialized', None)
                    })
            
            try:
                result = logger.execute_with_logging(
                    operation=lambda: func(*args, **kwargs),
                    operation_name=operation_name,
                    context=context,
                    log_success=log_success
                )
                
                # Log hardware operation success
                logger.log_hardware_operation(
                    hardware_type=hardware_type,
                    operation=func.__name__,
                    success=True,
                    context={'result': result}
                )
                
                return result
                
            except Exception as e:
                # Log hardware operation failure
                logger.log_hardware_operation(
                    hardware_type=hardware_type,
                    operation=func.__name__,
                    success=False,
                    context={'error': str(e)}
                )
                raise
        
        return wrapper
    return decorator