import MindzerButton from "@/components/shared/MindzerButton";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function login() {

  const logIn = useAuthStore((state) => state.logIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLogIn = () => {
    // call api and then set the global state
    logIn({ name: 'Younis Mohammed', email: 'younis@gmail.com', id: '1234567890' });
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView className="flex-1  justify-center px-4 ">
      <MindzerButton isTitleCentered variants='danger' onPress={handleLogIn} >
        <Text className={`font-medium text-white  `}>
          Log In
        </Text>
      </MindzerButton>
    </SafeAreaView>
  )
}



