import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Signal, Globe } from 'lucide-react';

const NetworkSettings = ({ onApiCall }) => {
  const handleChangeNetwork = () => {
    onApiCall('Would be calling API_ROUTE="/api/settings/network/scan" for scanning available networks');
  };

  const handleNetworkReconnect = () => {
    onApiCall('Would be calling API_ROUTE="/api/settings/network/reconnect" for reconnecting to network');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Wifi size={24} />
          WiFi Connection
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-green-500/20">
            <div className="flex items-center gap-3">
              <Signal className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">ZoloRobot_Network</div>
                <div className="text-sm text-text-light">Connected • Strong signal</div>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleChangeNetwork}
              className="button flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Change Network
            </button>
            <button 
              onClick={handleNetworkReconnect}
              className="button flex-1 bg-surface border border-border py-2 rounded-lg hover:bg-surface/80 transition-colors"
            >
              Reconnect
            </button>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe size={24} />
          Network Information
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">IP Address</span>
            <span className="text-text-light font-mono">192.168.1.100</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">MAC Address</span>
            <span className="text-text-light font-mono">AA:BB:CC:DD:EE:FF</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">Signal Strength</span>
            <span className="text-green-500 font-medium">Excellent (-45 dBm)</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">Download Speed</span>
            <span className="text-text-light">85.3 Mbps</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium">Gateway</span>
            <span className="text-text-light font-mono">192.168.1.1</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkSettings;