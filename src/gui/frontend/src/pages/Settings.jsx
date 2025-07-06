import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Monitor, 
  Wifi, 
  Info, 
  Cpu,
  User
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';
import ThemeSettings from '../components/settings/ThemeSettings';
import DisplaySettings from '../components/settings/DisplaySettings';
import HardwareSettings from '../components/settings/HardwareSettings';
import NetworkSettings from '../components/settings/NetworkSettings';
import SystemInfo from '../components/settings/SystemInfo';
import ProfileSettings from '../components/settings/ProfileSettings';
import ApiNotification from '../components/shared/ApiNotification';

/**
 * Settings page - System configuration and theme customization
 * Modular settings with comprehensive functionality and profile management
 */
const Settings = () => {
  const { theme, presets, actions } = useTheme();
  const [activeTab, setActiveTab] = useState('theme');
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

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'theme', label: 'Theme & Display', icon: Palette },
    { id: 'hardware', label: 'Hardware', icon: Cpu },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'system', label: 'System Info', icon: Info },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings onApiCall={handleApiCall} />;
      case 'theme':
        return (
          <div className="space-y-6">
            <ThemeSettings theme={theme} presets={presets} actions={actions} onApiCall={handleApiCall} />
            <DisplaySettings onApiCall={handleApiCall} />
          </div>
        );
      case 'hardware':
        return <HardwareSettings onApiCall={handleApiCall} />;
      case 'network':
        return <NetworkSettings onApiCall={handleApiCall} />;
      case 'system':
        return <SystemInfo onApiCall={handleApiCall} />;
      default:
        return <ProfileSettings onApiCall={handleApiCall} />;
    }
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
          Settings
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
          <div className="lg:col-span-3">
            {renderTabContent()}
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

export default Settings;