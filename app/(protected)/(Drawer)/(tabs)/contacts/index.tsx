import { View, TouchableOpacity, Pressable, Text, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import BottomModalSheet from '@/components/contactsPage/BottomModalSheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { myLightTheme } from '@/configs/theme';
import { ContactCard } from '@/components/contactsPage/ContactCard';
import { FlashList } from '@shopify/flash-list';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { contacts_lst } from '@/constants/contacts';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import { router, Stack } from 'expo-router';
import SVGComponent from '@/assets/svg/SVGComponent';
import Animated, { FadeIn } from 'react-native-reanimated';
import { DrawerToggle } from '@/components/shared/DrawerToggle';
import SearchIconModalButton from '@/components/shared/SearchIconModalButton';
import { useContactTemplateStore } from '@/stores/contacts/contact.template.store';

export default function contacts() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const sortType = useContactTemplateStore(state => state.sortType);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  // Loading
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 400);
  }, []);

  if (!showContent) {
    return (
      <View className="flex-1 justify-center items-center text-gray-400">
        <ActivityIndicator size="large" color={colorScheme == 'dark' ? myDarkTheme.colors.primary : '#9ca3af'} />
      </View>
    );
  }
  // End Loading

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <DrawerToggle />,
          headerRight: () => (
            <View className="flex-row items-center gap-4">
              <TouchableOpacity className="focus:opacity-80" onPress={() => router.push('/(modals)/contacts/contactsTemplate')}>
                <MaterialCommunityIcons name="puzzle-edit-outline" size={23} color={'#fafafa'} />
              </TouchableOpacity>
              <SearchIconModalButton onPress={() => router.push('/contacts/contactsSearch')} />
            </View>
          ),
        }}
      />

      <Animated.View entering={FadeIn.duration(300)} className="flex-1  ">
        <View
          className={`h-14 flex-row items-center justify-between border border-t-0 border-x-0 bg-gray-50 dark:bg-[#020b1b]   border-gray-300 dark:border-gray-800  pl-6 pr-5    `}>
          <Text className="text-md  text-blue-900  font-medium  dark:text-light  ">Contacts ( {contacts_lst.length} ) </Text>
          <Pressable
            onPress={() => router.push('/(modals)/contacts/contactSortPage')}
            className={`flex-row items-center justify-center gap-[1px] p-1 px-2  bg-accent/50 border-accent dark:bg-[#161f2e] dark:border-gray-800 border-[1px]  rounded-full active:opacity-70  `}>
            <FontAwesome className=" mb-[5px] ml-1" name="sort-desc" size={14} color={colorScheme == 'light' ? '#1e3a8a' : '#fafafa'} />
            <Text className="text-sm text-blue-900 dark:text-light "> {sortType?.sortTitle ? ` Sort By : ${sortType.sortTitle}` : `Sort By Field`} </Text>
          </Pressable>
        </View>

        {contacts_lst.length > 0 && (
          <FlashList
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            data={contacts_lst}
            renderItem={({ item, index }) => (
              <ContactCard
                onPress={() => {
                  router.push(`/contacts/${item.iContactId}`);
                }}
                className={`${index == 0 ? 'mt-4' : index == contacts_lst.length - 1 ? 'mb-4' : ''} `}
                sFullName={item.sFullName}
                sJobTitle={item.sJobTitle}
                sEmail={item.sEmail}
                sActive={item.sActive}
                sAreaName={item.sAreaName}
                sPhoneBusiness={item.sPhoneBusiness}
              />
            )}
            keyExtractor={item => item.iContactId.toString()}
            estimatedItemSize={80}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}

        {contacts_lst.length == 0 && (
          <View className="flex-1 justify-center items-center p-8 gap-4">
            <SVGComponent />
            <Text className="text-md text-center mb-4 adaptive-text">No Contacts</Text>
          </View>
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          className="shadow-sm dark:shadow-md"
          style={{
            position: 'absolute',
            bottom: 20,
            right: 24,
            // backgroundColor: '#2563eb',
            backgroundColor: myLightTheme.colors.primary,
            width: 56,
            height: 56,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => bottomSheetRef.current?.expand()}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
        <BottomModalSheet ref={bottomSheetRef} />
      </Animated.View>
    </>
  );
}
