
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeadingLG, BodyBase } from '@/components/design-system/Typography';
import { Button } from '@/components/design-system/Button';
import { DesignTokens } from '@/constants/DesignTokens';

/**
 * PermissionsScreen - Request camera, media, and notification permissions
 * 
 * Navigation Logic:
 * → HomeScreen (permissions granted/skipped)
 * ← TutorialScreen (Back button)
 */
export default function PermissionsScreen() {
  const handleGrantPermissions = () => {
    // TODO: Request permissions and navigate to HomeScreen
    console.log('Request permissions and navigate to HomeScreen');
  };

  const handleSkip = () => {
    // TODO: Navigate to HomeScreen without permissions
    console.log('Navigate to HomeScreen');
  };

  const handleBack = () => {
    // TODO: Navigate back to TutorialScreen
    console.log('Navigate back to TutorialScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HeadingLG style={styles.title}>Permissions</HeadingLG>
        <BodyBase style={styles.subtitle}>
          Allow access to camera and photos to capture and upload recipes
        </BodyBase>
        
        {/* TODO: Add permission explanation icons/content */}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Grant Permissions"
            onPress={handleGrantPermissions}
            variant="primary"
            size="lg"
            fullWidth
          />
          
          <Button
            title="Skip for Now"
            onPress={handleSkip}
            variant="secondary"
            size="md"
            fullWidth
          />
          
          <Button
            title="Back"
            onPress={handleBack}
            variant="ghost"
            size="sm"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignTokens.colors.neutral[0],
  },
  content: {
    flex: 1,
    padding: DesignTokens.semanticSpacing.lg,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: DesignTokens.semanticSpacing.xl,
    color: DesignTokens.colors.neutral[600],
  },
  buttonContainer: {
    width: '100%',
    gap: DesignTokens.semanticSpacing.md,
    alignItems: 'center',
  },
});
