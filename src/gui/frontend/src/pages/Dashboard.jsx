import React from 'react';
import { motion } from 'framer-motion';

/**
 * Dashboard/Home page - Main robot status and navigation hub
 * Temporary placeholder component
 */
const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8 font-poppins">
          Zolo Robot Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Status Cards Placeholder */}
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
          
          {/* Quick Actions Placeholder */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="button w-full">Take Photo</button>
              <button className="button-secondary w-full">Play Music</button>
              <button className="button w-full bg-red-500 hover:bg-red-600">Emergency Stop</button>
            </div>
          </div>
          
          {/* Sensor Data Placeholder */}
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
    </motion.div>
  );
};

export default Dashboard;