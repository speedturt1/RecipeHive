
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * CollectionsScreen - Manage recipe collections (Premium Only)
 * 
 * Navigation Logic:
 * → PaywallScreen (if accessed by free user)
 * → CollectionDetailScreen (collection tap)
 * → CreateCollectionScreen (create button)
 * Show tier-based access control
 */
export default function CollectionsScreen() {
  const handleCreateCollection = () => {
    // TODO: Check user tier and navigate appropriately
    console.log('Check tier - navigate to PaywallScreen or CreateCollectionScreen');
  };

  const handleCollectionPress = () => {
    // TODO: Navigate to CollectionDetailScreen
    console.log('Navigate to CollectionDetailScreen');
  };

  const handleUpgrade = () => {
    // TODO: Navigate to PaywallScreen
    console.log('Navigate to PaywallScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <HeadingLG style={styles.title}>My Collections</HeadingLG>
          <Button
            title="+ New"
            onPress={handleCreateCollection}
            variant="primary"
            size="sm"
          />
        </View>

        {/* Premium Feature Notice */}
        <Card style={styles.premiumNotice}>
          <HeadingLG style={styles.premiumTitle}>Premium Feature</HeadingLG>
          <BodyBase style={styles.premiumText}>
            Recipe collections are available with Premium. Organize your recipes into custom collections like "Weeknight Dinners" or "Holiday Favorites".
          </BodyBase>
          <Button
            title="Upgrade to Premium"
            onPress={handleUpgrade}
            variant="premium"
            size="lg"
            fullWidth
          />
        </Card>

        {/* Mock Collections (Premium Preview) */}
        <View style={styles.collectionsGrid}>
          <HeadingLG style={styles.sectionTitle}>Preview Collections</HeadingLG>
          
          {['Weeknight Dinners', 'Holiday Favorites', 'Quick Breakfasts'].map((name, index) => (
            <Card key={index} style={styles.collectionCard} onPress={handleCollectionPress}>
              <View style={styles.collectionHeader}>
                <HeadingLG style={styles.collectionName}>{name}</HeadingLG>
                <BodyBase color={600}>{Math.floor(Math.random() * 15) + 1} recipes</BodyBase>
              </View>
              <View style={styles.recipePreview}>
                <View style={styles.previewImage} />
                <View style={styles.previewImage} />
                <View style={styles.previewImage} />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignTokens.colors.neutral[50],
  },
  scrollContent: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignTokens.semanticSpacing.lg,
  },
  title: {
    color: DesignTokens.colors.neutral[900],
  },
  premiumNotice: {
    padding: DesignTokens.semanticSpacing.xl,
    backgroundColor: DesignTokens.colors.premium.background,
    borderColor: DesignTokens.colors.premium.primary,
    borderWidth: 2,
    marginBottom: DesignTokens.semanticSpacing.xl,
    gap: DesignTokens.semanticSpacing.md,
  },
  premiumTitle: {
    color: DesignTokens.colors.premium.primary,
  },
  premiumText: {
    color: DesignTokens.colors.premium.primary,
  },
  collectionsGrid: {
    gap: DesignTokens.semanticSpacing.md,
  },
  sectionTitle: {
    marginBottom: DesignTokens.semanticSpacing.md,
    color: DesignTokens.colors.neutral[600],
  },
  collectionCard: {
    padding: DesignTokens.semanticSpacing.lg,
    opacity: 0.6, // Disabled appearance for free users
  },
  collectionHeader: {
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  collectionName: {
    marginBottom: DesignTokens.semanticSpacing.xs,
  },
  recipePreview: {
    flexDirection: 'row',
    gap: DesignTokens.spacing[2],
  },
  previewImage: {
    width: 40,
    height: 40,
    backgroundColor: DesignTokens.colors.neutral[300],
    borderRadius: DesignTokens.borderRadius.sm,
  },
});
