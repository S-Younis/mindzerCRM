import '../global.css';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/configs/toastConfigs';

export default function RootLayout() {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme == 'dark' ? myDarkTheme : myLightTheme}>
          <Slot />
        </ThemeProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
