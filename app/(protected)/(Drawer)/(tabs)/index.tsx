import { Text, View } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import MindzerButton from '@/components/shared/MindzerButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { Flow } from 'react-native-animated-spinkit';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const user = useAuthStore((state) => state.user);
  return (
    <View className="flex-1 items-center justify-center">

      <Text className={`text-2xl font-bold text-green-500 mb-10`}>
        Welcome {user?.name || 'Guest'}
      </Text>
      <MindzerButton isTitleCentered variants='primary' onPress={() => {
        toggleColorScheme();
        Toast.show({
          type: 'info',
          text1: 'Switched to Dark Mode',
          position: 'bottom',
          visibilityTime: 1500,
          swipeable: true,
        })
      }} >
        <View className='max-w-5 max-h-5 flex-row items-center mr-2'>
          <Ionicons name="color-palette-outline" size={19} color={colorScheme == 'dark' ? 'black' : 'white'} />
        </View>
        <Text className={`font-medium  adaptive-text`}>
          Change Theme
        </Text>
      </MindzerButton>

      <MindzerButton isTitleCentered variants='primary' className='mt-4' onPress={() => {
        // push('/login')
        setIsLoading(!isLoading);
      }} >
        {isLoading && <Flow size={18} className='mr-3  my-auto ' color={colorScheme == 'dark' ? 'black' : 'white'}></Flow>}
        <Text className={`font-medium  adaptive-text`}>
          Go To Login
        </Text>
      </MindzerButton>




    </View >
  );
}
