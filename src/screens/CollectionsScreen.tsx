
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * CollectionsScreen - Recipe collections management (Premium Only)
 * 
 * Navigation Logic:
 * → CollectionDetailScreen (collection tap)
 * → PaywallScreen (if accessed by free user)
 * Premium users only: unlimited collections
 * Free users: Immediate paywall redirect
 */
export default function CollectionsScreen() {
  const handleCreateCollection = () => {
    // TODO: Create new collection
    console.log('Create new collection');
  };

  const handleCollectionPress = (collectionId: string) => {
    // TODO: Navigate to CollectionDetailScreen
    console.log('Navigate to CollectionDetailScreen with ID:', collectionId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeadingLG style={styles.title}>My Collections</HeadingLG>
        <Button
          title="Create Collection"
          onPress={handleCreateCollection}
          variant="primary"
          size="sm"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* TODO: Add collections grid */}
          <BodyBase style={styles.placeholder}>
            Your recipe collections will appear here
          </BodyBase>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: DesignTokens.semanticSpacing.md,
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  title: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: DesignTokens.semanticSpacing.lg,
  },
  placeholder: {
    textAlign: 'center',
    color: DesignTokens.colors.neutral[500],
    marginTop: DesignTokens.semanticSpacing.xl,
  },
});
