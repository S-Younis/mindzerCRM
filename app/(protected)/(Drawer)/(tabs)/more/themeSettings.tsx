import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import ListOption from '@components/shared/ListOption'
import { ThemeType } from '@/types/themeTypes'
import { usePrefStore } from '@/stores/pref.store'


const themeSettings = () => {
    const { colorScheme, setColorScheme } = useColorScheme(); // Auto-detect system color scheme
    const setTheme = usePrefStore((state) => state.setTheme)

    const handleOptionPress = (theme: ThemeType) => {
        if (colorScheme == theme) return; // No change if the selected theme is already active 
        if (theme) {
            setColorScheme(theme);
            setTheme(theme);
        }

    }
    return (
        <SafeAreaProvider className='flex-1'>
            <View className='mt-6 px-4'>
                <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Theme</Text>

                <ListOption title='Dark' isChecked={colorScheme == 'dark'} className='rounded-tr-lg rounded-tl-lg' mode='checkbox' onPress={() => handleOptionPress('dark')}  >
                </ListOption>

                <ListOption title='Light' isChecked={!(colorScheme == 'dark')} className='rounded-br-lg rounded-bl-lg' mode='checkbox' onPress={() => handleOptionPress('light')}  >
                </ListOption>

            </View>

        </SafeAreaProvider >
    )
}

export default themeSettings