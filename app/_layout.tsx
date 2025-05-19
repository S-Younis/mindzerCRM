import { Slot } from 'expo-router';
import "../global.css"
import { ThemeProvider } from '@react-navigation/native';
import { myDarkTheme, myLightTheme } from '../theme/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';


export default function RootLayout() {
   const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
   console.log("RootLayout re-rendered, colorScheme:", colorScheme); 
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme == 'dark' ? myDarkTheme : myLightTheme}>
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
