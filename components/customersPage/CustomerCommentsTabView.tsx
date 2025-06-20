import { View, Text, Pressable } from 'react-native'
import { useColorScheme } from 'nativewind';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import CommentCard from '../shared/CommentCard';
// import { FlashList } from '@shopify/flash-list';
import { comments } from '@/constants/customers'; // Assuming you have a comments data file

const CustomerCommentsTabView = () => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
    return (
        <>

            <View className='px-3  mb-14 '>

                <View className='flex-row items-center gap-[4px] mt-4 mb-[6px] ml-3'>
                    <MaterialCommunityIcons name="comment-arrow-right-outline" size={10} color={colorScheme == 'dark' ? '#9ca3af' : 'black'} />
                    <Text className=' text-gray-400  text-xs  '>Next Step</Text>
                </View>

                <Pressable onPress={() => router.push('customers/nextStepPage')} className='bg-[#161f2e] border border-[#262f3a]   flex-row justify-between items-center gap-[2px] w-[100%] p-4 rounded-lg '>
                    <View className='flex-1'>
                        <Text className='adaptive-text'>sadsad asd sad sa das ds a</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </Pressable>

                <View className='flex-row items-center gap-[4px] mt-6 mb-[6px] ml-3'>
                    <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#9ca3af' : 'black'} />
                    <Text className=' text-gray-400  text-xs  '>Comments</Text>
                </View>

                {/* Comments List */}
                {comments.map((comment) => <CommentCard key={comment.id} sUser={comment.iUser} sComment={comment.sComment} dateCreated={comment.date} onPress={() => router.push(`customers/comments/${comment.id}`)} />)}
                {/* <FlashList
                    data={comments}
                    estimatedItemSize={60}
                    keyExtractor={(item) => item.id}
                    stickyHeaderIndices={[0]}
                    renderItem={({ item }) => <CommentCard sUser={item.iUser} sComment={item.sComment} dateCreated={item.date} onPress={() => router.push(`customers/comments/${item.id}`)} />}
                /> */}
            </View>

        </>

    )
}

export default CustomerCommentsTabView