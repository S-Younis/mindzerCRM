import MindzerButton from "@/components/shared/MindzerButton";
import { useAuthStore } from "@/stores/auth.store";
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function login() {

  const logIn = useAuthStore((state) => state.logIn);


  const handleLogIn = () => {
    logIn();
  }

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

