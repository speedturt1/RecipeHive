
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DesignTokens } from '@/constants/DesignTokens';
import { TierBadge } from '@/components/ui/TierBadge';

export default function SocialScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
        <TierBadge tier="premium" size="sm" />
      </View>
      <Text style={styles.subtitle}>Connect and share with the community</Text>
      <Text style={styles.note}>Premium feature - upgrade to access</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DesignTokens.colors.neutral[0],
    padding: DesignTokens.spacing[4],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DesignTokens.spacing[2],
    marginBottom: DesignTokens.spacing[2],
  },
  title: {
    fontSize: DesignTokens.typography.fontSize['2xl'],
    fontWeight: DesignTokens.typography.fontWeight.bold,
    color: DesignTokens.colors.neutral[900],
  },
  subtitle: {
    fontSize: DesignTokens.typography.fontSize.base,
    color: DesignTokens.colors.neutral[600],
    textAlign: 'center',
    marginBottom: DesignTokens.spacing[2],
  },
  note: {
    fontSize: DesignTokens.typography.fontSize.sm,
    color: DesignTokens.colors.primary[600],
    fontStyle: 'italic',
  },
});
