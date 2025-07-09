"""
Zolo API Package

This package provides the FastAPI-based REST API for the Zolo robot.
It follows a clean architecture pattern with controllers, managers, and proper error handling.
"""

from .main import app

__all__ = ['app']