import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { Button } from '@tamagui/button';
import MindzerButton from '@/components/MindzerButton';

export default function App() {
  // const { colors } = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center">
      <Button themeInverse={false} theme={'blue_active'} size="$5" width="$14">
        Click
      </Button>

      <MindzerButton title='Change Theme'  onPress={() => toggleColorScheme()} />

      <Text className="bg-red-200 dark:bg-blue-300">Branch 3 </Text>
      <Link className="text-black dark:text-white" href="/login">
        Login Page
      </Link>
    </View>
  );
}
