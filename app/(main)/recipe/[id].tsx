
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Recipe Detail</ThemedText>
      <ThemedText>Recipe ID: {id}</ThemedText>
      <ThemedText>Full recipe view with media gallery will go here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
