
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DesignTokens } from '@/constants/DesignTokens';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Enhanced theme with design system colors
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: DesignTokens.colors.primary[500],
    background: DesignTokens.colors.neutral[0],
    card: DesignTokens.colors.neutral[0],
    text: DesignTokens.colors.neutral[900],
    border: DesignTokens.colors.neutral[200],
    notification: DesignTokens.colors.accent[500],
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: DesignTokens.colors.primary[400],
    background: DesignTokens.colors.neutral[900],
    card: DesignTokens.colors.neutral[800],
    text: DesignTokens.colors.neutral[100],
    border: DesignTokens.colors.neutral[700],
    notification: DesignTokens.colors.accent[400],
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
        <Stack screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? DesignTokens.colors.neutral[800] : DesignTokens.colors.neutral[0],
        },
        headerTintColor: colorScheme === 'dark' ? DesignTokens.colors.neutral[100] : DesignTokens.colors.neutral[900],
        headerTitleStyle: {
          fontWeight: DesignTokens.typography.fontWeight.semibold,
          fontSize: DesignTokens.typography.fontSize.lg,
        },
      }}>
        {/* Landing Screen - Entry Point */}
        {/* Default route - redirect to landing */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Landing Screen - Entry Point */}
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        
        {/* Authentication Group */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* Onboarding Group */}
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        
        {/* Main App Group - Protected Routes */}
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        
        <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
