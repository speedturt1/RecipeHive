
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens, FeatureFlags } from '@/constants/DesignTokens';
import { SubscriptionService } from '@/services/SubscriptionService';

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionService = SubscriptionService.getInstance();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      
      // Auto-activate trial for new users
      await subscriptionService.mockSubscription('trial');
      
      router.replace('/(onboarding)/welcome');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.registerCard}>
          <HeadingLG style={styles.title}>Start Your Free Trial</HeadingLG>
          <BodyBase style={styles.subtitle} color={600}>
            Get {FeatureFlags.TRIAL_DURATION_DAYS} days of premium features, then choose your plan
          </BodyBase>

          {/* TODO: Add form inputs */}
          <View style={styles.form}>
            <BodyBase style={styles.placeholder}>
              Registration form inputs will be added next
            </BodyBase>
          </View>

          <View style={styles.actions}>
            <Button
              title={`Start ${FeatureFlags.TRIAL_DURATION_DAYS}-Day Free Trial`}
              onPress={handleRegister}
              variant="premium"
              size="lg"
              fullWidth
              loading={isLoading}
            />
          </View>

          <BodyBase style={styles.terms} color={500}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </BodyBase>
        </Card>

        <View style={styles.footer}>
          <BodyBase style={styles.footerText} color={500}>
            Already have an account?
          </BodyBase>
          <Button
            title="Sign In"
            onPress={handleLogin}
            variant="secondary"
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
    backgroundColor: DesignTokens.colors.neutral[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: DesignTokens.semanticSpacing.md,
    paddingVertical: DesignTokens.semanticSpacing.xl,
    justifyContent: 'center',
  },
  registerCard: {
    padding: DesignTokens.semanticSpacing.xl,
    marginBottom: DesignTokens.semanticSpacing.lg,
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
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  terms: {
    textAlign: 'center',
    fontSize: DesignTokens.typography.fontSize.xs,
    lineHeight: DesignTokens.typography.fontSize.xs * DesignTokens.typography.lineHeight.relaxed,
  },
  footer: {
    alignItems: 'center',
    gap: DesignTokens.semanticSpacing.sm,
  },
  footerText: {
    textAlign: 'center',
  },
});
