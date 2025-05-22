// src/components/popups/PopupNotificationSystem.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PopupData, PopupNotificationSystemProps } from './types';
import { getActivePopups, getDismissedPopups, dismissPopup as dismissPopupUtil } from './popupData';

const PopupNotificationSystem: React.FC<PopupNotificationSystemProps> = ({
  autoShow = true,
  showDelay = 3000,
  className = '',
  maxAutoShows = 1
}) => {
  const [currentPopup, setCurrentPopup] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissedPopups, setDismissedPopups] = useState<Set<string>>(new Set());
  const [hasShownOnLoad, setHasShownOnLoad] = useState<boolean>(false);
  const [autoShowCount, setAutoShowCount] = useState<number>(0);
  const location = useLocation();

  // Animation variants matching OnScreen '25 design system
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring", 
        stiffness: 300, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Load dismissed popups from localStorage
  useEffect(() => {
    setDismissedPopups(getDismissedPopups());
    
    // Get auto show count from session storage
    const sessionCount = sessionStorage.getItem('onscreen-popup-auto-shows');
    if (sessionCount) {
      setAutoShowCount(parseInt(sessionCount, 10));
    }
  }, []);

  // Auto-show popups on homepage load
  useEffect(() => {
    if (!autoShow || hasShownOnLoad || autoShowCount >= maxAutoShows) return;
    
    // Only show on homepage
    if (location.pathname === '/' || location.pathname === '') {
      const activePopups = getActivePopups();
      const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));
      
      if (visiblePopups.length > 0) {
        const timer = setTimeout(() => {
          setIsVisible(true);
          setHasShownOnLoad(true);
          const newCount = autoShowCount + 1;
          setAutoShowCount(newCount);
          sessionStorage.setItem('onscreen-popup-auto-shows', newCount.toString());
        }, showDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [autoShow, showDelay, dismissedPopups, location.pathname, hasShownOnLoad, autoShowCount, maxAutoShows]);

  // Get currently visible popups
  const activePopups = getActivePopups();
  const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));

  // Handle popup dismissal
  const handleDismissPopup = useCallback((popupId: string) => {
    dismissPopupUtil(popupId);
    const newDismissed = new Set(dismissedPopups);
    newDismissed.add(popupId);
    setDismissedPopups(newDismissed);
    
    // If this was the last popup, hide the system
    const remainingVisiblePopups = visiblePopups.filter(p => p.id !== popupId);
    if (remainingVisiblePopups.length === 0) {
      setIsVisible(false);
    } else {
      // Move to next available popup
      const nextPopup = remainingVisiblePopups.find(p => 
        activePopups.findIndex(ap => ap.id === p.id) > currentPopup
      ) || remainingVisiblePopups[0];
      
      const nextIndex = activePopups.findIndex(p => p.id === nextPopup.id);
      setCurrentPopup(nextIndex);
    }
  }, [dismissedPopups, visiblePopups, currentPopup, activePopups]);

  // Handle navigation between popups
  const navigatePopup = useCallback((direction: 'prev' | 'next') => {
    const visibleIndices = activePopups
      .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
      .filter(index => index !== -1);
    
    const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
    
    if (direction === 'next') {
      const nextIndex = (currentVisibleIndex + 1) % visibleIndices.length;
      setCurrentPopup(visibleIndices[nextIndex]);
    } else {
      const prevIndex = currentVisibleIndex === 0 ? visibleIndices.length - 1 : currentVisibleIndex - 1;
      setCurrentPopup(visibleIndices[prevIndex]);
    }
  }, [activePopups, dismissedPopups, currentPopup]);

  // Handle action button click
  const handleActionClick = useCallback((actionButton: PopupData['actionButton']) => {
    if (!actionButton) return;
    
    if (actionButton.external) {
      window.open(actionButton.link, '_blank', 'noopener,noreferrer');
    } else {
      // Use React Router or window.location for internal navigation
      window.location.href = actionButton.link;
    }
  }, []);

  // Close popup system
  const closePopupSystem = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          closePopupSystem();
          break;
        case 'ArrowLeft':
          if (visiblePopups.length > 1) {
            event.preventDefault();
            navigatePopup('prev');
          }
          break;
        case 'ArrowRight':
          if (visiblePopups.length > 1) {
            event.preventDefault();
            navigatePopup('next');
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, visiblePopups.length, navigatePopup, closePopupSystem]);

  if (!isVisible || visiblePopups.length === 0) return null;

  const popup = activePopups[currentPopup];
  if (!popup || dismissedPopups.has(popup.id)) return null;

  return (
    <AnimatePresence mode="wait">
      <div className={`fixed inset-0 z-50 ${className}`}>
        {/* Backdrop */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closePopupSystem}
        />
        
        {/* Film grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none"></div>
        
        {/* Popup Container */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          aria-describedby="popup-description"
        >
          <div className="relative bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${popup.bgGradient} opacity-40`} />
            
            {/* Animated background element */}
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full bg-festival-red/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Content */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="relative p-6 sm:p-8"
            >
              {/* Header */}
              <motion.div 
                variants={itemVariants}
                className="flex items-start justify-between mb-6"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 ${popup.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {popup.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs uppercase tracking-widest text-festival-red font-semibold">
                        OnScreen '25
                      </div>
                      {popup.urgent && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-festival-red rounded-full"
                        />
                      )}
                    </div>
                    <h2 
                      id="popup-title"
                      className="text-lg sm:text-xl font-bold text-white leading-tight pr-2 font-display"
                    >
                      {popup.title}
                    </h2>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => handleDismissPopup(popup.id)}
                  className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 flex-shrink-0"
                  aria-label="Close notification"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>
              
              {/* Message */}
              <motion.div variants={itemVariants} className="mb-6">
                <p 
                  id="popup-description"
                  className="text-white/90 leading-relaxed text-sm sm:text-base"
                >
                  {popup.message}
                </p>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3"
              >
                {popup.actionButton && (
                  <motion.button
                    onClick={() => handleActionClick(popup.actionButton)}
                    className="flex-1 bg-festival-red hover:bg-festival-red/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-festival-red focus:ring-offset-2 focus:ring-offset-black"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{popup.actionButton.text}</span>
                    {popup.actionButton.external ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <Calendar className="w-4 h-4" />
                    )}
                  </motion.button>
                )}
                
                <motion.button
                  onClick={() => handleDismissPopup(popup.id)}
                  className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Dismiss
                </motion.button>
              </motion.div>
              
              {/* Navigation & Counter */}
              {visiblePopups.length > 1 && (
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-between mt-6 pt-4 border-t border-white/10"
                >
                  <motion.button
                    onClick={() => navigatePopup('prev')}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Previous notification"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="flex items-center gap-2" role="tablist">
                    {activePopups.map((popupItem, index) => (
                      <motion.button
                        key={popupItem.id}
                        onClick={() => setCurrentPopup(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                          index === currentPopup && !dismissedPopups.has(popupItem.id)
                            ? 'bg-festival-red w-6' 
                            : dismissedPopups.has(popupItem.id)
                              ? 'bg-white/20 cursor-not-allowed'
                              : 'bg-white/40 hover:bg-white/60'
                        }`}
                        disabled={dismissedPopups.has(popupItem.id)}
                        aria-label={`Go to notification ${index + 1}`}
                        role="tab"
                        aria-selected={index === currentPopup}
                        whileHover={{ scale: dismissedPopups.has(popupItem.id) ? 1 : 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={() => navigatePopup('next')}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Next notification"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
            
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-festival-red opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-festival-red opacity-30"></div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PopupNotificationSystem;