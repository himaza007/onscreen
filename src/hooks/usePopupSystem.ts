// src/hooks/usePopupSystem.ts
import { useState, useEffect, useCallback } from 'react';
import { 
  getActivePopups, 
  getDismissedPopups, 
  dismissPopup as dismissPopupUtil,
  resetDismissedPopups as resetDismissedPopupsUtil,
  getVisiblePopups
} from '../components/popups/popupData';
import { PopupData } from '../components/popups/types';

interface UsePopupSystemReturn {
  activePopups: PopupData[];
  visiblePopups: PopupData[];
  dismissedPopups: Set<string>;
  dismissPopup: (popupId: string) => void;
  resetDismissedPopups: () => void;
  hasVisiblePopups: boolean;
  urgentPopups: PopupData[];
  getPopupsByCategory: (category: string) => PopupData[];
  isPopupDismissed: (popupId: string) => boolean;
}

export const usePopupSystem = (): UsePopupSystemReturn => {
  const [dismissedPopups, setDismissedPopups] = useState<Set<string>>(new Set());
  const [activePopups, setActivePopups] = useState<PopupData[]>([]);

  // Load dismissed popups and active popups on mount
  useEffect(() => {
    const loadPopupData = () => {
      try {
        setDismissedPopups(getDismissedPopups());
        setActivePopups(getActivePopups());
      } catch (error) {
        console.error('Error loading popup data:', error);
      }
    };

    loadPopupData();

    // Listen for storage changes to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'onscreen-dismissed-popups') {
        loadPopupData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter visible popups
  const visiblePopups = getVisiblePopups().filter(popup => !dismissedPopups.has(popup.id));

  // Get urgent popups
  const urgentPopups = visiblePopups.filter(popup => popup.urgent);

  // Dismiss a popup
  const dismissPopup = useCallback((popupId: string) => {
    try {
      dismissPopupUtil(popupId);
      const newDismissed = new Set(dismissedPopups);
      newDismissed.add(popupId);
      setDismissedPopups(newDismissed);
    } catch (error) {
      console.error('Error dismissing popup:', error);
    }
  }, [dismissedPopups]);

  // Reset all dismissed popups
  const resetDismissedPopups = useCallback(() => {
    try {
      resetDismissedPopupsUtil();
      setDismissedPopups(new Set());
    } catch (error) {
      console.error('Error resetting dismissed popups:', error);
    }
  }, []);

  // Get popups by category
  const getPopupsByCategory = useCallback((category: string) => {
    return activePopups.filter(popup => popup.category === category);
  }, [activePopups]);

  // Check if a specific popup is dismissed
  const isPopupDismissed = useCallback((popupId: string) => {
    return dismissedPopups.has(popupId);
  }, [dismissedPopups]);

  return {
    activePopups,
    visiblePopups,
    dismissedPopups,
    dismissPopup,
    resetDismissedPopups,
    hasVisiblePopups: visiblePopups.length > 0,
    urgentPopups,
    getPopupsByCategory,
    isPopupDismissed
  };
};