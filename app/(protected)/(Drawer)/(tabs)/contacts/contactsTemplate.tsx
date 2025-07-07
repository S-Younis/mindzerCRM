import { View, Text, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
import { ContactCard } from '@/components/contactsPage/ContactCard';
import toast from 'react-native-toast-message';
import { useContactTemplateStore } from '@/stores/contacts/contact.template.store';
// import { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const contactsTemplate = () => {
  const templateFactors = useContactTemplateStore(state => state.templateFactors);
  const setTemplateFactors = useContactTemplateStore(state => state.setTemplateFactors);

  const selectedFactorsCount = templateFactors.filter(factor => factor.isSelected).length;

  // useEffect(() => {
  //   const x = async () => {
  //     await AsyncStorage.removeItem('contact-template-store');
  //   };
  //   x();
  // }, []);

  const handleFactorPress = (id: number) => {
    setTemplateFactors(templateFactors.map(factor => (factor.id === id ? { ...factor, isSelected: !factor.isSelected } : factor)));
  };
  const handleTemplateSave = () => {
    if (selectedFactorsCount < 2) {
      toast.show({
        type: 'error',
        text1: 'Template Not Saved',
        text2: 'Please select at least 2 fields to save the template.',
      });
      return;
    }

    toast.show({
      type: 'success',
      text1: 'Template Saved',
      text2: 'Your contact card template has been saved successfully.',
      position: 'top',
      visibilityTime: 2000,
    });
    router.back();
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Text onPress={handleTemplateSave} className="text-blue-400 text-xl">
              Save
            </Text>
          ),
        }}
      />
      <View className="flex-1 ">
        <Text className="mt-8 mx-6 text-gray-300">Select ( 2 ) Fields you want to include in the Card </Text>
        <View className="mt-4 mx-6 flex flex-row items-center flex-wrap gap-3">
          {templateFactors.map(factor => (
            <Pressable
              key={factor.id}
              onPress={() => handleFactorPress(factor.id)}
              className={`flex-row items-center justify-center gap-[2px]  p-4 px-6 ${
                factor.isSelected ? 'bg-green-600/10 border-green-700' : 'bg-[#161f2e] border-gray-800'
              }  border-[1px]  rounded-lg active:opacity-70 transition-all duration-100 `}>
              <Text className=" adaptive-text "> {factor.name} </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-12 mx-3">
          <Text className="  mx-4 mb-4 text-gray-300">This is how your contact card will look like </Text>
          <ContactCard sFullName={'John Smith'} sJobTitle="Sales Person" sEmail={'johnExmaple@email.com'} sActive={true} sPhoneBusiness={'+973 39182726'} />
        </View>
      </View>
    </>
  );
};

export default contactsTemplate;
