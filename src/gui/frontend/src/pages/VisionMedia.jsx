import React from 'react';
import { motion } from 'framer-motion';

/**
 * Vision & Media page - Camera, photo gallery, and face recognition
 * Temporary placeholder component
 */
const VisionMedia = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-500 mb-8 font-poppins">
          Vision & Media Hub
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Camera Feed Placeholder */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Live Camera Feed</h3>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">Camera feed will appear here</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="button flex-1">Capture Photo</button>
              <button className="button-secondary flex-1">Record Video</button>
            </div>
          </div>
          
          {/* Photo Gallery Placeholder */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recent Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                  <span className="text-xs text-gray-500">Photo {i}</span>
                </div>
              ))}
            </div>
            <button className="button w-full mt-4">View Gallery</button>
          </div>
          
          {/* Face Recognition Placeholder */}
          <div className="card lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Face Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Known Faces</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-surface rounded-lg">
                    <div className="w-10 h-10 bg-primary-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-text-light">Last seen: 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-surface rounded-lg">
                    <div className="w-10 h-10 bg-secondary-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-text-light">Last seen: 1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Recent Detections</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-surface rounded-lg">
                    <div className="text-sm">Unknown person detected</div>
                    <div className="text-xs text-text-light">5 minutes ago</div>
                  </div>
                  <div className="p-2 bg-surface rounded-lg">
                    <div className="text-sm">John Doe recognized</div>
                    <div className="text-xs text-text-light">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisionMedia;