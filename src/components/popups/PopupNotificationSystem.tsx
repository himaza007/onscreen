// src/components/popups/PopupNotificationSystem.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, ChevronLeft, ChevronRight, Bell, Clock } from 'lucide-react';
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
  const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const [dismissedPopups, setDismissedPopups] = useState<Set<string>>(new Set());
  const [hasShownOnLoad, setHasShownOnLoad] = useState<boolean>(false);
  const [autoShowCount, setAutoShowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  // Touch/Swipe handling for detail modal
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;
  const maxVerticalSwipe = 100;

  // Animation variants for notification banner
  const notificationVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    },
    exit: { 
      y: -100, 
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Animation variants for detail modal
  const detailVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: -20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const overlayVariants = {
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

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Touch handlers for detail modal
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isValidSwipe = distanceY < maxVerticalSwipe;

    if (isValidSwipe && isRightSwipe) {
      const activePopups = getActivePopups();
      const visibleIndices = activePopups
        .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
        .filter(index => index !== -1);
      
      const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
      
      if (currentVisibleIndex < visibleIndices.length - 1) {
        const nextIndex = currentVisibleIndex + 1;
        setCurrentPopup(visibleIndices[nextIndex]);
      } else {
        setIsDetailVisible(false);
        setIsNotificationVisible(false);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentPopup, dismissedPopups]);

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

  // Auto-show notification banner
  useEffect(() => {
    if (!autoShow || hasShownOnLoad || autoShowCount >= maxAutoShows || isLoading) return;
    
    const activePopups = getActivePopups();
    const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));
    
    if (visiblePopups.length > 0) {
      const timer = setTimeout(() => {
        setIsNotificationVisible(true);
        setHasShownOnLoad(true);
        const newCount = autoShowCount + 1;
        setAutoShowCount(newCount);
        sessionStorage.setItem('onscreen-popup-auto-shows', newCount.toString());
      }, showDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoShow, showDelay, dismissedPopups, hasShownOnLoad, autoShowCount, maxAutoShows, isLoading]);

  const activePopups = getActivePopups();
  const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));

  // Handle popup dismissal
  const handleDismissPopup = useCallback((popupId: string) => {
    dismissPopupUtil(popupId);
    const newDismissed = new Set(dismissedPopups);
    newDismissed.add(popupId);
    setDismissedPopups(newDismissed);
    
    const remainingVisiblePopups = visiblePopups.filter(p => p.id !== popupId);
    if (remainingVisiblePopups.length === 0) {
      setIsDetailVisible(false);
      setIsNotificationVisible(false);
    } else {
      const nextPopup = remainingVisiblePopups.find(p => 
        activePopups.findIndex(ap => ap.id === p.id) > currentPopup
      ) || remainingVisiblePopups[0];
      
      const nextIndex = activePopups.findIndex(p => p.id === nextPopup.id);
      setCurrentPopup(nextIndex);
    }
  }, [dismissedPopups, visiblePopups, currentPopup, activePopups]);

  // Navigate between popups in detail view
  const navigatePopup = useCallback((direction: 'prev' | 'next') => {
    const visibleIndices = activePopups
      .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
      .filter(index => index !== -1);
    
    const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
    
    if (direction === 'next') {
      if (currentVisibleIndex < visibleIndices.length - 1) {
        const nextIndex = currentVisibleIndex + 1;
        setCurrentPopup(visibleIndices[nextIndex]);
      } else {
        setIsDetailVisible(false);
        setIsNotificationVisible(false);
      }
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
      window.location.href = actionButton.link;
    }
  }, []);

  // Handle notification banner click - expand to detail view
  const handleNotificationClick = useCallback(() => {
    setIsDetailVisible(true);
  }, []);

  // Close detail view
  const closeDetailView = useCallback(() => {
    setIsDetailVisible(false);
  }, []);

  // Close entire notification system
  const closeNotificationSystem = useCallback(() => {
    setIsDetailVisible(false);
    setIsNotificationVisible(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isDetailVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          closeDetailView();
          break;
        case 'ArrowLeft':
          if (visiblePopups.length > 1) {
            event.preventDefault();
            navigatePopup('prev');
          }
          break;
        case 'ArrowRight':
        case ' ':
          if (visiblePopups.length > 1) {
            event.preventDefault();
            navigatePopup('next');
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDetailVisible, visiblePopups.length, navigatePopup, closeDetailView]);

  // Auto-hide notification banner after 8 seconds if not interacted with
  useEffect(() => {
    if (!isNotificationVisible || isDetailVisible) return;

    const autoHideTimer = setTimeout(() => {
      setIsNotificationVisible(false);
    }, 8000);

    return () => clearTimeout(autoHideTimer);
  }, [isNotificationVisible, isDetailVisible]);

  if (visiblePopups.length === 0) return null;

  const popup = activePopups[currentPopup];
  if (!popup || dismissedPopups.has(popup.id)) return null;

  return (
    <>
      {/* macOS-style Notification Banner */}
      <AnimatePresence>
        {isNotificationVisible && !isDetailVisible && (
          <motion.div
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-4 right-4 z-50 ${className}`}
          >
            <motion.div
              onClick={handleNotificationClick}
              className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl cursor-pointer overflow-hidden max-w-sm w-full sm:w-96"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Notification content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <motion.div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${popup.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(220, 38, 38, 0.4)",
                        "0 0 0 8px rgba(220, 38, 38, 0)",
                        "0 0 0 0 rgba(220, 38, 38, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    {popup.icon}
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-festival-red uppercase tracking-wider">
                        OnScreen '25
                      </span>
                      {popup.urgent && (
                        <motion.span
                          className="text-xs bg-festival-red text-white px-2 py-0.5 rounded-full font-medium"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          URGENT
                        </motion.span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-1">
                      {popup.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Tap to view details
                    </p>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeNotificationSystem();
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Accent bar */}
              <motion.div 
                className={`h-1 bg-gradient-to-r ${popup.bgGradient}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailVisible && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeDetailView}
            />

            {/* Detail Container */}
            <motion.div
              ref={detailContainerRef}
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-6 sm:p-8 border-b border-gray-200/50">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${popup.bgGradient} opacity-10`}
                  />
                  
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div 
                        className={`w-16 h-16 sm:w-20 sm:h-20 ${popup.iconBg} rounded-2xl flex items-center justify-center text-white shadow-xl`}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 25px 50px rgba(220, 38, 38, 0.3)"
                        }}
                      >
                        <div className="scale-125">
                          {popup.icon}
                        </div>
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.span 
                            className="text-sm font-bold text-festival-red uppercase tracking-wider bg-festival-red/10 px-3 py-1 rounded-full border border-festival-red/20"
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
                          </motion.span>
                          
                          {popup.urgent && (
                            <motion.div
                              className="flex items-center gap-2"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <motion.div
                                className="w-2 h-2 bg-festival-red rounded-full"
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
                              <span className="text-sm text-festival-red font-medium">URGENT</span>
                            </motion.div>
                          )}
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                          {popup.title}
                        </h2>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={closeDetailView}
                      className="text-gray-400 hover:text-gray-600 p-2 sm:p-3 rounded-xl hover:bg-gray-100 transition-colors"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 90,
                        backgroundColor: "rgba(0, 0, 0, 0.05)"
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <motion.div 
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-6 sm:p-8"
                >
                  {/* Message */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {popup.message}
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                  >
                    {popup.actionButton && (
                      <motion.button
                        onClick={() => handleActionClick(popup.actionButton)}
                        className="flex-1 bg-gradient-to-r from-festival-red to-red-600 hover:from-festival-red/90 hover:to-red-600/90 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group"
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2,
                          boxShadow: "0 25px 50px rgba(220, 38, 38, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{popup.actionButton.text}</span>
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
                      className="px-6 sm:px-8 py-4 sm:py-5 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-2xl transition-all duration-300 font-medium text-base"
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        backgroundColor: "rgba(0, 0, 0, 0.02)"
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
                      className="flex items-center justify-between pt-6 border-t border-gray-200/50"
                    >
                      <motion.button
                        onClick={() => navigatePopup('prev')}
                        className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        whileHover={{ scale: 1.1, x: -2 }}
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
                                  ? 'bg-gradient-to-r from-festival-red to-red-600 w-12 shadow-md' 
                                  : isDismissed
                                    ? 'bg-gray-200 w-3 cursor-not-allowed'
                                    : 'bg-gray-300 hover:bg-gray-400 w-3 hover:w-8'
                              }`}
                              disabled={isDismissed}
                              whileHover={{ 
                                scale: isDismissed ? 1 : 1.2,
                                y: isDismissed ? 0 : -1
                              }}
                              whileTap={{ scale: 0.9 }}
                            />
                          );
                        })}
                      </div>
                      
                      <motion.button
                        onClick={() => navigatePopup('next')}
                        className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Helper text */}
                  {visiblePopups.length > 1 && (
                    <motion.div 
                      variants={itemVariants}
                      className="text-center mt-4"
                    >
                      <p className="text-sm text-gray-500">
                        <span className="hidden sm:inline">Use ← → arrow keys, click dots, or </span>
                        <span className="sm:hidden">Tap dots or </span>
                        <span className="text-festival-red">swipe right</span> to navigate • ESC to close
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopupNotificationSystem;