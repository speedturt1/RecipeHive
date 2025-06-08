
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingXL, BodyLG } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * LandingScreen - App introduction with freemium value proposition
 * 
 * Navigation Logic:
 * → RegisterScreen (Start Free Trial button)
 * → LoginScreen (Sign In button)
 * Auto-redirect if already authenticated
 */
export default function LandingScreen() {
  const handleStartTrial = () => {
    // TODO: Navigate to RegisterScreen
    console.log('Navigate to RegisterScreen');
  };

  const handleSignIn = () => {
    // TODO: Navigate to LoginScreen
    console.log('Navigate to LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingXL style={styles.title}>Welcome to RecipeHive</HeadingXL>
        <BodyLG style={styles.subtitle}>
          Transform your recipe chaos into kitchen confidence
        </BodyLG>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Start Free Trial"
            onPress={handleStartTrial}
            variant="premium"
            size="lg"
            fullWidth
          />
          <Button
            title="Sign In"
            onPress={handleSignIn}
            variant="secondary"
            size="lg"
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
    backgroundColor: DesignTokens.colors.neutral[50],
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
  },
});
