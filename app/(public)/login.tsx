
import MindzerButton from "@/components/shared/MindzerButton";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LoginFooter } from "@/components/loginPage/LoginFooter";
import { SimpleThemeToggle } from "@/components/shared/ThemeToggler";
import { CustomInput } from "@/components/shared/CustomInput";
import { Divider } from "@/components/shared/Divider";
import { LoginHeader } from "@/components/loginPage/LoginHeader";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { Microsoft } from "@/assets/svg/Microsoft";
import { useEffect } from "react";


type FormDataType = {
  userId: string
  password: string
}

const FormSchema = z.object({
  userId: z.string().nonempty({ message: 'User Id is required' }),
  password: z.string().nonempty({ message: 'Password is required' }).min(4, { message: 'Password must be at least 4 characters long' }),
});


export default function login() {


  const logIn = useAuthStore((state) => state.logIn);
  const {
    control,
    handleSubmit,
    setError,
    // clearErrors,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
  })





  const onLogIn: SubmitHandler<FormDataType> = (data) => {

    try {
      console.log(data);


      // call api and then set the global state

      // Api call 
      //
      if (data.userId === 'alex') {
        setError("userId", {
          type: "manual",
          message: "User Id is Taken",
        });
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Invalid User Id or Password',
          position: 'top',
          visibilityTime: 2500,
          swipeable: true,
        })
        return;
      }
      logIn({ name: data.userId, email: 'younis@gmail.com', id: '1234567890' });
      router.replace('/')
    } catch (e) {
      setError("root", {
        message: "Invalid email or password",
      });
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Invalid User Id or Password',
        position: 'bottom',
        visibilityTime: 1500,
        swipeable: true,
      })
    }

  }

  return (
    <SafeAreaView className="px-4 h-full">

      <View className="pt-3 pr-8 h-12 mt-5">
        <SimpleThemeToggle className=" ml-auto " />
      </View>

      <View className="mt-2  rounded-xl pt-2 ">
        <LoginHeader className="gap-8 mb-4" />

        {/* Form Inputs */}
        <View className=" mt-10 mb-10 w-[85%] mx-auto ">
          <Controller
            control={control}
            name="userId"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="User Id"
                containerClassName="relative mb-10"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                isError={errors.userId?.message}
              >
                <MaterialCommunityIcons name="account-outline" size={20} color={errors.userId?.message ? '#ef4444' : '#A9A9A9'} />
                {errors.userId && (<Text className="text-red-500 text-sm mt-0 absolute bottom-[-30px] left-[-6px] w-[250px] "> {errors.userId.message} </Text>)}
              </CustomInput>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Password"
                containerClassName="relative"
                secureTextEntry
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                isError={errors.password?.message}
              >
                <MaterialCommunityIcons name="lock-outline" size={20} color={errors.password?.message ? '#ef4444' : '#A9A9A9'} />
                {errors.password && (<Text className="text-red-500 text-sm mt-0 absolute bottom-[-30px] left-[-6px] w-[250px] "> {errors.password.message} </Text>)}
              </CustomInput>

            )}
          />

          <Text className="text-blue-600 dark:text-blue-300 text-xs text-right underline ">Forgot Password?</Text>
        </View>
        {/* End of Form Inputs */}

        {/* Form Buttons */}
        <View className=" gap-4 w-[85%] mx-auto">
          <MindzerButton isTitleCentered variants='primary' onPress={
            handleSubmit(onLogIn)
          } >
            <Text className={`font-medium text-light  `}>
              Sign In
            </Text>
          </MindzerButton>
          <Divider title='or' />
          <MindzerButton isTitleCentered variants='outline'  >
            <Microsoft width={22} height={22} marginRight={6} />
            <Text className={`font-medium text-dark dark:text-light   `}>
              Sign In with Microsoft
            </Text>
          </MindzerButton>

        </View>
        {/* End of Form Buttons */}

      </View>

      <LoginFooter className="mt-auto mb-12" />

    </SafeAreaView>
  )
}



