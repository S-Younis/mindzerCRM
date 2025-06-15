import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface CommentCardProps extends TouchableOpacityProps {
    sUser: string;
    sComment: string;
    dateCreated: string;
}
const CommentCard = ({ sUser, sComment, dateCreated, ...props }: CommentCardProps) => {

    const FULL_NAME = sUser.split(' ');
    const INTIALS = FULL_NAME[0].charAt(0).toUpperCase() + (FULL_NAME.length > 1 ? FULL_NAME[FULL_NAME.length - 1]?.charAt(0).toUpperCase() : '');

    return (
        <TouchableOpacity {...props} activeOpacity={0.8} className='flex-row bg-[#161f2e] border border-[#262f3a]  py-5 rounded-lg mb-4 '>
            <View className='flex-row items-start justify-center pt-[2px] w-[15%]'>
                <View className='w-[30px] h-[30px] rounded-full bg-gray-300 items-center justify-center'>
                    <Text className='text-slate-900'>{INTIALS}</Text>
                </View>
            </View>
            <View className='flex-1 flex gap-[6px] pr-4 '>
                <View className='flex-row items-center justify-between'>
                    <Text className=' text-xs text-gray-400'>by {sUser}</Text>
                    <Text className=' text-xs text-gray-400'>{dateCreated}</Text>
                </View>
                <View className='flex-row gap-[6px]  justify-between  '>
                    <Text className='adaptive-text flex-1 text-sm '>
                        {sComment}
                    </Text>
                    <Text className='text-blue-400 text-xs w-fit'>1 Attachment</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default CommentCard