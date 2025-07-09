#!/usr/bin/env python3
"""
Startup script for Zolo LED API

This script starts the FastAPI server for LED control.
Run with: python3 start_api.py
"""

import uvicorn
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

if __name__ == "__main__":
    print("🚀 Starting Zolo LED API Server")
    print("=" * 50)
    print("📋 API Endpoints:")
    print("   POST /api/v1/led/control - Control individual LEDs")
    print("   POST /api/v1/led/pattern - Apply LED patterns")
    print("   GET  /health - Health check")
    print("   GET  /docs - API documentation")
    print("")
    print("🔗 Frontend Integration:")
    print("   LEDDesigner.jsx is configured to use these endpoints")
    print("   Frontend URL: http://localhost:3000")
    print("")
    print("🔌 Hardware Requirements:")
    print("   - NeoPixel ring connected to GPIO 18")
    print("   - Run on Raspberry Pi with sudo privileges")
    print("   - sudo python3 start_api.py")
    print("")
    print("💡 Starting server on http://localhost:8000")
    print("   Press Ctrl+C to stop")
    print("=" * 50)
    
    try:
        uvicorn.run(
            "api.main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server failed to start: {e}")
        sys.exit(1)