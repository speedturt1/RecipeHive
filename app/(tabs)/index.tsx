
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingXL, HeadingLG, BodyLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { TierBadge } from '@/components/ui/TierBadge';
import { DesignTokens, FeatureFlags, PricingConfig } from '@/constants/DesignTokens';
import { SubscriptionService } from '@/services/SubscriptionService';

interface FeatureComparisonProps {
  feature: string;
  free: boolean;
  premium: boolean;
  description: string;
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ feature, free, premium, description }) => (
  <View style={styles.featureRow}>
    <View style={styles.featureInfo}>
      <BodyBase style={styles.featureName}>{feature}</BodyBase>
      <BodyBase style={styles.featureDescription} color={500}>{description}</BodyBase>
    </View>
    <View style={styles.featureChecks}>
      <View style={[styles.checkContainer, !free && styles.checkDisabled]}>
        <BodyBase color={free ? 600 : 400}>{free ? '✓' : '–'}</BodyBase>
      </View>
      <View style={[styles.checkContainer, styles.checkPremium]}>
        <BodyBase style={{ color: DesignTokens.colors.premium.primary }}>✓</BodyBase>
      </View>
    </View>
  </View>
);

export default function LandingScreen() {
  const [isTrialStarted, setIsTrialStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionService = SubscriptionService.getInstance();

  const handleStartTrial = async () => {
    setIsLoading(true);
    try {
      // Mock trial start
      await subscriptionService.mockSubscription('trial');
      setIsTrialStarted(true);
      // TODO: Navigate to main app or show success
    } catch (error) {
      console.error('Trial start error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStartedFree = async () => {
    try {
      // Mock free tier
      await subscriptionService.mockSubscription('free');
      // TODO: Navigate to main app
    } catch (error) {
      console.error('Free start error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <HeadingXL style={styles.heroTitle}>
            Organize Your{'\n'}Recipes Like a Pro
          </HeadingXL>
          <BodyLG style={styles.heroSubtitle}>
            Discover, save, and share beautiful recipes with mandatory high-quality images. 
            Intelligent grocery lists and seamless recipe management.
          </BodyLG>
        </View>

        {/* Value Proposition Cards */}
        <View style={styles.valueProps}>
          <Card style={styles.valueCard}>
            <HeadingLG style={styles.valueTitle}>📸 Media-First Experience</HeadingLG>
            <BodyBase color={600}>
              Every recipe includes beautiful, high-quality images. Optional cooking videos for premium users.
            </BodyBase>
          </Card>

          <Card style={styles.valueCard}>
            <HeadingLG style={styles.valueTitle}>🛒 Smart Shopping Lists</HeadingLG>
            <BodyBase color={600}>
              Auto-generated grocery lists organized by store sections. Never forget an ingredient again.
            </BodyBase>
          </Card>

          <Card style={styles.valueCard}>
            <HeadingLG style={styles.valueTitle}>🔍 Advanced Recipe Discovery</HeadingLG>
            <BodyBase color={600}>
              OCR technology extracts recipes from images. Search by ingredients, dietary preferences, and more.
            </BodyBase>
          </Card>
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <HeadingLG style={styles.sectionTitle}>Choose Your Plan</HeadingLG>
          
          {/* Free vs Premium Header */}
          <View style={styles.tierHeader}>
            <View style={styles.tierColumn}>
              <TierBadge tier="free" />
              <BodyBase style={styles.tierPrice}>Free Forever</BodyBase>
            </View>
            <View style={styles.tierColumn}>
              <TierBadge tier="premium" />
              <BodyBase style={styles.tierPrice}>
                ${PricingConfig.MONTHLY_PRICE}/month
              </BodyBase>
              <BodyBase color={500} style={styles.tierSavings}>
                or ${PricingConfig.ANNUAL_PRICE}/year (save 17%)
              </BodyBase>
            </View>
          </View>

          {/* Feature Comparison */}
          <Card style={styles.comparisonCard}>
            <FeatureComparison
              feature="Recipe Browsing"
              free={true}
              premium={true}
              description="Unlimited browsing with beautiful images"
            />
            <FeatureComparison
              feature="Recipe Saves"
              free={false}
              premium={true}
              description={`${FeatureFlags.FREE_RECIPE_LIMIT} recipes vs unlimited`}
            />
            <FeatureComparison
              feature="Collections"
              free={false}
              premium={true}
              description={`${FeatureFlags.FREE_COLLECTION_LIMIT} collection vs unlimited`}
            />
            <FeatureComparison
              feature="OCR Recipe Import"
              free={false}
              premium={true}
              description="Extract recipes from photos automatically"
            />
            <FeatureComparison
              feature="Advanced Search"
              free={false}
              premium={true}
              description="Filter by ingredients, diet, cook time"
            />
            <FeatureComparison
              feature="Ad-Free Experience"
              free={false}
              premium={true}
              description="No banner ads or interruptions"
            />
          </Card>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Card variant="premium" style={styles.ctaCard}>
            <HeadingLG style={styles.ctaTitle}>Start Your Free Trial</HeadingLG>
            <BodyBase style={styles.ctaDescription}>
              Try all premium features for {FeatureFlags.TRIAL_DURATION_DAYS} days. 
              No credit card required.
            </BodyBase>
            <View style={styles.ctaButtons}>
              <Button
                title={isTrialStarted ? "Trial Started!" : `Start ${FeatureFlags.TRIAL_DURATION_DAYS}-Day Trial`}
                onPress={handleStartTrial}
                variant="premium"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={isTrialStarted}
              />
              <Button
                title="Continue with Free Plan"
                onPress={handleGetStartedFree}
                variant="ghost"
                size="md"
                fullWidth
              />
            </View>
          </Card>
        </View>

        {/* Trust & Social Proof */}
        <View style={styles.trustSection}>
          <BodyBase color={500} style={styles.trustText}>
            Cross-platform • iOS, Android & Web • Secure & Private
          </BodyBase>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: DesignTokens.spacing[20],
  },
  
  hero: {
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    paddingVertical: DesignTokens.semanticSpacing['2xl'],
    alignItems: 'center',
    textAlign: 'center',
  },
  
  heroTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  
  heroSubtitle: {
    textAlign: 'center',
    maxWidth: 400,
  },
  
  valueProps: {
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    gap: DesignTokens.semanticSpacing.md,
    marginBottom: DesignTokens.semanticSpacing['2xl'],
  },
  
  valueCard: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  
  valueTitle: {
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  
  pricingSection: {
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    marginBottom: DesignTokens.semanticSpacing['2xl'],
  },
  
  sectionTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: DesignTokens.semanticSpacing.lg,
    paddingHorizontal: DesignTokens.semanticSpacing.md,
  },
  
  tierColumn: {
    alignItems: 'center',
    flex: 1,
  },
  
  tierPrice: {
    marginTop: DesignTokens.semanticSpacing.sm,
    fontWeight: DesignTokens.typography.fontWeight.semibold,
  },
  
  tierSavings: {
    fontSize: DesignTokens.typography.fontSize.sm,
    marginTop: DesignTokens.spacing[2],
  },
  
  comparisonCard: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: DesignTokens.semanticSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DesignTokens.colors.neutral[100],
  },
  
  featureInfo: {
    flex: 1,
    marginRight: DesignTokens.semanticSpacing.md,
  },
  
  featureName: {
    fontWeight: DesignTokens.typography.fontWeight.medium,
    marginBottom: DesignTokens.spacing[2],
  },
  
  featureDescription: {
    fontSize: DesignTokens.typography.fontSize.sm,
  },
  
  featureChecks: {
    flexDirection: 'row',
    gap: DesignTokens.semanticSpacing.lg,
    minWidth: 80,
  },
  
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  
  checkDisabled: {
    opacity: 0.4,
  },
  
  checkPremium: {
    backgroundColor: DesignTokens.colors.premium.background,
    borderRadius: 12,
  },
  
  ctaSection: {
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  
  ctaCard: {
    alignItems: 'center',
    textAlign: 'center',
    padding: DesignTokens.semanticSpacing.xl,
  },
  
  ctaTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.sm,
    color: DesignTokens.colors.premium.primary,
  },
  
  ctaDescription: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.lg,
    maxWidth: 300,
  },
  
  ctaButtons: {
    width: '100%',
    gap: DesignTokens.semanticSpacing.sm,
  },
  
  trustSection: {
    alignItems: 'center',
    paddingHorizontal: DesignTokens.semanticSpacing.md,
  },
  
  trustText: {
    textAlign: 'center',
    fontSize: DesignTokens.typography.fontSize.sm,
  },
});
