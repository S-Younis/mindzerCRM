import { View, Text, PressableProps, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type OppCardProps = PressableProps & {
  sCustomer: string;
  PRODUCT_NAME: string;
  iOpportunityStatusId: number;
  STATUS: string;
  sUserAppManager: string;
};

const leftBorderColors: any = {
  1: 'bg-green-600',
  2: 'bg-red-600',
  3: 'bg-yellow-600',
};

export const OppCard = ({ sCustomer, PRODUCT_NAME, iOpportunityStatusId, STATUS, sUserAppManager, ...props }: OppCardProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      className={` bg-[#161f2e] border-[#262f3a] border flex-row gap-4 py-3 pl-[10px] pr-[14px] w-[94%] mx-auto rounded-xl ${props.className} active:opacity-70    `}>
      <View className="flex-row gap-[12px] flex-grow ">
        <View className={`h-[90%] my-auto w-2 ${leftBorderColors[iOpportunityStatusId]} rounded-md`}></View>
        <View className="gap-[8px] flex-grow ">
          <Text className="adaptive-text text-sm font-bold">{sCustomer}</Text>
          <View className="flex-row gap-8 pl-[2px]">
            <View className="gap-2">
              <View className="flex-row gap-1 items-center">
                <Text className="text-gray-300 text-sm">Product : </Text>
                <Text className="adaptive-text text-sm font-medium"> {PRODUCT_NAME || 'Null'} </Text>
              </View>
              <View className="flex-row gap-1 items-center">
                <Text className="text-gray-300 text-sm">Owner : </Text>
                <Text className="adaptive-text text-sm font-medium"> {sUserAppManager} </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-300 text-sm mr-2">Opp Status : </Text>
                <Text className={`${iOpportunityStatusId == 2 ? 'text-red-400' : 'adaptive-text '} text-sm font-medium`}>{STATUS}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-300 text-sm mr-2">Expcted Sales Qnty : </Text>
                <Text className={`adaptive-text text-sm `}>23 Kg</Text>
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
