
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <HeadingLG style={styles.title}>Welcome to RecipeHive</HeadingLG>
          
          {/* TODO: Add trial countdown for trial users */}
          {/* TODO: Add featured recipe cards */}
          {/* TODO: Add tier-specific content */}
          
          <View style={styles.buttonContainer}>
            <Button
              title="Browse Recipes"
              onPress={handleBrowseRecipes}
              variant="primary"
              size="lg"
              fullWidth
            />
            
            <Button
              title="Add Recipe"
              onPress={handleCreateRecipe}
              variant="secondary"
              size="lg"
              fullWidth
            />
            
            <Button
              title="Premium Feature"
              onPress={handlePremiumFeature}
              variant="premium"
              size="md"
              fullWidth
            />
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
  },
  buttonContainer: {
    gap: DesignTokens.semanticSpacing.md,
    marginTop: DesignTokens.semanticSpacing.xl,
  },
});
