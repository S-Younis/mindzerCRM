import SVGComponent from '@/assets/svg/SVGComponent';
import { ContactCard } from '@/components/contactsPage/ContactCard';
import { contacts_lst } from '@/constants/contacts';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

const RelatedContacts = () => {
  return (
    <View className="flex-1">
      <Text>relatedContacts</Text>
      {contacts_lst.length > 0 && (
        <FlashList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={contacts_lst}
          renderItem={({ item, index }) => (
            <ContactCard
              onPress={() => {
                router.push(`/customers/contacts/${item.iContactId}`);
              }}
              className={`${
                index == 0
                  ? 'mt-4'
                  : index == contacts_lst.length - 1
                  ? 'mb-4'
                  : ''
              }`}
              sFullName={item.sFullName}
              sJobTitle={item.sJobTitle}
              sEmail={item.sEmail}
            />
          )}
          keyExtractor={item => item.iContactId.toString()}
          estimatedItemSize={80}
        />
      )}
      {contacts_lst.length == 0 && (
        <View className="flex-1 justify-center items-center p-8 gap-4">
          <SVGComponent />
          <Text className="text-md text-center mb-4 adaptive-text">
            No Contacts
          </Text>
        </View>
      )}
    </View>
  );
};

export default RelatedContacts;
