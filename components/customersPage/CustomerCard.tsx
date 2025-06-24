import { View, Text, PressableProps, Pressable, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type CustomerCardProps = PressableProps & {
  sCustomer: string;
  sStatus: string;
  sContactCount: number;
  sOppsCount: number;
  sCategory: string;
};

export const CustomerCard = ({ sCustomer, sStatus, sCategory, sContactCount, sOppsCount, ...props }: CustomerCardProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      className={` bg-[#161f2e] border-[#262f3a]  border-[1px]  border-l-8    flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl ${props.className} active:opacity-70    `}>
      <View className="flex-row gap-4  flex-grow ">
        {/* <View className='  items-center pt-3 '>
                    <FontAwesome5 name="user" size={21} className='p-2 bg-gray-300 rounded-lg' color="black" />
                </View> */}
        <View className="gap-[8px] flex-grow ">
          <View className="gap-2">
            <Text className="text-light text-sm font-bold">{sCustomer}</Text>
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, height: 1 }} className="w-[90%] opacity-75  bg-gray-700"></View>
          </View>
          <View className="gap-8 pl-[2px]  flex-row   ">
            <View className="gap-2">
              <View className="flex-row gap-1 items-center">
                <Text className="text-gray-300 text-sm">Opps</Text>
                <Text className="text-blue-400 text-sm font-medium">( {sOppsCount} )</Text>
              </View>
              <View className="flex-row  items-center">
                <Text className="text-gray-300 text-sm mr-2">Category</Text>
                <Text className="text-blue-400 text-sm font-medium">{sCategory}</Text>
              </View>
              <View className="flex-row  items-center   rounded-xl  ">
                <Text className={`text-sm font-medium text-orange-600 `}>{sStatus}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="justify-center">
        <Entypo name="chevron-small-right" size={32} color={'#4b5563'} />
      </View>
    </Pressable>
  );
};
