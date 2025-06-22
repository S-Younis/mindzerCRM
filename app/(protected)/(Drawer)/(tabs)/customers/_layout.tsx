import { DrawerToggle } from '@/components/shared/DrawerToggle';
import SearchIconModalButton from '@/components/shared/SearchIconModalButton';
import { router, Stack } from 'expo-router';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { useColorScheme } from 'nativewind';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 18, color: '#fafafa' },
        headerTintColor: '#fafafa',
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Customers',
          headerLeft: () => <DrawerToggle />,
          headerRight: () => <SearchIconModalButton onPress={() => router.push('/customers/customersSearch')} />,
        }}
      />
      <Stack.Screen
        name="createCustomer"
        options={{
          title: '',
          // presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="[iCustomerId]"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="comments/[id]"
        options={{
          headerShown: false,
          title: 'Comment Details',
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="comments/addComment"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="nextStepPage"
        options={{
          presentation: 'modal',
          title: 'Next Step',
        }}
      />

      <Stack.Screen
        name="contacts/relatedContacts"
        options={{
          presentation: 'modal',
          title: 'Related Contacts',
        }}
      />

      <Stack.Screen
        name="contacts/[iContactId]"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="relatedOpps"
        options={{
          presentation: 'modal',
          title: 'Opps',
        }}
      />

      <Stack.Screen
        name="modals/erpSelectModal"
        options={{
          // presentation: 'modal',
          title: '',
        }}
      />
    </Stack>
  );
}
