import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ContactCard } from '@/components/contactsPage/ContactCard';

const contactsTemplate = () => {
  return (
    <View className="flex-1 ">
      <View className=" mt-8  mx-4 flex flex-row items-center justify-centers gap-3">
        <Pressable
          onPress={() => router.push('/(modals)/contacts/contactSortPage')}
          className={`flex-row items-center justify-center gap-[2px] p-4 px-6 bg-[#161f2e] border-gray-800 border-[1px]  rounded-lg active:opacity-70  `}>
          <Text className=" adaptive-text "> Email </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/(modals)/contacts/contactSortPage')}
          className={`flex-row items-center justify-center gap-[2px] p-4 px-6 bg-[#161f2e] border-gray-800 border-[1px]  rounded-lg active:opacity-70  `}>
          <Text className=" adaptive-text "> Job Title </Text>
        </Pressable>
      </View>
      <View className="mt-10 mx-4">
        <ContactCard sFullName={'John Smith'} sJobTitle="Sales Person" sEmail={'johnExmaple@email.com'} sPhoneBusiness={'+973 39182726'} />
      </View>
    </View>
  );
};

export default contactsTemplate;
