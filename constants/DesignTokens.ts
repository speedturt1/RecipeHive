
// Professional Minimalist Design System - Design Tokens
export const DesignTokens = {
  // Colors - Professional Palette
  colors: {
    // Primary Colors - Professional Blue-Gray
    primary: {
      500: '#334155', // Slate blue-gray (professional, trustworthy)
      400: '#475569', // Lighter slate
      600: '#1e293b', // Darker slate
      700: '#0f172a', // Deep slate
    },
    
    // Accent - Subtle Orange
    accent: {
      500: '#f97316', // Refined orange
      400: '#fb923c', // Light orange
      600: '#ea580c', // Dark orange
    },
    
    // Success - Muted Green
    success: {
      500: '#059669', // Professional green
      400: '#10b981', // Light green
      600: '#047857', // Dark green
      light: '#f0fdf4',
    },
    
    // Neutral Colors - Professional Gray Scale
    neutral: {
      0: '#ffffff',   // Pure white
      50: '#f8fafc',  // Off-white backgrounds
      100: '#f1f5f9', // Light gray backgrounds
      200: '#e2e8f0', // Subtle borders
      300: '#cbd5e1', // Light borders
      400: '#94a3b8', // Placeholder text
      500: '#64748b', // Secondary text
      600: '#475569', // Primary text
      700: '#334155', // Dark text
      800: '#1e293b', // Darker text
      900: '#0f172a', // Darkest text
    },
    
    // Tier-Specific Colors
    free: {
      primary: '#475569',
      background: '#f8fafc',
      border: '#e2e8f0',
      accent: '#94a3b8',
    },
    
    premium: {
      primary: '#b45309',    // Sophisticated amber
      background: '#fefdf7', // Warm white
      border: '#fbbf24',     // Gold border
      accent: '#f59e0b',     // Gold accent
    },
    
    trial: {
      primary: '#1d4ed8',    // Professional blue
      background: '#f0f9ff', // Light blue background
      border: '#3b82f6',     // Blue border
      accent: '#60a5fa',     // Light blue accent
    },
    
    // Semantic Colors
    warning: '#d97706',
    warningLight: '#fffbeb',
    error: '#dc2626',
    errorLight: '#fef2f2',
    info: '#0284c7',
    infoLight: '#f0f9ff',
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      primary: 'System', // Will use platform default
      heading: 'System',
      mono: 'Courier',
    },
    
    fontSize: {
      xs: 12,    // Caption
      sm: 14,    // Small text
      base: 16,  // Body text
      lg: 18,    // Large body
      xl: 20,    // Small headings
      '2xl': 24, // Medium headings
      '3xl': 30, // Large headings
      '4xl': 36, // XL headings
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing System (8px base unit)
  spacing: {
    0: 0,
    1: 2,   // 2px
    2: 4,   // 4px
    3: 8,   // 8px
    4: 12,  // 12px
    5: 16,  // 16px
    6: 24,  // 24px
    8: 32,  // 32px
    10: 40, // 40px
    12: 48, // 48px
    16: 64, // 64px
    20: 80, // 80px
    24: 96, // 96px
    32: 128, // 128px
  },
  
  // Semantic Spacing
  semanticSpacing: {
    xs: 8,   // spacing.3
    sm: 16,  // spacing.5
    md: 24,  // spacing.6
    lg: 32,  // spacing.8
    xl: 48,  // spacing.12
    '2xl': 80, // spacing.20
  },
  
  // Border Radius
  borderRadius: {
    none: 0,
    sm: 2,    // Minimal rounding
    md: 4,    // Standard elements
    lg: 8,    // Cards and containers
    xl: 12,   // Modals
    '2xl': 16, // Hero sections
  },
  
  // Shadows & Elevation
  shadows: {
    none: 'none',
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.1,
      shadowRadius: 25,
      elevation: 12,
    },
  },
};

// Feature Flags and Subscription Tiers
export const SubscriptionTiers = {
  FREE: 'free',
  PREMIUM: 'premium',
  TRIAL: 'trial',
} as const;

export const FeatureFlags = {
  // Free tier limits
  FREE_RECIPE_LIMIT: 10,
  
  // Premium features
  UNLIMITED_SAVES: 'unlimited_saves',
  OCR_PROCESSING: 'ocr_processing',
  ADVANCED_SEARCH: 'advanced_search',
  COLLECTIONS: 'collections',
  SHOPPING_LISTS: 'shopping_lists',
  SOCIAL_FEATURES: 'social_features',
  AD_FREE_EXPERIENCE: 'ad_free_experience',
  
  // Trial settings
  TRIAL_DURATION_DAYS: 14,
  
  // Ad settings
  AD_FREQUENCY_FREE: 5, // Show ad every 5 actions
  AD_INTERSTITIAL_COOLDOWN: 300, // 5 minutes between interstitials
} as const;

export const PricingConfig = {
  MONTHLY_PRICE: 4.99,
  ANNUAL_PRICE: 39.99,
  CURRENCY: 'USD',
  ANNUAL_DISCOUNT: 0.17, // 17% discount
} as const;

export type SubscriptionTier = typeof SubscriptionTiers[keyof typeof SubscriptionTiers];
