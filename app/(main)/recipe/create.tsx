
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function CreateRecipeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create Recipe</ThemedText>
      <ThemedText>Recipe creation form with media upload will go here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
