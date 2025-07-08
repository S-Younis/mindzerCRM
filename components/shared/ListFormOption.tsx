import { View, Text, Pressable, PressableProps, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface ListFormOptionProps extends PressableProps {
  children?: React.ReactNode;
  title?: string;
  value?: string;
  titleMarginLeft?: number;
  hasOpenIcon?: boolean;
  isReadOnly?: boolean;
  onChangeText?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  isRequired?: boolean;
}
const ListFormOption = ({
  children,
  title = '',
  value = '',
  isReadOnly = true,
  hasOpenIcon,
  onChangeText,
  placeholder,
  onBlur,
  isRequired,
  ...props
}: ListFormOptionProps) => {
  const { colorScheme } = useColorScheme();
  const textInputRef = React.useRef<TextInput>(null);
  return (
    <Pressable
      {...props}
      style={{ borderBottomWidth: StyleSheet.hairlineWidth }}
      className={`dark:bg-[#161f2e] dark:border-[#262f3a] border-gray-300  h-[66px]  px-4 flex-row items-center justify-between gap-4 ${props.className} active:opacity-70 `}>
      <View className={`flex-row items-center ${children ? 'gap-[8px]' : 'gap-[4px]'} w-[100%] `}>
        <View className="w-fit">{children}</View>
        <Pressable
          onPress={isReadOnly ? props.onPress : () => textInputRef.current?.focus()}
          className=" flex-row justify-between items-center gap-[8px] w-[100%]   pr-4 ">
          <View className="flex-1 gap-1">
            <View className="flex-row items-center  gap-[2px]  ">
              {isRequired && <MaterialCommunityIcons name="asterisk" size={6} color="#f87171" />}
              <Text style={{ marginLeft: isRequired ? 0 : 8 }} className="  text-sm text-slate-500/90 dark:text-gray-400">
                {title}
              </Text>
            </View>
            {!isReadOnly ? (
              <TextInput
                placeholder={placeholder}
                style={{ paddingHorizontal: 0, marginLeft: 8 }}
                ref={textInputRef}
                onChangeText={onChangeText}
                onBlur={onBlur}
                clearButtonMode="while-editing"
                readOnly={isReadOnly}
                value={value}
                defaultValue={value}
                numberOfLines={1} // Crucial for single-line truncation
                className="text-dark  overflow-auto overflow-ellipsis    pr-[10px] py-0  dark:text-light placeholder:text-gray-500 h-[22px] "
              />
            ) : (
              <Text
                numberOfLines={1}
                style={{ paddingHorizontal: 0, marginLeft: 8 }}
                ellipsizeMode="tail"
                className=" text-dark pt-[2px] overflow-auto overflow-ellipsis   pr-[10px] py-0  dark:text-light placeholder:text-gray-500 h-[22px] ">
                {value || placeholder}
              </Text>
            )}
          </View>
          {hasOpenIcon && <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ListFormOption;
