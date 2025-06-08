
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function SocialScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Social Feed</ThemedText>
      <ThemedText>Community features for premium users will go here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
