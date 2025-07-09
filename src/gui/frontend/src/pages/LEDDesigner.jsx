import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Save, Play, Square, Zap, Sun } from 'lucide-react';
import ApiNotification from '../components/shared/ApiNotification';
import { API_ENDPOINTS, API_BASE_URL } from '../constants/endpoints';

/**
 * NeoPixel LED Designer page - Touch-based LED pattern creation
 * Features color wheel, pattern designer, and live preview with full functionality
 */
const LEDDesigner = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#E8A87C');
  const [brightness, setBrightness] = useState(80);
  const [selectedLED, setSelectedLED] = useState(null);
  const [ledColors, setLedColors] = useState({});
  const [isTestingPattern, setIsTestingPattern] = useState(false);

  const handleApiCall = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const patternPresets = [
    { name: 'Warm White', colors: ['#FFF8DC', '#F5DEB3', '#DDD'], icon: '●' },
    { name: 'Ocean Waves', colors: ['#0077BE', '#00A8CC', '#40E0D0'], icon: '~' },
    { name: 'Sunset Fade', colors: ['#FF6B35', '#F7931E', '#FFD23F'], icon: '◐' },
    { name: 'Rainbow Cycle', colors: ['#FF0000', '#00FF00', '#0000FF'], icon: '◉' },
    { name: 'Breathing', colors: ['#E8A87C', '#D2691E', '#8B4513'], icon: '◔' },
    { name: 'Sparkle', colors: ['#FFFFFF', '#FFD700', '#C0C0C0'], icon: '✦' }
  ];
  
  // Simulate 12 LED ring with proper centering
  const generateLEDs = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const baseColor = ledColors[i] || '#333333';
      return {
        id: i,
        color: baseColor,
        active: baseColor !== '#333333'
      };
    });
  };

  const leds = generateLEDs();

  const handleLEDClick = async (index) => {
    setSelectedLED(index);
    setLedColors(prev => ({
      ...prev,
      [index]: selectedColor
    }));
    
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LED_CONTROL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          led_index: index,
          color: selectedColor,
          brightness: brightness
        })
      });
      
      if (response.ok) {
        handleApiCall(`Successfully set LED ${index} to color ${selectedColor}`);
      } else {
        handleApiCall(`Error setting LED ${index}: ${response.statusText}`);
      }
    } catch (error) {
      handleApiCall(`Network error setting LED ${index}: ${error.message}`);
    }
  };

  const handleTestPattern = async () => {
    if (isTestingPattern) {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LED_PATTERN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'stop'
          })
        });
        
        if (response.ok) {
          handleApiCall('Test pattern stopped successfully');
          setIsTestingPattern(false);
        } else {
          handleApiCall(`Error stopping test pattern: ${response.statusText}`);
        }
      } catch (error) {
        handleApiCall(`Network error stopping test pattern: ${error.message}`);
      }
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LED_PATTERN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'test',
            pattern: 'rainbow_cycle',
            duration: 3000
          })
        });
        
        if (response.ok) {
          handleApiCall('Test pattern started successfully');
          setIsTestingPattern(true);
          
          // Auto-stop after 3 seconds
          setTimeout(() => {
            setIsTestingPattern(false);
          }, 3000);
        } else {
          handleApiCall(`Error starting test pattern: ${response.statusText}`);
        }
      } catch (error) {
        handleApiCall(`Network error starting test pattern: ${error.message}`);
      }
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LED_CONTROL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'clear_all'
        })
      });
      
      if (response.ok) {
        handleApiCall('All LEDs cleared successfully');
        setLedColors({});
        setSelectedLED(null);
      } else {
        handleApiCall(`Error clearing LEDs: ${response.statusText}`);
      }
    } catch (error) {
      handleApiCall(`Network error clearing LEDs: ${error.message}`);
    }
  };

  const handlePresetClick = async (preset) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LED_PATTERN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'preset',
          pattern_name: preset.name.toLowerCase().replace(/\s+/g, '_'),
          colors: preset.colors,
          brightness: brightness
        })
      });
      
      if (response.ok) {
        handleApiCall(`Applied ${preset.name} pattern successfully`);
        const newColors = {};
        leds.forEach((_, index) => {
          newColors[index] = preset.colors[index % preset.colors.length];
        });
        setLedColors(newColors);
      } else {
        handleApiCall(`Error applying ${preset.name} pattern: ${response.statusText}`);
      }
    } catch (error) {
      handleApiCall(`Network error applying ${preset.name} pattern: ${error.message}`);
    }
  };

  const handleBrightnessChange = async (newBrightness) => {
    setBrightness(newBrightness);
    
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LED_CONTROL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'set_brightness',
          brightness: parseInt(newBrightness)
        })
      });
      
      if (response.ok) {
        handleApiCall(`Brightness set to ${newBrightness}% successfully`);
      } else {
        handleApiCall(`Error setting brightness: ${response.statusText}`);
      }
    } catch (error) {
      handleApiCall(`Network error setting brightness: ${error.message}`);
    }
  };

  const handleColorWheelClick = () => {
    handleApiCall('Would be calling API_ROUTE="/api/color-picker" for opening advanced color picker');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-2"
    >
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* LED Ring Preview */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-6">Live LED Ring Preview</h3>
              
              {/* LED Ring Visualization */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                {leds.map((led, index) => {
                  const angle = (index * 30) - 90; // 30 degrees apart, starting at top
                  const radius = 105; // Fixed radius for proper centering
                  const centerX = 128; // Half of 256px container
                  const centerY = 128; // Half of 256px container
                  const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
                  const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
                  
                  return (
                    <motion.button
                      key={led.id}
                      className="absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        backgroundColor: led.color,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: led.active ? `0 0 20px ${led.color}` : 'none',
                      }}
                      onClick={() => handleLEDClick(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ 
                        scale: selectedLED === index ? 1.3 : 1,
                        boxShadow: led.active ? `0 0 20px ${led.color}` : 'none',
                        backgroundColor: isTestingPattern ? '#FFD700' : led.color
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  );
                })}
              </div>
              
              {/* Pattern Controls */}
              <div className="flex gap-2 justify-center mb-6">
                <button 
                  onClick={handleTestPattern}
                  className={`button flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isTestingPattern 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {isTestingPattern ? <Square size={16} /> : <Play size={16} />}
                  {isTestingPattern ? 'Stop Test' : 'Test Pattern'}
                </button>
                <button 
                  onClick={handleClearAll}
                  className="button bg-surface hover:bg-surface/80 text-text border border-border flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                >
                  <Square size={16} />
                  Clear All
                </button>
              </div>
              
              {/* Brightness Control */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sun size={20} />
                  Brightness
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => handleBrightnessChange(e.target.value)}
                    className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${brightness}%, var(--color-border) ${brightness}%, var(--color-border) 100%)`
                    }}
                  />
                  <span className="text-lg font-medium min-w-[4rem] text-primary-500">{brightness}%</span>
                </div>
              </div>
            </div>
            
            {/* Pattern Presets and Quick Colors */}
            <div className="lg:col-span-2 space-y-3">
              {/* Pattern Presets */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Pattern Presets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {patternPresets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handlePresetClick(preset)}
                      className="p-3 text-left rounded-lg hover:bg-surface transition-colors border border-border flex items-center gap-3"
                    >
                      <div className="flex gap-1">
                        {preset.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2 text-sm">
                          <span className="text-sm">{preset.icon}</span>
                          {preset.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quick Colors - Enhanced */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quick Colors</h3>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    // Row 1
                    { color: '#E8A87C', name: 'Warm Peach' },
                    { color: '#FF6B4A', name: 'Coral Red' },
                    { color: '#4299E1', name: 'Sky Blue' },
                    { color: '#68D391', name: 'Mint Green' },
                    { color: '#F59E0B', name: 'Golden Yellow' },
                    { color: '#EF4444', name: 'Ruby Red' },
                    // Row 2  
                    { color: '#8B5CF6', name: 'Purple Dream' },
                    { color: '#EC4899', name: 'Hot Pink' },
                    { color: '#10B981', name: 'Emerald Green' },
                    { color: '#F97316', name: 'Sunset Orange' },
                    { color: '#6366F1', name: 'Royal Blue' },
                    { color: '#84CC16', name: 'Lime Green' },
                    // Row 3 - New row
                    { color: '#FF1744', name: 'Cherry Red' },
                    { color: '#00E676', name: 'Neon Green' },
                    { color: '#00BCD4', name: 'Cyan Blue' },
                    { color: '#FFD54F', name: 'Bright Yellow' },
                    { color: '#9C27B0', name: 'Deep Purple' },
                    { color: '#607D8B', name: 'Steel Gray' }
                  ].map(({ color, name }) => (
                    <div key={color} className="flex flex-col items-center gap-1">
                      <button
                        className="w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: color,
                          borderColor: selectedColor === color ? 'var(--color-primary)' : 'transparent'
                        }}
                        onClick={() => {
                          setSelectedColor(color);
                          handleApiCall(`Selected quick color ${color}`);
                        }}
                      />
                      <span className="text-xs text-text-light text-center leading-tight">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Custom Color Input */}
                <div className="flex items-center gap-3 mt-4">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      handleApiCall(`Selected custom color ${e.target.value}`);
                    }}
                    className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-text placeholder-text-light"
                    placeholder="#E8A87C"
                    style={{ color: 'var(--color-text)' }}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
      
      {/* API Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map(notification => (
          <ApiNotification
            key={notification.id}
            message={notification.message}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LEDDesigner;