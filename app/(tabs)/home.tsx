import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme  } from '@react-navigation/native';

export default function App() {
   const { colors } = useTheme();
   
  return (
    <View style={styles.container}  >
      <Pressable style={{backgroundColor:'green' , width:120}} onPress={() => console.log('Hello')}>
        <Text style={{color: colors.text }}>Change</Text>
      </Pressable>
      <Text style={{ color: colors.text }}>HelloT </Text>
      <Link style={{ color: colors.text }} href="/login">Login Page</Link>
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
