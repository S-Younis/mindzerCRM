import { View, Text, ScrollView, Platform, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Spinner from '@/components/shared/Spinner';
import { router, Stack } from 'expo-router';
// import { FlashList } from '@shopify/flash-list';
import { CustomInput } from '@/components/shared/CustomInput';
import SVGComponent from '@/assets/svg/SVGComponent';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContactStore } from '@/stores/contacts/contact.store';
const importContactPage = () => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  let [isLoading, setIsLoading] = useState(true);
  let [permissionStatus, setPermissionStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  let [contacts, setContacts] = useState<Contacts.Contact[]>([]);

  let [checkedContacts, setCheckedContacts] = useState<any[]>([]);

  // State Management
  const setImportContact_Obj = useContactStore(state => state.setImportContact_Obj);

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.ID,
              Contacts.Fields.FirstName,
              Contacts.Fields.LastName,
              Contacts.Fields.Emails,
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.Addresses,
              Contacts.Fields.JobTitle,
            ],
          });

          if (data.length > 0) {
            setContacts(data);
            // console.log("Contacts 1:", data);
          }
        } else {
          setPermissionStatus('denied');
        }
        setIsLoading(false);
      })();
    }, 300); // Simulate a delay to show the permission request after page is fully transitioned ( navigated )
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center mb-4 ">
        <View className="flex flex-col items-center justify-center gap-3">
          <Spinner size="lg" />
          <Text className="text-md text-center adaptive-text"> Loading Contacts</Text>
        </View>
      </View>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-lg text-center mb-4 adaptive-text">
          Contacts permission required to access this feature. Go to Settings and grant permission to access contacts.'
        </Text>
      </View>
    );
  }

  if (contacts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-8 gap-2">
        <SVGComponent />
        <Text className="text-lg text-center mb-4 adaptive-text">No contacts found in your device.</Text>
      </View>
    );
  }

  const handleCheckBox = (id: string | undefined) => {
    if (!id) return;
    if (checkedContacts.includes(id)) {
      setCheckedContacts([]);
    } else {
      setCheckedContacts([id]);
    }
  };

  const handleSelection = () => {
    console.log('Selected Contacts IDs:', checkedContacts);
    console.log('-------------');
    const selectedContact = contacts.find(contact => contact.id == checkedContacts[0]) || null;
    console.log('Selected Contacts:', selectedContact);
    selectedContact && setImportContact_Obj(selectedContact);
    router.push('/(modals)/contacts/createContact?importType=phone');
  };

  return (
    <>
      {/* Dynamic Stack Header  */}
      <Stack.Screen
        options={{
          title: 'Import Contacts',
          // headerStyle: { backgroundColor: '#161f2e' },
          headerLeft: () => {
            if (Platform.OS == 'ios') {
              return (
                <Text className=" text-xl text-blue-400" onPress={() => router.back()}>
                  Cancel
                </Text>
              );
            } else return null;
          },
          headerRight: () => {
            if (checkedContacts.length == 1)
              return (
                <Text className="text-blue-400 text-xl" onPress={handleSelection}>
                  Select
                </Text>
              );
            else null;
          },
        }}
      />
      <View className="flex-1">
        <View className="flex-1" style={{ paddingBottom: 10 }}>
          <View className="p-4  gap-3 bg-[#161f2e] h-[68px]">
            <CustomInput placeholder="Search" containerClassName="py-[1px]  pr-2 flex-1" clearButtonMode="while-editing">
              <MaterialCommunityIcons name="magnify" size={18} color={'#fafafa'} />
            </CustomInput>
          </View>
          <FlatList
            data={contacts}
            keyExtractor={item => item.id as string}
            renderItem={({ item, index }) => (
              <ListOptionCheckBox
                key={item.id}
                isChecked={checkedContacts.includes(item.id)}
                onPress={() => handleCheckBox(item.id)}
                title={` ${item.name || ''}`}
                className={`${index == contacts.length - 1 && 'rounded-br-lg rounded-bl-lg'}`}>
                <MaterialIcons name="account-circle" size={27} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
              </ListOptionCheckBox>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default importContactPage;
