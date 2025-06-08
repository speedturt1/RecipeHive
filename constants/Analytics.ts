
// Analytics Events for Conversion Optimization
export const AnalyticsEvents = {
  // User Journey Events
  USER_REGISTERED: 'user_registered',
  TRIAL_STARTED: 'trial_started',
  TRIAL_ENDED: 'trial_ended',
  SUBSCRIPTION_CREATED: 'subscription_created',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  
  // Feature Usage Events
  RECIPE_VIEWED: 'recipe_viewed',
  RECIPE_SAVED: 'recipe_saved',
  RECIPE_CREATED: 'recipe_created',
  SEARCH_PERFORMED: 'search_performed',
  COLLECTION_CREATED: 'collection_created',
  
  // Conversion Events
  PAYWALL_VIEWED: 'paywall_viewed',
  UPGRADE_BUTTON_CLICKED: 'upgrade_button_clicked',
  LIMIT_HIT: 'limit_hit',
  FEATURE_BLOCKED: 'feature_blocked',
  
  // Ad Events
  AD_VIEWED: 'ad_viewed',
  AD_CLICKED: 'ad_clicked',
  AD_REVENUE: 'ad_revenue',
  
  // Media Events
  IMAGE_UPLOADED: 'image_uploaded',
  VIDEO_UPLOADED: 'video_uploaded',
  OCR_USED: 'ocr_used',
  CONTENT_MODERATED: 'content_moderated',
} as const;

export const ConversionFunnelSteps = {
  LANDING_PAGE_VIEW: 'landing_page_view',
  REGISTRATION_START: 'registration_start',
  REGISTRATION_COMPLETE: 'registration_complete',
  FIRST_RECIPE_VIEW: 'first_recipe_view',
  FIRST_SAVE_ATTEMPT: 'first_save_attempt',
  LIMIT_REACHED: 'limit_reached',
  PAYWALL_SHOWN: 'paywall_shown',
  TRIAL_STARTED: 'trial_started',
  SUBSCRIPTION_COMPLETED: 'subscription_completed',
} as const;

export const UserSegments = {
  NEW_USER: 'new_user',
  ACTIVE_FREE: 'active_free',
  TRIAL_USER: 'trial_user',
  PREMIUM_USER: 'premium_user',
  CHURNED_USER: 'churned_user',
} as const;
