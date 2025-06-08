
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * PaywallScreen - Premium upgrade modal
 * 
 * Navigation Logic:
 * → SubscriptionScreen (upgrade buttons)
 * ← Previous Screen (close/cancel)
 * Context-aware messaging based on blocked feature
 * Pricing display ($4.99/month, $39.99/year)
 */

interface PaywallScreenProps {
  feature?: string;
  context?: string;
}

export default function PaywallScreen({ feature = 'premium feature', context }: PaywallScreenProps) {
  const handleUpgrade = () => {
    // TODO: Navigate to SubscriptionScreen
    console.log('Navigate to SubscriptionScreen');
  };

  const handleClose = () => {
    // TODO: Navigate back to previous screen
    console.log('Navigate back to previous screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Card variant="premium" style={styles.card}>
          <HeadingLG style={styles.title}>Unlock Premium Features</HeadingLG>
          <BodyBase style={styles.subtitle}>
            {`Access ${feature} and all premium features with RecipeHive Premium`}
          </BodyBase>
          
          {/* TODO: Add feature list */}
          {/* TODO: Add pricing display */}
          
          <View style={styles.buttonContainer}>
            <Button
              title="Upgrade to Premium"
              onPress={handleUpgrade}
              variant="premium"
              size="lg"
              fullWidth
            />
            
            <Button
              title="Maybe Later"
              onPress={handleClose}
              variant="ghost"
              size="md"
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
  },
  card: {
    padding: DesignTokens.semanticSpacing.xl,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
    color: DesignTokens.colors.premium.primary,
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
