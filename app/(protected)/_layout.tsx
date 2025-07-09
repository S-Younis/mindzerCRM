import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/stores/auth.store';
import { usePrefStore } from '@/stores/pref.store';
import { useEffect, useState } from 'react';
import Spinner from '@/components/shared/Spinner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function _layout() {
  // const { data, isLoading, isError } = useValidateSession();
  // const token = useAuthStore((state) => state.token);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    const isPref_StoreHydrated = usePrefStore.persist.hasHydrated();
    const isAuth_StoreHydrated = useAuthStore.persist.hasHydrated();
    setIsHydrated(isPref_StoreHydrated && isAuth_StoreHydrated);
  }, []);

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  // Load Fonts :
  const [isFontLoaded, fontsError] = useFonts({
    'Figtree-Reqular': require('@assets/fonts/Figtree-Regular.ttf'),
    'Figtree-Medium': require('@assets/fonts/Figtree-Medium.ttf'),
    'Figtree-Bold': require('@assets/fonts/Figtree-Bold.ttf'),
  });

  if (!isHydrated || !isFontLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center ">
        <Spinner />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  // User is Authenticated :
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(Drawer)" />
      <Stack.Screen
        name="(modals)"
        options={{
          gestureEnabled: false, // Disable swipe to dismiss (IOS)
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
