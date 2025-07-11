import { Stack } from 'expo-router';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { useColorScheme } from 'nativewind';
// import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 18, fontFamily: 'Figtree-Medium' },
        headerTintColor: '#fafafa',
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Contacts',
          // headerLeft: () => <DrawerToggle />,
          // headerRight: () => <SearchIconModalButton onPress={() => router.push('/contacts/contactsSearch')} />,
        }}
      />
      <Stack.Screen
        name="contactsSearch"
        options={{
          title: '',
          // presentation: 'modal',
          headerShown: true,
          animation: 'fade',
          animationDuration: 300,
        }}
      />

      <Stack.Screen
        name="[iContactId]"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}
