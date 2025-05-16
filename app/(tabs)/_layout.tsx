import { Redirect, Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout() {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Redirect href={'/login'} />;
  }

  return (
    <Tabs screenOptions={{   tabBarActiveTintColor: 'white', }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =><Feather name="home" size={24} color={color} />,
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
        name="add"
        options={{
          tabBarIcon: ({ color }) => <Feather name="plus-circle" size={24} color={color}  />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color}  />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={24}  color={color} />,
        }}
      />
    </Tabs>
  );
}
