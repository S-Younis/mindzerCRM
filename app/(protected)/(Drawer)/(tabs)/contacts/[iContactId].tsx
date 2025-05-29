import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const ContactDetails = () => {

    const { iContactId } = useLocalSearchParams();

    return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-green-400'> Hi User , {iContactId} </Text>
        </View>
    )
}

export default ContactDetails