
import { Stack } from 'expo-router';
import { DesignTokens } from '@/constants/DesignTokens';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function OnboardingLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent back gestures during onboarding
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="tutorial" />
      <Stack.Screen name="permissions" />
    </Stack>
  );
}
