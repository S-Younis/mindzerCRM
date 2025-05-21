import { Text, Pressable, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';


interface MindzerButtonProps {
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  height?: string
  width?: string
  onPress?: () => void
}

export default function MindzerButton({ title, size, width, height, onPress }: MindzerButtonProps) {

  const { colorScheme } = useColorScheme();

  return (
    <Pressable className={`flex-row  my-4 bg-blue-800 dark:bg-blue-300 p-[10px] px-4 rounded-lg active:bg-blue-700 dark:active:bg-blue-200   ${height && `h-[${height}]`}  ${width && `w-[${width}]`}  `} onPress={onPress}>
      <View className='max-w-5 max-h-5 flex-row items-center mr-2'>
        <Ionicons name="color-palette-outline" size={19} color={colorScheme == 'dark' ? 'black' : 'white'} />
      </View>
      <Text className={`font-medium text-${size || 'md'}  text-white dark:text-slate-900`}>{title || 'Click Me'}</Text>
    </Pressable>
  )
}