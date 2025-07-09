import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Camera, 
  Music, 
  Palette, 
  Settings,
  Cpu
} from 'lucide-react';
import { useTaskbarVisibility } from '../hooks/useTaskbarVisibility';
import TaskbarIcon from './TaskbarIcon';

/**
 * macOS-style app taskbar with glass morphism and smooth animations
 * Auto-hides after inactivity, shows on touch/hover interactions
 */
const AppTaskbar = () => {
  const {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
  } = useTaskbarVisibility(3000); // 3 second auto-hide

  // Navigation configuration for all main pages
  const navigationItems = [
    {
      icon: Home,
      path: '/',
      label: 'Dashboard',
      id: 'dashboard'
    },
    {
      icon: Camera,
      path: '/vision',
      label: 'Vision & Media',
      id: 'vision'
    },
    {
      icon: Music,
      path: '/music',
      label: 'Music & Audio',
      id: 'music'
    },
    {
      icon: Palette,
      path: '/leds',
      label: 'LED Designer',
      id: 'leds'
    },
    {
      icon: Settings,
      path: '/settings',
      label: 'Settings',
      id: 'settings'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Taskbar Container with Glass Morphism */}
          <motion.div
            className="relative flex items-center justify-center space-x-2 px-4 py-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background glow effect */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 168, 124, 0.3), rgba(139, 154, 175, 0.3))',
              }}
            />
            
            {/* Navigation Icons */}
            <div className="relative flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  <TaskbarIcon
                    icon={item.icon}
                    path={item.path}
                    label={item.label}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* System status indicator (optional) */}
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-white/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              title="Robot Online"
            />
          </motion.div>
          
          {/* Swipe indicator for touch devices */}
          <motion.div
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppTaskbar;