import { Redirect, Stack } from 'expo-router'
import { useAuthStore } from '@/stores/auth.store';

export default function _layout() {

    // const { data, isLoading, isError } = useValidateSession();
    // const token = useAuthStore((state) => state.token);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }

    // User is Authenticated
    return <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="(Drawer)" />
        <Stack.Screen name="modals"
            options={{
                presentation: 'modal',
                headerShown: true,
                title: ''
            }} />
    </Stack>
}

