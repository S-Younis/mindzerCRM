import { View, Text, Pressable, PressableProps, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Octicons from '@expo/vector-icons/Octicons';

interface ListOptionProps extends PressableProps {
  children?: React.ReactNode;
  title?: string;
  titleMarginLeft?: number;
  mode?: 'checkbox' | 'default';
  isChecked?: boolean;
}
const ListOption = ({ children, title = '', titleMarginLeft, mode = 'default', isChecked, ...props }: ListOptionProps) => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  return (
    <Pressable
      {...props}
      style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
      className={`bg-slate-200 dark:bg-[#161f2e] border-[#262f3a] p-4 flex-row justify-between gap-4 ${props.className} active:opacity-70`}>
      <View className="flex-row items-center gap-2">
        {children}
        <Text style={{ marginLeft: titleMarginLeft }} className="text-dark dark:text-light">
          {title}
        </Text>
      </View>
      {mode == 'default' && <Entypo name="chevron-small-right" size={16} color={colorScheme == 'dark' ? '#4b5563' : 'black'} />}
      {mode == 'checkbox' && isChecked ? <Octicons name="check" size={16} color={colorScheme == 'dark' ? '#4b5563' : 'black'} /> : ''}
    </Pressable>
  );
};

export default ListOption;
