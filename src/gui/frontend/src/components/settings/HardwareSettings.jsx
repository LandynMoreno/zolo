import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Volume2, Cpu, Settings as SettingsIcon } from 'lucide-react';

const HardwareSettings = ({ onApiCall }) => {
  const [cameraResolution, setCameraResolution] = useState('1920x1080 (Full HD)');
  const [frameRate, setFrameRate] = useState('30 FPS');
  const [infraredMode, setInfraredMode] = useState(false);
  const [masterVolume, setMasterVolume] = useState(70);
  const [micSensitivity, setMicSensitivity] = useState(60);

  const handleVolumeChange = (value) => {
    setMasterVolume(value);
    onApiCall(`Would be calling API_ROUTE="/api/settings/audio/volume" for setting master volume to ${value}%`);
  };

  const handleMicSensitivityChange = (value) => {
    setMicSensitivity(value);
    onApiCall(`Would be calling API_ROUTE="/api/settings/audio/mic-sensitivity" for setting microphone sensitivity to ${value}%`);
  };

  const handleInfraredToggle = () => {
    const newState = !infraredMode;
    setInfraredMode(newState);
    onApiCall(`Would be calling API_ROUTE="/api/settings/camera/infrared" for ${newState ? 'enabling' : 'disabling'} infrared mode`);
  };

  const handleCalibrateSensor = (sensorType) => {
    onApiCall(`Would be calling API_ROUTE="/api/settings/sensors/calibrate" for calibrating ${sensorType} sensor`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Camera size={24} />
          Camera Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Resolution</label>
            <select 
              value={cameraResolution}
              onChange={(e) => {
                setCameraResolution(e.target.value);
                onApiCall(`Would be calling API_ROUTE="/api/settings/camera/resolution" for setting resolution to ${e.target.value}`);
              }}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text focus:border-primary-500 focus:outline-none"
            >
              <option value="1920x1080 (Full HD)">1920x1080 (Full HD)</option>
              <option value="1280x720 (HD)">1280x720 (HD)</option>
              <option value="640x480 (VGA)">640x480 (VGA)</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Frame Rate</label>
            <select 
              value={frameRate}
              onChange={(e) => {
                setFrameRate(e.target.value);
                onApiCall(`Would be calling API_ROUTE="/api/settings/camera/framerate" for setting frame rate to ${e.target.value}`);
              }}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text focus:border-primary-500 focus:outline-none"
            >
              <option value="30 FPS">30 FPS</option>
              <option value="25 FPS">25 FPS</option>
              <option value="15 FPS">15 FPS</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Infrared Mode</span>
            <button
              onClick={handleInfraredToggle}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                infraredMode ? 'bg-primary-500' : 'bg-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  infraredMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Volume2 size={24} />
          Audio Settings
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-3">Master Volume</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={masterVolume}
                onChange={(e) => handleVolumeChange(e.target.value)}
                className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${masterVolume}%, var(--color-border) ${masterVolume}%, var(--color-border) 100%)`
                }}
              />
              <span className="text-lg font-medium min-w-[4rem] text-primary-500">{masterVolume}%</span>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-3">Microphone Sensitivity</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={micSensitivity}
                onChange={(e) => handleMicSensitivityChange(e.target.value)}
                className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${micSensitivity}%, var(--color-border) ${micSensitivity}%, var(--color-border) 100%)`
                }}
              />
              <span className="text-lg font-medium min-w-[4rem] text-primary-500">{micSensitivity}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <SettingsIcon size={24} />
          Sensor Calibration
        </h3>
        <div className="space-y-3">
          <button 
            onClick={() => handleCalibrateSensor('distance')}
            className="button w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Calibrate Distance Sensor
          </button>
          <button 
            onClick={() => handleCalibrateSensor('light')}
            className="button w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Calibrate Light Sensor
          </button>
          <button 
            onClick={() => handleCalibrateSensor('all')}
            className="button w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset All Sensors
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HardwareSettings;