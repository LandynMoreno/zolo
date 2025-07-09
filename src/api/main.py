"""
Main FastAPI application for Zolo API
"""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from typing import Dict, Any

from .controllers.led_controller import LEDController
from .managers.led_manager import LEDManager
from .exceptions.base import ZoloException
from .logging.logger import get_logger
from ..senses.eyes.neopixel.neopixel import NeoPixel
from ..senses.eyes.neopixel.constants import NeoPixelConstants

# Global hardware instances
neopixel_hardware = None
led_manager = None
led_controller = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager
    Initialize and cleanup hardware resources
    """
    global neopixel_hardware, led_manager, led_controller
    
    logger = get_logger()
    
    try:
        # Initialize hardware
        logger.info("Initializing hardware components...")
        
        # Initialize NeoPixel hardware
        neopixel_hardware = NeoPixel(
            pin_number=NeoPixelConstants.DEFAULT_PIN,
            led_count=NeoPixelConstants.LED_COUNT,
            brightness=NeoPixelConstants.DEFAULT_BRIGHTNESS
        )
        
        neopixel_init_success = neopixel_hardware.initialize()
        if not neopixel_init_success:
            logger.warning("NeoPixel hardware initialization failed - running in simulation mode")
        else:
            logger.info("NeoPixel hardware initialized successfully")
        
        # Initialize managers
        logger.info("Initializing managers...")
        led_manager = LEDManager(neopixel_hardware)
        logger.info("LED Manager initialized")
        
        # Initialize controllers
        logger.info("Initializing controllers...")
        led_controller = LEDController(led_manager)
        logger.info("LED Controller initialized")
        
        logger.info("All components initialized successfully")
        yield
        
    except Exception as e:
        logger.error("Failed to initialize application", exception=e)
        raise
    finally:
        # Cleanup
        logger.info("Cleaning up hardware resources...")
        if neopixel_hardware:
            neopixel_hardware.cleanup()
        logger.info("Cleanup completed")


# Create FastAPI application
app = FastAPI(
    title="Zolo Robot API",
    description="API for controlling Zolo robot hardware and sensors",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(ZoloException)
async def zolo_exception_handler(request: Request, exc: ZoloException):
    """Global exception handler for Zolo exceptions"""
    logger = get_logger()
    
    logger.error(
        f"Zolo exception in {request.method} {request.url.path}",
        context=exc.context,
        exception=exc
    )
    
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    if exc.error_kind.value == "validation_error":
        status_code = status.HTTP_400_BAD_REQUEST
    elif exc.error_kind.value == "not_found":
        status_code = status.HTTP_404_NOT_FOUND
    elif exc.error_kind.value == "permission_denied":
        status_code = status.HTTP_403_FORBIDDEN
    
    return JSONResponse(
        status_code=status_code,
        content=exc.to_dict()
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unexpected exceptions"""
    logger = get_logger()
    
    logger.error(
        f"Unexpected exception in {request.method} {request.url.path}",
        exception=exc
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "internal_error",
            "message": "An unexpected error occurred",
            "context": {}
        }
    )


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Zolo API is running",
        "components": {
            "neopixel": neopixel_hardware.is_initialized if neopixel_hardware else False,
            "led_manager": led_manager is not None,
            "led_controller": led_controller is not None
        }
    }


# API root endpoint
@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "message": "Welcome to Zolo Robot API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "led": "/led/*",
            "docs": "/docs"
        }
    }


# Register controller routes after initialization
@app.on_event("startup")
async def startup_event():
    """Register routes after hardware initialization"""
    if led_controller:
        app.include_router(led_controller.get_router(), prefix="/api/v1")
        
        logger = get_logger()
        logger.info("LED Controller routes registered")


def create_app() -> FastAPI:
    """Factory function to create FastAPI application"""
    return app


def run_server(host: str = "0.0.0.0", port: int = 8000, debug: bool = False):
    """Run the FastAPI server"""
    uvicorn.run(
        "src.api.main:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info" if not debug else "debug"
    )


if __name__ == "__main__":
    run_server(debug=True)