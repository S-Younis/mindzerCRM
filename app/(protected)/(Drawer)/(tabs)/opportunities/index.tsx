import { Link } from 'expo-router';
import {  Text, View } from 'react-native';

export default function opportunities() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Opps </Text>
      <Link href={'/(tabs)/opportunities/opportunityAddPage'}>Create Opp </Link>
    </View>
  );
}

