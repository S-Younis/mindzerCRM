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
      className={`flex-row  gap-[6px]  bg-gray-50 border  dark:bg-transparent px-2 rounded-lg    ${
        isFocused ? 'border-blue-600' : ' border-gray-300 dark:border-gray-600'
      }   ${isError && 'border-red-500'}    ${isError && 'dark:border-red-500'} shadow-xs ${containerClassName}`}>
      {children ? <View className={` pl-1 flex items-center justify-center  ${iconContainerClassName}   `}>{children}</View> : null}

      <TextInput
        className={` text-gray-900    ${isError && 'text-red-500'}  dark:text-light ${isError && 'dark:text-red-500'}  py-2 flex-1 ${inputClassName}`}
        placeholderTextColor={isError ? '#ef4444' : '#A9A9A9'}
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
