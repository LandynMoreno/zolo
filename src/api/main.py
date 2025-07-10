"""
FastAPI Main Application

Main application entry point for the Zolo API.
Configures FastAPI app with dependency injection and routing.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from .controllers.led_controller import LedController
from .managers.led_manager import LedManager
from .utils.logger import ApiLogger
from .utils.response_helpers import handle_api_exception
from ..senses.eyes.neopixel.neopixel import NeoPixel

# Global instances for dependency injection
led_manager: LedManager = None
led_controller: LedController = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    
    Handles startup and shutdown events for the API.
    """
    # Startup
    global led_manager, led_controller
    
    # Initialize logger
    logger = ApiLogger("zolo_api")
    
    # Initialize hardware dependencies
    neopixel = NeoPixel()
    
    # Initialize managers
    led_manager = LedManager(neopixel=neopixel, logger=logger)
    
    # Initialize controllers
    led_controller = LedController(led_manager=led_manager, logger=logger)
    
    logger.log_info({}, "Zolo API started successfully")
    
    yield
    
    # Shutdown
    if neopixel.is_initialized:
        neopixel.cleanup()
    
    logger.log_info({}, "Zolo API shutdown complete")

# Create FastAPI application
app = FastAPI(
    title="Zolo API",
    description="API for controlling the Zolo robot's senses and capabilities",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler for unhandled exceptions.
    
    Args:
        request: FastAPI request object
        exc: Exception that occurred
        
    Returns:
        JSONResponse with error details
    """
    return handle_api_exception(exc)

# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    
    Returns:
        Basic health status
    """
    return {"status": "healthy", "service": "zolo-api"}

# Include routers
@app.on_event("startup")
async def setup_routes():
    """Setup API routes after startup."""
    # Include LED controller routes
    app.include_router(led_controller.get_router(), prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)