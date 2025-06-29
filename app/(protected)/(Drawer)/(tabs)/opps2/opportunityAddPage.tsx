import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function opportunityAddPage() {
  return (
    <View style={styles.container}>
      <Text>Statrt ADding opp </Text>
      <Pressable onPress={() => router.back()}>
           <Text> {'<-- Go Back'} </Text>
      </Pressable>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
