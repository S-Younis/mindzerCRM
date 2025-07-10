import { View, Text, Pressable, PressableProps } from 'react-native';
import React from 'react';
import { useColorScheme } from 'nativewind';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ListOptionCheckBoxProps extends PressableProps {
  children?: React.ReactNode;
  title?: string;
  titleMarginLeft?: number;
  isChecked?: boolean;
  titleClassName?: string;
}
const ListOptionCheckBox = ({ children, title = '', titleMarginLeft, titleClassName, isChecked, ...props }: ListOptionCheckBoxProps) => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  return (
    <Pressable
      {...props}
      className={`bg-gray-100 border-b border-gray-300/75 dark:bg-[#161f2e] dark:border-[#262f3a]  p-4 px-5  flex-row justify-between gap-4 ${props.className} `}>
      <View className="flex-row items-center gap-2">
        {children}
        <Text
          style={{ marginLeft: titleMarginLeft }}
          className={`font-medium ${titleClassName} text-dark dark:text-light ${isChecked && '!text-blue-800 dark:!text-[#50a2ff]'}`}>
          {title}
        </Text>
      </View>
      {isChecked ? (
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={21} color={colorScheme == 'dark' ? '#50a2ff' : '#1e40af'} />
      ) : (
        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={21} color={colorScheme == 'dark' ? '#f8f8f8' : '#9ca3af'} />
      )}
    </Pressable>
  );
};

export default ListOptionCheckBox;
