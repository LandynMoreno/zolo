import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme.jsx';
import AppTaskbar from './components/AppTaskbar';

// Page imports
import Dashboard from './pages/Dashboard';
import VisionMedia from './pages/VisionMedia';
import MusicAudio from './pages/MusicAudio';
import LEDDesigner from './pages/LEDDesigner';
import Settings from './pages/Settings';

// Import global styles
import './styles/globals.css';

/**
 * Main App component with routing and global providers
 * Features seamless navigation with hidden taskbar
 */
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen bg-background text-text">
          {/* Main content area */}
          <main className="pb-20"> {/* Bottom padding for taskbar space */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vision" element={<VisionMedia />} />
              <Route path="/music" element={<MusicAudio />} />
              <Route path="/leds" element={<LEDDesigner />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          
          {/* Hidden taskbar overlay */}
          <AppTaskbar />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;