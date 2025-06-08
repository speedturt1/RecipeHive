
import { SubscriptionService } from '../../services/SubscriptionService';
import { SubscriptionTiers } from '../../constants/DesignTokens';
import { mockSubscriptionTier } from '../setup';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(() => {
    service = SubscriptionService.getInstance();
  });

  test('should return correct limits for free tier', () => {
    const limits = service.getSubscriptionLimits(SubscriptionTiers.FREE);
    expect(limits.maxRecipes).toBe(10);
    expect(limits.hasOCR).toBe(false);
    expect(limits.hasSocialFeatures).toBe(false);
  });

  test('should return unlimited limits for premium tier', () => {
    const limits = service.getSubscriptionLimits(SubscriptionTiers.PREMIUM);
    expect(limits.maxRecipes).toBe(null);
    expect(limits.hasOCR).toBe(true);
    expect(limits.hasSocialFeatures).toBe(true);
  });

  test('should mock subscription tier correctly', async () => {
    await mockSubscriptionTier(SubscriptionTiers.PREMIUM);
    const tier = await service.getMockSubscription();
    expect(tier).toBe(SubscriptionTiers.PREMIUM);
  });
});
