
import { SubscriptionTier } from '../constants/DesignTokens';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
  tier: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
  
  // Trial tracking
  trialStartedAt?: Date;
  trialEndsAt?: Date;
  isTrialActive: boolean;
  
  // Subscription info
  subscriptionId?: string;
  subscriptionStatus?: 'active' | 'cancelled' | 'past_due' | 'incomplete';
  subscriptionCurrentPeriodEnd?: Date;
  
  // Usage tracking
  recipesCount: number;
  collectionsCount: number;
  contentWarnings: number;
  
  // Preferences
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    marketing: boolean;
    productUpdates: boolean;
    recipeRecommendations: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    shareRecipes: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}

export interface SubscriptionLimits {
  maxRecipes: number | null; // null = unlimited
  maxCollections: number | null;
  hasOCR: boolean;
  hasAdvancedSearch: boolean;
  hasAdFreeExperience: boolean;
  hasPrioritySupport: boolean;
}

export interface AdConfig {
  showAds: boolean;
  adFrequency: number;
  lastAdShown?: Date;
  interstitialCooldown: number;
}
