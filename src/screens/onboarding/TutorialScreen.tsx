
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * TutorialScreen - Feature walkthrough
 * 
 * Navigation Logic:
 * → PermissionsScreen (Next button)
 * ← OnboardingScreen (Back button)
 */
export default function TutorialScreen() {
  const handleNext = () => {
    // TODO: Navigate to PermissionsScreen
    console.log('Navigate to PermissionsScreen');
  };

  const handleBack = () => {
    // TODO: Navigate back to OnboardingScreen
    console.log('Navigate back to OnboardingScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Feature Walkthrough</HeadingLG>
        <BodyBase style={styles.subtitle}>
          Learn how to make the most of RecipeHive
        </BodyBase>
        
        {/* TODO: Add tutorial content/slides */}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={handleNext}
            variant="primary"
            size="lg"
            fullWidth
          />
          
          <Button
            title="Back"
            onPress={handleBack}
            variant="secondary"
            size="md"
            fullWidth
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
  },
});
