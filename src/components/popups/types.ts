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
  expiresAt?: Date;
  showAfter?: Date;
  urgent?: boolean;
}

export interface PopupSystemState {
  currentPopup: number;
  isVisible: boolean;
  dismissedPopups: Set<string>;
  hasShownOnLoad: boolean;
  autoShowCount: number;
}

export interface PopupNotificationSystemProps {
  autoShow?: boolean;
  showDelay?: number;
  className?: string;
  maxAutoShows?: number;
  onClose?: () => void;
  forceShow?: boolean; // Force show even if dismissed
}

export interface UsePopupSystemReturn {
  isVisible: boolean;
  currentPopup: number;
  visiblePopups: PopupData[];
  showPopup: () => void;
  hidePopup: () => void;
  nextPopup: () => void;
  prevPopup: () => void;
  dismissCurrentPopup: () => void;
  resetDismissedPopups: () => void;
}