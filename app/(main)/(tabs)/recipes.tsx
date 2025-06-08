
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function RecipesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Browse Recipes</ThemedText>
      <ThemedText>Recipe browsing with search and filters will go here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
