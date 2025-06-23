import { Text, View } from 'react-native';
import MindzerButton from '@/components/shared/MindzerButton';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import Spinner from '@/components/shared/Spinner';
import Toast from 'react-native-toast-message';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore(state => state.user);
  return (
    <View className="flex-1 items-center justify-center">
      <Text className={`text-2xl font-bold text-blue-800 dark:text-slate-200 mb-10`}>Welcome , {user?.name || 'Guest'}</Text>

      <MindzerButton
        isTitleCentered
        variants="primary"
        className="mt-4"
        onPress={() => {
          Toast.show({
            type: 'info',
            text1: 'Redirecting to Login',
            text2: 'Please wait a moment...',
          });
          setIsLoading(!isLoading);
        }}>
        {isLoading && <Spinner />}
        <Text className={`font-medium  text-light`}>Go To Login</Text>
      </MindzerButton>
    </View>
  );
}
