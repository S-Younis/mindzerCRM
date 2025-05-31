import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import ListOption from '@/components/shared/ListOption'

const themeSettings = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme(); // Auto-detect system color scheme

    const handleOptionPress = () => {
        toggleColorScheme();
        // save in the store 
    }
    return (
        <SafeAreaProvider className='flex-1'>
            <View className='mt-6 px-4'>
                <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Theme</Text>

                <ListOption title='Dark' isChecked={colorScheme == 'dark'} className='rounded-tr-lg rounded-tl-lg' mode='checkbox' onPress={handleOptionPress}  >
                </ListOption>

                <ListOption title='Light' isChecked={!(colorScheme == 'dark')} className='rounded-br-lg rounded-bl-lg' mode='checkbox' onPress={handleOptionPress}  >
                </ListOption>

            </View>

        </SafeAreaProvider>
    )
}

export default themeSettings