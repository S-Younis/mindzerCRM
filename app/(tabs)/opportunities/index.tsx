import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function opportunities() {
  return (
    <View style={styles.container}>
      <Text>Opps </Text>
      <Link href={'/(tabs)/opportunities/opportunityAddPage'}>Create Opp </Link>
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
