import { Stack } from 'expo-router';

export default function Layout() {
    return <Stack screenOptions={{ headerShown: true }} >
        <Stack.Screen name="index" options={{ headerShown: false }} />\
        <Stack.Screen name="themeSettings" options={{ title: 'Theme Settings', headerBackButtonDisplayMode: 'minimal' }} />
    </Stack>;
}
