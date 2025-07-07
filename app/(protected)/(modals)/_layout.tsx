import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="search-modals/oppsSearch" options={{ headerShown: false }} />
      <Stack.Screen name="contacts/editContact/[iContactId]" options={{ title: '' }} />
      <Stack.Screen name="contacts/importContactPage" options={{ title: '' }} />
    </Stack>
  );
}
