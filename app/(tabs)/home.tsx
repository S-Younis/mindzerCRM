import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

export default function App() {
  // const { colors } = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={styles.container}>
      <Pressable style={{ backgroundColor: 'green', width: 120 }} onPress={() => toggleColorScheme()}>
        <Text >Changes</Text>
      </Pressable>
      <Text className="bg-red-200 dark:bg-blue-300">Branch 3 </Text>
      <Link className='text-black dark:text-white' href="/login">
        Login Page
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
