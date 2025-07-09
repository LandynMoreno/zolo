# Zolo Robot GUI - React Frontend

A seamless, touch-friendly interface for the Zolo robot with macOS-style navigation and beautiful themes inspired by Zen Browser.

## 🚀 Demo & Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Run

```bash
# Navigate to frontend directory
cd src/gui/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

The app will hot-reload when you make changes to the source files.

## ✨ Features Implemented

### 🎨 **Design System**
- **Zen Browser inspired colors** - Soft orange (#E8A87C) with cream/grey palette
- **Smooth animations** - 200-300ms transitions with Framer Motion
- **Touch-optimized** - 44px minimum touch targets, gesture support
- **Responsive design** - Mobile-first approach with Tailwind CSS

### 📱 **macOS-Style Taskbar**
- **Auto-hide functionality** - Hidden by default, appears on touch/hover
- **Glass morphism** - Blurred background with subtle borders
- **Smooth animations** - Spring-based entrance/exit animations
- **Touch gestures** - Swipe up from bottom to reveal
- **Active indicators** - Glowing effects for current page

### 🏠 **5 Main Pages**

1. **Dashboard** - Robot status overview and quick actions
2. **Vision & Media** - Camera feed, photo gallery, face recognition
3. **Music & Audio** - Player with visualizer, playlists, voice commands  
4. **LED Designer** - Touch-based NeoPixel pattern creator
5. **Settings** - Theme customization and system configuration

### 🎯 **Key Components**
- `<AppTaskbar />` - Hidden navigation bar with glass effects
- `<TaskbarIcon />` - Animated navigation icons with haptic feedback
- `<ThemeProvider />` - Global theme management with persistence
- Page components with smooth transitions and loading states

### 🛠️ **Technical Architecture**
- **React 18** with modern hooks and concurrent features
- **Vite** for lightning-fast development and hot reloading
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations and gestures
- **React Router** for client-side navigation
- **Material-UI** for proven component patterns

## 🎨 Theme System

### Available Themes
- **Zen** (default) - Soft orange with cream tones
- **Dark** - High contrast dark mode
- **Ocean** - Blue and teal palette  
- **Sunset** - Warm orange and brown tones

### Custom Colors
Users can customize any theme color via the Settings page:
- Primary, Secondary, Accent colors
- Background and Surface colors
- Real-time preview with CSS custom properties
- Automatic persistence to localStorage

## 📱 Touch & Mobile Optimizations

- **Gesture Support** - Swipe navigation, pinch-to-zoom
- **Touch Targets** - Minimum 44px for accessibility
- **Prevent Zoom** - Double-tap zoom disabled for app-like feel
- **Smooth Scrolling** - Custom scrollbars and momentum
- **Orientation Handling** - Responsive to device rotation

## 🔌 API Integration

### Mock Data
All components use comprehensive mock data for development:
- Robot sensor readings
- Photo gallery with metadata
- Music library with playlists
- Face recognition data
- System health metrics

### Endpoint Constants
```javascript
import { API_ENDPOINTS } from './constants/endpoints';

// All API calls use centralized endpoints
fetch(API_ENDPOINTS.ROBOT_STATUS)
fetch(API_ENDPOINTS.MUSIC_PLAY)
```

## 🎵 Music Experience Highlights

The Music & Audio page features:
- **Full-screen now playing** with large album art
- **Real-time visualizer** with animated frequency bars
- **Touch scrubbing** progress bar
- **Playlist management** with drag-and-drop
- **Voice command center** with visual feedback
- **SQLite integration** ready for music metadata

## 🎨 LED Designer Features

Interactive NeoPixel control:
- **12-LED ring visualization** with real-time preview
- **Touch-based color wheel** for HSV color selection
- **Pattern presets** (solid, wave, fade, rainbow, etc.)
- **Custom pattern saving** with local persistence
- **Brightness control** with live updates

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Dependencies
npm install          # Install all dependencies
npm update           # Update dependencies
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AppTaskbar.jsx   # Hidden navigation bar
│   └── TaskbarIcon.jsx  # Individual nav icons
├── pages/               # Main application pages
│   ├── Dashboard.jsx    # Home/status page
│   ├── VisionMedia.jsx  # Camera and photos
│   ├── MusicAudio.jsx   # Music player
│   ├── LEDDesigner.jsx  # NeoPixel controls
│   └── Settings.jsx     # Configuration
├── hooks/               # Custom React hooks
│   ├── useTheme.js      # Theme management
│   └── useTaskbarVisibility.js # Taskbar logic
├── constants/           # Configuration files
│   ├── endpoints.js     # API endpoint URLs
│   └── theme.js         # Theme definitions
├── mocks/              # Mock API responses
│   └── api-responses.js # Development data
└── styles/             # Global styles
    └── globals.css     # Tailwind + custom CSS
```

## 🌟 Design Philosophy

Following the principle that **"SIMPLICITY ALWAYS WINS WITH UI"**:

- **Minimal cognitive load** - Clear visual hierarchy
- **Consistent patterns** - Reusable components throughout
- **Touch-first design** - Every interaction optimized for fingers
- **Smooth transitions** - No jarring movements or sudden changes
- **Beautiful defaults** - Carefully chosen colors and typography

## 🔄 Real-time Features

Ready for WebSocket integration:
- Live sensor data updates
- Real-time camera feed
- Music sync across devices
- System status monitoring
- Voice command feedback

## 🎯 Next Steps

1. **Backend Integration** - Connect to Python robot API
2. **WebSocket Setup** - Real-time data streaming  
3. **Camera Feed** - Live video integration
4. **Audio Processing** - Music visualizer data
5. **Hardware Control** - LED and sensor control

---

**Built with ❤️ for the Zolo Robot Project**

*Touch the screen anywhere to reveal the beautiful taskbar!*