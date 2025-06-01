import { View, Text, Pressable, PressableProps, TextInput } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind';

interface ListFormOptionProps extends PressableProps {
    children?: React.ReactNode;
    title?: string
    value?: string
    titleMarginLeft?: number;
    hasOpenIcon?: boolean;
    isReadOnly?: boolean;
    onChangeText?: () => void;
    onBlur?: () => void;

}
const ListFormOption = ({ children, title = '', value = '', isReadOnly = true, hasOpenIcon, onChangeText, onBlur, ...props }: ListFormOptionProps) => {
    const { colorScheme } = useColorScheme();
    const textInputRef = React.useRef<TextInput>(null);
    return (
        <Pressable  {...props} className={`bg-[#161f2e] border-[#262f3a]  h-[66px]  px-4 border-b-[1px] flex-row items-center justify-between gap-4 ${props.className} active:opacity-70`}>
            <View className='flex-row items-center gap-1 w-[100%] '>
                <View className='w-fit'>
                    {children}
                </View>
                <Pressable onPress={() => !isReadOnly && textInputRef.current?.focus()} className='flex gap-[2px] w-[100%] '>
                    <Text className=" ml-1 text-xs text-gray-400 pl-1 ">{title}</Text>
                    <TextInput ref={textInputRef} onChangeText={onChangeText} onBlur={onBlur} clearButtonMode='while-editing' readOnly={isReadOnly} value={value} defaultValue={value} className="text-dark ml-2  pr-[10px] py-0  dark:text-light h-[22px] " />
                </Pressable>
            </View>
            {hasOpenIcon && <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
        </Pressable>
    )
}

export default ListFormOption