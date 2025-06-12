import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { comments } from '@/constants/customers'; // Assuming you have a comments data file

const CustomerComment = () => {

    const { id } = useLocalSearchParams<{ id: string }>();
    const comment = comments.find(comment => comment.id === id);
    return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-xl adaptive-text'>{comment?.sComment}</Text>
        </View>
    )
}

export default CustomerComment;

