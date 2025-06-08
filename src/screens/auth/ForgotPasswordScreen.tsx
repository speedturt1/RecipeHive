
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual password reset
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      setEmailSent(true);
    } catch (error) {
      Alert.alert('Error', 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <HeadingLG style={styles.title}>Check Your Email</HeadingLG>
            <BodyBase style={styles.subtitle} color={600}>
              We've sent password reset instructions to your email address.
            </BodyBase>

            <View style={styles.actions}>
              <Button
                title="Back to Sign In"
                onPress={handleBackToLogin}
                variant="primary"
                size="lg"
                fullWidth
              />
            </View>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <HeadingLG style={styles.title}>Reset Password</HeadingLG>
          <BodyBase style={styles.subtitle} color={600}>
            Enter your email address and we'll send you instructions to reset your password.
          </BodyBase>

          {/* TODO: Add email input */}
          <View style={styles.form}>
            <BodyBase style={styles.placeholder}>
              Email input will be added next
            </BodyBase>
          </View>

          <View style={styles.actions}>
            <Button
              title="Send Reset Instructions"
              onPress={handleResetPassword}
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            />

            <Button
              title="Back to Sign In"
              onPress={handleBackToLogin}
              variant="ghost"
              size="sm"
            />
          </View>
        </Card>
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
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    paddingVertical: DesignTokens.semanticSpacing.xl,
    justifyContent: 'center',
  },
  card: {
    padding: DesignTokens.semanticSpacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  form: {
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  placeholder: {
    textAlign: 'center',
    padding: DesignTokens.semanticSpacing.lg,
    backgroundColor: DesignTokens.colors.neutral[100],
    borderRadius: DesignTokens.borderRadius.md,
  },
  actions: {
    gap: DesignTokens.semanticSpacing.md,
    alignItems: 'center',
  },
});
