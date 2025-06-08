
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * LoginScreen - User authentication
 * 
 * Navigation Logic:
 * → HomeScreen (successful login)
 * → RegisterScreen (Create Account link)
 * → ForgotPasswordScreen (Forgot Password link)
 * → OnboardingScreen (first-time users)
 */
export default function LoginScreen() {
  const handleLogin = () => {
    // TODO: Implement login logic and navigate to HomeScreen or OnboardingScreen
    console.log('Handle login');
  };

  const handleCreateAccount = () => {
    // TODO: Navigate to RegisterScreen
    console.log('Navigate to RegisterScreen');
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to ForgotPasswordScreen
    console.log('Navigate to ForgotPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Sign In</HeadingLG>
        
        {/* TODO: Add email and password input fields */}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Sign In"
            onPress={handleLogin}
            variant="primary"
            size="lg"
            fullWidth
          />
          
          <Button
            title="Create Account"
            onPress={handleCreateAccount}
            variant="secondary"
            size="md"
            fullWidth
          />
          
          <Button
            title="Forgot Password?"
            onPress={handleForgotPassword}
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
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  buttonContainer: {
    width: '100%',
    gap: DesignTokens.semanticSpacing.md,
    alignItems: 'center',
  },
});
