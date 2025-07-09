/**
 * Mock API Responses for Development
 * Simulates real robot API responses for frontend development
 */

// Helper function to generate random values
const randomBetween = (min, max) => Math.random() * (max - min) + min;
const randomBool = () => Math.random() > 0.5;
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const MOCK_RESPONSES = {
  // Robot Status
  robotStatus: {
    isOnline: true,
    batteryLevel: Math.floor(randomBetween(20, 100)),
    temperature: randomBetween(35, 45),
    uptime: 3600000, // 1 hour in milliseconds
    lastUpdate: new Date().toISOString(),
    mode: randomFromArray(['active', 'idle', 'charging']),
    errors: [],
    warnings: randomBool() ? ['High temperature detected'] : []
  },

  // Sensor Data
  sensorData: {
    distance: randomBetween(10, 300),
    light: randomBetween(0, 1000),
    temperature: randomBetween(20, 30),
    humidity: randomBetween(30, 70),
    timestamp: new Date().toISOString(),
    calibrated: true
  },

  // Camera Settings
  cameraSettings: {
    resolution: '1920x1080',
    fps: 30,
    brightness: 50,
    contrast: 50,
    focus: 'auto',
    infraredMode: false,
    isRecording: false
  },

  // Face Recognition
  faceDetection: {
    faces: [
      {
        id: 'face_001',
        confidence: 0.95,
        boundingBox: { x: 100, y: 50, width: 150, height: 180 },
        label: 'John Doe',
        isKnown: true
      },
      {
        id: 'face_002',
        confidence: 0.87,
        boundingBox: { x: 300, y: 80, width: 140, height: 170 },
        label: 'Unknown',
        isKnown: false
      }
    ],
    timestamp: new Date().toISOString()
  },

  // Photo Gallery
  photoGallery: [
    {
      id: 'photo_001',
      filename: 'IMG_20240101_100530.jpg',
      path: '/photos/IMG_20240101_100530.jpg',
      thumbnail: '/photos/thumbs/IMG_20240101_100530_thumb.jpg',
      timestamp: '2024-01-01T10:05:30Z',
      size: 2048576,
      resolution: '1920x1080',
      faces: ['John Doe'],
      tags: ['indoor', 'living room']
    },
    {
      id: 'photo_002',
      filename: 'IMG_20240101_143022.jpg',
      path: '/photos/IMG_20240101_143022.jpg',
      thumbnail: '/photos/thumbs/IMG_20240101_143022_thumb.jpg',
      timestamp: '2024-01-01T14:30:22Z',
      size: 1847293,
      resolution: '1920x1080',
      faces: ['Jane Smith'],
      tags: ['outdoor', 'garden']
    },
    {
      id: 'photo_003',
      filename: 'IMG_20240102_092015.jpg',
      path: '/photos/IMG_20240102_092015.jpg',
      thumbnail: '/photos/thumbs/IMG_20240102_092015_thumb.jpg',
      timestamp: '2024-01-02T09:20:15Z',
      size: 1923847,
      resolution: '1920x1080',
      faces: [],
      tags: ['landscape', 'sunrise']
    }
  ],

  // Music Library
  musicLibrary: {
    songs: [
      {
        id: 'song_001',
        title: 'Ambient Waves',
        artist: 'Nature Sounds',
        album: 'Peaceful Moments',
        duration: 240,
        path: '/music/ambient_waves.mp3',
        artwork: '/music/artwork/peaceful_moments.jpg',
        genre: 'Ambient',
        year: 2023
      },
      {
        id: 'song_002',
        title: 'Robot Dance',
        artist: 'Electronic Dreams',
        album: 'Future Beats',
        duration: 180,
        path: '/music/robot_dance.mp3',
        artwork: '/music/artwork/future_beats.jpg',
        genre: 'Electronic',
        year: 2024
      },
      {
        id: 'song_003',
        title: 'Gentle Morning',
        artist: 'Calm Collective',
        album: 'Dawn Sessions',
        duration: 300,
        path: '/music/gentle_morning.mp3',
        artwork: '/music/artwork/dawn_sessions.jpg',
        genre: 'Ambient',
        year: 2023
      }
    ],
    playlists: [
      {
        id: 'playlist_001',
        name: 'Morning Vibes',
        description: 'Perfect for starting the day',
        songs: ['song_001', 'song_003'],
        artwork: '/music/playlists/morning_vibes.jpg',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'playlist_002',
        name: 'Robot Beats',
        description: 'Electronic music for robot activities',
        songs: ['song_002'],
        artwork: '/music/playlists/robot_beats.jpg',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ]
  },

  // Current Playing Music
  currentMusic: {
    song: {
      id: 'song_001',
      title: 'Ambient Waves',
      artist: 'Nature Sounds',
      album: 'Peaceful Moments',
      duration: 240,
      artwork: '/music/artwork/peaceful_moments.jpg'
    },
    isPlaying: true,
    currentTime: 45,
    volume: 0.7,
    playlist: 'Morning Vibes',
    repeat: false,
    shuffle: false
  },

  // Voice Commands
  voiceCommands: {
    isListening: false,
    lastCommand: 'Take a photo',
    confidence: 0.92,
    timestamp: new Date().toISOString(),
    availableCommands: [
      'Take a photo',
      'Start recording',
      'Play music',
      'Stop music',
      'Change LED color',
      'Show sensor data',
      'Emergency stop'
    ]
  },

  // LED Settings
  ledSettings: {
    currentPattern: 'solid',
    color: '#E8A87C',
    brightness: 80,
    animation: 'none',
    presets: [
      { id: 'preset_001', name: 'Warm White', pattern: 'solid', color: '#FFF8E1' },
      { id: 'preset_002', name: 'Ocean Blue', pattern: 'wave', color: '#2196F3' },
      { id: 'preset_003', name: 'Sunset', pattern: 'fade', color: '#FF5722' },
      { id: 'preset_004', name: 'Rainbow', pattern: 'cycle', color: '#FFFFFF' }
    ]
  },

  // System Health
  systemHealth: {
    cpu: {
      usage: randomBetween(10, 60),
      temperature: randomBetween(35, 65),
      load: [randomBetween(0.1, 1.0), randomBetween(0.1, 1.0), randomBetween(0.1, 1.0)]
    },
    memory: {
      total: 8192,
      used: randomBetween(2048, 4096),
      free: randomBetween(4096, 6144),
      usage: randomBetween(25, 50)
    },
    disk: {
      total: 64000,
      used: randomBetween(10000, 30000),
      free: randomBetween(34000, 54000),
      usage: randomBetween(15, 45)
    },
    network: {
      connected: true,
      ssid: 'ZoloRobot_Network',
      signalStrength: randomBetween(70, 100),
      ipAddress: '192.168.1.100'
    },
    timestamp: new Date().toISOString()
  },

  // Theme Settings
  themeSettings: {
    currentTheme: 'zen',
    customColors: {
      primary: '#E8A87C',
      secondary: '#8B9AAF',
      background: '#FEFCF8',
      surface: '#F5F2ED',
      accent: '#D4B896'
    },
    darkMode: false,
    autoTheme: false
  },

  // Audio Visualizer Data
  audioVisualizerData: {
    frequencyData: Array.from({ length: 64 }, () => randomBetween(0, 255)),
    waveformData: Array.from({ length: 128 }, () => randomBetween(-128, 128)),
    timestamp: new Date().toISOString(),
    isActive: true
  },

  // Error Logs
  errorLogs: [
    {
      id: 'log_001',
      level: 'warning',
      message: 'High CPU temperature detected',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      component: 'thermal_monitor'
    },
    {
      id: 'log_002',
      level: 'info',
      message: 'Face recognition model loaded successfully',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      component: 'face_recognition'
    },
    {
      id: 'log_003',
      level: 'error',
      message: 'Camera connection timeout',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      component: 'camera_module'
    }
  ]
};

/**
 * Mock API delay simulation
 */
export const simulateApiDelay = (min = 100, max = 500) => {
  return new Promise(resolve => {
    setTimeout(resolve, randomBetween(min, max));
  });
};

/**
 * Mock API error simulation
 */
export const simulateApiError = (errorRate = 0.1) => {
  if (Math.random() < errorRate) {
    throw new Error('Simulated API error');
  }
};

/**
 * Mock data generators for real-time updates
 */
export const generateMockSensorData = () => ({
  ...MOCK_RESPONSES.sensorData,
  distance: randomBetween(10, 300),
  light: randomBetween(0, 1000),
  temperature: randomBetween(20, 30),
  timestamp: new Date().toISOString()
});

export const generateMockSystemHealth = () => ({
  ...MOCK_RESPONSES.systemHealth,
  cpu: {
    ...MOCK_RESPONSES.systemHealth.cpu,
    usage: randomBetween(10, 60),
    temperature: randomBetween(35, 65)
  },
  memory: {
    ...MOCK_RESPONSES.systemHealth.memory,
    usage: randomBetween(25, 50)
  },
  timestamp: new Date().toISOString()
});

export const generateMockAudioData = () => ({
  frequencyData: Array.from({ length: 64 }, () => randomBetween(0, 255)),
  waveformData: Array.from({ length: 128 }, () => randomBetween(-128, 128)),
  timestamp: new Date().toISOString(),
  isActive: true
});