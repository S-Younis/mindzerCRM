import { View, Text, PressableProps, Pressable, Linking, Platform, ActivityIndicator } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';

type ContactCardProps = PressableProps & {
  sFullName: string;
  sJobTitle?: string;
  sEmail: string;
  sPhoneBusiness: string;
  isSwipable?: boolean;
};

export const ContactCard = ({ sFullName, sJobTitle, sEmail, sPhoneBusiness, isSwipable = true, ...props }: ContactCardProps) => {
  const [callActionIsLoading, setCallActionIsLoading] = useState(false);
  const [emailActionIsLoading, setEmailActionIsLoading] = useState(false);

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
          className={` bg-[#161f2e] border-[#262f3a] border flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl ${props.className} active:opacity-70   `}>
          <View className="flex-row gap-4  flex-grow">
            <View className="items-center pt-3 ">
              {/* <FontAwesome5 name="user" size={21} className='p-2 bg-gray-500 rounded-lg' color="#9ca3af" /> */}
              <View className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                <Text>{INTIALS}</Text>
              </View>
            </View>

            <View className="gap-[8px] flex-grow">
              <Text className="text-light text-sm font-bold">{sFullName}</Text>
              <View className="gap-[2px] pl-[3px]  ">
                {sJobTitle && (
                  <View className="flex-row gap-[1px] items-center">
                    {/* <Entypo name="dot-single" size={11} color="white" /> */}
                    <Text className="text-gray-300 text-sm  mr-auto py-[2px] rounded-xl">{sJobTitle}</Text>
                  </View>
                )}
                <View className="flex-row gap-[1px] items-center">
                  {/* <Entypo name="dot-single" size={11} color="#f8f8f8" /> */}
                  <Text className="text-blue-400 text-sm">{sEmail}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="justify-center">
            <Entypo name="chevron-small-right" size={32} color={'#4b5563'} />
          </View>
        </Pressable>
      </ReanimatedSwipeable>
    </>
  );
};
