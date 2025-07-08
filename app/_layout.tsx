import '../global.css';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/configs/toastConfigs';
import useConfig from '@/hooks/useConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner-native';
// Reactotron Dev Tools
if (__DEV__) {
  require('../ReactotronConfig');
}
export default function RootLayout() {
  const { themeProperties } = useConfig();
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={themeProperties}>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </ThemeProvider>
        <Toast config={toastConfig} />
        <Toaster />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
