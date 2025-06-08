import { Stack } from 'expo-router';
import { DesignTokens } from '@/constants/DesignTokens';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function OnboardingLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? DesignTokens.colors.neutral[800] : DesignTokens.colors.neutral[0],
        },
        headerTintColor: colorScheme === 'dark' ? DesignTokens.colors.neutral[100] : DesignTokens.colors.neutral[900],
        headerTitleStyle: {
          fontWeight: DesignTokens.typography.fontWeight.semibold,
          fontSize: DesignTokens.typography.fontSize.lg,
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="welcome" 
        options={{ 
          title: 'Welcome',
          headerShown: false 
        }} 
      />
    </Stack>
  );
}