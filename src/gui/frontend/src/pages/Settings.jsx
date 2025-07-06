import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Monitor, 
  Wifi, 
  Shield, 
  Info, 
  Moon, 
  Sun,
  Cpu,
  Camera,
  Volume2,
  Bluetooth
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

/**
 * Settings page - System configuration and theme customization
 * Features theme designer, hardware settings, and system status
 */
const Settings = () => {
  const { theme, presets, actions } = useTheme();
  const [activeTab, setActiveTab] = useState('theme');

  const settingsTabs = [
    { id: 'theme', label: 'Theme & Display', icon: Palette },
    { id: 'hardware', label: 'Hardware', icon: Cpu },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'system', label: 'System Info', icon: Info },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8 font-poppins">
          Settings & Configuration
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary-500 text-white' 
                      : 'hover:bg-surface'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Theme & Display Settings */}
            {activeTab === 'theme' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="card">
                  <h3 className="text-xl font-semibold mb-6">Theme Customization</h3>
                  
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {theme.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                      <span className="font-medium">Dark Mode</span>
                    </div>
                    <button
                      onClick={actions.toggleDarkMode}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        theme.darkMode ? 'bg-primary-500' : 'bg-border'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          theme.darkMode ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {/* Theme Presets */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Theme Presets</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(presets).map(([key, preset]) => (
                        <button
                          key={key}
                          onClick={() => actions.setPreset(key)}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            theme.preset === key 
                              ? 'border-primary-500 bg-primary-500/10' 
                              : 'border-border hover:border-primary-500/50'
                          }`}
                        >
                          <div className="flex gap-2 mb-2">
                            {['primary', 'secondary', 'accent'].map((colorKey) => (
                              <div
                                key={colorKey}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: preset.colors[colorKey] }}
                              />
                            ))}
                          </div>
                          <div className="font-medium text-sm">{preset.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Custom Colors */}
                  <div>
                    <h4 className="font-medium mb-3">Custom Colors</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {['primary', 'secondary', 'accent', 'background'].map((colorKey) => (
                        <div key={colorKey} className="flex items-center gap-3">
                          <input
                            type="color"
                            value={theme.colors[colorKey]}
                            onChange={(e) => actions.setCustomColor(colorKey, e.target.value)}
                            className="w-8 h-8 rounded border border-border cursor-pointer"
                          />
                          <div>
                            <div className="font-medium capitalize">{colorKey}</div>
                            <div className="text-sm text-text-light">{theme.colors[colorKey]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Display Settings */}
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Display Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2">Screen Brightness</label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        defaultValue="80"
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Screen Timeout</label>
                      <select className="w-full px-3 py-2 bg-surface border border-border rounded-lg">
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>5 minutes</option>
                        <option>Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Hardware Settings */}
            {activeTab === 'hardware' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Camera Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2">Resolution</label>
                      <select className="w-full px-3 py-2 bg-surface border border-border rounded-lg">
                        <option>1920x1080 (Full HD)</option>
                        <option>1280x720 (HD)</option>
                        <option>640x480 (VGA)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Frame Rate</label>
                      <select className="w-full px-3 py-2 bg-surface border border-border rounded-lg">
                        <option>30 FPS</option>
                        <option>25 FPS</option>
                        <option>15 FPS</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Infrared Mode</span>
                      <button className="relative w-12 h-6 rounded-full bg-border">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Audio Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2">Master Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Microphone Sensitivity</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="60"
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Sensor Calibration</h3>
                  <div className="space-y-3">
                    <button className="button w-full">Calibrate Distance Sensor</button>
                    <button className="button w-full">Calibrate Light Sensor</button>
                    <button className="button w-full">Reset All Sensors</button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Network Settings */}
            {activeTab === 'network' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">WiFi Connection</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div>
                        <div className="font-medium">ZoloRobot_Network</div>
                        <div className="text-sm text-text-light">Connected • Strong signal</div>
                      </div>
                      <div className="text-green-500">●</div>
                    </div>
                    <button className="button w-full">Change Network</button>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">Network Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>IP Address</span>
                      <span className="text-text-light">192.168.1.100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MAC Address</span>
                      <span className="text-text-light">AA:BB:CC:DD:EE:FF</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Signal Strength</span>
                      <span className="text-green-500">Excellent (-45 dBm)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* System Info */}
            {activeTab === 'system' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">System Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Zolo Version</span>
                      <span className="text-text-light">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hardware</span>
                      <span className="text-text-light">Raspberry Pi 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory</span>
                      <span className="text-text-light">4.2 GB / 8 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage</span>
                      <span className="text-text-light">22 GB / 64 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span className="text-text-light">2 days, 14 hours</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">System Actions</h3>
                  <div className="space-y-3">
                    <button className="button w-full">Check for Updates</button>
                    <button className="button-secondary w-full">Restart System</button>
                    <button className="button w-full bg-red-500 hover:bg-red-600">Factory Reset</button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;