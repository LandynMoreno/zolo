import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showCloseButton = true,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            fullScreen ? 'p-0' : 'p-4'
          }`}
          onClick={handleBackdropClick}
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative rounded-lg shadow-xl ${
              fullScreen 
                ? 'w-full h-full rounded-none' 
                : `w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`
            }`}
            style={{ backgroundColor: 'var(--color-background)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="text-xl font-semibold">{title}</h2>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors"
                  style={{ 
                    ':hover': { backgroundColor: 'var(--color-surface)' }
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className={`${fullScreen ? 'h-full overflow-auto' : 'max-h-[calc(90vh-8rem)] overflow-auto'}`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;