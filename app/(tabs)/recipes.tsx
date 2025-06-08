
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * RecipesScreen - Browse and search recipes
 * 
 * Navigation Logic:
 * → RecipeDetailScreen (recipe tap)
 * → SearchScreen (search button)
 * → PaywallScreen (premium features for free users)
 * Display free tier limitations and upgrade prompts
 */
export default function RecipesScreen() {
  const handleRecipePress = () => {
    // TODO: Navigate to RecipeDetailScreen
    console.log('Navigate to RecipeDetailScreen');
  };

  const handleSearch = () => {
    // TODO: Navigate to SearchScreen
    console.log('Navigate to SearchScreen');
  };

  const handleCreateRecipe = () => {
    // TODO: Navigate to CreateRecipeScreen
    console.log('Navigate to CreateRecipeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <HeadingLG style={styles.title}>Browse Recipes</HeadingLG>
          <Button
            title="Search"
            onPress={handleSearch}
            variant="secondary"
            size="sm"
          />
        </View>

        {/* Create Recipe Button */}
        <Button
          title="+ Create New Recipe"
          onPress={handleCreateRecipe}
          variant="primary"
          size="lg"
          fullWidth
          style={styles.createButton}
        />

        {/* Recipe Grid */}
        <View style={styles.recipeGrid}>
          {/* Mock Recipe Cards */}
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Card key={id} style={styles.recipeCard} onPress={handleRecipePress}>
              <View style={styles.recipeImagePlaceholder} />
              <HeadingLG style={styles.recipeTitle}>Sample Recipe {id}</HeadingLG>
              <BodyBase color={600}>Quick and easy recipe description</BodyBase>
            </Card>
          ))}
        </View>

        {/* Free Tier Limitation */}
        <Card style={styles.limitationCard}>
          <BodyBase style={styles.limitationText}>
            You can save up to 10 recipes on the free plan. Upgrade to Premium for unlimited recipes!
          </BodyBase>
          <Button
            title="Upgrade to Premium"
            onPress={() => console.log('Navigate to PaywallScreen')}
            variant="premium"
            size="sm"
          />
        </Card>
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
  createButton: {
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  recipeGrid: {
    gap: DesignTokens.semanticSpacing.md,
  },
  recipeCard: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  recipeImagePlaceholder: {
    height: 120,
    backgroundColor: DesignTokens.colors.neutral[200],
    borderRadius: DesignTokens.borderRadius.md,
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  recipeTitle: {
    marginBottom: DesignTokens.semanticSpacing.xs,
  },
  limitationCard: {
    marginTop: DesignTokens.semanticSpacing.xl,
    padding: DesignTokens.semanticSpacing.lg,
    backgroundColor: DesignTokens.colors.warning[50],
    borderColor: DesignTokens.colors.warning[200],
    borderWidth: 1,
    gap: DesignTokens.semanticSpacing.md,
  },
  limitationText: {
    color: DesignTokens.colors.warning[800],
  },
});
