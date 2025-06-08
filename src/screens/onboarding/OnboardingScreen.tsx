
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * OnboardingScreen - Welcome flow for new users
 * 
 * Navigation Logic:
 * → TutorialScreen (Get Started button)
 * → HomeScreen (Skip button)
 */
export default function OnboardingScreen() {
  const handleGetStarted = () => {
    // TODO: Navigate to TutorialScreen
    console.log('Navigate to TutorialScreen');
  };

  const handleSkip = () => {
    // TODO: Navigate to HomeScreen
    console.log('Navigate to HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Welcome to RecipeHive!</HeadingLG>
        <BodyBase style={styles.subtitle}>
          Let's get you started with organizing your recipes
        </BodyBase>
        
        {/* TODO: Add onboarding illustrations/content */}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="lg"
            fullWidth
          />
          
          <Button
            title="Skip"
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
    padding: DesignTokens.semanticSpacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
    color: DesignTokens.colors.neutral[600],
  },
  buttonContainer: {
    width: '100%',
    gap: DesignTokens.semanticSpacing.md,
    alignItems: 'center',
  },
});
