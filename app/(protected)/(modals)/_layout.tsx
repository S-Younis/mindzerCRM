import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { myDarkTheme, myLightTheme } from '@/configs/theme';

export default function _layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colorScheme === 'dark' ? myDarkTheme.colors.text : '#ffff',
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
        },
      }}>
      <Stack.Screen name="search-modals/oppsSearch" options={{ headerShown: false }} />
      <Stack.Screen name="contacts/editContact/[iContactId]" options={{ title: '' }} />
      <Stack.Screen name="contacts/importContactPage" options={{ title: '' }} />
      <Stack.Screen name="contacts/contactSortPage" options={{ title: '' }} />
    </Stack>
  );
}
