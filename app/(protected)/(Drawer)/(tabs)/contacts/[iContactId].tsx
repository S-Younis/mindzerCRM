import { View, Text, ScrollView, RefreshControl, Platform, Linking, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { contacts_lst } from '@/constants/contacts';
import { lst_customers_areas as lstAreas } from '@/constants/customers';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useColorScheme } from 'nativewind';
import DetialsTabView from '@/components/contactsPage/DetialsTabView';
import Feather from '@expo/vector-icons/Feather';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';

const ContactDetails = () => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const { iContactId } = useLocalSearchParams();
  const USER = contacts_lst.find(contact => contact.iContactId === parseInt(iContactId as string));

  const [refreshing, setRefreshing] = useState(false);
  const [selectedTabIndx, setSelectedTabIndx] = useState(0);

  const [callActionIsLoading, setCallActionIsLoading] = useState(false);
  const [emailActionIsLoading, setEmailActionIsLoading] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const handleContactActions = async (type: 'email' | 'phone') => {
    if (type === 'email') {
      setEmailActionIsLoading(true);
      await Linking.openURL(`mailto:${USER?.sEmail}`);
      setEmailActionIsLoading(false);
    } else if (type === 'phone') {
      setCallActionIsLoading(true);
      if (Platform.OS === 'android') {
        await Linking.openURL(`tel:${USER?.sPhoneBusiness}`);
        setCallActionIsLoading(false);
        return;
      }
      await Linking.openURL(`telprompt:${USER?.sPhoneBusiness}`);
      setCallActionIsLoading(false);
    }
  };
  const handleEamilOnClick = async () => {
    await Clipboard.setStringAsync(USER?.sEmail || '');
    Toast.show({
      type: 'info',
      text1: 'Email Copied',
      text2: USER?.sEmail || '',
      position: 'top',
      visibilityTime: 2000,
    });
    // Linking.openURL(`mailto:${USER?.sEmail}`);
  };

  const sFullNameArr = USER?.sFullName.split(' ') as string[];
  const sFirstName = sFullNameArr[0];
  const sLastName = sFullNameArr.length > 1 ? sFullNameArr[sFullNameArr.length - 1] : '';

  return (
    <>
      {/* Dynamic Stack Header  */}
      {USER?.bEdit && (
        <Stack.Screen
          options={{
            headerRight: () => (
              <TouchableOpacity activeOpacity={0.6} onPress={() => router.push(`/(modals)/contacts/editContact/${iContactId}`)}>
                <MaterialIcons name="mode-edit-outline" size={20} color="#f8f8f8" />
              </TouchableOpacity>
            ),
          }}
        />
      )}
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        className="h-full ">
        <View className=" bg-[#f9fafb] dark:bg-[#161f2e]  p-4 pb-2 px-6 pt-6 flex-row  gap-2  ">
          <View className="bg-accent/75  dark:bg-gray-300 rounded-full h-12 w-12 flex items-center justify-center">
            <Text className="text-blue-900 dark:text-dark">
              {sFirstName.charAt(0)}
              {sLastName.charAt(0)}
            </Text>
          </View>
          <View className="gap-1">
            <Text className="text-blue-900 dark:text-light text-xl font-bold pl-[2px] ">{USER?.sFullName}</Text>
            <View className="flex-row items-center gap-3  ">
              <Text className=" text-blue-600 dark:text-blue-400 text-sm  "> {USER?.sEmail}</Text>
              <MaterialCommunityIcons name="content-copy" size={14} color={colorScheme == 'dark' ? '#f8f8f8' : '#9ca3af'} onPress={handleEamilOnClick} />
            </View>
            <View className="flex-row items-center gap-2  mt-2 mr-auto ">
              <View className="  bg-green-500 p-[4px] px-4  rounded-xl flex items-center justify-center">
                <Text className="text-light">{USER?.sActive ? 'Active' : 'Inactive'}</Text>
              </View>
              <Text className="text-gray-600 mr-2 ">|</Text>
              <View className="flex-row gap-[12px]">
                <TouchableOpacity
                  onPress={() => handleContactActions('phone')}
                  className=" bg-accent/40 dark:bg-gray-700  rounded-full w-[35px] h-[35px]   flex items-center justify-center">
                  {callActionIsLoading ? (
                    <ActivityIndicator size={'small'} className="text-blue-600 dark:text-white " />
                  ) : (
                    <Feather name="phone-call" size={16} color={'#16a34a'} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleContactActions('email')}
                  className=" bg-accent/40 dark:bg-gray-700 rounded-full w-[35px] h-[35px]   flex items-center justify-center">
                  {emailActionIsLoading ? (
                    <ActivityIndicator size={'small'} className=" text-blue-600 dark:text-white " />
                  ) : (
                    <Feather name="mail" size={16} color={'#ca8a04'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-[#f9fafb] py-4  dark:bg-[#161f2e]  border  border-t-0 border-x-none border-gray-300/55  dark:border-[#262f3a] ">
          <SegmentedControl
            style={{ width: '70%', marginHorizontal: 'auto', borderRadius: 8 }}
            values={['Details', 'Comments']}
            // backgroundColor="#33343E"
            // sliderStyle={{ backgroundColor: '#6A6B75' }}
            fontStyle={{ color: colorScheme == 'light' ? '#252525' : '#f8f8f8', fontSize: 12, fontWeight: '500' }}
            backgroundColor={colorScheme == 'dark' ? '#33343E' : '#f9fafb'}
            sliderStyle={{ backgroundColor: colorScheme == 'dark' ? '#6A6B75' : '#fefefe' }}
            selectedIndex={selectedTabIndx}
            onChange={event => {
              setSelectedTabIndx(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>

        {selectedTabIndx === 0 && <DetialsTabView contactDetials={USER} lstAreas={lstAreas} />}

        {selectedTabIndx === 1 && (
          <View className="px-4  mb-6 ">
            <View className="flex-row items-center gap-[4px] mt-4 mb-[6px] ml-3">
              {/* <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
              <Text className=" text-gray-500 dark:text-gray-400  text-sm  ">Comments</Text>
            </View>
            <View className=" flex items-center justify-center ">
              <TextInput
                // onChangeText={onChange}
                // onBlur={onBlur}
                value={USER?.sComment || ''}
                placeholder="Add a comment..."
                readOnly={true}
                multiline
                numberOfLines={4}
                className="bg-white dark:bg-[#161f2e] min-h-20   text-dark dark:text-light text-sm px-4 pb-[20px] pt-4 rounded-lg border border-gray-200/90 dark:border-gray-800 placeholder:text-gray-400"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ContactDetails;
