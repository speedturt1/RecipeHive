
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { HeadingXL, HeadingLG, BodyLG } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

export default function OnboardingScreen() {
  const handleGetStarted = () => {
    router.push('/(onboarding)/tutorial');
  };

  const handleSkip = () => {
    router.replace('/(main)/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={require('@/assets/images/App Icon.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <HeadingXL style={styles.title}>Welcome to RecipeHive!</HeadingXL>
          <BodyLG style={styles.subtitle} color={600}>
            Your premium trial is now active. Let's get you started with a quick tour.
          </BodyLG>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <BodyLG style={styles.featureIcon}>📸</BodyLG>
            <HeadingLG style={styles.featureTitle}>Import Any Recipe</HeadingLG>
            <BodyLG style={styles.featureText} color={600}>
              Scan handwritten cards or import from websites
            </BodyLG>
          </View>

          <View style={styles.feature}>
            <BodyLG style={styles.featureIcon}>📚</BodyLG>
            <HeadingLG style={styles.featureTitle}>Organize Collections</HeadingLG>
            <BodyLG style={styles.featureText} color={600}>
              Create custom collections for any occasion
            </BodyLG>
          </View>

          <View style={styles.feature}>
            <BodyLG style={styles.featureIcon}>🛒</BodyLG>
            <HeadingLG style={styles.featureTitle}>Smart Shopping Lists</HeadingLG>
            <BodyLG style={styles.featureText} color={600}>
              Auto-generate lists organized by store aisle
            </BodyLG>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="premium"
            size="lg"
            fullWidth
          />
          <Button
            title="Skip Tour"
            onPress={handleSkip}
            variant="ghost"
            size="md"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  content: {
    flex: 1,
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    paddingVertical: DesignTokens.semanticSpacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: DesignTokens.semanticSpacing['2xl'],
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: DesignTokens.semanticSpacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
    color: DesignTokens.colors.primary[600],
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 300,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
    gap: DesignTokens.semanticSpacing.xl,
  },
  feature: {
    alignItems: 'center',
    paddingHorizontal: DesignTokens.semanticSpacing.lg,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  featureTitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  featureText: {
    textAlign: 'center',
    maxWidth: 250,
  },
  actions: {
    gap: DesignTokens.semanticSpacing.md,
    alignItems: 'center',
  },
});
