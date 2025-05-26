
import MindzerButton from "@/components/shared/MindzerButton";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { Text, View, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from 'expo-image';
import { Path } from "react-native-svg";
import { LoginFooter } from "@/components/loginPage/LoginFooter";
import Svg from "react-native-svg"
import SimpleThemeToggle from "@/components/shared/ThemeToggler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
    <SafeAreaView className="px-4 h-full">

      <View className="pt-3 pr-8 h-12 mt-5">
        <SimpleThemeToggle className=" ml-auto " />
      </View>

      <View className="mt-6  rounded-xl pt-2 ">
        <View className="h-fit  w-full py-4 rounded-md mx-auto mb-4">
          <Image
            style={{ width: 200, height: 55, marginLeft: 'auto', marginRight: 'auto', }}
            source={require('@/assets/MINDZER.png')}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={250}
          />
        </View>

        <Text className="text-sm font-medium text-center mb-4 text-gray-400 dark:text-[#DBDBDB]"> Enter your credentials to access your account </Text>

        <View className=" mt-10 mb-10 w-[85%] mx-auto ">
          {/* <TextInput
            className="  bg-slate-100 dark:bg-transparent mb-8 p-4  rounded-lg border  border-[#e4e4e4] dark:border-gray-600  shadow"
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            autoCapitalize="none"
          /> */}
          <View className="flex-row gap-2 bg-slate-100 dark:bg-transparent mb-8 p-2  rounded-lg border  border-[#e4e4e4] dark:border-gray-600  shadow">
            <View className=" pl-2 flex items-center justify-center dark:opacity-55">
              <MaterialCommunityIcons name="email-outline" size={20} color="#A9A9A9" />
            </View>
            <TextInput
              className=" text-gray-800  dark:text-white"
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="flex-row gap-2 bg-slate-100 dark:bg-transparent mb-8 p-2  rounded-lg border  border-[#e4e4e4] dark:border-gray-600  shadow">
            <View className=" pl-2 flex items-center justify-center dark:opacity-55">
              <FontAwesome6 name="lock" size={16} color="#A9A9A9" />
            </View>
            <TextInput
              className=" text-gray-500 dark:text-white"
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          {/* <TextInput
            className=" bg-slate-100 dark:bg-transparent  mb-5 p-4 rounded-lg  border  border-[#e4e4e4] dark:border-gray-600  shadow "
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            autoCapitalize="none"
          /> */}
          <Text className="text-blue-600 dark:text-blue-300 text-xs text-right underline">Forgot Password?</Text>
        </View>

        <View className=" gap-4 w-[85%] mx-auto">
          <MindzerButton isTitleCentered variants='primary' onPress={handleLogIn} >
            <Text className={`font-medium text-white  `}>
              Sign In
            </Text>
          </MindzerButton>

          <View className="flex-row items-center justify-center gap-4  ">
            <View className="flex-1 h-[0.5px] bg-gray-200 dark:bg-[#444442]"></View>
            <Text className="text-gray-400 dark:text-gray-500 " > or </Text>
            <View className="flex-1  h-[0.5px] bg-gray-200 dark:bg-[#444442]"></View>
          </View>

          <MindzerButton isTitleCentered variants='outline'   >
            <Svg
              width={22}
              height={22}
              style={{ marginRight: 6 }}
              fill="none"
              viewBox="0 0 32 32"
            >
              <Path fill="#FEBA08" d="M17 17h10v10H17z" />
              <Path fill="#05A6F0" d="M5 17h10v10H5z" />
              <Path fill="#80BC06" d="M17 5h10v10H17z" />
              <Path fill="#F25325" d="M5 5h10v10H5z" />
            </Svg>

            <Text className={`font-medium text-gray-800 dark:text-white   `}>
              Sign In with Microsoft
            </Text>
          </MindzerButton>


        </View>
      </View>

      <LoginFooter className="mt-auto mb-12" />

    </SafeAreaView>
  )
}



