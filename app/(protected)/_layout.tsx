import { Redirect, Stack } from 'expo-router'
import { useAuthStore } from '@/stores/auth.store';
import { usePrefStore } from '@/stores/pref.store';
import { useEffect, useState } from 'react';
import Spinner from '@/components/shared/Spinner';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _layout() {

    // const { data, isLoading, isError } = useValidateSession();
    // const token = useAuthStore((state) => state.token);

    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        const isPrfHydrated = usePrefStore.persist.hasHydrated();
        const isAuthHydrated = useAuthStore.persist.hasHydrated();
        setIsHydrated(isPrfHydrated && isAuthHydrated);
    }, []);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    if (!isHydrated) {
        return <SafeAreaView className='flex-1 items-center justify-center '>
            <Spinner />
        </SafeAreaView>
    }

    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }

    // User is Authenticated
    return <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="(Drawer)" />
    </Stack>
}

