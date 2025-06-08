
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionTier, FeatureFlags, SubscriptionTiers } from '../constants/DesignTokens';
import { User, SubscriptionLimits, AdConfig } from '../types/user';

export class SubscriptionService {
  private static instance: SubscriptionService;
  
  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }
  
  // Get subscription limits based on tier
  getSubscriptionLimits(tier: SubscriptionTier): SubscriptionLimits {
    switch (tier) {
      case SubscriptionTiers.FREE:
        return {
          maxRecipes: FeatureFlags.FREE_RECIPE_LIMIT,
          maxCollections: 0, // No collections for free users
          maxShoppingLists: 0, // No shopping lists for free users
          hasOCR: false,
          hasAdvancedSearch: false,
          hasAdFreeExperience: false,
          hasPrioritySupport: false,
          hasSocialFeatures: false, // No social features for free users
          hasCollections: false,
          hasShoppingLists: false,
        };
      
      case SubscriptionTiers.TRIAL:
      case SubscriptionTiers.PREMIUM:
        return {
          maxRecipes: null, // unlimited
          maxCollections: null, // unlimited
          maxShoppingLists: null, // unlimited
          hasOCR: true,
          hasAdvancedSearch: true,
          hasAdFreeExperience: true,
          hasPrioritySupport: true,
          hasSocialFeatures: true,
          hasCollections: true,
          hasShoppingLists: true,
        };
      
      default:
        return this.getSubscriptionLimits(SubscriptionTiers.FREE);
    }
  }
  
  // Check if user can perform action
  canPerformAction(user: User, action: string): boolean {
    const limits = this.getSubscriptionLimits(user.tier);
    
    switch (action) {
      case 'save_recipe':
        return limits.maxRecipes === null || user.recipesCount < limits.maxRecipes;
      
      case 'create_collection':
        return limits.hasCollections && (limits.maxCollections === null || user.collectionsCount < limits.maxCollections);
      
      case 'create_shopping_list':
        return limits.hasShoppingLists;
      
      case 'use_social_features':
      case 'follow_user':
      case 'comment_recipe':
      case 'share_recipe':
        return limits.hasSocialFeatures;
      
      case 'use_ocr':
        return limits.hasOCR;
      
      case 'advanced_search':
        return limits.hasAdvancedSearch;
      
      default:
        return true;
    }
  }
  
  // Get ad configuration
  getAdConfig(user: User): AdConfig {
    const limits = this.getSubscriptionLimits(user.tier);
    
    return {
      showAds: !limits.hasAdFreeExperience,
      adFrequency: FeatureFlags.AD_FREQUENCY_FREE,
      interstitialCooldown: FeatureFlags.AD_INTERSTITIAL_COOLDOWN * 1000, // Convert to ms
    };
  }
  
  // Check if trial is active
  isTrialActive(user: User): boolean {
    if (!user.trialStartedAt || !user.trialEndsAt) {
      return false;
    }
    
    const now = new Date();
    return now >= user.trialStartedAt && now <= user.trialEndsAt;
  }
  
  // Start trial
  async startTrial(userId: string): Promise<Date> {
    const trialStartedAt = new Date();
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + FeatureFlags.TRIAL_DURATION_DAYS);
    
    // Store trial info
    await AsyncStorage.setItem(`trial_${userId}`, JSON.stringify({
      startedAt: trialStartedAt.toISOString(),
      endsAt: trialEndsAt.toISOString(),
    }));
    
    return trialEndsAt;
  }
  
  // Get days remaining in trial
  getTrialDaysRemaining(user: User): number {
    if (!user.trialEndsAt) {
      return 0;
    }
    
    const now = new Date();
    const diff = user.trialEndsAt.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
  
  // Mock subscription for testing
  async mockSubscription(tier: SubscriptionTier): Promise<void> {
    await AsyncStorage.setItem('mock_subscription_tier', tier);
  }
  
  // Get mock subscription
  async getMockSubscription(): Promise<SubscriptionTier | null> {
    const tier = await AsyncStorage.getItem('mock_subscription_tier');
    return tier as SubscriptionTier || null;
  }
}
