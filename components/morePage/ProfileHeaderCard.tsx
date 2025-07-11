import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';
import Entypo from '@expo/vector-icons/Entypo';
import { useAuthStore } from '@/stores/auth.store';

export const ProfileHeaderCard = () => {

    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
    const USER = useAuthStore((state) => state.user);

    return (
        <Pressable className="p-4 bg-[#161f2e] border-[#262f3a] border flex-row gap-4 rounded-xl active:opacity-70 ">
            <View className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <Text className=" font-bold text-xl ">YM</Text>
            </View>
            <View className="flex self-center gap-[2px]  ">
                <Text className=" text-dark dark:text-light font-bold text-lg ">{USER?.name} </Text>
                <Text className=" text-blue-400     ">
                    {USER?.email}
                </Text>
            </View>

            <View className="flex-1 items-end justify-center ">
                <Entypo name="chevron-small-right" size={32} color={colorScheme == 'dark' ? '#4b5563' : 'black'} />
            </View>
        </Pressable>

    )
}
