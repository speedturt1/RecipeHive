
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * RecipeDetailScreen - Full recipe view with media gallery
 * 
 * Navigation Logic:
 * → EditRecipeScreen (edit button - if owner)
 * → GalleryScreen (image tap)
 * → VideoPlayerScreen (video tap)
 * → PaywallScreen (save attempt when limit reached - 10 saves max)
 * → PaywallScreen (social features, comments, user profiles)
 * → PaywallScreen (collections or shopping list access)
 * Save limit enforcement: 10 recipes max for free users
 * Social features require premium subscription
 */

interface RecipeDetailScreenProps {
  route: {
    params: {
      recipeId: string;
    };
  };
}

export default function RecipeDetailScreen({ route }: RecipeDetailScreenProps) {
  const { recipeId } = route.params;

  const handleSaveRecipe = () => {
    // TODO: Check save limit for free users, navigate to PaywallScreen if needed
    console.log('Check save limit and save recipe');
  };

  const handleEditRecipe = () => {
    // TODO: Navigate to EditRecipeScreen
    console.log('Navigate to EditRecipeScreen');
  };

  const handleAddToCollection = () => {
    // TODO: Check tier and navigate to Collections or PaywallScreen
    console.log('Check tier for collections');
  };

  const handleAddToShoppingList = () => {
    // TODO: Check tier and navigate to ShoppingList or PaywallScreen
    console.log('Check tier for shopping list');
  };

  const handleViewComments = () => {
    // TODO: Check tier and navigate to Comments or PaywallScreen
    console.log('Check tier for social features');
  };

  const handleImagePress = (imageUri: string) => {
    // TODO: Navigate to GalleryScreen
    console.log('Navigate to GalleryScreen');
  };

  const handleVideoPress = (videoUri: string) => {
    // TODO: Navigate to VideoPlayerScreen
    console.log('Navigate to VideoPlayerScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <HeadingLG style={styles.title}>Recipe Title</HeadingLG>
          
          {/* TODO: Add recipe images/videos */}
          {/* TODO: Add recipe details */}
          {/* TODO: Add ingredients list */}
          {/* TODO: Add instructions */}
          
          <View style={styles.actionButtons}>
            <Button
              title="Save Recipe"
              onPress={handleSaveRecipe}
              variant="primary"
              size="md"
              fullWidth
            />
            
            <View style={styles.buttonRow}>
              <Button
                title="Add to Collection"
                onPress={handleAddToCollection}
                variant="secondary"
                size="sm"
              />
              <Button
                title="Shopping List"
                onPress={handleAddToShoppingList}
                variant="secondary"
                size="sm"
              />
            </View>
            
            <Button
              title="View Comments"
              onPress={handleViewComments}
              variant="ghost"
              size="sm"
            />
            
            <Button
              title="Edit Recipe"
              onPress={handleEditRecipe}
              variant="outline"
              size="sm"
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
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  title: {
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  actionButtons: {
    gap: DesignTokens.semanticSpacing.md,
    marginTop: DesignTokens.semanticSpacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: DesignTokens.semanticSpacing.sm,
    justifyContent: 'space-between',
  },
});
