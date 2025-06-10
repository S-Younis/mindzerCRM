import { View, Text, PressableProps, Pressable } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';

type ContactCardProps = PressableProps & {
    sFullName: string;
    sJobTitle?: string;
    sEmail: string;
}

export const ContactCard = ({ sFullName, sJobTitle, sEmail, ...props }: ContactCardProps) => {

    const sFullNameArr = sFullName.split(' ');
    const sFirstName = sFullNameArr[0];
    const sLastName = sFullNameArr.length > 1 ? sFullNameArr[sFullNameArr.length - 1] : '';
    return (

        <Pressable onPress={props.onPress} className={` bg-[#161f2e] border-[#262f3a] border-[1px] flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl ${props.className} active:opacity-70   `}>

            <View className='flex-row gap-4  flex-grow'>
                <View className='items-center pt-3 '>
                    {/* <FontAwesome5 name="user" size={21} className='p-2 bg-gray-500 rounded-lg' color="#9ca3af" /> */}
                    <View className='bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center'>
                        <Text>{sFirstName.charAt(0)}{sLastName.charAt(0)}</Text>
                    </View>
                </View>

                <View className='gap-[8px] flex-grow'>
                    <Text className="text-light text-sm font-bold">{sFullName}</Text>
                    <View className='gap-[2px] pl-[3px]  '>
                        {sJobTitle &&
                            <View className='flex-row gap-[1px] items-center'>
                                {/* <Entypo name="dot-single" size={11} color="white" /> */}
                                <Text className="text-gray-300 text-sm  mr-auto py-[2px] rounded-xl">{sJobTitle}</Text>
                            </View>
                        }
                        <View className='flex-row gap-[1px] items-center'>
                            {/* <Entypo name="dot-single" size={11} color="#f8f8f8" /> */}
                            <Text className="text-blue-400 text-sm">{sEmail}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className='justify-center'>
                <Entypo name="chevron-small-right" size={32} color={'#4b5563'} />
            </View>
        </Pressable>

    )
}

