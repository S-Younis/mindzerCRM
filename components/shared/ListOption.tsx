import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind';

interface ListOptionProps extends PressableProps {
    children?: React.ReactNode;
    title: string;
}
const ListOption = ({ children, title, ...props }: ListOptionProps) => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    return (
        <Pressable  {...props} className={`bg-[#161f2e] border-[#262f3a]  p-4 border-b-[1px] flex-row justify-between gap-4 ${props.className} active:opacity-70`}>
            <View className='flex-row items-center gap-2'>
                {children}
                <Text className="text-dark dark:text-light ">{title}</Text>
            </View>
            <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </Pressable>
    )
}

export default ListOption