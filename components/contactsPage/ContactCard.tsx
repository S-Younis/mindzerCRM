import { View, Text, ViewProps } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

type ContactCardProps = ViewProps & {
    sFullName: string;
    sJobTitle?: string;
    sEmail: string;
}

export const ContactCard = ({ sFullName, sJobTitle, sEmail, ...props }: ContactCardProps) => {
    return (
        <View className={`bg-[#161f2e] border-[#262f3a] border-2 flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl ${props.className} active:opacity-70  `}>
            <View className='  items-center pt-3 '>
                <FontAwesome5 name="user" size={21} className='p-2 bg-gray-500 rounded-lg' color="#9ca3af" />
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

