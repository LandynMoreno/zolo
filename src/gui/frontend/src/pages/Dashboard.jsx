import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Wifi, Thermometer, Activity, Camera, Music, AlertTriangle, X } from 'lucide-react';
import TodoWidget from '../components/dashboard/TodoWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import AlarmWidget from '../components/dashboard/AlarmWidget';
import GitHubWidget from '../components/dashboard/GitHubWidget';
import ApiNotification from '../components/shared/ApiNotification';
import Modal from '../components/shared/Modal';

/**
 * Dashboard/Home page - Main robot status and navigation hub
 * Modern widget-based dashboard with comprehensive functionality
 */
const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);
  
  // Robot status data
  const robotStatus = {
    battery: 85,
    temperature: 42.5,
    wifi: { strength: 3, ssid: 'ZoloNetwork' }, // 0-4 scale
    isOnline: true,
    sensors: {
      distance: 125.3,
      light: 750,
      motion: true
    }
  };

  // Helper functions
  const getBatteryColor = (level) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTemperatureColor = (temp) => {
    if (temp > 60) return 'text-red-500'; // Hot - dangerous
    if (temp > 45) return 'text-orange-500'; // Warm - warning
    if (temp > 35) return 'text-yellow-500'; // Normal warm
    if (temp > 20) return 'text-green-500'; // Normal
    return 'text-blue-500'; // Cool
  };

  const renderWifiSignal = (strength) => {
    const bars = Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-sm ${
          i < strength ? 'bg-green-500' : 'bg-gray-300'
        }`}
        style={{ height: `${(i + 1) * 3 + 2}px` }}
      />
    ));
    return <div className="flex items-end gap-0.5">{bars}</div>;
  };

  const renderBattery = (level) => {
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          {/* Battery Shell */}
          <div className="w-8 h-5 border-2 border-current rounded-sm relative">
            {/* Battery Tip */}
            <div className="absolute -right-1 top-1 w-1 h-3 bg-current rounded-r-sm"></div>
            
            {/* Battery Fill */}
            <div className="absolute inset-0.5 rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-sm ${getBatteryColor(level).replace('text-', 'bg-')}`}
              />
            </div>
            
            {/* Battery Fill Gradient Effect */}
            <div className="absolute inset-0.5 rounded-sm overflow-hidden pointer-events-none">
              <div 
                className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`font-semibold ${getBatteryColor(level)}`}>{level}%</span>
          <span className="text-xs text-text-light">
            {level > 80 ? 'Excellent' : level > 50 ? 'Good' : level > 20 ? 'Low' : 'Critical'}
          </span>
        </div>
      </div>
    );
  };

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

  const handleTakePhoto = () => {
    setIsCameraModalOpen(true);
  };

  const handleCameraCapture = () => {
    if (isCountingDown) return;
    
    setIsCountingDown(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsCountingDown(false);
          setIsCameraModalOpen(false);
          // Take the actual photo
          handleApiCall('Would be calling API_ROUTE="/api/camera/capture" for capturing photo with countdown');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePlayMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    const action = isMusicPlaying ? 'stopping' : 'starting';
    handleApiCall(`Would be calling API_ROUTE="/api/music/${isMusicPlaying ? 'pause' : 'play'}" for ${action} music playback`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-2"
    >
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {/* Interactive Widgets */}
          <TodoWidget onApiCall={handleApiCall} />
          <CalendarWidget onApiCall={handleApiCall} />
          <AlarmWidget onApiCall={handleApiCall} />
          <GitHubWidget onApiCall={handleApiCall} />
          
          {/* Enhanced Robot Status with Sensors */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-500" />
              Robot Status
            </h3>
            <div className="space-y-3">
              {/* Battery */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Battery
                </span>
                {renderBattery(robotStatus.battery)}
              </div>
              
              {/* Temperature */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Temperature
                </span>
                <span className={getTemperatureColor(robotStatus.temperature)}>
                  {robotStatus.temperature}°C
                </span>
              </div>
              
              {/* WiFi */}
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  WiFi Signal
                </span>
                <div className="flex items-center gap-2">
                  {renderWifiSignal(robotStatus.wifi.strength)}
                  <span className="text-sm text-text-light">{robotStatus.wifi.ssid}</span>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className={robotStatus.isOnline ? 'text-green-500' : 'text-red-500'}>
                  {robotStatus.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              
              {/* Sensor Data */}
              <div className="border-t border-border pt-3 mt-3">
                <h4 className="text-sm font-medium text-text-light mb-2">Sensor Readings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Distance</span>
                    <span>{robotStatus.sensors.distance} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Light</span>
                    <span>{robotStatus.sensors.light} lux</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motion</span>
                    <span className={robotStatus.sensors.motion ? 'text-yellow-500' : 'text-gray-500'}>
                      {robotStatus.sensors.motion ? 'Detected' : 'None'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Audio Visualizer when music is playing */}
              {isMusicPlaying && (
                <div className="border-t border-border pt-3 mt-3">
                  <h4 className="text-sm font-medium text-text-light mb-2">Now Playing</h4>
                  <div className="h-12 bg-surface rounded-lg flex items-end justify-center gap-[2px] p-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 rounded-t bg-primary-500"
                        style={{ height: `${Math.random() * 60 + 20}%` }}
                        animate={{ 
                          height: [`${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`]
                        }}
                        transition={{ 
                          duration: 0.5 + Math.random() * 0.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Floating Quick Actions */}
      <div className="fixed bottom-20 right-4 z-40">
        {/* Expanded Actions */}
        {isQuickActionsExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-xl shadow-lg transition-all"
              onClick={() => {
                handleTakePhoto();
                setIsQuickActionsExpanded(false);
              }}
            >
              <Camera className="w-5 h-5" />
              <span className="font-medium">Take Photo</span>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all font-medium ${
                isMusicPlaying 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={() => {
                handlePlayMusic();
                setIsQuickActionsExpanded(false);
              }}
            >
              <Music className="w-5 h-5" />
              <span>{isMusicPlaying ? 'Stop Music' : 'Play Music'}</span>
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg transition-all font-medium"
              onClick={() => {
                handleApiCall('Would be calling API_ROUTE="/api/system/emergency-stop" for emergency shutdown');
                setIsQuickActionsExpanded(false);
              }}
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency Stop</span>
            </motion.button>
          </motion.div>
        )}
        
        {/* Main FAB */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsQuickActionsExpanded(!isQuickActionsExpanded)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isQuickActionsExpanded 
              ? 'bg-gray-500 hover:bg-gray-600 text-white' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
        >
          <motion.div
            animate={{ rotate: isQuickActionsExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isQuickActionsExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Activity className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>
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

      {/* Camera Modal with Countdown */}
      <Modal
        isOpen={isCameraModalOpen}
        onClose={() => !isCountingDown && setIsCameraModalOpen(false)}
        title="Take Photo"
        size="lg"
      >
        <div className="p-6">
          <div className="space-y-4">
            {/* Camera Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Camera preview would appear here</p>
                </div>
              </div>
              
              {/* Countdown Overlay */}
              {isCountingDown && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white text-8xl font-bold"
                  >
                    {countdown}
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Capture Controls */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handleCameraCapture}
                disabled={isCountingDown}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors ${
                  isCountingDown 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
                title="Capture photo"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsCameraModalOpen(false)}
                disabled={isCountingDown}
                className={`flex-1 button bg-surface border border-border py-2 rounded-lg hover:bg-surface/80 ${
                  isCountingDown ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isCountingDown ? 'Taking Photo...' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Dashboard;