"""
LED Controller

FastAPI controller for LED-related endpoints.
Handles HTTP requests for LED control and pattern operations.
"""

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from typing import Dict, Any

from ..models.led_models import LedControlRequest, LedControlResponse, LedPatternRequest, LedPatternResponse
from ..managers.led_manager import LedManager
from ..utils.logger import ApiLogger
from ..utils.response_helpers import create_success_response, handle_api_exception
from ..exceptions.base_exception import BaseApiException

class LedController:
    """
    FastAPI controller for LED operations.
    
    Provides REST API endpoints for LED control and pattern management.
    Following the C# controller pattern with proper error handling and logging.
    """
    
    def __init__(self, led_manager: LedManager, logger: ApiLogger):
        """
        Initialize LED controller with dependencies.
        
        Args:
            led_manager: LED business logic manager
            logger: API logger instance
        """
        self.led_manager = led_manager
        self.logger = logger
        self.router = APIRouter(prefix="/led", tags=["LED"])
        self._setup_routes()
    
    def _setup_routes(self):
        """Setup FastAPI routes for LED operations."""
        
        @self.router.post("/control", response_model=Dict[str, Any])
        async def led_control(request: LedControlRequest) -> JSONResponse:
            """
            Control individual LEDs or perform bulk operations.
            
            Args:
                request: LED control request
                
            Returns:
                JSONResponse with operation result
            """
            return await self._validate_and_execute(
                request=request,
                handler=self.led_manager.handle_led_control,
                operation_name="LED Control"
            )
        
        @self.router.post("/pattern", response_model=Dict[str, Any])
        async def led_pattern(request: LedPatternRequest) -> JSONResponse:
            """
            Apply patterns and animations to LEDs.
            
            Args:
                request: LED pattern request
                
            Returns:
                JSONResponse with operation result
            """
            return await self._validate_and_execute(
                request=request,
                handler=self.led_manager.handle_led_pattern,
                operation_name="LED Pattern"
            )
    
    async def _validate_and_execute(
        self,
        request: Any,
        handler: callable,
        operation_name: str
    ) -> JSONResponse:
        """
        Validate request and execute handler with error handling.
        
        Args:
            request: Request object (already validated by FastAPI)
            handler: Handler function to execute
            operation_name: Name of the operation for logging
            
        Returns:
            JSONResponse with success or error result
        """
        try:
            # Create context for logging
            context = {
                "operation": operation_name,
                "request_id": getattr(request, 'request_id', None),
                "timestamp": getattr(request, 'timestamp', None)
            }
            
            # Execute handler with logging
            result = self.logger.execute_with_logging(
                context=context,
                func=lambda: handler(request),
                operation_name=operation_name,
                log_success=True
            )
            
            # Create success response
            return create_success_response(
                data=result.dict(),
                message=result.message
            )
            
        except BaseApiException as e:
            # Handle known API exceptions
            self.logger.log_error(
                context={"operation": operation_name, "request": str(request)},
                error=e
            )
            return handle_api_exception(e)
            
        except Exception as e:
            # Handle unexpected exceptions
            self.logger.log_error(
                context={"operation": operation_name, "request": str(request)},
                error=e,
                message=f"Unexpected error in {operation_name}"
            )
            return handle_api_exception(e)
    
    def get_router(self) -> APIRouter:
        """
        Get the FastAPI router for this controller.
        
        Returns:
            APIRouter instance
        """
        return self.router