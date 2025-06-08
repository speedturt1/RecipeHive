
import { AnalyticsEvents, ConversionFunnelSteps, UserSegments } from '../constants/Analytics';
import { SubscriptionTier } from '../constants/DesignTokens';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  
  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
  
  // Track conversion funnel events
  trackFunnelStep(step: keyof typeof ConversionFunnelSteps, properties?: Record<string, any>) {
    this.track(ConversionFunnelSteps[step], {
      funnel_step: step,
      ...properties,
    });
  }
  
  // Track subscription events
  trackSubscriptionEvent(event: keyof typeof AnalyticsEvents, tier: SubscriptionTier, properties?: Record<string, any>) {
    this.track(AnalyticsEvents[event], {
      subscription_tier: tier,
      ...properties,
    });
  }
  
  // Track feature usage
  trackFeatureUsage(feature: string, tier: SubscriptionTier, success: boolean = true) {
    this.track('feature_used', {
      feature,
      subscription_tier: tier,
      success,
      timestamp: new Date().toISOString(),
    });
  }
  
  // Track paywall interactions
  trackPaywallEvent(action: 'viewed' | 'dismissed' | 'converted', context: string, tier: SubscriptionTier) {
    this.track(AnalyticsEvents.PAYWALL_VIEWED, {
      paywall_action: action,
      paywall_context: context,
      subscription_tier: tier,
    });
  }
  
  // Track ad events
  trackAdEvent(event: 'viewed' | 'clicked', adType: 'banner' | 'interstitial', revenue?: number) {
    this.track(event === 'viewed' ? AnalyticsEvents.AD_VIEWED : AnalyticsEvents.AD_CLICKED, {
      ad_type: adType,
      ad_revenue: revenue,
    });
  }
  
  // Track user segments
  identifyUserSegment(userId: string, segment: keyof typeof UserSegments, properties?: Record<string, any>) {
    this.track('user_segment_identified', {
      user_id: userId,
      segment: UserSegments[segment],
      ...properties,
    });
  }
  
  // Generic track method
  track(event: string, properties?: Record<string, any>, userId?: string) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        platform: 'react-native',
        ...properties,
      },
      userId,
      timestamp: new Date(),
    };
    
    this.events.push(analyticsEvent);
    
    // In production, send to analytics service
    if (__DEV__) {
      console.log('📊 Analytics Event:', analyticsEvent);
    }
    
    // TODO: Send to actual analytics service (Mixpanel, Amplitude, etc.)
  }
  
  // Get events for debugging
  getEvents(): AnalyticsEvent[] {
    return this.events;
  }
  
  // Clear events (for testing)
  clearEvents() {
    this.events = [];
  }
}
