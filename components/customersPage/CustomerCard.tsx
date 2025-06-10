import { View, Text, PressableProps, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

type CustomerCardProps = PressableProps & {
    sCustomer: string;
    sStatus: string;
    sContactCount: number;
    sOppsCount: number;
    sCategory: string;

}

export const CustomerCard = ({ sCustomer, sStatus, sCategory, sContactCount, sOppsCount, ...props }: CustomerCardProps) => {
    return (

        <Pressable onPress={props.onPress} className={` bg-[#161f2e] border-[#262f3a] border-[1px] flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl ${props.className} active:opacity-70   `}>

            <View className='flex-row gap-4  flex-grow'>
                <View className='  items-center pt-3 '>
                    <FontAwesome5 name="user" size={21} className='p-2 bg-gray-300 rounded-lg' color="black" />
                </View>

                <View className='gap-[8px] flex-grow  '>
                    <Text className="text-light text-sm font-bold">{sCustomer}</Text>
                    <View className='gap-[4px] pl-[2px] '>
                        <View className="gap-2">
                            <View className='flex-row gap-1 items-center'>
                                <Entypo name="dot-single" size={11} color="#f8f8f8" />
                                <Text className='text-gray-300 text-sm'>Opps</Text>
                                <Text className='text-blue-400 text-sm font-medium'>( {sOppsCount} )</Text>
                            </View>
                            <View className='flex-row gap-1 items-center'>
                                <Entypo name="dot-single" size={11} color="#f8f8f8" />
                                <Text className='text-gray-300 text-sm'>Contacts</Text>
                                <Text className='text-blue-400 text-sm font-medium'>( {sContactCount} )</Text>
                            </View>
                        </View>
                        <View className=" text-sm  flex-row items-center gap-3 mt-1 ">
                            <View className='flex-row items-center gap-1'>
                                <Entypo name="dot-single" size={11} color="#f8f8f8" />
                                <Text className={`text-sm font-medium ${sStatus == 'Active' ? 'text-green-400' : 'text-yellow-500'}`}>{sStatus}</Text>
                            </View>

                            <View className='flex-row  items-center'>
                                <Entypo name="dot-single" size={11} color="#f8f8f8" className='mr-[3px]' />
                                <Text className='text-gray-300 text-sm mr-2'>Category</Text>
                                <Text className='text-blue-400 text-sm font-medium'>{sCategory}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>


            <View className='  justify-center'>
                <Entypo name="chevron-small-right" size={32} color={'#4b5563'} />
            </View>
        </Pressable>

    )
}

