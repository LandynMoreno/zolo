"""GPIO pin assignments for Zolo robot hardware components"""


class HardwarePins:
    """Hardware pin configuration constants"""
    
    # NeoPixel LED ring
    NEOPIXEL_DATA: int = 18
    NEOPIXEL_POWER: int = 17
    
    # Distance sensor (VL53L0X)
    DISTANCE_SENSOR_SDA: int = 2   # I2C SDA
    DISTANCE_SENSOR_SCL: int = 3   # I2C SCL
    DISTANCE_SENSOR_SHUTDOWN: int = 4  # Optional shutdown pin
    
    # Light sensor (TSL2561)
    LIGHT_SENSOR_SDA: int = 2   # I2C SDA (shared with distance sensor)
    LIGHT_SENSOR_SCL: int = 3   # I2C SCL (shared with distance sensor)
    LIGHT_SENSOR_INT: int = 5   # Optional interrupt pin
    
    # Camera (Arducam Module 3)
    CAMERA_AUTOFOCUS: int = 22
    CAMERA_ENABLE: int = 23
    
    # Fan control
    FAN_CONTROL: int = 25
    FAN_TACHOMETER: int = 24
    
    # GPIO buttons/controls (from ELEGOO kit)
    BUTTON_POWER: int = 26
    BUTTON_MODE: int = 19
    BUTTON_VOLUME_UP: int = 13
    BUTTON_VOLUME_DOWN: int = 6
    
    # Status LEDs
    STATUS_LED_RED: int = 16
    STATUS_LED_GREEN: int = 20
    STATUS_LED_BLUE: int = 21
    
    # Emergency stop
    EMERGENCY_STOP: int = 27
    
    # Reserved pins (do not use)
    RESERVED_PINS: list = [
        0, 1,    # I2C ID EEPROM
        14, 15,  # UART
        28, 29,  # Reserved
        30, 31,  # Reserved
    ]
    
    # I2C addresses
    I2C_ADDRESSES: dict = {
        'VL53L0X': 0x29,
        'TSL2561': 0x39,
        'TSL2561_ALT': 0x49,
    }
    
    # SPI pins (if needed)
    SPI_MOSI: int = 10
    SPI_MISO: int = 9
    SPI_SCLK: int = 11
    SPI_CE0: int = 8
    SPI_CE1: int = 7