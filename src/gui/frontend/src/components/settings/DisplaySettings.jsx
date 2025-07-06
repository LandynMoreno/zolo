import React, { useState } from 'react';
import { Monitor, Sun } from 'lucide-react';

const DisplaySettings = ({ onApiCall }) => {
  const [brightness, setBrightness] = useState(80);
  const [screenTimeout, setScreenTimeout] = useState('5 minutes');

  const handleBrightnessChange = (value) => {
    setBrightness(value);
    onApiCall(`Would be calling API_ROUTE="/api/settings/display/brightness" for setting brightness to ${value}%`);
  };

  const handleTimeoutChange = (value) => {
    setScreenTimeout(value);
    onApiCall(`Would be calling API_ROUTE="/api/settings/display/timeout" for setting screen timeout to ${value}`);
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Monitor size={24} />
        Display Settings
      </h3>
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-3 flex items-center gap-2">
            <Sun size={18} />
            Screen Brightness
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="20"
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