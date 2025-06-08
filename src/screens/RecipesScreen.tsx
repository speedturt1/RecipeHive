
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * RecipesScreen - Recipe browsing with ads for free users
 * 
 * Navigation Logic:
 * → RecipeDetailScreen (recipe card tap)
 * → SearchScreen (search bar)
 * → AdvancedSearchScreen (premium only)
 * → CreateRecipeScreen (+ button)
 * → UpgradePromptScreen (advanced features for free users)
 * Show banner ads for free users
 * Interstitial ads between browsing sessions
 */
export default function RecipesScreen() {
  const handleRecipePress = (recipeId: string) => {
    // TODO: Navigate to RecipeDetailScreen with recipeId
    console.log('Navigate to RecipeDetailScreen with ID:', recipeId);
  };

  const handleSearch = () => {
    // TODO: Navigate to SearchScreen
    console.log('Navigate to SearchScreen');
  };

  const handleAdvancedSearch = () => {
    // TODO: Check tier and navigate to AdvancedSearchScreen or PaywallScreen
    console.log('Check tier for advanced search');
  };

  const handleCreateRecipe = () => {
    // TODO: Navigate to CreateRecipeScreen
    console.log('Navigate to CreateRecipeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeadingLG style={styles.title}>Recipes</HeadingLG>
        {/* TODO: Add search bar */}
        <View style={styles.headerButtons}>
          <Button title="Search" onPress={handleSearch} variant="secondary" size="sm" />
          <Button title="Advanced" onPress={handleAdvancedSearch} variant="premium" size="sm" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* TODO: Add banner ads for free users */}
        {/* TODO: Add recipe grid/list */}
        {/* TODO: Add interstitial ad logic */}
      </ScrollView>

      <View style={styles.fab}>
        <Button title="+" onPress={handleCreateRecipe} variant="primary" size="md" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignTokens.colors.neutral[50],
  },
  header: {
    padding: DesignTokens.semanticSpacing.md,
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  title: {
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: DesignTokens.semanticSpacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: DesignTokens.semanticSpacing.lg,
    right: DesignTokens.semanticSpacing.lg,
  },
});
