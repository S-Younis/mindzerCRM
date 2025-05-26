
import MindzerButton from "@/components/shared/MindzerButton";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Path } from "react-native-svg";
import { LoginFooter } from "@/components/loginPage/LoginFooter";
import Svg from "react-native-svg"
import SimpleThemeToggle from "@/components/shared/ThemeToggler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Divider } from "@/components/shared/Divider";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import CustomInput from "@/components/shared/CustomInput";
import LoginHeader from "@/components/loginPage/LoginHeader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormDataType = {
  email: string
  password: string
}

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

// type FormDataType = z.infer<typeof FormSchema>;

export default function login() {
  const logIn = useAuthStore((state) => state.logIn);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
  })


  const onLogIn: SubmitHandler<FormDataType> = (data) => {
    console.log(data);
    // log the errors if any
    // if (Object.keys(errors).length > 0) {
    //   console.log(errors);
    //   return;
    // }

    // call api and then set the global state
    logIn({ name: data.email, email: 'younis@gmail.com', id: '1234567890' });
    router.replace('/')
    // setError("email", {
    //   message: "Invalid email or password",
    // });
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
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Email"
                containerClassName="relative mb-10"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              >
                <MaterialCommunityIcons name="email-outline" size={20} color={errors.email?.message ? '#ef4444' : '#A9A9A9'} />
                {errors.email && (<Text className="text-red-500 text-sm mt-0 absolute bottom-[-30px] left-[-6px] w-[250px] "> {errors.email.message} </Text>)}
              </CustomInput>
            )}
          />


          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              >
                <MaterialCommunityIcons name="lock" size={20} color="#A9A9A9" />
              </CustomInput>

            )}
          />

          <Text className="text-blue-600 dark:text-blue-300 text-xs text-right underline">Forgot Password?</Text>
        </View>
        {/* End of Form Inputs */}

        {/* Form Buttons */}
        <View className=" gap-4 w-[85%] mx-auto">
          <MindzerButton isTitleCentered variants='primary' onPress={
            handleSubmit(onLogIn)
          } >
            <Text className={`font-medium text-white  `}>
              Sign In
            </Text>
          </MindzerButton>

          <Divider title='or' />

          <MindzerButton isTitleCentered variants='outline'  >
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
        {/* End of Form Buttons */}

      </View>

      <LoginFooter className="mt-auto mb-12" />

    </SafeAreaView>
  )
}



