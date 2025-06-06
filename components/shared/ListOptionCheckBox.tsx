import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ListOptionCheckBoxProps extends PressableProps {
    children?: React.ReactNode;
    title?: string
    titleMarginLeft?: number;
    isChecked?: boolean;
}
const ListOptionCheckBox = ({ children, title = '', titleMarginLeft, isChecked, ...props }: ListOptionCheckBoxProps) => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
    return (
        <Pressable {...props} className={`bg-slate-200 dark:bg-[#161f2e] border-[#262f3a]  p-4 px-5 border-b-[1px] flex-row justify-between gap-4 ${props.className} active:opacity-70`}>
            <View className='flex-row items-center gap-2'>
                {children}
                <Text style={{ marginLeft: titleMarginLeft }} className={`font-bold text-dark dark:text-light ${isChecked && 'text-[#50a2ff] dark:text-[#50a2ff]'}`}>{title}</Text>
            </View>
            {isChecked ? <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={21} color={'#50a2ff'} /> : <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={21} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
        </Pressable>
    )
}

export default ListOptionCheckBox