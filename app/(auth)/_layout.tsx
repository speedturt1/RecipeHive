
import { Stack } from 'expo-router';
import { DesignTokens } from '@/constants/DesignTokens';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
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
        name="login" 
        options={{ 
          title: 'Sign In',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Create Account',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: 'Reset Password',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}
