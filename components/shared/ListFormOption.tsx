import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind';

interface ListFormOptionProps extends PressableProps {
    children?: React.ReactNode;
    title?: string
    value?: string
    titleMarginLeft?: number;
    hasOpenIcon?: boolean;
}
const ListFormOption = ({ children, title = '', value = '', hasOpenIcon, ...props }: ListFormOptionProps) => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    return (
        <Pressable  {...props} className={`bg-[#161f2e] border-[#262f3a]  h-[66px]  bd-red-200 px-4 border-b-[1px] flex-row items-center justify-between gap-4 ${props.className} active:opacity-70`}>
            <View className='flex-row items-center  gap-2 max-w-[100%]'>
                {children}
                <View className='flex gap-[2px]'>
                    <Text className=" ml-2 text-xs text-gray-400  ">{title}</Text>
                    <Text className="text-dark ml-2 pr-[10px]  dark:text-light   ">{value}</Text>
                </View>
            </View>
            {hasOpenIcon && <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
        </Pressable>
    )
}

export default ListFormOption