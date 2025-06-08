
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { DesignTokens } from '../../constants/DesignTokens';

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: keyof typeof DesignTokens.colors.neutral;
  numberOfLines?: number;
}

export const HeadingXL: React.FC<TypographyProps> = ({ children, style, color = 900, ...props }) => (
  <Text style={[styles.headingXL, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const HeadingLG: React.FC<TypographyProps> = ({ children, style, color = 800, ...props }) => (
  <Text style={[styles.headingLG, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const HeadingMD: React.FC<TypographyProps> = ({ children, style, color = 700, ...props }) => (
  <Text style={[styles.headingMD, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const HeadingSM: React.FC<TypographyProps> = ({ children, style, color = 700, ...props }) => (
  <Text style={[styles.headingSM, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const BodyLG: React.FC<TypographyProps> = ({ children, style, color = 600, ...props }) => (
  <Text style={[styles.bodyLG, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const BodyBase: React.FC<TypographyProps> = ({ children, style, color = 600, ...props }) => (
  <Text style={[styles.bodyBase, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const BodySM: React.FC<TypographyProps> = ({ children, style, color = 500, ...props }) => (
  <Text style={[styles.bodySM, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

export const Caption: React.FC<TypographyProps> = ({ children, style, color = 400, ...props }) => (
  <Text style={[styles.caption, { color: DesignTokens.colors.neutral[color] }, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  headingXL: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize['4xl'],
    fontWeight: DesignTokens.typography.fontWeight.bold,
    lineHeight: DesignTokens.typography.fontSize['4xl'] * DesignTokens.typography.lineHeight.tight,
    letterSpacing: -0.025,
  },
  
  headingLG: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize['3xl'],
    fontWeight: DesignTokens.typography.fontWeight.semibold,
    lineHeight: DesignTokens.typography.fontSize['3xl'] * DesignTokens.typography.lineHeight.tight,
    letterSpacing: -0.025,
  },
  
  headingMD: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize['2xl'],
    fontWeight: DesignTokens.typography.fontWeight.semibold,
    lineHeight: DesignTokens.typography.fontSize['2xl'] * DesignTokens.typography.lineHeight.normal,
  },
  
  headingSM: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize.xl,
    fontWeight: DesignTokens.typography.fontWeight.medium,
    lineHeight: DesignTokens.typography.fontSize.xl * DesignTokens.typography.lineHeight.normal,
  },
  
  bodyLG: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize.lg,
    fontWeight: DesignTokens.typography.fontWeight.normal,
    lineHeight: DesignTokens.typography.fontSize.lg * DesignTokens.typography.lineHeight.relaxed,
  },
  
  bodyBase: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize.base,
    fontWeight: DesignTokens.typography.fontWeight.normal,
    lineHeight: DesignTokens.typography.fontSize.base * DesignTokens.typography.lineHeight.normal,
  },
  
  bodySM: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize.sm,
    fontWeight: DesignTokens.typography.fontWeight.normal,
    lineHeight: DesignTokens.typography.fontSize.sm * DesignTokens.typography.lineHeight.normal,
  },
  
  caption: {
    fontFamily: DesignTokens.typography.fontFamily.primary,
    fontSize: DesignTokens.typography.fontSize.xs,
    fontWeight: DesignTokens.typography.fontWeight.normal,
    lineHeight: DesignTokens.typography.fontSize.xs * DesignTokens.typography.lineHeight.normal,
  },
});
