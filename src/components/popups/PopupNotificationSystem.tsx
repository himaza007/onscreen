// src/components/popups/PopupNotificationSystem.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, ChevronLeft, ChevronRight, Star, Clock, Film } from 'lucide-react';
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
  const [dismissedPopups, setDismissedPopups] = useState<Set<string>>(new Set());
  const [hasShownOnLoad, setHasShownOnLoad] = useState<boolean>(false);
  const [autoShowCount, setAutoShowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  // Touch/Swipe handling state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isSwipeInProgress, setIsSwipeInProgress] = useState(false);
  const swipeContainerRef = useRef<HTMLDivElement>(null);

  // Swipe configuration
  const minSwipeDistance = 50; // Minimum distance for a valid swipe
  const maxVerticalSwipe = 100; // Maximum vertical movement to still count as horizontal swipe

  // Enhanced animation variants with professional easing
  const overlayVariants = {
    hidden: { 
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    visible: { 
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] // Professional easing curve
      }
    },
    exit: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85, 
      y: 60,
      filter: "blur(8px)",
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring", 
        stiffness: 260, 
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.85, 
      y: 60,
      filter: "blur(8px)",
      rotateX: 10,
      transition: { 
        duration: 0.5, 
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
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  // Enhanced film strip decoration component
  const FilmStripDecoration = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top film strip */}
      <motion.div
        className="absolute -top-2 left-0 w-full h-4 bg-gradient-to-r from-transparent via-festival-red/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="flex items-center justify-between h-full px-2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-2 bg-festival-red/20 rounded-full" />
          ))}
        </div>
      </motion.div>
      
      {/* Bottom film strip */}
      <motion.div
        className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-transparent via-festival-red/10 to-transparent"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="flex items-center justify-between h-full px-2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-2 bg-festival-red/20 rounded-full" />
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Touch/Swipe Event Handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setIsSwipeInProgress(true);
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
    if (!touchStart || !touchEnd) {
      setIsSwipeInProgress(false);
      return;
    }

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isValidSwipe = distanceY < maxVerticalSwipe;

    if (isValidSwipe && isRightSwipe) {
      // Swipe right detected - navigate to next popup or close if last
      const activePopups = getActivePopups();
      const visibleIndices = activePopups
        .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
        .filter(index => index !== -1);
      
      const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
      
      if (currentVisibleIndex < visibleIndices.length - 1) {
        // Navigate to next popup
        const nextIndex = currentVisibleIndex + 1;
        setCurrentPopup(visibleIndices[nextIndex]);
      } else {
        // Last popup - close the system
        setIsVisible(false);
      }
    }

    setIsSwipeInProgress(false);
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

  // Enhanced auto-show logic
  useEffect(() => {
    if (!autoShow || hasShownOnLoad || autoShowCount >= maxAutoShows || isLoading) return;
    
    // Show on homepage or any page (remove pathname restriction for better UX)
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
  }, [autoShow, showDelay, dismissedPopups, hasShownOnLoad, autoShowCount, maxAutoShows, isLoading]);

  const activePopups = getActivePopups();
  const visiblePopups = activePopups.filter(popup => !dismissedPopups.has(popup.id));

  // Enhanced popup dismissal with better UX
  const handleDismissPopup = useCallback((popupId: string) => {
    dismissPopupUtil(popupId);
    const newDismissed = new Set(dismissedPopups);
    newDismissed.add(popupId);
    setDismissedPopups(newDismissed);
    
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

  // Enhanced navigation with smooth transitions - modified to end after last notice
  const navigatePopup = useCallback((direction: 'prev' | 'next') => {
    const visibleIndices = activePopups
      .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
      .filter(index => index !== -1);
    
    const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
    
    if (direction === 'next') {
      if (currentVisibleIndex < visibleIndices.length - 1) {
        // Navigate to next popup
        const nextIndex = currentVisibleIndex + 1;
        setCurrentPopup(visibleIndices[nextIndex]);
      } else {
        // End after last notice - close the popup system
        setIsVisible(false);
      }
    } else {
      const prevIndex = currentVisibleIndex === 0 ? visibleIndices.length - 1 : currentVisibleIndex - 1;
      setCurrentPopup(visibleIndices[prevIndex]);
    }
  }, [activePopups, dismissedPopups, currentPopup]);

  // Enhanced action button handler
  const handleActionClick = useCallback((actionButton: PopupData['actionButton']) => {
    if (!actionButton) return;
    
    if (actionButton.external) {
      window.open(actionButton.link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = actionButton.link;
    }
  }, []);

  const closePopupSystem = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Enhanced keyboard navigation - also modified to end after last notice
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
  }, [isVisible, visiblePopups.length, navigatePopup, closePopupSystem]);

  // Auto-advance with pause on hover - modified to end after last notice
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!isVisible || visiblePopups.length <= 1 || isPaused) return;

    const autoAdvanceTimer = setTimeout(() => {
      const visibleIndices = activePopups
        .map((popup, index) => !dismissedPopups.has(popup.id) ? index : -1)
        .filter(index => index !== -1);
      
      const currentVisibleIndex = visibleIndices.indexOf(currentPopup);
      
      if (currentVisibleIndex < visibleIndices.length - 1) {
        navigatePopup('next');
      } else {
        // End after last notice
        setIsVisible(false);
      }
    }, 6000);

    return () => clearTimeout(autoAdvanceTimer);
  }, [currentPopup, isVisible, visiblePopups.length, navigatePopup, isPaused, activePopups, dismissedPopups]);

  if (!isVisible || visiblePopups.length === 0) return null;

  const popup = activePopups[currentPopup];
  if (!popup || dismissedPopups.has(popup.id)) return null;

  return (
    <AnimatePresence mode="wait">
      <div className={`fixed inset-0 z-50 ${className}`}>
        {/* Enhanced backdrop with premium blur effect */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90"
          onClick={closePopupSystem}
        />
        
        {/* Premium film grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }}
        />
        
        {/* Cinematic vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none" />
        
        {/* Popup Container with enhanced responsiveness and swipe support */}
        <motion.div
          ref={swipeContainerRef}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[28rem] sm:max-w-[32rem] lg:max-w-[36rem] mx-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          aria-describedby="popup-description"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: 'pan-y',
            cursor: isSwipeInProgress ? 'grabbing' : 'default'
          }}
        >
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Enhanced background gradient with better opacity */}
            <div className={`absolute inset-0 bg-gradient-to-br ${popup.bgGradient} opacity-60`} />
            
            {/* Film strip decorations */}
            <FilmStripDecoration />
            
            {/* Multiple animated background elements for depth */}
            <motion.div 
              className="absolute top-0 right-0 w-40 h-40 rounded-full bg-festival-red/8 blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.8, 0.3],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-500/6 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.6, 0.2],
                x: [0, -20, 0],
                y: [0, 10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            
            <motion.div 
              className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-purple-500/4 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />
            
            {/* Enhanced content with better spacing */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="relative p-6 sm:p-8 lg:p-10"
            >
              {/* Enhanced header with better typography */}
              <motion.div 
                variants={itemVariants}
                className="flex items-start justify-between mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-4 sm:gap-5 flex-1">
                  <motion.div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 ${popup.iconBg} rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0 border border-white/10`}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: [0, -3, 3, 0],
                      boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      rotate: {
                        duration: 0.6,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <div className="scale-110">
                      {popup.icon}
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div 
                        className="text-xs sm:text-sm uppercase tracking-[0.15em] text-festival-red font-bold bg-festival-red/10 px-3 py-1 rounded-full border border-festival-red/20"
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
                          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
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
                      id="popup-title"
                      className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight pr-2 font-display tracking-tight"
                    >
                      {popup.title}
                    </h2>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => handleDismissPopup(popup.id)}
                  className="text-white/50 hover:text-white transition-all duration-300 p-2 sm:p-3 rounded-xl hover:bg-white/10 flex-shrink-0 backdrop-blur-sm border border-transparent hover:border-white/20"
                  aria-label="Close notification"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15 
                  }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </motion.div>
              
              {/* Enhanced message with better typography */}
              <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                <p 
                  id="popup-description"
                  className="text-white/90 leading-relaxed text-sm sm:text-base lg:text-lg font-light tracking-wide"
                >
                  {popup.message}
                </p>
              </motion.div>
              
              {/* Enhanced action buttons with better touch targets */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                {popup.actionButton && (
                  <motion.button
                    onClick={() => handleActionClick(popup.actionButton)}
                    className="flex-1 bg-gradient-to-r from-festival-red to-red-600 hover:from-festival-red/90 hover:to-red-600/90 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-festival-red focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm border border-festival-red/50 hover:border-festival-red group"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: "0 25px 50px rgba(220, 38, 38, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                  >
                    <span className="font-medium tracking-wide">{popup.actionButton.text}</span>
                    <motion.div
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      {popup.actionButton.external ? (
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </motion.div>
                  </motion.button>
                )}
                
                <motion.button
                  onClick={() => handleDismissPopup(popup.id)}
                  className="px-6 sm:px-8 py-4 sm:py-5 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-2xl transition-all duration-300 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm group"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15 
                  }}
                >
                  <span className="tracking-wide">Dismiss</span>
                </motion.button>
              </motion.div>
              
              {/* Enhanced navigation with better touch targets */}
              {visiblePopups.length > 1 && (
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-between mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20"
                >
                  <motion.button
                    onClick={() => navigatePopup('prev')}
                    className="p-3 sm:p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm border border-transparent hover:border-white/20"
                    aria-label="Previous notification"
                    whileHover={{ 
                      scale: 1.1, 
                      x: -3,
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                  
                  <div className="flex items-center gap-3" role="tablist">
                    {activePopups.map((popupItem, index) => {
                      const isDismissed = dismissedPopups.has(popupItem.id);
                      const isCurrent = index === currentPopup && !isDismissed;
                      
                      return (
                        <motion.button
                          key={popupItem.id}
                          onClick={() => !isDismissed && setCurrentPopup(index)}
                          className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                            isCurrent
                              ? 'bg-gradient-to-r from-festival-red to-red-600 w-10 shadow-lg' 
                              : isDismissed
                                ? 'bg-white/20 w-3 cursor-not-allowed'
                                : 'bg-white/40 hover:bg-white/60 w-3 hover:w-6'
                          }`}
                          disabled={isDismissed}
                          aria-label={`Go to notification ${index + 1}`}
                          role="tab"
                          aria-selected={isCurrent}
                          whileHover={{ 
                            scale: isDismissed ? 1 : 1.2,
                            y: isDismissed ? 0 : -1
                          }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 15 
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  <motion.button
                    onClick={() => navigatePopup('next')}
                    className="p-3 sm:p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm border border-transparent hover:border-white/20"
                    aria-label="Next notification"
                    whileHover={{ 
                      scale: 1.1, 
                      x: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </motion.div>
              )}
              
              {/* Enhanced helper text with swipe instructions */}
              {visiblePopups.length > 1 && (
                <motion.div 
                  variants={itemVariants}
                  className="text-center mt-4 sm:mt-6"
                >
                  <p className="text-xs sm:text-sm text-white/40 tracking-wide">
                    <span className="hidden sm:inline">Use ← → arrow keys, click dots, or </span>
                    <span className="sm:hidden">Tap dots or </span>
                    <span className="text-festival-red/60">swipe right</span> to navigate • ESC to close
                  </p>
                </motion.div>
              )}
            </motion.div>
            
            {/* Enhanced decorative elements with better positioning */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-festival-red/50 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-festival-red/50 rounded-br-3xl"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-blue-500/30 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-blue-500/30 rounded-bl-3xl"></div>
            
            {/* Premium corner light effects */}
            <motion.div 
              className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-festival-red/10 to-transparent rounded-full blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-xl"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PopupNotificationSystem;