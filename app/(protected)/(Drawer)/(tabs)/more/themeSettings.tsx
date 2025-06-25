import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import ListOption from '@components/shared/ListOption';
import { ThemeType } from '@/types/themeTypes';
import { usePrefStore } from '@/stores/pref.store';
import { useState } from 'react';

const themeSettings = () => {
  const { colorScheme, setColorScheme } = useColorScheme(); // Auto-detect system color scheme
  const setTheme = usePrefStore(state => state.setTheme);
  const PREF_THEME = usePrefStore(state => state.theme);
  const [isThemeSystem, setIsThemeSystem] = useState(PREF_THEME == 'system');

  const handleOptionPress = (theme: ThemeType) => {
    if (theme == 'system') {
      setColorScheme('system');
      setTheme('system');
      setIsThemeSystem(true);
      return;
    }
    setIsThemeSystem(false);
    if (theme) {
      setColorScheme(theme);
      setTheme(theme);
    }
  };
  return (
    <SafeAreaProvider className="flex-1 ">
      <View className="mt-6 px-4">
        <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Theme</Text>

        <ListOption
          title="Dark"
          isChecked={colorScheme == 'dark' && !isThemeSystem}
          className="rounded-tr-lg rounded-tl-lg transition-colors duration-300 bg-background-dark dark:bg-background-light"
          mode="checkbox"
          onPress={() => handleOptionPress('dark')}></ListOption>

        <ListOption
          className=" transition-colors duration-300 bg-background-dark dark:bg-background-light"
          title="Light"
          isChecked={colorScheme == 'light' && !isThemeSystem}
          mode="checkbox"
          onPress={() => handleOptionPress('light')}></ListOption>

        <ListOption
          title="System"
          isChecked={isThemeSystem}
          className="rounded-br-lg rounded-bl-lg !border-b-0 transition-colors duration-300 bg-background-dark dark:bg-background-light"
          mode="checkbox"
          onPress={() => handleOptionPress('system')}></ListOption>
      </View>
    </SafeAreaProvider>
  );
};

export default themeSettings;
