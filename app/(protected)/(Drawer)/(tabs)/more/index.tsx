import { ActionSheetIOS, ActivityIndicator, Platform, SafeAreaView, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from '@/components/shared/MindzerButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomModalSheet from '@/components/morePage/BottomModalSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';
import Toast from 'react-native-toast-message';
import ListOption from '@/components/shared/ListOption';
import { ProfileHeaderCard } from '@/components/morePage/ProfileHeaderCard';
import { myDarkTheme, myLightTheme } from '@/configs/theme';

export default function App() {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  const bottomSheetRef = useRef<BottomSheet>(null);

  const logOut = useAuthStore(state => state.logOut);

  // Loading
  // const [showContent, setShowContent] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowContent(true);
  //   }, 300);
  // }, []);

  // if (!showContent) {
  //   return <View className="flex-1 justify-center items-center">
  //     <ActivityIndicator size="large" color={colorScheme == 'dark' ? myDarkTheme.colors.primary : myLightTheme.colors.primary} />
  //   </View>
  // }
  // End Loading

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
            });
          }
        }
      );
    } else {
      bottomSheetRef.current?.expand();
    }
  };

  return (
    <SafeAreaView className="flex-1 mb-6">
      <View className="px-5 flex-1 pt-5  ">
        <ProfileHeaderCard />

        <Text className="text-gray-400 text-xs  mt-4 mb-2 ml-2">General</Text>

        {/* General Options  */}
        <View className="flex">
          <ListOption title="Edit Profile" className="rounded-tr-lg rounded-tl-lg">
            <MaterialCommunityIcons name="account-edit-outline" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
          </ListOption>

          <ListOption title="Theme Preference" className="rounded-br-lg rounded-bl-lg" onPress={() => router.push('/more/themeSettings')}>
            <Ionicons name="color-palette-outline" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
          </ListOption>
        </View>
        {/* General Options  */}

        <MindzerButton isTitleCentered variants="danger" onPress={handleLogoutBTN} className="mt-auto">
          <View className="max-w-5 max-h-5 flex-row items-center mr-2">
            <AntDesign name="logout" size={16} color={'white'} />
          </View>
          <Text className={`font-medium  text-light `}>Logout</Text>
        </MindzerButton>
      </View>
      {/* Logout Modal  */}
      <BottomModalSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
}
