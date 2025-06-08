
/**
 * Navigation Configuration and Screen Types
 * Defines all screen parameters and navigation structure
 */

export type RootStackParamList = {
  // Authentication Stack
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Onboarding Stack
  Onboarding: undefined;
  Tutorial: undefined;
  Permissions: undefined;
  
  // Main App Stack
  MainTabs: undefined;
  
  // Core Screens
  Home: undefined;
  Recipes: undefined;
  RecipeDetail: { recipeId: string };
  CreateRecipe: { initialData?: any };
  EditRecipe: { recipeId: string };
  Search: undefined;
  
  // Premium Features
  Collections: undefined;
  CollectionDetail: { collectionId: string };
  ShoppingList: undefined;
  OCRScan: undefined;
  WebScraping: undefined;
  AdvancedSearch: undefined;
  OfflineRecipes: undefined;
  
  // Social Features (Premium Only)
  SocialFeed: undefined;
  UserProfile: { userId: string };
  Followers: { userId: string };
  Following: { userId: string };
  Comments: { recipeId: string };
  
  // Media Screens
  MediaUpload: { context: 'create' | 'edit'; recipeId?: string };
  ImageEditor: { imageUri: string };
  VideoPlayer: { videoUri: string };
  Gallery: { images: string[]; initialIndex?: number };
  
  // Conversion Screens
  Paywall: { feature: string; context?: string };
  Subscription: undefined;
  TrialExpired: undefined;
  UpgradePrompt: { feature: string };
  PaymentSuccess: undefined;
  
  // Settings Stack
  Profile: undefined;
  Settings: undefined;
  AccountSettings: undefined;
  SubscriptionManagement: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
  HelpSupport: undefined;
  About: undefined;
  
  // Admin Stack (Admin Users Only)
  AdminDashboard: undefined;
  ContentModeration: undefined;
  UserManagement: undefined;
  Analytics: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  RecipesTab: undefined;
  CollectionsTab: undefined;
  ProfileTab: undefined;
};

/**
 * Navigation Guards and Business Logic
 */
export class NavigationGuards {
  static requiresPremium = [
    'Collections',
    'CollectionDetail',
    'ShoppingList',
    'OCRScan',
    'WebScraping',
    'AdvancedSearch',
    'OfflineRecipes',
    'SocialFeed',
    'UserProfile',
    'Followers',
    'Following',
    'Comments',
  ];

  static requiresAdmin = [
    'AdminDashboard',
    'ContentModeration',
    'UserManagement',
    'Analytics',
  ];

  static checkPremiumAccess(screenName: string, userTier: string): boolean {
    if (!this.requiresPremium.includes(screenName)) return true;
    return userTier === 'premium' || userTier === 'trial';
  }

  static checkAdminAccess(screenName: string, userRole: string): boolean {
    if (!this.requiresAdmin.includes(screenName)) return true;
    return userRole === 'admin';
  }

  static getPaywallProps(screenName: string) {
    const paywallMessages = {
      Collections: { feature: 'recipe collections', context: 'organization' },
      ShoppingList: { feature: 'smart shopping lists', context: 'grocery' },
      OCRScan: { feature: 'recipe scanning', context: 'import' },
      WebScraping: { feature: 'web recipe import', context: 'import' },
      AdvancedSearch: { feature: 'advanced search filters', context: 'discovery' },
      SocialFeed: { feature: 'social features', context: 'community' },
    };
    return paywallMessages[screenName as keyof typeof paywallMessages] || { feature: 'this feature' };
  }
}

/**
 * Conversion Triggers for Analytics
 */
export const ConversionTriggers = {
  SAVE_LIMIT_REACHED: 'save_limit_reached',
  COLLECTIONS_ATTEMPTED: 'collections_attempted',
  SHOPPING_LIST_ATTEMPTED: 'shopping_list_attempted',
  ADVANCED_SEARCH_ATTEMPTED: 'advanced_search_attempted',
  OCR_ATTEMPTED: 'ocr_attempted',
  SOCIAL_ATTEMPTED: 'social_attempted',
  WEB_SCRAPING_ATTEMPTED: 'web_scraping_attempted',
  TRIAL_EXPIRED: 'trial_expired',
} as const;
