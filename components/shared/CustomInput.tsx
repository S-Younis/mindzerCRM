import React, { useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
    children?: React.ReactNode;
    containerClassName?: string;
    inputClassName?: string;
    iconContainerClassName?: string;
    isError?: boolean | string;
    ref?: React.Ref<TextInput>;
}

export const CustomInput = ({
    children,
    containerClassName = '',
    inputClassName = '',
    iconContainerClassName = '',
    isError = false,
    ...textInputProps
}: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <View
            className={`flex-row gap-2 bg-slate-100 dark:bg-transparent  px-2 rounded-lg border  ${isFocused ? 'border-blue-600' : ' border-[#e4e4e4] dark:border-gray-600'}   ${isError && 'border-red-500'}    ${isError && 'dark:border-red-500'} shadow-xs ${containerClassName}`}
        >
            {children ? (
                <View className={`  pl-2 flex items-center justify-center dark:opacity-55 ${iconContainerClassName}   `}>
                    {children}
                </View>
            ) : null}

            <TextInput
                className={`   text-gray-500 ${isError && 'text-red-500'}  dark:text-light ${isError && 'dark:text-red-500'}  py-2 flex-1 ${inputClassName}`}
                placeholderTextColor={isError ? '#7f1d1d' : '#A9A9A9'}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setIsFocused(true)}
                onEndEditing={() => setIsFocused(false)}
                ref={textInputProps.ref}
                {...textInputProps}
            />
        </View>
    );
};

