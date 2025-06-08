
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DesignTokens, SubscriptionTier } from '../../constants/DesignTokens';
import { Caption } from '../design-system/Typography';

interface TierBadgeProps {
  tier: SubscriptionTier;
  size?: 'sm' | 'md';
}

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (tier) {
      case 'free':
        return {
          label: 'EXPLORER',
          backgroundColor: DesignTokens.colors.free.background,
          borderColor: DesignTokens.colors.free.border,
          textColor: DesignTokens.colors.free.primary,
        };
      case 'premium':
        return {
          label: 'MASTER',
          backgroundColor: DesignTokens.colors.premium.background,
          borderColor: DesignTokens.colors.premium.border,
          textColor: DesignTokens.colors.premium.primary,
        };
      case 'trial':
        return {
          label: 'TRIAL',
          backgroundColor: DesignTokens.colors.trial.background,
          borderColor: DesignTokens.colors.trial.border,
          textColor: DesignTokens.colors.trial.primary,
        };
      default:
        return {
          label: 'FREE',
          backgroundColor: DesignTokens.colors.free.background,
          borderColor: DesignTokens.colors.free.border,
          textColor: DesignTokens.colors.free.primary,
        };
    }
  };
  
  const config = getBadgeConfig();
  
  const badgeStyle = [
    styles.badge,
    size === 'sm' && styles.badgeSm,
    {
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
    },
  ];
  
  return (
    <View style={badgeStyle}>
      <Caption style={{ color: config.textColor, fontWeight: DesignTokens.typography.fontWeight.medium }}>
        {config.label}
      </Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: DesignTokens.spacing[4],
    paddingVertical: DesignTokens.spacing[2],
    borderRadius: DesignTokens.borderRadius.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  
  badgeSm: {
    paddingHorizontal: DesignTokens.spacing[3],
    paddingVertical: DesignTokens.spacing[1],
  },
});
