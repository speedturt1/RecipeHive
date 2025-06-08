
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * RegisterScreen - New user registration with automatic trial activation
 * 
 * Navigation Logic:
 * → OnboardingScreen (successful registration)
 * → LoginScreen (Already have account link)
 * Auto-activate 14-day trial
 * Set user tier to `trial`
 */
export default function RegisterScreen() {
  const handleRegister = () => {
    // TODO: Implement registration logic, auto-activate trial, navigate to OnboardingScreen
    console.log('Handle registration with trial activation');
  };

  const handleSignIn = () => {
    // TODO: Navigate to LoginScreen
    console.log('Navigate to LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Create Account</HeadingLG>
        <BodyBase style={styles.subtitle}>
          Start your 14-day free trial today
        </BodyBase>
        
        {/* TODO: Add registration form fields */}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Start Free Trial"
            onPress={handleRegister}
            variant="premium"
            size="lg"
            fullWidth
          />
          
          <Button
            title="Already have an account? Sign In"
            onPress={handleSignIn}
            variant="ghost"
            size="sm"
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
    alignItems: 'center',
  },
});
