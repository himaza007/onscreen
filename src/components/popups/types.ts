// src/components/popups/types.ts
import React from 'react';

export interface PopupData {
  id: string;
  title: string;
  message: string;
  icon: React.ReactNode;
  actionButton?: {
    text: string;
    link: string;
    external?: boolean;
  };
  priority: number;
  category: 'premiere' | 'festival' | 'submission' | 'general';
  bgGradient: string;
  iconBg: string;
  expiresAt?: Date; // Optional expiration date
  showAfter?: Date; // Optional show after date
  urgent?: boolean; // For urgent notifications
}

export interface PopupSystemState {
  currentPopup: number;
  isVisible: boolean;
  dismissedPopups: Set<string>;
  hasShownOnLoad: boolean;
}

export interface PopupNotificationSystemProps {
  autoShow?: boolean;
  showDelay?: number;
  className?: string;
  maxAutoShows?: number; // Limit auto-shows per session
}