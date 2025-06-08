
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DesignTokens } from '@/constants/DesignTokens';

export default function RecipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <Text style={styles.subtitle}>Browse and manage your recipes</Text>
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
  title: {
    fontSize: DesignTokens.typography.fontSize['2xl'],
    fontWeight: DesignTokens.typography.fontWeight.bold,
    color: DesignTokens.colors.neutral[900],
    marginBottom: DesignTokens.spacing[2],
  },
  subtitle: {
    fontSize: DesignTokens.typography.fontSize.base,
    color: DesignTokens.colors.neutral[600],
    textAlign: 'center',
  },
});
