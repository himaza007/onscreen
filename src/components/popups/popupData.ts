import React from 'react';
import { Film, Award, Clock, Calendar, Users, Star, ExternalLink } from 'lucide-react';
import { PopupData } from './types';

export const popupData: PopupData[] = [
  {
    id: 'premiere-screening',
    title: 'Get Ready for the Big Premiere 🎬 ',
    message: "📅 28th June 2025 🕒 3:45 PM onwards \n 📍 Cinecity Maradana Theatre\n\nJoin us for the OnScreen ’25 official short film screening. 🎟 Free entry, but seats are limited—first come, first served. 🗳️ Cast your vote for the People's Choice Award!",
    icon: React.createElement(Film, { className: "w-6 h-6" }),
    priority: 1,
    category: 'premiere',
    bgGradient: 'from-red-600/30 via-orange-500/20 to-red-600/30',
    iconBg: 'bg-gradient-to-br from-red-600 to-red-700',

    expiresAt: new Date('2025-06-28T23:59:59'),
    showAfter: new Date('2025-01-01T00:00:00'),
    urgent: false
  },
  {
    id: 'festival-reservation',
    title: 'Festival Day – Reserve Now 🌟 ',
    message: "📅 29th June 2025\n🕒 3:00 PM onwards\n📍 IIT, GP Square, Colombo 04\n\nCelebrate the grand finale of OnScreen ’25! ✨ Featuring Chief Guest Minister of Youth Affairs and Sports. Enjoy award ceremonies and networking. 🎟 First come first serve basis.",
    icon: React.createElement(Award, { className: "w-6 h-6" }),
    priority: 2,
    category: 'festival',
    bgGradient: 'from-blue-600/30 via-indigo-500/20 to-purple-600/30',
    iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    actionButton: {
      text: 'Reserve Seat',
      link: 'https://forms.gle/B9FNAaCTWSnzTrLL9',
      external: true
    },
    expiresAt: new Date('2025-06-29T23:59:59'),
    showAfter: new Date('2025-01-01T00:00:00'),
    urgent: false
  },
  {
    id: 'submission-reminder',
    title: 'Final Call – Submit Your Short Film ⏳ ',
    message: "📅 Deadline: 26th May 2025\n\nSubmit your short film and script to be part of Sri Lanka’s premier youth-led film festival. 📝 Follow all submission and naming guidelines carefully before uploading.",
    icon: React.createElement(Clock, { className: "w-6 h-6" }),
    priority: 3,
    category: 'submission',
    bgGradient: 'from-orange-500/30 via-amber-500/20 to-yellow-600/30',
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    actionButton: {
      text: 'Submit Film',
      link: '/submit',
      external: false
    },
    expiresAt: new Date('2025-05-26T23:59:59'),
    showAfter: new Date('2025-01-01T00:00:00'),
    urgent: true
  }
];


// Storage keys
const STORAGE_KEYS = {
  DISMISSED_POPUPS: 'onscreen-dismissed-popups',
  AUTO_SHOW_COUNT: 'onscreen-popup-auto-shows',
  LAST_SHOWN: 'onscreen-popup-last-shown'
} as const;

// Utility functions
export const getActivePopups = (): PopupData[] => {
  const now = new Date();
  return popupData
    .filter(popup => {
      const isAfterShowDate = !popup.showAfter || now >= popup.showAfter;
      const isBeforeExpiry = !popup.expiresAt || now <= popup.expiresAt;
      return isAfterShowDate && isBeforeExpiry;
    })
    .sort((a, b) => a.priority - b.priority);
};

export const getDismissedPopups = (): Set<string> => {
  try {
    if (typeof window === 'undefined') return new Set();
    const dismissed = localStorage.getItem(STORAGE_KEYS.DISMISSED_POPUPS);
    return dismissed ? new Set(JSON.parse(dismissed)) : new Set();
  } catch (error) {
    console.error('Error reading dismissed popups from localStorage:', error);
    return new Set();
  }
};

export const dismissPopup = (popupId: string): void => {
  try {
    if (typeof window === 'undefined') return;
    const dismissed = getDismissedPopups();
    dismissed.add(popupId);
    localStorage.setItem(STORAGE_KEYS.DISMISSED_POPUPS, JSON.stringify([...dismissed]));
  } catch (error) {
    console.error('Error saving dismissed popup to localStorage:', error);
  }
};

export const resetDismissedPopups = (): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.DISMISSED_POPUPS);
    localStorage.removeItem(STORAGE_KEYS.AUTO_SHOW_COUNT);
    localStorage.removeItem(STORAGE_KEYS.LAST_SHOWN);
  } catch (error) {
    console.error('Error resetting dismissed popups:', error);
  }
};

export const getVisiblePopups = (): PopupData[] => {
  const activePopups = getActivePopups();
  const dismissedPopups = getDismissedPopups();
  return activePopups.filter(popup => !dismissedPopups.has(popup.id));
};

export const getAutoShowCount = (): number => {
  try {
    if (typeof window === 'undefined') return 0;
    const count = sessionStorage.getItem(STORAGE_KEYS.AUTO_SHOW_COUNT);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error reading auto show count:', error);
    return 0;
  }
};

export const setAutoShowCount = (count: number): void => {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEYS.AUTO_SHOW_COUNT, count.toString());
  } catch (error) {
    console.error('Error setting auto show count:', error);
  }
};

export const shouldAutoShow = (maxAutoShows: number = 1): boolean => {
  const currentCount = getAutoShowCount();
  const visiblePopups = getVisiblePopups();
  return currentCount < maxAutoShows && visiblePopups.length > 0;
};