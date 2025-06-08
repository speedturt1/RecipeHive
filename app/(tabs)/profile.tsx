
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { Card } from '@/components/design-system/Card';
import { TierBadge } from '@/components/ui/TierBadge';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * ProfileScreen - User profile and settings
 * 
 * Navigation Logic:
 * → SettingsScreen (settings button)
 * → SubscriptionScreen (manage subscription)
 * → PaywallScreen (upgrade prompts)
 * Show user stats and tier information
 */
export default function ProfileScreen() {
  const handleSettings = () => {
    // TODO: Navigate to SettingsScreen
    console.log('Navigate to SettingsScreen');
  };

  const handleSubscription = () => {
    // TODO: Navigate to SubscriptionScreen
    console.log('Navigate to SubscriptionScreen');
  };

  const handleUpgrade = () => {
    // TODO: Navigate to PaywallScreen
    console.log('Navigate to PaywallScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar} />
            <View style={styles.profileInfo}>
              <HeadingLG style={styles.userName}>Demo User</HeadingLG>
              <TierBadge tier="free" />
            </View>
          </View>
          <BodyBase color={600}>Member since December 2024</BodyBase>
        </Card>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <HeadingLG style={styles.sectionTitle}>Your Recipe Stats</HeadingLG>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <HeadingLG style={styles.statNumber}>3</HeadingLG>
              <BodyBase color={600}>Saved Recipes</BodyBase>
            </View>
            <View style={styles.statItem}>
              <HeadingLG style={styles.statNumber}>1</HeadingLG>
              <BodyBase color={600}>Collections</BodyBase>
            </View>
            <View style={styles.statItem}>
              <HeadingLG style={styles.statNumber}>0</HeadingLG>
              <BodyBase color={600}>Shopping Lists</BodyBase>
            </View>
          </View>
        </Card>

        {/* Upgrade Prompt */}
        <Card style={styles.upgradeCard}>
          <HeadingLG style={styles.upgradeTitle}>Upgrade to Premium</HeadingLG>
          <BodyBase style={styles.upgradeText}>
            Unlock unlimited recipes, smart shopping lists, and exclusive features!
          </BodyBase>
          <Button
            title="Upgrade Now"
            onPress={handleUpgrade}
            variant="premium"
            size="lg"
            fullWidth
          />
        </Card>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Button
            title="Account Settings"
            onPress={handleSettings}
            variant="secondary"
            size="lg"
            fullWidth
            style={styles.settingsButton}
          />
          <Button
            title="Manage Subscription"
            onPress={handleSubscription}
            variant="secondary"
            size="lg"
            fullWidth
            style={styles.settingsButton}
          />
          <Button
            title="Sign Out"
            onPress={() => console.log('Sign out')}
            variant="secondary"
            size="lg"
            fullWidth
            style={styles.settingsButton}
          />
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
  profileCard: {
    padding: DesignTokens.semanticSpacing.lg,
    marginBottom: DesignTokens.semanticSpacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
    gap: DesignTokens.semanticSpacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: DesignTokens.colors.primary[200],
  },
  profileInfo: {
    flex: 1,
    gap: DesignTokens.semanticSpacing.xs,
  },
  userName: {
    color: DesignTokens.colors.neutral[900],
  },
  statsCard: {
    padding: DesignTokens.semanticSpacing.lg,
    marginBottom: DesignTokens.semanticSpacing.lg,
  },
  sectionTitle: {
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: DesignTokens.semanticSpacing.xs,
  },
  statNumber: {
    color: DesignTokens.colors.primary[600],
    fontSize: DesignTokens.typography.fontSize['2xl'],
  },
  upgradeCard: {
    padding: DesignTokens.semanticSpacing.xl,
    backgroundColor: DesignTokens.colors.premium.background,
    borderColor: DesignTokens.colors.premium.primary,
    borderWidth: 2,
    marginBottom: DesignTokens.semanticSpacing.xl,
    gap: DesignTokens.semanticSpacing.md,
  },
  upgradeTitle: {
    color: DesignTokens.colors.premium.primary,
  },
  upgradeText: {
    color: DesignTokens.colors.premium.primary,
  },
  settingsSection: {
    gap: DesignTokens.semanticSpacing.md,
  },
  settingsButton: {
    // Add any specific styling for settings buttons
  },
});
