import { useState, useEffect, useCallback } from 'react';
import { 
  getActivePopups, 
  getVisiblePopups, 
  dismissPopup, 
  resetDismissedPopups as resetDismissed,
  getDismissedPopups,
  getAutoShowCount,
  setAutoShowCount,
  shouldAutoShow
} from '../components/popups/popupData';
import { PopupData, UsePopupSystemReturn } from '../components/popups/types';

export const usePopupSystem = (): UsePopupSystemReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentPopup, setCurrentPopup] = useState<number>(0);
  const [dismissedPopups, setDismissedPopups] = useState<Set<string>>(new Set());

  // Load initial state
  useEffect(() => {
    setDismissedPopups(getDismissedPopups());
  }, []);

  const visiblePopups = getVisiblePopups();

  const showPopup = useCallback(() => {
    const popups = getVisiblePopups();
    if (popups.length > 0) {
      setCurrentPopup(0);
      setIsVisible(true);
    }
  }, []);

  const hidePopup = useCallback(() => {
    setIsVisible(false);
  }, []);

  const nextPopup = useCallback(() => {
    const popups = getVisiblePopups();
    if (popups.length > 1) {
      setCurrentPopup((prev) => (prev + 1) % popups.length);
    }
  }, []);

  const prevPopup = useCallback(() => {
    const popups = getVisiblePopups();
    if (popups.length > 1) {
      setCurrentPopup((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
    }
  }, []);

  const dismissCurrentPopup = useCallback(() => {
    const popups = getVisiblePopups();
    const currentPopupData = popups[currentPopup];
    
    if (currentPopupData) {
      dismissPopup(currentPopupData.id);
      setDismissedPopups(getDismissedPopups());
      
      const remainingPopups = popups.filter(p => p.id !== currentPopupData.id);
      if (remainingPopups.length === 0) {
        setIsVisible(false);
      } else {
        const nextIndex = currentPopup >= remainingPopups.length ? 0 : currentPopup;
        setCurrentPopup(nextIndex);
      }
    }
  }, [currentPopup]);

  const resetDismissedPopups = useCallback(() => {
    resetDismissed();
    setDismissedPopups(new Set());
    setAutoShowCount(0);
  }, []);

  return {
    isVisible,
    currentPopup,
    visiblePopups,
    showPopup,
    hidePopup,
    nextPopup,
    prevPopup,
    dismissCurrentPopup,
    resetDismissedPopups
  };
};