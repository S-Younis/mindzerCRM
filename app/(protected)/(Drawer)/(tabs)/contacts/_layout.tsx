import { Stack } from 'expo-router';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { useColorScheme } from 'nativewind';
import { DrawerToggle } from '@/components/shared/DrawerToggle';
import SearchIconModalButton from '@/components/shared/SearchIconModalButton';
// import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return <Stack screenOptions={{
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: { 'fontSize': 18, color: '#fafafa' },
    headerTintColor: '#fafafa',
    headerStyle: {
      backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
    },
  }} >
    <Stack.Screen name="index" options={{
      title: 'Contacts', headerLeft: () => <DrawerToggle />, headerRight: () => <SearchIconModalButton />,
    }} />
    <Stack.Screen name="createContactModal" options={{ presentation: 'modal', title: 'Add Contact' }} />
  </Stack>;
}
