import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8 font-poppins">
          Zolo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Interactive Widgets */}
          <TodoWidget onApiCall={handleApiCall} />
          <CalendarWidget onApiCall={handleApiCall} />
          <AlarmWidget onApiCall={handleApiCall} />
          <GitHubWidget onApiCall={handleApiCall} />
          
          {/* Status Cards */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Robot Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Battery</span>
                <span className="text-green-500">85%</span>
              </div>
              <div className="flex justify-between">
                <span>Temperature</span>
                <span>42.5°C</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-500">Online</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                className="button w-full"
                onClick={() => handleApiCall('Would be calling API_ROUTE="/api/camera/capture" for taking photo')}
              >
                Take Photo
              </button>
              <button 
                className="button-secondary w-full"
                onClick={() => handleApiCall('Would be calling API_ROUTE="/api/music/play" for starting music playback')}
              >
                Play Music
              </button>
              <button 
                className="button w-full bg-red-500 hover:bg-red-600"
                onClick={() => handleApiCall('Would be calling API_ROUTE="/api/system/emergency-stop" for emergency shutdown')}
              >
                Emergency Stop
              </button>
            </div>
          </div>
          
          {/* Sensor Data */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Sensors</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Distance</span>
                <span>125.3 cm</span>
              </div>
              <div className="flex justify-between">
                <span>Light</span>
                <span>750 lux</span>
              </div>
              <div className="flex justify-between">
                <span>Motion</span>
                <span className="text-yellow-500">Detected</span>
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

export default Dashboard;