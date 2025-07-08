import { View, Text, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
// import { ContactCard } from '@/components/contactsPage/ContactCard';
import Entypo from '@expo/vector-icons/Entypo';
// import toast from 'react-native-toast-message';
import { useContactTemplateStore } from '@/stores/contacts/contact.template.store';
import { useState } from 'react';
import Spinner from '@/components/shared/Spinner';
import MindzerButton from '@/components/shared/MindzerButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const contactsTemplate = () => {
  const { bottom: SAFE_BOTTOM_HEIGHT } = useSafeAreaInsets();

  const templateFactors = useContactTemplateStore(state => state.templateFactors);
  const setTemplateFactors = useContactTemplateStore(state => state.setTemplateFactors);
  const defaultFactors = useContactTemplateStore(state => state.defaultFactors);

  const [templateFactors_copy, setTemplateFactors_copy] = useState(templateFactors);
  const [isLoading, setIsLoading] = useState(false);

  const selectedFactorsCount = templateFactors_copy.filter(factor => factor.isSelected).length;

  const isJobTitleVisible = templateFactors_copy.find(factor => factor.name === 'Job Title')?.isSelected;
  const isEmailVisible = templateFactors_copy.find(factor => factor.name === 'Email')?.isSelected;
  const isPhoneVisible = templateFactors_copy.find(factor => factor.name === 'Phone Number')?.isSelected;
  const isStatusVisible = templateFactors_copy.find(factor => factor.name === 'Status')?.isSelected;
  const isAreaNameVisible = templateFactors_copy.find(factor => factor.name === 'Country')?.isSelected;

  // useEffect(() => {
  //   const x = async () => {
  //     await AsyncStorage.removeItem('contact-template-store');
  //   };
  //   x();
  // }, []);

  const handleFactorPress = (id: number) => {
    setTemplateFactors_copy(templateFactors_copy.map(factor => (factor.id === id ? { ...factor, isSelected: !factor.isSelected } : factor)));
  };
  const handleTemplateSave = () => {
    setIsLoading(true);
    setTemplateFactors(templateFactors_copy);

    // Simulate Loading
    setTimeout(() => {
      toast.success('Template Saved', {
        description: 'Your contact card template has been saved successfully.',
        duration: 2000,
        position: 'top-center',
      });
      router.back();
      setIsLoading(false);
    }, 2000);
  };

  const handleResetTemplate = () => {
    setTemplateFactors_copy(defaultFactors);
    setTimeout(() => {
      toast.info('Template Reset', {
        description: 'Your contact card template has been reset to default.',
        duration: 2000,
        position: 'top-center',
      });
    }, 200);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Contacts Template',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Text onPress={() => router.back()} className="text-blue-400 text-xl">
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Text
              disabled={isLoading || selectedFactorsCount < 1}
              onPress={handleTemplateSave}
              className={`text-blue-400 text-xl disabled:opacity-75 disabled:text-gray-500 transition-colors duration-300  `}>
              {isLoading ? (
                <Animated.View entering={FadeIn.duration(300)}>
                  <Spinner />
                </Animated.View>
              ) : (
                'Save'
              )}
            </Text>
          ),
        }}
      />
      <View className="flex-1 ">
        <Text className="mt-8 mx-6 text-gray-300">Select fields you want to include in the Card </Text>
        <View className="mt-4 mx-6 flex flex-row items-center flex-wrap gap-3">
          {templateFactors_copy.map(factor => (
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

        <View className="flex-1 mt-12 mx-3" style={{ marginBottom: SAFE_BOTTOM_HEIGHT + 40 }}>
          <Text className="mx-4 mb-4 text-gray-300">This is how your contact card will look like </Text>
          {/* ContactCard.tsx Component Copy */}
          <Pressable className={`bg-[#161f2e] border-[#262f3a] border flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl active:opacity-70   `}>
            <View className="flex-row gap-4  flex-grow">
              <View className="items-center pt-3 ">
                <View className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                  <Text>JS</Text>
                </View>
              </View>

              <View className="gap-[8px] flex-grow">
                <Text className="text-light text-sm font-bold">John Smith</Text>
                <View className="gap-[5px] pl-[3px]  ">
                  {isJobTitleVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-300 text-sm  mr-auto  rounded-xl">Sales Person</Text>
                    </View>
                  )}
                  {isEmailVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-blue-400 text-sm">johnExmaple@email.com</Text>
                    </View>
                  )}
                  {isPhoneVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-300 text-sm  mr-auto  rounded-xl">+973 33182726</Text>
                    </View>
                  )}
                  {isStatusVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-300 text-sm  mr-auto  rounded-xl">Active</Text>
                    </View>
                  )}
                  {isAreaNameVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-300 text-sm  mr-auto  rounded-xl">France</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View className="justify-center">
              <Entypo name="chevron-small-right" size={32} color={'#4b5563'} />
            </View>
          </Pressable>
          {/* ContactCard.tsx Component Copy */}

          <MindzerButton onPress={handleResetTemplate} variants={'secondary'} className="mt-auto w-[85%] mx-auto flex items-center justify-center">
            <Text className="text-light text-lg mb-1 h-full">Reset Template</Text>
          </MindzerButton>
        </View>
      </View>
    </>
  );
};

export default contactsTemplate;
