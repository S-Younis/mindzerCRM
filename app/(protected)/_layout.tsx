import { Redirect, Stack } from 'expo-router'
import { useAuthStore } from '@/stores/auth.store';
import { ActivityIndicator, View } from 'react-native';

export default function _layout() {

    //Loading the Local Storage (AsyncStorage) data
    const isHydrated = useAuthStore.persist.hasHydrated()
    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // const { data, isLoading, isError } = useValidateSession();
    // const token = useAuthStore((state) => state.token);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }

    // User is Authenticated
    return <Stack screenOptions={{ headerShown: false }} />
}

