// src/components/popups/popupData.ts
import React from 'react';
import { Film, Award, Clock, Calendar, Users, Star } from 'lucide-react';
import { PopupData } from './types';

export const popupData: PopupData[] = [
  {
    id: 'premiere-screening',
    title: '🎬 Get Ready for the Big Premiere!',
    message: 'Join us on June 28th, 2025 at 3:45 PM at Cinecity Maradana Theatre for the OnScreen \'25 official short film screening. 🎟 Entry is free, but seating is limited and first-come, first-served. 🗳 Attendees will get to vote for the People\'s Choice Award.',
    icon: React.createElement(Film, { className: "w-6 h-6" }),
    priority: 1,
    category: 'premiere',
    bgGradient: 'from-festival-red/30 via-orange-500/20 to-red-600/30',
    iconBg: 'bg-gradient-to-br from-festival-red to-red-600',
    actionButton: {
      text: 'Learn More',
      link: '/timeline#premiere',
      external: false
    },
    expiresAt: new Date('2025-06-28T15:45:00'),
    showAfter: new Date('2025-05-01T00:00:00'),
    urgent: false
  },
  {
    id: 'festival-reservation',
    title: '🌟 Don\'t Miss the Festival Day – Reserve Your Seat Now',
    message: 'Celebrate the grand finale of OnScreen \'25 on June 29th, 2025 at 3:00 PM at IIT, GP Square, Colombo 04. ✨ Featuring Chief Guest: Dr. Prasad Samarasinghe, along with awards, films, and networking. 🎟 Seats are limited! Reserve now.',
    icon: React.createElement(Award, { className: "w-6 h-6" }),
    priority: 2,
    category: 'festival',
    bgGradient: 'from-blue-600/30 via-indigo-500/20 to-purple-600/30',
    iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    actionButton: {
      text: 'Reserve Seat',
      link: 'https://forms.gle/A1doByZs1Jjunyt76',
      external: true
    },
    expiresAt: new Date('2025-06-29T15:00:00'),
    showAfter: new Date('2025-05-15T00:00:00'),
    urgent: true
  },
  {
    id: 'submission-reminder',
    title: '⏳ Last Call: Submit Your Short Film!',
    message: 'Deadline: May 26th, 2025. Submit your film and script via our form. Follow all naming and formatting guidelines. Don\'t miss your chance to be part of Sri Lanka\'s premier short film festival.',
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
    showAfter: new Date('2025-05-01T00:00:00'),
    urgent: true
  }
];

// Utility functions
export const getActivePopups = (): PopupData[] => {
  const now = new Date();
  return popupData.filter(popup => {
    const isAfterShowDate = !popup.showAfter || now >= popup.showAfter;
    const isBeforeExpiry = !popup.expiresAt || now <= popup.expiresAt;
    return isAfterShowDate && isBeforeExpiry;
  });
};

export const getDismissedPopups = (): Set<string> => {
  try {
    const dismissed = localStorage.getItem('onscreen-dismissed-popups');
    return dismissed ? new Set(JSON.parse(dismissed)) : new Set();
  } catch (error) {
    console.error('Error reading dismissed popups from localStorage:', error);
    return new Set();
  }
};

export const dismissPopup = (popupId: string): void => {
  try {
    const dismissed = getDismissedPopups();
    dismissed.add(popupId);
    localStorage.setItem('onscreen-dismissed-popups', JSON.stringify([...dismissed]));
  } catch (error) {
    console.error('Error saving dismissed popup to localStorage:', error);
  }
};

export const resetDismissedPopups = (): void => {
  try {
    localStorage.removeItem('onscreen-dismissed-popups');
  } catch (error) {
    console.error('Error resetting dismissed popups:', error);
  }
};

export const getVisiblePopups = (): PopupData[] => {
  const activePopups = getActivePopups();
  const dismissedPopups = getDismissedPopups();
  return activePopups.filter(popup => !dismissedPopups.has(popup.id));
};