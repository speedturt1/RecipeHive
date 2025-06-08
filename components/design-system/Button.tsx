
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { DesignTokens } from '../../constants/DesignTokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'premium' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    style,
  ];
  
  const buttonTextStyle = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`size_${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'secondary' || variant === 'ghost' ? DesignTokens.colors.primary[500] : DesignTokens.colors.neutral[0]} 
        />
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: DesignTokens.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...DesignTokens.shadows.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: DesignTokens.colors.primary[500],
    borderColor: DesignTokens.colors.primary[500],
  },
  
  secondary: {
    backgroundColor: DesignTokens.colors.neutral[0],
    borderColor: DesignTokens.colors.neutral[300],
  },
  
  premium: {
    backgroundColor: DesignTokens.colors.premium.primary,
    borderColor: DesignTokens.colors.premium.primary,
    ...DesignTokens.shadows.lg,
  },
  
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Sizes
  size_sm: {
    paddingVertical: DesignTokens.spacing[3],
    paddingHorizontal: DesignTokens.spacing[4],
  },
  
  size_md: {
    paddingVertical: DesignTokens.spacing[4],
    paddingHorizontal: DesignTokens.spacing[6],
  },
  
  size_lg: {
    paddingVertical: DesignTokens.spacing[5],
    paddingHorizontal: DesignTokens.spacing[8],
  },
  
  // States
  disabled: {
    opacity: 0.6,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  baseText: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontWeight: DesignTokens.typography.fontWeight.medium,
    textAlign: 'center',
  },
  
  primaryText: {
    color: DesignTokens.colors.neutral[0],
    fontSize: DesignTokens.typography.fontSize.sm,
  },
  
  secondaryText: {
    color: DesignTokens.colors.primary[500],
    fontSize: DesignTokens.typography.fontSize.sm,
  },
  
  premiumText: {
    color: DesignTokens.colors.neutral[0],
    fontSize: DesignTokens.typography.fontSize.sm,
    fontWeight: DesignTokens.typography.fontWeight.semibold,
  },
  
  ghostText: {
    color: DesignTokens.colors.neutral[600],
    fontSize: DesignTokens.typography.fontSize.sm,
  },
  
  size_smText: {
    fontSize: DesignTokens.typography.fontSize.xs,
  },
  
  size_mdText: {
    fontSize: DesignTokens.typography.fontSize.sm,
  },
  
  size_lgText: {
    fontSize: DesignTokens.typography.fontSize.base,
  },
  
  disabledText: {
    opacity: 0.6,
  },
});
