
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      router.replace('/(main)/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.loginCard}>
          <HeadingLG style={styles.title}>Welcome Back</HeadingLG>
          <BodyBase style={styles.subtitle} color={600}>
            Sign in to your RecipeHive account
          </BodyBase>

          {/* TODO: Add form inputs */}
          <View style={styles.form}>
            <BodyBase style={styles.placeholder}>
              Email and password inputs will be added next
            </BodyBase>
          </View>

          <View style={styles.actions}>
            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            />

            <Button
              title="Forgot Password?"
              onPress={handleForgotPassword}
              variant="ghost"
              size="sm"
            />
          </View>
        </Card>

        <View style={styles.footer}>
          <BodyBase style={styles.footerText} color={500}>
            Don't have an account?
          </BodyBase>
          <Button
            title="Create Account"
            onPress={handleRegister}
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
  loginCard: {
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
    gap: DesignTokens.semanticSpacing.md,
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: DesignTokens.semanticSpacing.sm,
  },
  footerText: {
    textAlign: 'center',
  },
});
