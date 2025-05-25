import { Stack } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { useColorScheme } from 'nativewind';
export default function Layout() {
  const { colorScheme } = useColorScheme();

  return <Stack screenOptions={{
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: { 'fontSize': 18, color: '#fff' },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
    },
  }} >
    <Stack.Screen name="index" options={{ title: 'Contacts', headerLeft: () => <DrawerToggleButton tintColor='white' />, }} />
    <Stack.Screen name="createContactModal" options={{ presentation: 'modal', title: 'Add Contact' }} />
  </Stack>;
}
