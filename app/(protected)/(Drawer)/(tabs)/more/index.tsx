import { ActionSheetIOS, Platform, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from '@/components/shared/MindzerButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomModalSheet from '@/components/morePage/BottomModalSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import { useRef } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';
import Toast from 'react-native-toast-message';
import ListOption from '@/components/shared/ListOption';
import { ProfileHeaderCard } from '@/components/morePage/ProfileHeaderCard';
// import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function App() {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  const bottomSheetRef = useRef<BottomSheet>(null);

  // get safe area insets for padding
  const { bottom, top } = useSafeAreaInsets();

  const logOut = useAuthStore(state => state.logOut);

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
    <View className="flex-1" style={{ paddingBottom: bottom - 10, paddingTop: top + 4 }}>
      <View className="px-5 flex-1 pt-5  ">
        <ProfileHeaderCard />

        <Text className="text-gray-400 text-xs  mt-4 mb-2 ml-2">General</Text>

        {/* General Options  */}
        <View className="flex">
          <ListOption title="Edit Profile" className="rounded-tr-lg rounded-tl-lg">
            <MaterialCommunityIcons name="account-edit-outline" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
          </ListOption>

          <ListOption title="Theme Preference" className="rounded-br-lg rounded-bl-lg !border-b-0  " onPress={() => router.push('/more/themeSettings')}>
            <Ionicons name="color-palette-outline" size={20} color={colorScheme == 'dark' ? 'white' : 'black'} />
          </ListOption>
        </View>
        {/* General Options  */}

        <Animated.View entering={FadeIn} className="mt-auto">
          <MindzerButton isTitleCentered variants="danger" onPress={handleLogoutBTN}>
            <View className="max-w-5 max-h-5 flex-row items-center mr-2">
              <AntDesign name="logout" size={16} color={'white'} />
            </View>
            <Text className={`font-medium  text-light `}>Logout</Text>
          </MindzerButton>
        </Animated.View>
      </View>
      {/* Logout Modal  */}
      <BottomModalSheet ref={bottomSheetRef} />
    </View>
  );
}
