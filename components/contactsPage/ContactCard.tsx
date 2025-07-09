import { View, Text, PressableProps, Pressable, Linking, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { useContactTemplateStore } from '@/stores/contacts/contact.template.store';
import { useColorScheme } from 'nativewind';

type ContactCardProps = PressableProps & {
  sFullName: string;
  sJobTitle?: string;
  sEmail: string;
  sPhoneBusiness: string;
  sActive: boolean;
  sAreaName: string; // Added for area name
  isSwipable?: boolean;
};

export const ContactCard = ({ sFullName, sJobTitle, sEmail, sActive, sAreaName, sPhoneBusiness, isSwipable = true, ...props }: ContactCardProps) => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const [callActionIsLoading, setCallActionIsLoading] = useState(false);
  const [emailActionIsLoading, setEmailActionIsLoading] = useState(false);

  const templateFactors = useContactTemplateStore(state => state.templateFactors);

  // Card Template Based on Factors
  const isEmailVisible = templateFactors.find(factor => factor.name === 'Email')?.isSelected;
  const isJobTitleVisible = templateFactors.find(factor => factor.name === 'Job Title')?.isSelected;
  const isPhoneVisible = templateFactors.find(factor => factor.name === 'Phone Number')?.isSelected;
  const isStatusVisible = templateFactors.find(factor => factor.name === 'Status')?.isSelected;
  const isAreaNameVisible = templateFactors.find(factor => factor.name === 'Country')?.isSelected;

  const FULL_NAME = sFullName.split(' ');
  const INTIALS = FULL_NAME[0].charAt(0).toUpperCase() + (FULL_NAME.length > 1 ? FULL_NAME[FULL_NAME.length - 1]?.charAt(0).toUpperCase() : '');

  function RightSwipeAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + (sPhoneBusiness ? 90 : 50) }],
      };
    });
    return (
      <Reanimated.View style={styleAnimation}>
        <View className={`h-full w-[${sPhoneBusiness ? '90px' : '50px'}] pr-6 flex-row gap-6 items-center justify-center`}>
          <Pressable
            className="flex-basis-1/2"
            onPress={async () => {
              setEmailActionIsLoading(true);
              await Linking.openURL(`mailto:${sEmail}`);
              setEmailActionIsLoading(false);
            }}>
            {emailActionIsLoading ? <ActivityIndicator size={'small'} className="text-white px-[1.5px] " /> : <Feather name="mail" size={23} color="#ca8a04" />}
          </Pressable>
          {sPhoneBusiness && (
            <Pressable
              onPress={async () => {
                setCallActionIsLoading(true);
                if (Platform.OS === 'android') {
                  await Linking.openURL(`tel:${sPhoneBusiness}`);
                  setCallActionIsLoading(false);
                  return;
                }
                await Linking.openURL(`telprompt:${sPhoneBusiness}`);
                setCallActionIsLoading(false);
              }}>
              {callActionIsLoading ? (
                <ActivityIndicator size={'small'} className="text-white px-[1.5px] " />
              ) : (
                <Ionicons name="call-outline" size={23} color="green" />
              )}
            </Pressable>
          )}
        </View>
      </Reanimated.View>
    );
  }

  return (
    <>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={30}
        enabled={isSwipable}
        renderRightActions={RightSwipeAction}>
        <Pressable
          onPress={props.onPress}
          // border-gray-300/75
          className={`bg-gray-100  border-blue-800/15 dark:bg-[#161f2e] dark:border-[#262f3a] border  flex-row gap-4 py-3 px-[14px]  w-[91.5%] mx-auto  rounded-xl ${props.className} active:opacity-70    `}>
          <View className="flex-row gap-3  flex-grow">
            <View className="items-center pt-3 ">
              <View className=" bg-accent/75  border-slate-500/30 dark:bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                <Text className="text-blue-900 text-[13px] dark:text-md   dark:text-dark">{INTIALS}</Text>
              </View>
            </View>

            <View className="gap-[8px] flex-grow">
              <Text className="text-blue-900 dark:text-light text-sm font-bold pl-[3px]">{sFullName}</Text>
              <View className="gap-[5px] pl-[3px]  ">
                {sJobTitle && isJobTitleVisible && (
                  <View className="flex-row gap-[1px] items-center">
                    <Text className=" text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">{sJobTitle}</Text>
                  </View>
                )}
                {isEmailVisible && (
                  <View className="flex-row gap-[1px] items-center">
                    <Text className="text-blue-700 dark:text-blue-400 text-sm">{sEmail}</Text>
                  </View>
                )}
                {sPhoneBusiness && isPhoneVisible && (
                  <View className="flex-row gap-[1px] items-center">
                    <Text className="text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">{sPhoneBusiness}</Text>
                  </View>
                )}
                {sActive && isStatusVisible && (
                  <View className="flex-row gap-[1px] items-center">
                    <Text className="text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">{sActive ? 'Active' : 'Inactive'}</Text>
                  </View>
                )}
                {sAreaName && isAreaNameVisible && (
                  <View className="flex-row gap-[1px] items-center">
                    <Text className="text-gray-500 dark:text-gray-300 text-sm  mr-auto  rounded-xl">{sAreaName}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View className="justify-center">
            <Entypo className="opacity-60 dark:opacity-100  " name="chevron-small-right" size={32} color={colorScheme == 'dark' ? '#4b5563' : '#9ca3af'} />
          </View>
        </Pressable>
      </ReanimatedSwipeable>
    </>
  );
};
