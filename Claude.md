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
