import { View, Text, ScrollView, RefreshControl, Pressable, Platform, Linking, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
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
              <MaterialIcons name="mode-edit-outline" size={20} color="#f8f8f8" onPress={() => router.push(`/contacts/editContact/${iContactId}`)} />
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
        <View className=" bg-[#161f2e]  p-4 pb-2 px-6 pt-6 flex-row  gap-2  ">
          <View className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
            <Text>
              {sFirstName.charAt(0)}
              {sLastName.charAt(0)}
            </Text>
          </View>
          <View className="gap-1">
            <Text className="text-light text-xl font-bold pl-[2px] ">{USER?.sFullName}</Text>
            <View className="flex-row items-center gap-3  ">
              <Text className="text-blue-400 text-sm  "> {USER?.sEmail}</Text>
              <MaterialCommunityIcons name="content-copy" size={14} color="#f8f8f8" onPress={handleEamilOnClick} />
            </View>
            <View className="flex-row items-center gap-2  mt-2 mr-auto ">
              <View className="  bg-green-300 p-[4px] px-4  rounded-xl flex items-center justify-center">
                <Text>{USER?.sActive ? 'Active' : 'Inactive'}</Text>
              </View>
              <Text className="text-gray-600 mr-2 ">|</Text>
              <View className="flex-row gap-[12px]">
                <TouchableOpacity
                  onPress={() => handleContactActions('phone')}
                  className=" bg-gray-300 rounded-full w-[35px] h-[35px]   flex items-center justify-center">
                  {callActionIsLoading ? <ActivityIndicator size={'small'} className="text-black " /> : <Feather name="phone-call" size={16} color={'black'} />}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleContactActions('email')}
                  className=" bg-gray-300 rounded-full w-[35px] h-[35px]   flex items-center justify-center">
                  {emailActionIsLoading ? <ActivityIndicator size={'small'} className="text-black " /> : <Feather name="mail" size={16} color={'black'} />}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="py-4 bg-[#161f2e] border-[#262f3a] border-[1px] border-t-0 border-x-none ">
          <SegmentedControl
            style={{ width: '70%', marginHorizontal: 'auto', borderRadius: 8 }}
            values={['Details', 'Comments']}
            fontStyle={{ color: '#f8f8f8', fontSize: 12, fontWeight: '500' }}
            backgroundColor="#33343E"
            sliderStyle={{ backgroundColor: '#6A6B75' }}
            selectedIndex={selectedTabIndx}
            onChange={event => {
              setSelectedTabIndx(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>

        {selectedTabIndx === 0 && <DetialsTabView contactDetials={USER} lstAreas={lstAreas} />}

        {selectedTabIndx === 1 && (
          <View className="px-3  mb-6 ">
            <View className="flex-row items-center gap-[4px] mt-4 mb-[6px] ml-3">
              <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
              <Text className=" text-gray-400  text-xs  ">Comments</Text>
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
                className="bg-[#161f2e] min-h-20  text-light text-sm px-4 pb-[20px] pt-4 rounded-lg border border-gray-800 placeholder:text-gray-400"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ContactDetails;
