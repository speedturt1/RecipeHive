
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { DesignTokens, SubscriptionTier } from '../../constants/DesignTokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'disabled';
  tier?: SubscriptionTier;
  style?: ViewStyle;
  padding?: keyof typeof DesignTokens.semanticSpacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  tier,
  style,
  padding = 'lg',
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    tier && styles[`tier_${tier}`],
    { padding: DesignTokens.semanticSpacing[padding] },
    style,
  ];
  
  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: DesignTokens.colors.neutral[0],
    borderRadius: DesignTokens.borderRadius.lg,
    borderWidth: 1,
    borderColor: DesignTokens.colors.neutral[200],
    ...DesignTokens.shadows.sm,
  },
  
  default: {
    // Base styling already applied
  },
  
  premium: {
    borderColor: DesignTokens.colors.premium.border,
    backgroundColor: DesignTokens.colors.premium.background,
    ...DesignTokens.shadows.lg,
  },
  
  disabled: {
    backgroundColor: DesignTokens.colors.neutral[50],
    opacity: 0.6,
  },
  
  // Tier-specific styling
  tier_free: {
    borderColor: DesignTokens.colors.free.border,
    backgroundColor: DesignTokens.colors.free.background,
  },
  
  tier_premium: {
    borderColor: DesignTokens.colors.premium.border,
    backgroundColor: DesignTokens.colors.premium.background,
  },
  
  tier_trial: {
    borderColor: DesignTokens.colors.trial.border,
    backgroundColor: DesignTokens.colors.trial.background,
  },
});
