# Zolo Robot Project - Claude Development Guide

## Project Overview
Zolo is a modular robot head built on Raspberry Pi 5 with integrated sensors, camera, audio, and visual feedback systems. The project emphasizes clean OOP architecture, type safety, and modular design for scalable robotics development.

## Tech Stack
- **Hardware Platform**: Raspberry Pi 5 (8GB)
- **Storage**: SanDisk 64GB Extreme microSDXC (A2, U3, V30)
- **Display**: Raspberry Pi 7" DSI Touch Screen Display
- **Camera**: Arducam Raspberry Pi Camera Module 3 (12MP, autofocus, CSI)
- **Audio**: EMEET M0 Plus Conference Speakerphone (USB-C)
- **Visual**: NeoPixel Ring - 12 x WS2812 RGB LEDs
- **Sensors**: VL53L0X Time-of-Flight Distance, TSL2561 Luminosity
- **Electronics**: ELEGOO Electronic Fun Kit, 40mm USB Fan
- **Python Version**: 3.11+
- **Environment**: Virtual environment (venv)

## Required Libraries
```python
# GPIO Control
RPi.GPIO==0.7.1
gpiozero==1.6.2

# NeoPixels
rpi_ws281x==4.3.4
adafruit-circuitpython-neopixel==6.3.4

# Sensors
VL53L0X-python==0.1.3
smbus2==0.4.2
Adafruit_CircuitPython_TSL2561==3.3.4

# Camera & Vision
libcamera==0.1.0
picamera2==0.3.12
opencv-python==4.8.1.78

# Audio Processing
pyaudio==0.2.11
sounddevice==0.4.6
speech_recognition==3.10.0
pyttsx3==2.90

# GUI (Touchscreen)
tkinter==8.6
kivy==2.2.0
PyQt5==5.15.9
```

## Project Structure
```
zolo/
├── src/
│   ├── senses/
│   │   ├── vision/
│   │   │   ├── camera/          # Arducam Module 3 integration
│   │   │   └── processing/      # OpenCV image processing
│   │   ├── hearing/
│   │   │   ├── emeet/          # EMEET M0 Plus audio input
│   │   │   └── recognition/    # Speech recognition
│   │   ├── voice/
│   │   │   ├── emeet/          # EMEET M0 Plus audio output
│   │   │   └── synthesis/      # Text-to-speech
│   │   ├── eyes/
│   │   │   └── neopixel/       # NeoPixel ring control
│   │   ├── proximity/
│   │   │   └── vl53l0x/        # Distance sensor
│   │   └── light/
│   │       └── tsl2561/        # Luminosity sensor
│   ├── core/
│   │   ├── constants/          # Global constants
│   │   ├── interfaces/         # Abstract base classes
│   │   └── utils/             # Shared utilities
│   ├── gui/
│   │   └── touchscreen/        # Pi 7" display interface
│   └── integrations/
│       └── bittensor/          # Future AI voice integration
├── config/
│   ├── hardware_pins.py        # GPIO pin assignments
│   ├── sensor_calibration.py   # Sensor configuration
│   └── audio_settings.py       # Audio device settings
├── tests/
│   ├── hardware/              # Hardware simulation tests
│   ├── unit/                  # Unit tests
│   └── integration/           # System integration tests
├── requirements.txt
├── main.py                    # Entry point
└── Claude.md                  # This file
```

## Coding Standards & Practices

### Code Communication Standards
**CRITICAL**: Never use emojis in any code-related communications including:
- Code comments and documentation
- Commit messages and PR descriptions
- Issue descriptions and code reviews
- Function names, variable names, or any code elements
- Technical documentation and README files

**Professional Communication Only**:
- Use clear, descriptive language without decorative elements
- Focus on technical accuracy and clarity
- Maintain professional tone in all development communications
- Reserve emojis only for user-facing UI elements when explicitly requested

### Type Casting Requirements
```python
def process_sensor_data(sensor_value: float, threshold: int, device_id: str) -> bool:
    """All function parameters must have explicit type annotations"""
    pass

def initialize_hardware(pin_number: int, sensor_type: str) -> SensorInterface:
    """Return types must be explicitly declared"""
    pass
```

### OOP Architecture Principles
- **Modularity**: Each sensor/component has its own class hierarchy
- **Scalability**: Use interfaces and abstract base classes for extensibility
- **Pivotability**: Dependency injection for easy hardware swapping
- **Encapsulation**: Private methods for internal hardware operations
- **Inheritance**: Shared functionality through base sensor classes

### Function Readability Standards
```python
class CameraController:
    def capture_and_process_image(self) -> ProcessedImage:
        """Break complex operations into readable, single-purpose functions"""
        raw_image = self._capture_raw_image()
        filtered_image = self._apply_noise_filter(raw_image)
        processed_image = self._enhance_contrast(filtered_image)
        return self._convert_to_standard_format(processed_image)
    
    def _capture_raw_image(self) -> RawImage:
        """15+ lines of camera capture logic abstracted into named function"""
        pass
```

### Documentation Standards
```python
class NeoPixelController:
    """
    <summary>
    Controls the 12-LED NeoPixel ring for visual feedback and status indication
    </summary>
    <hardware>WS2812 RGB LEDs connected to GPIO 18</hardware>
    <dependencies>rpi_ws281x, adafruit-circuitpython-neopixel</dependencies>
    """
    
    def __init__(self, pin_number: int, led_count: int) -> None:
        """
        <summary>Initialize NeoPixel controller with hardware configuration</summary>
        <param name="pin_number">GPIO pin number for data line</param>
        <param name="led_count">Number of LEDs in the ring</param>
        <returns>None</returns>
        <raises>GPIOError: If pin is already in use</raises>
        """
        pass
        
    def set_ring_color(self, color: RGBColor, brightness: float) -> None:
        """
        <summary>Set all LEDs in ring to specified color and brightness</summary>
        <param name="color">RGB color tuple (0-255, 0-255, 0-255)</param>
        <param name="brightness">Brightness level (0.0-1.0)</param>
        """
        pass
```

### Constants Organization
```python
# Global constants: src/core/constants/global_constants.py
class ZoloConstants:
    PROJECT_NAME: str = "Zolo"
    VERSION: str = "1.0.0"
    MAX_SENSOR_RETRIES: int = 3
    DEFAULT_TIMEOUT: float = 5.0

# Modular constants: src/senses/vision/camera/constants.py
class CameraConstants:
    DEFAULT_RESOLUTION: tuple = (1920, 1080)
    MAX_FPS: int = 30
    AUTOFOCUS_PIN: int = 22
    
# Hardware pin constants: config/hardware_pins.py
class HardwarePins:
    NEOPIXEL_DATA: int = 18
    DISTANCE_SENSOR_TRIGGER: int = 23
    DISTANCE_SENSOR_ECHO: int = 24
    CAMERA_AUTOFOCUS: int = 22
    FAN_CONTROL: int = 25
```

### Function Parameter Constants Practice
**IMPORTANT**: Always use constants for function default parameters instead of magic numbers to maintain consistency and avoid duplicate values.

```python
# ❌ BAD - Magic numbers in function parameters
def __init__(self, i2c_address: int = 0x39, gain: int = 1, timeout: float = 5.0):
    pass

def is_bright_enough(self, threshold_lux: float = 10.0) -> bool:
    pass

# ✅ GOOD - Import and use constants
from .constants import LightConstants
from ..core.constants.global_constants import ZoloConstants

def __init__(self, i2c_address: int = LightConstants.DEFAULT_I2C_ADDRESS, 
             gain: int = LightConstants.DEFAULT_GAIN, 
             timeout: float = ZoloConstants.DEFAULT_TIMEOUT):
    pass

def is_bright_enough(self, threshold_lux: float = LightConstants.THRESHOLD_DIM) -> bool:
    pass
```

**Benefits**:
- Single source of truth for all configuration values
- No risk of inconsistent values across different files
- Easier to modify defaults system-wide
- Self-documenting code through constant names

## Hardware Configuration
- **Raspberry Pi GPIO**: Use BCM pin numbering
- **I2C Bus**: VL53L0X distance sensor, TSL2561 luminosity sensor
- **CSI Camera**: Arducam Module 3 with autofocus control
- **USB Audio**: EMEET M0 Plus for bidirectional audio
- **PWM Control**: NeoPixel ring, fan speed control
- **Power Management**: 5V 3A supply, monitor current consumption

## Frontend Development Practices

### Endpoint Constants Management
**IMPORTANT**: Always use constants for API endpoints instead of hardcoded URLs to maintain single source of truth and easy configuration management.

```javascript
// src/gui/frontend/constants/endpoints.js
export const API_ENDPOINTS = {
  // Robot Control
  ROBOT_STATUS: '/api/robot/status',
  ROBOT_MOVEMENT: '/api/robot/movement',
  ROBOT_STOP: '/api/robot/emergency-stop',
  
  // Sensors
  SENSOR_DISTANCE: '/api/sensors/distance',
  SENSOR_LIGHT: '/api/sensors/light',
  SENSOR_CAMERA: '/api/sensors/camera',
  
  // Media
  PHOTO_GALLERY: '/api/media/photos',
  PHOTO_CAPTURE: '/api/media/capture',
  MUSIC_PLAYER: '/api/media/music',
  
  // WebSocket
  WS_LIVE_FEED: '/ws/live-feed',
  WS_SENSOR_DATA: '/ws/sensors',
  WS_ROBOT_STATUS: '/ws/status'
};

// Usage in components
import { API_ENDPOINTS } from '../constants/endpoints';

const fetchRobotStatus = async () => {
  const response = await fetch(API_ENDPOINTS.ROBOT_STATUS);
  return response.json();
};
```

### Mock API Responses
**IMPORTANT**: Create mock API responses for GUI development before backend implementation. This enables parallel frontend/backend development and testing.

```javascript
// src/gui/frontend/mocks/api-responses.js
export const MOCK_RESPONSES = {
  robotStatus: {
    isOnline: true,
    batteryLevel: 85,
    temperature: 42.5,
    lastUpdate: new Date().toISOString()
  },
  
  sensorData: {
    distance: 150.5,
    lightLevel: 245,
    cameraStatus: 'active',
    timestamp: new Date().toISOString()
  },
  
  photoGallery: [
    { id: 1, filename: 'photo_001.jpg', timestamp: '2024-01-01T10:00:00Z' },
    { id: 2, filename: 'photo_002.jpg', timestamp: '2024-01-01T10:15:00Z' }
  ]
};

// Usage in development
const useMockAPI = process.env.NODE_ENV === 'development';

const fetchData = async (endpoint) => {
  if (useMockAPI) {
    return MOCK_RESPONSES[endpoint];
  }
  return fetch(API_ENDPOINTS[endpoint]).then(res => res.json());
};
```

**Benefits**:
- Parallel frontend/backend development
- Consistent API contract definition
- Easy endpoint management and updates
- Testing without hardware dependencies
- Clear documentation of expected API responses

### UI Design Principles
**CRITICAL**: SIMPLICITY ALWAYS WINS WITH UI - This is the foundation of all design decisions.

**Visual Design Standards:**
- **Rounded Corners**: All UI elements use consistent border radius (8px-16px range)
- **Smooth Transitions**: All modal opens, page transitions, and state changes use CSS transitions (200-300ms)
- **Seamless Interface**: No harsh edges or abrupt visual changes
- **iPhone-style Navigation**: Swipe up/out gestures for page navigation and modal dismissal

**Typography System:**
- **Primary Fonts**: Roboto, Poppins (professional roundish fonts)
- **Font Diversity**: Mix fonts strategically for hierarchy and visual interest
- **Headings & Spacing**: Use typography scale and whitespace to create clear information hierarchy

**Color System & Theming:**
```javascript
// src/gui/frontend/constants/theme.js
export const DESIGN_TOKENS = {
  colors: {
    // Zen Browser inspired - soft orange with grey
    primary: '#E8A87C',     // Soft orange
    secondary: '#8B9AAF',   // Soft grey-blue
    background: '#FEFCF8',  // Off-white/cream
    surface: '#F5F2ED',     // Warm white
    accent: '#D4B896',      // Warm brown
    text: '#2C3E50',        // Dark grey
    textLight: '#6B7280'    // Light grey
  },
  
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  
  transitions: {
    fast: '200ms ease-in-out',
    medium: '300ms ease-in-out',
    slow: '500ms ease-in-out'
  }
};
```

**Configurable Theme System:**
- **Design Settings Page**: Users can customize colors via hex input
- **Theme Persistence**: Save user preferences to localStorage
- **CSS Custom Properties**: Use CSS variables for dynamic theming
- **Color Validation**: Ensure accessibility and contrast ratios

**Component Design Standards:**
- **Modular Cards**: Reusable card components like Airbnb's design system
- **Consistent Spacing**: Use 8px grid system for all layouts
- **Touch-Friendly**: Minimum 44px touch targets for all interactive elements
- **Open Source Components**: Leverage proven libraries (React Calendar, Color Pickers, etc.)

**Animation & Interactions:**
- **Micro-interactions**: Subtle feedback for all user actions
- **Loading States**: Smooth skeleton screens and progress indicators
- **Gesture Support**: Swipe, pinch, tap gestures for touchscreen
- **Accessibility**: Respect reduced motion preferences

## Development Workflow
```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run main application
python main.py

# Run hardware tests
python -m pytest tests/hardware/ -v

# Calibrate sensors
python config/sensor_calibration.py

# Deploy with GPIO privileges
sudo python main.py
```

## Git Workflow & Commit Standards

### Commit Authorization
**CRITICAL**: Only commit when explicitly instructed to do so by the user. Never commit automatically or proactively.

When committing changes, follow the complete workflow:

1. **Stage changes**: `git add <files>`
2. **Check status**: `git status` (verify only expected files are staged)
3. **Commit with descriptive message**: Clean, single-sentence commit messages
4. **Push to origin**: `git push origin <branch>`

**Commit Message Requirements**:
- **Length**: ~100 characters MAX for descriptive clarity
- **Format**: Single sentence describing what was changed and why
- **Style**: Imperative mood (e.g., "Add feature" not "Added feature")
- **Include context**: Mention specific components/files affected when relevant

```bash
# Example commit workflow
git add src/senses/light/tsl2561/light_sensor.py Claude.md
git status  # Verify only expected files staged
git commit -m "Replace magic numbers with constants in TSL2561 light sensor to maintain single source of truth"
git push origin master
```

**Important**: "Commit" means the full process - staging, committing, and pushing to origin unless explicitly told otherwise.

### Changelog Management
**CRITICAL**: Always update CHANGELOG.md with detailed entries for every commit to maintain project history and facilitate handoffs.

**Changelog Requirements**:
- **Update on every commit**: Add entry to CHANGELOG.md describing changes
- **Detailed descriptions**: Include what was changed, why, and which components affected
- **Categorization**: Use Added, Changed, Fixed, Removed, Security sections
- **Version tracking**: Link changelog entries to commit hashes and dates
- **Migration notes**: Include breaking changes and upgrade instructions when applicable

```bash
# Example changelog workflow
# 1. Make code changes
# 2. Update CHANGELOG.md with detailed entry
git add src/gui/frontend/components/Dashboard.jsx CHANGELOG.md
git commit -m "Add responsive Dashboard component with sensor cards and status monitoring for robot GUI"
git push origin feature/gui-implementation
```

**Changelog Entry Format**:
```markdown
### Added
- Responsive Dashboard component with real-time sensor monitoring
- Status cards for battery, temperature, and connectivity indicators
- Touch-friendly navigation with smooth transitions

### Components Affected
- src/gui/frontend/components/Dashboard.jsx
- src/gui/frontend/hooks/useSensorData.js
- src/gui/frontend/styles/dashboard.css
```

### Branching & Pull Request Workflow

**Branch Creation**:
- When user specifies to branch with a topic, create appropriately named branch
- Use kebab-case naming convention (e.g., `feature/audio-integration`, `fix/sensor-calibration`)
- **Default branching**: Always branch from `master` unless explicitly told otherwise
- Checkout new branch immediately after creation

**Pull Request Process**:
- When user requests PR creation, open pull request to merge into `master` (unless different target specified)
- Use descriptive PR title and summary of changes
- Include test plan and implementation details

**Git Rebase Practices**:
- Always use `git rebase` instead of `git merge` for integrating branches
- Keep linear commit history through rebasing
- Use `git rebase -i` for cleaning up commit history before PR creation

```bash
# Example branching workflow
git checkout -b feature/audio-integration
# ... make changes ...
git rebase master  # Before creating PR
git push origin feature/audio-integration
gh pr create --title "Add audio integration" --body "Implementation details..."
```

## Safety Requirements
- Implement emergency stop for all motor/actuator control
- Use timeout mechanisms for all sensor readings (5 second default)
- Input validation for all hardware commands
- Fail-safe states for power management
- Proper GPIO cleanup on application exit
- Current limiting for LED operations

## Testing Strategy
- **Hardware Simulation**: Mock GPIO operations for development
- **Unit Tests**: Individual component testing
- **Integration Tests**: Sensor fusion and cross-component communication
- **Safety Validation**: Emergency stop and fail-safe verification
- **Performance Tests**: Real-time response validation

## Future Integrations
- **Bittensor Voice API**: Advanced AI voice capabilities
- **Computer Vision**: Object detection and tracking
- **Autonomous Navigation**: Obstacle avoidance and path planning
- **Remote Control**: Web interface for remote operation
- **Learning Systems**: Adaptive behavior based on interaction patterns

## Iterative Development Approach
- **Phase 1**: Basic sensor skeleton and safety systems
- **Phase 2**: Individual sense integration (vision, audio, proximity)
- **Phase 3**: Cross-sense fusion and intelligent behavior
- **Phase 4**: AI integration and autonomous operation

## Working Modes

### PLAN MODE
**Purpose**: Strategic planning and architecture discussions without code implementation.

**Characteristics**:
- No code writing or modifications
- Focus on system design, architecture decisions, and approach planning
- Discuss trade-offs, options, and recommendations
- Create implementation roadmaps and task breakdowns
- Answer questions about approaches and feasibility

**Example Activities**:
- Discussing GUI architecture options
- Planning sensor integration strategies
- Evaluating technology choices
- Breaking down complex features into phases

### CODE MODE
**Purpose**: Implementation-focused development with minimal discussion.

**Characteristics**:
- Direct code implementation and file modifications
- Minimal explanatory text unless requested
- Focus on writing, editing, and creating code
- Apply established patterns and practices
- Implement planned features efficiently

**Example Activities**:
- Writing new classes and functions
- Implementing sensor integrations
- Creating API endpoints
- Building GUI components

### HYBRID MODE
**Purpose**: Planning + coding with concurrent discussion (non-verbose).

**Characteristics**:
- Implement code while explaining decisions
- Discuss implementation choices as they're made
- Brief explanations of "what" and "why" during coding
- Balance between planning insights and actual implementation
- Concise communication style

**Example Activities**:
- Building features while explaining architectural decisions
- Implementing with real-time design adjustments
- Coding with contextual reasoning

### REVIEW MODE
**Purpose**: Thorough code review with engineering rigor and bug prevention focus.

**Critical Engineering Standards**:
- **Bug Prevention**: Identify potential edge cases, null pointer exceptions, race conditions
- **Scalability**: Assess code for performance bottlenecks and resource management
- **Robustness**: Evaluate error handling, timeout mechanisms, and fail-safe behaviors
- **Security**: Check for input validation, resource cleanup, and access control
- **Maintainability**: Review code structure, naming conventions, and documentation
- **Hardware Safety**: Verify GPIO cleanup, emergency stops, and hardware state management
- **Type Safety**: Ensure proper type annotations and validate type consistency
- **Memory Management**: Check for resource leaks and proper cleanup patterns

**Review Responsibilities**:
- **Voice Bug Concerns**: Actively identify and flag potential issues
- **Demand Fixes**: Require resolution of identified problems before approval
- **Validate Patterns**: Ensure adherence to established coding standards
- **Test Coverage**: Verify appropriate error handling and edge case management
- **Documentation**: Confirm code is self-documenting and properly annotated

**Example Focus Areas**:
- Hardware sensor timeout handling
- GPIO resource cleanup on exceptions
- Thread safety in sensor operations
- Input validation for user commands
- Emergency stop functionality
- Memory leaks in continuous operations

## API Design Principles

### Architecture Pattern
**CRITICAL**: Follow the C# controller pattern for API design - Controllers -> Managers -> Senses + Business Logic

**Structure**:
```python
# Controller Layer (API endpoints)
class LedController:
    def __init__(self, led_manager: LedManager, logger: ApiLogger):
        self.led_manager = led_manager
        self.logger = logger
    
    async def led_control(self, request: LedControlRequest) -> JSONResponse:
        return await self._validate_and_execute(
            request=request,
            handler=self.led_manager.handle_led_control,
            operation_name="LED Control"
        )

# Manager Layer (Business Logic)
class LedManager:
    def __init__(self, neopixel: NeoPixel, logger: ApiLogger):
        self.neopixel = neopixel  # Dependency injection
        self.logger = logger
    
    def handle_led_control(self, request: LedControlRequest) -> LedControlResponse:
        # Business logic with logging wrapper
        return self.logger.execute_with_logging(
            context={"request_id": request.request_id},
            func=lambda: self._execute_led_control(request),
            operation_name="LED Control"
        )

# Senses Layer (Hardware Interface)
class NeoPixel:  # Renamed from NeoPixelController
    def set_pixel(self, index: int, color: tuple) -> bool:
        # Hardware operations
        pass
```

### Exception Handling
**CRITICAL**: Use structured exception hierarchy with context and proper error codes

```python
# Base Exception
class BaseApiException(Exception):
    def __init__(self, message: str, error_kind: ErrorKind, context: Dict[str, Any] = None):
        self.message = message
        self.error_kind = error_kind
        self.context = context or {}
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "error_kind": self.error_kind.value,
            "message": self.message,
            "context": self.context
        }

# Specific Exceptions
class LedControlException(BaseApiException):
    def __init__(self, message: str, led_index: int = None, color: str = None):
        context = {"led_index": led_index, "color": color}
        super().__init__(message, ErrorKind.HARDWARE_ERROR, context)
```

### Request/Response Models
**CRITICAL**: Use Pydantic models for request validation and response serialization

```python
class LedControlRequest(BaseRequest):
    action: str = Field(..., description="Action to perform")
    led_index: Optional[int] = Field(default=None, description="LED index (0-11)")
    color: Optional[str] = Field(default=None, description="Color in hex format")
    
    @validator('action')
    def validate_action(cls, v):
        valid_actions = ['set_led', 'clear_all', 'set_brightness']
        if v not in valid_actions:
            raise ValueError(f"Action must be one of {valid_actions}")
        return v

class LedControlResponse(BaseResponse):
    success: bool = Field(description="Operation success status")
    message: str = Field(description="Response message")
    led_index: Optional[int] = Field(default=None)
    color: Optional[str] = Field(default=None)
```

### Logging Pattern
**CRITICAL**: Wrap all manager operations with logging context

```python
class ApiLogger:
    def execute_with_logging(self, context: Dict[str, Any], func: Callable, operation_name: str) -> Any:
        start_time = time.time()
        try:
            self.log_info(context, f"Starting {operation_name}")
            result = func()
            elapsed = time.time() - start_time
            self.log_info(context, f"Completed {operation_name} in {elapsed:.3f}s")
            return result
        except Exception as e:
            elapsed = time.time() - start_time
            self.log_error(context, e, f"Failed {operation_name} after {elapsed:.3f}s")
            raise
```

### Dependency Injection
**CRITICAL**: Use dependency injection for loose coupling and testability

```python
# Main Application
def create_app():
    # Initialize dependencies
    logger = ApiLogger("zolo_api")
    neopixel = NeoPixel()
    
    # Inject dependencies
    led_manager = LedManager(neopixel=neopixel, logger=logger)
    led_controller = LedController(led_manager=led_manager, logger=logger)
    
    # Setup routes
    app.include_router(led_controller.get_router(), prefix="/api/v1")
```

### Repository Pattern (Future)
**PREPARATION**: Structure allows easy addition of repository layer

```python
# Future: Add repository layer between manager and senses
class LedManager:
    def __init__(self, led_repository: LedRepository, logger: ApiLogger):
        self.led_repository = led_repository
        self.logger = logger
    
    def handle_led_control(self, request: LedControlRequest) -> LedControlResponse:
        # Business logic
        return self.led_repository.update_led(request.led_index, request.color)
```

### Key Design Principles
1. **Separation of Concerns**: Controllers handle HTTP, Managers handle business logic, Senses handle hardware
2. **Dependency Injection**: Loose coupling through constructor injection
3. **Structured Exceptions**: Custom exception hierarchy with context
4. **Logging Wrapper**: All operations wrapped with timing and context logging
5. **Request/Response Models**: Pydantic validation and serialization
6. **Error Handling**: Consistent error responses with proper HTTP status codes
7. **Repository Ready**: Architecture supports future repository layer addition

## Context for Claude
When working on Zolo:
1. Always prioritize hardware safety and proper GPIO cleanup
2. Maintain type safety and OOP principles throughout
3. Focus on modular, testable components
4. Create readable, self-documenting code
5. Build incrementally with comprehensive testing
6. Keep hardware specifications and pin assignments current
7. Validate all sensor operations before hardware deployment
8. **Mode Awareness**: Operate according to the specified working mode (PLAN/CODE/HYBRID/REVIEW)
9. **Commit Process**: When instructed to commit, automatically review all code changes and commit messages for quality, consistency, and adherence to standards
10. **Response Format**: For lengthy user messages, always start with a checklist of tasks to complete, then provide confirmation upon completion of each item. Be concise and structured in responses to maintain clarity.
11. **API Design**: Follow the C# controller pattern with Controllers -> Managers -> Senses architecture
12. **Exception Handling**: Use structured exception hierarchy with context and proper error codes
13. **Logging**: Wrap all manager operations with logging context for debugging and monitoring
