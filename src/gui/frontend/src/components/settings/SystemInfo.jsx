import React from 'react';
import { motion } from 'framer-motion';
import { Info, Cpu, HardDrive, Activity, RotateCcw, AlertTriangle } from 'lucide-react';

const SystemInfo = ({ onApiCall }) => {
  const handleCheckUpdates = () => {
    onApiCall('Would be calling API_ROUTE="/api/system/check-updates" for checking system updates');
  };

  const handleRestart = () => {
    onApiCall('Would be calling API_ROUTE="/api/system/restart" for restarting system');
  };

  const handleFactoryReset = () => {
    onApiCall('Would be calling API_ROUTE="/api/system/factory-reset" for performing factory reset');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info size={24} />
          System Information
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">Zolo Version</span>
            <span className="text-text-light font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Cpu size={16} />
              <span className="font-medium">Hardware</span>
            </div>
            <span className="text-text-light">Raspberry Pi 5</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="font-medium">Memory Usage</span>
            <div className="text-right">
              <div className="text-text-light">4.2 GB / 8 GB</div>
              <div className="w-20 h-2 bg-border rounded-full mt-1">
                <div className="w-12 h-2 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <div className="flex items-center gap-2">
              <HardDrive size={16} />
              <span className="font-medium">Storage</span>
            </div>
            <div className="text-right">
              <div className="text-text-light">22 GB / 64 GB</div>
              <div className="w-20 h-2 bg-border rounded-full mt-1">
                <div className="w-7 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Activity size={16} />
              <span className="font-medium">CPU Temperature</span>
            </div>
            <span className="text-green-500">42.5°C</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium">Uptime</span>
            <span className="text-text-light">2 days, 14 hours</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <RotateCcw size={24} />
          System Actions
        </h3>
        <div className="space-y-3">
          <button 
            onClick={handleCheckUpdates}
            className="button w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
          >
            <Activity size={18} />
            Check for Updates
          </button>
          <button 
            onClick={handleRestart}
            className="button w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Restart System
          </button>
          <button 
            onClick={handleFactoryReset}
            className="button w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <AlertTriangle size={18} />
            Factory Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemInfo;