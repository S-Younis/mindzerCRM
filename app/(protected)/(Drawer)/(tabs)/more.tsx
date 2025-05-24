import { ActionSheetIOS, Platform, SafeAreaView, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useColorScheme } from 'nativewind';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from '@/components/shared/MindzerButton';
import Ionicons from '@expo/vector-icons/Ionicons';

import BottomModalSheet from '@/components/morePage/BottomModalSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import { useRef } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';
import Toast from 'react-native-toast-message';

export default function App() {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  const bottomSheetRef = useRef<BottomSheet>(null);

  const logOut = useAuthStore((state) => state.logOut);

  const handleLogoutBTN = () => {

    // Use Native ActionSheet for ios only
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Logout'],
          title: 'Are you sure you want to log out?',
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
          userInterfaceStyle: 'dark',
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            router.replace('/login');
            logOut();
            Toast.show({
              type: 'success',
              text1: 'Successfully Logged Out',
              position: 'top',
              visibilityTime: 1500,
              swipeable: true,
            })

          }
        });
    } else {
      bottomSheetRef.current?.expand()

    }
  }


  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 mt-[60px] p-4 px-5">

        <View className="bg-[#303e5f]  px-6 py-5  border-[1px] border-[#515763] flex-row gap-4 rounded-xl ">
          <View className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <Text className=" font-bold text-xl ">YM</Text>
          </View>
          <View className="flex self-center gap-[2px]  ">
            <Text className=" text-black dark:text-white font-bold ">Younis Mohammeed </Text>
            <Text className=" text-black dark:text-white font-bold ">
              <Text className="dark:text-gray-200">Division ➡️</Text> Reda Chemicals
            </Text>
          </View>

          <View className="flex-1 items-end justify-center ">
            <Entypo name="chevron-small-right" size={32} color={colorScheme == 'dark' ? 'white' : 'black'} />
          </View>
        </View>

        <Text className="text-black dark:text-white text-sm  mt-4 mb-2 ml-2">General</Text>

        {/* General Options  */}
        <View className="flex gap-2  ">
          <View className="bg-[#303e5f] border-[#262f3a] p-6 py-4 border-2 flex-row justify-between gap-4  rounded-xl">
            <View className='flex-row items-center gap-2'>
              <MaterialCommunityIcons name="account-edit-outline" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
              <Text className="text-black dark:text-white ">Edit Profile</Text>
            </View>

            <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
          </View>
          <View className="bg-[#303e5f] border-[#262f3a] p-6 py-4 border-2 flex-row justify-between gap-4  rounded-xl">
            <View className='flex-row items-center gap-2'>
              <Ionicons name="color-palette-outline" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
              <Text className="text-black dark:text-white ">Dark Mode</Text>
            </View>
            <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
          </View>
        </View>

        <MindzerButton isTitleCentered variants='danger' onPress={handleLogoutBTN} className='mt-4'  >
          <View className='max-w-5 max-h-5 flex-row items-center mr-2'>
            <AntDesign name="logout" size={16} color={'white'} />
          </View>
          <Text className={`font-medium  text-white `}>
            Logout
          </Text>
        </MindzerButton>

      </View>

      {/* Logout Modal  */}
      <BottomModalSheet ref={bottomSheetRef} />

    </SafeAreaView >
  );
}
