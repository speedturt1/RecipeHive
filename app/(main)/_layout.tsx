
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function MainLayout() {
  // TODO: Add authentication check here
  // const { user, isLoading } = useAuth();
  
  useEffect(() => {
    // Placeholder for auth check - redirect to login if not authenticated
    // if (!isLoading && !user) {
    //   router.replace('/login');
    // }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="recipe" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}
