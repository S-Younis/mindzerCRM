import { View, Text, Pressable, TouchableOpacity } from 'react-native';
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
import { useColorScheme } from 'nativewind';

const contactsTemplate = () => {
  const { bottom: SAFE_BOTTOM_HEIGHT } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

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

  // Theme Selection
  // const [themesName, setThemesName] = useState([
  //   { id: 1, name: 'Style 1 ', isSelected: true, bgColor: 'bg-transparent' },
  //   { id: 2, name: 'Style 2', isSelected: false, bgColor: 'bg-accent/40' },
  // ]);

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

  // const handleThemeSelection = (id: number) => {
  // };

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
            <TouchableOpacity activeOpacity={0.5} onPress={() => router.back()}>
              <Text className=" text-white dark:text-blue-400 text-xl">Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.5} disabled={isLoading || selectedFactorsCount == 0} onPress={handleTemplateSave}>
              <Text
                disabled={isLoading || selectedFactorsCount == 0}
                className={`text-white dark:text-blue-400 text-xl  disabled:text-gray-300/60 disabled:dark:text-gray-500 transition-colors duration-300  `}>
                {isLoading ? (
                  <Animated.View entering={FadeIn.duration(300)}>
                    <Spinner />
                  </Animated.View>
                ) : (
                  'Save'
                )}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 ">
        <Text className="mt-8 mx-6 text-gray-600 dark:text-gray-300">Select fields you want to include in the Card </Text>
        <View className="mt-4 mx-6 flex flex-row items-center flex-wrap gap-3">
          {templateFactors_copy.map(factor => (
            <Pressable
              key={factor.id}
              onPress={() => handleFactorPress(factor.id)}
              className={`flex-row items-center justify-center gap-[2px] p-[10px] px-6 border rounded-lg 
  ${factor.isSelected ? 'bg-green-600/10 border-green-700' : 'bg-transparent border border-blue-900/50 dark:border-gray-800 dark:bg-[#161f2e]'} 
  hover:border-gray-500 dark:hover:border-gray-700 
  active:opacity-70 active:border-inherit 
  transition-all duration-100`}>
              <Text className={`${factor.isSelected ? 'text-green-700 dark:text-light' : ' text-blue-900 dark:text-light'}   `}> {factor.name} </Text>
            </Pressable>
          ))}
        </View>
        {/* 
        <Text className="mt-8 mx-6  text-gray-600 dark:text-gray-300">Select Card Theme : </Text>
        <View className="mt-4 mx-6 flex flex-row items-center flex-wrap gap-3">
          {themesName.map(theme => (
            <Pressable
              key={theme.id}
              onPress={() => handleThemeSelection(theme.id)}
              className={`flex-row items-center justify-center gap-[2px] p-4 px-6 border rounded-lg 
  ${theme.isSelected ? 'bg-green-600/10 border-green-700' : 'bg-transparent border border-blue-900/50 dark:border-gray-800 dark:bg-[#161f2e]'} 
  hover:border-gray-500 dark:hover:border-gray-700 
  active:opacity-70 active:border-inherit 
  transition-all duration-100`}>
              <Text className={`${theme.isSelected ? 'text-green-700 dark:text-light' : ' text-blue-900 dark:text-light'}   `}> {theme.name} </Text>
            </Pressable>
          ))}
        </View> */}

        <View className="flex-1 mt-12 mx-3" style={{ marginBottom: SAFE_BOTTOM_HEIGHT + 40 }}>
          <Text className="mx-4 mb-4 text-gray-600 dark:text-gray-300">This is how your contact card will look like </Text>
          {/* ContactCard.tsx Component Copy */}
          <Pressable
            className={`bg-accent/20 border-blue-800/20 dark:bg-[#161f2e] dark:border-[#262f3a] border flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl  active:opacity-70    `}>
            <View className="flex-row gap-3  flex-grow">
              <View className="items-center pt-3 ">
                <View className=" bg-accent/75 border dark:border-0 border-slate-500/30 dark:bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                  <Text className="text-blue-900 text-[13px] dark:text-md  dark:text-dark">JS</Text>
                </View>
              </View>
              <View className="gap-[8px] flex-grow">
                <Text className="text-blue-900 dark:text-light text-sm font-bold pl-[3px]">John Smith</Text>
                <View className="gap-[5px] pl-[3px]  ">
                  {isJobTitleVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className=" text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">Sales Person</Text>
                    </View>
                  )}
                  {isEmailVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-blue-700 dark:text-blue-400 text-sm">johnExmaple@email.com</Text>
                    </View>
                  )}
                  {isPhoneVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">+973 33182726</Text>
                    </View>
                  )}
                  {isStatusVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">Active</Text>
                    </View>
                  )}
                  {isAreaNameVisible && (
                    <View className="flex-row gap-[1px] items-center">
                      <Text className="text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">France</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View className="justify-center">
              <Entypo className="opacity-60 dark:opacity-100  " name="chevron-small-right" size={32} color={colorScheme == 'dark' ? '#4b5563' : '#9ca3af'} />
            </View>
          </Pressable>
          {/* ContactCard.tsx Component Copy */}

          <MindzerButton onPress={handleResetTemplate} variants={'secondary'} className="mt-auto w-[85%] mx-auto flex items-center justify-center">
            <Text className=" text-gray-700 dark:text-white  text-lg mb-1 h-full">Reset Template</Text>
          </MindzerButton>
        </View>
      </View>
    </>
  );
};

export default contactsTemplate;
