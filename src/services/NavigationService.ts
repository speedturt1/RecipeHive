
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, NavigationGuards, ConversionTriggers } from '@/navigation/NavigationConfig';
import { SubscriptionService } from './SubscriptionService';
import { AnalyticsService } from './AnalyticsService';

export class NavigationService {
  private static navigation: NavigationProp<RootStackParamList>;
  private static subscriptionService = SubscriptionService.getInstance();
  private static analyticsService = AnalyticsService.getInstance();

  static setNavigation(navigation: NavigationProp<RootStackParamList>) {
    this.navigation = navigation;
  }

  /**
   * Navigate with premium access check
   */
  static navigateWithTierCheck(
    screenName: keyof RootStackParamList,
    params?: any
  ) {
    const userProfile = this.subscriptionService.getCurrentUser();
    
    if (!userProfile) {
      this.navigate('Login');
      return;
    }

    // Check if screen requires premium access
    if (!NavigationGuards.checkPremiumAccess(screenName, userProfile.subscriptionTier)) {
      this.showPaywall(screenName);
      return;
    }

    // Check if screen requires admin access
    if (!NavigationGuards.checkAdminAccess(screenName, userProfile.role)) {
      console.warn('Admin access required');
      return;
    }

    this.navigate(screenName, params);
  }

  /**
   * Show paywall with context
   */
  static showPaywall(blockedFeature: string, context?: string) {
    const paywallProps = NavigationGuards.getPaywallProps(blockedFeature);
    
    // Track conversion trigger
    this.analyticsService.trackEvent('paywall_shown', {
      blocked_feature: blockedFeature,
      context: context || paywallProps.context,
      trigger: this.getConversionTrigger(blockedFeature),
    });

    this.navigate('Paywall', {
      feature: paywallProps.feature,
      context: paywallProps.context,
    });
  }

  /**
   * Handle recipe save with limit check
   */
  static saveRecipeWithLimitCheck(recipeId: string) {
    const userProfile = this.subscriptionService.getCurrentUser();
    
    if (!userProfile) {
      this.navigate('Login');
      return;
    }

    // Check save limit for free users
    if (userProfile.subscriptionTier === 'free') {
      const savedRecipes = userProfile.savedRecipes || [];
      if (savedRecipes.length >= 10) {
        this.analyticsService.trackEvent('save_limit_reached', {
          current_saves: savedRecipes.length,
          attempted_recipe: recipeId,
        });
        this.showPaywall('save_limit', 'recipe_save');
        return;
      }
    }

    // Proceed with save
    this.subscriptionService.saveRecipe(recipeId);
    console.log('Recipe saved successfully');
  }

  /**
   * Handle trial expiration
   */
  static handleTrialExpiration() {
    this.analyticsService.trackEvent('trial_expired');
    this.navigate('TrialExpired');
  }

  /**
   * Navigate to subscription flow
   */
  static startSubscriptionFlow(source?: string) {
    this.analyticsService.trackEvent('subscription_flow_started', {
      source: source || 'unknown',
    });
    this.navigate('Subscription');
  }

  /**
   * Handle successful subscription
   */
  static handleSubscriptionSuccess() {
    this.analyticsService.trackEvent('subscription_completed');
    this.navigate('PaymentSuccess');
  }

  /**
   * Basic navigation wrapper
   */
  private static navigate(screenName: keyof RootStackParamList, params?: any) {
    if (this.navigation) {
      // @ts-ignore - React Navigation typing complexity
      this.navigation.navigate(screenName, params);
    }
  }

  /**
   * Get conversion trigger for analytics
   */
  private static getConversionTrigger(feature: string): string {
    const triggerMap: Record<string, string> = {
      Collections: ConversionTriggers.COLLECTIONS_ATTEMPTED,
      ShoppingList: ConversionTriggers.SHOPPING_LIST_ATTEMPTED,
      AdvancedSearch: ConversionTriggers.ADVANCED_SEARCH_ATTEMPTED,
      OCRScan: ConversionTriggers.OCR_ATTEMPTED,
      SocialFeed: ConversionTriggers.SOCIAL_ATTEMPTED,
      WebScraping: ConversionTriggers.WEB_SCRAPING_ATTEMPTED,
      save_limit: ConversionTriggers.SAVE_LIMIT_REACHED,
    };
    
    return triggerMap[feature] || 'unknown_trigger';
  }

  /**
   * Check if user should see onboarding
   */
  static shouldShowOnboarding(): boolean {
    const userProfile = this.subscriptionService.getCurrentUser();
    return !userProfile?.hasCompletedOnboarding;
  }

  /**
   * Complete onboarding flow
   */
  static completeOnboarding() {
    this.subscriptionService.markOnboardingComplete();
    this.navigate('Home');
  }

  /**
   * Handle authentication success
   */
  static handleAuthSuccess(isNewUser: boolean = false) {
    if (isNewUser || this.shouldShowOnboarding()) {
      this.navigate('Onboarding');
    } else {
      this.navigate('Home');
    }
  }
}
