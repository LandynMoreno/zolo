import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing taskbar visibility with auto-hide functionality
 * Inspired by macOS dock behavior - shows on interaction, hides after delay
 */
export const useTaskbarVisibility = (autoHideDelay = 3000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimer = useRef(null);
  const touchStartY = useRef(null);

  // Clear existing timer
  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  // Start auto-hide timer
  const startHideTimer = useCallback(() => {
    clearHideTimer();
    if (!isHovered) {
      hideTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);
    }
  }, [autoHideDelay, isHovered, clearHideTimer]);

  // Show taskbar and reset timer
  const showTaskbar = useCallback(() => {
    setIsVisible(true);
    startHideTimer();
  }, [startHideTimer]);

  // Handle mouse/touch interactions
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    showTaskbar();
    clearHideTimer();
  }, [showTaskbar, clearHideTimer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startHideTimer();
  }, [startHideTimer]);

  // Handle touch events for mobile gesture
  const handleTouchStart = useCallback((event) => {
    const touch = event.touches[0];
    touchStartY.current = touch.clientY;
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (touchStartY.current === null) return;

    const touch = event.touches[0];
    const deltaY = touchStartY.current - touch.clientY;
    
    // Detect upward swipe near bottom of screen
    const isNearBottom = touchStartY.current > window.innerHeight * 0.8;
    const isUpwardSwipe = deltaY > 30;
    
    if (isNearBottom && isUpwardSwipe) {
      showTaskbar();
      touchStartY.current = null;
    }
  }, [showTaskbar]);

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null;
  }, []);

  // Handle any screen interaction
  const handleScreenInteraction = useCallback(() => {
    showTaskbar();
  }, [showTaskbar]);

  // Set up global event listeners
  useEffect(() => {
    const handleGlobalTouch = () => showTaskbar();
    const handleGlobalClick = () => showTaskbar();

    // Touch and click anywhere shows taskbar briefly
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('touchstart', handleGlobalTouch);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchstart', handleGlobalTouch);
      clearHideTimer();
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, showTaskbar, clearHideTimer]);

  // Force show taskbar (for programmatic control)
  const forceShow = useCallback(() => {
    setIsVisible(true);
    clearHideTimer();
  }, [clearHideTimer]);

  // Force hide taskbar
  const forceHide = useCallback(() => {
    setIsVisible(false);
    clearHideTimer();
  }, [clearHideTimer]);

  return {
    isVisible,
    isHovered,
    showTaskbar,
    forceShow,
    forceHide,
    handleMouseEnter,
    handleMouseLeave,
    handleScreenInteraction
  };
};