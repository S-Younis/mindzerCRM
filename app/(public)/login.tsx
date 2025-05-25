import MindzerButton from "@/components/shared/MindzerButton";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { Text, View, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'expo-image';

export default function login() {

  const logIn = useAuthStore((state) => state.logIn);

  const handleLogIn = () => {
    // call api and then set the global state
    logIn({ name: 'Younis Mohammed', email: 'younis@gmail.com', id: '1234567890' });
    router.replace('/')
  }
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <SafeAreaView className=" pt-[80%]  px-4 ">
      <View className="h-fit bg-white w-full py-4 rounded-md mx-auto mb-4">
        <Image
          style={{ width: 200, height: 55, marginLeft: 'auto', marginRight: 'auto', }}
          source={require('@/assets/MINDZER.png')}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={250}
        />
      </View>

      <Text className="text-sm font-medium text-center mb-4 text-[#DBDBDB]"> Enter your credentials to access your account </Text>

      <View className=" mt-10 mb-10 w-[85%] mx-auto ">
        <TextInput
          className=" text-white mb-8 p-3 rounded-lg border border-gray-600 "
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className=" text-white mb-5 p-3 rounded-lg  border border-gray-600  "
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          autoCapitalize="none"

        />
        <Text className="text-blue-200 text-xs text-right underline">Forgot Password?</Text>
      </View>

      <View className=" gap-4 w-[85%] mx-auto">
        <MindzerButton isTitleCentered variants='primary' onPress={handleLogIn} >
          <Text className={`font-medium adaptive-text  `}>
            Sign In
          </Text>
        </MindzerButton>

        <View className="flex-row items-center justify-center gap-4  ">
          <View className="flex-1 h-[0.5px] bg-gray-400"></View>
          <Text className="text-gray-200" > or </Text>
          <View className="flex-1  h-[0.5px] bg-gray-400"></View>
        </View>

        <MindzerButton isTitleCentered variants='primary'   >
          <Text className={`font-medium adaptive-text  `}>
            Sign In with Microsoft
          </Text>
        </MindzerButton>

      </View>

      <View className=" justify-center items-center gap-2 mt-10 ">
        <Text className="text-gray-400 text-xs">@2024 mindzer.com</Text>
        <View className="flex-row items-center gap-4">
          <Text className="text-blue-200 text-xs underline">Terms of Service</Text>
          <Text className="text-gray-600">|</Text>
          <Text className="text-blue-200 text-xs underline">Privacy Policy</Text>
          <Text className="text-gray-600">|</Text>
          <Text className="text-blue-200 text-xs underline">Contact Us</Text>
        </View>

      </View>

    </SafeAreaView>
  )
}



