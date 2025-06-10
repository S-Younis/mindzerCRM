import { DrawerToggle } from '@/components/shared/DrawerToggle';
import SearchIconModalButton from '@/components/shared/SearchIconModalButton';
import { router, Stack } from 'expo-router';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { useColorScheme } from 'nativewind';

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

    <Stack.Screen name="index"
      options={{
        title: 'Customers',
        headerLeft: () => <DrawerToggle />,
        headerRight: () => <SearchIconModalButton onPress={() => router.push('/customers/customersSearch')} />,
      }} />
    <Stack.Screen name="nextStepPage"
      options={{
        presentation: 'fullScreenModal',
        title: 'Next Step',
      }} />


  </Stack>;
}
