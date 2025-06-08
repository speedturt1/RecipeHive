import { Stack } from 'expo-router';
import { DesignTokens } from '@/constants/DesignTokens';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function MainLayout() {
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
        name="(tabs)" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="recipe/[id]" 
        options={{ 
          title: 'Recipe Details',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="recipe/create" 
        options={{ 
          title: 'Create Recipe',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}