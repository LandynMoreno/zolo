import React, { useState } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';

const DisplaySettings = ({ onApiCall }) => {
  const [brightness, setBrightness] = useState(80);
  const [screenTimeout, setScreenTimeout] = useState('5 minutes');
  const [dynamicBrightness, setDynamicBrightness] = useState(false);

  const handleBrightnessChange = (value) => {
    setBrightness(value);
    onApiCall(`Would be calling API_ROUTE="/api/settings/display/brightness" for setting brightness to ${value}%`);
  };

  const handleTimeoutChange = (value) => {
    setScreenTimeout(value);
    onApiCall(`Would be calling API_ROUTE="/api/settings/display/timeout" for setting screen timeout to ${value}`);
  };

  const handleDynamicBrightnessToggle = () => {
    setDynamicBrightness(!dynamicBrightness);
    onApiCall(`Would be calling API_ROUTE="/api/settings/display/dynamic-brightness" for ${dynamicBrightness ? 'disabling' : 'enabling'} dynamic brightness`);
  };

  return (
    <div className="card">
      <div className="space-y-6">
        {/* Dynamic Brightness Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {dynamicBrightness ? <Moon size={20} /> : <Sun size={20} />}
            <div>
              <span className="font-medium">Dynamic Brightness</span>
              <p className="text-sm text-text-light">Automatically adjust based on ambient light</p>
            </div>
          </div>
          <button
            onClick={handleDynamicBrightnessToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              dynamicBrightness ? 'bg-primary-500' : 'bg-border'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                dynamicBrightness ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block font-medium mb-3 flex items-center gap-2">
            <Sun size={18} />
            Screen Brightness
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => handleBrightnessChange(e.target.value)}
              disabled={dynamicBrightness}
              className={`flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer ${
                dynamicBrightness ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${brightness}%, var(--color-border) ${brightness}%, var(--color-border) 100%)`
              }}
            />
            <span className="text-lg font-medium min-w-[4rem] text-primary-500">{brightness}%</span>
          </div>
          {dynamicBrightness && (
            <p className="text-xs text-text-light mt-1">Brightness is automatically controlled by light sensor</p>
          )}
        </div>
        
        <div>
          <label className="block font-medium mb-2">Screen Timeout</label>
          <select 
            value={screenTimeout}
            onChange={(e) => handleTimeoutChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text focus:border-primary-500 focus:outline-none"
          >
            <option value="30 seconds">30 seconds</option>
            <option value="1 minute">1 minute</option>
            <option value="5 minutes">5 minutes</option>
            <option value="15 minutes">15 minutes</option>
            <option value="Never">Never</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;