import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

type ContactCardProps = {
    sFullName: string;
    sJobTitle?: string;
    sEmail: string;
}

export const ContactCard = ({ sFullName, sJobTitle, sEmail }: ContactCardProps) => {
    return (
        <View className="bg-[#161f2e] border-[#262f3a] border-2 flex-row gap-4 p-3 px-5  w-[90%] mx-auto  rounded-xl">

            <View className='  items-center pt-4'>
                <FontAwesome5 name="user" size={21} color="#2563eb" />
            </View>

            <View className='gap-[8px]'>
                <Text className="text-light text-sm font-bold">{sFullName}</Text>
                <View className='gap-[2px]'>
                    {sJobTitle && <Text className="text-gray-400 text-sm bg-gray-600 mr-auto py-[2px] rounded-xl px-2  ">{sJobTitle} </Text>}
                    <Text className="text-blue-600 text-sm ">{sEmail}</Text>
                </View>
            </View>

            <View className='justify-center ml-auto'>
                <Entypo name="chevron-small-right" size={32} color={'#4b5563'} />
            </View>
        </View>
    )
}

