import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomInput } from '@/components/shared/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack, useFocusEffect } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ContactCard } from '@/components/contactsPage/ContactCard';
import { contacts_lst } from '@/constants/contacts';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

const contactsSearch = () => {
  const [filterValue, setFilterValue] = useState('');
  // const debouncedValue = useDebounce(filterValue, 300); // Debounce the input value to avoid excessive filtering
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);

  const { colorScheme } = useColorScheme();
  useEffect(() => {
    if (filterValue.trim() === '') {
      setFilteredContacts([]);
      return;
    }
    const temp = contacts_lst.filter(item => {
      if (item.sFullName.toLowerCase().includes(filterValue.toLowerCase())) {
        return item;
      }
    });
    setFilteredContacts(temp);
  }, [filterValue]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     StatusBar.setBarStyle('dark-content');
  //     return () => {
  //       StatusBar.setBarStyle('light-content');
  //     };
  //   }, [colorScheme])
  // );

  // on Page show input focus
  const textInputRef = React.useRef<TextInput>(null);

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      textInputRef.current && textInputRef.current.focus();

      // Return function is invoked whenever the route gets out of focus.
      return () => {};
    }, [])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: colorScheme == 'dark' ? '#d1d5db' : '#2563eb',
          headerRight: () => (
            <Animated.View entering={FadeIn.duration(400)} className={`${Platform.OS == 'ios' ? 'w-full' : 'w-[95%]'}  flex-row gap-4 items-center`}>
              <TextInput
                ref={textInputRef}
                placeholder="Search"
                value={filterValue}
                onChangeText={value => setFilterValue(value)}
                clearButtonMode="while-editing"
                className={`bg-gray-100 pl-3 mb-2 dark:border dark:border-gray-500/65 dark:focus:border-blue-900  dark:bg-transparent px-2 rounded-lg   text-gray-900    dark:text-light  py-2 flex-1 `}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity className="mb-[5px]" activeOpacity={0.6} onPress={() => router.back()}>
                <Text className="text-white   dark:text-blue-400 text-[16px] ">Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          ),
        }}
      />
      <View className="flex-1">
        {/* <View className="bg-gray-100 mt-6 pb-4 px-4  flex-row justify-between gap-[14px] items-center   border-t-0 border-x-0 border-b dark:border-b-2 border-gray-300 dark:border-gray-900 ">
          <CustomInput
            ref={textInputRef}
            placeholder="Search"
            value={filterValue}
            containerClassName="py-[1px] pl-4 pr-2 flex-1"
            onChangeText={value => setFilterValue(value)}
            clearButtonMode="while-editing"
          />
          <Text onPress={() => router.back()} className="text-blue-600  dark:text-blue-400 text-[16px] ">
            Cancel
          </Text>
        </View> */}

        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={() => (
            <View className="px-6 mt-4 mb-2 h-5">
              {filterValue && <Text className={` text-gray-500 dark:text-gray-300 text-sm `}>Result ( {filteredContacts.length} )</Text>}
            </View>
          )}
          data={filteredContacts}
          renderItem={({ item }) => (
            <ContactCard
              sFullName={item.sFullName}
              sJobTitle={item.sJobTitle}
              sEmail={item.sEmail}
              onPress={() => {
                router.push(`/contacts/${item.iContactId}`);
              }}
              sPhoneBusiness={''}
              sActive={false}
              sAreaName={''}
            />
          )}
          keyExtractor={item => item.iContactId.toString()}
          estimatedItemSize={80}
        />
      </View>
    </>
  );
};

export default contactsSearch;
