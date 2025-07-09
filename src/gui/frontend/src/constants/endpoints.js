/**
 * API Endpoints Configuration
 * Single source of truth for all API endpoints
 */

export const API_ENDPOINTS = {
  // Robot Control
  ROBOT_STATUS: '/api/robot/status',
  ROBOT_EMERGENCY_STOP: '/api/robot/emergency-stop',
  ROBOT_REBOOT: '/api/robot/reboot',
  
  // Sensors
  SENSOR_DISTANCE: '/api/sensors/distance',
  SENSOR_LIGHT: '/api/sensors/light',
  SENSOR_TEMPERATURE: '/api/sensors/temperature',
  SENSOR_ALL: '/api/sensors/all',
  SENSOR_CALIBRATION: '/api/sensors/calibration',
  
  // Camera & Vision
  CAMERA_FEED: '/api/camera/feed',
  CAMERA_CAPTURE: '/api/camera/capture',
  CAMERA_SETTINGS: '/api/camera/settings',
  CAMERA_FOCUS: '/api/camera/focus',
  CAMERA_INFRARED_TOGGLE: '/api/camera/infrared',
  
  // Face Recognition
  FACE_DETECT: '/api/face/detect',
  FACE_RECOGNITION: '/api/face/recognize',
  FACE_STORAGE: '/api/face/storage',
  FACE_LABEL: '/api/face/label',
  FACE_HISTORY: '/api/face/history',
  
  // Media & Photos
  PHOTO_GALLERY: '/api/media/photos',
  PHOTO_DELETE: '/api/media/photos/:id',
  PHOTO_METADATA: '/api/media/photos/:id/metadata',
  VIDEO_RECORD: '/api/media/video/record',
  VIDEO_STOP: '/api/media/video/stop',
  
  // Audio & Music
  AUDIO_VOLUME: '/api/audio/volume',
  AUDIO_SETTINGS: '/api/audio/settings',
  MUSIC_LIBRARY: '/api/music/library',
  MUSIC_PLAY: '/api/music/play',
  MUSIC_PAUSE: '/api/music/pause',
  MUSIC_NEXT: '/api/music/next',
  MUSIC_PREVIOUS: '/api/music/previous',
  MUSIC_PLAYLIST: '/api/music/playlist',
  MUSIC_CURRENT: '/api/music/current',
  
  // Voice & Speech
  VOICE_RECOGNITION: '/api/voice/recognition',
  VOICE_SYNTHESIS: '/api/voice/synthesis',
  VOICE_COMMANDS: '/api/voice/commands',
  VOICE_TRAINING: '/api/voice/training',
  
  // NeoPixel LEDs
  LED_PATTERN: '/api/led/pattern',
  LED_COLOR: '/api/led/color',
  LED_BRIGHTNESS: '/api/led/brightness',
  LED_ANIMATION: '/api/led/animation',
  LED_PRESETS: '/api/led/presets',
  
  // System Settings
  SETTINGS_THEME: '/api/settings/theme',
  SETTINGS_DISPLAY: '/api/settings/display',
  SETTINGS_NETWORK: '/api/settings/network',
  SETTINGS_BACKUP: '/api/settings/backup',
  SETTINGS_FACTORY_RESET: '/api/settings/factory-reset',
  
  // System Health
  HEALTH_STATUS: '/api/health/status',
  HEALTH_LOGS: '/api/health/logs',
  HEALTH_METRICS: '/api/health/metrics',
  HEALTH_DIAGNOSTICS: '/api/health/diagnostics',
  
  // WebSocket Endpoints
  WS_LIVE_FEED: '/ws/camera/live',
  WS_SENSOR_DATA: '/ws/sensors/live',
  WS_ROBOT_STATUS: '/ws/robot/status',
  WS_VOICE_COMMANDS: '/ws/voice/commands',
  WS_SYSTEM_LOGS: '/ws/system/logs',
  WS_MUSIC_SYNC: '/ws/music/sync',
};

/**
 * Helper function to build endpoint URLs with parameters
 * @param {string} endpoint - The endpoint template
 * @param {Object} params - Parameters to replace in the endpoint
 * @returns {string} - The formatted endpoint URL
 */
export const buildEndpoint = (endpoint, params = {}) => {
  let url = endpoint;
  
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  
  return url;
};

/**
 * API Base URL - configurable for different environments
 */
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Same origin in production
  : 'http://localhost:8000'; // Development API server

/**
 * WebSocket Base URL
 */
export const WS_BASE_URL = process.env.NODE_ENV === 'production'
  ? `wss://${window.location.host}`
  : 'ws://localhost:8000';