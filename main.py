#!/usr/bin/env python3
"""
<summary>
Main entry point for Zolo robot system
</summary>
<hardware>Integrates all robot components and sensors</hardware>
<dependencies>All Zolo components</dependencies>
"""

import sys
import signal
import time
import atexit
from typing import Optional

# Core imports
from src.core.utils.logger import ZoloLogger
from src.core.utils.hardware_utils import HardwareUtils
from src.core.constants.global_constants import ZoloConstants
from config.hardware_pins import HardwarePins

# Sensor imports
from src.senses.vision.camera import CameraController
from src.senses.vision.processing import ImageProcessor
from src.senses.hearing.emeet import MicrophoneController
from src.senses.hearing.recognition import SpeechRecognizer
from src.senses.voice.emeet import SpeakerController
from src.senses.voice.synthesis import TextToSpeech
from src.senses.eyes.neopixel import NeoPixelController
from src.senses.proximity.vl53l0x import DistanceSensor
from src.senses.light.tsl2561 import LightSensor


class ZoloRobot:
    """
    <summary>
    Main Zolo robot class that integrates all components and manages system state
    </summary>
    """
    
    def __init__(self) -> None:
        """
        <summary>Initialize Zolo robot with all components</summary>
        <returns>None</returns>
        """
        self.logger = ZoloLogger("ZoloRobot")
        self.state = ZoloConstants.STATE_IDLE
        self.is_running = False
        self.emergency_stop_triggered = False
        
        # Initialize components
        self.camera: Optional[CameraController] = None
        self.image_processor: Optional[ImageProcessor] = None
        self.microphone: Optional[MicrophoneController] = None
        self.speech_recognizer: Optional[SpeechRecognizer] = None
        self.speaker: Optional[SpeakerController] = None
        self.text_to_speech: Optional[TextToSpeech] = None
        self.eyes: Optional[NeoPixelController] = None
        self.distance_sensor: Optional[DistanceSensor] = None
        self.light_sensor: Optional[LightSensor] = None
        
        # Register cleanup handlers
        atexit.register(self.cleanup)
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)
    
    def initialize(self) -> bool:
        """
        <summary>Initialize all robot components</summary>
        <returns>True if successful, False otherwise</returns>
        """
        self.logger.info("Initializing Zolo robot...")
        self.state = ZoloConstants.STATE_INITIALIZING
        
        try:
            # Initialize vision components
            self.camera = CameraController()
            self.image_processor = ImageProcessor()
            
            # Initialize audio components
            self.microphone = MicrophoneController()
            self.speech_recognizer = SpeechRecognizer()
            self.speaker = SpeakerController()
            self.text_to_speech = TextToSpeech()
            
            # Initialize visual feedback
            self.eyes = NeoPixelController(
                pin_number=HardwarePins.NEOPIXEL_DATA,
                led_count=12,
                brightness=0.5
            )
            
            # Initialize sensors
            self.distance_sensor = DistanceSensor()
            self.light_sensor = LightSensor()
            
            # Initialize hardware components
            initialization_results = {
                'camera': self.camera.initialize(),
                'microphone': self.microphone.initialize(),
                'speech_recognizer': self.speech_recognizer.initialize(),
                'speaker': self.speaker.initialize(),
                'text_to_speech': self.text_to_speech.initialize(),
                'eyes': self.eyes.initialize(),
                'distance_sensor': self.distance_sensor.initialize(),
                'light_sensor': self.light_sensor.initialize()
            }
            
            # Check initialization results
            failed_components = [name for name, result in initialization_results.items() if not result]
            
            if failed_components:
                self.logger.warning(f"Failed to initialize components: {failed_components}")
                # Continue with available components
            
            self.logger.info("Zolo robot initialization completed")
            self.state = ZoloConstants.STATE_READY
            return True
            
        except Exception as e:
            self.logger.error(f"Robot initialization failed: {e}")
            self.state = ZoloConstants.STATE_ERROR
            return False
    
    def start(self) -> None:
        """
        <summary>Start main robot operation loop</summary>
        <returns>None</returns>
        """
        if not self.initialize():
            self.logger.error("Cannot start robot - initialization failed")
            return
        
        self.is_running = True
        self.logger.info("Starting Zolo robot operation...")
        
        # Show startup status
        if self.eyes:
            self.eyes.show_status('ready')
        
        # Greeting message
        if self.text_to_speech:
            self.text_to_speech.speak("Hello! I'm Zolo, your robot companion. I'm ready to help!")
        
        try:
            # Main operation loop
            while self.is_running and not self.emergency_stop_triggered:
                self._main_loop()
                time.sleep(0.1)  # Small delay to prevent high CPU usage
                
        except KeyboardInterrupt:
            self.logger.info("Received keyboard interrupt, shutting down...")
        except Exception as e:
            self.logger.error(f"Unexpected error in main loop: {e}")
        finally:
            self.cleanup()
    
    def _main_loop(self) -> None:
        """
        <summary>Main robot operation loop</summary>
        <returns>None</returns>
        """
        # Check sensors
        self._check_sensors()
        
        # Listen for commands
        self._listen_for_commands()
        
        # Update visual feedback
        self._update_visual_feedback()
    
    def _check_sensors(self) -> None:
        """
        <summary>Check all sensors and update robot state</summary>
        <returns>None</returns>
        """
        # Check distance sensor
        if self.distance_sensor:
            distance = self.distance_sensor.get_distance_cm()
            if distance and distance < 10:
                self.logger.info(f"Object detected at {distance:.1f}cm")
                
                # React to close object
                if self.eyes:
                    self.eyes.set_color((255, 255, 0))  # Yellow for attention
                
                if self.text_to_speech:
                    self.text_to_speech.speak("I see something close to me!")
        
        # Check light sensor
        if self.light_sensor:
            light_level = self.light_sensor.get_light_level()
            if light_level == "dark":
                # Adjust behavior for dark conditions
                if self.eyes:
                    self.eyes.set_brightness(0.2)  # Dim in dark
            elif light_level == "bright":
                # Adjust behavior for bright conditions
                if self.eyes:
                    self.eyes.set_brightness(0.8)  # Bright in daylight
    
    def _listen_for_commands(self) -> None:
        """
        <summary>Listen for voice commands and respond</summary>
        <returns>None</returns>
        """
        if not self.speech_recognizer:
            return
        
        # Check for wake word
        if self.speech_recognizer.recognize_wake_word("zolo"):
            self.logger.info("Wake word detected")
            
            if self.eyes:
                self.eyes.show_status('listening')
            
            if self.text_to_speech:
                self.text_to_speech.speak("Yes, I'm listening!")
            
            # Listen for command
            command = self.speech_recognizer.listen_for_command(timeout=5.0)
            if command:
                self.logger.info(f"Received command: {command}")
                self._process_command(command)
    
    def _process_command(self, command: str) -> None:
        """
        <summary>Process voice command and execute appropriate action</summary>
        <param name="command">Voice command text</param>
        <returns>None</returns>
        """
        command = command.lower()
        
        if "hello" in command or "hi" in command:
            response = "Hello! Nice to meet you!"
        elif "lights on" in command:
            if self.eyes:
                self.eyes.set_color((255, 255, 255))
            response = "Lights are on!"
        elif "lights off" in command:
            if self.eyes:
                self.eyes.clear()
            response = "Lights are off!"
        elif "rainbow" in command:
            if self.eyes:
                self.eyes.rainbow_cycle()
            response = "Showing rainbow colors!"
        elif "take photo" in command or "capture" in command:
            if self.camera:
                image = self.camera.capture_image()
                if image is not None:
                    response = "Photo captured successfully!"
                else:
                    response = "Sorry, I couldn't take a photo."
            else:
                response = "Camera is not available."
        elif "distance" in command:
            if self.distance_sensor:
                distance = self.distance_sensor.get_distance_cm()
                if distance:
                    response = f"I detect an object at {distance:.1f} centimeters."
                else:
                    response = "I don't see any objects nearby."
            else:
                response = "Distance sensor is not available."
        elif "brightness" in command or "light level" in command:
            if self.light_sensor:
                level = self.light_sensor.get_light_level()
                response = f"The current light level is {level}."
            else:
                response = "Light sensor is not available."
        elif "shutdown" in command or "goodbye" in command:
            response = "Goodbye! Shutting down now."
            self.is_running = False
        else:
            response = "I didn't understand that command. Can you try again?"
        
        # Speak response
        if self.text_to_speech:
            self.text_to_speech.speak(response)
        
        # Update visual feedback
        if self.eyes:
            self.eyes.show_status('ready')
    
    def _update_visual_feedback(self) -> None:
        """
        <summary>Update visual feedback based on robot state</summary>
        <returns>None</returns>
        """
        if not self.eyes:
            return
        
        if self.state == ZoloConstants.STATE_READY:
            # Gentle breathing effect in green
            self.eyes.breathing_effect((0, 255, 0))
        elif self.state == ZoloConstants.STATE_LISTENING:
            # Blue pulsing
            self.eyes.breathing_effect((0, 0, 255))
        elif self.state == ZoloConstants.STATE_PROCESSING:
            # Spinning cyan dot
            self.eyes.spinning_dot((0, 255, 255))
        elif self.state == ZoloConstants.STATE_ERROR:
            # Red warning
            self.eyes.set_color((255, 0, 0))
    
    def _signal_handler(self, signum: int, frame) -> None:
        """
        <summary>Handle system signals for graceful shutdown</summary>
        <param name="signum">Signal number</param>
        <param name="frame">Current stack frame</param>
        <returns>None</returns>
        """
        self.logger.info(f"Received signal {signum}, shutting down...")
        self.is_running = False
    
    def emergency_stop(self) -> None:
        """
        <summary>Emergency stop function to halt all operations</summary>
        <returns>None</returns>
        """
        self.logger.critical("EMERGENCY STOP ACTIVATED")
        self.emergency_stop_triggered = True
        self.is_running = False
        
        # Stop all hardware operations
        HardwareUtils.emergency_stop()
        
        # Turn off all LEDs
        if self.eyes:
            self.eyes.clear()
        
        # Stop all audio
        if self.speaker:
            self.speaker.stop_playback()
        
        if self.text_to_speech:
            self.text_to_speech.stop_speaking()
    
    def cleanup(self) -> None:
        """
        <summary>Clean up all robot resources</summary>
        <returns>None</returns>
        """
        self.logger.info("Cleaning up robot resources...")
        
        # Cleanup all components
        components = [
            self.camera, self.microphone, self.speech_recognizer,
            self.speaker, self.text_to_speech, self.eyes,
            self.distance_sensor, self.light_sensor
        ]
        
        for component in components:
            if component and hasattr(component, 'cleanup'):
                try:
                    component.cleanup()
                except Exception as e:
                    self.logger.error(f"Error during cleanup: {e}")
        
        self.logger.info("Robot cleanup completed")


def main() -> None:
    """
    <summary>Main entry point for Zolo robot application</summary>
    <returns>None</returns>
    """
    print("="*50)
    print("    ZOLO ROBOT SYSTEM")
    print("    Version 1.0.0")
    print("="*50)
    
    # Create and start robot
    robot = ZoloRobot()
    
    try:
        robot.start()
    except Exception as e:
        print(f"Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()