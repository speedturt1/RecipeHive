
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingXL, HeadingLG, BodyLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { TierBadge } from '@/components/ui/TierBadge';
import { DesignTokens, FeatureFlags, PricingConfig } from '@/constants/DesignTokens';
import { SubscriptionService } from '@/services/SubscriptionService';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  tier: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, tier }) => {
  const getTierBadge = (tierType: string) => {
    if (tierType === "All Users") {
      return <TierBadge tier="free" />;
    } else if (tierType.includes("Premium")) {
      return <TierBadge tier="premium" />;
    }
    return null;
  };

  return (
    <Card style={styles.featureCard}>
      <View style={styles.featureHeader}>
        <View style={styles.iconContainer}>
          <BodyLG style={styles.featureIcon}>{icon}</BodyLG>
        </View>
        {getTierBadge(tier)}
      </View>
      <HeadingLG style={styles.featureTitle}>{title}</HeadingLG>
      <BodyBase color={600} style={styles.featureDescription}>
        {description}
      </BodyBase>
    </Card>
  );
};

export default function RecipeHiveHomepage() {
  const [isTrialStarted, setIsTrialStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionService = SubscriptionService.getInstance();

  const productSummary = {
    title: "Your Recipe Collection, Perfected",
    description: "Transform scattered recipe links, photos, and handwritten cards into one beautifully organized digital cookbook with stunning visuals.",
    subtitle: "Plus, generate smart shopping lists that organize ingredients by store aisle, making your grocery trips faster and more efficient."
  };

  const keyFeatures = [
    {
      icon: "🖼️",
      title: "My Recipe Collection",
      description: "Every recipe features beautiful images with optional cooking videos. Save unlimited recipes and browse with confidence knowing exactly what each dish should look like.",
      tier: "All Users"
    },
    {
      icon: "📸",
      title: "Smart Recipe Import",
      description: "Scan handwritten recipes with OCR technology or import directly from any cooking website. Transform any recipe source into your organized digital collection.",
      tier: "Premium"
    },
    {
      icon: "🛒",
      title: "Intelligent Shopping Lists",
      description: "Generate organized grocery lists automatically from your recipes. Smart categorization by store aisle makes shopping faster and more efficient.",
      tier: "Premium"
    },
    {
      icon: "🔍",
      title: "Advanced Search & Discovery",
      description: "Find recipes instantly with powerful filters for ingredients, dietary needs, cuisine type, and cooking time. Premium users get AI-powered recommendations.",
      tier: "Premium Search"
    },
    {
      icon: "👥",
      title: "Social Cooking Community",
      description: "Follow favorite food creators, share your own recipes with photos and videos, and get inspired by a community of passionate home cooks.",
      tier: "Premium Social"
    }
  ];

  const handleStartTrial = async () => {
    setIsLoading(true);
    try {
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
            {productSummary.title}
          </HeadingXL>
          <BodyLG style={styles.heroDescription}>
            {productSummary.description}
          </BodyLG>
          <BodyBase style={styles.heroSubtitle} color={500}>
            {productSummary.subtitle}
          </BodyBase>

          {/* CTA Buttons */}
          <View style={styles.ctaButtons}>
            <Button
              title={isTrialStarted ? "Trial Started!" : `Start ${FeatureFlags.TRIAL_DURATION_DAYS}-Day Free Trial`}
              onPress={handleStartTrial}
              variant="premium"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isTrialStarted}
            />
            <Button
              title="📱 Download Free App"
              onPress={handleGetStartedFree}
              variant="secondary"
              size="lg"
              fullWidth
            />
          </View>

          {/* Trust Indicators */}
          <View style={styles.trustIndicators}>
            <View style={styles.trustItem}>
              <View style={[styles.trustDot, { backgroundColor: DesignTokens.colors.success[500] }]} />
              <BodyBase color={500} style={styles.trustText}>Free Forever Plan</BodyBase>
            </View>
            <View style={styles.trustItem}>
              <View style={[styles.trustDot, { backgroundColor: DesignTokens.colors.primary[500] }]} />
              <BodyBase color={500} style={styles.trustText}>Works on All Devices</BodyBase>
            </View>
            <View style={styles.trustItem}>
              <View style={[styles.trustDot, { backgroundColor: DesignTokens.colors.accent[500] }]} />
              <BodyBase color={500} style={styles.trustText}>Cancel Anytime</BodyBase>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresSectionHeader}>
            <HeadingLG style={styles.sectionTitle}>
              Everything You Need for Recipe Success
            </HeadingLG>
            <BodyLG style={styles.sectionSubtitle} color={600}>
              From free recipe browsing to premium import tools, RecipeHive grows with your cooking journey.
            </BodyLG>
          </View>

          <View style={styles.featuresGrid}>
            {keyFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                tier={feature.tier}
              />
            ))}
          </View>
        </View>

        {/* Final CTA Section */}
        <View style={styles.finalCta}>
          <Card variant="premium" style={styles.finalCtaCard}>
            <HeadingLG style={styles.finalCtaTitle}>Ready to Perfect Your Recipe Collection?</HeadingLG>
            <BodyBase style={styles.finalCtaDescription}>
              Join thousands of home cooks who've transformed their recipe chaos into beautifully organized digital cookbooks.
            </BodyBase>
            <View style={styles.finalCtaButtons}>
              <Button
                title="Start Your Free Trial"
                onPress={handleStartTrial}
                variant="premium"
                size="lg"
                fullWidth
                loading={isLoading}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignTokens.colors.neutral[50],
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
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  
  heroTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.lg,
    maxWidth: 400,
  },
  
  heroDescription: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
    maxWidth: 500,
  },
  
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
    maxWidth: 400,
  },
  
  ctaButtons: {
    width: '100%',
    maxWidth: 400,
    gap: DesignTokens.semanticSpacing.md,
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  
  trustIndicators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: DesignTokens.semanticSpacing.lg,
  },
  
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DesignTokens.spacing[2],
  },
  
  trustDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  trustText: {
    fontSize: DesignTokens.typography.fontSize.sm,
  },
  
  featuresSection: {
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    paddingVertical: DesignTokens.semanticSpacing['2xl'],
  },
  
  featuresSectionHeader: {
    alignItems: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  
  sectionTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  
  sectionSubtitle: {
    textAlign: 'center',
    maxWidth: 400,
  },
  
  featuresGrid: {
    gap: DesignTokens.semanticSpacing.lg,
  },
  
  featureCard: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  
  iconContainer: {
    backgroundColor: DesignTokens.colors.neutral[100],
    padding: DesignTokens.spacing[3],
    borderRadius: DesignTokens.borderRadius.lg,
  },
  
  featureIcon: {
    fontSize: 24,
  },
  
  featureTitle: {
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  
  featureDescription: {
    lineHeight: DesignTokens.typography.fontSize.base * DesignTokens.typography.lineHeight.relaxed,
  },
  
  finalCta: {
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  
  finalCtaCard: {
    alignItems: 'center',
    textAlign: 'center',
    padding: DesignTokens.semanticSpacing.xl,
  },
  
  finalCtaTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.sm,
    color: DesignTokens.colors.premium.primary,
  },
  
  finalCtaDescription: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.lg,
    maxWidth: 300,
  },
  
  finalCtaButtons: {
    width: '100%',
    maxWidth: 300,
  },
});
