
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * SubscriptionScreen - Payment processing and plan selection
 * 
 * Navigation Logic:
 * → PaymentSuccessScreen (successful payment)
 * → HomeScreen (payment failure with retry)
 * ← PaywallScreen (cancel)
 * Stripe integration with billing management
 */
export default function SubscriptionScreen() {
  const handleMonthlySubscription = () => {
    // TODO: Process monthly subscription with Stripe
    console.log('Process monthly subscription');
  };

  const handleYearlySubscription = () => {
    // TODO: Process yearly subscription with Stripe
    console.log('Process yearly subscription');
  };

  const handleCancel = () => {
    // TODO: Navigate back to PaywallScreen or previous screen
    console.log('Navigate back');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Choose Your Plan</HeadingLG>
        
        <View style={styles.plansContainer}>
          <Card style={styles.planCard}>
            <BodyBase style={styles.planTitle}>Monthly</BodyBase>
            <BodyBase style={styles.planPrice}>$4.99/month</BodyBase>
            <Button
              title="Choose Monthly"
              onPress={handleMonthlySubscription}
              variant="primary"
              size="md"
              fullWidth
            />
          </Card>
          
          <Card variant="premium" style={styles.planCard}>
            <BodyBase style={styles.planTitle}>Yearly</BodyBase>
            <BodyBase style={styles.planPrice}>$39.99/year</BodyBase>
            <BodyBase style={styles.planSavings}>Save 33%</BodyBase>
            <Button
              title="Choose Yearly"
              onPress={handleYearlySubscription}
              variant="premium"
              size="md"
              fullWidth
            />
          </Card>
        </View>
        
        <Button
          title="Cancel"
          onPress={handleCancel}
          variant="ghost"
          size="sm"
        />
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
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  plansContainer: {
    width: '100%',
    gap: DesignTokens.semanticSpacing.md,
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  planCard: {
    padding: DesignTokens.semanticSpacing.lg,
    alignItems: 'center',
    gap: DesignTokens.semanticSpacing.sm,
  },
  planTitle: {
    fontWeight: '600',
  },
  planPrice: {
    fontSize: DesignTokens.typography.fontSize.lg,
    fontWeight: 'bold',
  },
  planSavings: {
    color: DesignTokens.colors.success[600],
    fontWeight: '500',
  },
});
