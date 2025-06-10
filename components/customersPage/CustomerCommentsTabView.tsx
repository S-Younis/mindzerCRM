import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import { useColorScheme } from 'nativewind';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import CommentCard from '../shared/CommentCard';
import { FlashList } from '@shopify/flash-list';


const comments = [
    { id: '1', sComment: 'This is a comment', iUser: 'User1', date: '2024-03-20' },
    { id: '2', sComment: 'This is another comment', iUser: 'User2', date: '2024-03-21' },
    { id: '3', sComment: 'Yet another comment', iUser: 'User3', date: '2024-03-22' },
    { id: '4', sComment: 'This is a comment', iUser: 'User4', date: '2024-03-23' },
    { id: '5', sComment: 'This is a comment', iUser: 'User5', date: '2024-03-24' },
    { id: '6', sComment: 'This is a comment', iUser: 'User6', date: '2024-03-25' },
    { id: '7', sComment: 'This is a comment', iUser: 'User7', date: '2024-03-26' },
    { id: '8', sComment: 'This is a comment', iUser: 'User8', date: '2024-03-27' },
    { id: '9', sComment: 'This is a comment', iUser: 'User9', date: '2024-03-28' },
    { id: '10', sComment: 'This is a comment', iUser: 'User10', date: '2024-03-29' },

]
type CustomerCommentsTabViewProps = {

}
const CustomerCommentsTabView = ({ }: CustomerCommentsTabViewProps) => {

    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    return (
        <>

            <View className='px-3  mb-14 '>

                <View className='flex-row items-center gap-[4px] mt-4 mb-[6px] ml-3'>
                    <MaterialCommunityIcons name="comment-arrow-right-outline" size={10} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                    <Text className=' text-gray-400  text-xs  '>Next Step</Text>
                </View>

                <Pressable onPress={() => router.push('customers/nextStepPage')} className='bg-[#161f2e]  flex-row justify-between items-center gap-[2px] w-[100%] p-4 rounded-lg '>
                    <View className='flex-1'>
                        <Text className='adaptive-text'>sadsad asd sad sa das ds a</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </Pressable>

                <View className='flex-row items-center gap-[4px] mt-6 mb-[6px] ml-3'>
                    <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                    <Text className=' text-gray-400  text-xs  '>Comments</Text>
                </View>
                <FlashList
                    data={comments}
                    estimatedItemSize={60}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommentCard sUser={item.iUser} sComment={item.sComment} dateCreated={item.date} />}
                />


            </View>

        </>

    )
}

export default CustomerCommentsTabView