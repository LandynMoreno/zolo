import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

/**
 * Individual taskbar icon component with smooth animations and touch support
 * Features hover effects, active state, and haptic feedback
 */
const TaskbarIcon = ({ 
  icon: Icon, 
  path, 
  label, 
  className = '',
  ...props 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  const handleClick = () => {
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    navigate(path);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={clsx(
        'relative flex flex-col items-center justify-center',
        'w-14 h-14 touch-target',
        'rounded-xl transition-all duration-200',
        'hover:bg-white/10 active:bg-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: isActive ? 1.2 : 1 }}
      animate={{ scale: isActive ? 1.2 : 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      aria-label={label}
      {...props}
    >
      {/* Active indicator backdrop */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-primary-500/20 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Icon with glow effect for active state */}
      <motion.div
        className={clsx(
          'relative flex items-center justify-center',
          'w-8 h-8 rounded-lg',
          isActive ? 'text-primary-500' : 'text-white/80'
        )}
        animate={{
          boxShadow: isActive 
            ? '0 0 20px rgba(232, 168, 124, 0.4)' 
            : '0 0 0px rgba(232, 168, 124, 0)',
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={24} strokeWidth={2} />
      </motion.div>
      
      {/* Active dot indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 w-1.5 h-1.5 bg-primary-500 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        />
      )}
      
      {/* Tooltip/Label for hover (optional, mainly for desktop) */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
          {label}
        </div>
      </div>
    </motion.button>
  );
};

export default TaskbarIcon;