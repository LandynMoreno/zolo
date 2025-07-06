import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Save, Play, Square } from 'lucide-react';

/**
 * NeoPixel LED Designer page - Touch-based LED pattern creation
 * Features color wheel, pattern designer, and live preview
 */
const LEDDesigner = () => {
  const [selectedColor, setSelectedColor] = useState('#E8A87C');
  const [brightness, setBrightness] = useState(80);
  const [selectedLED, setSelectedLED] = useState(null);
  
  // Simulate 12 LED ring
  const leds = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: i % 3 === 0 ? selectedColor : '#333333',
    active: i % 3 === 0
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8 font-poppins">
          NeoPixel LED Designer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LED Ring Preview */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6">Live LED Ring Preview</h3>
            
            {/* LED Ring Visualization */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-border"></div>
              {leds.map((led, index) => {
                const angle = (index * 30) - 90; // 30 degrees apart, starting at top
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <motion.button
                    key={led.id}
                    className="absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: led.color,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: led.active ? `0 0 20px ${led.color}` : 'none',
                    }}
                    onClick={() => setSelectedLED(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                      scale: selectedLED === index ? 1.3 : 1,
                      boxShadow: led.active ? `0 0 20px ${led.color}` : 'none'
                    }}
                  />
                );
              })}
              
              {/* Center indicator */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-surface rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Pattern Controls */}
            <div className="flex gap-2 justify-center mb-4">
              <button className="button flex items-center gap-2">
                <Play size={16} />
                Test Pattern
              </button>
              <button className="button-secondary flex items-center gap-2">
                <Square size={16} />
                Clear All
              </button>
            </div>
            
            {/* Brightness Control */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${brightness}%, var(--color-border) ${brightness}%, var(--color-border) 100%)`
                }}
              />
            </div>
          </div>
          
          {/* Color Picker and Controls */}
          <div className="space-y-6">
            {/* Color Wheel */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Color Picker</h3>
              
              {/* Color Wheel Placeholder */}
              <div className="w-48 h-48 rounded-full mx-auto mb-4 relative" 
                   style={{
                     background: `conic-gradient(
                       hsl(0, 100%, 50%) 0deg,
                       hsl(60, 100%, 50%) 60deg,
                       hsl(120, 100%, 50%) 120deg,
                       hsl(180, 100%, 50%) 180deg,
                       hsl(240, 100%, 50%) 240deg,
                       hsl(300, 100%, 50%) 300deg,
                       hsl(360, 100%, 50%) 360deg
                     )`
                   }}>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                </div>
              </div>
              
              {/* Color Input */}
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg"
                  placeholder="#E8A87C"
                />
              </div>
            </div>
            
            {/* Quick Colors */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Quick Colors</h3>
              <div className="grid grid-cols-6 gap-2">
                {[
                  '#E8A87C', '#FF6B4A', '#4299E1', '#68D391', 
                  '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899',
                  '#10B981', '#F97316', '#6366F1', '#84CC16'
                ].map((color) => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform"
                    style={{ 
                      backgroundColor: color,
                      borderColor: selectedColor === color ? '#fff' : 'transparent'
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            
            {/* Pattern Presets */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Pattern Presets</h3>
              <div className="space-y-2">
                {[
                  { name: 'Warm White', pattern: 'solid' },
                  { name: 'Ocean Waves', pattern: 'wave' },
                  { name: 'Sunset Fade', pattern: 'fade' },
                  { name: 'Rainbow Cycle', pattern: 'rainbow' },
                  { name: 'Breathing', pattern: 'breath' },
                  { name: 'Sparkle', pattern: 'sparkle' }
                ].map((preset, i) => (
                  <button
                    key={i}
                    className="w-full p-3 text-left rounded-lg hover:bg-surface transition-colors border border-border"
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-sm text-text-light capitalize">{preset.pattern} pattern</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Save Pattern */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Save Custom Pattern</h3>
              <input
                type="text"
                placeholder="Enter pattern name..."
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg mb-3"
              />
              <button className="button w-full flex items-center justify-center gap-2">
                <Save size={16} />
                Save Pattern
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LEDDesigner;