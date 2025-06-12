import { Text, View } from 'react-native';
import MindzerButton from '@/components/shared/MindzerButton';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import Spinner from '@/components/shared/Spinner';
import ShadCnBTN from '@/components/web-components/ShadCnBTN';


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);

  return <ShadCnBTN />
  // return  (
  //   <View className="flex-1 items-center justify-center">

  //     <Text className={`text-2xl font-bold text-blue-800 dark:text-slate-200 mb-10`}>
  //       Welcome ,  {user?.name || 'Guest'}
  //     </Text>

  //     <MindzerButton isTitleCentered variants='primary' className='mt-4' onPress={() => {
  //       setIsLoading(!isLoading);
  //     }} >
  //       {isLoading && <Spinner />}
  //       <Text className={`font-medium  text-light`}>
  //         Go To Login
  //       </Text>
  //     </MindzerButton>


  //   </View >
  // );
}
