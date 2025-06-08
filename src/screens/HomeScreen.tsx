
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Card } from '@/components/design-system/Card';
import { DesignTokens } from '@/constants/DesignTokens';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <HeadingLG style={styles.title}>Good Morning! 👋</HeadingLG>
          <BodyBase color={600}>Ready to cook something delicious?</BodyBase>
        </View>

        <View style={styles.content}>
          <Card style={styles.placeholder}>
            <BodyBase style={styles.placeholderText}>
              Home screen content will be implemented next
            </BodyBase>
            <BodyBase color={500} style={styles.placeholderSubtext}>
              • Featured recipes
              • Quick actions
              • Recent activity
              • Trial status
            </BodyBase>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: DesignTokens.semanticSpacing.md,
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  title: {
    marginBottom: DesignTokens.semanticSpacing.sm,
  },
  content: {
    padding: DesignTokens.semanticSpacing.md,
  },
  placeholder: {
    padding: DesignTokens.semanticSpacing.xl,
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
    fontWeight: '600',
  },
  placeholderSubtext: {
    textAlign: 'center',
    lineHeight: DesignTokens.typography.fontSize.base * 1.5,
  },
});
