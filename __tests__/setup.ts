
import '@testing-library/jest-native/extend-expect';
import { SubscriptionService } from '../services/SubscriptionService';
import { AnalyticsService } from '../services/AnalyticsService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock Stripe
jest.mock('@stripe/stripe-react-native', () => ({
  useStripe: () => ({
    createPaymentMethod: jest.fn(),
    confirmPayment: jest.fn(),
  }),
  StripeProvider: ({ children }: any) => children,
}));

// Mock Google Mobile Ads
jest.mock('react-native-google-mobile-ads', () => ({
  BannerAd: () => null,
  InterstitialAd: {
    createForAdRequest: jest.fn(),
  },
  TestIds: {
    BANNER: 'ca-app-pub-3940256099942544/6300978111',
    INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  },
}));

// Subscription tier mocking utilities
export const mockSubscriptionTier = (tier: string) => {
  const service = SubscriptionService.getInstance();
  service.mockSubscription(tier as any);
};

// Analytics event mocking
export const mockAnalyticsEvents = () => {
  const service = AnalyticsService.getInstance();
  service.clearEvents();
  return service;
};
