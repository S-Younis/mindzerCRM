import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';
import { myDarkTheme, myLightTheme } from '@/configs/theme';
// import { DrawerToggleButton } from '@react-navigation/drawer';
import { DrawerToggle } from '@/components/shared/DrawerToggle';
import { TouchableOpacity, View } from 'react-native';
// import CustomTabBar from '@/components/navigation/CustomTabBar';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fafafa' : myLightTheme.colors.primary,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 18, color: '#fafafa' },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : myLightTheme.colors.primary,
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'light' ? 'white' : undefined,
        },

        headerLeft: () => <DrawerToggle hasMargins />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Dashboard',
          headerTitleStyle: { fontSize: 18, fontFamily: 'Figtree-Medium' },
          headerTintColor: '#fafafa',
          headerLeft: () => (
            <View className="ml-[15px]">
              <DrawerToggle />
            </View>
          ),
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          // animation: 'fade',
          headerShown: false,
          title: 'Contacts',
          tabBarIcon: ({ color }) => <Feather name="phone" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="opportunities"
        options={{
          headerShown: false,
          title: 'Opps',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="handshake-outline" size={22} color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="opps2"
        options={{
          headerShown: false,
          title: 'Opps',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="handshake-outline" size={22} color={color} />,
        }}
      /> */}

      <Tabs.Screen
        name="customers"
        options={{
          headerShown: false,
          title: 'Customers',
          tabBarIcon: ({ color }) => <Feather name="users" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          // animation: 'shift',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
