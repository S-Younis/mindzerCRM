import { View, Text } from 'react-native'

type CommentCardProps = {
    sUser: string;
    sComment: string;
    dateCreated: string;
}
const CommentCard = ({ sUser, sComment, dateCreated }: CommentCardProps) => {

    return (
        <View className='flex-row bg-[#161f2e]  py-4 rounded-lg mb-2 '>
            <View className='flex-row items-start justify-center pt-[2px] w-[15%]'>
                <View className='w-[30px] h-[30px] rounded-full bg-gray-300 items-center justify-center'>
                    <Text className='text-slate-900'>C</Text>
                </View>
            </View>
            <View className='flex-1 flex gap-[6px] pr-4 '>
                <View className='flex-row items-center justify-between'>
                    <Text className=' text-xs text-gray-400'>{sUser}</Text>
                    <Text className=' text-xs text-gray-400'>{dateCreated}</Text>
                </View>
                <View className='flex-row gap-[6px]  justify-between  '>
                    <Text className='adaptive-text flex-1 text-sm '>
                        {sComment}
                    </Text>
                    <Text className='text-blue-400 text-xs w-fit'>1 Attachment</Text>
                </View>
            </View>

        </View>
    )
}

export default CommentCard