// src/components/popups/PopupNotificationSystem.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PopupData, PopupNotificationSystemProps } from './types';
import { getActivePopups, getDismissedPopups, dismissPopup as dismissPopupUtil } from './popupData';

const PopupNotificationSystem: React.FC<PopupNotificationSystemProps> = ({
  autoShow = true,
  showDelay = 2000,
  className = '',
  maxAutoShows = 1
}) => {
  const [currentPopup, setCurrentPopup] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [dismissedPopups, setDismissedPopups] = useState<Set<string>>(new Set());
  const [hasShownOnLoad, setHasShownOnLoad] = useState<boolean>(false);
  const [autoShowCount, setAutoShowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  // Auto-dismiss timer for compact notification
  const [autoDismissTimer, setAutoDismissTimer] = useState<NodeJS.Timeout | null>(null);

  // Compact notification animation variants (slides from top)
  const compactVariants = {
    hidden: { 
      opacity: 0,
      y: -100,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Expanded detail view animation variants
  const expandedOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const expandedModalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 30
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Load dismissed popups and setup
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    setDismissedPopups(getDismissedPopups());
    
    const sessionCount = sessionStorage.getItem('onscreen-popup-auto-shows');
    if (sessionCount) {
      setAutoShowCount(parseInt(sessionCount, 10));
    }
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-show logic for compact notifications
  useEffect(() => {
    if (!autoShow || hasShownOnLoad || autoShowCount >= maxAutoShows || isLoading) return;
    
    const activePopups = getActivePopups();
    const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));
    
    if (visiblePopups.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShownOnLoad(true);
        const newCount = autoShowCount + 1;
        setAutoShowCount(newCount);
        sessionStorage.setItem('onscreen-popup-auto-shows', newCount.toString());
        
        // Auto-dismiss compact notification after 8 seconds
        const dismissTimer = setTimeout(() => {
          if (!isExpanded) {
            handleNextOrClose();
          }
        }, 8000);
        setAutoDismissTimer(dismissTimer);
        
      }, showDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoShow, showDelay, dismissedPopups, hasShownOnLoad, autoShowCount, maxAutoShows, isLoading]);

  const activePopups = getActivePopups();
  const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));

  // Handle expanding notification to detailed view
  const handleExpand = useCallback(() => {
    setIsExpanded(true);
    // Clear auto-dismiss timer when expanded
    if (autoDismissTimer) {
      clearTimeout(autoDismissTimer);
      setAutoDismissTimer(null);
    }
  }, [autoDismissTimer]);

  // Handle closing expanded view
  const handleCloseExpanded = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Handle dismissing current popup
  const handleDismissPopup = useCallback((popupId: string) => {
    dismissPopupUtil(popupId);
    const newDismissed = new Set(dismissedPopups);
    newDismissed.add(popupId);
    setDismissedPopups(newDismissed);
    
    setIsExpanded(false);
    
    const remainingVisiblePopups = visiblePopups.filter(p => p.id !== popupId);
    if (remainingVisiblePopups.length === 0) {
      setIsVisible(false);
    } else {
      const nextPopup = remainingVisiblePopups.find(p => 
        activePopups.findIndex(ap => ap.id === p.id) > currentPopup
      ) || remainingVisiblePopups[0];
      
      const nextIndex = activePopups.findIndex(p => p.id === nextPopup.id);
      setCurrentPopup(nextIndex);
    }
  }, [dismissedPopups, visiblePopups, currentPopup, activePopups]);

  // Handle navigation to next popup or close if last
  const handleNextOrClose = useCallback(() => {
    const visibleIndices = activePopups
      .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
      .filter(index => index !== -1);
    
    const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
    
    if (currentVisibleIndex < visibleIndices.length - 1) {
      // Navigate to next popup
      const nextIndex = currentVisibleIndex + 1;
      setCurrentPopup(visibleIndices[nextIndex]);
      setIsExpanded(false);
      
      // Set new auto-dismiss timer
      const dismissTimer = setTimeout(() => {
        if (!isExpanded) {
          handleNextOrClose();
        }
      }, 8000);
      setAutoDismissTimer(dismissTimer);
    } else {
      // Last popup - close the system
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [activePopups, dismissedPopups, currentPopup, isExpanded]);

  // Handle action button click
  const handleActionClick = useCallback((actionButton: PopupData['actionButton']) => {
    if (!actionButton) return;
    
    if (actionButton.external) {
      window.open(actionButton.link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = actionButton.link;
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          setIsVisible(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, isExpanded]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoDismissTimer) {
        clearTimeout(autoDismissTimer);
      }
    };
  }, [autoDismissTimer]);

  if (!isVisible || visiblePopups.length === 0) return null;

  const popup = activePopups[currentPopup];
  if (!popup || dismissedPopups.has(popup.id)) return null;

  return (
    <>
      {/* Compact Notification (slides from top) */}
      <AnimatePresence>
        {isVisible && !isExpanded && (
          <motion.div
            variants={compactVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-4 right-4 z-50 ${className}`}
          >
            <motion.div
              onClick={handleExpand}
              className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl cursor-pointer hover:bg-gray-800/95 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${popup.bgGradient} opacity-40`} />
              
              {/* Compact content */}
              <div className="relative p-4 max-w-sm">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <motion.div 
                    className={`w-10 h-10 ${popup.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    animate={{
                      boxShadow: [
                        "0 4px 8px rgba(220, 38, 38, 0.2)",
                        "0 8px 16px rgba(220, 38, 38, 0.3)",
                        "0 4px 8px rgba(220, 38, 38, 0.2)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="scale-90">
                      {popup.icon}
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs uppercase tracking-wider text-festival-red font-bold">
                        OnScreen '25
                      </div>
                      {popup.urgent && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-festival-red rounded-full"
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-white leading-tight truncate">
                      {popup.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      Tap to view details
                    </p>
                  </div>
                  
                  {/* Dismiss button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextOrClose();
                    }}
                    className="text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
                
                {/* Progress indicator */}
                {visiblePopups.length > 1 && (
                  <div className="flex items-center gap-1 mt-3">
                    {activePopups.map((popupItem, index) => {
                      const isDismissed = dismissedPopups.has(popupItem.id);
                      const isCurrent = index === currentPopup && !isDismissed;
                      
                      return (
                        <div
                          key={popupItem.id}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'bg-festival-red w-4' 
                              : isDismissed
                                ? 'bg-white/20 w-1'
                                : 'bg-white/40 w-1'
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Detail View (hovers over hero section) */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              variants={expandedOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={handleCloseExpanded}
            />
            
            {/* Modal positioned over hero section */}
            <motion.div
              variants={expandedModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-2xl mx-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="expanded-popup-title"
              aria-describedby="expanded-popup-description"
            >
              <div className="relative bg-gray-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                {/* Enhanced background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${popup.bgGradient} opacity-50`} />
                
                {/* Film strip decorations */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-festival-red/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-festival-red/20 to-transparent" />
                
                {/* Animated background elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full bg-festival-red/10 blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 6,
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
                      <motion.div 
                        className={`w-16 h-16 ${popup.iconBg} rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0 border border-white/10`}
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15
                        }}
                      >
                        {popup.icon}
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div 
                            className="text-sm uppercase tracking-wider text-festival-red font-bold bg-festival-red/10 px-3 py-1 rounded-full border border-festival-red/20"
                            animate={{
                              boxShadow: [
                                "0 0 0 0 rgba(220, 38, 38, 0)",
                                "0 0 0 4px rgba(220, 38, 38, 0.1)",
                                "0 0 0 0 rgba(220, 38, 38, 0)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            OnScreen '25
                          </motion.div>
                          
                          {popup.urgent && (
                            <motion.div
                              className="flex items-center gap-1"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <motion.div
                                className="w-2 h-2 bg-festival-red rounded-full shadow-lg"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(220, 38, 38, 0.7)",
                                    "0 0 0 6px rgba(220, 38, 38, 0)",
                                    "0 0 0 0 rgba(220, 38, 38, 0)"
                                  ]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeOut"
                                }}
                              />
                              <span className="text-xs text-festival-red font-medium">URGENT</span>
                            </motion.div>
                          )}
                        </div>
                        
                        <h2 
                          id="expanded-popup-title"
                          className="text-xl sm:text-2xl font-bold text-white leading-tight font-display"
                        >
                          {popup.title}
                        </h2>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={handleCloseExpanded}
                      className="text-white/50 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/10 flex-shrink-0"
                      aria-label="Close detailed view"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 90
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </motion.div>
                  
                  {/* Message */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <p 
                      id="expanded-popup-description"
                      className="text-white/90 leading-relaxed text-base sm:text-lg"
                    >
                      {popup.message}
                    </p>
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    {popup.actionButton && (
                      <motion.button
                        onClick={() => handleActionClick(popup.actionButton)}
                        className="flex-1 bg-gradient-to-r from-festival-red to-red-600 hover:from-festival-red/90 hover:to-red-600/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-festival-red focus:ring-offset-2 focus:ring-offset-transparent group"
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium">{popup.actionButton.text}</span>
                        <motion.div
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          {popup.actionButton.external ? (
                            <ExternalLink className="w-5 h-5" />
                          ) : (
                            <Calendar className="w-5 h-5" />
                          )}
                        </motion.div>
                      </motion.button>
                    )}
                    
                    <motion.button
                      onClick={() => handleDismissPopup(popup.id)}
                      className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-2xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Dismiss
                    </motion.button>
                  </motion.div>
                  
                  {/* Navigation */}
                  {visiblePopups.length > 1 && (
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-center justify-between mt-8 pt-6 border-t border-white/20"
                    >
                      <motion.button
                        onClick={() => {
                          const visibleIndices = activePopups
                            .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
                            .filter(index => index !== -1);
                          const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
                          const prevIndex = currentVisibleIndex === 0 ? visibleIndices.length - 1 : currentVisibleIndex - 1;
                          setCurrentPopup(visibleIndices[prevIndex]);
                        }}
                        className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, x: -3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>
                      
                      <div className="flex items-center gap-3">
                        {activePopups.map((popupItem, index) => {
                          const isDismissed = dismissedPopups.has(popupItem.id);
                          const isCurrent = index === currentPopup && !isDismissed;
                          
                          return (
                            <motion.button
                              key={popupItem.id}
                              onClick={() => !isDismissed && setCurrentPopup(index)}
                              className={`h-3 rounded-full transition-all duration-300 ${
                                isCurrent
                                  ? 'bg-gradient-to-r from-festival-red to-red-600 w-8 shadow-lg' 
                                  : isDismissed
                                    ? 'bg-white/20 w-3 cursor-not-allowed'
                                    : 'bg-white/40 hover:bg-white/60 w-3 hover:w-6'
                              }`}
                              disabled={isDismissed}
                              whileHover={{ scale: isDismissed ? 1 : 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          );
                        })}
                      </div>
                      
                      <motion.button
                        onClick={handleNextOrClose}
                        className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, x: 3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-festival-red/50 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-festival-red/50 rounded-br-3xl"></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopupNotificationSystem;