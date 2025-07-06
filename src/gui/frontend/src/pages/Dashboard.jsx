import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Wifi, Thermometer, Activity, Camera, Music, AlertTriangle } from 'lucide-react';
import TodoWidget from '../components/dashboard/TodoWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import AlarmWidget from '../components/dashboard/AlarmWidget';
import GitHubWidget from '../components/dashboard/GitHubWidget';
import ApiNotification from '../components/shared/ApiNotification';

/**
 * Dashboard/Home page - Main robot status and navigation hub
 * Modern widget-based dashboard with comprehensive functionality
 */
const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  
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
      <div className="flex items-center gap-2">
        <div className="relative">
          <Battery className={`w-5 h-5 ${getBatteryColor(level)}`} />
          <div 
            className={`absolute top-1 left-1 h-3 rounded-sm ${getBatteryColor(level).replace('text-', 'bg-')}`}
            style={{ width: `${(level / 100) * 12}px` }}
          />
        </div>
        <span className={getBatteryColor(level)}>{level}%</span>
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
            </div>
          </div>
          
          {/* Enhanced Quick Actions */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                onClick={() => handleApiCall('Would be calling API_ROUTE="/api/camera/capture" for taking photo')}
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>
              <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                onClick={() => handleApiCall('Would be calling API_ROUTE="/api/music/play" for starting music playback')}
              >
                <Music className="w-4 h-4" />
                Play Music
              </button>
              <button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                onClick={() => handleApiCall('Would be calling API_ROUTE="/api/system/emergency-stop" for emergency shutdown')}
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency Stop
              </button>
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

export default Dashboard;