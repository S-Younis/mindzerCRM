import { View, TouchableOpacity, Pressable, Text, RefreshControl, ActivityIndicator } from 'react-native';
import BottomModalSheet from '@/components/contactsPage/BottomModalSheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { myLightTheme } from '@/configs/theme';
import { ContactCard } from '@/components/contactsPage/ContactCard';
import { FlashList } from '@shopify/flash-list';
import { FontAwesome } from '@expo/vector-icons';
import { contacts_lst } from '@/constants/contacts';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import { router } from 'expo-router';
import { useContactStore } from '@/stores/contact.store';
import SVGComponent from '@/assets/svg/SVGComponent';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

export default function contacts() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const AnimatedComponent = Animated.createAnimatedComponent(FlashList);
  const sortByTitle = useContactStore(state => state.sortByTitle);

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
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colorScheme == 'dark' ? myDarkTheme.colors.primary : myLightTheme.colors.primary} />
      </View>
    );
  }
  // End Loading

  return (
    <Animated.View entering={FadeIn.duration(200)} className="flex-1 ">
      <View
        className={`h-14 flex-row items-center justify-between border-[1px] border-t-0 border-x-0 border-gray-800  pl-6 pr-5   ${
          colorScheme == 'dark' ? myDarkTheme.colors.card : '#fafafa'
        } border`}>
        <Text className="text-md text-light  ">Contacts ( {contacts_lst.length} ) </Text>
        <Pressable
          onPress={() => router.push('/contacts/contactSortPage')}
          className={`flex-row items-center justify-center gap-[2px] p-1 px-2 bg-[#161f2e] border-gray-800 border-[1px]  rounded-full active:opacity-70  `}>
          <FontAwesome className=" mb-1 ml-1" name="sort-desc" size={14} color="#fafafa" />
          <Text className="text-sm adaptive-text "> {sortByTitle == 'None' ? `Sort By Field` : ` Sort By : ${sortByTitle}`} </Text>
        </Pressable>
      </View>
      {contacts_lst.length > 0 && (
        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={contacts_lst}
          renderItem={({ item, index }) => (
            <ContactCard
              onPress={() => {
                router.push(`/contacts/${item.iContactId}`);
              }}
              className={`${index == 0 ? 'mt-4' : index == contacts_lst.length - 1 ? 'mb-4' : ''}`}
              sFullName={item.sFullName}
              sJobTitle={item.sJobTitle}
              sEmail={item.sEmail}
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
        className="shadow-md"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 24,
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
  );
}
