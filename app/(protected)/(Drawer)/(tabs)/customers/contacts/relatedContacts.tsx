import SVGComponent from '@/assets/svg/SVGComponent';
import { ContactCard } from '@/components/contactsPage/ContactCard';
import { contacts_lst } from '@/constants/contacts';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const RelatedContacts = () => {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactsData, setContactsData] = useState(contacts_lst);
  /// Animating the comments delete
  const incrementalVlaue1 = useSharedValue(-30);
  const incrementalVlaue2 = useSharedValue(0);

  useEffect(() => {
    incrementalVlaue1.value = isEditingContact ? withTiming(15, { duration: 200 }) : withTiming(-30, { duration: 200 });
    incrementalVlaue2.value = isEditingContact ? withTiming(36, { duration: 200 }) : withTiming(0, { duration: 200 });
  }, [isEditingContact]);

  const animatedDeleteIcon = useAnimatedStyle(() => ({
    transform: [{ translateX: incrementalVlaue1.value }],
  }));
  const animatedContactCard = useAnimatedStyle(() => ({
    transform: [{ translateX: incrementalVlaue2.value }],
  }));

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  //

  const handleContactDelete = (contactID: number) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this Contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContactsData(prev => prev.filter(contact => contact.iContactId !== contactID));
            Toast.show({
              type: 'success',
              text1: 'Contact Deleted',
              text2: 'Contact Successfully Deleted.',
              position: 'top',
              visibilityTime: 2000,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddContact = () => {
    Alert.alert('Add Contact', 'How you like to add the contact ? ', [
      {
        text: 'Create Manually ',
        onPress: () => router.push('/(modals)/contacts/createContact'),
      },
      {
        text: 'Add from Contacts',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Ask me later pressed'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: '',
          headerRight: () => (
            <View className="flex-row items-center justify-end gap-6 w-28   ">
              <Text className="text-blue-400 text-lg h-full" onPress={() => setIsEditingContact(prev => !prev)}>
                {isEditingContact ? 'Done' : 'Edit'}
              </Text>
              <Text className="text-blue-400 text-lg h-full" onPress={handleAddContact}>
                Add
              </Text>
            </View>
          ),
        }}
      />
      <Text className="ml-5 text-sm text-gray-400 my-3 mt-4">Related Contacts ( {contactsData.length} )</Text>
      {contactsData.length > 0 && (
        <Animated.FlatList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={contactsData}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item, index }) => (
            <Animated.View className="flex-row items-center  relative ">
              <AnimatedTouchableOpacity
                disabled={!item.bEdit}
                style={animatedDeleteIcon}
                className={`absolute left-0 flex-row items-center h-full  z-30 ${item.bEdit ? 'opacity-100' : 'opacity-25'} `}
                onPress={() => handleContactDelete(item.iContactId)}>
                <Ionicons name="remove-circle-outline" size={22} color={item.bEdit ? '#db2727' : 'grey'} />
              </AnimatedTouchableOpacity>

              <Animated.View className="flex-1" style={animatedContactCard}>
                <ContactCard
                  onPress={() => {
                    router.push(`/customers/contacts/${item.iContactId}`);
                  }}
                  className={`${index == contacts_lst.length - 1 ? 'mb-6' : ''} `}
                  sFullName={item.sFullName}
                  sJobTitle={item.sJobTitle}
                  sEmail={item.sEmail}
                  sPhoneBusiness={item.sPhoneBusiness}
                  isSwipable={!isEditingContact}
                />
              </Animated.View>
            </Animated.View>
          )}
          keyExtractor={item => item.iContactId.toString()}
          // estimatedItemSize={80}
        />
      )}
      {contactsData.length == 0 && (
        <View className="flex-1 justify-center items-center p-8 gap-4">
          <SVGComponent />
          <Text className="text-md text-center mb-4 adaptive-text">No Related Contacts</Text>
        </View>
      )}
    </View>
  );
};

export default RelatedContacts;
