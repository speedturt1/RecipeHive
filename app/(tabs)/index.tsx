import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { TierBadge } from '@/components/ui/TierBadge';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * HomeScreen - Main dashboard with tier-appropriate features
 * 
 * Navigation Logic:
 * → RecipeDetailScreen (featured recipe cards)
 * → RecipesScreen (Browse All button)
 * → CreateRecipeScreen (Add Recipe button)
 * → PaywallScreen (premium feature attempt by free users)
 * Display trial countdown for trial users
 * Show tier-specific content and upgrade prompts
 */
export default function HomeScreen() {
  const handleBrowseRecipes = () => {
    // TODO: Navigate to RecipesScreen
    console.log('Navigate to RecipesScreen');
  };

  const handleCreateRecipe = () => {
    // TODO: Navigate to CreateRecipeScreen
    console.log('Navigate to CreateRecipeScreen');
  };

  const handlePremiumFeature = () => {
    // TODO: Check user tier and navigate to PaywallScreen if needed
    console.log('Check tier and possibly navigate to PaywallScreen');
  };

  const handleViewCollections = () => {
    // TODO: Navigate to CollectionsScreen
    console.log('Navigate to CollectionsScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <HeadingLG style={styles.welcomeTitle}>Welcome to RecipeHive</HeadingLG>
          <TierBadge tier="free" />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <HeadingLG style={styles.sectionTitle}>Quick Actions</HeadingLG>
          <View style={styles.actionGrid}>
            <Button
              title="Browse Recipes"
              onPress={handleBrowseRecipes}
              variant="primary"
              size="lg"
              fullWidth
            />
            <Button
              title="Create Recipe"
              onPress={handleCreateRecipe}
              variant="secondary"
              size="lg"
              fullWidth
            />
          </View>
        </View>

        {/* Featured Content */}
        <View style={styles.section}>
          <HeadingLG style={styles.sectionTitle}>Your Collections</HeadingLG>
          <Card style={styles.card}>
            <BodyBase>You have 3 saved recipes in 1 collection</BodyBase>
            <Button
              title="View Collections"
              onPress={handleViewCollections}
              variant="secondary"
              size="sm"
            />
          </Card>
        </View>

        {/* Premium Features Teaser */}
        <View style={styles.section}>
          <HeadingLG style={styles.sectionTitle}>Premium Features</HeadingLG>
          <Card style={styles.premiumCard}>
            <BodyBase style={styles.premiumText}>
              Unlock unlimited recipes, smart shopping lists, and more!
            </BodyBase>
            <Button
              title="Upgrade to Premium"
              onPress={handlePremiumFeature}
              variant="premium"
              size="sm"
            />
          </Card>
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
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  welcomeTitle: {
    color: DesignTokens.colors.primary[600],
  },
  section: {
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  sectionTitle: {
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  actionGrid: {
    gap: DesignTokens.semanticSpacing.md,
  },
  card: {
    padding: DesignTokens.semanticSpacing.lg,
    gap: DesignTokens.semanticSpacing.md,
  },
  premiumCard: {
    padding: DesignTokens.semanticSpacing.lg,
    gap: DesignTokens.semanticSpacing.md,
    borderColor: DesignTokens.colors.premium.primary,
    borderWidth: 2,
  },
  premiumText: {
    color: DesignTokens.colors.premium.primary,
  },
});