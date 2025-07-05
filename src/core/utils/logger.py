"""
<summary>
Logging utility for Zolo robot system
</summary>
<hardware>Generic logging for all system components</hardware>
<dependencies>logging</dependencies>
"""

import logging
import sys
from typing import Optional
from pathlib import Path


class ZoloLogger:
    """
    <summary>
    Centralized logging system for Zolo robot components
    </summary>
    """
    
    def __init__(self, name: str, log_level: str = "INFO") -> None:
        """
        <summary>Initialize logger with specified name and level</summary>
        <param name="name">Logger name (usually module name)</param>
        <param name="log_level">Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)</param>
        <returns>None</returns>
        """
        self.logger = logging.getLogger(name)
        self.logger.setLevel(getattr(logging, log_level.upper()))
        
        # Create formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        # Console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)
        
        # File handler (if possible)
        try:
            log_file = Path("/var/log/zolo/zolo.log")
            log_file.parent.mkdir(parents=True, exist_ok=True)
            file_handler = logging.FileHandler(log_file)
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
        except PermissionError:
            # Fallback to local file
            file_handler = logging.FileHandler("zolo.log")
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
    
    def debug(self, message: str) -> None:
        """Log debug message"""
        self.logger.debug(message)
    
    def info(self, message: str) -> None:
        """Log info message"""
        self.logger.info(message)
    
    def warning(self, message: str) -> None:
        """Log warning message"""
        self.logger.warning(message)
    
    def error(self, message: str) -> None:
        """Log error message"""
        self.logger.error(message)
    
    def critical(self, message: str) -> None:
        """Log critical message"""
        self.logger.critical(message)
    
    def exception(self, message: str) -> None:
        """Log exception with traceback"""
        self.logger.exception(message)