import { Redirect, Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Redirect href={'/login'} />;
  }

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : myLightTheme.colors.primary,
      headerTitleAlign: 'center',
      headerTitleStyle: { 'fontSize': 18, color: '#fff' },
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
      }, headerLeft: () => <DrawerToggleButton tintColor='white' />,
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color }) => <Feather name="phone" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="opportunities"
        options={{
          title: 'Opps',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="handshake-outline" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
          // tabBarButton: () => (  ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
