"""
LED Controller for handling LED-related API requests
"""

from typing import Union
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from ..models.led import (
    LEDColorRequest, LEDColorResponse,
    LEDPatternRequest, LEDPatternResponse,
    LEDBrightnessRequest, LEDBrightnessResponse,
    LEDPresetsRequest, LEDPresetsResponse
)
from ..models.base import ErrorResponse
from ..exceptions.led import LEDException, LEDValidationException, LEDHardwareException
from ..exceptions.base import ZoloException
from ..managers.led_manager import LEDManager
from ..logging.decorators import log_api_call
from ..logging.logger import get_logger


class LEDController:
    """
    LED Controller handles LED-related HTTP requests
    Following the C# pattern: Controller -> Manager -> Hardware
    """
    
    def __init__(self, led_manager: LEDManager):
        """
        Initialize LED Controller with LED Manager dependency
        
        Args:
            led_manager: LED Manager instance for business logic
        """
        self.led_manager = led_manager
        self.logger = get_logger()
        self.router = APIRouter(prefix="/led", tags=["LED Control"])
        
        # Register routes
        self._register_routes()
    
    def _register_routes(self):
        """Register all LED controller routes"""
        
        @self.router.post("/color", response_model=LEDColorResponse)
        @log_api_call("SetLEDColor")
        async def set_led_color(request: LEDColorRequest) -> Union[LEDColorResponse, JSONResponse]:
            """
            Set individual LED color
            
            Args:
                request: LED color request
                
            Returns:
                LEDColorResponse: Success response with LED color info
                
            Raises:
                HTTPException: If validation or hardware error occurs
            """
            return self._validate_and_execute(
                request=request,
                handler=self.led_manager.handle_set_led_color,
                operation_name="SetLEDColor"
            )
        
        @self.router.post("/pattern", response_model=LEDPatternResponse)
        @log_api_call("SetLEDPattern")
        async def set_led_pattern(request: LEDPatternRequest) -> Union[LEDPatternResponse, JSONResponse]:
            """
            Set LED pattern
            
            Args:
                request: LED pattern request
                
            Returns:
                LEDPatternResponse: Success response with pattern info
                
            Raises:
                HTTPException: If validation or hardware error occurs
            """
            return self._validate_and_execute(
                request=request,
                handler=self.led_manager.handle_led_pattern,
                operation_name="SetLEDPattern"
            )
        
        @self.router.post("/brightness", response_model=LEDBrightnessResponse)
        @log_api_call("SetLEDBrightness")
        async def set_led_brightness(request: LEDBrightnessRequest) -> Union[LEDBrightnessResponse, JSONResponse]:
            """
            Set LED brightness
            
            Args:
                request: LED brightness request
                
            Returns:
                LEDBrightnessResponse: Success response with brightness info
                
            Raises:
                HTTPException: If validation or hardware error occurs
            """
            return self._validate_and_execute(
                request=request,
                handler=self.led_manager.handle_led_brightness,
                operation_name="SetLEDBrightness"
            )
        
        @self.router.post("/presets", response_model=LEDPresetsResponse)
        @log_api_call("SetLEDPresets")
        async def set_led_presets(request: LEDPresetsRequest) -> Union[LEDPresetsResponse, JSONResponse]:
            """
            Apply LED presets
            
            Args:
                request: LED presets request
                
            Returns:
                LEDPresetsResponse: Success response with presets info
                
            Raises:
                HTTPException: If validation or hardware error occurs
            """
            return self._validate_and_execute(
                request=request,
                handler=self.led_manager.handle_led_presets,
                operation_name="SetLEDPresets"
            )
    
    def _validate_and_execute(self, request, handler, operation_name: str):
        """
        Validate request and execute handler with error handling
        Inspired by the C# ValidateAndExecute pattern
        
        Args:
            request: The request object
            handler: The handler function to execute
            operation_name: Name of the operation for logging
            
        Returns:
            Response object or JSONResponse with error
            
        Raises:
            HTTPException: If validation or execution fails
        """
        try:
            # Log the API request
            self.logger.log_api_request(
                method="POST",
                endpoint=f"/led/{operation_name.lower()}",
                request_data=request.dict() if hasattr(request, 'dict') else None,
                user_id=getattr(request, 'user_id', None)
            )
            
            # Validate request
            if request is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Request body is required"
                )
            
            # Execute handler
            result = handler(request)
            
            # Log successful response
            self.logger.log_api_response(
                method="POST",
                endpoint=f"/led/{operation_name.lower()}",
                status_code=200,
                response_time=0.0,  # Would need timing logic
                user_id=getattr(request, 'user_id', None)
            )
            
            return result
            
        except LEDValidationException as ex:
            self.logger.error(f"Validation error in {operation_name}", context=ex.context, exception=ex)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=self._create_error_response(ex, status.HTTP_400_BAD_REQUEST)
            )
        
        except LEDHardwareException as ex:
            self.logger.error(f"Hardware error in {operation_name}", context=ex.context, exception=ex)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=self._create_error_response(ex, status.HTTP_500_INTERNAL_SERVER_ERROR)
            )
        
        except LEDException as ex:
            self.logger.error(f"LED error in {operation_name}", context=ex.context, exception=ex)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=self._create_error_response(ex, status.HTTP_500_INTERNAL_SERVER_ERROR)
            )
        
        except Exception as ex:
            self.logger.error(f"Unexpected error in {operation_name}", exception=ex)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={
                    "error": "internal_error",
                    "message": "An unexpected error occurred",
                    "context": {}
                }
            )
    
    def _create_error_response(self, exception: ZoloException, status_code: int) -> dict:
        """Create standardized error response"""
        return {
            "error": exception.error_kind.value,
            "message": exception.message,
            "context": exception.context,
            "status_code": status_code
        }
    
    def get_router(self) -> APIRouter:
        """Get the FastAPI router for this controller"""
        return self.router