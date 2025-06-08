
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * ForgotPasswordScreen - Password reset functionality
 * 
 * Navigation Logic:
 * → LoginScreen (after reset email sent)
 * ← LoginScreen (back button)
 */
export default function ForgotPasswordScreen() {
  const handleResetPassword = () => {
    // TODO: Implement password reset logic and navigate to LoginScreen
    console.log('Handle password reset');
  };

  const handleBackToLogin = () => {
    // TODO: Navigate back to LoginScreen
    console.log('Navigate back to LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Reset Password</HeadingLG>
        <BodyBase style={styles.subtitle}>
          Enter your email address and we'll send you a reset link
        </BodyBase>
        
        {/* TODO: Add email input field */}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            variant="primary"
            size="lg"
            fullWidth
          />
          
          <Button
            title="Back to Sign In"
            onPress={handleBackToLogin}
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
