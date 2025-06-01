import '../global.css';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/configs/toastConfigs';
import useConfig from '@/hooks/useConfig';


export default function RootLayout() {
  const { themeProperties } = useConfig();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={themeProperties}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      </ThemeProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
