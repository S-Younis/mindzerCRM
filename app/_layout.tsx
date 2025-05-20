import '../global.css';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { myDarkTheme, myLightTheme } from '@/theme/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import { TamaguiProvider } from 'tamagui';
import { config } from '../tamagui.config';

export default function RootLayout() {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
  console.log('RootLayout re-rendered, colorScheme:', colorScheme);
  return (
    <GestureHandlerRootView>
      <TamaguiProvider config={config}>
        <ThemeProvider value={colorScheme == 'dark' ? myDarkTheme : myLightTheme}>
          <Slot />
        </ThemeProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
