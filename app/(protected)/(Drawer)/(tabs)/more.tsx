import { ActionSheetIOS, Platform, Pressable, SafeAreaView, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useColorScheme } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from '@/components/shared/MindzerButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import BottomModalSheet from '@/components/morePage/BottomModalSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import { useRef } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';
import Toast from 'react-native-toast-message';
import ListOption from '@/components/shared/ListOption';

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
      <View className="flex-1 mt-4 p-4 px-5">

        <Pressable className="p-4 bg-[#161f2e] border-[#262f3a] border-[1px] flex-row gap-4 rounded-xl active:opacity-70 ">
          <View className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <Text className=" font-bold text-xl ">YM</Text>
          </View>
          <View className="flex self-center gap-[2px]  ">
            <Text className=" text-dark dark:text-light font-bold ">Younis Mohammeed </Text>
            <Text className=" text-blue-400 text-sm    ">
              younis.mohammed@mindzer.com
            </Text>
          </View>

          <View className="flex-1 items-end justify-center ">
            <Entypo name="chevron-small-right" size={32} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
          </View>
        </Pressable>

        <Text className="text-gray-400 text-xs  mt-4 mb-2 ml-2">General</Text>

        {/* General Options  */}
        <View className="flex">
          <ListOption title='Edit Profile' className='rounded-tr-lg rounded-tl-lg'  >
            <MaterialCommunityIcons name="account-edit-outline" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
          </ListOption>

          <ListOption title='Theme Preference' className='rounded-br-lg rounded-bl-lg' >
            <Ionicons name="color-palette-outline" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
          </ListOption>

        </View>
        {/* General Options  */}

        <MindzerButton isTitleCentered variants='danger' onPress={handleLogoutBTN} className='mt-6'  >
          <View className='max-w-5 max-h-5 flex-row items-center mr-2'>
            <AntDesign name="logout" size={16} color={'white'} />
          </View>
          <Text className={`font-medium  text-light `}>
            Logout
          </Text>
        </MindzerButton>

      </View>

      {/* Logout Modal  */}
      <BottomModalSheet ref={bottomSheetRef} />

    </SafeAreaView >
  );
}
