import { View, Text, PressableProps, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type CustomerCardProps = PressableProps & {
  sCustomer: string;
  sStatus: string;
  sContactCount: number;
  sOppsCount: number;
  sCategory: string;
};

const leftBorderColors: any = {
  active: 'bg-blue-600',
  project: 'bg-blue-600',
  inactive: 'bg-blue-600',
};
// const leftBorderColors: any = {
//   active: 'bg-green-600',
//   project: 'bg-yellow-600',
//   inactive: 'bg-red-600',
// };

export const CustomerCard = ({ sCustomer, sStatus, sCategory, sContactCount, sOppsCount, ...props }: CustomerCardProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      className={` bg-[#161f2e] border-[#262f3a] border flex-row gap-4 py-3 pl-[10px] pr-[14px] w-[94%] mx-auto rounded-xl ${props.className} active:opacity-70    `}>
      <View className="flex-row gap-[12px] flex-grow ">
        <View className={`h-[90%] my-auto w-2 ${leftBorderColors[sStatus.toLowerCase()]} rounded-md`}></View>
        <View className="gap-[12px] flex-grow ">
          <View className="gap-2">
            <Text className="text-light text-sm font-bold">{sCustomer}</Text>
          </View>
          <View className="flex-row gap-8 pl-[2px]">
            <View className="gap-2">
              <View className="flex-row gap-1 items-center">
                <Text className="text-gray-300 text-sm">Opps : </Text>
                {/* <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'gray', width: 14, marginRight: 2 }}></View> */}
                <Text className="text-blue-400 adaptive-text text-sm ">( {sOppsCount} )</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-300 text-sm mr-2">Category :</Text>
                {/* <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'gray', width: 14, marginRight: 6 }}></View> */}
                <Text className="text-blue-400 adaptive-text text-sm ">{sCategory}</Text>
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
